<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract and sanitize input data
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']); 
    $confirm_password = htmlspecialchars($_POST['confirm_password']);

    // Simple validation
    if ($password === $confirm_password) {
        // Prepare data for JSON
        $userData = array(
            'username' => $username,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT) // Hash the password
        );

        $filename = 'accounts.json';

        // Check if file exists and is readable
        if (file_exists($filename) && is_readable($filename)) {
            // Read current data from file
            $current_data = file_get_contents($filename);
            $array_data = json_decode($current_data, true);
            $array_data[] = $userData;
        } else {
            // Create new array for the user data
            $array_data = array($userData);
        }

        // Convert updated array to JSON
        $final_data = json_encode($array_data, JSON_PRETTY_PRINT);

        // Write to file
        if (file_put_contents($filename, $final_data)) {
            // Redirect to success page if write is successful
            header("Location: register_succes.html");
            exit();
        } else {
            echo "Error in writing to the file.";
        }
    } else {
        echo "Passwords do not match.";
    }
} else {
    // Redirect to the form if the request method is not POST
    header("Location: reg-form.html");
    exit();
}

?>
