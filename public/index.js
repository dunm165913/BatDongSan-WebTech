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
            $('.loading').show();
            axios.post('/api/user/dangki', { sodienthoai, matkhau, email, ngaysinh, diachi, gioitinh }).then(function (response) {
                console.log(response);
                if (response.data.code == 1000) {
                    // Dang ky thanh cong
                    axios.post('/api/user/login', { sodienthoai, matkhau }).then(function (response) {
                        if (response.data.code == 1000) {
                            $('.loading').hide();
                            $('#modalDangKy').modal('hide');
                            $.cookie('tokenId', response.data.data, { path: "/" });
                            isLogin();
                        }
                    });
                } else {
                    $('.loading').hide();
                    alert("Đã có lỗi xảy ra. Vui lòng thử lại");
                }
            });
        }
    },
    dangNhap: function () {
        if (this.$formDangNhap.valid()) {
            let sodienthoai = $('input[name="loginNumber"]').val();
            let matkhau = $('input[name="loginPassword"').val();
            $('.loading').show();
            axios.post('/api/user/login', { sodienthoai, matkhau }).then(function (response) {
                if (response.data.code == 1000) {
                    $('.loading').hide();
                    $('#modalDangNhap').modal('hide');
                    $.cookie('tokenId', response.data.data, { path: "/" });
                    isLogin();
                }
                else {
                    $('.loading').hide();
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
        axios.get('/api/sanpham/getnsanpham').then(function (response) {
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
        axios.get('/api/sanpham/getnsanpham?id_loaisp=2').then(function (response) {
            if (response.data.code == 1000) {
                response.data.data.forEach(element => {
                    $('.danhsach').append(TinTuc.buildNhaDatBan(element))
                });
            }
        })
    },
    getNhaDatThue: function () {
        axios.get('/api/sanpham/getnsanpham?id_loaisp=3').then(function (response) {
            if (response.data.code == 1000) {
                response.data.data.forEach(element => {
                    $('.danhsach').append(TinTuc.buildNhaDatBan(element))
                });
            }
        })
    },
    getCanMuaThue: function () {
        axios.get('/api/sanpham/getnsanpham?id_loaisp=4').then(function (response) {
            if (response.data.code == 1000) {
                response.data.data.forEach(element => {
                    $('.danhsach').append(TinTuc.buildNhaDatBan(element))
                });
            }
        })
    },
    getDuAn: function () {
        axios.get('/api/duan/getnduan').then(function (response) {
            console.log(response);
            if (response.data.code == 1000) {
                response.data.data.forEach(element => {
                    $('.danhsach').append(TinTuc.buildDuAn(element))
                });
            }
        })
    },
    getBaiViet: function () {
        axios.get('/api/tintuc/getntintuc').then(function (response) {
            response.data.forEach((element, i) => {
                if (i == 0) {
                    $('.thongtinanh').append(TinTuc.buildBaiVietAnh(element));
                } else {
                    $('.bangthongtinchu table').append(TinTuc.buildBaiViet(element));
                }
            });
        })
    },
    getBaiVietDetail: function () {
        let urlString = window.location.href;
        let url = new URL(urlString);
        let id = url.searchParams.get('id');
        axios.get('/api/tintuc/getinfor?id=' + id).then(function (response) {
            if (response.data.code == 1000) {
                $('.noidung').append(TinTuc.buildTinTucDetail(response.data.data))
            }
        });
    },
    getDuAnDetail: function () {
        let urlString = window.location.href;
        let url = new URL(urlString);
        let id = url.searchParams.get('id');
        axios.get('/api/duan/getinfor?id=' + id).then(function (response) {
            console.log(response);
            if (response.data.code == 1000) {
                $('.noidung').append(TinTuc.buildDuAnDetail(response.data.data))
            }
        });
    },
    buildTinTucItem(data) {
        let element1 = '';
        element1 += '<div class="iteminrao container">';
        element1 += '	<div class="row"><div class="col-2 py-2"><img src="' + data.image +'" width="120" height="90"></div>';
        element1 += '	  <div class="col-10"><div class="tieudetin"><a href="/chitiet?id='+data.id+'" title="'+data.tensp+'">' + data.tensp + '</a></div>';
        element1 += '	  <div class="ndtin">';
        element1 += '		<div class="gia">';
        element1 += '		  <p>Giá:</p>' + data.gia + '';
        element1 += '		</div>';
        element1 += '		<div class="gia">';
        element1 += '		  <p>Diện tích:</p>' + data.dientich + 'm2';
        element1 += '		</div>';
        element1 += '	  </div></div>';
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
    },
    buildTinTucDetail(data) {
        let element = '';
        element += '<div class="tieudechitiet">' + data.ten + '</div>';
        element += '<div class="thongtinchitiet">';
        element += '	<p style="color: gray;font-weight: 500;">Thông tin mô tả</p>';
        element += '	<p>' + data.noidung + '</p>';
        element += '</div>';
        element += '<div class="anhchitiet">';
        element += '	<img src="' + data.image + '" alt="">';
        element += '</div>';
        return element;
    },
    buildNhaDatBan(data) {
        let element = '';
        element += '<div class="danhsach__item">';
        element += '    <p class="fa fa-star" style="margin:0"><a href="/chitiet?id='+data.id+'" title="'+data.tensp+'">'+data.tensp+'</a></p>';
        element += '    <div class="noidung ">';
        element += '    <div style="display:flex;"><img src="' + data.image + '" width="175" height="116"> <strong>Giá:&#8195;</strong><p>  ' + data.gia +'</p><strong>&#8195;Diện tích:&#8195;</strong><p>'+data.dientich+'</p></div>';
        element += '    </div>';
        element += '    </div>';
        return element;
    },
    buildBaiVietAnh(data) {
        let element = '';
        element += '<div class="item">';
        element += '	<img src="'+data.image+'" alt="" />';
        element += '</div>';
        element += '<div class="item">';
        element += '	<div class="tieude">';
        element += '	  <h4><a href="/chitietbaiviet?id='+data.id+'">'+data.ten+'</a></h4>';
        element += '	</div>';
        element += '<div class="ttchitiet"></div>';
        return element;
    },
    buildBaiViet(data) {
        let element = '';
        element += '<tr>';
        element += '  <td><a href="/chitietbaiviet?id='+data.id+'">'+data.ten+'</a></td>';
        element += '</tr>';
        return element;
    },
    buildDuAn(data) {
        let element = '';
        element += '<div class="duanWrapper col-3">';
        element += '<div class="p-main-image-crop">';
        element += '	<a class="product-avatar" href="/chitietduan?id='+data.id+'" title="'+data.ten+'" onclick="">';
        element += '		<img class="product-avatar-img" src="'+data.image+'" alt="'+data.ten+'">';
        element += '	</a>';
        element += '</div>';
        element += '<div class="p-content">';
        element += '	<div class="p-main-text" style="text-rendering: optimizelegibility;"><a href="/chitietduan?id='+data.id+'">'+data.ten+'</a></div>';
        element += '</div>';
        element += '</div>';
        return element;
    },
    buildDuAnDetail(data) {
        let element = '';
        element += '<div class="tieudechitiet">' + data.ten + '</div>';
        element += '<div class="thongtinchitiet">';
        element += '	<p style="color: gray;font-weight: 500;">Thông tin mô tả</p>';
        element += '	<p>' + data.mota + '</p>';
        element += '</div>';
        element += '<div class="anhchitiet">';
        element += '	<img src="' + data.image + '" alt="">';
        element += '</div>';
        return element;
    },
}