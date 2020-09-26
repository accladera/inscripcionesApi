import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CarreraDisplay } from '../components/CarreraDisplay';
import { MyInput } from '../components/My-input';
import { MyLabel } from '../components/My-label';
import { MySubmit } from '../components/My-Submit';

export const FormularioMateria = (props) => {
    let history = useHistory();
    let id = props.match ? props.match.params.id : 0;

    const [nombre, setNombre] = useState('');
    const [semestre, setSemestre] = useState('');
    const [precio, setPrecio] = useState(0);
    const [carreraId, setCarreraId] = useState(1);


    useEffect(() => {
        verificarSesion();
    }, [])
    const verificarSesion = () => {
        if (window.localStorage.length < 1) {
            history.push('/');
        }
        else{
            distinguirUsuario();
        }    
    }

    const distinguirUsuario =()=>{
        let type= window.localStorage.getItem('type');
        if (type==0) {
            history.push('/');
        }
       else{
        if (id !== 0) {
            cargarMateria(id);
        }
       }
    }

    const cargarMateria = (id) => {
        console.log('Materia a cargar', id);
        Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=materias&action=detail&id=' + id)
            .then(response => {
                console.log(response);
                const materia = response.data.data;
                setNombre(materia.nombre);
                setSemestre(materia.semestre);
                setPrecio(materia.precio);
                setCarreraId(materia.carreraId);
            });
    }


    const clickGuardar = () => {
        if(semestre=='No definido'|| semestre=='Elije el semestre'){
            alert('Defina el semestre');
        }else
        {
            const materia = {
                nombre,
                semestre,
                precio,
                carreraId
            };
            if (id === 0) {
                enviarInsertar(materia);
            } else {
                enviarActualizar(materia);
            }
        }
    }
    const enviarActualizar = (materia) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=materias&action=update&id=' + id, materia)
            .then(response => {
                if (response.data.res === "success") {
                    history.push('/materias');
                } else {
                    console.log(response);
                    alert('Hubo un error al actualizar materia');
                }
            });
    }
    const enviarInsertar = (materia) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=materias&action=store', materia)
            .then(response => {
                if (response.data.res === "success") {
                    history.push('/materias');
                } else {
                    console.log(response);
                    alert('Hubo un error al registrar  la materia');
                }
            });
    }
    return (
        <Row className="mt-3">
            <Col xs={{ span: 6, offset: 1 }}>
                <Form.Group>
                    <MyLabel text='Materia :'></MyLabel>
                    <MyInput value={nombre} placeholder="Escribe el nombre de materia" onChange={(e) => { setNombre(e.target.value) }} ></MyInput>
                </Form.Group>
                <Form.Group>
                    <MyLabel text="Semestre:"></MyLabel>
                    <div>
                        <Form.Control as="select" value={semestre} onChange={(e) => { setSemestre(e.target.value) }}>
                            <option value='No definido'>Elije el semestre</option>
                            <option value='Primer'>Primer</option>
                            <option value='Segundo'>Segundo</option>
                            <option value='Tercero'>Tercero</option>
                            <option value='Cuarto'>Cuarto</option>
                            <option value='Quinto'>Quinto</option>
                            <option value='Sexto'>Sexto</option>
                            <option value='Septimo'>Septivo</option>
                            <option value='Octavo'>Octavo</option>
                        </Form.Control>
                    </div>
                </Form.Group>
                <Form.Group>
                    <MyLabel text='Precio (Bs.) :'></MyLabel>
                    <MyInput input="number" value={precio} placeholder="Escribe el precio de la materia" onChange={(e) => { setPrecio(e.target.value) }} ></MyInput>
                </Form.Group>
                <Form.Group>
                    <MyLabel text='Carrera :'></MyLabel>
                    <CarreraDisplay value={carreraId} onChange={(e) => { setCarreraId(e.target.value) }} ></CarreraDisplay>
                </Form.Group>
                <Form.Group>
                    <MySubmit onClick={clickGuardar} ></MySubmit>
                </Form.Group>
            </Col>
        </Row>
    )

}