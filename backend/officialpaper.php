<?php
// database connection
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

$host = "localhost";
$dbname = "land_office";
$username = "root";
$password = "root";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

$applicantName = $data['applicantName'];
$applicantAddress = $data['applicantAddress'];
$nationalId = $data['nationalId'];
$district = $data['district'];
$village = $data['village'];
$landName = $data['landName'];
$extent = $data['extent'];
$reason = $data['reason'];
$division = $data['division'];
$volume = $data['volume'];
$folio = $data['folio'];

// Prepare and execute the SQL query
$query = "INSERT INTO official_paper_applications 
(applicant_name, applicant_address, national_id, district, village, land_name, extent, reason, division, volume, folio) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($query);
$stmt->bind_param("sssssssssss", $applicantName, $applicantAddress, $nationalId, $district, $village, $landName, $extent, $reason, $division, $volume, $folio);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Official paper application submitted successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error submitting the application: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
