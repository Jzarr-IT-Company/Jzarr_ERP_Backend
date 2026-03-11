const fs = require("fs")
const path = require("path")
const readline = require("readline")
require("module-alias/register");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const seedersPath = path.join(__dirname, "../seeders")


const files = fs.readdirSync(seedersPath)

console.log("\nAvailable Seeders:\n")

files.forEach((file, index) => {
  console.log(`${index + 1}. ${file}`)
})

rl.question("\nSelect seeder number: ", async (answer) => {
  const selectedFile = files[answer - 1]

  if (!selectedFile) {
    console.log("Invalid selection")
    process.exit()
  }

  try {
    const seeder = require(path.join(seedersPath, selectedFile))
    await seeder()
    console.log("Seeding completed")
  } catch (err) {
    console.error(err)
  }

  process.exit()
})