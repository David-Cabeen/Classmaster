<?php
include 'conexion.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id']; // ← Este debe coincidir con name="id" del input
    $email = $_POST['email'];
    $contraseña = password_hash($_POST['contraseña'], PASSWORD_DEFAULT); // Usamos el mismo nombre que en la tabla

    $sql = "INSERT INTO registro_papas (id, email, contraseña) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql); 
    
    if ($stmt) {
        $stmt->bind_param("iss", $id, $email, $contraseña);

        if ($stmt->execute()) {
            echo "✅ Registro exitoso";
        } else {
            echo "❌ Error al ejecutar: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "❌ Error al preparar: " . $conn->error;
    }

    $conn->close();
}
?>

