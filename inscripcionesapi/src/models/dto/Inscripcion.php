<?php


namespace App\models\dto;


class Inscripcion
{
    public $id;
    public $usuarioId;
    public $carreraId;
    public $materiaId;

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
    public function getUsuarioId()
    {
        return $this->usuarioId;
    }

    /**
     * @param mixed $usuarioId
     */
    public function setUsuarioId($usuarioId)
    {
        $this->usuarioId = $usuarioId;
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

    /**
     * @return mixed
     */
    public function getMateriaId()
    {
        return $this->materiaId;
    }

    /**
     * @param mixed $materiaId
     */
    public function setMateriaId($materiaId)
    {
        $this->materiaId = $materiaId;
    }



}