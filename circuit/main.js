// function createMultFn(n) {
//   return function() {
//     console.log(1000 * n);
//   }
// }

// const mult = createMultFn(5)
// mult()

// function urlGenerator(domain) {
//   return function(url){
//     return `https://${url}.${domain}`
//   }
// }

// const comUrl = urlGenerator('com')
// const ruUrl = urlGenerator('ru')

// console.log(comUrl('google'));
// console.log(comUrl('gmail'));

// console.log(ruUrl('yandex'));
// console.log(ruUrl('mail'));

/*
  Написать новую функцию bind 
  Пример работы:

  function logSomeone() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
  }

  const personOne = {name: 'Egor', age: 17, job: 'Frontend'}
  const personTwo = {name: 'Oleg', age: 25, job: 'PhotoShop'}

  bind(personOne, logSomeone)
  bind(personTwo, logSomeone)
*/

function bind(context, fn) {
  return function(...args) {
    fn.apply(context, args)
  }
}

function logSomeone() {
  console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
}

const personOne = {name: 'Egor', age: 17, job: 'Frontend'}
const personTwo = {name: 'Oleg', age: 25, job: 'PhotoShop'}

bind(personOne, logSomeone)()
bind(personTwo, logSomeone)()