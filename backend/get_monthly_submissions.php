<?php
header('Content-Type: application/json');

// Database config
$host = 'localhost';
$db = 'land_office';
$user = 'root';
$pass = 'root';
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => "Database connection failed."]);
  exit();
}

// Combine all submission_date values across 3 tables
$query = "
  SELECT DATE_FORMAT(submission_date, '%Y-%m') AS month, COUNT(*) AS count
  FROM (
    SELECT submission_date FROM deeds
    UNION ALL
    SELECT submission_date FROM land_search_applications
    UNION ALL
    SELECT submission_date FROM official_paper_applications
  ) AS combined
  GROUP BY month
  ORDER BY month;
";

$result = $conn->query($query);

$finalData = [];

if ($result) {
  while ($row = $result->fetch_assoc()) {
    $finalData[] = [
      'month' => $row['month'],
      'count' => (int)$row['count']
    ];
  }
  echo json_encode($finalData);
} else {
  echo json_encode(["status" => "error", "message" => "Query failed."]);
}

$conn->close();
?>
