<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Responsemodel extends CI_Model {
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
        
    }
    
    function success($data){
        $response = array(
            'status' => 'success',
            'code' => '200',
            'data' => $data
        );

        echo json_encode($response);
        return;
    }

    function error($reason, $code = '400', $data = false) {
        $response = array(
            'status' => 'error',
            'code' => $code,
            'reason' => $reason
        );

        if ($data) {
            $response['data'] = $data;
        }

        echo json_encode($response);
        return;
    }

    function required($required) {
        foreach ($required as $thisField) {
            if ($this->input->post($thisField) && $this->input->post($thisField) !== '') {

            } else {
                $this->error('No value given for '.$thisField);
                exit(1);
            }
        }
    }
}
?>