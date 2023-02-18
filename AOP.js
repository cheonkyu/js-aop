export default class AOP {
    constructor(target) {
        this.target = target
        this.handlers = {}
    }
    before(key, callback) {
        if(typeof callback !== 'function') {
            return this
        }
        if(!this.handlers[key]) {
            this.handlers[key] = {
                befores: [],
                afters: []
            }
        }
        this.handlers[key].befores.push(callback)
        return this
    }
    after(key, callback) {
        this.key = key
        if(typeof callback !== 'function') {
            return this
        }
        if(!this.handlers[key]) {
            this.handlers[key] = {
                befores: [],
                afters: []
            }
        }
        this.handlers[key].afters.push(callback)
        return this
    }
    both(key, callback) {
        if(typeof callback !== 'function') {
            return this
        }
        if(!this.handlers[key]) {
            this.handlers[key] = {
                befores: [],
                afters: []
            }
        }
        this.handlers[key].befores.push(callback)
        this.handlers[key].afters.push(callback)
        return this
    }
    main() {
        const { target, handlers } = this
        const keys = Object.keys(handlers)
        keys.forEach(function (key) {
            let orgFn = target[key]
            if(typeof orgFn !== 'function') {
                return
            }
            const { befores, afters } = handlers[key]
            target[key] = function() {
                try{
                    befores.forEach(callback => {
                        callback({ params: [...arguments] })
                    })
                } catch(e) {
                    console.error('error-before', e)
                }

                let result
                try {
                    result = orgFn.apply(this, arguments)
                } catch(e) {
                    console.error(e)
                    if(typeof onError === 'function') {
                        onError({ params: [...arguments], e })
                    }
                }

                try {
                    afters.forEach(callback => {
                        callback({ params: [...arguments] })
                    })
                } catch(e) {
                    console.error('error-after', e)
                }
                return result
            }
        })
        return this
    }
}