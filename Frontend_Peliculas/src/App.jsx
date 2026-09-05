import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Genero from './pages/Genero'
import Director from './pages/Director'
import Productora from './pages/Productora'
import Tipo from './pages/Tipo'
import Pelicula from './pages/Pelicula'

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Películas
          </Link>

          <div className="navbar-nav">
            <Link className="nav-link" to="/generos">Género</Link>
            <Link className="nav-link" to="/directores">Director</Link>
            <Link className="nav-link" to="/productoras">Productora</Link>
            <Link className="nav-link" to="/tipos">Tipo</Link>
            <Link className="nav-link" to="/peliculas">Películas</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="container mt-4">
              <h1>Aplicación de Películas</h1>
            </div>
          }
        />

        <Route path="/generos" element={<Genero />} />
        <Route path="/directores" element={<Director />} />
        <Route path="/productoras" element={<Productora />} />
        <Route path="/tipos" element={<Tipo />} />
        <Route path="/peliculas" element={<Pelicula />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App