import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CarreraDisplay } from '../components/CarreraDisplay';
import { MyInput } from '../components/My-input';
import { MyLabel } from '../components/My-label';
import { MySubmit } from '../components/My-Submit';

export const FormularioUsuario = (props) => {
    let history = useHistory();
    let id = props.match ? props.match.params.id : 0;

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState(-1);
    const [carreraId, setCarreraId] = useState(0);

    useEffect(() => {
        verificarSesion();
    }, [])

    const verificarSesion = () => {
        if (window.localStorage.length < 1) {
            history.push('/');
        }
        else {
            distinguirUsuario();
        }
    }
    const distinguirUsuario = () => {
        let type = window.localStorage.getItem('type');
        if (type == 0) {
            history.push('/');
        }
        else {
            if (id !== 0) {
                cargarUsuario(id)
            }
        }
    }


    const cargarUsuario = (id) => {
        console.log('Usuario a cargar', id);
        Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=usuarios&action=detail&id=' + id)
            .then(response => {
                console.log(response);
                const usuario = response.data.data;
                console.log(usuario)
                setNombreCompleto(usuario.nombreCompleto);
                setEmail(usuario.email);
                setPassword(usuario.password);
                setTipoUsuario(usuario.tipoUsuario);
                setCarreraId(usuario.carreraId);
            });
    }


    const clickGuardar = () => {
        if (tipoUsuario == -1) {
            alert('Escoja un tipo de usuario');
        }
        else if (carreraId == 0) {
            alert('Escoja una carrera');
        }
        else {
            const usuario = {
                nombreCompleto,
                email,
                password,
                tipoUsuario,
                carreraId
            };
            if (id === 0) {
                enviarInsertar(usuario);
            } else {
                enviarActualizar(usuario);
            }
        }
    }
    const enviarActualizar = (usuario) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=usuarios&action=update&id=' + id, usuario)
            .then(response => {
                if (response.data.res === "success") {
                    history.push('/usuarios');
                } else {
                    console.log(response);
                    alert('Hubo un error al actualizar usuario');
                }
            });
    }
    const enviarInsertar = (usuario) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=usuarios&action=store', usuario)
            .then(response => {
                if (response.data.res === "success") {
                    history.push('/usuarios');
                } else {
                    console.log(response);
                    alert('Hubo un error al registrar al usuario');
                }
            });
    }

    return (
        <Row className="mt-3">
            <Col xs={{ span: 6, offset: 3 }}>

                <Form.Group>
                    <MyLabel text='Nombre completo'></MyLabel>
                    <MyInput value={nombreCompleto} placeholder="Escriba su nombres y apellidos" onChange={(e) => { setNombreCompleto(e.target.value) }} ></MyInput>
                </Form.Group>
                <Form.Group>
                    <MyLabel text="Email"> </MyLabel>
                    <MyInput type="email" value={email} placeholder="Escriba sus email" onChange={(e) => { setEmail(e.target.value) }} ></MyInput>
                </Form.Group>
                <Form.Group>
                    <MyLabel text="Password"> </MyLabel>
                    <MyInput type="password" value={password} placeholder="Escriba su password" onChange={(e) => { setPassword(e.target.value) }} ></MyInput>
                </Form.Group>

                <Form.Group>
                    <MyLabel text="Tipo Usuario"></MyLabel>
                    <div>
                        <Form.Control as="select" value={tipoUsuario} onChange={(e) => { setTipoUsuario(e.target.value) }}>
                            <option value='-1'>Elija rol del usuario </option>
                            <option value='0' >Estudiante</option>
                            <option value='1'>Administrador</option>
                        </Form.Control>
                    </div>
                </Form.Group>
                <Form.Group>
                    <MyLabel text="Carrera :"></MyLabel>
                    <CarreraDisplay value={carreraId} onChange={(e) => { setCarreraId(e.target.value) }} ></CarreraDisplay>
                </Form.Group>
                <Form.Group>
                    <MySubmit onClick={clickGuardar} ></MySubmit>
                </Form.Group>
            </Col>
        </Row>
    )

}