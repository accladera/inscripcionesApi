import Axios from 'axios';
import React, { useEffect, useState } from 'react';

export const UsuarioDisplayColumn = (props) => {
    const [nombre, setNombre] = useState('');
    useEffect(() => {
        traerUsuarios(props.value);
    }, [])
    const traerUsuarios = (id) => {
        Axios.get('http://localhost:8080/inscripcionesapi/index.php?controller=usuarios&action=detail&id='+id)
            .then(response => {
                if (response.data.res === "success") {
                    console.log(response.data.data);
                    const usuario = response.data.data;
                    setNombre(usuario.nombreCompleto);
                }
                else{
                    console.log(response);
                }
            }
            )
    }
    return (
        <td> {nombre} </td>
    )

}