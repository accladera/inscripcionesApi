<?php

use App\controllers\CarreraController;
use App\controllers\InscripcionController;
use App\controllers\MateriaController;
use App\controllers\UsuarioController;

include "vendor/autoload.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Method: GET, POST, PUT, DELETE');


$controller = "usuarios";

if (isset($_REQUEST["controller"])) {
    $controller = $_REQUEST['controller'];
}

$action = "list";
if (isset($_REQUEST['action'])) {
    $action = $_REQUEST["action"];
}

switch ($controller) {
    case "usuarios":
        switch ($action) {
            case "list":
                UsuarioController::index();
                break;
            case "detail":
                UsuarioController::detail($_GET);
                break;
            case "store":
                $request = json_decode(file_get_contents('php://input'), true);
                UsuarioController::store($request);
                break;
            case "update":
                $request = json_decode(file_get_contents('php://input'), true);
                UsuarioController::update($_GET['id'], $request);
                break;
            case "delete":
                $request = json_decode(file_get_contents('php://input'), true);
                UsuarioController::delete($request);
                break;
            case "search":
                UsuarioController::search($_GET);
                break;
            case "detailEmail":
                UsuarioController::detailEmail($_GET);
                break;

        }
        break;

    case "materias":
        switch ($action) {
            case "list":
                MateriaController::index();
                break;
            case "detail":
                MateriaController::detail($_GET);
                break;
            case "store":
                $request = json_decode(file_get_contents('php://input'), true);
                MateriaController::store($request);
                break;
            case "update":
                $request = json_decode(file_get_contents('php://input'), true);
                MateriaController::update($_GET['id'], $request);
                break;
            case "delete":
                $request = json_decode(file_get_contents('php://input'), true);
                MateriaController::delete($request);
                break;
            case "search":
                MateriaController::search($_GET);
                break;
            case "listUser":
                MateriaController::selectAllUser($_GET);
                break;
        }
        break;

    case "inscripciones":
        switch ($action) {
            case "list":
                InscripcionController::index();
                break;
            case "detail":
                InscripcionController::detail($_GET);
                break;
            case "store":
                $request = json_decode(file_get_contents('php://input'), true);
                InscripcionController::store($request);
                break;
            case "update":
                $request = json_decode(file_get_contents('php://input'), true);
                InscripcionController::update($_GET['id'], $request);
                break;
            case "delete":
                $request = json_decode(file_get_contents('php://input'), true);
                InscripcionController::delete($request);
                break;
            case "search":
                InscripcionController::search($_GET);
                break;
            case "searchByUser":
                InscripcionController::searchByUser($_GET);
                break;
            case "searchAdmin":
                InscripcionController::searchAdmin($_GET);
                break;
            case "searchUser":
                InscripcionController::searchUser($_GET);
                break;
            case "selectTotal":
                InscripcionController::selectTotal($_GET);
                break;
        }
        break;

    case "carreras":
        switch ($action) {
            case "list":
                CarreraController::index();
                break;
            case "detail":
                CarreraController::detail($_GET);
                break;
            case "store":
                $request = json_decode(file_get_contents('php://input'), true);
                CarreraController::store($request);
                break;
            case "update":
                $request = json_decode(file_get_contents('php://input'), true);
                CarreraController::update($_GET['id'], $request);
                break;
            case "delete":
                $request = json_decode(file_get_contents('php://input'), true);
                CarreraController::delete($request);
                break;
            case "search":
                CarreraController::search($_GET);
                break;
        }
        break;
}