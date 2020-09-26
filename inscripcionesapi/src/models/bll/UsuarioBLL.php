<?php


namespace App\models\bll;


use App\models\conn\Connection;
use App\models\dto\Usuario;
use PDO;

class UsuarioBLL
{
    public function insert($nombreCompleto, $email, $password, $tipoUsuario, $carreraId)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_usuario_insert(:p_nombreCompleto,:p_email,:p_password,:p_tipoUsuario,:p_carreraId)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_nombreCompleto" => $nombreCompleto,
            ":p_email" => $email,
            ":p_password" => $password,
            ":p_tipoUsuario" => $tipoUsuario,
            ":p_carreraId" => $carreraId
        ));
        if ($res->rowCount() == 0) {
            return -1;
        }
        $row = $res->fetch(PDO::FETCH_ASSOC);
        return $row["lastId"];
    }

    public function update($nombreCompleto, $email, $password, $tipoUsuario, $carreraId, $id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_usuario_update(:p_nombreCompleto,:p_email,:p_password, :p_tipoUsuario,:p_carreraId, :p_id)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_nombreCompleto" => $nombreCompleto,
            ":p_email" => $email,
            ":p_password" => $password,
            ":p_tipoUsuario" => $tipoUsuario,
            ":p_carreraId" => $carreraId,
            ":p_id" => $id
        ));
    }

    public function delete($id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_usuario_delete(:p_id)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_id" => $id
        ));
    }

    public function select($id)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_usuario_select(:p_id)";
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

    public function selectByEmail($email)
    {
        $objConnection = new Connection();
        $sql = "CALL sp_usuario_searchByEmail(:p_email)";
        $res = $objConnection->queryWithParams($sql, array(
            ":p_email" => $email
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
        $sql = "CALL sp_usuario_selectAll()";
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
        $sql = "CALL sp_usuario_search(:p_busqueda)";
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
        $objUsuario = new Usuario();
        $objUsuario->setId($row["id"]);
        $objUsuario->setNombreCompleto($row["nombreCompleto"]);
        $objUsuario->setEmail($row["email"]);
        $objUsuario->setPassword($row["password"]);
        $objUsuario->setTipoUsuario($row["tipoUsuario"]);
        $objUsuario->setCarreraId($row["carreraId"]);
        return $objUsuario;
    }

}