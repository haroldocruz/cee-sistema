
const DB = require('../../services/api.service.axios');
const filesize = require('file-size');

controller.$inject = ['$injector', '$scope', '$state'];
export default function controller($injector, $scope, $state) {

    (async function () {

        // * EXPORTS
        var FN = await require('../../utils/alerts');
        var Util = require('../../utils/util');
        
        $scope.situacaoEnum = require('../../utils/enumerations/SituacaoEnum')()
        $scope.statusEnum = require('../../utils/enumerations/StatusEnum')()

        // * CONSTANTS AND VARIABLES
        const list = (localStorage.getItem('critery')) ? JSON.parse(localStorage.getItem('critery')) : [];
        $scope.itemList = _.orderBy(list, ['_dimension.orderCode', '_indicator.orderCode', 'orderCode'], ['asc', 'asc', 'asc'])
        $scope.dimensionList = (localStorage.getItem('dimension')) ? JSON.parse(localStorage.getItem('dimension')) : [];
        $scope.indicatorList = [];

        $scope.item = null;
        $scope.x = {}

        formatCode($scope.itemList);
        function formatCode(cList){
            cList.forEach((e,i,l)=>{
                e.formattedCode = e._dimension.orderCode + '.' + e._indicator.orderCode + '.' + e.orderCode;
            });
        }

        // $scope.isLoading = false;
        // $scope.isProfile = false;

        // * FUNCTIONS
        // $scope.profileItem = profileItem;
        $scope.editItem = editItem2;
        $scope.createItem = createItem2;
        $scope.updateItem = updateItem2;
        $scope.deleteItem = deleteItem2;

        $scope.loadIndicator = loadIndicator;

        // $scope.profileAcao = profileAcao;
        // $scope.profileEvidencia = profileEvidencia;
        // $scope.createEvidencia = createEvidencia;
        // $scope.createFav = fnCreateFav;
        // $scope.deleteFav = fnDeleteFav;
        // $scope.filesize = fnFilesize;
        // $scope.openFile = fnOpenFile;
        // $scope.setImgThumbs = fnSetImgThumbs;
        // $scope.verifyStateName = fnVerifyStateName;

        // window.onload = fnRead();

        // ? START CRUD LOCALSTORAGE -----------------------------------------------

        const storageName = "critery";

        function createItem2(x) {
            x._id = Util.getRandomInt(100000000, 999999999);;
            $scope.itemList.push(x);
            localStorage.setItem(storageName, JSON.stringify($scope.itemList));
        }
        function editItem2(idx, x) {
            if (idx != null) {
                $scope.idxSelected = idx;
                $scope.x = (x) ? x : {};
                // Util.extend(x, $scope.x)
            } else {
                $scope.x = {}
            }
        }

        function updateItem2(x) {
            let idx = $scope.idxSelected;
            $scope.itemList.splice(idx, 1, x);
            localStorage.setItem(storageName, JSON.stringify($scope.itemList));
        }

        function deleteItem2(idx) {
            $scope.itemList.splice(idx, 1);
            localStorage.setItem(storageName, JSON.stringify($scope.itemList));
        }

        // ? END CRUD LOCALSTORAGE -----------------------------------------------

        function loadIndicator(dim){
            let indicatorList = (localStorage.getItem('indicator')) ? JSON.parse(localStorage.getItem('indicator')) : [];
            $scope.indicatorList = indicatorList.filter((e)=>{
                return e._dimension._id == dim._id;
            });
        }

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
         * @returns Retorna um array de acoes
         */
        function readItem() {
            return DB.read('acao').then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message);
                } else {
                    return resp.data;
                }
            })
        }

        /**
         * @returns Retorna um array de evidencias filtradas
         */
        async function readEvidenciaFilter(filter) {
            $scope.isLoadingItem = true;
            // var filter = { '_acao': $scope.item._id }
            await DB.readFilter('evidencia/filter', filter).then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message);
                } else {
                    // $scope.$emit('viewContentLoaded')
                    FN.fnAlertBottom('success', resp.statusText);
                    $scope.evidenciaList = resp.data;
                }
            }).finally(() => {
                $scope.isLoadingItem = false;
                $scope.$digest();
            })
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

        //* OTHERS

        /**
         * @description Verifica se a resposta é sucesso ou falha
         * @param {Object} resposta Resposta do servidor (formato= resp.data.success: boolean)
         * @returns Retorna true ou false
         */
        function fnSuccess(resposta) {
            return (resposta.data.success == false) ? true : false;
        }

    })()
}