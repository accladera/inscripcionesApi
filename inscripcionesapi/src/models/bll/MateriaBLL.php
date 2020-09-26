<?php


namespace App\models\bll;


use App\models\conn\Connection;
use App\models\dto\Materia;
use PDO;

class MateriaBLL
{
    public function insert($nombre, $semestre, $precio, $carreraId)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_materia_insert(:p_nombre, :p_semestre , :p_precio ,:p_carreraId)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_nombre" => $nombre,
            ":p_semestre" => $semestre,
            ":p_precio" => $precio,
            ":p_carreraId" => $carreraId
        ));
        if ($res->rowCount() == 0) {
            return -1;
        }
        $row = $res->fetch(PDO::FETCH_ASSOC);
        return $row["lastId"];
    }

    public function update($nombre, $semestre, $precio, $carreraId, $id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_materia_update(:p_nombre, :p_semestre ,:p_precio,:p_carreraId,:p_id)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_nombre" => $nombre,
            ":p_semestre" => $semestre,
            ":p_precio" => $precio,
            ":p_carreraId" => $carreraId,
            ":p_id" => $id
        ));
    }

    public function delete($id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_materia_delete(:p_id)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_id" => $id
        ));
    }

    public function select($id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_materia_select(:p_id)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_id" => $id
        ));
        if ($res->rowCount() == 0) {
            return null;
        }
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $objItem = $this->rowToDto($row);
        return $objItem;
    }

    public function selectAll()
    {
        $objConnection = new Connection();
        $sql = "CALL sp_materia_selectAll()";
        $res = $objConnection->query($sql);
        $lista = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
            $objItem = $this->rowToDto($row);
            $lista[] = $objItem;
        }
        return $lista;
    }

    public function selectSearch($query)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_materia_search(:p_busqueda)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_busqueda" => $query
        ));
        $lista = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
            $objItem = $this->rowToDto($row);
            $lista[] = $objItem;
        }
        return $lista;
    }

    public function selectAllUser($usuarioId)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_materia_selectAllUser(:p_usuarioId)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_usuarioId" => $usuarioId
        ));
        $lista = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
            $objItem = $this->rowToDto($row);
            $lista[] = $objItem;
        }
        return $lista;
    }


    private function rowToDto($row)
    {
        $objMateria = new Materia();
        $objMateria->setId($row["id"]);
        $objMateria->setNombre($row["nombre"]);
        $objMateria->setSemestre($row["semestre"]);
        $objMateria->setPrecio($row["precio"]);
        $objMateria->setCarreraId($row["carreraId"]);
        return $objMateria;
    }

}