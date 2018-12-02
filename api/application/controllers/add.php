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

	public function location($id = null) {
		$submissionData = $this->input->post();

		if (! $submissionData) {
			$response['status'] = 'error';
			$response['code'] = '500';
			$response['reason'] = 'No post data sent';
			
			echo json_encode($response);
			return;
		}


		$postCode = $this->input->post('postcode');
		$name = $this->input->post('name');
		$address = $this->input->post('address');
		$category = $this->input->post('category');
		$description = $this->input->post('description');
		$website = $this->input->post('website');
		$twitter_handle_url = $this->input->post('twitter');

		$contributorEmail = $this->input->post('contributor_email');

		$existingContributors = $this->db->where('email', $contributorEmail)
										 ->get('contributors', 1);

		if ($existingContributors->num_rows() > 0) {
			$contributorId = $existingContributors->row()->id;
		} else {       
			$contributor = array(
				'name' => $this->input->post('contributor_name'),
				'email' => $contributorEmail
			);

			$this->db->insert('contributors', $contributor);

			$contributorId = $this->db->insert_id();
		}
		
		$data = array(
			'name' => $name,
			'address' => $address.', '.$postCode,
			'category' => $category,
			'description' => $description,
			'website' => $website,
			'twitter' => $twitter_handle_url,
			'contributor_id' => $contributorId,
			'status' => '1'
		);

		if ($id) {
			$thisEntry = $this->db->where('id', $id)
								  ->get('locations', 1);

			if ($thisEntry->num_rows() > 0) {
				$this->db->where('id', $id)
						 ->update('locations', $data);
			} else {
				$response['status'] = 'error';
				$response['code'] = '500';
				$response['reason'] = 'Invalid ID passed';
				
				echo json_encode($response);
				return;
			}
		}
		$this->db->insert('locations', $data);

		$response['status'] = 'success';
		$response['code'] = '200';
		$response['data'] = $submissionData;

		echo json_encode($response);
		return;
	}
}
