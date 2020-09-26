<?php


namespace App\controllers;


use App\models\bll\UsuarioBLL;

class UsuarioController
{
    public static function index()
    {
        $usuarioBLL = new UsuarioBLL();
        $listaUsuarios = $usuarioBLL->selectAll();
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $listaUsuarios
        ));
    }

    public static function detail($request)
    {
        $usuarioBLL = new UsuarioBLL();
        $id = $request['id'];
        $objUsuario = $usuarioBLL->select($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $objUsuario
        ));
    }

    public static function store($request)
    {
        $usuarioBLL = new UsuarioBLL();
        $nombreCompleto = $request['nombreCompleto'];
        $email = $request['email'];
        $password = $request['password'];
        $tipoUsuario = $request['tipoUsuario'];
        $carreraId = $request['carreraId'];
        $lastId = $usuarioBLL->insert($nombreCompleto, $email, $password, $tipoUsuario, $carreraId);
        $objUsuario = $usuarioBLL->select($lastId);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $objUsuario
        ));
    }

    public static function update($id, $request)
    {
        $nombreCompleto = $request['nombreCompleto'];
        $email = $request['email'];
        $password = $request['password'];
        $tipoUsuario = $request['tipoUsuario'];
        $carreraId = $request['carreraId'];

        $usuarioBLL = new UsuarioBLL();
        $usuarioBLL->update($nombreCompleto, $email, $password, $tipoUsuario, $carreraId, $id);
        $objUsuario = $usuarioBLL->select($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $objUsuario
        ));
    }

    public static function delete($request)
    {
        $usuarioBLL = new UsuarioBLL();
        $id = $request['id'];
        $usuarioBLL->delete($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success"
        ));
    }

    public static function search($request)
    {
        $usuarioBLL = new UsuarioBLL();
        $q = $request['q'];
        $listaUsuarios = $usuarioBLL->selectSearch($q);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => "success",
            "data" => $listaUsuarios
        ));
    }

    public static function detailEmail($request)
    {
        $usuarioBLL = new UsuarioBLL();
        $email = $request['email'];
        $objUsuario = $usuarioBLL->selectByEmail($email);
        $res = ($objUsuario != null) ? 'success' : 'no success';
        header('Content-Type: application/json');
        echo json_encode(array(
            "res" => $res,
            "data" => $objUsuario
        ));
    }


}