<?php

  define('HOST','localhost');

  define('USER','afric104_786');

  define('PASS','georgied971@');

  define('DB','afric104_786');

  $con = mysqli_connect(HOST,USER,PASS,DB);

   if (!$con){

                 die("Error in connection" . mysqli_connect_error()) ;

  }

?>