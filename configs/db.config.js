const mongoose = require("mongoose");

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.MONGO_CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

} catch (e) {
    console.log("Could not connect do database");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));