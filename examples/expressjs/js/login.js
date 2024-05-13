$(async () => {

    const SIJKT_URL = "https://sijkt.pu.go.id/sso";
    const SIJKT_NUMBER = "APPLICATION_NUMBER";
    const SIJKT_KEY = "APPLICAION_KEY";

    $('#connect').click((e) => {
        window.location.href = `${SIJKT_URL}/connect/${Base64.encode(`${SIJKT_NUMBER}:${SIJKT_KEY}`)}`;
    });
});