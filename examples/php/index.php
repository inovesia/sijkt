<?php
session_start();

require_once ('db.php');

$rows = dbQuery("SELECT * FROM transaction_session INNER JOIN master_user ON session_user_id=user_id WHERE session_value=?", [session_id()]);

if (count($rows) > 0) {
    echo("Welcome <b>". $rows[0]['user_name']."</b>, <a href=\"/logout.php\">logout</a>");
} else {
    header('Location: login.php');
}