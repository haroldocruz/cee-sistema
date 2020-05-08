
controller.$inject = ['$injector', '$rootScope', '$scope', '$state', '$location'];
export default function controller($injector, $scope, $rootScope, $state, $location) {

    var FN = require('../../utils/alerts');

    $scope.expressao = "";

    //* VERIFICA SE USER ESTÁ LOGADO
    // if (sessionStorage.getItem('rootUser'))
    //     $scope.rootUser = JSON.parse(sessionStorage.getItem('rootUser'));
    // else
    //     $scope.rootUser = { name: "Anonimous", accessLevel: "UnRegistered" };

    //*FAZ LOGOFF SEGURO
    // $scope.logoff = function () {
    //     sessionStorage.removeItem('rootUser');
    //     sessionStorage.removeItem('token');
    //     $state.go('app2.login');
    // }

    //*BUSCA RÁPIDA
    $scope.searchFast = (valor) => {
        // test cases
        // getcolorformat('rgb(255,0,0)');
        // getcolorformat('#ff0000')
        // getcolorformat('red')
        // getcolorformat()
        //         function getcolorformat(){
        //             var s = valor
        //             var rX= /^((#[0-9a-f]{3,6})|([#|\$|@|!|>]+)|(rgb\([\d{1,3},]{3}\)))$/i;
        //             var M= rX.exec(s)
        //             // if(!M) return false;
        //             console.log(M)
        //             console.log("M[1] = "+ M[1])
        //             switch(M[1]){
        //                 case M[2]: console.log('hex code: '+ M[2]); break;
        //                 case M[3]: console.log('string name: '+ M[3]); break;
        //                 case M[4]: console.log('rgb code: '+ M[4]); break;
        //                 default: return false;
        //             }
        //             return;
        //         }


        // function test(str) {
        //     switch (true) {
        //       case /xyz/.test(str):
        //         display("• Matched 'xyz' test");
        //         break;
        //       case /test/.test(str):
        //         display("• Matched 'test' test");
        //         break;
        //       case /ing/.test(str):
        //         display("• Matched 'ing' test");
        //         break;
        //       default:
        //         display("• Didn't match any test");
        //         break;
        //     }
        // }

        switch (valor.charAt(0)) {
            case '@': //buscar|filtrar usuarios
            case '>': //executar um comando
            case '#': //mandar uma mensagem para todos (broadcast)
            case '$': //mandar uma mensagem para os integrantes de um grupo (multicast) [${m03}]
            case '!': //mandar mensagem para um integrante (unicast) [!{haroldo} suaMensagemAqui]
            default:
        }

        try {

            var regArray1 = [
                /^[mea]$/, //? meta/ OU estrategia/ OU acao/
                /^[m]\d{2}$/, //? meta/??
                /^[m]\d{2}[ea]$/, //? meta/??/estrategia OU meta/??/acao
                /^[m]\d{2}[e]\d{2}$/, //? meta/??/estrategia/??
                /^[m]\d{2}[e]\d{2}[a]$/, //? meta/??/estrategia/??/acao
                /^[m]\d{2}[e]\d{2}[a]\d{2}$/ //? meta/??/estrategia/??/acao/??
            ];

            var regArray2 = [
                /^\d{2}$/, //? meta/??
                /^\d{2}[.]\d{2}$/, //? meta/??/estrategia/??
                /^\d{2}[.]\d{2}[.]\d{2}$/, //? meta/??/estrategia/??/acao/??
            ];

            var regArray3 = [
                /[A-Za-z]{3,}/, //? usuario
            ];

            var filterType = -1;

            if (valor) {
                valor = valor.trim();
                valor = valor.toLowerCase();
                for (var reg of regArray1) {
                    if (reg.test(valor)) {
                        // isOk = true;
                        filterType = 1;
                        break;
                    }
                }
                for (var reg of regArray2) {
                    if (reg.test(valor)) {
                        // isOk = true;
                        filterType = 2;
                        break;
                    }
                }
                for (var reg of regArray3) {
                    if (reg.test(valor)) {
                        // isOk = true;
                        filterType = 3;
                        break;
                    }
                }
            }

            if (filterType === -1) {
                FN.fnAlertBottom('warning', 'Expressão incorreta', $state)
                return;
            }


            var urn = "/app";

            // * META | ESTRATEGIA | ACAO (m01e01a01)
            if (filterType == 1) {
                var x;
                for (var i = 0; i < valor.length; i++) {
                    urn = urn + "/";
                    x = valor.charAt(i);
                    if (isNaN(x)) {
                        if (x == 'm')
                            urn = urn + "meta";
                        if (x == 'e')
                            urn = urn + "estrategia";
                        if (x == 'a')
                            urn = urn + "acao";
                    } else {
                        urn = urn + x + valor.charAt(++i);
                    }
                }
                $location.path(urn);
            }

            // * META | ESTRATEGIA | ACAO (ex: '01.01.01')
            if (filterType == 2) {
                var array = valor.split('.');
                for (var i = 0; i < array.length; i++) {
                    urn = urn + "/";
                    if (i === 0)
                        urn = urn + "meta/" + array[i];
                    if (i === 1)
                        urn = urn + "estrategia/" + array[i];
                    if (i === 2)
                        urn = urn + "acao/" + array[i];
                }
                $location.path(urn);
            }

            // * USER (ex: 'harold')
            if (filterType == 3) {
                urn = urn + "/user";
                $location.path(urn).search({ 'searchFast': valor });
                // $state.go('app.theme.user', { 'searchFast': valor });
            }
        } finally {
            document.getElementById("searchFast").value = "";
        }
    }

    // window.onload = () => {
    //     fnSetEventListener2();
    // }
    // // * ACTIVE CLASS LISTENER
    // function fnSetEventListener2() {
    //     let liList = document.querySelectorAll("#side-menu li");
    //     console.log(liList)
    //     liList.forEach((li) => {
    //         li.addEventListener('click', function () {
    //             console.log(this)
    //             fnActiveRemove2();
    //             this.classList.add('active');
    //             // e.classList.toggle('active');
    //         });
    //     })
    // }

    // function fnActiveRemove2() {
    //     let liList = document.querySelectorAll("#side-menu li");
    //     liList.forEach((li) => {
    //         li.classList.contains('active') ? li.classList.remove('active') : undefined;
    //     })
    // }


    //*CHART CONFIG
    $rootScope.doughnutChart = (concluido, total, idNameItem) => {
        const ctx = document.getElementById(idNameItem).getContext('2d');

        var falta = total - concluido;

        var data = {
            datasets: [{
                data: [concluido, falta],
                borderWidth: 0.5,
                backgroundColor: ['#009900', 'rgba(255, 159, 64, 0.9)']
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                '' + (concluido * 100 / total).toFixed(0) + '% Concluído',
                '' + (falta * 100 / total).toFixed(0) + '% em processo'
            ]
        };

        var options = {
            legend: {
                display: true,
                position: 'right'
            },
        }

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }

}