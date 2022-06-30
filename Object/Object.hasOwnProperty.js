const baseSymbol = Symbol('base')
const base = { base: 'base', baseSymbol: 'baseSymbol', fn: () => console.log('base') }
const derived = Object.create(base)
const derivedSymbol = Symbol('derived')
derived.derived = 'derived'
derived[derivedSymbol] = 'derivedSymbol'
derived.fn = () => console.log('derived')

for (let key in derived) {
  if (Object.hasOwnProperty.call(derived, key)) {
    console.log(key + ' is own property')
  } else {
    console.log(key + ' is not own property')
  }
}
console.log(Object.keys(derived))

// Object.keys will return all own properties of an object
// corresponding to the Object.hasOwnProperty
// but for in loop will loop through all properties of an object
