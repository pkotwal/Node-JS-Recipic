$(function() {

  $('#theinputfield').change(function() {
    console.log('picked file',
    $('#theinputfield')[0].files[0]);
  });

  function allowDrop(ev) {
      ev.preventDefault();
  }

  function drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
  }
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
})
