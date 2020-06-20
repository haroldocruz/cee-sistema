
controller.$inject = ['$injector', '$scope', '$state'];
export default function controller($injector, $scope, $state) {

    (async function () {

        // * EXPORTS
        const DB = require('../../services/api.service.axios');
        const Util = require('../../utils/util');

        // * CONSTANTS AND VARIABLES
        $scope.itemList = [];
        $scope.strategyList = [];
        $scope.x = {};
        $scope.x._membros = [];
        $scope.detail = false;
        $scope.favorite = false;
        $scope.userList = [];
        $scope.memberList = [];
        $scope.memberSelected = null;
        $scope.memberSelectedList = [];
        $scope.equipeSelected = null;

        // * FUNCTIONS
        $scope.carregarUsuarios = carregarUsuarios;
        $scope.inserirMembro = inserirMembro;
        $scope.removerMembro = removerMembro;

        window.onload = fnRead();

        DB.read('user').then((resp) => { $scope.memberList = $scope.userList = resp.data; });

        // $scope.insertMember = () => {
        //     console.log($scope.memberSelected)
        //     var idx = $scope.memberList.indexOf($scope.memberSelected);
        //     $scope.memberSelectedList.push($scope.memberSelected);
        //     $scope.x = {}
        //     $scope.x._membros = []
        //     $scope.x._membros.push($scope.memberSelected._id); //insere no objeto que será salvo
        //     $scope.memberList.splice(idx, 1);
        //     $scope.memberSelected = null;
        // }

        // $scope.removeMember = (x) => {
        //     var idx = $scope.memberSelectedList.indexOf(x);
        //     $scope.memberSelectedList.splice(idx, 1);
        //     $scope.x._membros.splice(idx, 1); //remove do objeto que será salvo
        //     $scope.memberList.push(x);
        //     $scope.memberSelected = null;
        // }

        function carregarUsuarios (originList, equipe) {
            $scope.equipeSelected = equipe;
            // if (equipe._membros && equipe._membros.length > 0)
            //     $scope.usersForMemberList = await $scope.userList.filter((e) => {
            //         if (equipe._membros.indexOf(e._id) > -1)
            //             return e;
            //     })
            // else
            // $scope.usersForMemberList = [...$scope.userList];
            $scope.usersForMemberList = [...originList];
        }

        function inserirMembro (x) {
            if (fnConfirm()) {
                var item = $scope.equipeSelected;
                item._membros.push(x._id)
                DB.update('equipe', item).then((resp) => { fnRead() });
            }
        }

        function removerMembro (idx, item) {
            if (fnConfirm()) {
                item._membros.splice(idx, 1)
                DB.update('equipe', item).then((resp) => { fnRead() });
            }
        }

        // $scope.createItem = (x) => {
        //     x.members = $scope.memberSelectedList;
        //     if (fnConfirm())
        //         DB.create('team', x).then((resp) => { fnRead() });
        // }

        // $scope.deleteItem = (x) => {
        //     if (fnConfirm())
        //         DB.delete('team', x).then((resp) => { fnRead() });
        // }

        $scope.editItem = (x) => { $scope.x = x; }
        // $scope.editItem = (x) => {
        //     Util.extend(x, $scope.x);
        // }
        $scope.updateItem = (x) => {
            if (fnConfirm())
                DB.update('equipe', x).then((resp) => { fnRead() });
        }

        async function fnRead() {
            $scope.isLoadingItem = true;
            await DB.read('equipe').then((resp) => {
                $scope.itemList = resp.data;
                // $scope.teamList = resp.data.map((e) => { return e._equipe });
                // $scope.$digest();
            });
            await DB.read('user').then((resp) => {
                $scope.userList = resp.data;
                // $scope.$digest();
            }).finally(() => {
                $scope.isLoadingItem = false
                $scope.$digest();
            })
        }

        function fnConfirm() {
            var rusure = confirm("Confirmar ação?");
            if (rusure) return true;
            else return false;
        }

    })()
}