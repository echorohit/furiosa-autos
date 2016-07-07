'use strict';
var assert = require('assert');

/**
 * Writing this for only Array of strings as data is only array of String
 * @param order
 * @param data
 */

function alphabeticSort(order, data){
    assert(typeof order === 'string', 'order must be string');
    assert(Array.isArray(data), 'Data should be array of string');
    assert(data.length > 0, 'Empty Array is not acceptable');

    if(order === 'asc') {
        return data.sort();
    } else if(order === 'desc') {
        return data.sort(function(a, b){
            var val1 = a.toUpperCase();
            var val2 = b.toUpperCase();
            if(val1 < val2) {
                return 1;
            }
            if(val1 < val2) {
                return -1;
            }
            return 0;

        });
    } else {
        return data;
    }

}

function filterValuesByType(type, obj){

}

function filterServices(type, data){

    assert(typeof type === 'string', 'type must be string');
    assert(typeof data === 'object', 'Data should be object');

    var t = type.toLowerCase();

    var returnData  = [];
    for(var i in data){
        if(data[i].type == t) {
            returnData.push(data[i]);
        }
    }
    return returnData;

}


var helpers = {
    'alphabeticSort' : alphabeticSort,
    'filterServices': filterServices
};

module.exports = helpers;
