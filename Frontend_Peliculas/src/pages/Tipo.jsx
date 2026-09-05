import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function Tipo() {
  const [tipos, setTipos] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const cargarTipos = () => {
    axios.get('http://localhost:3000/api/tipos')
      .then(response => setTipos(response.data))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    cargarTipos()
  }, [])

  const limpiarFormulario = () => {
    setNombre('')
    setDescripcion('')
    setEditando(null)
    setMostrarFormulario(false)
  }

  const guardarTipo = async (e) => {
    e.preventDefault()

    try {
      if (editando) {
        await axios.put(`http://localhost:3000/api/tipos/${editando}`, {
          nombre,
          descripcion
        })

        Swal.fire('Actualizado', 'Tipo actualizado correctamente', 'success')
      } else {
        await axios.post('http://localhost:3000/api/tipos', {
          nombre,
          descripcion
        })

        Swal.fire('Creado', 'Tipo creado correctamente', 'success')
      }

      limpiarFormulario()
      cargarTipos()
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el tipo', 'error')
    }
  }

  const editarTipo = (tipo) => {
    setNombre(tipo.nombre)
    setDescripcion(tipo.descripcion)
    setEditando(tipo.id)
    setMostrarFormulario(true)
  }

  const eliminarTipo = async (id) => {
    const resultado = await Swal.fire({
      title: '¿Eliminar tipo?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (resultado.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/tipos/${id}`)
        Swal.fire('Eliminado', 'Tipo eliminado correctamente', 'success')
        cargarTipos()
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el tipo', 'error')
      }
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Tipos</h2>

        <button
          className="btn btn-primary"
          onClick={() => {
            limpiarFormulario()
            setMostrarFormulario(true)
          }}
        >
          Nuevo tipo
        </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={guardarTipo} className="mt-3">
          <input
            className="form-control mb-2"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <button className="btn btn-success me-2" type="submit">
            Guardar
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        </form>
      )}

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tipos.map(tipo => (
            <tr key={tipo.id}>
              <td>{tipo.id}</td>
              <td>{tipo.nombre}</td>
              <td>{tipo.descripcion}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => editarTipo(tipo)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => eliminarTipo(tipo.id)}
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

export default Tipo