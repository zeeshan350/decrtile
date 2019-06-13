<?php

  require "dbconnect.php";

    $data = file_get_contents("php://input");

    if (isset($data)) {

        $request = json_decode($data);

        $username = $request->'zeeshan@live.com';

        $password = $request->'zeeshan350';

                }

      $username= mysqli_real_escape_string($con,$username);

      $password = mysqli_real_escape_string($con,$password);

       $username = stripslashes($username);


    $sql = "SELECT * FROM prverfy WHERE code = '$username'";

      $result = mysqli_query($con,$sql);

      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);

      $active = $row['active'];

      $count = mysqli_num_rows($result);

     

      // If result matched myusername and mypassword, table row must be 1 row                    

      if($count >0) {

     $response= "Your Login success";

      }else {

    $response= "Your Login Email or Password is invalid";         

      }

 echo json_encode( $response);

?>