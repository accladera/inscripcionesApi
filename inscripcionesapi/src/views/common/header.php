<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inicio</title>
    <link rel="stylesheet" href="./vendor/twbs/bootstrap/dist/css/bootstrap.css" >
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="index.php">Ejemplo WEB</a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Personas
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="index.php?controller=personas&action=list">Lista de personas</a>
                    <a class="dropdown-item" href="index.php?controller=personas&action=create">Insertar personas</a>
                </div>
            </li>
        </ul>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Mascotas
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="index.php?controller=mascotas&action=list">Lista de mascotas</a>
                    <a class="dropdown-item" href="index.php?controller=mascotas&action=create">Insertar mascotas</a>
                </div>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" method="get" action="index.php?controller=personas&action=search">
            <input  type="hidden" value="search" name="action" >
            <input  type="hidden" value="personas" name="controller" >

            <input  name="q" class="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="Search">

            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </form>
    </div>
</nav>
