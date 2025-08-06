<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "land_office";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed']));
}

$sql = "SELECT id, name, deed_number, status FROM deeds";
$result = $conn->query($sql);

$applications = [];
while ($row = $result->fetch_assoc()) {
    $applications[] = $row;
}

echo json_encode($applications);

$conn->close();
?>
