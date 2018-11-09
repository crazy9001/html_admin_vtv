var $ = window.$; // use the global jQuery instance

if ($("#mediaZoneUpload").length > 0) {
    var mediaDropzone = new Dropzone("#mediaZoneUpload", {
        headers: {
            'X-Authorization': '8bthZZPmTkbRmmBqbcDP3VeIaj0PMPt8MAHA83RlPPzBB25YNhS3WhAryiuB7J4O'
        },
        // Setup chunking
        chunking: true,
        method: "POST",
        maxFilesize: 2048,
        chunkSize: 2000000,
        // If true, the individual chunks of a file are being uploaded simultaneously.
        dictDefaultMessage : 'Chọn file upload !',
        dictFileTooBig: "File quá lớn, file tối đa : {{maxFilesize}} MB.",
        success: function(file, response){
            console.log(response);
        }
    });
    // Append token to the request - required for web routes
    mediaDropzone.on('sending', function (file, xhr, formData) {
        formData.append("user_id", 1);
    });
};
