


module.exports = {
    "filters": filters,
    "invalidField": invalidField,
    "extend": extend,
    "percentual": percentual,
    "toggle": toggle,
    "removeAccents": removeAccents,
    "getRandomArbitrary": getRandomArbitrary,
    "getRandomInt": getRandomInt,
    "getRandomIntInclusive": getRandomIntInclusive
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggle(validate) {
    return (validate) ? false : true;
    // return !validate;
};

/**
 * @description Calcula a proporção de um valor sobre outro em porcentagem
 * @param {Number} actual Valor atual
 * @param {Number} max Valor máximo
 * @param {Number} dec Número de casas decimais
 * @returns Retorna um numero do tipo 'float'
 */
function percentual(max, actual, dec) {
    return parseFloat(((actual * 100) / (max)).toFixed(dec));
};
// EXAMPLE:
// percentual(12, 8, 2) //?

function invalidField(field) {
    return (field !== undefined && field !== null && field !== "") ? true : false;
}

/**
 * @description Copia objetos JSON (sem fazer referencia)
 * @param {Object} from Objeto que será copiado
 * @param {Object} to Objeto cópia
 * @example extend(ObjOriginal, ObjCopy);
 * @example var ObjCopy = extend(ObjOriginal)
 */
function extend(from, to) {
    if (from == null || typeof from != "object") return from;
    if (from.constructor != Object && from.constructor != Array) return from;
    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
        from.constructor == String || from.constructor == Number || from.constructor == Boolean)
        return new from.constructor(from);

    to = to || new from.constructor();

    for (var name in from) {
        to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];
    }

    return to;
}

function filters(string, objList, options) {
    let i = options.caseSensitive ? 'i' : '';
    let g = options.global ? 'g' : '';

    let list = objList.filter((e) => new RegExp('\w*' + string, i + g).test(e.name));
    return list;
}

/**
 * @description Remove acentuações das palavras
 * @param {String} source Texto a ser analizado
 * @returns Retorna o texto sem acentuações
 */
function removeAccents(source) {
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g  // C, c
    ],
        noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    for (var i = 0; i < accent.length; i++) {
        source = source.replace(accent[i], noaccent[i]);
    }

    return source;
}
// EXAMPLE:
// removeAccents("Acentuações áêÀË"); //?

/**
 * @description Retorna o maior valor dentre as chaves de um único objeto
 * @param {Object} obj Objeto a ser verificado
 * @returns Retorna o valor maior
 * @example var maior = returnMaxLength({ "frutas": 50, "vegetais": 100, "carnes": 150 });
 */
function returnMaxLength(obj) {

    var maior = Object.keys(obj).sort(function (a, b) {
        return obj[a] > obj[b] ? -1 :
            obj[b] > obj[a] ? 1 : 0;
    })[0]; //?

    return maior;
}
// EXAMPLE:
// returnMaxLength({ "frutas": 50, "vegetais": 150, "carnes": 100 }); //?