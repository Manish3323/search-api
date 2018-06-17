const _ = require('lodash')
const moment = require('moment')

/**
  * @desc converts all the properties of object into an a Array of objects with key as index
  * @param object objects - containing similar objects with unique key or property
  * @return list of objects
*/
module.exports.ObjectsToArray = (objects) => {
  return _.flatMap(objects, (val, key) => {
    return {...val, key}
  })
}

/**
  * @desc search on the basis of dynamic property
  * @param Array arr - array of objects to be searched
  * @param string prop - property on which searching criteria to be applied
  * @param string valueToMatch - searchString
  * @return object if found else null
*/
module.exports.findByProp = (array, prop, valueToMatch) => {
  return _.find(array, (item) => { return item[prop] == valueToMatch })
}
/**
  * @desc converts long date to specified formatted date
  * @param string format - format in which date to be displayed
  * @returns date in specified format
*/
module.exports.convertDateTimeToDate = (dateTime, format) => {
  return moment(dateTime).locale('in').format(format)
}
/**
  * @desc converts long date to specified formatted date
  * @param string format - format in which time to be displayed
  * @returns time in specified format
*/
module.exports.convertDateTimeToTime = (dateTime, format) => {
  return moment(dateTime).locale('in').format(format)
}

/**
  * @desc returns a object from list whose property is equal to the property of object
  * @desc optional property if not supplied object key will be used to compare objects in list
  * @param object obj - will be used to iterate over the list
  * @param list[object] arr - list of objects
  * @param string objKey - property of object on which equality criteria to be applied
  * @param string keyInArray - property of an object inside list
  * @return object
  *
*/
module.exports.searchArrayByObjectKey = (obj, arr, objKey, keyInArray) => {
  return _.find(arr, (item) => {
    if (keyInArray) {
      if (item.keyInArray === obj.objKey) { return item }
    } else {
      if (item.objKey === obj.objKey) { return item }
    }
  })
}

/**
  * @desc search on the basis of dynamic MULTIPLE properties
  * @param Array arr - array of objects to be searched
  * @param string prop - property on which searching criteria to be applied
  * @param string valueToMatch - searchString
  * @return object if found else null
*/
// module.exports.findByManyProps = (array, props, valuesToMatch) => {
//   _.where(array, [props ])
// }

module.exports.orderBykey = (arr, key, type) => {
  return _.orderBy(arr, key, type)
}

module.exports.getCurrentDateTime = () => {
  return new Date().toLocaleString()
}

module.exports.cloneDeep = (arr) => {
  return _.cloneDeep(arr)
}

module.exports.arrayContainsItem = (arr, prop, value) => {
  return _.find(arr, (item) => { return item[prop] == value })
}


module.exports.getCurrentTime = () => {
  console.log(moment())
  return moment().valueOf()
}

module.exports.mergeArrays = mergeArrays = (arr1,arr2) =>{
    return  _.merge(arr1, arr2);
}