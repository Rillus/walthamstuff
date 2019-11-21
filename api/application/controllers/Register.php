<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Register extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        
        $this->load->database();
        $this->load->library('session');
        $this->load->helper('form');
        $this->load->helper('url');
        date_default_timezone_set('Europe/London');

        header("Access-Control-Allow-Origin: *");
        header('Content-type: application/json');
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, X_FILENAME");
    }
    
    public function index() {
        $email = $this->input->post('email');
        $password = $this->input->post('password');

        // check email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {           
            $this->Responsemodel->error('Incorrect email format');
            return;
        }

        // ensure password not blank
        if ($password == '') {
            $this->Responsemodel->error('You must enter a password');
            return;
        }

        // ensure this is not a duplicate account
        $emailExists = $this->db->where('email', $email)
                                ->get('users');

        if ($emailExists->num_rows() > 0) {            
            $this->Responsemodel->error('Invalid login details');
            return;
        }

        // insert data
        $data = array(
            'email' => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
        );

        $this->db->insert('users', $data);

        // return new user id
        $returnValues = array(
            'userId' => $this->db->insert_id()
        );

        $this->Responsemodel->success($returnValues);
        return;
    }
}