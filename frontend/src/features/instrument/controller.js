
// * IMPORTS
const FN = require('../../utils/alerts');
const _ = require('lodash');
const DB = require('../../services/api.service.lowdb');
const ModalityEnum = require('../../utils/enumerations/ModalityEnum')();

const filesize = require('file-size');

controller.$inject = ['$injector', '$scope', '$state'];
export default function controller($injector, $scope, $state) {

    (async function () {

        // * CONSTANTS AND VARIABLES
        $scope.itemList = [];
        $scope.itemListEB = [];
        $scope.itemListES = [];
        $scope.item = null;
        $scope.x = {}
        $scope.modalityList = Object.values(ModalityEnum);

        $scope.isLoadingItem = false;

        // * DECLARATION OF FUNCTIONS
        $scope.createItem = createItem;
        $scope.editItem = editItem;
        $scope.updateItem = updateItem;
        $scope.deleteItem = deleteItem;

        window.onload = fnRead();

        // * EDIT
        function editItem(x) {
            $scope.x = (x) ? x : {};
        }

        //* READ
        async function fnRead() {
            $scope.isLoadingItem = true;
            let itemList = readItem('instrument');
            $scope.itemListEB = separateInstrumentEB(itemList);
            $scope.itemListES = separateInstrumentES(itemList);
            $scope.isLoadingItem = false;
            $('#instrumentModal').modal('hide');
            $scope.$digest();
        }

        /**
         * @description Verifica se o state inserido é o state atual
         * @param {String} stateName Nome do estado a ser verificado
         * @returns Retorna true ou false
         */
        function fnVerifyStateName(stateName) {
            return ($state.current.name == stateName) ? true : false;
        }

    })()
}

async function readItem(modelName) {
    let resp = await DB.read(modelName);
    return resp.data;
}

//* CREATE
function createItem(modelName, x) {
    (FN.fnConfirm()) ? DB.create(modelName, x).then((resp) => {
        (fnOk(resp)) ? msgSuccess(resp.data.success) : msgFailure(resp.data.message);
    }).finally(() => { fnRead(); }) : msgWarning('Cancelado pelo usuário');
}

//* UPDATE
function updateItem(modelName, x) {
    (FN.fnConfirm()) ? DB.update(modelName, x).then((resp) => {
        (fnOk(resp)) ? msgSuccess(resp.data.message) : msgFailure(resp.data.message);
    }).finally(() => { fnRead(); }) : msgWarning('Cancelado pelo usuário');
}

//* DELETE
function deleteItem(modelName, x) {
    (FN.fnConfirm()) ? DB.delete(modelName, x).then((resp) => {
        (fnOk(resp)) ? msgSuccess(resp.data.message) : msgFailure(resp.data.message);
    }).finally(() => { fnRead(); }) : msgWarning('Cancelado pelo usuário');
}

function separateInstrumentEB(instrumentList) {
    let itemListEB = instrumentList.filter((e) => {
        if (e.modality == ModalityEnum.ENS_BAS)
            return e;
    });
    return _.orderBy(itemListEB, ['orderCode'], ['asc']);
}

function separateInstrumentES(instrumentList) {
    let itemListEB = instrumentList.filter((e) => {
        if (e.modality == ModalityEnum.ENS_SUP)
            return e;
    });
    return _.orderBy(itemListEB, ['orderCode'], ['asc']);
}

//* OTHERS

/**
 * @description Verifica se a resposta é sucesso ou falha
 * @param {Object} resposta Resposta do servidor (formato= resp.data.success: boolean)
 * @returns Retorna true ou false
 */
function fnOk(resposta) {
    return (resposta.data.success) ? true : false;
}

function msgSuccess(message) {
    FN.fnAlertBottom('success', message)
}

function msgWarning(message) {
    FN.fnAlertBottom('warning', message)
}

function msgFailure(message) {
    FN.fnAlertBottom('failure', message)
}

function fnToggle(sentence) {
    return !sentence;
}
