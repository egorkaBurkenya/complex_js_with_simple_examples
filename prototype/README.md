# prototype

У нас есть объект `person`

```javascript
const person = {
  name: "Egor",
  age: 25, 
  greet: function(){
    console.log("Greet!")
  }
}
```

Создав этот объект, в дальнейшим мы получаем доступ к полям, которые мы задали:

```javascript
>> person 
<- Object { name: "Egor", age: 25, greet: greet() }
____________________________________________________
>> person.name 
<- "Egor"
____________________________________________________
>> person.age
<- "25"
____________________________________________________
>> person.greet() 
<- "Greet !"
```

### А теперь сделаем нечто странно:

```javascript
>> person.sayHello()
**Uncaught TypeError: person.sayHello is not a function**
```

Мы получим ожидаемую ошибку, ведь в объект person мы не добавляли функцию `sayHello`

*** 

Но давайте теперь попробуем вызвать метод `toString()` у нашего объекта 

```javascript
>> person.toString()
<- "[object Object]"
```

Возникает логичный вопрос, почему на функцию `sayHello` у нас выдаеться ошибка (в принципе логично, потому что мы ее не определяли), но когда мы вызываем метод `toString()` (который мы кстати тоже не задавали) никакой ошибки у нас нет ? 

На самом деле именно так и работают прототипы ! 
И учитывая что у объекта нет метода `sayHello` мы получили ошибку, но у пратотипа объекста, есть метод `toString()` следовательно мы получили некоторое значение !

***

Пока что ничего не понятно, но давайте напишем следующее:

```javascript
>> person 
<- Object { name: "Egor", age: 25, greet: greet() }
```
В консоле мы можем раскрыть объект:

```javascript
>> {…}
​
age: 25
​
greet: function greet()
​
name: "Egor"
​
<prototype>: Object { … }
```
Но кроме всех заданных нами ранее полей, браузер так же показывает нам некое свойство: `<prototype>: Object { … }`
Object - это название радительского "класса" от которого наследуеться наш объект `person`
И если раскрыть данное свойство, мы увидим большое кол-во методов:

```javascript
{…}
​
age: 25
​
greet: function greet()
​
name: "Egor"
​
<prototype>: {…}
​​
__defineGetter__: function __defineGetter__()
__defineSetter__: function __defineSetter__()
__lookupGetter__: function __lookupGetter__()
__lookupSetter__: function __lookupSetter__()
__proto__: 
constructor: function Object()
hasOwnProperty: function hasOwnProperty()
isPrototypeOf: function isPrototypeOf()
propertyIsEnumerable: function propertyIsEnumerable()
toLocaleString: function toLocaleString()
toString: function toString()
valueOf: function valueOf()
<get __proto__()>: function __proto__()
<set __proto__()>: __proto__()
```
*** 
Давайте не много перепишем наше приложение:

```javascript
const person = new Object({
  name: "Egor",
  age: 25, 
  greet: function(){
    console.log("Greet!")
  }
})
```
Результат данной записи, будет точно таким же, как и до этого, но тут мы явно видим, что мы создаем, новым экземпляр класса `Object` и следовательно понимаем, что все методы присущие к `Object` перейдут и к нашему объекту `person`:

```javascript
>> person 
<- Object { name: "Egor", age: 25, greet: greet() }
____________________________________________________
>> person.name 
<- "Egor"
____________________________________________________
>> person.age
<- "25"
____________________________________________________
>> person.greet() 
<- "Greet !"
```
На самом деле прототип, этот тот же объект, но который присутвует у родительских сущностей

***

Раз `prototype` являеться объектом, значит мы можем обращаться к нему:

```javascript
Object.prototype.sayHello = function() {
  console.log("Hello !")
}
```

Обратите внимание, что сначало мы создаем объект `person` у которого нет метода `sayHello()`,
Дальше мы обращаемя к прототипу класса, от которого мы создаем этот объект и добавляем в него метод `sayHello()`:

```javascript
>> person.sayHello()
<- "Hello !"
```
Мы получаем желаемый результат! 
По сути, благодоря нашей конструкции `Object.pro...` мы расширили базовый прототип Класса `Object` 

***
Создадим новый объект `lena`
У `Object` есть метод под названием **create()**, в который мы можем передать объект, который будет служить прототипом для нашего нового объекта 
```javascript
const lena = Object.create(person)
```

Если теперь мы посомтрим в консоль, мы увидим что `lena` являеться пустым объектом, но если мы попробуем вызвать у нее метод `greet()` мы увидим следущий результат:

```javascript
>> lena
<- Object {  }
____________________________________________________
>> lena.greet()
<- "Greet!"
```

Но объект `lena` на самом деле пустой, но если мы его раскроем и не увидив ничего на верхнем уровне опустимся в прототип:

```javascript
>> lena
<- {}
​
<prototype>: {…}
age: 25
greet: function greet()
name: "Egor"
<prototype>: Object { sayHello: sayHello(), … }
```

Следовательно если мы попробуем написать: `lena.name` как результат мы получим "Maxim", потому что это поле присущее прототипу `person`, но как вы понимаете это не логично и мы должны присвоить Лене свое имя:

```javascript
lena.name = "Elena"
```

теперь если посмотреть в терминал браузера мы увидим что на верхнем уровне появилось поле `name`:

```javascript
>> lena
<- Object { name: "Elena" }
```

*** 
## Так что же такое прототип ?

Это определенный объект, который присудствует у объектов и он вызываеться свреху вниз ! 

