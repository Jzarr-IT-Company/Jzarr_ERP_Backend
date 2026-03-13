

const AdminOrSubAdminRoute = require('express').Router();
const Admin_SubAdmin_Controller = require('@controller/admin/admin.contoller');
const admin_subadmin_controller = new Admin_SubAdmin_Controller();

AdminOrSubAdminRoute.post('/', admin_subadmin_controller.admin_create_users);

AdminOrSubAdminRoute.delete('/', admin_subadmin_controller.admin_delete_user);

AdminOrSubAdminRoute.get('/', admin_subadmin_controller.admin_get_all_user);
AdminOrSubAdminRoute.patch('/', admin_subadmin_controller.admin_update_user);

module.exports = AdminOrSubAdminRoute;
