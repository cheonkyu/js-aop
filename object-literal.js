import AOP from './Aop.js'

let item = {
    name: 'item',
    unit: 2,
    price: 1000,
    calc: function () {
        return this.unit * this.price
    },
    setUnit: function (unit) {
        this.unit = unit
    },
    setPrice: function (price) {
        this.price = price
    }
}
let item1 = {
    name: 'item1',
    unit: 3,
    price: 1000,
    calc: function () {
        return this.unit * this.price
    },
    setUnit: function (unit) {
        this.unit = unit
    },
    setPrice: function (price) {
        this.price = price
    }
}
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