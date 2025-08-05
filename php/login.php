<?php
session_start();
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_estudiante = $_POST['id_estudiante'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM usuarios WHERE id_estudiante = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_estudiante);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();

        if (password_verify($password, $usuario['password'])) {
            $_SESSION['usuario'] = $usuario['id_estudiante'];
            header("Location: bienvenido.php");
            exit();
        } else {
            echo "❌ Contraseña incorrecta";
        }
    } else {
        echo "❌ Usuario no encontrado";
    }

    $stmt->close();
    $conn->close();
}
?>
