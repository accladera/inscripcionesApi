import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { MyInput } from '../components/My-input';
import { MyLabel } from '../components/My-label';
import { MySubmit } from '../components/My-Submit';

export const FormularioSesion = (props) => {

    let history = useHistory();

    useEffect(() => {
        verificarSesion();
    }, [])
    const verificarSesion = () => {
        if (window.localStorage.length > 0) {
            history.push('/home');
        }
    }

    let id = props.match ? props.match.params.id : 0;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const clickEntrar = () => {
        Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=usuarios&action=detailEmail&email=' + email)
            .then(response => {
                if (response.data.res === "success") {
                    const usuario = response.data.data;
                    if (usuario.password === password) {
                        console.log(usuario);
                        console.log(response);
                        window.localStorage.setItem('session', JSON.stringify(usuario));
                        let tipo = ((usuario.tipoUsuario === 1) ? 'Administrador' : 'Estudiante');
                        console.log(" El usuario es " + tipo);
                        window.localStorage.setItem('type', usuario.tipoUsuario);
                        history.push('/home');
                    }
                    else {
                       
                        alert('Usuario email/contraseña incorrecto');
                    }
                } else {
                    alert('Usuario email/contraseña incorrecto');
                }
            });
    }
    return (
        <div>
            <Row className="mt-2">
                <Col xs={{ span: 8, offset: 1 }}>
                    <Card bg="primary" text="white" className="text-center p-3 ">
                        <blockquote className="blockquote mb-0 card-body">
                            <h1>Inicia sesión</h1>
                        </blockquote>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={{ span: 6, offset: 2 }}>
                    <Form.Group>
                        <MyLabel text='Email de usuario:'></MyLabel>
                        <MyInput value={email} placeholder="Escribe su email" onChange={(e) => { setEmail(e.target.value) }} ></MyInput>
                    </Form.Group>
                    <Form.Group>
                        <MyLabel text='Password:'></MyLabel>
                        <MyInput type="password" input="password" value={password} placeholder="Escribe su contraseña" onChange={(e) => { setPassword(e.target.value) }} ></MyInput>
                    </Form.Group>
                    <Form.Group>
                        <MySubmit onClick={clickEntrar} ></MySubmit>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    )

}