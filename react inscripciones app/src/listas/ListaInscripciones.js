import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { CarreraDisplayColumn } from '../components/CarreraDisplay';
import { MateriaDisplayColumn } from '../components/MateriaDisplay';
import { MyInput } from '../components/My-input';
import { UsuarioDisplayColumn } from '../components/UsuarioDisplay';

export const ListaInscripciones = (props) => {
    let usuarioJSONFromLS = localStorage.getItem("session");
    let usuario = JSON.parse(usuarioJSONFromLS);
    let id = usuario.id;


    const [listaInscripciones, setListaInscripciones] = useState([]);
    const [precio, setPrecio] = useState(0);
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
            //En inscripciones el usuario estudiante tiene mas privilegios. Estudiante TRUE : Admin FALSE
            let privilegio = ((JSON.parse(localStorage.getItem("type"))) == 0) ? true : false;
            setPrivilegio(privilegio);
            console.log('mis privilegios ' + privilegio);
            if (privilegio) {
                console.log()
                traerInscripciones(0, id);
                precioTotal(id);
            }
            else {
                traerInscripciones(1);
            }
        }
    }


    //Switch distingue estudiante de admin . la decision query distingue en traer todo o una busqueda
    const traerInscripciones = (type) => {
        switch (type) {
            case 1:
                if (query === '') {
                    Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=inscripciones&action=list')
                        .then(response => {
                            setListaInscripciones(response.data.data);
                        });
                }
                else {
                    Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=inscripciones&action=searchAdmin&q=' + query)
                        .then(response => {
                            if (response.data.res == "success") {
                                setListaInscripciones(response.data.data);
                            }
                            else {
                                console.log(response);
                            }
                        })
                }
                break;
            default:
                if (query === '') {
                    Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=inscripciones&action=searchByUser&q=' + id)
                        .then(response => {
                            console.log(response);
                            setListaInscripciones(response.data.data);
                        });
                    // precioTotal(id);
                }
                else {
                    Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=inscripciones&action=searchUser&usuarioId='+id+'&q='+query)
                        .then(response => {
                            console.log(response);
                            setListaInscripciones(response.data.data);
                        });
                    // precioTotal(id);
                }
                break;
        }
    }


    const eliminarInscripcion = (id, userId) => {
        if (privilegio) {
            Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=inscripciones&action=delete', { id })
                .then(response => {
                    if (response.data.res === "success") {
                        alert('Inscripcion quitada');
                        traerInscripciones(0, userId);
                        precioTotal(userId);
                    }
                    else {
                        console.log(response);
                    }
                })
        }
        else {
            alert('No tienes ese permiso');
        }
    }
    const precioTotal = (userId) => {
        // if (!privilegio) {
        Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=inscripciones&action=selectTotal&usuarioId=' + userId)
            .then(response => {
                let precio = response.data.data;
                setPrecio(JSON.parse(precio))

            });
        // }
    }

    return (
        <div>
            <Row className="mt-4">
                <Col>
                    <Card border="primary" style={{ width: '100%' }}>
                        <Card.Header>  Nombre : { usuario.nombreCompleto } </Card.Header>
                        <Card.Body>
                            <Card.Title>Total</Card.Title>
                            <Card.Text>
                                {(privilegio) ? precio : 'Eres un administrador, no tienes un plan de pago.'}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4" >
                <Col>
                    <Form inline >
                        <MyInput type="text" value={query} placeholder="Busqueda ..." onChange={(e) => { setQuery(e.target.value) }} className=" mr-sm-2" ></MyInput>
                        <Button variant="primary" onClick={() => { traerInscripciones() }} >Buscar</Button>

                        <Link  className="ml-2" style={(privilegio) ? { display: "initial"} : { display: "none" }} className="btn btn-primary" to={'/inscripciones/create' }>Agregar</Link>
                   
                    </Form>
                                                            
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOMBRE ESTUDIANTE</th>
                                <th>REGISTRO</th>
                                <th>MATERIA</th>
                                <th>CARRERA</th>
                                <th colSpan='2'>{(privilegio) ? "OPCIONES" : ''}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaInscripciones.map(item =>
                                    <tr key={"item-" + item.id} >
                                        <td>{item.id}</td>
                                        <UsuarioDisplayColumn value={item.usuarioId}></UsuarioDisplayColumn>
                                        <td>{item.usuarioId}</td>
                                        <MateriaDisplayColumn value={item.materiaId} ></MateriaDisplayColumn>
                                        <CarreraDisplayColumn value={item.carreraId} ></CarreraDisplayColumn>
                                        {/* <td >
                                            <Link style={(privilegio) ? { display: "initial" } : { display: "none" }} className="btn btn-primary" to={'/inscripciones/edit/' + item.id}>editar</Link>
                                        </td> */}
                                        <td>
                                            <Button style={(privilegio) ? { display: "initial" } : { display: "none" }} variant="danger" onClick={() => { eliminarInscripcion(item.id, item.usuarioId) }} > Eliminar</Button>
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