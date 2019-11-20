<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        
        $this->load->database();
        $this->load->model('Seshmodel');
        $this->load->library('session');
        $this->load->helper('form');
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
        
        if ($retrieved_user->num_rows() > 0) {
            $userr = $retrieved_user->row();
            
            $decodePassword = password_verify($password, $userr->password);
            if (!$decodePassword) {
                $newData = array(
                    'logged_in' => 'incorrect',
                    'reason' => 'Incorrect password',
                );
                $this->session->set_userdata($newData);
                
                echo json_encode($newData);
                return;              
            }
            
            if (($userr->status == "1")||($userr->status == "2")) {
                $newData = array(
                    'email'  => $email,
                    'id' => $userr->id,
                    'status' => $userr->status,
                    'logged_in' => 'yes',
                );

                $this->session->set_userdata($newData);
                
                echo json_encode($newData);
            } else {
                $data['header'] = "An error with your login.";
                $data['message'] = 'It seems your registration has not quite been completed. Please check for the activation email we sent you in your inbox, or get it re-sent. Do be sure to check your spam or junk folder.';

                echo json_encode($data);
            }
        } else {
            $newData = array(
                'logged_in' => 'incorrect',
                'reason' => 'User not found'
            );
            $this->session->set_userdata($newData);

            echo json_encode($newData);
        }
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