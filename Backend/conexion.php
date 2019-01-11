<?php

final class Conexion {

    private $servidor;

    private $usuario;

    private $password;

    private $base_datos;

    private $link;

    private static $instancia = null;

    private function __construct($svr,$usr,$pass,$db) {	
        $this->servidor    = $svr;
        $this->usuario     = $usr;
        $this->password    = $pass;
        $this->base_datos  = $db;

        try {
            $this->link = new PDO(
                'mysql:host='.$this->servidor.'; dbname='.$this->base_datos
                , $this->usuario
                , $this->password);

            $this->link->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $this->link->exec("SET CHARACTER SET  utf8");

        } catch(Exception $e) {
            die ('error Conexion line: '.$e->getLine());
        }
    }

    public static final function obtenerInstancia($svr,$usr,$pass,$db) {
        
        try {
            if (self::$instancia == null) {
                $instancia = new Conexion($svr,$usr,$pass,$db); 
            }
            
        } catch (\Exception $ex) {
            die("No se a podido instanciar.");
            
        } finally {
            return $instancia;
        }
    }

    public final function obtenerConexion() {
        return $this->link;
    }
    
    public final function desconectar() {
        self::$instancia = null;
    }
    

    public function query($statement){
        return $this->link->query($statement);
    }

    public final function  exec($statement) {
        return $this->link->exec($statement);
    }

    public final function prepare($resultset){
        return $this->link->prepare($resultset);
    }

    }
?>