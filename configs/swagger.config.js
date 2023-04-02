module.exports = {
    swaggerDefinition: {
        info: {
            title: 'ToDo API',
            version: '1.0.0'
        },
    },
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
        }
    },

    servers: [
        {
            url: "http://localhost:5000/",
        },
    ],
    apis: ["./routes/*.js"]
}