
// * EXPORTS
const FN = require('../../utils/alerts');
const _ = require('lodash');
const DB = require('../../services/api.service.lowdb');

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

        $scope.isLoadingItem = false;
        // $scope.isProfile = false;

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
            await DB.read('instrument').then((resp) => {
                let itemListEB = [];
                let itemListES = [];
                $scope.itemList = resp.data;
                resp.data.forEach((e) => {
                    if (e.modality == "Ensino Básico")
                        itemListEB.push(e);
                    if (e.modality == "Ensino Superior")
                        itemListES.push(e);
                });
                $scope.itemListEB = _.orderBy(itemListEB, ['orderCode'], ['asc']);
                $scope.itemListES = _.orderBy(itemListES, ['orderCode'], ['asc']);

            }).finally(() => {
                $scope.isLoadingItem = false;
                $('#instrumentModal').modal('hide');
                $scope.$digest();
            });
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


        // -----------------------------------------------------------------

        //* CREATE EVIDENCIA
        function createEvidencia() {
            var formEvidencia = document.getElementById('form-evidencia-modal');
            var formData = new FormData(formEvidencia);

            (FN.fnConfirm()) ? DB.create('evidencia', formData).then((resp) => {
                (fnOk(resp)) ? msgFailure(resp.data.message)
                    : readEvidenciaFilter({ '_acao': $scope.item._id });
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        // * FILESIZE
        function fnFilesize(item) {
            return filesize(item).human('jedec');
        }

        // * READ FILE
        function fnOpenFile() {
            var input = document.getElementById('file');

            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                var output = document.getElementById('output');
                output.src = dataURL;
            };
            reader.readAsDataURL(input.files[0]);
            console.log(input.files[0])
        };

        /**
         * @returns Retorna um array de metas
         */
        function readMeta() {
            return DB.read('meta').then((resp) => { return resp.data; });
        }

        /**
         * @param {Object} filter Objeto JSON usado para filtrar a busca
         * @returns Retorna um array de metas filtradas
         */
        function readMetaFilter(filter) {
            return DB.readFilter('meta/filter', filter).then((resp) => { return resp.data; });
        }

        /**
         * @param {Object} filter Objeto JSON usado para filtrar a busca
         * @returns Retorna um array de estrategias filtradas
         */
        function readEstrategiaFilter(filter) {
            return DB.readFilter('estrategia/filter', filter).then((resp) => { return resp.data; });
        }

        /**
         * @param {Object} filter Objeto JSON usado para filtrar a busca
         * @returns Retorna um array de acoes filtradas
         */
        function readAcaoFilter(filter) {
            return DB.readFilter('acao/filter', filter).then((resp) => { return resp.data; });
        }

        /**
         * @description Insere uma imagem na pagina
         * @param {String} item identificador do seletor (class, id, name, etc)
         */
        function fnSetImgThumbs(item) {
            if (item.tipo != 'URL') {
                const selector = "#img-thumb-" + item._id;
                const elem = document.querySelector(selector);
                elem.style.backgroundImage = `url(${item.url})`;
            }
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