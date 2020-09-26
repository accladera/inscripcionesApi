import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
export const CarreraDisplay = (props)=>
{

    const [listaCarreras, setListaCarreras] = useState([]);

    useEffect(() => {
        traerCarreras();
    }, []);

    const traerCarreras = () => {
        Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=carreras&action=list')
            .then(response => {
                console.log(response);
                setListaCarreras(response.data.data);
            });
    }
return(
    <Form.Control as="select" {...props}>
        <option value='0'>Elija una carrera</option>
        {
            listaCarreras.map(item =>
                <option key={"item-" + item.id} value={item.id} > {item.nombre}  </option>
            )
        }      
    </Form.Control> 
    )
}
export const CarreraDisplayColumn = (props) => {
    const [nombre, setNombre] = useState('');
    useEffect(() => {
        traerCarreras(props.value);
    }, [])
    const traerCarreras = (id) => {
        Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=carreras&action=detail&id='+id)
            .then(response => {
                if (response.data.res === "success") {
                    const carrera = response.data.data;
                    setNombre(carrera.nombre);
                }
            }
            )
    }

    return (
        <td> {nombre} </td>
    )

}