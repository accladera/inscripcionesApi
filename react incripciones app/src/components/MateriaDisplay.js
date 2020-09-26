import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
export const MateriaDisplay = (props) => {
    const [listaMaterias, setListaMaterias] = useState([]);

    let type = JSON.parse(localStorage.getItem("type"));

    let usuarioJSONFromLS = localStorage.getItem("session");
    let usuarioFromLS = JSON.parse(usuarioJSONFromLS);
    let id = usuarioFromLS.id;
    
    useEffect(() => {
        traerMaterias();
    }, []);
    
    const traerMaterias = () => {
        if(type===1){
            Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=materias&action=list')
            .then(response => {
                console.log(response);
                setListaMaterias(response.data.data);
            });
        }
        else{
            Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=materias&action=listUser&usuarioId='+id)
            .then(response => {
                console.log(response);
                setListaMaterias(response.data.data);
            });
        }
        

    }

    return (
        <Form.Control as="select" {...props}>
            <option value='0'> Elija una materia </option>
            {
                listaMaterias.map(item =>
                    <option key={"item-" + item.id} value={item.id}  > {item.nombre} </option>
                )
            }
        </Form.Control>
    )
}
export const MateriaDisplayColumn = (props) => {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        traerMaterias(props.value);
    }, [])
    const traerMaterias = (id) => {
        Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=materias&action=detail&id='+id)
            .then(response => {
                if (response.data.res === "success") {
                    const materia = response.data.data;
                    setNombre(materia.nombre);
                }
            }
            )
    }

    return (
        <td> {nombre} </td>
    )

}