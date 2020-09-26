import React from 'react';
import { Form } from 'react-bootstrap';
export const MySubmit = (props)=>
{
return(
     <Form.Control className='btn btn-primary'  type="submit" value="Guardar"   {...props} />
    )
}