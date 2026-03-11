const prisma = require('@lib/prisma');

class UserService {
  find_user_by_email = async (email) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  };
  find_user_by_id = async (userId) => {
    return await prisma.user.findUnique({ where: { id: userId } });
  };
}

module.exports = UserService;
