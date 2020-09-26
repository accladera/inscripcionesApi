import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { CarreraDisplayColumn } from '../components/CarreraDisplay';
import { MyInput } from '../components/My-input';

export const ListaUsuarios = (props) => {

    const [listaUsuarios, setListaUsuarios] = useState([]);
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
            let privilegio = ((JSON.parse(localStorage.getItem("type"))) == 1) ? true : false;
            setPrivilegio(privilegio);
            if (!privilegio) {
                history.push('/');
            }
            else {
                traerUsuarios();
            }
        }
    }


    const traerUsuarios = () => {
        if (query === '') {
            Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=usuarios&action=list')
                .then(response => {
                    console.log(response);
                    setListaUsuarios(response.data.data);
                });
        }
        else {
            Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=usuarios&action=search&q=' + query)
                .then(response => {
                    if (response.data.res === "success") {
                        setListaUsuarios(response.data.data);
                    }
                    else {
                        console.log(response);
                    }
                })
        }

    }
   
    const eliminarUsuario = (id) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=usuarios&action=delete', { id })
            .then(response => {
                if (response.data.res === "success") {
                    alert('Usuario eliminada correctamente');
                    traerUsuarios();
                }
                else {
                    console.log(response);
                }
            })
    }



    const formatTipoUsuario = (id) => {
        switch (id) {
            case 0:
                return "Estudiante";
            case 1:
                return "Administrador";
            default:
                return "XXXXXXXXXXXXXXXX";
        }
    }


    return (
        <div>
            <Row className="mt-4">
                <Col >
                    <Form inline >
                        <MyInput type="text" value={query} placeholder="Busqueda de usuario" onChange={(e) => { setQuery(e.target.value) }} className=" mr-sm-2" ></MyInput>
                        <Button variant="primary" onClick={() => { traerUsuarios() }} >Buscar</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>REGISTRO</th>
                                <th>NOMBRECOMPLETO</th>
                                <th>EMAIL</th>
                                {/* <th>PASSWORD</th> */}
                                <th>TIPOUSARIO</th>
                                <th>CARRERA</th>
                                <th colSpan='2'>{(privilegio) ? "OPCIONES" : ''}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaUsuarios.map(item =>
                                    <tr key={"item-" + item.id} >
                                        <td>{item.id}</td>
                                        <td>{item.nombreCompleto}</td>
                                        <td>{item.email}</td>
                                        {/* <td>{item.password}</td> */}
                                        <td>{formatTipoUsuario(item.tipoUsuario)}</td>
                                        <CarreraDisplayColumn value={item.carreraId}></CarreraDisplayColumn>
                                        <td>
                                            <Link className="btn btn-primary" to={'/usuarios/edit/' + item.id}>editar</Link>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => { eliminarUsuario(item.id) }} > Eliminar</Button>
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