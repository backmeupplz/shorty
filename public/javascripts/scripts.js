$(function (){
  $("#shorten_button").click(shortenUrl);
  $("#reset_button").click(resetUI);
  $("#result_url").click(copyResult);
  $("#copy_button").click(copyResult);

  function shortenUrl() {
    var longUrl = $("#long_url").val();
    $("#shorten_button").addClass("disabled");
    $("#shorten_input").removeClass("has-error");
    $("#long_url_error").addClass("hidden");
    participantsRequest = $.post("address", {
      long_url: longUrl,
    }, function (data, status) {
      $("#shorten_button").removeClass("disabled");
      if (status === 'success') {
        if (data.error) {
          $("#shorten_input").addClass("has-error");
          $("#long_url_error").removeClass("hidden");
          $("#long_url_error").text(data.error);
        } else {
          $("#shorten_input").addClass("hidden");
          $("#shorten_output").removeClass("hidden");
          $("#result_url").empty();
          $("#result_url").append(data.result);
        }
      } else {
        $("shorten_input").addClass("has-error");
      }
    });
  }

  function resetUI() {
    $("#shorten_input").removeClass("hidden");
    $("#shorten_output").addClass("hidden");
    $("#shorten_input").removeClass("has-error");
    $("#long_url_error").addClass("hidden");
    $("#long_url").val('');
  }

  function copyResult() {
    copyToClipboard($("#result_url"));
  }

  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }
});
