$(async () => {
    var urlParams = new URLSearchParams(window.location.search);
    console.log('Register');
    get("User", "token", `token=${Base64.decode(urlParams.get('t'))}`)
    .then((response) => {
        response = JSON.parse(response);
        if (response.errorCode == 0) {
            let payload = response.payload;
            $('#userId').val(payload.userId);
            $('#userEmail').val(payload.employeeEmail);
            $('#userName').val(payload.employeeName);
            $('#userPhone').val(payload.employeePhone);
            $('#userNip').val(payload.employeeEmployeeId);
        }
    });

    $('#login').click((e) => {
        window.location.href = `/login`;
    });
    $('form').submit((e) => {
        if ($('#userPassword').val() != $('#userPasswordRetype').val()) {
            e.preventDefault();
            alert('Password & retype password does\'nt same');
            return;
        }
    })
});