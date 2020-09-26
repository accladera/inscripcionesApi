<?php


namespace App\controllers;


use App\models\bll\CarreraBLL;

class CarreraController
{
    public static function index()
    {
        $carreraBLL = new CarreraBLL();
        $listaCarreras = $carreraBLL->selectAll();
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $listaCarreras
        ));
    }

    public static function detail($request)
    {
        $carreraBLL = new CarreraBLL();
        $id = $request['id'];
        $objCarrera = $carreraBLL->select($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $objCarrera
        ));
    }

    public static function store($request)
    {
        $carreraBLL = new CarreraBLL();
        $nombre = $request['nombre'];
        $lastId = $carreraBLL->insert($nombre);
        $objCarrera = $carreraBLL->select($lastId);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $objCarrera
        ));
    }

    public static function update($id, $request)
    {
        $carreraBLL = new CarreraBLL();
        $nombre = $request['nombre'];
        $carreraBLL->update($nombre, $id);
        $objCarrera = $carreraBLL->select($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $objCarrera
        ));
    }

    public static function delete($request)
    {
        $carreraBLL = new CarreraBLL();
        $id = $request['id'];
        $carreraBLL->delete($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success"
        ));
    }

    public static function search($request)
    {
        $carreraBLL = new CarreraBLL();
        $q = $request['q'];
        $listaCarreras = $carreraBLL->selectSearch($q);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $listaCarreras
        ));
    }


}