<?php
    if(isset($_SERVER['HTTP_ORIGIN']))
    {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    //Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
    {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }

    $postdata = file_get_contents("php://input");
    if(isset($postdata))
    {
        $request = json_decode($postdata);
        $name = $request->testname;

        if($name != "")
        {
            $con = mysqli_connect("localhost","afric104_786","georgied971@","afric104_786");

            // Check connection
            if (mysqli_connect_errno())
            {
                echo "Failed to connect to MySQL: " . mysqli_connect_error();
            }
            else
            {
                echo "Name: " .$name;

                $sql  = "INSERT INTO users(username) VALUES ('$name')";
                $stmt = mysqli_query($con, $sql) or die ("MySQL Error:".mysqli_error($con));

                echo "successfully inserted !";
            }
        }
        else 
        {
            echo "Empty name and description parameter!";
        }
    }
    else 
    {
        echo "Not called properly with name and description parameter!";
    }
 ?>   