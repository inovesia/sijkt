$(async () => {
    var urlParams = new URLSearchParams(window.location.search);
    console.log('Register');
    get("User", "token", `token=${Base64.decode(urlParams.get('t'))}`)
    .then((response) => {
        response = JSON.parse(response);
        $('#t').val(urlParams.get('t'));
        if (response.errorCode == 0) {
            let payload = response.payload;
            $('#userId').val(payload.userId);
            if (payload.employeeEmail && payload.employeeEmail != "") {
                $('#userEmail').val(payload.employeeEmail);
            } else if (payload.companyEmail && payload.companyEmail != "") {
                $('#userEmail').val(payload.companyEmail);
            } else {
                $('#userEmail').val(payload.userEmail);
            }
            if (payload.employeeName && payload.employeeName != "") {
                $('#userName').val(payload.employeeName);
            } else if (payload.companyName && payload.companyName != "") {
                $('#userName').val(payload.companyName);
            } else {
                $('#userName').val(payload.userName);
            }
            if (payload.employeePhone && payload.employeePhone != "") {
                $('#userPhone').val(payload.employeePhone);
            } else if (payload.companyPhone && payload.companyPhone != "") {
                $('#userName').val(payload.compcompanyPhoneanyName);
            } else {
                $('#userPhone').val(payload.userPhone);
            }
            if (payload.employeeEmployeeId && payload.employeeEmployeeId != "") {
                $('#userNip').val(payload.employeeName);
            } else if (payload.companyId && payload.companyId != "") {
                $('#userNip').val(payload.companyId);
            } else {
                // $('#userNip').val(payload.userId);
            }
            $('#userEmail').val(payload.companyEmail);
            $('#userName').val(payload.companyName);
            $('#userPhone').val(payload.companyPhone);
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