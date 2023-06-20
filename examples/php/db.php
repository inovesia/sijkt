<?php
const SIJKT_URL = "https://sijkt.inovesia.co.id/api";

function dbConnect() {
    $host = 'HOST';
    $db   = 'DATABASE';
    $user = 'USERNAME';
    $pass = 'PASSWORD';
    $port = "3306";
    $charset = 'utf8mb4';

    $options = [
        \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        \PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset;port=$port";
    try {
        return new \PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }
}

function dbQuery($sql, $params) {
    $pdo = dbConnect();
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $pdo = null;
    return $stmt->fetchAll();
}

function dbExec($sql, $params) {
    $pdo = dbConnect();
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $pdo = null;
    return $stmt->fetchAll();
}

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