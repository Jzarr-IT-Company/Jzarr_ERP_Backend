const { prisma } = require('@lib/prisma');

const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log('DB  connected  successfully');
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

module.exports = {
  connectDb,
};
