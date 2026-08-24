const sql = require('mssql/msnodesqlv8');

const config = {
    server: '(local)\\SQLEXPRESS',
    database: 'API_Peliculas',
    driver: 'ODBC Driver 18 for SQL Server',
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
};

const conectarBD = async () => {
    try {
        await sql.connect(config);
        console.log('Conectado a SQL Server correctamente');
    } catch (error) {
        console.error('Error al conectar con SQL Server:', error);
    }
};

module.exports = {
    sql,
    conectarBD
};