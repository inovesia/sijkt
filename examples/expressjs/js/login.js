$(async () => {

    const SIJKT_URL = "https://sijkt.inovesia.co.id/sso";
    const SIJKT_NUMBER = "1685791343049";
    const SIJKT_KEY = "MTY4NTc5MTM1NjMyNDI5ODUyMS1RazE0M2dRRg==";

    $('#connect').click((e) => {
        window.location.href = `${SIJKT_URL}/connect/${Base64.encode(`${SIJKT_NUMBER}:${SIJKT_KEY}`)}`;
    });
});