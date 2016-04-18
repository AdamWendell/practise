import Cycle from '@cycle/core'
import {div, hr, pre, p, textarea, button, makeDOMDriver} from '@cycle/dom'
import {Observable} from 'rx'
import isEqual from 'lodash.isequal'
import isolate from '@cycle/isolate'
import {exercises, data} from './data/data'
let orders = data

function intent(DOMSource) {
  return DOMSource.select('textarea').events('input')
    .map(e => e.target.value)
}

function model(input$, prop$) {
  const initialCode$ = prop$.map(props => props.startText).first()
  //|S----------------------> initialCode$
  //|----i----i------i------> input$
  // concat
  //|S---i----i------i------> code$
  const code$ = initialCode$.concat(input$)
  //|S---i----i------i------> code$
  // map running the code in textarea. e= error, res = value of code that ran
  //|S---e----e-----res----->
  // retryWhen re= retry
  //|S---re---re----res----->
  // map
  //|S--------------res----->
  const result$ = code$.map(code => eval(code))
    .retryWhen(err => err.delay(0))
    .map(result => result)


  //|S-----resf---resf----rest->
  // combineLatest resf = code that should not pass. rest = code that should pass.
  //|false-----false---false----true->
  const compared$ = Observable
    .combineLatest(result$, prop$, (code, props) => isEqual(code, props.awnser))

  // return the state object
  return Observable.combineLatest(compared$, prop$, result$,(passingCodeBolean, props, result) => {
    return {
      exercise: props.exercise,
      startText: props.startText,
      awnser: props.awnser,
      pass: passingCodeBolean,
      currentResult: result
    }
  })
}

function view(state$) {
  return state$.map(state =>
    div([
      pre(state.exercise),
      textarea({value: state.startText, disabled: state.pass}),
      p(`current value of the code is ${JSON.stringify(state.currentResult)}`),
      p(`expected out put is ${JSON.stringify(state.awnser)}`),
      hr()
    ])
  )
}

function Exercise(sources) {
  const input$ = intent(sources.DOM)
  const state$ = model(input$, sources.props)
  const vtree$ = view(state$)
  return {
    DOM: vtree$
  }
}

const IsolatedExercise = (sources) => isolate(Exercise)(sources)

function main(sources) {

  const sinks = {
    DOM: sources.props.map( props =>
      div([
        props.map(exercise => IsolatedExercise({DOM: sources.DOM, props: Observable.of(exercise)}).DOM)
      ])
    )
  }
  return sinks
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  props: () => Observable.of(exercises)
}

Cycle.run(main, drivers)