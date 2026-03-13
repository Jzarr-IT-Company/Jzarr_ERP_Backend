const rootRouter = require('express').Router();

const Responses = require('@constant/responses');
const authRouter = require('./auth.routes');
const { Authenticated, verifyRole } = require('@middleware/auth.middleware');
const AdminOrSubAdminRoute = require('./admin/admin_or_subadmin.routes');
const manager_client_router = require('./manager/managerClient.route');
const user_router = require('./user.route');
const responses = new Responses();

rootRouter.use('/auth', authRouter);
rootRouter.use(
  '/admin-subadmin',
  Authenticated,
  verifyRole(['SUB_ADMIN', 'SUPER_ADMIN']),
  AdminOrSubAdminRoute
);

rootRouter.use('/manager-client', Authenticated, verifyRole(['MANAGER']), manager_client_router);
rootRouter.use("/user",Authenticated,user_router)
rootRouter.use((req, res) => {
  return res.json(responses.not_found_error('This route not exist'));
});

module.exports = rootRouter;
