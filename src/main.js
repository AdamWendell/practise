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
  const code$ = initialCode$.concat(input$)
  const errorFree$ = code$.map(code => eval(code)).retryWhen(err => err.delay(0)).map(code => {
    console.log(code);
    return code})
  const test$ = Observable
    .combineLatest(errorFree$, prop$, (code, props) => isEqual(code, props.awnser))

  return Observable.combineLatest(test$, prop$, errorFree$,(passingCodeBolean, props, result) => {
    console.log(passingCodeBolean);
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
  DOM: makeDOMDriver('#main-container'),
  props: () => Observable.of(exercises)
}

Cycle.run(main, drivers)