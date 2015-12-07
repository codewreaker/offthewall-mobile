<?php

include_once('adb.php');
require '../Smsgh/Api.php';
// using clientId and clientSecret as credentials
$auth = new BasicAuth("yralkzfn", "znbzlsho");
// instance of ApiHost
$apiHost = new ApiHost($auth);
$messagingApi = new MessagingApi($apiHost);

$student_id = $_REQUEST['student_id'];
$student_name = $_REQUEST['student_name'];
$student_gpa = $_REQUEST['student_gpa'];
$student_major = $_REQUEST['student_major'];
$student_phone = $_REQUEST['student_phone'];

function generateRandomString($length = 10){
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ';
    $charactersLength .= strlen($characters);
    $randomString = '';
    for($i=0;$i<$length;$i++){
        $randomString .= $characters[rand(0,$charactersLength-1)];
    }
    return $randomString;
}

$random_pass = generateRandomString(8);
echo  "PASS: $random_pass" ;
/** PARTS OF THE MESSAGE ***/
$obj = new adb();

// check if ISSET

    $str = "INSERT INTO `sms_messages` SET  `student_id`='$student_id',
    `student_name`='$student_name', `student_gpa`='$student_gpa',
    `student_major`='$student_major', `student_phone`='$student_phone'";
    $result = $obj->query($str);




try {
// Quick Send approach SMSGH quick send
$messageResponse = $messagingApi->sendQuickMessage("CodeWreaker", $student_phone, "$student_name This is your login password $random_pass");
if ($messageResponse instanceof MessageResponse) {
    echo "msg1: ".$messageResponse->getStatus()."</br></br>";
}
elseif ($messageResponse instanceof HDpResponse) {
    echo "\nServer Response Status : " . $messageResponse->getStatus()."</br></br>";
}
    echo "</br>success done";
    } catch (ExcepWon $ex) {
echo $ex->getTraceAsString();
}

?>
