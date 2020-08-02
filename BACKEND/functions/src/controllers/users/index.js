const { create, handler: createHandler } = require('./Create');
const { login, handler: loginHandler } = require('./Login');
const { find, handler: findHandler } = require('./Find');
const { deleteUser, handler: deleteHandler } = require('./Delete');
const { handler: userSignedHandler } = require('./UserSigned');

module.exports = {
    create,
    createHandler,
    login,
    loginHandler,
    find,
    findHandler,
    deleteUser,
    deleteHandler,
    userSignedHandler
}