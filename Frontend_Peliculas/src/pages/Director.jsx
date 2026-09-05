import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function Director() {
  const [directores, setDirectores] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)

  const [nombres, setNombres] = useState('')
  const [estado, setEstado] = useState('Activo')

  const cargarDirectores = () => {
    axios
      .get('http://localhost:3000/api/directores')
      .then((response) => {
        setDirectores(response.data)
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    cargarDirectores()
  }, [])

  const limpiarFormulario = () => {
    setNombres('')
    setEstado('Activo')
    setEditando(null)
    setMostrarFormulario(false)
  }

  const guardarDirector = async (e) => {
    e.preventDefault()

    try {
      if (editando) {
        await axios.put(
          `http://localhost:3000/api/directores/${editando}`,
          {
            nombres,
            estado,
          }
        )

        Swal.fire('Actualizado', 'Director actualizado correctamente', 'success')
      } else {
        await axios.post(
          'http://localhost:3000/api/directores',
          {
            nombres,
            estado,
          }
        )

        Swal.fire('Guardado', 'Director creado correctamente', 'success')
      }

      limpiarFormulario()
      cargarDirectores()
    } catch (error) {
      console.error(error)
      Swal.fire('Error', 'No se pudo guardar el director', 'error')
    }
  }

  const editarDirector = (director) => {
    setEditando(director.id)
    setNombres(director.nombres || '')
    setEstado(director.estado || 'Activo')
    setMostrarFormulario(true)
  }

  const eliminarDirector = async (id) => {
    const resultado = await Swal.fire({
      title: '¿Eliminar director?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (resultado.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/directores/${id}`)

        Swal.fire('Eliminado', 'Director eliminado correctamente', 'success')
        cargarDirectores()
      } catch (error) {
        console.error(error)
        Swal.fire('Error', 'No se pudo eliminar el director', 'error')
      }
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Directores</h2>

        <button
          className="btn btn-primary"
          onClick={() => {
            limpiarFormulario()
            setMostrarFormulario(true)
          }}
        >
          Nuevo director
        </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={guardarDirector} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              className="form-control"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              className="form-control"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success me-2">
            {editando ? 'Actualizar' : 'Guardar'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        </form>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {directores.map((director) => (
            <tr key={director.id}>
              <td>{director.id}</td>
              <td>{director.nombres}</td>
              <td>{director.estado}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => editarDirector(director)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => eliminarDirector(director.id)}
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

export default Director