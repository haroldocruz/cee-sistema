
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
        $scope.itemList = (localStorage.getItem('instrument')) ? JSON.parse(localStorage.getItem('instrument')) : [];
        let dimensionList = (localStorage.getItem('dimension')) ? JSON.parse(localStorage.getItem('dimension')) : [];
        let indicatorList = (localStorage.getItem('indicator')) ? JSON.parse(localStorage.getItem('indicator')) : [];
        let criteryList = (localStorage.getItem('critery')) ? JSON.parse(localStorage.getItem('critery')) : [];

        $scope.item = ($state.params.param1) ? $state.params.param1 : {};
        $scope.item._dimension = confInstrument2($scope.item);


        $scope.isDone = isDone;

        function isDone(elem) {
            switch (elem.score) {
                case 0: return 'danger';
                case 1:
                case 2: return 'warning';
                case 3:
                case 4:
                case 5: return 'success';
                default: return 'default';
            }
        }

        function confInstrument(item) {
            console.log(item)
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

        function confInstrument2(item) {
            for (let i = 0; i < dimensionList.length; i++) {
                dimensionList[i]._indicator = getIndicator(dimensionList[i], indicatorList);
                for (let j = 0; j < dimensionList[i]._indicator.length; j++) {
                    dimensionList[i]._indicator[j]._critery = getCritery(dimensionList[i]._indicator[j], criteryList);
                }
            }
            return dimensionList;
        }

        $scope.insertScore = insertScore;
        function insertScore(value, x) {
                x.score = value;
            x.done = 'concluído';
        }

        $scope.calcIndicator = calcIndicator;
        function calcIndicator(indicator){
            const max = 5;
            let result = 0.0;
            let resultMax = 0;
            indicator._critery.forEach((e)=>{
                result += e.score * e.weight;
                resultMax += max * e.weight;
            });
            // indicator.score = result / indicator._critery.length;
            indicator.score = ((result / resultMax) * 100) / 2;
        }

        $scope.calcDimension = calcDimension;
        function calcDimension(dimension){
            let result = 0.0;
            dimension._indicator.forEach((e)=>{
                // result += e.score * e.weight;
                result += e.score;
            });
            dimension.score = result / dimension._indicator.length;
        }

        $scope.calcEvaluation = calcEvaluation;
        function calcEvaluation(evaluation){
            let result = 0.0;
            evaluation._dimension.forEach((e)=>{
                result += e.score * e.weight;
            });
            evaluation.score = ((result / 100) / 2) / 10;
        }

        $scope.x = {}

        $scope.isLoading = false;
        $scope.isProfile = false;

        // * FUNCTIONS
        $scope.profileItem = profileItem;
        $scope.createItem = createItem2;
        $scope.editItem = editItem2;
        $scope.updateItem = updateItem2;
        $scope.deleteItem = deleteItem2;

        $scope.profileAcao = profileAcao;
        $scope.profileEvidencia = profileEvidencia;
        $scope.createEvidencia = createEvidencia;

        $scope.createFav = fnCreateFav;
        $scope.deleteFav = fnDeleteFav;

        $scope.filesize = fnFilesize;
        $scope.openFile = fnOpenFile;
        $scope.setImgThumbs = fnSetImgThumbs;
        $scope.verifyStateName = fnVerifyStateName;

        // window.onload = fnRead();

        // ? START CRUD LOCALSTORAGE -----------------------------------------------

        const storageName = "instrument";

        function createItem2(x) {
            x._id = Util.getRandomInt(100000000, 999999999);
            $scope.itemList.push(x);
            localStorage.setItem(storageName, JSON.stringify($scope.itemList));
        }
        function editItem2(idx, x) {
            if (idx != null) {
                $scope.idxSelected = idx;
                $scope.x = x;
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

        // * FILESIZE
        function fnFilesize(item) {
            return filesize(item).human('jedec');
        }

        //* FAV_INSERT
        //TODO: guardar no DB o "state name" e "params" da página
        function fnCreateFav(x) {
            var item = { fk_goal: x }
            DB.create('favorite', item).then((resp) => { if (fnSuccess(resp)) FN.fnAlertBottom('success', "Página inserida nos favoritos") });
            fnRead();
        }

        //* FAV_REMOVE
        function fnDeleteFav(x) {
            DB.delete('favorite', x).then(() => { if (fnSuccess(resp)) FN.fnAlertBottom('success', "Página removida dos favoritos") });
            fnRead();
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

        //* CREATE
        function createItem(modelName, x) {
            (FN.fnConfirm()) ? DB.create(modelName, x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message) : fnRead();
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* CREATE EVIDENCIA
        function createEvidencia() {
            var formEvidencia = document.getElementById('form-evidencia-modal');
            var formData = new FormData(formEvidencia);

            (FN.fnConfirm()) ? DB.create('evidencia', formData).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message)
                    : readEvidenciaFilter({ '_acao': $scope.item._id });
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* PROFILE
        function profileItem(modelName, x, idx) {
            if (!x.descricao) {
                DB.profile(modelName, x._id).then((resp) => {
                    if (fnSuccess(resp)) {
                        FN.fnAlertBottom('failure', resp.data.message)
                    }
                    else {
                        if (modelName == "acao") {
                            $scope.itemList[idx] = resp.data;
                            $scope.evidenciaList = resp.data._evidencia;
                        }
                        if (modelName == "evidencia")
                            $scope.evidenciaList[idx] = resp.data;
                        $scope.$digest();
                    }
                })
            }
        }

        //* DELETE
        function deleteItem(modelName, x) {
            (FN.fnConfirm()) ? DB.delete(modelName, x).then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message)
                } else
                    if (modelName == 'acao')
                        $state.go('acao');
                if (modelName == 'evidencia')
                    readEvidenciaFilter({ '_acao': $scope.item._id });
                else
                    fnRead();
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* UPDATE
        function editItem(x) { $scope.x = x; }

        function updateItem(modelName, x) {
            (FN.fnConfirm()) ? DB.update(modelName, x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* READ
        async function fnRead() {
            try {
                $scope.isLoadingItem = true;

                if (fnVerifyStateName("acao")) {
                    $scope.isProfile = false;
                    $scope.metaList = readMeta();
                    $scope.itemList = await readItem();
                }

                if (fnVerifyStateName("acaoProfile")) {
                    $scope.isProfile = true;
                    var filter = { "codigo": $state.params.metaCod };
                    var metaArr = await readMetaFilter(filter);
                    $scope.meta = metaArr[0];

                    filter = { "_meta": metaArr[0]._id, "codigo": $state.params.estrategiaCod };
                    var estrArr = await readEstrategiaFilter(filter);
                    $scope.estrategia = estrArr[0];

                    filter = { "_estrategia": estrArr[0]._id, "codigo": $state.params.acaoCod };
                    var acaoArr = await readAcaoFilter(filter);
                    $scope.item = acaoArr[0];
                    $scope.evidenciaList = acaoArr[0]._evidencia;
                }
            }
            finally {
                setTimeout(function () {
                    $scope.isLoadingItem = false;
                    $scope.$digest();
                }, 500);
            }
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

        //*PROFILE ACAO
        function profileAcao(x, idx) {
            if (!x.descricao) {
                DB.profile('acao', x._id).then((resp) => {
                    if (fnSuccess(resp)) {
                        FN.fnAlertBottom('failure', resp.data.message, $state)
                    }
                    else {
                        $scope.itemList[idx] = resp.data;
                        $scope.$digest();
                    }
                })
            }
        }

        //*PROFILE EVIDENCIA
        function profileEvidencia(x, idx) {
            if (!x.descricao) {
                DB.profile('evidencia', x._id).then((resp) => {
                    if (fnSuccess(resp)) {
                        FN.fnAlertBottom('failure', resp.data.message, $state)
                    }
                    else {
                        $scope.evidenciaList[idx] = resp.data;
                        $scope.$digest();
                    }
                })
            }
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