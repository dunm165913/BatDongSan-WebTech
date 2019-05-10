const Authenciate = {
    $formDangKy: $('#formDangKy'),
    $formDangNhap: $('#formDangNhap'),
    validate: function () {
        this.$formDangKy.validate({
            rules: {
                username: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    minlength: 6,
                },
                passwordconf: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password",
                },
                sdt: {
                    required: true,
                    digits: true,
                    minlength: 9,
                    maxlength: 11,
                }
            },
        });
        this.$formDangNhap.validate({
            rules: {
                loginNumber: {
                    required: true,
                    digits: true,
                    minlength: 9,
                    maxlength: 11,
                },
                loginPassword: {
                    required: true,
                    minlength: 6,
                }
            },
            onkeyup: function (element) {
                $(element).valid();
            }
        });
    },
    dangKy: function () {
        if (this.$formDangKy.valid()) {
            let sodienthoai = $('input[name="sdt"]').val();
            let matkhau = $('input[name="password"').val();
            let email = $('input[name="email"').val();
            let ngaysinh = $('#tuoi').val();
            let diachi = $('input[name="diachi"]').val();
            let gioitinh = $('#gender :selected').val();
            waitingDialog.show();
            axios.post('/api/user/dangki', { sodienthoai, matkhau, email, ngaysinh, diachi, gioitinh }).then(function (response) {
                if (response.data.code == 1000) {
                    // Dang ky thanh cong
                    axios.post('/api/user/login', { sodienthoai, matkhau }).then(function (response) {
                        if (response.data.code == 1000) {
                            waitingDialog.hide();
                            $('#modalDangKy').modal('hide');
                            $.cookie('tokenId', response.data.data, { path: "/" });
                            isLogin();
                        }
                    });
                } else {
                    waitingDialog.hide();
                    alert("Đã có lỗi xảy ra. Vui lòng thử lại");
                }
            });
        }
    },
    dangNhap: function () {
        if (this.$formDangNhap.valid()) {
            let sodienthoai = $('input[name="loginNumber"]').val();
            let matkhau = $('input[name="loginPassword"').val();
            waitingDialog.show();
            axios.post('/api/user/login', { sodienthoai, matkhau }).then(function (response) {
                if (response.data.code == 1000) {
                    waitingDialog.hide();
                    $('#modalDangNhap').modal('hide');
                    $.cookie('tokenId', response.data.data, { path: "/" });
                    isLogin();
                }
                else {
                    waitingDialog.hide();
                    alert('Số điện thoại hoặc mật khẩu không đúng!');
                }
            });
        }
    },
    dangXuat: function () {
        $.removeCookie('tokenId', { path: "/" });
        isLogin();
    }
}