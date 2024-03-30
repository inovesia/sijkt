# SIJKT ExpressJS Example

This sample code require node.js 16

### js/common.js
Change SIJKT SSO url matching `staging` or `production` server
```
    const SIJKT_API_URL = "https://sijkt.inovesia.co.id/api";
    const SIJKT_SSO_URL = "https://sijkt.inovesia.co.id/sso";
```
Change `APPLICATION_NUMBER` and `APPLICAION_KEY` with yours from SIJKT Partner portal
```
    const SIJKT_NUMBER = "APPLICATION_NUMBER";
    const SIJKT_KEY = "APPLICAION_KEY";
```
Change MYSQL database parameters
```
    const MYSQL = {
        host: "HOST",
        user: "USERNAME",
        password: "PASSWORD",
        database: "DATABASE"
    }
```
## Run project
To run this project, execute `npm install` and `node app.js` from project folder, then navigate your browser to `http://localhost:3000`
