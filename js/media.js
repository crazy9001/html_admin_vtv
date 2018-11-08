$(document).ready(function () {
    function getSizeImageFromUrl(url){
        var tmpImg = new Image();
        tmpImg.src = url; //or  document.images[i].src;
        orgWidth = tmpImg.width;
        orgHeight = tmpImg.height;
        return orgWidth+"x"+orgHeight;
    }
    function getImageSizeInBytes(imgURL) {
        var request = new XMLHttpRequest();
        request.open("HEAD", imgURL, false);
        request.send(null);
        var headerText = request.getAllResponseHeaders();
        var re = /Content\-Length\s*:\s*(\d+)/i;
        re.exec(headerText);
        return parseInt(RegExp.$1);
    }
    function getFileNameFromUrl(url){
        var index = url.lastIndexOf("/") + 1;
        return filename = url.substr(index);
    }
    $('#__attachments-view-720 li').on('click', function () {
        $(this).blur()
        $("#__attachments-view-720 li:not(this)").removeClass('details');
        $(this).toggleClass('details');
        $(this).find('button').css({'display': 'block'});
        var html = '<div tabindex="0" data-id="184" class="attachment-details save-ready">' +
            '                                <h2>' +
            '                                    Chi tiết đính kèm <span class="settings-save-status">' +
            '                                        <span class="spinner"></span>' +
            '                                        <span class="saved">Đã lưu.</span>' +
            '                                    </span>' +
            '                                </h2>' +
            '                                <div class="attachment-info">' +
            '                                    <div class="thumbnail thumbnail-image">' +
            '                                        <img src="'+ $(this).find('.centered img').attr('src') +'"' +
            '                                             draggable="false" alt="">' +
            '                                    </div>' +
            '                                    <div class="details">' +
            '                                        <div class="filename">'+ getFileNameFromUrl($(this).find('.centered img').attr('src')) +'</div>' +
            '                                        <div class="uploaded">11 Tháng Mười, 2018</div>' +
            '                                        <div class="file-size">209KB</div>' +
            '                                        <div class="dimensions">'+ getSizeImageFromUrl($(this).find('.centered img').attr('src')) +'</div>' +
            '                                        <a class="edit-attachment"' +
            '                                           href="http://dienmaycuonglinh.com/wp-admin/post.php?post=184&amp;action=edit&amp;image-editor"' +
            '                                           target="_blank">Sửa ảnh</a>' +
            '                                        <button type="button" class="button-link delete-attachment">Xóa vĩnh viễn' +
            '                                        </button>' +
            '                                        <div class="compat-meta">' +
            '                                        </div>' +
            '                                    </div>' +
            '                                </div>' +
            '                                <label class="setting" data-setting="url">' +
            '                                    <span class="name">URL</span>' +
            '                                    <input type="text"' +
            '                                           value="'+ $(this).find('.centered img').attr('src') +'"' +
            '                                           readonly="">' +
            '                                </label>' +
            '                                <label class="setting" data-setting="title">' +
            '                                    <span class="name">Tiêu đề</span>' +
            '                                    <input type="text" value="'+ $(this).attr("aria-label") +'">' +
            '                                </label>' +
            '                                <label class="setting" data-setting="caption">' +
            '                                    <span class="name">Chú thích</span>' +
            '                                    <textarea></textarea>' +
            '                                </label>' +
            '                                <label class="setting" data-setting="alt">' +
            '                                    <span class="name">Văn bản thay thế</span>' +
            '                                    <input type="text" value="">' +
            '                                </label>' +
            '                                <label class="setting" data-setting="description">' +
            '                                    <span class="name">Mô tả</span>' +
            '                                    <textarea></textarea>' +
            '                                </label>' +
            '                            </div>' +

            '                            <div class="attachment-display-settings">' +
            '                                <h2>Tùy chọn hiển thị nội dung đính kèm</h2>' +
            '                                <label class="setting">' +
            '                                    <span>Căn chỉnh</span>' +
            '                                    <select class="alignment" data-setting="align" data-user-setting="align">' +

            '                                        <option value="left">' +
            '                                            Trái' +
            '                                        </option>' +
            '                                        <option value="center">' +
            '                                            Chính giữa' +
            '                                        </option>' +
            '                                        <option value="right">' +
            '                                            Phải' +
            '                                        </option>' +
            '                                        <option value="none" selected="">' +
            '                                            Trống' +
            '                                        </option>' +
            '                                    </select>' +
            '                                </label>' +

            '                                <div class="setting">' +
            '                                    <label>' +
            '                                        <span>Liên kết tới</span>' +
            '                                        <select class="link-to" data-setting="link" data-user-setting="urlbutton">' +
            '                                            <option value="none" selected=""> Trống </option>' +
            '                                            <option value="file"> Tập tin đa phương tiện </option>' +
            '                                            <option value="post"> Trang nội dung đính kèm </option>' +
            '                                            <option value="custom"> URL tùy chỉnh </option>' +
            '                                        </select>' +
            '                                    </label>' +
            '                                    <input type="text" class="link-to-custom hidden" data-setting="linkUrl">' +
            '                                </div>' +
            '                                <label class="setting">' +
            '                                    <span>Kích cỡ</span>' +
            '                                    <select class="size" name="size" data-setting="size" data-user-setting="imgsize">' +
            '                                        <option value="full" selected="selected">' +
            '                                            Kích thước đầy đủ – 960 × 1280' +
            '                                        </option>' +
            '                                    </select>' +
            '                                </label>' +

            '                            </div>';
        $('.media-sidebar').html(html);
        $('button.media-button-insert').prop("disabled", false)
    });

    /*$('.tabs').bind('change', function (e) {
        var now_tab = e.target // activated tab

        // get the div's id
        var divid = $(now_tab).attr('href').substr(1);

        $.getJSON('xxx.php').success(function(data){
            $("#"+divid).text(data.msg);
        });
    })*/

});