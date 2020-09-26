import React from 'react';
import { Form  } from 'react-bootstrap';
export const MyLabel = (props)=>{
    return (
    <Form.Label>{props.text}</Form.Label>     
    )
}