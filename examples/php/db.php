<?php

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