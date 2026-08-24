const express = require('express');
const cors = require('cors');

const { sql, conectarBD } = require('./database');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta para obtener todos los géneros

app.get('/api/generos', async (req, res) => {
    try {
        const resultado = await sql.query`
            SELECT * FROM Generos
        `;

        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los géneros'
        });
    }
});

// Ruta para agregar un género
app.post('/api/generos', async (req, res) => {
    try {
        const { nombre, estado, descripcion } = req.body;

        const resultado = await sql.query`
            INSERT INTO Generos (nombre, estado, descripcion)
            VALUES (${nombre}, ${estado}, ${descripcion});

            SELECT SCOPE_IDENTITY() AS id;
        `;

        res.status(201).json({
            mensaje: 'Género creado correctamente',
            id: resultado.recordset[0].id
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al crear el género'
        });
    }
});

// Ruta para actualizar un género
app.put('/api/generos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado, descripcion } = req.body;

        await sql.query`
            UPDATE Generos
            SET nombre = ${nombre},
                estado = ${estado},
                descripcion = ${descripcion},
                fecha_actualizacion = GETDATE()
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Género actualizado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar el género'
        });
    }
});

// Ruta para eliminar un género
app.delete('/api/generos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await sql.query`
            DELETE FROM Generos
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Género eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el género'
        });
    }
});

// Ruta para obtener todos los directores
app.get('/api/directores', async (req, res) => {
    try {
        const resultado = await sql.query`
            SELECT * FROM Directores
        `;

        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los directores'
        });
    }
});

app.post('/api/directores', async (req, res) => {
    try {
        const { nombres, estado } = req.body;

        const resultado = await sql.query`
            INSERT INTO Directores (nombres, estado)
            VALUES (${nombres}, ${estado});

            SELECT SCOPE_IDENTITY() AS id;
        `;

        res.status(201).json({
            mensaje: 'Director creado correctamente',
            id: resultado.recordset[0].id
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al crear el director'
        });
    }
});

// Ruta para actualizar un director
app.put('/api/directores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombres, estado } = req.body;

        await sql.query`
            UPDATE Directores
            SET nombres = ${nombres},
                estado = ${estado},
                fecha_actualizacion = GETDATE()
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Director actualizado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar el director'
        });
    }
});

// Ruta para eliminar un director
app.delete('/api/directores/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await sql.query`
            DELETE FROM Directores
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Director eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el director'
        });
    }
});

// Ruta para obtener todas las productoras
app.get('/api/productoras', async (req, res) => {
    try {
        const resultado = await sql.query`
            SELECT * FROM Productoras
        `;

        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener las productoras'
        });
    }
});

// Ruta para agregar una productora
app.post('/api/productoras', async (req, res) => {
    try {
        const { nombre, estado, slogan, descripcion } = req.body;

        const resultado = await sql.query`
            INSERT INTO Productoras (nombre, estado, slogan, descripcion)
            VALUES (${nombre}, ${estado}, ${slogan}, ${descripcion});

            SELECT SCOPE_IDENTITY() AS id;
        `;

        res.status(201).json({
            mensaje: 'Productora creada correctamente',
            id: resultado.recordset[0].id
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al crear la productora'
        });
    }
});

// Ruta para actualizar una productora
app.put('/api/productoras/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado, slogan, descripcion } = req.body;

        await sql.query`
            UPDATE Productoras
            SET nombre = ${nombre},
                estado = ${estado},
                slogan = ${slogan},
                descripcion = ${descripcion},
                fecha_actualizacion = GETDATE()
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Productora actualizada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar la productora'
        });
    }
});

// Ruta para eliminar una productora
app.delete('/api/productoras/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await sql.query`
            DELETE FROM Productoras
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Productora eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar la productora'
        });
    }
});

// Ruta para obtener todos los tipos
app.get('/api/tipos', async (req, res) => {
    try {
        const resultado = await sql.query`
            SELECT * FROM Tipos
        `;

        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los tipos'
        });
    }
});

// Ruta para agregar un tipo
app.post('/api/tipos', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const resultado = await sql.query`
            INSERT INTO Tipos (nombre, descripcion)
            VALUES (${nombre}, ${descripcion});

            SELECT SCOPE_IDENTITY() AS id;
        `;

        res.status(201).json({
            mensaje: 'Tipo creado correctamente',
            id: resultado.recordset[0].id
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al crear el tipo'
        });
    }
});

// Ruta para actualizar un tipo
app.put('/api/tipos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        await sql.query`
            UPDATE Tipos
            SET nombre = ${nombre},
                descripcion = ${descripcion},
                fecha_actualizacion = GETDATE()
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Tipo actualizado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar el tipo'
        });
    }
});

// Ruta para eliminar un tipo
app.delete('/api/tipos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await sql.query`
            DELETE FROM Tipos
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Tipo eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el tipo'
        });
    }
});

app.get('/api/media', async (req, res) => {
    try {
        const resultado = await sql.query`
            SELECT * FROM Media
        `;

        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los registros de media'
        });
    }
});

// Ruta para agregar una media
app.post('/api/media', async (req, res) => {
    try {
        const {
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            anio_estreno,
            genero_id,
            director_id,
            productora_id,
            tipo_id
        } = req.body;

        const resultado = await sql.query`
            INSERT INTO Media
            (serial, titulo, sinopsis, url, imagen, anio_estreno,
             genero_id, director_id, productora_id, tipo_id)
            VALUES
            (${serial}, ${titulo}, ${sinopsis}, ${url}, ${imagen},
             ${anio_estreno}, ${genero_id}, ${director_id},
             ${productora_id}, ${tipo_id});

            SELECT SCOPE_IDENTITY() AS id;
        `;

        res.status(201).json({
            mensaje: 'Media creada correctamente',
            id: resultado.recordset[0].id
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al crear la media'
        });
    }
});

// Ruta para actualizar una media
app.put('/api/media/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            anio_estreno,
            genero_id,
            director_id,
            productora_id,
            tipo_id
        } = req.body;

        await sql.query`
            UPDATE Media
            SET serial = ${serial},
                titulo = ${titulo},
                sinopsis = ${sinopsis},
                url = ${url},
                imagen = ${imagen},
                anio_estreno = ${anio_estreno},
                genero_id = ${genero_id},
                director_id = ${director_id},
                productora_id = ${productora_id},
                tipo_id = ${tipo_id},
                fecha_actualizacion = GETDATE()
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Media actualizada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar la media'
        });
    }
});

// Ruta para eliminar una media
app.delete('/api/media/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await sql.query`
            DELETE FROM Media
            WHERE id = ${id}
        `;

        res.json({
            mensaje: 'Media eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar la media'
        });
    }
});

// Conectar a la base de datos
conectarBD();

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});