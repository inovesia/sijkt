const SIJKT_API_URL = "https://sijkt.pu.go.id/api";
const SIJKT_SSO_URL = "https://sijkt.pu.go.id/sso";
const SIJKT_NUMBER = "APPLICATION_NUMBER";
const SIJKT_KEY = "APPLICAION_KEY";

const MYSQL = {
    host: "HOST",
    user: "USERNAME",
    password: "PASSWORD",
    database: "DATABASE"
}

const get = async (module, action, query) => {
    return fetch(`${SIJKT_API_URL}/${module}/${action}${query ? `?${query}` : ''}`)
    .then((response) => {
        return response.text();        
    });
}

exports.SIJKT_API_URL = SIJKT_API_URL;
exports.SIJKT_SSO_URL = SIJKT_SSO_URL;
exports.SIJKT_NUMBER = SIJKT_NUMBER;
exports.SIJKT_KEY = SIJKT_KEY;
exports.MYSQL = MYSQL;

