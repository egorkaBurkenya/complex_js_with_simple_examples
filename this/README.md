# this and how work call, bind, apply 

Создадим простейшую функцию:
```javascript
function hello(){
  console.log(`Hello`, this);
}
```
В `console.log` первым параметром мы передадим строчку *Hello*, а вторым специальное ключевое слово `this`, которое указывает на текущий контекст

Если мы вызовем в консоли браузера функцию `hello`:

```javascript 
>> hello()
<- Hello Window
```

* Мы получаем строчку *Hello*
* Вторым параметром мы получаем объект `window` это глобальный объект, который если мы раскроем:

```javascript 
<- Hello Window
​
hello: function hello()​
<default properties>
Symbol(Symbol.toStringTag): "Window"
<prototype>: WindowPrototype { … }
```
Получим тот же набор функций.

*** 
Что бы разобраться, давайте создадим новый объект:

```javascript 
const person = {
  name: 'Egor',
  age: 17, 
  sayHello: hello
}
```
Зададим ему поля: `name` и `age`, и третьем полем создадим функцию `sayHello` куда мы передадим ранее созданую функцию `hello`

Если мы вызовем новый объект `person` в консоли, то мы получим вполне ожидаемый результат:
```javascript
>> person
<- Object { name: "Egor", age: 17, sayHello: hello() }
```

Теперь давайте попробуем вызвать метод `sayHello` у нашего объекта:

```javascript 
>> person.sayHello()
<- Hello 
Object { name: "Egor", age: 17, sayHello: hello() }
```

* мы также получаем строчку *Hello*
* но дальее, вместо ключевого слова `this` мы получаем сам объект. 

### Как же это работет ? 

На самом деле, мы можем переписать вызов функции hello() не много иначе:

```javascript 
>> window.hello()
<- Hello Window
```

Мы обратимся к глобальному объекту `window` и вызовем у него метод `hello()` и получим наш старый результат. 

Идея в том что когда мы вызываем функцию `hello` мы выводим в косоль ключевое слово `this`, которое указывает на объект, в контексте которого оно было вызвано, тоесть то что стоит слево от точки, когда мы вызываем функцию. 

Получается, что когда мы вызываем функцию `hello` у объекта `window` мы получаем вместо ключевого слова this объект `window`. А когда у объекта `person` мы получаем сам объект `person`. 

> ключевое слово `this` всегда динамично и указывает на объект в контексте которого оно было вызванно 

Вот и вся теория отностительно **контекста** ! 

*** 

### Теперь давайте посмотрим, как мы можем взаимодейстовать с контекстом 

Мы хотим создать новую функцию в объекте `person`, которая так же будет ссылаться на функцию `hello`, но мы хотим что бы контекст был глобального объекта `window`, а не самого объекта `person`:

Создадим новую функцию:

```javascript 
const person = {
  name: 'Egor',
  age: 17, 
  sayHello: hello,
  sayHelloWindow: hello
}
```
Но сейчас `sayHelloWindow` будет так же ссылаться на объект `person`.
Но что бы передавать и вызывать функцию с указаным контекстом мы можем воспользоваться встроенными методами. 
Как мы помним в javascript все "объекты" являются объектами ! в том числе и функции, а то означает что у них есть поумолчанию встроенные методы. 

***
### bind()

Вызовем у функции `hello` специальный метод `bind()` и в качестве значение, мы можем передать объект, который будет контекстом вызова данной функции, в нашем случае `window`:
```javascript 
const person = {
  name: 'Egor',
  age: 17, 
  sayHello: hello,
  sayHelloWindow: hello.bind(window)
}
```
И если сейчас мы вызовем нашу функцию в коносле (даже учитывая, что мы вызываем ее в объекте `person`):
```javascript 
>> person.sayHelloWindow()
<- Hello Window
```
Мы получим в качетсве результата: объект `window` ! потому что мы "забиндили" данный контекст

Но на самом деле мы можем не много переписать нашу запись и передать вместо объекта `window` ключевое слово `this`:
```javascript 
const person = {
  name: 'Egor',
  age: 17, 
  sayHello: hello,
  sayHelloWindow: hello.bind(this)
}
```
И посмотрев в консоль мы получим тот же самый результат: 
```javascript 
>> person.sayHelloWindow()
<- Hello Window
```

Потому что на самом деле, ключевое слово this по умолчанию ссылаеться на глобальный объект `window`:

```javascript
>> this
<- Window
____________________________
// мы можем легко это проверить:
>> this === window
<- true
```

И следовательно, если мы будем передавать другой объект, например `document`:

```javascript
const person = {
  name: 'Egor',
  age: 17, 
  sayHello: hello,
  sayHelloWindow: hello.bind(document)
}
______________________________________
// в качестве результата мы получим:
>> person.sayHelloWindow()
<- Hello 
HTMLDocument
```
*** 
### Как же приминять это на практике ? 

Добавим новую функцию `logInfo` в наш объект `person`, которая должна будет выводить информацию об объекте:

```javascript
const person = {
  name: 'Egor',
  age: 17, 
  sayHello: hello,
  sayHelloWindow: hello.bind(document),
  logInfo: function(){
    console.log(`Name is ${this.name}`) // в данном случае this будет ссылаться на объект person, потому что функция было создана в его контексте
    console.log(`Age is ${this.age}`)
  }
}
```
Вызовем у объекта новую функцию `logInfo`:
```javascript
>> person.logInfo()
<- Name is Egor
<- Age is 17
```
Получаем ожидаемый результат, как раз таки потмоу что ключи `name, age` беруться у объекта `person`

Теперь созданим новый объект `lena`:
```javascript
const lena = {
  name: 'Elena',
  age: '23',
}
```
Теперь у нас есть новый объект, но у него нету функции `logInfo`, можем ли вы воспользоваться ей, что бы вывести информацию о новом объекте ? 
Конечно можем ! 

```javascript
person.logInfo.bind(lena)()
___________________________
<- Name is Elena 
<- Age is 23
```
Мы вызываем у функции `logInfo` метод `bind` что бы назначить ей контекст объекта `lena` и сразу вызываем нашу функцию, потому что `person.logInfo.bind(lena)` лишь возвращает нам новую функцию, которая привязала к себе новый контекст (поэтому ставим скобки).

*** 
Сделаем метод `logInfo` немного красивее:

```javascript
const person = {
  name: 'Egor',
  age: 17, 
  sayHello: hello,
  sayHelloWindow: hello.bind(document),
  logInfo: function(){
    console.group(`${this.name} info:`) // добавим заголовок нащей группе
    console.log(`Name is ${this.name}`) // некоторая информация
    console.log(`Age is ${this.age}`)
    console.groupEnd() // закрываем группу
  }
}
__________________________________________
<- Elena info:
    Name is Elena 
    Age is 23
```

Давайте для примера, будем передавать в функцию `logInfo` дополнительные параметры, которые мы так же хотим вывести:

```javascript
const person = {
  name: 'Egor',
  age: 17, 
  sayHello: hello,
  sayHelloWindow: hello.bind(document),
  logInfo: function(job, phone){ // дополнительные параметры job, phone
    console.group(`${this.name} info:`)
    console.log(`Name is ${this.name}`)
    console.log(`Age is ${this.age}`)
    console.log(`Job is ${job}`) 
    console.log(`Job is ${phone}`)
    console.groupEnd()
  }
}

const lena = {
  name: 'Elena',
  age: '23',
}

person.logInfo.bind(lena)()
_____________________________________
// ну и логично что если мы оставим все как есть:
<- Elena info:  
    Name is Elena 
    Age is 23 
    Job is undefined 
    Job is undefined
```
Так как пока мы вызываем функцию `person.logInfo.bind(lena)()` не передавая в нее праметры, как результат мы получаем `undefined`

Давайте разберемся как передавать параметры, когда мы вызываем у функции метод `bind`
1. Передать параметры в ново созданную функцию, с указаным контекстом:

```javascript
const fnLenaInfoLog = person.logInfo.bind(lena)
fnLenaInfoLog('Frontend', '8-999-999-99-99')
___________________________________________
<-  Elena info: 
      Name is Elena 
      Age is 23 
      Job is Frontend 
      Job is 8-999-999-99-99
```
в метод `bind` после параметра контекста, мы можем сразу передавать последующие параметры, которые нужны для работы функции:
```javascript
const fnLenaInfoLog = person.logInfo.bind(lena, 'Frontend', '8-999-999-99-99')
fnLenaInfoLog()
___________________________________________
<-  Elena info: 
      Name is Elena 
      Age is 23 
      Job is Frontend 
      Job is 8-999-999-99-99
```
2. Методы `call, apply` 

Метод `call` - впринципе похож на метод `bind`, но имеет небольшое отличие:
```javascript
person.logInfo.bind(lena, 'Frontend', '8-999-999-99-99')()
person.logInfo.call(lena, 'Frontend', '8-999-999-99-99')
```

в отличие от метода `bind` нам уже не нужно вызывать функцию, метод `call` принимает контекст, параметры и сразу вызывает функцию! 

Метод `apply` - так же как и метод `call` имеет не слишком сильные отличия от метода `bind`:

```javascript
person.logInfo.apply(lena, ['Frontend', '8-999-999-99-99'])
```
Метод `apply` всегда принимает только два парамета: 
* контекст (в нашем случае `lena`)
* Массив с остальными параметрами (второй параметр, всегда должен быть массивом)

*** 
### И наконец-то простой практический пример:

У нас есть массив:
```javascript
const array = [1, 2, 3, 4, 5]
```
Перед нами стоит задача: 
> написать такую функцию, которая позволит перемножить каждое значение массива, на определенное число, которое мы будем передавать

В обычном случае, мы бы написали функцию например `multBy` куда мы будем передавать два параметра: сам массив и число.
Далее мы бы возвращали массив, у которого мы вызываем метод `map` с функцией, которая каждую итерацию принимает каждое значение массива, и возвращает его умноженным на передданое, нами число:

```javascript
function multBy(arr, n){
  return arr.map(function(i){
    return i * n
  })
}
console.log(multBy(array, 2));
_______________________________
Array(5) [ 2, 4, 6, 8, 10 ]
```

На самом деле, это не самый удобный вариант в **некоторых** случаях,
* Эту фунцкию всегда нужно будет импортировать
* Всегда нужно будет передавать в нее некий Массив  

А как сделать так что бы у массива `array` сразу был метод, который бы позволял сделать подобный функционал ? 

Как раз таки для этого мы можем использовать `prototype`:

```javascript
Array.prototype.multBy = function (n) {
  return this.map(function(i){
    return i * n
  })
}

console.log(array.multBy(2));
_____________________________
Array(5) [ 2, 4, 6, 8, 10 ]
```
Мы обращаемся к прототипу родительского объекы нашего массива `Array.prototype`
И создаем новый метод `multBy` и повторяем функционал предыдущей функции, исключая массив, как передоваемый параметр. Заменяем наш массив на ключевое слово `this` (которое будет ссылать на массив у которого мы вызываем метод `multBy`) и вуаля ! 
Мы получили унивирсальный метод, который будет присущ всем массивам !  






