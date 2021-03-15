const container = document.querySelector(".container")

let elem = tag => className => text => `<${tag} class=${className}>${text}</${tag}>` 

// function elem(tag) {
//   return function(className) {
//     return function(text) {
//       return `<${tag} class=${className}>${text}</${tag}>` 
//     }
//   }
// }

let div = elem("div")

// console.log(div);

let newContainer = div("newContainer")

console.log("теперь класс, так же добавлен в элемент - " + newContainer )

let h1 = elem("h1")
let p = elem("p")

let title = h1("")("currying 💖")
let content = p("text")("content")

container.innerHTML = newContainer(title + content)