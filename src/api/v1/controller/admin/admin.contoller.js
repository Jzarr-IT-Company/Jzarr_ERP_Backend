const {prisma,handle_prisma_error }= require('@lib/prisma');
const Responses = require('@constant/responses');
const { hash_password, pagination } = require('@utils/helper');
const responses = new Responses();

class Admin_SubAdmin_Controller {
  admin_create_users = async (req, res, next) => {
    try {
      const userId = req.user;
      const { name, email, password, role } = req.body;

      const hashpassword = await hash_password(password);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashpassword,
          role,
          createdBy: userId,
        },
      });

      return res.json(responses.create_success_response(user));
    } catch (error) {
      console.log(error);
       handle_prisma_error(error)
      next(error);
    }
  };

  admin_update_user = async (req, res, next) => {
    try {
      const { password, name } = req.body;
    } catch (error) {
      console.log(error);
       handle_prisma_error(error)
      next(error);
    }
  };
  admin_delete_user = async (req, res, next) => {
    try {
      const { userId } = req.body;

      await prisma.user.delete({
        where: {
          id: parseInt(userId),
        },
      });
    } catch (error) {
      console.log(error);
       handle_prisma_error(error)
      next(error);
    }
  };
  admin_get_all_user = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userRole = req.user.role;
      const { skip, limit, page } = await pagination(req);

      let whereFilter = {
        NOT: { id: userId },
      };

      if (userRole === 'SUB_ADMIN') {
        whereFilter.role = 'MANAGER';
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where: whereFilter,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: { id: true, name: true, email: true, role: true },
        }),
        prisma.user.count({ where: whereFilter }),
      ]);

      return res.json(
        responses.ok_response({
          users,
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
          },
        })
      );
    } catch (error) {
      console.error(error);
      handle_prisma_error(error)
      next(error);
    }
  };
}

module.exports = Admin_SubAdmin_Controller;
