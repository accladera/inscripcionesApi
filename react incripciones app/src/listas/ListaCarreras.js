import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { MyInput } from '../components/My-input';

export const ListaCarreras = (props) => {


    const [listaCarreras, setListaCarreras] = useState([]);
    const [privilegio, setPrivilegio] = useState(false);
    const [query, setQuery] = useState('');


    let history = useHistory();
    useEffect(() => {
        verificarSesion();
    }, [])
    const verificarSesion = () => {
        if (window.localStorage.length < 1) {
            history.push('/');
        }
        else {
            //el administrador es el que tiene privilegios aqui ADMIN TRUE Estudiante FALSE
            let privilegio = ((JSON.parse(localStorage.getItem("type"))) == 1) ? true : false;
            setPrivilegio(privilegio);
            if (!privilegio) {
                history.push('/');
            }
            else {
                traerCarreras();
            }
        }
    }

    const traerCarreras = () => {
        if (query=== '') {
            Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=carreras&action=list')
                .then(response => {
                    console.log(response);
                    setListaCarreras(response.data.data);
                });
        }
        else {
            Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=carreras&action=search&q=' + query)
                .then(response => {
                    if (response.data.res === "success") {
                        setListaCarreras(response.data.data);
                    }
                    else {
                        console.log(response);
                    }
                })
        }
    }

    const eliminarCarrera = (id) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=carreras&action=delete', { id })
            .then(response => {
                if (response.data.res === "success") {
                    alert('Carrera eliminada correctamente');
                    traerCarreras();
                }
                else {
                    console.log(response);
                }
            })
    }


    return (
        <div>
            <Row className="mt-4">
                <Col >
                    <Form inline >
                        <MyInput type="text" value={query} placeholder="Busqueda de carrera" onChange={(e) => { setQuery(e.target.value) }} className=" mr-sm-2" ></MyInput>
                        <Button  variant="primary" onClick={() => { traerCarreras() }} >Buscar</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOMBRE</th>
                                <th colSpan='2'>{(privilegio) ? "OPCIONES" : ''}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaCarreras.map(item =>
                                    <tr key={"item-" + item.id} >
                                        <td>{item.id}</td>
                                        <td>{item.nombre}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={'/carreras/edit/' + item.id}>editar</Link>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => { eliminarCarrera(item.id) }} > Eliminar</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>

    )
}