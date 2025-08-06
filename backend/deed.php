<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "land_office";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Decode JSON from the request body
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input.']);
    exit;
}

// Assign values
$name = $data['name'];
$address = $data['address'];
$nid = $data['nid'];
$deedNumber = $data['deedNumber'];
$attestationDate = $data['attestationDate'];
$notaryName = $data['notaryName'];
$notaryAddress = $data['notaryAddress'];
$otherDocument = isset($data['otherDocument']) ? $data['otherDocument'] : '';
$reason = $data['reason'];

// Insert query
$sql = "INSERT INTO deeds (name, address, nid, deed_number, attestation_date, notary_name, notary_address, other_document, reason)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssss", $name, $address, $nid, $deedNumber, $attestationDate, $notaryName, $notaryAddress, $otherDocument, $reason);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Application submitted successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
