const {DATABASE_HOST,DATABASE_NAME,DATABASE_PASSWORD,DATABASE_USER }=require("@config/env.config")
const  { PrismaMariaDb }= require("@prisma/adapter-mariadb");
const  { PrismaClient } = require("@prisma/client");

const adapter = new PrismaMariaDb({
  host:DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database:DATABASE_NAME,
 
});
const prisma = new PrismaClient({ adapter });

module.exports=prisma