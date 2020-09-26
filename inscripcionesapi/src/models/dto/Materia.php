<?php


namespace App\models\dto;


class Materia
{
    public $id;
    public $nombre;
    public $semestre;
    public $precio;
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
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * @return mixed
     */
    public function getSemestre()
    {
        return $this->semestre;
    }

    /**
     * @param mixed $semestre
     */
    public function setSemestre($semestre)
    {
        $this->semestre = $semestre;
    }

    /**
     * @return mixed
     */
    public function getPrecio()
    {
        return $this->precio;
    }

    /**
     * @param mixed $precio
     */
    public function setPrecio($precio)
    {
        $this->precio = $precio;
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