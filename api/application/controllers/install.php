<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class install extends CI_Controller {
	public function __construct() {
        parent::__construct();

        $this->load->database();

        header("Access-Control-Allow-Origin: *");
        header('Content-type: application/json');
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, X_FILENAME");
	}

	public function index() {
		// Name of the file
		$filename = '../walthams_maps.sql';
		// MySQL host
		$mysql_host = 'localhost';
		// MySQL username
		$mysql_username = 'root';
		// MySQL password
		$mysql_password = '';
		// Database name
		$mysql_database = 'walthams_maps';

		// Connect to MySQL server
		mysql_connect($mysql_host, $mysql_username, $mysql_password) or die('Error connecting to MySQL server: ' . mysql_error());
		// Select database
		mysql_select_db($mysql_database) or die('Error selecting MySQL database: ' . mysql_error());

		// Temporary variable, used to store current query
		$templine = '';
		// Read in entire file
		$lines = file($filename);
		// Loop through each line
		
		foreach ($lines as $line) {
			// Skip it if it's a comment
			if (substr($line, 0, 2) == '--' || $line == '')
			    continue;

			// Add this line to the current segment
			$templine .= $line;
		
			// If it has a semicolon at the end, it's the end of the query
			if (substr(trim($line), -1, 1) == ';') {
			    // Perform the query
			    mysql_query($templine) or print('Error performing query \'<strong>' . $templine . '\': ' . mysql_error() . '<br /><br />');
			    // Reset temp variable to empty
			    $templine = '';
			}
		}
		 echo "Tables imported successfully";
	}

	public function location() {
        $submissionData = $this->input->post();

        if (! $submissionData) {
            $response['status'] = 'error';
            $response['code'] = '500';
            $response['reason'] = 'No post data sent';

            echo json_encode($response);
            return;
        }

        $response['status'] = 'success';
        $response['code'] = '200';
        $response['data'] = $submissionData;

        echo json_encode($response);
        return;
	}
}
