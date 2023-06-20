$(async () => {
    let params = window.location.href.split('?');
    let query = params[1].split("=");
    $('#accountId').val(query[1]);
});