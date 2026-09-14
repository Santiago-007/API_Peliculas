const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT || 1433),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

const conectarBD = async () => {
    try {
        await sql.connect(config);
        console.log('Conectado a Azure SQL correctamente');
    } catch (error) {
        console.error('Error al conectar con Azure SQL:', error);
        throw error;
    }
};

module.exports = {
    sql,
    conectarBD
};