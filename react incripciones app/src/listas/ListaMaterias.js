import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { CarreraDisplayColumn } from '../components/CarreraDisplay';
import { MyInput } from '../components/My-input';

export const ListaMaterias = (props) => {

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
                traerMaterias();
            }
        }
    }



    const [listaMaterias, setListaMaterias] = useState([]);

    const traerMaterias = () => {
        if (query === '') {
            Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=materias&action=list')
                .then(response => {
                    console.log(response);
                    setListaMaterias(response.data.data);
                });
        } else {
            Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=materias&action=search&q=' + query)
                .then(response => {
                    if (response.data.res === "success") {
                        setListaMaterias(response.data.data);
                    }
                    else {
                        console.log(response);
                    }
                })
        }
    }


    const eliminarMateria = (id) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=materias&action=delete', { id })
            .then(response => {
                if (response.data.res === "success") {
                    alert('Materia eliminada correctamente');
                    traerMaterias();
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
                        <MyInput type="text" value={query} placeholder="Busqueda de materia" onChange={(e) => { setQuery(e.target.value) }} className=" mr-sm-2" ></MyInput>
                        <Button  variant="danger" onClick={() => { traerMaterias() }} >Buscar</Button>
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
                                <th>SEMESTRE</th>
                                <th>PRECIO</th>
                                <th>CARRERAID</th>
                                <th colSpan='2'>{(privilegio) ? "OPCIONES" : ''}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaMaterias.map(item =>
                                    <tr key={"item-" + item.id} >
                                        <td>{item.id}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.semestre}</td>
                                        <td>{item.precio} (Bs.) </td>
                                        <CarreraDisplayColumn value={item.carreraId}></CarreraDisplayColumn>
                                        <td>
                                            <Link className="btn btn-primary" to={'/materias/edit/' + item.id}>Editar</Link>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => { eliminarMateria(item.id) }} > Eliminar</Button>
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