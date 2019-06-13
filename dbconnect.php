<?php
function OpenCon()
 {
 $dbhost = "198.46.81.32";
 $dbuser = "afric104_786";
 $dbpass = "georgied971@";
 $db = "afric104_786";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
 
 return $conn;
 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }
   
?>