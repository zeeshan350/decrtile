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
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
 
        exit(0);
    }
 
  require "dbconnect.php";
  
    $data = file_get_contents("php://input");
    
    if (isset($data)) {
        $request = json_decode($data);
        $username = $request->username;
	  }
      
	  $sql = "SELECT * FROM users WHERE email = '$username'";
    
    $result = mysqli_query($con,$sql);
    
    $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
    
    $active = $row['active'];
      
    $count = mysqli_num_rows($result);
      
    // If result matched $myusername and $mypassword, table row must be 1 row
		
    if($count >0) {
     
      $response= "Your Login success";

 
      //$from = "info@decraafrica.com";
      //$to = $row["email"];
      //$subject = "Password Reset";
      //$message = "Dear" . $row["username"] .",". "\r\n" . "You recently requested a password reset. Please click www.decraafrica.com to change your password." . "\r\n" . "Thank you," . "\r\n" ."Decra Africa Team";
      //$headers = "From:" . $from;
      //mail($to,$subject,$message, $headers);
    
    } else {
     
      $response= "Your Login Email or Password is invalid";
		
    }
   
	 
	echo json_encode( $response);
?>