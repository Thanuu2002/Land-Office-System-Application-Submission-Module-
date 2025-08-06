<?php
// backend/get_staff.php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Connect to database
$host = 'localhost';
$user = 'root'; // Update if needed
$pass = 'root'; // Update if needed
$dbname = 'land_office';

$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Query to get staff members only
$sql = "SELECT id, email, created_at FROM users WHERE role = 'staff'";
$result = $conn->query($sql);

$staff = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $staff[] = $row;
    }
}

echo json_encode($staff);

$conn->close();
?>
