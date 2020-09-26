<?php


namespace App\models\bll;


use App\models\conn\Connection;
use App\models\dto\Inscripcion;
use PDO;

class InscripcionBLL
{
    public function insert($usuarioId, $carreraId, $materiaId)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_inscripcion_insert(:p_usuarioId, :p_carreraId, :p_materiaId)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_usuarioId" => $usuarioId,
            ":p_carreraId" => $carreraId,
            ":p_materiaId" => $materiaId
        ));
        if ($res->rowCount() == 0) {
            return -1;
        }
        $row = $res->fetch(PDO::FETCH_ASSOC);
        return $row["lastId"];
    }

    public function update($usuarioId, $carreraId, $materiaId, $id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_inscripcion_update(:p_usuarioId, :p_carreraId, :p_materiaId, :p_id)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_usuarioId" => $usuarioId,
            ":p_carreraId" => $carreraId,
            ":p_materiaId" => $materiaId,
            ":p_id" => $id
        ));
    }

    public function delete($id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_inscripcion_delete(:p_id)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_id" => $id
        ));
    }

    public function select($id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_inscripcion_select(:p_id)";
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
        $sql = "CALL sp_inscripcion_selectAll()";
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
        $sql = "CALL sp_inscripcion_search(:p_busqueda)";
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

    public function selectSearchByUser($query)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_inscripcion_searchByUser(:p_usuarioId)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_usuarioId" => $query
        ));
        $lista = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
            $objItem = $this->rowToDto($row);
            $lista[] = $objItem;
        }
        return $lista;
    }

    public function selectSearchAdmin($query)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_inscripcion_searchAdmin(:p_busqueda)";
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

    public function selectSearchUser($usuarioId, $query)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_inscripcion_searchUser(:p_busqueda,:p_usuarioId)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_busqueda" => $query,
            ":p_usuarioId" => $usuarioId
        ));
        $lista = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
            $objItem = $this->rowToDto($row);
            $lista[] = $objItem;
        }
        return $lista;
    }

    public function selectTotalPrice($usuarioId)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_inscripcion_selectTotal(:p_usuarioId)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_usuarioId" => $usuarioId
        ));
        if ($res->rowCount() == 0) {
            return null;
        }
        $row = $res->fetch(PDO::FETCH_ASSOC);
        return $row['total'];
    }


    private function rowToDto($row)
    {
        $objInscripcion = new Inscripcion();
        $objInscripcion->setId($row["id"]);
        $objInscripcion->setUsuarioId($row["usuarioId"]);
        $objInscripcion->setCarreraId($row["carreraId"]);
        $objInscripcion->setMateriaId($row["materiaId"]);
        return $objInscripcion;
    }

}