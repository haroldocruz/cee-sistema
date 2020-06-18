
const lowDB = require('lowdb')
const LocalStorage = require('lowdb/adapters/LocalStorage');
const _ = require('lodash');

const Util = require('../utils/util');

// * CONFIGS
const adapter = new LocalStorage('lowDB.json')
const db = lowDB(adapter);

let resp = {};

db.defaults({
    'user': [],
    'instrument': [],
    'dimension': [],
    'indicator': [],
    'critery': []
}).write();

module.exports = {
    'login': login,
    'read': read,
    'readFilter': readFilter,
    'create': create,
    'profile': profile,
    'update': update,
    'delete': remove
}

/**
 * @description Função responsável por enviar dados para autenticação
 * @param {String} urn Nome da urn/coleção/tabela
 * @param {Object} item Dados para validar autenticação
 * @returns {Object} Retorna um token de autenticação
 */
async function login(urn, item) {
    resp.data = db.get(urn).find({ 'email': item.email, 'password': item.password }).value();
    if (!resp)
        resp.data = { 'success': false, 'message': 'Erro' }
    return resp;
}

/**
 * @description Função responsável por buscar todos os documentos/tuplas de uma collection/table
 * @param {String} urn Nome da urn/collection/table
 * @returns {Array<Object>} Retorna uma lista de documentos/tuplas de uma collection/table
 */
async function read(urn) {
    resp.data = db.get(urn).value();
    if (!resp.length == 0)
        resp.data = { 'success': false, 'message': 'Erro' }
    return resp;
}

/**
 * @description Função responsável por buscar todos os documentos/tuplas de uma collection/table usando um filtro de busca
 * @param {String} urn Nome da urn/collection/table
 * @returns {Array<Object>} Retorna uma lista de documentos/tuplas de uma collection/table
 */
async function readFilter(urn, filter) {
    resp.data = db.get(urn).filter(filter).value();
    if (!resp.length == 0)
        resp.data = { 'success': false, 'message': 'Erro' }
    return resp;
}

/**
 * @description Função responsável por persistir os dados de um documento/tupla em uma collection/table no DB
 * @param {String} urn Nome da urn/coleção/tabela
 * @param {Object} item Objeto que será persistido
 * @returns {Object} Retorna o objeto persistido/criado já com seu Id
 */
async function create(urn, item) {
    item._id = Util.getRandomInt(100000000, 999999999);
    db.get(urn).push(item).write();
    resp.data = { 'success': true, 'message': 'Sucesso' }
    return resp;
}

/**
 * @description Função responsável por buscar um documento/tupla de uma collection/table
 * @param {String} urn Nome da urn/collection/table
 * @param {Object} id Identificador do objeto que será buscado
 * @returns {Object} Retorna um objeto
 */
async function profile(urn, id) {
    resp.data = db.get(urn).find({ '_id': id }).value();
    if (!resp)
        resp.data = { 'success': false, 'message': 'Erro' }
    return resp;
}

/**
 * @description Função responsável por atualizar um documento/tupla de uma collection/table
 * @param {String} urn Nome da urn/collection/table
 * @param {Object} item Objeto que será atualizado
 * @returns {Object} Retorna o objeto atualizado
 */
async function update(urn, item) {
    db.get(urn).find({ '_id': item._id }).assign(item).write();
    resp.data = { 'success': true, 'message': 'Sucesso' }
    return resp;
}

/**
 * @description Função responsável por remover um documento/tupla de uma collection/table
 * @param {String} urn Nome da urn/collection/table
 * @param {Object} id Identificador do objeto que será removido
 * @returns {Object} Retorna os dados do objeto removido
 */
async function remove(urn, item) {
    db.get(urn).remove(item).write();
    resp.data = { 'success': true, 'message': 'Sucesso' }
    return resp;
}
