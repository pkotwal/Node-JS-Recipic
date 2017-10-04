$(function() {

  $('#theinputfield').change(function() {
    console.log('picked file',
    $('#theinputfield')[0].files[0]);
    $('.file-name').html($('#theinputfield')[0].files[0].name);
  });

  $('#theAjaxButton').click(function(e) {
    // how to select the file itself
    $('#errorDiv').css('display', 'none');

    var f = $('#theinputfield')[0].files[0];
    if (!f) {
      // alert('pick a file');
      $('#errorDiv').css('display', 'inline-block');
      $('#errorText').html("Select an Image to upload");
      return;
    }

    // create the
    var fd = new FormData();
    fd.append('ajaxfile', f);

    $.ajax({
      url: '/upload-file-ajax',
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          $('#errorDiv').css('display', 'inline-block');
          $('#errorText').html(data.Error);
          // alert(data.Error);
        }else{
          window.location = "/search?s1="+data.Search+"&s2="+data.Search2+"&s3="+data.Search3+"&img="+data.Img;
        }
        $('#ajaxResponse').html(JSON.stringify(data));

      }
    });

  });

  function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#theinputfield").change(function(){
    readURL(this);
});
})
