import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { FormularioUsuario } from './formularios/FormularioUsuario';
import { FormularioCarrera } from './formularios/FormularioCarrera';
import { FormularioMateria } from './formularios/FormularioMateria';

import { ListaUsuarios } from './listas/ListaUsuarios';
import { ListaMaterias } from './listas/ListaMaterias';
import { ListaCarreras } from './listas/ListaCarreras';
import { ListaInscripciones } from './listas/ListaInscripciones';
import { FormularioSesion } from './formularios/FormularioSesion';
import { Home } from './Home';
import { FormularioInscripcion } from './formularios/FormularioInscripcion';




function App() {
  const cerrarSesion = () => {
    var session = JSON.parse(localStorage.getItem('session'));
    if (session != null) {
      console.log(session);
      localStorage.removeItem('session');
      localStorage.removeItem('type');
    }
    else {
      console.log('No se encontro usuario en sesion')
    }
  }
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Link to="/" className="navbar-brand"   >Aplicación Inscripciones</Link>
        <NavDropdown title="Usuarios"  >
          <Link to="/usuarios" className="dropdown-item">Lista</Link>
          <Link to="/usuarios/create" className="dropdown-item">Nuevo Usuario</Link>
        </NavDropdown>
        <NavDropdown title="Materias"  >
          <Link to="/materias" className="dropdown-item">Lista</Link>
          <Link to="/materias/create" className="dropdown-item">Nueva Materia</Link>
        </NavDropdown>
        <NavDropdown title="Carreras"  >
          <Link to="/carreras" className="dropdown-item">Lista</Link>
          <Link to="/carreras/create" className="dropdown-item">Nueva Carrera</Link>
        </NavDropdown>
        <NavDropdown title="Inscripciones"  >
          <Link to="/inscripciones" className="dropdown-item">Lista</Link>
          <Link to="/inscripciones/create" className="dropdown-item">Inscribirme</Link>

        </NavDropdown>
        <NavDropdown title="Sesión"  >
          <Link to="/" onClick={cerrarSesion} className="dropdown-item">Cerrar</Link>
        </NavDropdown>
      </Navbar>
      <Container>
        <Switch>
          <Route exact path="/usuarios">
            <ListaUsuarios></ListaUsuarios>
          </Route>
          <Route path="/usuarios/create">
            <FormularioUsuario></FormularioUsuario>
          </Route>
          <Route path="/usuarios/edit/:id" component={FormularioUsuario} >
          </Route>

          <Route exact path="/carreras">
            <ListaCarreras></ListaCarreras>
          </Route>
          <Route path="/carreras/create">
            <FormularioCarrera></FormularioCarrera>
          </Route>
          <Route path="/carreras/edit/:id" component={FormularioCarrera}>
          </Route>

          <Route exact path="/materias">
            <ListaMaterias></ListaMaterias>
          </Route>
          <Route path="/materias/create">
            <FormularioMateria></FormularioMateria>
          </Route>
          <Route path="/materias/edit/:id" component={FormularioMateria}>
          </Route>

          <Route exact path="/inscripciones">
            <ListaInscripciones></ListaInscripciones>
          </Route>
          <Route path="/inscripciones/create">
            <FormularioInscripcion></FormularioInscripcion>
          </Route>
          <Route path="/inscripciones/edit/:id" component={FormularioInscripcion}>
          </Route>



          <Route path="/home">
            <Home></Home>
          </Route>


          <Route path="/">
            <FormularioSesion></FormularioSesion>
          </Route>

        </Switch>
      </Container>
    </BrowserRouter >
  );
}

export default App;
