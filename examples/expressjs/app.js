const express = require('express');
const base64 = require('base-64');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const mysql = require('mysql2/promise');
const common = require('./js/common.js');
const app = express();
const port = 3000;

app.use('/html', express.static('html'))
app.use('/js', express.static('js'))
app.use('/css', express.static('css'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "Yky6kZsEH6QwDRoBFQNognTZhcLLPZo3xiKkppEoMaKqwDY2YLT2pM2GgefiLhF3",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

let query = async (sql, params) => {
    const connection = await mysql.createConnection(common.MYSQL);
    const [results, ] = await connection.execute(sql, params);
    return results;
}

let exec = async (sql, params) => {
    const connection = await mysql.createConnection(common.MYSQL);
    const [results, ] = await connection.execute(sql, params);
    return results;
}

let get = async (module, action, query) => {
    return fetch(`${common.SIJKT_API_URL}/${module}/${action}${query ? `?${query}` : ''}`)
    .then((response) => {
        return response.text();        
    });
}

let revoke = async (userId) => {
    return fetch(`${common.SIJKT_API_URL}/User/revoke?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${base64.encode(`${common.SIJKT_NUMBER}:${common.SIJKT_KEY}`)}`
        },
    })
    .then((response) => {
        return response.text();        
    });
}

app.get('/', (req, res) => {
    let session = req.session;
    query('SELECT * FROM transaction_session INNER JOIN master_user ON session_user_id=user_id WHERE session_value=?', [session.id])
    .then((results) => {
        if (results.length > 0) {
            res.send(`Welcome <b>${results[0].user_name}</b>, <a href="/logout">logout</a> | <a href="/revoke?userId=${results[0].user_sijkt}">revoke</a>`);
        } else {
            res.redirect('/login');
        }
    });
})

app.get('/logout', (req, res) => {
    let session = req.session;
    session.destroy()
    res.redirect('/');
  })

  app.get('/revoke', (req, res) => {
    let session = req.session;
    revoke(req.query.userId)
    .then((response) => {
        console.log('revoke: '+response);
        exec('UPDATE master_user SET user_sijkt=NULL WHERE user_sijkt=?', [req.query.userId])
        .then((response) => {
            session.destroy()
            res.redirect('/');
        });
    });
  })

app.get('/login', (req, res, next) => {
    let session = req.session;
    query('SELECT * FROM transaction_session WHERE session_value=?', [session.id])
    .then((results) => {
        if (results.length > 0) {
            // logged in
            res.redirect('/');
        } else {
            res.sendFile('html/login.html', {root:__dirname});
        }
    });
  })

app.post('/login', (req, res, next) => {
    let session = req.session;
    query('SELECT * FROM master_user WHERE user_email=? AND user_password=MD5(?)', [req.body.username, req.body.password])
    .then((results) => {
        if (results.length > 0) {
            exec('INSERT INTO transaction_session VALUES (UUID(), ?, ?, SYSDATE())', [results[0].user_id, session.id])
            .then((response) => {
                res.redirect('/');     
            });
        } else {
            res.send('Access denied, <a href="/login">login</a>');
        }
    });
  })

  app.get('/register', (req, res, next) => {
    let session = req.session;
    query('SELECT * FROM transaction_session WHERE session_value=?', [session.id])
    .then((results) => {
        if (results.length > 0) {
            // logged in
            res.redirect('/');
        } else {
            res.sendFile('html/register.html', {root:__dirname});
        }
    });
  })

  app.post('/register', (req, res, next) => {
    let session = req.session;
    query('SELECT UUID() AS uuid')
    .then((results) => {
        exec('INSERT INTO master_user VALUES (?, ?, ?, ?, MD5(?), ?, NULL, "A", SYSDATE())', [results[0].uuid, req.body.userName, req.body.userEmail, req.body.userPhone, req.body.userPassword, req.body.userId])
        .then((response) => {
            // grant user to app
            get("User", "grant", `token=${base64.decode(req.body.t)}`)
            .then((response) => {
                console.log(response);
                exec('INSERT INTO transaction_session VALUES (UUID(), ?, ?, SYSDATE())', [results[0].uuid, session.id])
                .then((response) => {
                    res.redirect('/');     
                });
            });                        
        });
    });
  })

app.get('/sijkt-callback', (req, res, next) => {
    let session = req.session;
    get("User", "token", `token=${base64.decode(req.query.t)}`)
    .then((response) => {
        response = JSON.parse(response);
        if (response.errorCode == 0) {
            // check if userId is mapped to table master_user column user_sijkt
            query('SELECT * FROM master_user WHERE user_sijkt=? AND user_revoked IS NULL', [response.payload.userId])
            .then((results) => {
                if (results.length > 0) {
                    // userId is mapped, start a new session
                    exec('INSERT INTO transaction_session VALUES (UUID(), ?, ?, SYSDATE())', [results[0].user_id, session.id])
                    .then((response) => {
                        res.redirect('/');     
                    });
                } else if (response.payload.userEmail) {
                    // check userEmail is exists on table master_user column user_email
                    query('SELECT * FROM master_user WHERE user_email=? AND user_revoked IS NULL', [response.payload.userEmail])
                    .then((results) => {
                        if (results.length > 0) {
                            let user = results[0];
                            // map userId to user_sijkt
                            exec('UPDATE master_user SET user_sijkt=? WHERE user_email=? AND user_revoked IS NULL', [response.payload.userId, response.payload.userEmail])
                            .then((response) => {
                                // grant user to app
                                get("User", "grant", `token=${base64.decode(req.query.t)}`)
                                .then((response) => {
                                    console.log('grant: '+response);
                                });
                                // start a new session
                                exec('INSERT INTO transaction_session VALUES (UUID(), ?, ?, SYSDATE())', [user.user_id, session.id])
                                .then((response) => {
                                    res.redirect('/');     
                                });
                            });
                        } else {
                            res.send(`Access denied, <a href="/login">login</a> | <a href="/register?t=${req.query.t}">register</a>`);
                        }
                    });
                }
            });
        } else {
            res.send(response.errorMessage);
        }
    })
  })

  app.get('/sijkt-revoke', (req, res, next) => {
    if (req.headers.authorization == `Bearer TjMxcDkzdXFGeDFDQXFWOQ==`) {
        console.log('authorized');
        exec('UPDATE master_user SET user_sijkt=NULL WHERE user_sijkt=? AND user_revoked IS NULL', [req.query.userId])
        .then((response) => {
            res.send('revoked');
        });
    } else {
        res.send('not authorized');
    }
  });

app.listen(port, () => {
  console.log(`SIJKT Example App listening on port ${port}`)
})