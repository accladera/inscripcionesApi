<?php


namespace App\models\bll;

use App\models\conn\Connection;
use App\models\dto\Carrera;
use PDO;

class CarreraBLL
{
    public function insert($nombre)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_carrera_insert(:p_nombre)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_nombre" => $nombre
        ));
        if ($res->rowCount() == 0) {
            return -1;
        }
        $row = $res->fetch(PDO::FETCH_ASSOC);
        return $row["lastId"];
    }

    public function update($nombre, $id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_carrera_update(:p_nombre,:p_id)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_nombre" => $nombre,
            ":p_id" => $id
        ));
    }

    public function delete($id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_carrera_delete(:p_id)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_id" => $id
        ));
    }

    public function select($id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_carrera_select(:p_id)";
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
        $sql = "CALL sp_carrera_selectAll()";
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
        $sql = "CALL sp_carrera_search(:p_busqueda)";
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

    private function rowToDto($row)
    {
        $objCarrera = new Carrera();
        $objCarrera->setId($row["id"]);
        $objCarrera->setNombre($row["nombre"]);
        return $objCarrera;
    }

}