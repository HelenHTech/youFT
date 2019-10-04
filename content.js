// window.onload = function() {
// 	document.write('Hello world')
// }

AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "eu-west-1" 
});

var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: "age-verification-hackathon" }
  });

jQuery(document).ready(function() {
    var element = jQuery('#site-navigation')
    jQuery('<button type="button" id="verify-age">Verify me!</button>').appendTo(element)
    jQuery('<video style="display:none;visibility:hidden" id="player" controls autoplay></video>').appendTo(element)
    jQuery('<canvas id="canvas" style="display:none" ></canvas>').appendTo(element)


    navigator.mediaDevices.getUserMedia({video: true})
              .then(gotMedia)

        function gotMedia(mediaStream) {
            let player = document.getElementById('player');
            console.log(mediaStream.getVideoTracks()[0].getSettings().height)
            console.log(mediaStream.getVideoTracks()[0].getSettings().width)
            player.srcObject = mediaStream;
        }

    $("#verify-age").click(function() {
        alert("hello"); // or alert($(this).attr('id'));
            let canvas = document.getElementById('canvas');
            canvas.width = 1280
            canvas.height = 720
            const context = canvas.getContext('2d');
            context.drawImage(player, 0, 0, canvas.width, canvas.height);
            var canvasimg  = canvas.toDataURL("image/png");
            console.log(canvasimg);


                canvas.toBlob(function(img) {
                    var upload = new AWS.S3.ManagedUpload({
                            params: {
                              Bucket: "age-verification-hackathon",
                              Key: "teenager.jpg",
                              Body: img,
                              ACL: "public-read"
                            }
                          });
                        
                          var promise = upload.promise();
                          
                          promise.then(function(data){
                              console.log(data)
                          });

                          $.post( "https://qpylsavnc4.execute-api.eu-west-1.amazonaws.com/prod/getAgeVerification", function( data ) {
                            alert(data)
                          });
                        

                    
                  }, 'image/jpg');

                  navigator.mediaDevices.getUserMedia({video: true})
              .then(function(media){
                  media.getTracks().forEach(track => track.stop())
              })
        
    });

});