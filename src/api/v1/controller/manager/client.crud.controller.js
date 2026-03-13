const { prisma,handle_prisma_error } = require('@lib/prisma');
const Responses = require('@constant/responses');
const { pagination } = require('@utils/helper');
const responses = new Responses();

class ClientCrud {
  create_client = async (req, res, next) => {
    const userId = req.user.id;
    try {
      const { name, phone, address } = req.body;

      const client = await prisma.client.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
        },
      });

      if (client) {
        return res.status(400).json(responses.bad_request_error('Client already exists'));
      }

      const newClient = await prisma.client.create({
        data: {
          name,
          phone,
          address,
          createdById: userId,
        },
      });

      return res.status(201).json(responses.create_success_response(newClient));
    } catch (error) {
      console.log(error);
      handle_prisma_error(error)
      next(error);
    }
  };

  update_client = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, phone, address } = req.body;

      const client = await prisma.client.findUnique({
        where: { id: Number(id) },
      });

      if (!client) {
        return res.status(404).json(responses.not_found_error('Client not found'));
      }

      const updatedClient = await prisma.client.update({
        where: { id: Number(id) },
        data: {
          name,
          phone,
          address,
        },
      });

      return res.json(responses.update_success_response(updatedClient));
    } catch (error) {
      console.log(error);
          handle_prisma_error(error)
      next(error);
    }
  };

  delete_client = async (req, res, next) => {
    try {
      const { id } = req.params;

      await prisma.client.delete({
        where: { id: Number(id) },
      });

      return res.json(responses.delete_success_response());
    } catch (error) {
      console.log(error);
          handle_prisma_error(error)
      next(error);
    }
  };
  get_clients = async (req, res, next) => {
    const userId = req.user.id;
    const { skip, page, limit } = pagination(req);
    try {
      const clientsPromise = prisma.client.findMany({
        where: { createdById: userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      });

      const totalPromise = prisma.client.count({
        where: { createdById: userId },
      });

      const [clients, total] = await Promise.all([clientsPromise, totalPromise]);

      return res.status(200).json({
        success: true,
        data: clients,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error(error);
          handle_prisma_error(error)
      next(error);
    }
  };
}


module.exports=ClientCrud