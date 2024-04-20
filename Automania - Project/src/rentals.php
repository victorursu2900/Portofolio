<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract and sanitize the input data
    $selectedCar = isset($_COOKIE['selectedCar']) ? $_COOKIE['selectedCar'] : 'Unknown';
    $location = htmlspecialchars($_POST['location']);
    $pickupDate = htmlspecialchars($_POST['pick-up-date']);
    $returnDate = htmlspecialchars($_POST['return-date']);
    $totalPayment = htmlspecialchars($_POST['total-payment']);

    // Rental data array
    $rentalData = array(
        'selectedCar' => $selectedCar,
        'location' => $location,
        'pickupDate' => $pickupDate,
        'returnDate' => $returnDate,
        'totalPayment' => $totalPayment
    );

    $filename = 'rentals.json';

    // Check if file exists and is readable
    if (file_exists($filename) && is_readable($filename)) {
        // Read current data from file
        $current_data = file_get_contents($filename);
        $array_data = json_decode($current_data, true);
        $array_data[] = $rentalData;
    } else {
        // Create new array for the rental data
        $array_data = array($rentalData);
    }

    // Convert updated array to JSON
    $final_data = json_encode($array_data, JSON_PRETTY_PRINT);

    // Write to file
    if (file_put_contents($filename, $final_data)) {
        // Redirect to success page if write is successful
        header("Location: Succes.html");
        exit();
    } else {
        echo "Error in writing to the rentals.json file.";
    }
} else {
    // If the form is not submitted, redirect back to the form
    header("Location: info.html");
    exit();
}

?>
