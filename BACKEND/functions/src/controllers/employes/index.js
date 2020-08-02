const { create, handler: createHandler } = require('./Create');
const { deleteEmployed, handler: deleteHandler } = require('./Delete');
const { edit, handler: editHandler } = require('./Edit');
const { find, handler: findHandler } = require('./Find');

module.exports = {
    create,
    createHandler,
    deleteEmployed,
    deleteHandler,
    edit,
    editHandler,
    find,
    findHandler,
}