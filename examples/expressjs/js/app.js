$(async () => {

    const SIJKT_URL = "https://sijkt.inovesia.co.id/sso";
    const SIJKT_NUMBER = "APPLICATION_NUMBER";
    const SIJKT_KEY = "APPLICATION_KEY";

    console.log('Login');
    $('#connect').click((e) => {
        window.location.href = `${SIJKT_URL}/connect/${Base64.encode(`${SIJKT_NUMBER}:${SIJKT_KEY}`)}`;
    });
});