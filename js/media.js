var Media = Media || {};
Media.SecretKey = '8bthZZPmTkbRmmBqbcDP3VeIaj0PMPt8MAHA83RlPPzBB25YNhS3WhAryiuB7J4O';
Media.ApiEndPoin = 'http://localhost:9000/api';
Media.User = 1;
$.ajaxSetup({
    headers: {'X-Authorization': Media.SecretKey}
});

var media_wrapper = $("#__attachments-view-720"), media_sidebar = $('.media-sidebar')

Media.getSizeImageFromUrl = function(url){
    var tmpImg = new Image();
    tmpImg.src = url; //or  document.images[i].src;
    orgWidth = tmpImg.width;
    orgHeight = tmpImg.height;
    return orgWidth+"x"+orgHeight;
},
Media.bytesToSize = function(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
MediaSystem = {
    refreshMedia: function(e) {
        $.ajax({
            url: Media.ApiEndPoin + '/media/gallery',
            type: "GET",
            data: {user: 1, action: e},
            success: function (data, textStatus, xhr) {
                if(xhr.status == 200){
                    var html = '';
                    $.each(data.files.data, function(index, file) {
                        var thumbnail = '', typeArray =  file.mime_type.split('/'),
                            file_name = '';
                        if (typeArray[0] == 'image') {
                            thumbnail = '<img src="' + file.path + '" draggable="false" alt="' + file.name + '">' ;
                            file_name = '<div class="filename">' +
                                '           <div>' + file.name + '</div>' +
                                '       </div>';
                        }else if(typeArray[0] == 'video'){
                            thumbnail = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi4ynKraQDOVJJVTtnKK_k6j5vLBwPzL-JtZ5ecSSDc_xGUehn">' ;
                            file_name = '<div class="filename">' +
                                '           <div>' + file.name + '</div>' +
                                '       </div>';
                        };
                        html += '<li tabindex="0" role="checkbox" aria-label="' + file.name + '" aria-checked="false" data-action="attach" ' +
                                '       data-id="' + file.id + '" class="attachment save-ready" ' +
                                '       data-uploaded="'+ file.created_at +'"' +
                                '       data-size="' + file.size + '"' +
                                '       data-path="' + file.path + '"' +
                                '       data-name="' + file.name + '"' +
                                '       data-mime="' + typeArray[1] + '">' +
                                '   <div class="attachment-preview js select-attachment type-image subtype-jpeg landscape">' +
                                '       <div class="thumbnail">' +
                                '           <div class="centered">' + thumbnail + '</div>' +
                                '       </div>' + file_name +
                                '   </div>' +
                                '   <button type="button" class="button-link check" tabindex="-1">' +
                                '       <span class="media-modal-icon"></span>' +
                                '       <span class="screen-reader-text">Bỏ chọn</span>' +
                                '   </button>' +
                                '</li>'
                    });
                    media_wrapper.html(html);
                }
            },
            error: function (e) {

            }
        });
    },
    bindActionToElement: function () {
        $(document).on("click", ".button_media", function () {
            media_wrapper.html('');
            media_sidebar.html('');
            window.MediaGallery.result = $(this).data("result"),
            window.MediaGallery.action = $(this).data("action"),
            window.MediaGallery.current = $(this),
            $(this).hasClass("active"),
            MediaSystem.refreshMedia(window.MediaGallery.action)
        }),
        $('#__attachments-view-720').on("click", "li", function (e) {
            $(this).attr('aria-checked', true)
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
                '                                        <div class="dimensions media-view-info"><i class="fa fa-clone"></i>'+ Media.getSizeImageFromUrl($(this).attr('data-path')) +'</div>' +
                '                                        <div class="file-size media-view-info"><i class="fa fa-info"></i>'+ Media.bytesToSize($(this).attr('data-size')) +'</div>' +
                '                                        <div class="uploaded media-view-info"><i class="fa fa-clock-o"></i>'+ $(this).attr('data-uploaded') +'</div>' +
                '                                        <div class="uploaded media-view-info"><i class="fa fa-file"></i>'+ $(this).attr('data-mime') +'</div>' +
                '                                    </div>' +
                '                                </div>' +
                '                                <label class="setting" data-setting="url">' +
                '                                    <span class="name">URL</span>' +
                '                                    <input type="text"' +
                '                                           value="'+ $(this).attr('data-path') +'"' +
                '                                           readonly="">' +
                '                                </label>' +
                '                                <label class="setting" data-setting="title">' +
                '                                    <span class="name">Tiêu đề</span>' +
                '                                    <input type="text" value="'+ $(this).attr("data-name") +'">' +
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
            media_sidebar.html(html);
            $('button.media-button-insert').prop("disabled", false)
        });
    }
};
$(document).ready(function () {
    window.MediaGallery = window.MediaGallery || {},
    MediaSystem.bindActionToElement()
});