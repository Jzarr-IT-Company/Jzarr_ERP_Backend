const prisma = require("@lib/prisma.js")

async function seedUsers() {

  await prisma.user.createMany({
    data: [
      {
        name: "Super Admin",
        email: "super@erp.com",
        password: "123456",
        role: "SUPER_ADMIN"
      },
      {
        name: "Sub Admin",
        email: "sub@erp.com",
        password: "123456",
        role: "SUB_ADMIN",
        createdById: 1
      },
      {
        name: "Manager 1",
        email: "manager1@erp.com",
        password: "123456",
        role: "MANAGER",
        createdById: 2
      }
    ]
  })

  console.log("Users seeded successfully")
}

module.exports = seedUsers