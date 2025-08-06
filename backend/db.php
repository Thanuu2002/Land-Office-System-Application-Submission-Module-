<?php
// db.php

$servername = "localhost";
$username = "root";     // Your MySQL username
$password = "root";         // Your MySQL password (empty if no password)
$dbname = "land_office"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed.']));
}
?>
