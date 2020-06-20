
import Axios from 'axios';

// Axios.defaults.baseURL = 'http://localhost:3000/';
// Axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
// Axios.defaults.headers.common['x-access-token'] = sessionStorage.getItem('token');
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const URL = 'http://localhost:3000' + '/';
// const URL = 'http://10.2.0.200:3000' + '/';
// const URL = 'http://10.2.1.92:3000' + '/';
// const URL = 'http://192.168.1.2:3000' + '/';
// const URL = 'http://192.168.31.52:3000' + '/';

var Config = (method, url, params, body) => {

    return {
        'method': method,
        'url': url,
        'params': params,
        'data': body,
        'headers': {
            // 'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'multipart/form-data',
            // 'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            // 'Content-Type': 'application/json',
            // 'Authorization': localStorage.getItem('token'),
            'x-access-token': sessionStorage.getItem('token')
        },
        'crossdomain': true
    }
}

module.exports = {
    // 'reads': reads,
    // 'creates': creates,
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
// function login(urn, item) { return Axios.post(URL + urn, Config(item)) }
function login(urn, item) { return Axios(Config('post', URL + urn, null, item)) }

/**
 * @description Função responsável por buscar todos os documentos/tuplas de uma collection/table
 * @param {String} urn Nome da urn/collection/table
 * @returns {Array<Object>} Retorna uma lista de documentos/tuplas de uma collection/table
 */
// function read(urn) { return Axios.get(URL + urn) }
// function read(urn) { return Axios.get(URL + urn, Config()) }
function read(urn) { return Axios(Config('get', URL + urn, null, null)) }

// function read(urn) {
//     return Axios({
//         method: 'get',
//         url: URL + urn,
//         headers: { 'x-access-token': localStorage.token }
//     })
// }
// function reads() { return Axios.get(URL, CONFIG); }

/**
 * @description Função responsável por buscar todos os documentos/tuplas de uma collection/table usando um filtro de busca
 * @param {String} urn Nome da urn/collection/table
 * @returns {Array<Object>} Retorna uma lista de documentos/tuplas de uma collection/table
 */
function readFilter(urn, filter) { return Axios(Config('post', URL + urn, null, filter)) }

/**
 * @description Função responsável por persistir os dados de um documento/tupla em uma collection/table no DB
 * @param {String} urn Nome da urn/coleção/tabela
 * @param {Object} item Objeto que será persistido
 * @returns {Object} Retorna o objeto persistido/criado já com seu Id
 */
function create(urn, item) { return Axios(Config('post', URL + urn, null, item)) }
// function create(urn, item, headers) { return Axios(Config('post', URL + urn, null, item, headers)) }
// function creates(item) { return Axios.post(URL, item) }

/**
 * @description Função responsável por buscar um documento/tupla de uma collection/table
 * @param {String} urn Nome da urn/collection/table
 * @param {Object} id Identificador do objeto que será buscado
 * @returns {Object} Retorna um objeto
 */
// function profile(urn, id) { return Axios.get(URL + urn + '/' + id) }
function profile(urn, id) { return Axios(Config('get', URL + urn + '/' + id, null, null)) }

/**
 * @description Função responsável por atualizar um documento/tupla de uma collection/table
 * @param {String} urn Nome da urn/collection/table
 * @param {Object} item Objeto que será atualizado
 * @returns {Object} Retorna o objeto atualizado
 */
function update(urn, item) { return Axios(Config('put', URL + urn + '/' + item._id, null, item)) }

/**
 * @description Função responsável por remover um documento/tupla de uma collection/table
 * @param {String} urn Nome da urn/collection/table
 * @param {Object} id Identificador do objeto que será removido
 * @returns {Object} Retorna os dados do objeto removido
 */
function remove(urn, item) { return Axios(Config('delete', URL + urn + '/' + item._id, null, item)) }

Axios.interceptors.request.use(function (config) {

    // spinning start to show
    // UPDATE: Add this code to show global loading indicator

    return config;
}, function (error) {
    return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {

    // spinning hide
    // UPDATE: Add this code to hide global loading indicator

    return response;
}, function (error) {
    return Promise.reject(error);
});