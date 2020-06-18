'use strict'

module.exports = {
    //CONNECTION
    'errConn': { 'success': false, 'message': 'Erro ao tentar conectar' },
    //LOGIN
    'errUserAbsent': { 'success': false, 'message': 'Usuário não cadastrado' },
    'errPass': { 'success': false, 'message': 'Senha inválida' },
    'errLogin': { 'success': false, 'message': 'Erro ao tentar fazer login' },
    'errLowLevel':{ 'success': false, 'message': "Necessário elevar seu nível de acesso para realizar esta ação" },
    'errNoAuth':{ 'success': false, 'message': "Somente usuários autenticados podem realizar esta ação" },
    //CONNECT
    'errTokenOrUser': { 'success': false, 'message': 'Problema com seu token ou usuário' },
    'errToken': { 'success': false, 'message': 'Token inválido' },
    'errNoToken': { 'success': false, 'message': 'Acesso restrito' },
    //CREATE
    'errMailExist': { 'success': false, 'message': 'Email já cadastrado' },
    'errSave': { 'success': false, 'message': 'Erro ao tentar salvar' },
    //READ
    'errFind': { 'success': false, 'message': 'Nenhum dado encontrado' },
    //UPDATE
    'errUpd': { 'success': false, 'message': 'Erro ao tentar atualizar' },
    //DELETE
    'errRem': { 'success': false, 'message': 'Erro ao tentar remover' },
    //OTHERS
    'errNoData': { 'success': false, 'message': 'Nenhum dado enviado' },
    'errNoPermission': { 'success': false, 'message': 'Usuário não permitido realizar esta operação' },
    'success': { 'success': true, 'message': 'Sucesso' },
};