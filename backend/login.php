<?php
// backend/login.php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

// Connect to database
$host = 'localhost';
$user = 'root'; // Change if needed
$pass = 'root'; // Change if needed
$dbname = 'land_office';

$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Get posted data
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];
$role = $data['role'];

// Check if user exists
$sql = "SELECT * FROM users WHERE email = ? AND role = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $email, $role);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    // Verify password
    if (password_verify($password, $user['password'])) {
        $response = [
            'success' => true,
            'role' => $user['role'],
            'email' => $user['email']
        ];
        echo json_encode($response);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No user found with that email and role.']);
}

$stmt->close();
$conn->close();
?>
