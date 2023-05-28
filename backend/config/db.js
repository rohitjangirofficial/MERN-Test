const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Host - ${connection.host} Database Name - ${connection.name}`);
  } catch (error) {
    console.log("Failed To Connect Database");
  }
};
