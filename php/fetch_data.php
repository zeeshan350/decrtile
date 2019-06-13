<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // cache for 1 day
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
        $name = $request->testname;
      }
    else{}


    $sql  = "Select * from users where email ='$name'";
    
    $stmt = mysqli_query($con, $sql) or die ("MySQL Error:".mysqli_error($con));

    $result = mysqli_query($con,$sql);    
      
    $count = mysqli_num_rows($result);
      
    // If result matched $myusername and $mypassword, table row must be 1 row
		


    $response = array();

    while($row = mysqli_fetch_array($result))
    {
        array_push($response, array("id"=>$row[0], 
        "username"=>$row[1],
        "password"=>$row[2],
        "telephone"=>$row[3],
        "email"=>$row[4],
        "fulladdress"=>$row[5]));

    }

    //$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
    
    //$active = $row['active'];
      
    //$count = mysqli_num_rows($result);
      
    // If result matched $myusername and $mypassword, table row must be 1 row
		
  
    echo json_encode(array("server_response"=> $response));
    mysqli_close($db)

?>