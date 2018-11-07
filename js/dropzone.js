var $ = window.$; // use the global jQuery instance

if ($("#mediaZoneUpload").length > 0) {

    var token = $('input[name=_token]').val();
    var mediaDropzone = new Dropzone("#mediaZoneUpload", {
        // Setup chunking
        chunking: true,
        method: "POST",
        maxFilesize: 2048,
        chunkSize: 2000000,
        // If true, the individual chunks of a file are being uploaded simultaneously.
        parallelChunkUploads: false,
        dictDefaultMessage : 'Chọn file upload !',
        dictFileTooBig: "File quá lớn, file tối đa : {{maxFilesize}} MB.",
    });

};



// Append token to the request - required for web routes
mediaDropzone.on('sending', function (file, xhr, formData) {
    formData.append("_token", token);
});