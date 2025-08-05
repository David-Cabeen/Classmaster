<?php
$servidor = "localhost";
$usuario = "root";
$clave = ""; // cámbiala si tienes contraseña en tu MySQL
$bd = "classmaster";

$conn = new mysqli($servidor, $usuario, $clave, $bd);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
