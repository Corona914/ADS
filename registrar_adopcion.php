<?php
include 'conexion.php';

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$direccion = $_POST['direccion'];
$tipoVivienda = $_POST['tipoVivienda'];
$experiencia = $_POST['experiencia'];
$motivo = $_POST['motivo'];

// Generar una contraseña aleatoria (puedes cambiarla según tus necesidades)
$contraseña = bin2hex(random_bytes(8));

// Insertar en la tabla usuarios
$sql = "INSERT INTO usuarios (nombre, email, telefono, direccion, contraseña, tipo_vivienda, experiencia_mascotas) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $nombre, $email, $telefono, $direccion, $contraseña, $tipoVivienda, $experiencia);

if ($stmt->execute()) {
    $id_usuario = $stmt->insert_id;
    // Aquí podrías insertar en solicitudes_adopcion si tienes el id_mascota
    // Por ahora solo devolvemos éxito
    echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al registrar usuario: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?> 