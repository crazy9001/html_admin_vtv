var Media = Media || {};
Media.SecretKey = '8bthZZPmTkbRmmBqbcDP3VeIaj0PMPt8MAHA83RlPPzBB25YNhS3WhAryiuB7J4O';
Media.ApiEndPoin = 'http://localhost:9000/api';
Media.Storage = 'http://localhost:9000/storage';
Media.User = 1;
$.ajaxSetup({
    headers: {'X-Authorization': Media.SecretKey}
});

var media_wrapper = $("#__attachments-view-720"), media_sidebar = $('#media-sidebar');

Media.getSizeImageFromUrl = function(url){
    var tmpImg = new Image();
    tmpImg.src = url; //or  document.images[i].src;
    var orgWidth = tmpImg.width;
    var orgHeight = tmpImg.height;
    return orgWidth+"x"+orgHeight;
}
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
            data: {user: Media.User, action: e},
            beforeSend: function() {
                $('.media-toolbar .spinner').addClass('is-active')
            },
            complete: function() {
                $('.media-toolbar .spinner').removeClass('is-active')
            },
            success: function (data, textStatus, xhr) {
                if(xhr.status == 200){
                    var html = '';
                    $.each(data.files.data, function(index, file) {
                        console.log(file);
                        var typeArray =  file.mime_type.split('/'), file_name = '', class_preview = '', btn_play_video = '',
                            thumbMedium = (file.thumbnails) ? Media.Storage + file.thumbnails.medium : 'https://arghaa.com/assets/images/default.png',
                            thumbSmall = file.thumbnails ? Media.Storage + file.thumbnails.small : 'https://arghaa.com/assets/images/default.png';
                        if (typeArray[0] == 'image') {
                            class_preview = 'attachment-preview js-select-attachment type-image subtype-jpeg landscape'
                        }else if(typeArray[0] == 'video'){
                            file_name = '<div class="filename">' +  file.name + '</div>';
                            btn_play_video= '<a class="media-play-button"></a>';
                            class_preview = 'attachment-preview type-video subtype-mp4 landscape';
                        };
                        html += '<li tabindex="0" role="checkbox" aria-label="' + file.name + '" aria-checked="false" data-action="attach" ' +
                                '       data-id="' + file.id + '" class="attachment save-ready" ' +
                                '       data-uploaded="'+ file.created_at +'"' +
                                '       data-size="' + file.size + '"' +
                                '       data-path="' + Media.Storage + file.path + '"' +
                                '       data-name="' + file.name + '"' +
                                '       data-thumb-medium="' + thumbMedium + '"' +
                                '       data-mime-type="' + typeArray[0] + '"' +
                                '       data-mime="' + typeArray[1] + '">' +
                                '   <div class="'+ class_preview +'">' +
                                '       <div class="thumbnail">' +
                                '           <div class="centered"><img src="'+  thumbSmall +'"></div>' +
                                '       </div>' + file_name + btn_play_video +
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
            $(this).attr('aria-checked', true);
            $(this).blur();
            $("#__attachments-view-720 li:not(this)").removeClass('details');
            $(this).toggleClass('details');
            $(this).find('button').css({'display': 'block'});
            var mime_type = $(this).attr('data-mime-type'), thumb = '';
            if(mime_type == 'video'){
                thumb = '<div class="thumbnail thumbnail-video">' +
                        '   <img src="'+ $(this).attr('data-thumb-medium') +'">' +
                        '   <a class="media-play-button"></a>' +
                        '   <div class="hidden-video-player"></div>' +
                        '</div>'
            }else if(mime_type == 'image') {
                thumb = '<div class="thumbnail thumbnail-image">' +
                        '   <img src="'+ $(this).attr('data-thumb-medium') +'">' +
                        '</div>'
            }
            var html = '<div id="attachment-details">' +
                '           <div tabindex="0" data-id="184" class="attachment-details save-ready">' +
                '                                <h2>' +
                '                                    Chi tiết đính kèm <span class="settings-save-status">' +
                '                                        <span class="spinner"></span>' +
                '                                        <span class="saved">Đã lưu.</span>' +
                '                                    </span>' +
                '                                </h2>' +
                '                                <div class="attachment-info">' + thumb +
                '                                    <div class="details">' +
                '                                        <div class="dimensions media-view-info"><i class="fa fa-clone"></i>'+ Media.getSizeImageFromUrl($(this).attr('data-path')) +'</div>' +
                '                                        <div class="file-size media-view-info"><i class="fa fa-info"></i>'+ Media.bytesToSize($(this).attr('data-size')) +'</div>' +
                '                                        <div class="uploaded media-view-info"><i class="fa fa-clock-o"></i>'+ $(this).attr('data-uploaded') +'</div>' +
                '                                        <div class="uploaded media-view-info"><i class="fa fa-file"></i>'+ $(this).attr('data-mime') +'</div>' +
                '                                    </div>' +
                '                                    <div class="MediaVideoFunction">' +
                '                                       <div id="MediaEditThumbVideo" class="MediaBtn BtnMedium"><i class="fa fa-photo"></i> Thay avatar</div>' +
                '                                       <div id="MediaCutVideo" class="MediaBtn BtnMedium"><i class="fa fa-cut"></i> Cắt</div>' +
                '                                       <div id="MediaVideoDownload" class="MediaBtn BtnMedium"><i class="fa fa-download"></i></i> Tải xuống</div>' +
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
                '                            </div>' +
                '         </div>';

            media_sidebar.html(html);
            $('button.media-button-insert').prop("disabled", false);
            $("#attachment-details").slimScroll({height: "auto"})
        });
        $(document).on('click', '.attachment-info .media-play-button', function () {
            var mediaFileChecked = $('[aria-checked="true"]'), urlVideo = mediaFileChecked.attr('data-path'), thumbVideo = mediaFileChecked.attr('data-thumb-medium'),hiddenPlayer = $('.hidden-video-player'),
                imgThumbVideo = $('.attachment-info > .thumbnail-video > img'), btnPlayHidden =  $('.attachment-info > .thumbnail-video > a.media-play-button'),
            html = '<video src="'+ urlVideo +'" class="video-js vjs-default-skin" controls></video>'
            imgThumbVideo.hide();
            btnPlayHidden.hide();
            hiddenPlayer.html(html);
            hiddenPlayer.show();
            var video = document.querySelector('video'),
                player = videojs(video, {
                    "preload": "auto",
                    "autoplay": true,
                    "height"    : 174,
                    "poster": thumbVideo,
                });
            /*player.simpleoverlay({
                'vjs-sample-overlay': {
                    start: 2,
                    end: 10,
                    textContent: 'Hello, world!'
                }
            });*/
        });
    }
};
$(document).ready(function () {
    window.MediaGallery = window.MediaGallery || {},
    MediaSystem.bindActionToElement()
});