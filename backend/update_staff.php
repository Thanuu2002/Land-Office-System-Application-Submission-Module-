<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit();
}

$id = isset($data['id']) ? intval($data['id']) : 0;
$email = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';
$confirmPassword = isset($data['confirmPassword']) ? trim($data['confirmPassword']) : '';

if (!$id || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'ID and Email are required.']);
    exit();
}

if ($password !== '' || $confirmPassword !== '') {
    if ($password !== $confirmPassword) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
        exit();
    }
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit();
}

// Check if email already exists for another staff member
$stmt = $conn->prepare("SELECT id FROM staff WHERE email = ? AND id != ?");
$stmt->bind_param("si", $email, $id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already in use by another staff member.']);
    $stmt->close();
    exit();
}
$stmt->close();

if ($password !== '') {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE staff SET email = ?, password = ? WHERE id = ?");
    $stmt->bind_param("ssi", $email, $hashedPassword, $id);
} else {
    $stmt = $conn->prepare("UPDATE staff SET email = ? WHERE id = ?");
    $stmt->bind_param("si", $email, $id);
}

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Staff updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Update failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
