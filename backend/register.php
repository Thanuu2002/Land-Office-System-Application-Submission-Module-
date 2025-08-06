<?php
header('Content-Type: application/json'); // Important to send JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// If it is an OPTIONS request, just return OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'db.php';

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit();
}

// Extract and sanitize fields
$email = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';
$confirmPassword = isset($data['confirmPassword']) ? trim($data['confirmPassword']) : '';
$role = isset($data['role']) ? trim($data['role']) : '';

if (empty($email) || empty($password) || empty($confirmPassword) || empty($role)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit();
}

// Password match check
if ($password !== $confirmPassword) {
    echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
    exit();
}

// Email exists check
$query = "SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered.']);
    $stmt->close();
    exit();
}
$stmt->close();

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert new user
$insertQuery = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
$stmt = $conn->prepare($insertQuery);
$stmt->bind_param("sss", $email, $hashedPassword, $role);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Registration successful!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed. ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
