<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
$host = "localhost";
$username = "root";
$password = "root";
$database = "land_office";

$conn = new mysqli($host, $username, $password, $database);

// Check DB connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// Get POST data
$user_id = $_POST['user_id'] ?? '';
$card_number = $_POST['card_number'] ?? '';
$card_name = $_POST['card_name'] ?? '';
$expiry_date = $_POST['expiry_date'] ?? '';
$cvv = $_POST['cvv'] ?? '';
$amount = $_POST['amount'] ?? '';

// Basic validation
if (empty($user_id) || empty($card_number) || empty($card_name) || empty($expiry_date) || empty($cvv) || empty($amount)) {
    echo json_encode(["status" => "error", "message" => "Please fill in all required fields."]);
    exit();
}

// Simulate payment process (in production, integrate real gateway like PayHere)
$payment_status = "Completed";

// Insert payment record into the database
$stmt = $conn->prepare("INSERT INTO payments (user_id, card_number, card_name, expiry_date, cvv, amount, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("issssds", $user_id, $card_number, $card_name, $expiry_date, $cvv, $amount, $payment_status);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Payment recorded successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to record payment."]);
}

$stmt->close();
$conn->close();
?>




