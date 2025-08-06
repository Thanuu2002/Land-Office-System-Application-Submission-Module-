<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "land_office";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$status = $data['status'];
$type = $data['type']; // e.g., 'deed' or 'landsearch'

$table = '';
switch ($type) {
    case 'deed':
        $table = 'deeds';
        break;
    case 'landsearch':
        $table = 'land_search_applications';
        break;
    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid type']);
        exit;
}

$sql = "UPDATE $table SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Status updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Update failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
