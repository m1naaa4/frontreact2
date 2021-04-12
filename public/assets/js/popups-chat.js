$(document).ready(function(){

  var arr = []; // List of users

 $(document).on('click', '.msg_head', function() {
  var chatbox = $(this).parents().attr("rel") ;
  $('[rel="'+chatbox+'"] .msg_wrap').slideToggle('slow');
  return false;
 });
 $(document).on('click', '.minimize-popup', function() {
  var chatbox = $(this).parent().parent().parent().attr("rel") ;
  // alert(chatbox);
  $('[rel="'+chatbox+'"] .msg_wrap').hide();
  return false;
 });


 $(document).on('click', '.close-popup', function() {
    var chatbox = $(this).parent().parent().parent().attr("rel") ;
  // alert(chatbox);
  $('[rel="'+chatbox+'"]').hide();
  arr.splice($.inArray(chatbox, arr), 1);
  displayChatBox();
  return false;
 });



$(document).on('click', '.button-attachments', function() {
  var chatbox = $(this).parent().parent().parent().parent().attr("rel") ;
  $('[rel="'+chatbox+'"] .popup-footer-attachments').toggleClass("popup-attachments-active");
});

 $(document).on('click', '#sidebar-user-box', function() {

  var userID = $(this).attr("class");
  var username = $(this).children().find(".Msgs-User").text() ;

  if ($.inArray(userID, arr) != -1)
  {
      arr.splice($.inArray(userID, arr), 1);
     }

  arr.unshift(userID);

  chatPopup = '<div class="popup-box chat-popup" rel="'+ userID+'">'+
    '<div class="popup-head msg_head" >'+
        '<div class="popup-head-left '+ userID+'">'+username +'</div>'+
        '<div class="popup-head-right"><a class="minimize-popup" href="#!"><i class="uil uil-minus"></i></a><a href="#!" class="close-popup"><i class="uil uil-times"></i></a></div>'+
    '</div>'+
    '<div class="popup-body msg_wrap">'+
      '<div class="popup-messages '+ userID+'">'+
      '<div class="message incoming-message">'+
          '<div class="avatar-wrapper avatar-small"></div>'+
        '<div class="incoming-bubbles">'+
          '<div class="bubble bubble-light message-seen">'+
            '<div class="message-text">Hey anhat!</div>'+
            '<span class="message-status"><i class="uil uil-eye"></i> 1:49AM</span>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="message outcoming-message">'+
        '<div class="outcoming-bubbles">'+
          '<div class="bubble bubble-dark message-seen">'+
            '<span class="message-status">13:51 <i class="uil uil-eye"></i></span>'+
            '<div class="message-text">Hello Boss</div>'+
          '</div>'+
          '<div class="bubble bubble-dark">'+
            '<span class="message-status">13:52 <i class="uil uil-eye-slash"></i></span>'+
            '<div class="message-text">Hello Boss</div>'+
          '</div>'+
        '</div>'+
        '<div class="avatar-wrapper avatar-small"></div>'+
      '</div>'+
      '</div>'+
      '<div id="EmojiPickerPopup" class="popup-footer">'+
      '<input type="text" placeholder="Rédiger votre message..." data-emoji-picker="true">'+
      '<div class="popup-footer-attachments">'+
      '<div class="popup-attachment-item" data-toggle="tooltip" data-placement="left" title="Attach a photo"><input type="file"><span><i class="uil uil-image"></i></span></div>'+
      '<div class="popup-attachment-item" data-toggle="tooltip" data-placement="left" title="Attach a video"><input type="file"><span><i class="uil uil-video"></i></span></div>'+
      '<div class="popup-attachment-item" data-toggle="tooltip" data-placement="left" title="Attach a document"><input type="file"><span><i class="uil uil-file-alt"></i></span></div>'+
      '</div>'+
      '<div class="popup-footer-actions"><button class="button-attachments"><i class="uil uil-paperclip"></i></button><button class="button-send"><i class="uil uil-message"></i></button></div></div>'+
    '</div>'+
  '</div>';

   $(".DadupaChat").append(  chatPopup  );

   displayChatBox();

   new EmojiPicker();
 });

 function displayChatBox(){
     i = 0 ; // start position
  j = 360;  //next position

  $.each( arr, function( index, value ) {
     if(index < 4){
          $('[rel="'+value+'"]').css("right",i);
    $('[rel="'+value+'"]').show();
       i = i+j;
     }
     else{
    $('[rel="'+value+'"]').hide();
     }
        });
 }

});
