const { prisma } = require('@lib/prisma');
const Responses = require('@constant/responses');
const responses = new Responses();
class Contract {
  create_contract = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const managerId = req.user.id;
      const { clientId } = req.params;

      if (!title || !description) {
        return res.status(400).json(responses.bad_request_error('Title and description required'));
      }

      
      const client = await prisma.client.findFirst({
        where: {
          id: parseInt(clientId),
          createdById: managerId,
        },
      });

      if (!client) {
        return res.status(404).json(responses.not_found_error('Client not found'));
      }

      const contract = await prisma.contract.create({
        data: {
          title,
          description,
          managerId,
          clientId: parseInt(clientId),
        },
      });

      return res.status(201).json(responses.create_success_response(contract));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  update_contract = async (req, res, next) => {
    try {
      const managerId = req.user.id;
      const { contractId } = req.params;
      const { title, description } = req.body;

      const contract = await prisma.contract.findFirst({
        where: {
          id: parseInt(contractId),
          managerId,
        },
      });

      if (!contract) {
        return res.status(404).json(responses.not_found_error('Contract not found'));
      }

      const updated = await prisma.contract.update({
        where: { id: parseInt(contractId) },
        data: {
          title,
          description,
        },
      });

      return res.json(responses.ok_response(updated));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  get_my_contract = async (req, res, next) => {
    try {
      const managerId = req.user.id;

      const contracts = await prisma.contract.findMany({
        where: {
          managerId,
        },
        include: {
          client: true,
          manager:{
            select:{
                name:true,
                email:true
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.json(responses.ok_response(contracts));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
