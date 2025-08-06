<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Database connection details
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "land_office";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed']));
}

// SQL to fetch official paper applications
$sql = "SELECT id, applicant_name, land_name, status FROM official_paper_applications";
$result = $conn->query($sql);

// Collect data
$applications = [];
while ($row = $result->fetch_assoc()) {
    $applications[] = $row;
}

// Return JSON response
echo json_encode($applications);

// Close connection
$conn->close();
?>
