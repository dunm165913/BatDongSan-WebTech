var waitingDialog = waitingDialog || (function ($) {
    'use strict';
    //$(".page-loader").show();
    // Creating modal dialog's DOM
    var $dialog = $(
        '<div id="loading-modal"><div id="loading-text"><i class="fa fa-spinner fa-spin" style="font-size:60px"></i> đang xử lý...</div></div>');

    return {
        /**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
        show: function (message, options, bodyHtml) {
            // Assigning defaults
            if (typeof options === 'undefined' || options == null) {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            var settings = $.extend({
                dialogSize: 'm',
                progressType: '',
                onHide: null // This callback runs after the dialog was hidden
            }, options);

            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    settings.onHide.call($dialog);
                });
            }

            if (bodyHtml) {
                $dialog.find('.modal-body').html(bodyHtml);
            }
            // Opening dialog
            $dialog.modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
        },
        /**
		 * Closes dialog
		 */
        hide: function () {
            $dialog.modal('hide');
        }
    };

})(jQuery);

function isLogin() {
    let element = '';
    element += '<div class="itemtop">';
    element += '  <a href=""><img src="img/banxehoi.png" />Oto.com.vn</a>';
    element += '</div>';
    element += '<div class="itemtop xanh">';
    element += '  <a href=""><img src="img/plus.png" />Đăng rao tin</a>';
    element += '</div>';
    // element += '<div class="itemtop">';
    // element += '  <img src="img/register.png" />'+sdt+'';
    // element += '</div>';
    element += '<div class="itemtop" onclick="Authenciate.dangXuat()">';
    element += '  <img src="img/login.png" />Đăng xuất';
    element += '</div>';
    element += '<div class="itemtop">';
    element += '  <a href=""><img src="img/english.png" />English</a>';
    element += '</div>';
    let element1 = '';
    element1 += '<div class="itemtop">';
    element1 += '  <a href=""><img src="img/banxehoi.png" />Oto.com.vn</a>';
    element1 += '</div>';
    element1 += '<div class="itemtop xanh">';
    element1 += '  <a href=""><img src="img/plus.png" />Đăng rao tin</a>';
    element1 += '</div>';
    element1 += '<div class="itemtop dangki" data-toggle="modal" href="#modalDangKy">';
    element1 += '  <img src="img/register.png" />Đăng ký';
    element1 += '</div>';
    element1 += '<div class="itemtop dangnhap" data-toggle="modal" href="#modalDangNhap">';
    element1 += '  <img src="img/login.png" />Đăng nhập';
    element1 += '</div>';
    element1 += '<div class="itemtop">';
    element1 += '  <a href=""><img src="img/english.png" />English</a>';
    element1 += '</div>';
    let tokenID = $.cookie('tokenId');
    $('#navBar').html('');
    if (tokenID) {
        $('#navBar').append(element);
    }
    else {
        $('#navBar').append(element1);
    }
}