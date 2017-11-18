<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Locations extends CI_Controller {
	public function __construct() {
        parent::__construct();

        $this->load->database();

        header("Access-Control-Allow-Origin: *");
        header('Content-type: application/json');
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, X_FILENAME");
	}

	public function index() {
		$location = $this->db->where('lat !=', '')
							 ->where('lon !=', '')
							 ->get('locations');

		if ($location->num_rows() > 0) {
			echo json_encode($location->result());
		}
	}

	public function category($cat) {
		$cat = urldecode($cat);
		
		$location = $this->db->where('category', $cat)
							 ->get('locations');

		if ($location->num_rows() > 0) {
			echo json_encode($location->result());
		}
	}

	public function no_latlon() {
		$location = $this->db->where('address !=', '')
							 ->where('lat', '')
							 ->where('lon', '')
							 ->get('locations', 2);

		if ($location->num_rows() > 0) {
			echo json_encode($location->result());
		}
	}

	public function no_address() {
		$location = $this->db->where('address', '')
							 ->get('locations');

		// echo $location->num_rows();

		if ($location->num_rows() > 0) {
			echo json_encode($location->result());
		}
	}

	public function no_category() {
		$location = $this->db->where('category', '')
							 ->get('locations');

		echo $location->num_rows();

		if ($location->num_rows() > 0) {
			echo json_encode($location->result());
		}
	}

	public function post_latlon() {
		$id = $this->input->post('id');
		
		$data = array(
			'lat' => $this->input->post('lat'), 
			'lon' => $this->input->post('lon')
		);

		$this->db->where('id', $id)
				 ->update('locations', $data);
	}
}
