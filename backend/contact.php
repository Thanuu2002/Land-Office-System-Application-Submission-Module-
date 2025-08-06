<?php
/<?php
// Database configuration
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// If it is an OPTIONS request, just return OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$dbname = 'land_office';
$username = 'root';
$password = 'root';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['message'])) {
    $email = $data['email'];
    $message = $data['message'];

    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare("INSERT INTO contact_messages (email, message) VALUES (:email, :message)");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':message', $message);
        $stmt->execute();

        echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing required fields."]);
}
?>
