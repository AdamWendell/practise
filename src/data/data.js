export const exercises = [{
  exercise: 'Add 1 to each number in the array! ',
  startText: '[1, 2, 3]',
  awnser: [2, 3, 4],
  passed: false,
}, {
  exercise: 'Filter out all numbers ',
  startText: '[1, 4, 5, "a", "b", "c"]',
  awnser: ["a", "b", "c"],
  passed: false,
},{
  exercise: 'Sum up all numbers in the array',
  startText: '[1, 2, 3]',
  awnser: 6,
  passed: false,
 },{
   exercise: `Now you expert!
   So now we go on too a little harder exercise.
   Adams company have a problem with how they put their orders together.
   The company has a high in/output of items. So a lot of the time a few items on a order isn't in stock.
   This is how daily orders look in the system.

   orders = [
     {
       company: 'Lamp',
       VAT: 'Nope they don't pay tax.',
       items: [{
         item: 'smallCat',
         price: 200,
         amount: 56,
         stock: 900
       },{
         item: 'Daim',
         price:  1,
         amount: 2222200000,
         stock:  241
       }]
     },{
       company: 'Rxaqua',
       VAT: 1234111,
       items: [{
         item: 'hobo',
         price: -10,
         amount: 1,
         stock: 34444
       },{
         item: 'cinnamon',
         price: 233,
         amount: 23,
         stock: 15
       }]
     },
     {
       company: 'Laso',
       VAT: 71223123,
       items: [{
         item: 'ninja-assasination',
         price: 9999999999991,
         amount: 1,
         stock: 401
       },{
         item: 'LargeCat',
         price: 150,
         amount: 13,
         stock: 1
       }]
     }
   ]
You can now acces the orders variable with the data stored as above.
First challange is to return a array of the all the company names`,
   startText: '',
   awnser: ["Lamp","Rxaqua","Laso"],
   passed: false,
 },{
   exercise: 'Now we want an array that only contains the companies with a VAT number',
   startText: '',
   awnser: ["Rxaqua","Laso"],
   passed: false,
 }

]

export const data = [
  {
    company: 'Lamp',
    VAT: 'Nope they don\'t pay tax.',
    items: [{
      item: 'smallCat',
      price: 200,
      amount: 56,
      stock: 900
    },{
      item: 'Daim',
      price:  1,
      amount: 2222200000,
      stock:  241
    }]
  },{
    company: 'Rxaqua',
    VAT: 1234111,
    items: [{
      item: 'hobo',
      price: -10,
      amount: 1,
      stock: 34444
    },{
      item: 'cinnamon',
      price: 233,
      amount: 23,
      stock: 15
    }]
  },
  {
    company: 'Laso',
    VAT: 71223123,
    items: [{
      item: 'ninja-assasination',
      price: 9999999999991,
      amount: 1,
      stock: 401
    },{
      item: 'LargeCat',
      price: 150,
      amount: 13,
      stock: 1
    }]
  }
]


//,{

//   startText: '[1, 2, 3]',
//   awnser: 6,
//   passed: false,
// }