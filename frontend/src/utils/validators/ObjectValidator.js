module.exports = {
    "meta": meta(),
    "estrategia": estrategia(),
    "acao": acao()
}

function meta() {
    return {
        "codigo": stringToInteger(x)
    }
}

function estrategia() {
    return {
        "codigo": function (x) { return (isNaN(x)) ? x : parseInt(x) }
    }
}

function acao() {
    return {
        "codigo": function (x) { return (isNaN(x)) ? x : parseInt(x) }
    }
}

function stringToInteger(x){
    return (isNaN(x)) ? null : parseInt(x);
}