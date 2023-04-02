const express = require("express")
const app = express()
const logger = require("morgan")
const passport = require("passport")
const cors = require("cors")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require('swagger-ui-express')





// Load enviromental variables
require('dotenv').config()

// Load database configuration
require("./configs/db.config")

// Load passport config
require("./configs/passport.config")(passport)
// swagger config
const swaggerOptions = require("./configs/swagger.config")
const swaggerSpec = swaggerJsDoc(swaggerOptions)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())
app.use(cors())
app.use(logger("dev"))


const indexRouter = require("./routes/indexRouter")(passport)
app.use("/api/", indexRouter)


app.listen(process.env.PORT || 5000, (error) => {
    if (!error) {
        console.log(`Server has started on port ${process.env.PORT}.`)
    } else {
        console.log("Error has occured while starting the server.")
    }
})