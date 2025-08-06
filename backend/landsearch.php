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
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

$personType = $data['personType'];
$reason = $data['reason'];
$village = $data['village'];
$landName = $data['landName'];
$extent = $data['extent'];
$korale = $data['korale'];
$pattu = $data['pattu'];
$gnDivision = $data['gnDivision'];
$dsDivision = $data['dsDivision'];
$volNo = $data['volNo'];
$folioNo = $data['folioNo'];

// Prepare and execute the SQL query
$query = "INSERT INTO land_search_applications (person_type, reason, village, land_name, extent, korale, pattu, gn_division, ds_division, vol_no, folio_no)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($query);
$stmt->bind_param("sssssssssss", $personType, $reason, $village, $landName, $extent, $korale, $pattu, $gnDivision, $dsDivision, $volNo, $folioNo);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Land search application submitted successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error submitting the application: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
