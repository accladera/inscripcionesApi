<?php


namespace App\controllers;


use App\models\bll\InscripcionBLL;

class InscripcionController
{
    public static function index()
    {
        $inscripcionBLL = new InscripcionBLL();
        $listaInscripciones = $inscripcionBLL->selectAll();
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $listaInscripciones
        ));
    }

    public static function detail($request)
    {
        $inscripcionBLL = new InscripcionBLL();
        $id = $request['id'];
        $objInscripcion = $inscripcionBLL->select($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $objInscripcion
        ));

    }

    public static function store($request)
    {
        $inscripcionBLL = new InscripcionBLL();
        $usuarioId = $request['usuarioId'];
        $carreraId = $request['carreraId'];
        $materiaId = $request['materiaId'];
        $lastId = $inscripcionBLL->insert($usuarioId, $carreraId, $materiaId);
        $objInscripcion = $inscripcionBLL->select($lastId);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $objInscripcion
        ));

    }

    public static function update($id, $request)
    {
        $inscripcionBLL = new InscripcionBLL();
        $usuarioId = $request['usuarioId'];
        $carreraId = $request['carreraId'];
        $materiaId = $request['materiaId'];
        $inscripcionBLL->update($usuarioId, $carreraId, $materiaId, $id);
        $objInscripcion = $inscripcionBLL->select($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $objInscripcion
        ));

    }

    public static function delete($request)
    {
        $inscripcionBLL = new InscripcionBLL();
        $id = $request['id'];
        $inscripcionBLL->delete($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success"
        ));
    }

    public static function search($request)
    {
        $inscripcionBLL = new InscripcionBLL();
        $q = $request['q'];
        $listaInscripciones = $inscripcionBLL->selectSearch($q);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $listaInscripciones
        ));
    }

    public static function searchByUser($request)
    {
        $inscripcionBLL = new InscripcionBLL();
        $q = $request['q'];
        $listaInscripciones = $inscripcionBLL->selectSearchByUser($q);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $listaInscripciones
        ));
    }

    public static function searchAdmin($request)
    {
        $inscripcionBLL = new InscripcionBLL();
        $q = $request['q'];
        $listaInscripciones = $inscripcionBLL->selectSearchAdmin($q);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $listaInscripciones
        ));
    }

    public static function searchUser($request)
    {
        $inscripcionBLL = new InscripcionBLL();
        $usuarioId = $request['usuarioId'];
        $q = $request['q'];
        $listaInscripciones = $inscripcionBLL->selectSearchUser($usuarioId, $q);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $listaInscripciones
        ));
    }

    public static function selectTotal($request)
    {
        $inscripcionBLL = new InscripcionBLL();
        $usuarioId = $request['usuarioId'];
        $total = $inscripcionBLL->selectTotalPrice($usuarioId);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $total
        ));
    }

}