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
const TinTuc = {
    getTinTuc: function () {
        axios.get('/api/sanpham/getnsanpham?id=30').then(function (response) {
            if (response.data.code == 1000) {
                response.data.data.forEach(element => {
                    $('.listtinrao').append(TinTuc.buildTinTucItem(element));
                });
            }
        });
    },
    getDetail: function () {
        let urlString = window.location.href;
        let url = new URL(urlString);
        let id = url.searchParams.get('id');
        axios.get('/api/sanpham/getinfor?id=' + id).then(function (response) {
            if (response.data.code == 1000) {
                $('.noidung').append(TinTuc.buildDetail(response.data.data[0]))
            }
        });
    },
    getNhaDatBan: function () {
        axios.get('/api/sanpham/getnsanpham?id=30&&id_loaisp=2').then(function (response) {
            console.log(response);
        })
    },
    buildTinTucItem(data) {
        let element1 = '';
        element1 += '<div class="iteminrao">';
        element1 += '	<div class="tin">';
        element1 += '	  <div class="tieudetin"><a href="/chitiet?id='+data.id+'">' + data.tensp + '</a></div>';
        element1 += '	  <div class="ndtin">';
        element1 += '		<div class="gia">';
        element1 += '		  <p>Giá:</p>' + data.gia + '';
        element1 += '		</div>';
        element1 += '		<div class="gia">';
        element1 += '		  <p>Diện tích:</p>' + data.dientich + 'm2';
        element1 += '		</div>';
        element1 += '	  </div>';
        element1 += '	</div>';
        element1 += '</div>';
        return element1;
    },
    buildDetail(data) {
        let element = '';
        element += '<div class="tieudechitiet">' + data.tensp + '</div>';
        element += '<p><strong>Khu vực: </strong>' + data.diachi + '</p>';
        element += '<p><strong>Giá: </strong>' + data.gia + '<strong>&#8195;Diện tích: </strong>' + data.dientich + '</p>';
        element += '<div class="thongtinchitiet">';
        element += '	<p style="color: gray;font-weight: 500;">Thông tin mô tả</p>';
        element += '	<p>' + data.mota_soluoc + '</p>';
        element += '</div>';
        element += '<div class="anhchitiet">';
        element += '	<img src="' + data.image + '" alt="">';
        element += '</div>';
        return element;
    }
}