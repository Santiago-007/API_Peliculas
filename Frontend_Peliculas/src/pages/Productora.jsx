import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function Productora() {
  const [productoras, setProductoras] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)

  const [nombre, setNombre] = useState('')
  const [estado, setEstado] = useState('Activo')
  const [slogan, setSlogan] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const cargarProductoras = () => {
    axios.get('http://localhost:3000/api/productoras')
      .then(response => setProductoras(response.data))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    cargarProductoras()
  }, [])

  const limpiarFormulario = () => {
    setNombre('')
    setEstado('Activo')
    setSlogan('')
    setDescripcion('')
    setEditando(null)
    setMostrarFormulario(false)
  }

  const guardarProductora = async (e) => {
    e.preventDefault()

    try {
      const datos = {
        nombre,
        estado,
        slogan,
        descripcion
      }

      if (editando) {
        await axios.put(
          `http://localhost:3000/api/productoras/${editando}`,
          datos
        )

        Swal.fire('Actualizado', 'Productora actualizada correctamente', 'success')
      } else {
        await axios.post(
          'http://localhost:3000/api/productoras',
          datos
        )

        Swal.fire('Creado', 'Productora creada correctamente', 'success')
      }

      limpiarFormulario()
      cargarProductoras()
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar la productora', 'error')
    }
  }

  const editarProductora = (productora) => {
    setNombre(productora.nombre)
    setEstado(productora.estado)
    setSlogan(productora.slogan)
    setDescripcion(productora.descripcion)
    setEditando(productora.id)
    setMostrarFormulario(true)
  }

  const eliminarProductora = async (id) => {
    const resultado = await Swal.fire({
      title: '¿Eliminar productora?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (resultado.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:3000/api/productoras/${id}`
        )

        Swal.fire('Eliminado', 'Productora eliminada correctamente', 'success')
        cargarProductoras()
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la productora', 'error')
      }
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Productoras</h2>

        <button
          className="btn btn-primary"
          onClick={() => {
            limpiarFormulario()
            setMostrarFormulario(true)
          }}
        >
          Nueva productora
        </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={guardarProductora} className="mt-3">

          <input
            className="form-control mb-2"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <select
            className="form-control mb-2"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <input
            className="form-control mb-2"
            placeholder="Slogan"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
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
            <th>Estado</th>
            <th>Slogan</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productoras.map(productora => (
            <tr key={productora.id}>
              <td>{productora.id}</td>
              <td>{productora.nombre}</td>
              <td>{productora.estado}</td>
              <td>{productora.slogan}</td>
              <td>{productora.descripcion}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => editarProductora(productora)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => eliminarProductora(productora.id)}
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

export default Productora