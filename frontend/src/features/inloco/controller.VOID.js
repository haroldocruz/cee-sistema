
let dimensionList = [
    { _id: 1 },
    { _id: 2 }
];
let dList = [...dimensionList]

let indicatorList = [
    { _id: 1, _dimension: { _id: 1 }, act: "Recredenciamento" },
    { _id: 2, _dimension: { _id: 1 }, act: "Credenciamento" },

    { _id: 3, _dimension: { _id: 2 }, act: "Recredenciamento" },
    { _id: 4, _dimension: { _id: 2 }, act: "Credenciamento" }
];
let iList = [...indicatorList]

let criteryList = [
    { _id: 1, orderCode: 1, _indicator: { _id: 1 } },
    { _id: 2, orderCode: 2, _indicator: { _id: 1 } },

    { _id: 3, orderCode: 1, _indicator: { _id: 2 } },
    { _id: 4, orderCode: 2, _indicator: { _id: 2 } },

    { _id: 5, orderCode: 1, _indicator: { _id: 3 } },
    { _id: 6, orderCode: 2, _indicator: { _id: 3 } },

    { _id: 7, orderCode: 1, _indicator: { _id: 4 } },
    { _id: 8, orderCode: 2, _indicator: { _id: 4 } }
];
let cList = [...criteryList]

let item = { act: "Recredenciamento" }

function getCritery(indicator, cList) {
    let cl = cList.filter((critery, idx, list) => {
        if (critery._indicator._id == indicator._id) {
            // list.splice(idx, 1);
            return critery;
        }
    });
    return cl;
}
function getIndicator(dimension, iList) {
    let il = iList.filter((indicator, idx, list) => {
        if (indicator._dimension._id == dimension._id) {
            // list.splice(idx, 1);
            return indicator;
        }
    });
    return il;
}

confInstrument2(item)
function confInstrument2(item) {
    for (let i = 0; i < dimensionList.length; i++) {
        dimensionList[i]._indicator = getIndicator(dimensionList[i], indicatorList);
        for (let j = 0; j < dimensionList[i]._indicator.length; j++) {
            dimensionList[i]._indicator[j]._critery = getCritery(dimensionList[i]._indicator[j], cList);
        }
    }
    return dimensionList;
}

confInstrument(item)
function confInstrument(item) {
    for (let i = 0; i < dimensionList.length; i++) {
        for (let j = 0; j < indicatorList.length; j++) {
            if (indicatorList[j].act == item.act) {
                for (let k = 0; k < criteryList.length; k++) {
                    if (criteryList[k]._indicator._id == indicatorList[j]._id) {
                        if (!indicatorList[j]._critery)
                            indicatorList[j]._critery = [];
                        indicatorList[j]._critery.push(criteryList.splice(k, 1));
                    }
                }
                if (indicatorList[j]._dimension._id == dimensionList[i]._id) {
                    if (!dimensionList[i]._indicator)
                        dimensionList[i]._indicator = [];
                    dimensionList[i]._indicator.push(indicatorList.splice(j, 1));
                }
            }
        }
    }
    return dimensionList;
}