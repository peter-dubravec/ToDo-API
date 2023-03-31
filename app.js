const express = require("express")
const app = express()
const logger = require("morgan")
const passport = require("passport")

require('dotenv').config()
require("./configs/db.config")
require("./configs/passport")(passport)


app.use(express.json())
app.use(logger("dev"))


const indexRouter = require("./routes/indexRouter")(passport)
app.use("/api/", indexRouter)


app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(`Server has started on port ${process.env.PORT}.`)
    } else {
        console.log("Error has occured while starting the server.")
    }
})