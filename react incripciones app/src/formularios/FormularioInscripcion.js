import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { MateriaDisplay } from '../components/MateriaDisplay';
import { MyLabel } from '../components/My-label';
import { MySubmit } from '../components/My-Submit';

export const FormularioInscripcion = (props) => {
    let history = useHistory();
    // let id = props.match ? props.match.params.id : 0;

    let usuarioJSONFromLS = localStorage.getItem("session");
    let usuario = JSON.parse(usuarioJSONFromLS);
    let uId = usuario.id;
    let cId= usuario.carreraId;

    const [usuarioId, setUsuarioId] = useState(uId);
    const [carreraId, setCarreraId] = useState(cId);
    const [materiaId, setMateriaId] = useState(0);


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
        let type= JSON.parse(window.localStorage.getItem('type'));
        if (type===1) {
            history.push('/');
        }
        // else{
        // // if (id !== 0) {
        // //     // cargarInscripcion(id);
        // // }
        // }
    }

    // const cargarInscripcion = (id) => {
    //     console.log('Materia a cargar', id);
    //     Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=inscripciones&action=detail&id=' + id)
    //         .then(response => {
    //             console.log(response);
    //             const inscripcion = response.data.data;  
    //                 setUsuarioId(inscripcion.usuarioId);   
    //                 setCarreraId(inscripcion.carreraId);
    //                 setMateriaId(inscripcion.materiaId);      
    //         });
    // }


    const clickGuardar = () => {

        if(materiaId==0){
            alert('Elija una materia');
        }
        else{
            console.log(materiaId);
        const inscripcion = {
            usuarioId,
            carreraId,
            materiaId
        }; 
         enviarInsertar(inscripcion);
        }
        // if (id === 0) {
          
        // } 
        // else {
        //     enviarActualizar(inscripcion);
        // }
        
    }
    // const enviarActualizar = (inscripcion) => {
    //     Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=inscripciones&action=update&id=' + id, inscripcion)
    //         .then(response => {
    //             if (response.data.res === "success") {
    //                 history.push('/inscripciones');
    //             } else {
    //                 console.log(response);
    //                 alert('Hubo un error al actualizar inscripcion');
    //             }
    //         });
    // }
    const enviarInsertar = (inscripcion) => {
        Axios.post('http://localhost:8080/inscripcionesapi/index.php?controller=inscripciones&action=store', inscripcion)
            .then(response => {
                if (response.data.res === "success") {
                    history.push('/inscripciones');
                } else {
                    console.log(response);
                    alert('Hubo un error al registrar la inscripcion');
                }
            });
    }
    return (
        <div>
            <Row className="mt-2">
                <Col>
                <Card bg="primary" text="white" className="text-center p-2">
                    <blockquote className="blockquote card-body">
                    <h1>Formulario de inscripcion de el/la estudiante {usuario.nombreCompleto}</h1>
                    </blockquote>                   
                </Card>
                </Col>           
            </Row>
            <Row className="mt-3">
                <Col xs={{ span: 8, offset: 1 }}>               
                <Form.Group>
                    <MyLabel text='Materias disponibles :'></MyLabel>               
                    <MateriaDisplay onChange={(e)=> { setMateriaId(e.target.value) }} ></MateriaDisplay>
                </Form.Group>           
                <Form.Group>
                    <MySubmit onClick={clickGuardar} ></MySubmit>
                </Form.Group>
            </Col>
        </Row>
        </div>
        
    )

}