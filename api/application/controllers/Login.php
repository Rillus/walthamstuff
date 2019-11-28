<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        
        $this->load->database();
        $this->load->library('session');
        $this->load->helper('form');
        $this->load->model('Responsemodel');
        $this->load->helper('url');
        date_default_timezone_set('Europe/London');

        header("Access-Control-Allow-Origin: *");
        header('Content-type: application/json');
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, X_FILENAME");
    }
    
    public function index() {}
    
    public function login_action() {
        $email = $this->input->post('email');
        $password = $this->input->post('password');
        
        $this->db->where('email', $email);
        $retrieved_user = $this->db->get('users');
        
        if ($retrieved_user->num_rows() == 0) {
            $newData = array(
                'logged_in' => 'incorrect',
                'reason' => 'User not found'
            );
            $this->session->set_userdata($newData);

            $this->Responsemodel->error('Invalid login details');
            return;
        }

        $userr = $retrieved_user->row();
        
        $decodePassword = password_verify($password, $userr->password);
        if (!$decodePassword) {
            $newData = array(
                'logged_in' => false,
            );
            $this->session->set_userdata($newData);
            
            $this->Responsemodel->error('Invalid login details');
            return;              
        }
        
        // TODO: send verification emails.
        // if ($userr->status == "0") {
        //     $data['header'] = "An error with your login.";
        //     $data['message'] = 'It seems your registration has not quite been completed. Please check for the activation email we sent you in your inbox, or get it re-sent. Do be sure to check your spam or junk folder.';

        //     $this->Responsemodel->error('incomplete registration', '400', $data);
        //     return;
        // }

        $newData = array(
            'email'  => $email,
            'id' => $userr->id,
            'status' => $userr->status,
            'logged_in' => true,
        );

        $this->session->set_userdata($newData);
        
        $this->Responsemodel->success($newData);
        return;
    }

    public function check_login() {
        $userData = array(
            'userId' => $this->session->userdata('id'), 
            'status' => $this->session->userdata('status'), 
            'logged_in' => $this->session->userdata('logged_in'), 
            'all' => $this->session->all_userdata(), 
        );

        $this->Responsemodel->success($userData);
        return;
    }

    function logout()
    {
        $array_items = array(
            'email' => '',
            'logged_in' => '',
            'id' => '',
            'status' => '',   
        );

        $this->session->unset_userdata($array_items);
    }
}