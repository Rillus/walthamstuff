<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Moderation extends CI_Controller {
	public function __construct() {
		parent::__construct();

		$this->load->database();
        $this->load->helper('url');

		// header("Access-Control-Allow-Origin: *");
		// header('Content-type: application/json');
		// header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
		// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, X_FILENAME");
	}

	public function index() {
		$data['revisions'] = $this->db->where('status', 0)
							 ->get('revisions');

	 	$data['news'] = $this->db->where('status', 1)
							 ->get('locations');

		$this->load->view('revisions', $data);
	}

	public function approve($id = null) {
		if ($id) {
			$thisEntry = $this->db->where('id', $id)
								  ->get('revisions', 1);

			if ($thisEntry->num_rows() > 0) {
				$thisEntry = $thisEntry->row();

				$this->db->where('id', $thisEntry->location_id);
				unset($thisEntry->id);
				unset($thisEntry->status);
				unset($thisEntry->location_id);
				unset($thisEntry->timestamp);
				unset($thisEntry->lon);
				unset($thisEntry->lat);
				$this->db->update('locations', $thisEntry);	

				$data['status'] = '1';

				$this->db->where('id', $id)
						 ->update('revisions', $data);
			} else {
				echo 'error: couldn\'t find location';
			}
		} else {
			echo 'error: no location id supplied';
		}
		redirect('moderation');
	}

	public function publish($id = null) {
		if ($id) {
			$thisEntry = $this->db->where('id', $id)
								  ->get('locations', 1);

			if ($thisEntry->num_rows() > 0) {
				$data['status'] = '0';

				$this->db->where('id', $id)
						 ->update('locations', $data);
			} else {
				echo 'error: couldn\'t find location';
			}
		} else {
			echo 'error: no location id supplied';
		}
		redirect('moderation');
	}

	public function reject($id = null) {
		if ($id) {
			$this->db->where('id', $id)
				     ->delete('revisions');
		} else {
			echo 'error: no location id supplied';
		}
		redirect('moderation');
	}
}
