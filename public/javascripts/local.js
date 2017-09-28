$(function() {

  $('#theinputfield').change(function() {
    console.log('picked file',
    $('#theinputfield')[0].files[0]);
  });

  // $('#theform').submit(function(e) {
  //   console.log('form submit')
  //   e.preventDefault();
  // });

  $('#theAjaxButton').click(function(e) {
    // how to select the file itself
    var f = $('#theinputfield')[0].files[0];
    if (!f) {
      alert('pick a file');
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
