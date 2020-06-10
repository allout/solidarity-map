// Takes a list of string params and returns an object containing mirrored key/value pairs
// Ie ['a', 'b', 'c'] becomes { a: 'a', b: 'b', c: 'c' }
export const getKeyMirror = (...items) =>
  items.reduce((acc, item) => {
    acc[item] = item
    return acc
  }, {})

// Returns an object keyed on the passed in array items. Each value is the index the item appears
// in the passed in array
export const getIndexLookup = (items) =>
  items.reduce((acc, item, index) => {
    acc[item] = index
    return acc
  }, {})

// Takes an array of objects and returns an object keyed on the id value inside each object in the
// array. Every value in the returned object is the array index to find the object of a particular id
export const getIdLookup = (items, idProp = '_id') =>
  items.reduce((acc, item, index) => {
    acc[item[idProp]] = index
    return acc
  }, {})
