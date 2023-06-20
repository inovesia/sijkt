<?php
session_start();

require_once ('db.php');

if (count($_POST) == 0) {
    $rows = dbQuery("SELECT * FROM transaction_session WHERE session_value=?", [session_id()]);
    if (count($rows) > 0) {
        header('Location: /');
    } else {
        readfile("html/connect.html");
    }
} else {
    $rows = dbQuery("SELECT * FROM master_user WHERE user_email=? AND user_password=MD5(?)", [$_POST["username"],$_POST["password"]]);
    if (count($rows) > 0) {
        // grant access
        get("User", "grant", "token=".base64_decode($_POST['token']));
        // map user
        dbExec("UPDATE master_user SET user_sijkt=? WHERE user_id=?", [$_POST["accountId"], $rows[0]["user_id"]]);
        // start a new session
        dbExec("INSERT INTO transaction_session VALUES (UUID(), ?, ?, SYSDATE())", [$rows[0]["user_id"], session_id()]);
        header('Location: /');
    } else {
        echo 'Access denied, <a href="/login.php">login</a>';
    }
}