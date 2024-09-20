<?php
$conn = new mysqli('localhost', 'root', '', 'examen');

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$sql = "SELECT m.fecha AS fecha,
               pr.nombrep AS articulo,
               m.cant AS cantidad,
               pr.precio AS precio
        FROM usuarios u 
        JOIN movimientos m ON u.id_u = m.id_u
        JOIN prendas pr ON m.id_p = pr.id_p
        WHERE u.tipo = 'cliente'";

$result = $conn->query($sql);

$datos = array();

while ($row = $result->fetch_assoc()) {
    $datos[] = $row;
}

header('Content-Type: application/json');
echo json_encode($datos);

$conn->close();
?>
