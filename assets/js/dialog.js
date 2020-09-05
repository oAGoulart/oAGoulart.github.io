'use strict';

var toggleDialog = function() {
  $(".dialog-modal, #dialog-background, #dialog-close").click(function() {
    $("#dialog, #dialog-background").toggleClass("is-active");
  });
}

$(document).ready(toggleDialog);
