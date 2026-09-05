import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function Pelicula() {

    const [peliculas, setPeliculas] = useState([])
    const [generos, setGeneros] = useState([])
    const [directores, setDirectores] = useState([])
    const [productoras, setProductoras] = useState([])
    const [tipos, setTipos] = useState([])

    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [editando, setEditando] = useState(null)

    const [serial, setSerial] = useState('')
    const [titulo, setTitulo] = useState('')
    const [sinopsis, setSinopsis] = useState('')
    const [url, setUrl] = useState('')
    const [imagen, setImagen] = useState('')
    const [anioEstreno, setAnioEstreno] = useState('')
    const [generoId, setGeneroId] = useState('')
    const [directorId, setDirectorId] = useState('')
    const [productoraId, setProductoraId] = useState('')
    const [tipoId, setTipoId] = useState('')

    // Cargar películas
    const cargarPeliculas = () => {
        axios.get('http://localhost:3000/api/media')
            .then(response => {
                setPeliculas(response.data)
            })
            .catch(error => console.error(error))
    }

    // Cargar géneros
    const cargarGeneros = () => {
        axios.get('http://localhost:3000/api/generos')
            .then(response => {
                setGeneros(response.data)
            })
            .catch(error => console.error(error))
    }

    // Cargar directores
    const cargarDirectores = () => {
        axios.get('http://localhost:3000/api/directores')
            .then(response => {
                setDirectores(response.data)
            })
            .catch(error => console.error(error))
    }

    // Cargar productoras
    const cargarProductoras = () => {
        axios.get('http://localhost:3000/api/productoras')
            .then(response => {
                setProductoras(response.data)
            })
            .catch(error => console.error(error))
    }

    // Cargar tipos
    const cargarTipos = () => {
        axios.get('http://localhost:3000/api/tipos')
            .then(response => {
                setTipos(response.data)
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        cargarPeliculas()
        cargarGeneros()
        cargarDirectores()
        cargarProductoras()
        cargarTipos()
    }, [])

    // Limpiar formulario
    const limpiarFormulario = () => {
        setSerial('')
        setTitulo('')
        setSinopsis('')
        setUrl('')
        setImagen('')
        setAnioEstreno('')
        setGeneroId('')
        setDirectorId('')
        setProductoraId('')
        setTipoId('')
        setEditando(null)
    }

    // Guardar película
    const guardarPelicula = async (e) => {
        e.preventDefault()

        const datos = {
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            anio_estreno: anioEstreno,
            genero_id: generoId,
            director_id: directorId,
            productora_id: productoraId,
            tipo_id: tipoId
        }

        try {

            if (editando) {

                await axios.put(
                    `http://localhost:3000/api/media/${editando}`,
                    datos
                )

                Swal.fire(
                    'Actualizado',
                    'La película fue actualizada correctamente',
                    'success'
                )

            } else {

                await axios.post(
                    'http://localhost:3000/api/media',
                    datos
                )

                Swal.fire(
                    'Creada',
                    'La película fue creada correctamente',
                    'success'
                )
            }

            limpiarFormulario()
            setMostrarFormulario(false)
            cargarPeliculas()

        } catch (error) {

            console.error(error)

            Swal.fire(
                'Error',
                'No se pudo guardar la película',
                'error'
            )
        }
    }

    // Editar película
    const editarPelicula = (pelicula) => {

        setEditando(pelicula.id)

        setSerial(pelicula.serial || '')
        setTitulo(pelicula.titulo || '')
        setSinopsis(pelicula.sinopsis || '')
        setUrl(pelicula.url || '')
        setImagen(pelicula.imagen || '')
        setAnioEstreno(pelicula.anio_estreno || '')
        setGeneroId(pelicula.genero_id || '')
        setDirectorId(pelicula.director_id || '')
        setProductoraId(pelicula.productora_id || '')
        setTipoId(pelicula.tipo_id || '')

        setMostrarFormulario(true)
    }

    // Eliminar película
    const eliminarPelicula = async (id) => {

        const resultado = await Swal.fire({
            title: '¿Eliminar película?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        })

        if (resultado.isConfirmed) {

            try {

                await axios.delete(
                    `http://localhost:3000/api/media/${id}`
                )

                Swal.fire(
                    'Eliminada',
                    'La película fue eliminada correctamente',
                    'success'
                )

                cargarPeliculas()

            } catch (error) {

                console.error(error)

                Swal.fire(
                    'Error',
                    'No se pudo eliminar la película',
                    'error'
                )
            }
        }
    }

    // Obtener nombre del género
    const obtenerGenero = (id) => {

        const genero = generos.find(
            g => String(g.id) === String(id)
        )

        return genero ? genero.nombre : id
    }

    // Obtener nombre del director
    const obtenerDirector = (id) => {

    const director = directores.find(
        d => String(d.id) === String(id)
    )

    if (!director) return id

    const nombre = director.nombre || director.nombres || ''
    const apellido = director.apellido || director.apellidos || ''

    return `${nombre} ${apellido}`.trim()
}

    // Obtener nombre de la productora
    const obtenerProductora = (id) => {

        const productora = productoras.find(
            p => String(p.id) === String(id)
        )

        return productora ? productora.nombre : id
    }

    // Obtener nombre del tipo
    const obtenerTipo = (id) => {

        const tipo = tipos.find(
            t => String(t.id) === String(id)
        )

        return tipo ? tipo.nombre : id
    }

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>Películas</h1>

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        limpiarFormulario()
                        setMostrarFormulario(true)
                    }}
                >
                    Nueva película
                </button>

            </div>

            {mostrarFormulario && (

                <div className="card mb-4">

                    <div className="card-body">

                        <h3>
                            {editando
                                ? 'Editar película'
                                : 'Nueva película'}
                        </h3>

                        <form onSubmit={guardarPelicula}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Serial</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={serial}
                                        onChange={e =>
                                            setSerial(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Título</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={titulo}
                                        onChange={e =>
                                            setTitulo(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-12 mb-3">

                                    <label>Sinopsis</label>

                                    <textarea
                                        className="form-control"
                                        value={sinopsis}
                                        onChange={e =>
                                            setSinopsis(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>URL</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={url}
                                        onChange={e =>
                                            setUrl(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Imagen</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={imagen}
                                        onChange={e =>
                                            setImagen(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Año de estreno</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={anioEstreno}
                                        onChange={e =>
                                            setAnioEstreno(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Género</label>

                                    <select
                                        className="form-select"
                                        value={generoId}
                                        onChange={e =>
                                            setGeneroId(e.target.value)
                                        }
                                        required
                                    >

                                        <option value="">
                                            Seleccione un género
                                        </option>

                                        {generos.map(genero => (

                                            <option
                                                key={genero.id}
                                                value={genero.id}
                                            >
                                                {genero.nombre}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Director</label>

                                    <select
                                        className="form-select"
                                        value={directorId}
                                        onChange={e =>
                                            setDirectorId(e.target.value)
                                        }
                                        required
                                    >

                                        <option value="">
                                            Seleccione un director
                                        </option>

                                        {directores.map(director => (

                                            <option
                                                key={director.id}
                                                value={director.id}
                                            >
                                                {director.nombre} {director.apellido}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Productora</label>

                                    <select
                                        className="form-select"
                                        value={productoraId}
                                        onChange={e =>
                                            setProductoraId(e.target.value)
                                        }
                                        required
                                    >

                                        <option value="">
                                            Seleccione una productora
                                        </option>

                                        {productoras.map(productora => (

                                            <option
                                                key={productora.id}
                                                value={productora.id}
                                            >
                                                {productora.nombre}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Tipo</label>

                                    <select
                                        className="form-select"
                                        value={tipoId}
                                        onChange={e =>
                                            setTipoId(e.target.value)
                                        }
                                        required
                                    >

                                        <option value="">
                                            Seleccione un tipo
                                        </option>

                                        {tipos.map(tipo => (

                                            <option
                                                key={tipo.id}
                                                value={tipo.id}
                                            >
                                                {tipo.nombre}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-success me-2"
                            >
                                Guardar
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    limpiarFormulario()
                                    setMostrarFormulario(false)
                                }}
                            >
                                Cancelar
                            </button>

                        </form>

                    </div>

                </div>

            )}

            <table className="table table-bordered">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Serial</th>
                        <th>Título</th>
                        <th>Año</th>
                        <th>Género</th>
                        <th>Director</th>
                        <th>Productora</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {peliculas.map(pelicula => (

                        <tr key={pelicula.id}>

                            <td>{pelicula.id}</td>

                            <td>{pelicula.serial}</td>

                            <td>{pelicula.titulo}</td>

                            <td>{pelicula.anio_estreno}</td>

                            <td>
                                {obtenerGenero(pelicula.genero_id)}
                            </td>

                            <td>
                                {obtenerDirector(pelicula.director_id)}
                            </td>

                            <td>
                                {obtenerProductora(pelicula.productora_id)}
                            </td>

                            <td>
                                {obtenerTipo(pelicula.tipo_id)}
                            </td>

                            <td>

                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() =>
                                        editarPelicula(pelicula)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        eliminarPelicula(pelicula.id)
                                    }
                                >
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    )
}

export default Pelicula