import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { MyInput } from '../components/My-input';
import { MyLabel } from '../components/My-label';
import { MySubmit } from '../components/My-Submit';

export const FormularioCarrera = (props) => {
    let history = useHistory();
    let id = props.match ? props.match.params.id : 0;
    const [nombre, setNombre] = useState('');

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
                cargarCarrera(id)
            }
        }
    }



    const cargarCarrera = (id) => {
        console.log('Carrera a cargar', id);
        Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=carreras&action=detail&id=' + id)
            .then(response => {
                console.log(response);
                const carrera = response.data.data;
                console.log(carrera)
                setNombre(carrera.nombre);
            });
    }


    const clickGuardar = () => {
        const carrera = { nombre };
        if (id === 0) {
            enviarInsertar(carrera);
        } else {
            enviarActualizar(carrera);
        }
    }
    const enviarActualizar = (carrera) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=carreras&action=update&id=' + id, carrera)
            .then(response => {
                if (response.data.res === "success") {
                    history.push('/carreras');
                } else {
                    console.log(response);
                    alert('Hubo un error al actualizar carrera');
                }
            });
    }
    const enviarInsertar = (carrera) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=carreras&action=store', carrera)
            .then(response => {
                if (response.data.res === "success") {
                    history.push('/carreras');
                } else {
                    console.log(response);
                    alert('Hubo un error al registrar  la carrera');
                }
            });
    }
    return (
        <Row className="mt-3">
            <Col xs={{ span: 6, offset: 1 }}>
                <Form.Group>
                    <MyLabel text='Carrera:'></MyLabel>
                    <MyInput value={nombre} placeholder="Nombre de la carrera" onChange={(e) => { setNombre(e.target.value) }} ></MyInput>
                </Form.Group>
                <Form.Group>
                    <MySubmit onClick={clickGuardar} ></MySubmit>
                </Form.Group>
            </Col>
        </Row>
    )

}