<?php


namespace App\controllers;


use App\models\bll\MateriaBLL;

class MateriaController
{
    public static function index(){
        $materiaBLL = new MateriaBLL();
        $listaMaterias = $materiaBLL->selectAll();
        header('Content-Type: application/json');
        echo json_encode(array(
            "res"=>"succes",
            "data"=>$listaMaterias
        ));
    }
    public static function detail($request){
        $materiaBLL = new MateriaBLL();
        $id = $request['id'];
        $objMateria = $materiaBLL->select($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res"=>"success",
            "data"=> $objMateria
        ));
    }

    public static function store($request){
        $materiaBLL = new MateriaBLL();
        $nombre = $request['nombre'];
        $semestre =$request['semestre'];
        $precio = $request['precio'];
        $carreraId = $request['carreraId'];
        $lastId = $materiaBLL->insert($nombre,$semestre,$precio,$carreraId);
        $objMateria = $materiaBLL->select($lastId);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res"=>"success",
            "data"=> $objMateria
        ));

    }

    public static function update($id, $request){
        $materiaBLL = new MateriaBLL();
        $nombre = $request['nombre'];
        $semestre =$request['semestre'];
        $precio = $request['precio'];
        $carreraId = $request['carreraId'];
        $materiaBLL->update($nombre,$semestre,$precio,$carreraId,$id);
        $objMateria = $materiaBLL->select($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res"=>"success",
            "data"=> $objMateria
        ));

    }

    public static function delete($request){
        $materiaBLL = new MateriaBLL();
        $id = $request['id'];
        $materiaBLL->delete($id);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res"=>"success"
        ));
    }

    public static function search($request){
        $materiaBLL = new MateriaBLL();
        $q = $request['q'];
        $listaMaterias = $materiaBLL->selectSearch($q);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res"=>"success",
            "data"=> $listaMaterias
        ));
    }
    public static function selectAllUser($request){
        $materiaBLL = new MateriaBLL();
        $usuarioId= $request['usuarioId'];
        $listaMaterias = $materiaBLL->selectAllUser($usuarioId);
        header('Content-Type: application/json');
        echo json_encode(array(
            "res"=>"success",
            "data"=> $listaMaterias
        ));
    }




}