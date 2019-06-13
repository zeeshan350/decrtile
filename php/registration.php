<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
 
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
 
        exit(0);
    }
 
  require "dbconnect.php";
  
    $data = file_get_contents("php://input");
    
    if (isset($data)) {
        $request = json_decode($data);
        $fullname = $request->fullname;
        $emailaddress = $request->emailaddress;
        $password = $request->password;
        $telephone = $request->telephone;
	  }
      
	  $sql = "INSERT users(username, password, telephone, email) VALUES('$fullname', '$password', '$telephone', '$emailaddress') ";
    
      
    // If result matched $myusername and $mypassword, table row must be 1 row
    
    if ($con->query($sql) === TRUE) {
      
      $response= "Your Login success";
    
    } else {
      
      $response= "Your Login Email or Password is invalid";
    
    }

	 
	echo json_encode( $response);
?>