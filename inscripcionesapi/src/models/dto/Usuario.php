<?php

namespace App\models\dto;
use DateTime;

class Usuario
{
    public $id;
    public $nombreCompleto;
    public $email;
    public $password;
    public $tipoUsuario;
    public $carreraId;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getNombreCompleto()
    {
        return $this->nombreCompleto;
    }

    /**
     * @param mixed $nombreCompleto
     */
    public function setNombreCompleto($nombreCompleto)
    {
        $this->nombreCompleto = $nombreCompleto;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @return mixed
     */
    public function getTipoUsuario()
    {
        return $this->tipoUsuario;
    }

    /**
     * @param mixed $tipoUsuario
     */
    public function setTipoUsuario($tipoUsuario)
    {
        $this->tipoUsuario = $tipoUsuario;
    }

    /**
     * @return mixed
     */
    public function getCarreraId()
    {
        return $this->carreraId;
    }

    /**
     * @param mixed $carreraId
     */
    public function setCarreraId($carreraId)
    {
        $this->carreraId = $carreraId;
    }




}