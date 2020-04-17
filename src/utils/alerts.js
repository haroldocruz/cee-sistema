
module.exports = {
    "fnConfirm": fnConfirm,
    "fnAlertBottom": fnAlertBottom
}

function fnConfirm() {
    var rusure = confirm("Confirmar ação?");
    if (rusure) return true;
    else {
        fnAlertBottom('warning', 'Cancelado pelo usuário')
        return false;
    }
}

/**
 * @description Emite uma mensagem de alerta personalizada (bootstrap3)
 * @param {Object} typeAlert Tipo de alerta (success|warning|failure)
 * @param {String} msg Mensagem que será exibida no alerta
 */
function fnAlertBottom(typeAlert, msg) {
    switch (typeAlert) {
        case 'success': {
            var HTML = ""
                + "<div id='alert-success' class='myAlert-bottom alert alert-success' style='z-index: 99999'>"
                + "     <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"
                + "     <strong>Success!</strong> " + msg + "."
                + "</div>"
            break;
        }
        case 'failure': {
            var HTML = ""
                + "<div id='alert-failure' class='myAlert-bottom alert alert-danger' style='z-index: 99999'>"
                + "     <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"
                + "     <strong>Error!</strong> " + msg + "."
                + "</div>"
            break;
        }
        case 'warning': {
            var HTML = ""
                + "<div id='alert-warning' class='myAlert-bottom alert alert-warning' style='z-index: 99999'>"
                + "     <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"
                + "     <strong>Warning!</strong> " + msg + "."
                + "</div>"
            break;
        }
    }

    // document.getElementById("alerta").innerHTML = HTML;
    $("#alerta").html(HTML);
    $("#alert-" + typeAlert).slideDown();
    setTimeout(() => {
        $("#alert-" + typeAlert).slideUp();
        // (typeAlert == 'success') ? setTimeout(() => $state.reload("meta"), 0.5 * 1000) : undefined
        // (typeAlert == 'success') ? setTimeout(() => $scope.$digest(), 0.5 * 1000) : undefined
    }, 5 * 1000);
}
