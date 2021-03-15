const content = document.querySelector(".content")

let elem = tag => className => text => `<${tag} class=${className}>${text}</${tag}>` 

let div = elem("div")
let h1 = elem("h1")
let p = elem("p")

let box = div("box")
let box_title = h1("box__title")
let box_content = p("box__text")

let box1 = box(
  box_title("Заголовок 🥇") +
  box_content("Какой либо контент")
)

// content.innerHTML = box1

let box2 = box(
  box_title("Заголовок 🥈") +
  box_content("Другой контент")
)

let box3 = box(
  box_title("Заголовок 🥉") +
  box_content("Очередной контент")
)

content.innerHTML = box1 + box2 + box3
