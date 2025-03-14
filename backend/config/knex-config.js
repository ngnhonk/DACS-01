module.exports = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST || "localhost",
            database: process.env.DB_NAME || "mydb",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "honk2004",
        }
    },
}