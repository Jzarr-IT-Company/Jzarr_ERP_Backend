const prisma = require('@lib/prisma');
const Responses = require('@constant/responses');
const { hash_password, pagination } = require('@utlls/helper');
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
      next(error);
    }
  };

  admin_update_user = async (req, res, next) => {};
  admin_delete_user = async (req, res, next) => {
    try {
      const { userId } = req.body;

      await prisma.user.delete({
        where: {
          id: parseInt(userId),
        },
      });
    } catch (error) {}
  };
  admin_get_all_user = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { skip, limit, page } = await pagination(req);
      const [users, total] = await Promise.all([
        await prisma.user.findMany({
          where: {
            NOT: {
              id: userId,
            },
          },
          skip: skip,
          take: limit,
          select: {
            id: true,
            name: true,
            email: true,
          },
        }),
        await prisma.user.count({
          where: {
            NOT: {
              id: userId,
            },
          },
        }),
      ]);
      res.json(
        responses.ok_response({
          users,
          totalPage: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
        })
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
