var $ = window.$; // use the global jQuery instance

if ($("#mediaZoneUpload").length > 0) {
    var mediaDropzone = new Dropzone("#mediaZoneUpload", {
        headers: {
            'X-Authorization': Media.SecretKey
        },
        url: Media.ApiEndPoin + '/upload',
        // Setup chunking
        chunking: true,
        method: "POST",
        maxFilesize: 2048,
        chunkSize: 2000000,
        // If true, the individual chunks of a file are being uploaded simultaneously.
        dictDefaultMessage : '<img src="http://www.screencast.com/img/library/graphic-upload-area.svg" style="max-width: 9rem;display: block;margin: auto auto .25rem;"><div class="uploader-active-text">Drag and drop files here</div>',
        dictFileTooBig: "File quá lớn, file tối đa : {{maxFilesize}} MB.",
        success: function(file, response){
            console.log(response);
        }
    });
    // Append token to the request - required for web routes
    mediaDropzone.on('sending', function (file, xhr, formData) {
        formData.append("user", Media.User);
    });
    mediaDropzone.on("uploadprogress", function(file, progress, bytesSent) {
        progress = bytesSent / file.size * 100;
        $('.dz-upload').width(progress + "%");
    });
    mediaDropzone.on("complete", function(file) {
        mediaDropzone.removeFile(file);
    });
};
