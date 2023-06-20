<?php
session_start();

const SIJKT_URL = "https://sijkt.inovesia.co.id/api";

require_once ('db.php');

function get($module, $action, $query) {
    $ch = curl_init();
    $headers = array(
    'Accept: application/json',
    'Content-Type: application/json',

    );
    curl_setopt($ch, CURLOPT_URL, SIJKT_URL."/$module/$action?$query");
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET"); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

    // Timeout in seconds
    curl_setopt($ch, CURLOPT_TIMEOUT, 30); 
    return curl_exec($ch);
}

$response = json_decode(get("User", "token", "token=".base64_decode($_GET['t'])), true);
if ($response["errorCode"] == 0) {
    $rows = dbQuery("SELECT * FROM master_user WHERE user_sijkt=?", [$response["payload"]["userId"]]);
    if (count($rows) > 0) {
        // start a new session
        dbExec("INSERT INTO transaction_session VALUES (UUID(), ?, ?, SYSDATE())", [$rows[0]["user_id"], session_id()]);
        header('Location: /');
    } else {
        $rows = dbQuery("SELECT * FROM master_user WHERE user_email=?", [$response["payload"]["userEmail"]]);
        if (count($rows) > 0) {
            // grant access
            get("User", "grant", "token=".base64_decode($_GET['t']));
            // map userEmail
            dbExec("UPDATE master_user SET user_sijkt=? WHERE user_id=?", [$response["payload"]["userId"], $rows[0]["user_id"]]);
            // start a new session        
            dbExec("INSERT INTO transaction_session VALUES (UUID(), ?, ?, SYSDATE())", [$rows[0]["user_id"], session_id()]);
            header('Location: /');
        } else {        
            // echo 'Access denied, <a href="/login.php">login</a>';
            echo 'Access denied, <a href="/connect.php?accountId='.$response["payload"]["userId"].'">connect</a>';
        }
    }
} else {        
    echo 'Access denied, <a href="/login.php">login</a>';
}