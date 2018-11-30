<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class add extends CI_Controller {
	public function __construct() {
        parent::__construct();

        $this->load->database();

        header("Access-Control-Allow-Origin: *");
        header('Content-type: application/json');
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, X_FILENAME");
	}

	public function index() {
		echo 'Welcome';
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
