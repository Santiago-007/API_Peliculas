import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function Genero() {
  const [generos, setGeneros] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)

  const [nombre, setNombre] = useState('')
  const [estado, setEstado] = useState('Activo')
  const [descripcion, setDescripcion] = useState('')

  // Cargar géneros
  const cargarGeneros = () => {
    axios.get('http://localhost:3000/api/generos')
      .then(response => {
        setGeneros(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    cargarGeneros()
  }, [])

  // Limpiar formulario
  const limpiarFormulario = () => {
    setNombre('')
    setEstado('Activo')
    setDescripcion('')
    setEditando(null)
  }

  // Guardar género
  const guardarGenero = async (e) => {
    e.preventDefault()

    try {
      if (editando) {
        await axios.put(`http://localhost:3000/api/generos/${editando}`, {
          nombre,
          estado,
          descripcion
        })

        Swal.fire('Actualizado', 'El género fue actualizado correctamente', 'success')
      } else {
        await axios.post('http://localhost:3000/api/generos', {
          nombre,
          estado,
          descripcion
        })

        Swal.fire('Creado', 'El género fue creado correctamente', 'success')
      }

      limpiarFormulario()
      setMostrarFormulario(false)
      cargarGeneros()

    } catch (error) {
      console.error(error)
      Swal.fire('Error', 'No se pudo guardar el género', 'error')
    }
  }

  // Preparar edición
  const editarGenero = (genero) => {
    setEditando(genero.id)
    setNombre(genero.nombre)
    setEstado(genero.estado)
    setDescripcion(genero.descripcion)
    setMostrarFormulario(true)
  }

  // Eliminar género
  const eliminarGenero = async (id) => {
    const resultado = await Swal.fire({
      title: '¿Eliminar género?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (!resultado.isConfirmed) return

    try {
      await axios.delete(`http://localhost:3000/api/generos/${id}`)

      Swal.fire('Eliminado', 'El género fue eliminado correctamente', 'success')

      cargarGeneros()

    } catch (error) {
      console.error(error)
      Swal.fire('Error', 'No se pudo eliminar el género', 'error')
    }
  }

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Géneros</h2>

        <button
          className="btn btn-primary"
          onClick={() => {
            limpiarFormulario()
            setMostrarFormulario(true)
          }}
        >
          Nuevo género
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="card p-3 mb-4">

          <h4>{editando ? 'Editar género' : 'Nuevo género'}</h4>

          <form onSubmit={guardarGenero}>

            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Estado</label>

              <select
                className="form-select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>

              <textarea
                className="form-control"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success me-2">
              {editando ? 'Actualizar' : 'Guardar'}
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
      )}

      {/* Tabla */}
      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {generos.map(genero => (
            <tr key={genero.id}>
              <td>{genero.id}</td>
              <td>{genero.nombre}</td>
              <td>{genero.estado}</td>
              <td>{genero.descripcion}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarGenero(genero)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarGenero(genero.id)}
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

export default Genero