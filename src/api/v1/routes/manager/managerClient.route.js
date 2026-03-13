const ClientCrud = require('@controller/manager/client.crud.controller');
const client_crud = new ClientCrud();
const manager_client_router = require('express').Router();

manager_client_router.post('/', client_crud.create_client);
manager_client_router.patch('/:id', client_crud.update_client);
manager_client_router.delete('/:id', client_crud.delete_client);
manager_client_router.get('/', client_crud.get_clients);

module.exports = manager_client_router;
