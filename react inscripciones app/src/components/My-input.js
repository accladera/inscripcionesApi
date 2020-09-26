import React from 'react';
import { Form } from 'react-bootstrap';
export const MyInput = (props)=>
{
return(
     <Form.Control type='text' {...props} />
    )
}