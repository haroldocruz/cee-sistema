
const DB = require('../../services/api.service.axios');

controller.$inject = ['$injector', '$scope', '$state'];
export default function controller($injector, $scope, $state) {

    (async function () {

        // * EXPORTS
        var FN = await require('../../utils/alerts');
        const Util = require('../../utils/util');

        // * CONSTANTS AND VARIABLES
        //lista principal
        $scope.itemList = (localStorage.getItem('indicator') ? JSON.parse(localStorage.getItem('indicator')) : []);
        $scope.dimensionList = (localStorage.getItem('dimension') ? JSON.parse(localStorage.getItem('dimension')) : []);
        $scope.instrumentList = (localStorage.getItem('instrument') ? JSON.parse(localStorage.getItem('instrument')) : []);

        formatCode($scope.itemList);
        function formatCode(iList){
            iList.forEach((e,i,l)=>{
                e.formattedCode = e._dimension.orderCode + '.' + e.orderCode;
            });
        }

        $scope.item = null;
        const ITEM = {_instrument:[]};
        $scope.idxSelected = null;

        $scope.isLoadingItem = false;
        $scope.isProfile = false;

        // * FUNCTIONS
        $scope.createItem = createItem2;
        $scope.editItem = editItem2;
        $scope.updateItem = updateItem2;
        $scope.deleteItem = deleteItem2;

        $scope.insertInstrument = insertInstrument;
        $scope.removeInstrument = removeInstrument;

        // window.onload = fnRead();

        // ? START CRUD LOCALSTORAGE -----------------------------------------------

        const storageName = "indicator";

        function createItem2(x) {
            x._id = Util.getRandomInt(100000000, 999999999);;
            $scope.itemList.push(x);
            localStorage.setItem(storageName, JSON.stringify($scope.itemList));
        }
        function editItem2(idx, x) {
            if (idx != null) {
                $scope.idxSelected = idx;
                $scope.x = (x) ? x : {_instrument:[]};
                // Util.extend(x, $scope.x)
            } else {
                $scope.x = {_instrument:[]};
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

        function insertInstrument(x) {
            $scope.x._instrument.push(x);
        }

        function removeInstrument(idx) {
            $scope.x._instrument.splice(idx, 1);
        }
    })()
}