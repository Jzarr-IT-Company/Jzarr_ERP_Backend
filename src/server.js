require("module-alias/register");
const { connectDb } = require("@config/db.js");
const app = require("./app.js");
const { PORT } = require("./config/env.config.js");

(async function () {
  try {
    await connectDb();
    console.log("Server is connected to database successfully");

    app.listen(PORT, () =>
      console.log(`Server is running on port :: ${PORT}`)
    );
  } catch (err) {
    console.error(`Error in connection to database :: ${err}`);
    process.exit(1);
  }
})();
