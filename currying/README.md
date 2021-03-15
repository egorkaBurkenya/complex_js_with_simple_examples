# Currying 🦠

## Каррирование ➡

Я думаю, что не каждый из вас слышал о такой веще как *Каррирование*, потому что это не обязательное знание и мало кто расскажет вам что это такое.

Но я уверен, что просматривая год Мидл или Сеньер разработчиков, вы могли замечать очень странную запись:
```js
let elem = tag => className => text => `<${tag} class=${className}>${text}</${tag}>` 
```
Соглашусь, что выглядит это давольно пугающе ! но давайте попробуем разабраться, что означает эта запись

Запишем ее более понятным образом: 
```js
function elem(tag) {
  return function(className) {
    return function(text) {
      return `<${tag} class=${className}>${text}</${tag}>` 
    }
  }
}
```
мы создаем функцию `elem`, которая принимает в себя параметр `tag` и возвращает нам новую функцию, которая в свою очередь приимает параметр `className` и возвращает нам еще одну новую функцию, которая принимает в себя параметр `text` и уже эта функция, наконец-то возвращает нам строчку в которую мы подставляем все передаваемые значения.

Так как вторая функция (принимающая в себя параметр `className`) находиться в облости видимости функции `elem` после ее возврата, ей остается доступен параметр `tag`, тоже самое касаеться и последней функции и параметров `tag`, `className`.

> Таким образом, мы "разделили" параметры функции и можем передавать их поэтапно

*** 

Когда мы разобрались, что означает эта страшная запись, давайте разберем, что конкретно она делает, и как мы можем это использовать. 

`elem` - это функция для создание html элементов:
```html
<!-- HTML элемент выглядит таким образом -->
<div class="some_class">Some content</div>
```
мы заменяем все поля `div`, `"some_class"`, `Some content` на переменные, и таким образом получаем костомный элемент:
```js
`<${tag} class=${className}>${text}</${tag}>`
```

Теперь использую функцию `elem` мы можем создать HTML элемент:
```js
let elem = tag => className => text => `<${tag} class=${className}>${text}</${tag}>` 

const someElem = elem("div")("some_class")("Some content")

console.log(someElem)
___________________________________________________________
>> `<div class="some_class">Some content</div>`
```

Но чем это отличаеться от функции, в которую мы сразу передаем 3 параметра(tag, className, text) ?

> Об этом уже было написанно выше "*...мы "разделили" параметры функции и можем передавать их поэтапно*"

Давайте посмотрим на реальном примере: 

Например мы можем создать заготовку для `div` элементов:
```js
let elem = tag => className => text => `<${tag} class=${className}>${text}</${tag}>` 

let div = elem("div")
console.log(div) // tag теперь добавлен в конечную строчку
________________________
>> className => text => `<${tag} class=${className}>${text}</${tag}>`
```

мы создали переменную `div` которая являеться конструктором HTML элемента `<div></div>`, теперь, мы можем передать класс и контент и получить готовый элемент:
```js
let elem = tag => className => text => `<${tag} class=${className}>${text}</${tag}>` 

let div = elem("div")

console.log( div("some_class")("Some content") )
________________________________________________
>> `<div class="some_class">Some content</div>`
```

### ✨ Вуаля !
Понятное дело, что так же как и `tag` мы можем отдельно передать и класс:

```js
let elem = tag => className => text => `<${tag} class=${className}>${text}</${tag}>` 

let div = elem("div")
let container = div("container")

console.log("теперь класс, так же добавлен в элемент - " + container )

console.log("и теперь нам осталось, положить только контент - " + container("Some content"))
________________________________________________
>> теперь класс, так же добавлен в элемент - text => `<${tag} class=${className}>${text}</${tag}>`

>> и теперь нам осталось, положить только контент - `<div class="container">Some content</div>`
```

# [Практическое приминение](https://github.com/egorkaBurkenya/complex_js_with_simple_examples/tree/main/currying/example)

Создадим html файл со следующей структурой:
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <div class="container">
    <h1 class="title">Currying ✨</h1>
    <div class="content">
    
    </div>
  </div>
</body>

<script src="./main.js"></script>

</html>
```

Добавим небольшое кол-во стилей ([стили](https://github.com/egorkaBurkenya/complex_js_with_simple_examples/tree/main/currying/example/style.css))

<div align="center">
  <img src=./example/img/html.jpg height="400px">
</div>

Весь наш контент мы будем помещать в `div` с классом `content` поэтому выберем его в нашем JavaScript скрипте, и сразу добавим нашу функцию `elem`:
```js
const content = document.querySelector(".content")

let elem = tag => className => text => `<${tag} class=${className}>${text}</${tag}>` 
```

Создадим конструкторы для элементов `div, h1, p`
```js
let div = elem("div")
let h1 = elem("h1")
let p = elem("p")
```
И сразу сделаем элементы, классы для которых заранее написаны в стилях:
```js
let box = div("box")
let box_title = h1("box__title")
let box_content = p("text")
```

☄ отлично ! теперь у нас готово все, что бы создавать и добавлять элементы на нашу html страничку, давайте попробуем создать первый `box` и положить в него, заголовок и текст:
```js
let box1 = box(
  box_title("Заголовок 🥇") +
  box_content("Какой либо контент")
)

content.innerHTML = box1
```
<div align="center">
  <img src=./example/img/box1.jpg height="400px">
</div>

И по этому же примеру, добавим еще 2 `box`:
```js
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
```
<div align="center">
  <img src="./example/img/example.jpg" height="400px">
</div>

### Вот мы и разобрались с каррированием 

