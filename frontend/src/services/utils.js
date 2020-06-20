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
};

let licao = removeAccents("lição");

licao

//------------------------------------------------------------
const cars = [{name: "emerSon xt"},{name: "washington"}]

function filters(string, objList, options) {
    let i = options.caseSensitive? 'i' : '';
    let g = options.global? 'g' : '';
    
    let list = objList.filter((e)=> new RegExp('\w*'+string, i+g).test(e.name));
    return list;
}

let people = filters("m", cars, {caseSensitive: true, global: true});
people

let cars2 = /([s])/ig.test(cars)
cars2
let s = "emerson"
let go = cars.filter((e)=> new RegExp('(['+s+'])', "i").test(e.name))
cars
go