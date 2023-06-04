# SIJKT ExpressJS Example

This sample code require node.js 16

### db.php
```
    $host = 'HOST';
    $db   = 'DATABASE';
    $user = 'USERNAME';
    $pass = 'PASSWORD';
    $port = "3306";
```
Match your database parameters

### sijkt-callback.php
Change SIJKT SSO url matching `staging` or `production` server
```
    const SIJKT_URL = "https://sijkt.inovesia.co.id/api";
```

### js/app.js
Change `APPLICATION_NUMBER` and `APPLICAION_KEY` with yours from SIJKT Partner portal
```
    const SIJKT_URL = "https://sijkt.inovesia.co.id/sso";
    const SIJKT_NUMBER = "APPLICATION_NUMBER";
    const SIJKT_KEY = "APPLICAION_KEY";
```

## Run project
To run this project copy to your favorite web server or just execute `php -S localhost:3000` from project folder, then navigate your browser to `http://localhost:3000`
