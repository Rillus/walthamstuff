<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Seshmodel extends CI_Model {
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
		$this->load->database();		
		$this->load->library('encrypt');		
    }
    
    function checkSesh()
    {
		$tempUserId = $this->session->userdata('tempUserId');
		if (!isset ($tempUserId) || $tempUserId == ""){
			// establish tempUserId in session
			$tempUserId = uniqid();
			$newdata = array(
			   'tempUserId'  => $tempUserId
			);

			$this->session->set_userdata($newdata);
		} else {
			return $tempUserId;
		}
    }

	function getSesh() {
		$tempUserId = $this->session->userdata('tempUserId');
		
		$this->db->where('session_id', $tempUserId);
		$queue = $this->db->get('ticket_queue');
		if ($queue->num_rows() > 0){
			$queued = $queue->row();
			return $queued;
		} else {
			return false;
		}
    }

	function getCurrentUser(){
		$this->db->where('id', $this->session->userdata('id'));
		return $this->db->get('users', 1);
	}

	function checkEventOwnerOrAdmin($user_id){
		if ($this->session->userdata('id') == ""){
			return false;
		}
		if ($this->session->userdata('user_type') == ""){
			return false;
		}
		if ($this->session->userdata('id') == $user_id){
			return true;
		} else if ($this->session->userdata('user_type') == '0') {
			return true;
		}
		
		return false;
	}

	function checkAdmin(){
		if ($this->session->userdata('id') == ""){
			return false;
		}
		if ($this->session->userdata('user_type') == ""){
			return false;
		}
		if ($this->session->userdata('user_type') == '0') {
			return true;
		}
		
		return false;
	}

	function decryptSesh($email, $key){

		$decoded = $this->encrypt->decode($key);
		$decodedEmail = substr($decoded, 0, strlen($email));

		if ($decodedEmail == $email){
			$decodedTime = substr($decoded, strlen($email));

			if (time() < $decodedTime){
				return true;
			}
		}

		return false;
	}

	function isEventStaff($eventId) {
		if ($this->session->userdata('user_type') == 'staff') {
			if ($this->session->userdata('event_id') == $eventId) {
				return true;
			} else if ($this->session->userdata('event_id') == 0) {
				// find out if this event belongs to the overall event owner!
				$ownerId = $this->session->userdata('owner_id');

				$this->load->model('Eventsmodel');
				$event = $this->Eventsmodel->getThisEvent($eventId);

				if ($event) {
					if ($event->user_id === $ownerId){
						return true;
					}
				}
			}
		}

		return false;
	}

	function isLoggedIn() {
		if (!$this->session->userdata('id')) {
			return false;
		}

		return true;
	}

	function isUser($id) {
		if ($this->session->userdata('id') == $id) {
			return true;
		}

		return false;
	}
}
?>