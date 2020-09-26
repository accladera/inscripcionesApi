import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const Home = (props) => {

    const [privilegio, setPrivilegio] = useState(false);

    let history = useHistory();
    useEffect(() => {
        verificarSesion();
    }, [])

    const verificarSesion = () => {
        if (window.localStorage.length < 1) {
            history.push('/');
        }
        else {
            //el administrador es el que tiene mas privilegios en general es el  ADMIN TRUE Estudiante FALSE
            let privilegio = ((JSON.parse(localStorage.getItem("type"))) == 1) ? true : false;
            setPrivilegio(privilegio);
            if (!privilegio) {
                console.log('Estudiante');
            }
            else {
                console.log('admin');
            }
        }
    }
    return (
        <Row className="mt-3">
            <Col>
                <Card bg="primary" text="white" className="text-center p-3">
                    <blockquote className="blockquote mb-0 card-body">
                        <h1>Inscripciones APP</h1>
                        <h2>{(privilegio) ? "Bienvenido Admin" : "Bienvenido estudiante."}</h2>
                    </blockquote>
                </Card>
            </Col>
        </Row>
    )
}