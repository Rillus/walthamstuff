<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Upload extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
			
		$this->load->helper('form');
		date_default_timezone_set('Europe/London');

		header("Access-Control-Allow-Origin: *");
		header('Content-type: application/json');
		header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, X_FILENAME");
	}
	public function index()
	{		
		if ($this->uri->segment(2) == ""){
			$id = $this->input->post('id');		
		} else {
			$id = $this->uri->segment(2);
		}
		$url = $id;

		$path = "uploads/$url";
		$clientpath = "./".$path;
		//echo dirname( __FILE__ );
		if (! file_exists($clientpath)){
			if(! mkdir($clientpath,0777, true)){
				$message['header'] = "File access error";
				$message['message'] = "I'm afraid we failed to create the directory required to store your images. Probably worth getting in touch with us to sort this.";
				
				echo json_encode($message);	
				return;
			}
		}
		
		$fn = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);
		
		if ($fn) {
			// I am an ajax request
			if (substr($fn, -3, 3) != "gif" && substr($fn, -3, 3) != "png" && substr($fn, -3, 3) != "jpg"){
				echo "error - incorrect file type";
				return;
			}

			$remove_these = array(' ','`','"','\'','\\','/','%',',',':',';');
    		$newFileName = str_replace($remove_these, '', $fn);

			file_put_contents(
				$path.'/'. $newFileName,
				file_get_contents('php://input')
			);
			echo "$newFileName uploaded";
			
			$path = $path.'/'.$newFileName;
		} else {
		
			$config['upload_path'] = $clientpath.'/';
			$config['allowed_types'] = 'gif|jpg|png|jpeg';
			$config['max_size']	= '0';
			$config['max_width']  = '0';
			$config['max_height']  = '0';
			
			$this->load->library('upload', $config);
			
			
			if ( ! $this->upload->do_upload()){				
				$message['message'] = $this->upload->display_errors();
				
				echo json_encode($message);
				
				return;
			} else {
				$data = array('upload_data' => $this->upload->data());
				$path = $data['upload_data'];
				$path = $path.'/'.$path['file_name'];
			}
		}
		
		$data = array(
			'image' => $path,
		);
		
		$this->db->where('id', $id);
		$this->db->update('events', $data);

		$message['header'] = "Success";
		$message['message'] = "Image uploaded to $path";
		
		echo json_encode($message);
	}
}