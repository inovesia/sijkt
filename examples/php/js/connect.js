$(async () => {
    let params = window.location.href.split('?');
    let querys = params[1].split("&");
    let query1 = querys[0].split("=");
    let query2 = querys[1].split("=");
    $('#token').val(query2[1]);
    $('#accountId').val(query1[1]);
});