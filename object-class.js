import AOP from './Aop.js'

class Item {
    constructor(name, unit, price) {
        this.name = name
        this.unit = unit
        this.price = price
    }
    calc() {
        return this.unit * this.price
    }
    setUnit(unit) {
        this.unit = unit
    }
    setPrice(price) {
        this.price = price
    }
}

let item = new Item('item', 2, 1000)
let item1 = new Item('item', 3, 1000)
new AOP(item)
    .before('calc', ({ result, params }) => console.log(`item [before] ${new Date().toTimeString()} result: ${result}, params: ${params}`))
    .after('calc', ({ result, params }) => console.log(`item [after] ${new Date().toTimeString()} result: ${result}, params: ${params}`))
    .main()

new AOP(item1)
    .before('calc', ({ result, params }) => console.log(`item1 [before] ${new Date().toTimeString()} result: ${result}, params: ${params}`))
    .after('calc', ({ result, params }) => console.log(`item1 [after] ${new Date().toTimeString()} result: ${result}, params: ${params}`))
    .main()

item.calc()
item.setPrice(2000)
item.calc()
item.setUnit(3)
item.calc(123,23)

item1.calc()
item1.setUnit(3)