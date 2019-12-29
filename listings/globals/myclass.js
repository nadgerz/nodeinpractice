function MyClass() {}

MyClass.prototype = {
  method: function() {
    return 'Hello'
  },
}

const myClass = new MyClass()

module.exports = myClass //<co id="callout-globals-modules-1" />
