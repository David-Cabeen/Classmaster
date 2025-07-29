<?php
header('Content-Type: application/json'); // Indica que la respuesta será en formato JSON

// Valores de conexión a la base de datos
$host = 'DB_HOST';
$db   = 'DB_NAME';
$user = 'DB_USER';
$pass = 'DB_PASS';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos.']);
    exit;
}

$id = $_POST['id'] ?? '';
$password = $_POST['password'] ?? '';

// Verifica que ambos campos estén presentes
if (!$id || !$password) {
    echo json_encode(['success' => false, 'error' => 'ID y contraseña requeridos.']);
    exit;
}

// Consulta para buscar el usuario por ID
$stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->store_result();

// Si no se encuentra el usuario, retorna error
if ($stmt->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'ID de usuario no encontrado.']);
    exit;
}

// Obtiene el hash de la contraseña almacenada
$stmt->bind_result($hashed_password);
$stmt->fetch();

// Verifica si la contraseña ingresada es correcta
if (password_verify($password, $hashed_password)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Contraseña incorrecta.']);
}

// Cierra la consulta y la conexión
$stmt->close();
$conn->close();
?>