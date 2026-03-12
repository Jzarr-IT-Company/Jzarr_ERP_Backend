const prisma = require("@lib/prisma.js")
const { hash_password } = require("@utils/helper")

async function seedUsers() {
  const hashPassword=await hash_password("123456")
  await prisma.user.createMany({
    data:{
        name: "Super Admin",
        email: "super@erp.com",
        password: hashPassword,
        role: "SUPER_ADMIN"
    }
  })

  console.log("Users seeded successfully")
}

module.exports = seedUsers