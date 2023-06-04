# SIJKT ExpressJS Example

This sample code require node.js 16

### app.js
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

## Start project
To start this sample, execute `npm install` and `node app.js` from project folder, then navigate your browser to `http://localhost:3000`
