jQuery(document).ready(function ($) {

  // document.onreadystatechange = function () {
  //  var state = document.readyState
  //  if (state == 'interactive') {
  //       document.getElementById('wrapper').style.visibility="hidden";
  //  } else if (state == 'complete') {
  //      setTimeout(function(){
  //         document.getElementById('interactive');
  //         document.getElementById('load').style.visibility="hidden";
  //      },1000);
  //  }
  // }


  var DatePciker = document.getElementById('Portfolio');
  if( DatePciker !== null ){
    $('.Portfolio').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 2,
      nextArrow: '<button class="nextArrow"><i class="uil uil-arrow-right"></i></button>',
      prevArrow: '<button class="prevArrow"><i class="uil uil-arrow-left"></i></button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  var DatePciker = document.getElementById('datepicker');
  if( DatePciker !== null ){
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    });
  }
  $(".toggle-password").click(function() {
    $(this).toggleClass("uil-eye uil-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });


  $('[data-toggle="tooltip"]').tooltip();

  $(window).bind('scroll', function () {
    if ( $(window).scrollTop() > 70 ) {
        $('.Dadupa-Header').addClass('Dadupa-Header-Fixed');
    } else {
        $('.Dadupa-Header').removeClass('Dadupa-Header-Fixed');
    }
  });

  $('.reaction-comment').click(function(e){
    e.preventDefault();
    var target = $($(this).attr('href'));
    if(target.length){
      var scrollTo = target.offset().top;
      $('body, html').animate({scrollTop: scrollTo+'px'}, 800);
    }
  });

  $('.reaction-button').click(function(){
    $(this).toggleClass('reaction-clicked');
  });
  $('.reaction-like').click(function(){
    $('.reaction-like').toggleClass('post-liked');
  });
  $('.reaction-comment').click(function(){
    $(this).toggleClass('comments-clicked');
  });
  $('.replay-action').click(function(){
    $(this).closest('.User-Comment').find(".Writing-Reply").show();
  })
  $('.comment-replies-button').click(function(){
    $(this).closest('.User-Comment').find(".Comment-Replies").toggleClass('Toggle-Replies');
  })

  $('.like-action').on('click', function(){
    if (!$(this).hasClass('like__btn--disabled')) {
      updated_likes = parseInt($(this).closest('.User-Comment').find(".count-reactions").html()) + 1;
      $(this).closest('.User-Comment').find(".count-reactions").html(updated_likes);
     }
    $(this).closest('.User-Comment').find(".like-action").attr('disabled', true).addClass('tada');
  });

  $(".PostWrap .Comments-Wrap").hide();
  $(".PostWrap .reaction-comment").click(function(){
    $('.PostWrap .reaction-comment').not(this).closest(".PostFooter").find(".Comments-Wrap").hide();
    $(this).closest(".PostFooter").find(".Comments-Wrap").toggle();
  });

  $(".PostWrap .PostHeader .PostOptions .PostOptions-BTN").click(function(){
    $('.PostWrap .PostHeader .PostOptions .PostOptions-BTN').not(this).closest(".PostWrap").find(".PostOptions-List").removeClass('PostOptions-ListShow');
    $(this).closest(".PostWrap").find(".PostOptions-List").toggleClass('PostOptions-ListShow');
  });

  $(".Conversation-BTN").click(function(){
    $(this).closest(".Messenger-head").find(".ConversationOptions-List").toggleClass('ConversationOptions-ListShow');
  });

  $(".Messenger-PreferencesBTN").click(function(){
    $(this).closest(".Messenger-ListHeader").find(".Preferences-List").toggleClass('Preferences-ListShow');
  });

  var emoji = document.getElementById('EmojiPicker');

  if(emoji !== null){
    new EmojiPicker();
  }

  $(".Section-Item .CollapseUpdate-BTN").click(function(){
    $(this).closest(".Section-Item").find(".CollapsUpdate").slideToggle();
    $(this).parent().siblings(".Section-Item").children(".CollapsUpdate").slideUp();
    return false;
  });

  // #####
  var width = $(window).width();
  // #####

  if( (width <= 992) ){
    $('.Dadupa-User').click(function() {
      $('.Sidebar-Nav').toggleClass('Active-Sidebar-Nav');
      $('.Dadupa-Overlay').toggleClass('Active-Overlay');
      $('body').toggleClass('NoScroll');
    });
    $('.Dadupa-Overlay').click(function() {
      $('.Sidebar-Nav').removeClass('Active-Sidebar-Nav');
      $('.Dadupa-Overlay').removeClass('Active-Overlay');
      $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
      $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
      $('body').removeClass('NoScroll');
    });
  }

  if ( (width <= 768) ){

    $('.filter-mobile button').click(function(){
      $('.Filter-Form').toggle('active-filter-form');
    });

    $('.Mobile-Filter .Dadupa-Filter button').click(function() {
      $('.Filter-Row').slideToggle('slow');
    });

    $('.Dadupa-Close').click(function() {
      $('.Sidebar-Nav').removeClass('Active-Sidebar-Nav');
      $('.Dadupa-Overlay').removeClass('Active-Overlay');
      $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
      $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
      $('body').removeClass('NoScroll');
    });
    // $('.Dadupa-Message').click(function(){
    //   $('.Dadupa-Msgs-Box').toggleClass('Msgs-Box-Active');
    //   $('.Dadupa-Overlay').toggleClass('Active-Overlay');
    //   $('body').toggleClass('NoScroll');
    // });
    $('.Dadupa-Alert').click(function(){
      $('.Dadupa-Notifs-Box').toggleClass('Notifs-Box-Active');
      $('.Dadupa-Overlay').toggleClass('Active-Overlay');
      $('body').toggleClass('NoScroll');
    });

    $('.Comments-Wrap').insertAfter('.Co-Porteurs');
    $('.Contact-Widget').insertAfter('.Left-Side');
    $('.Widget-Conseils').insertAfter('.Left-Side');
    $('.Widget-Sponsored').insertAfter('.Left-Side');
  } else {
    $('.Dadupa-User').click(function(e){
      $('.Dadupa-Mini-Profile').toggleClass('Mini-Profile-Active');
      $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
      $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
      e.stopPropagation()
    });

    $('.Dadupa-Message-Popup').click(function(){
      $('.Dadupa-Msgs-Box').toggleClass('Msgs-Box-Active');
      $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
      $('.Dadupa-Mini-Profile').removeClass('Mini-Profile-Active');
    });

    $('.Dadupa-Alert-Popup').click(function(){
      $('.Dadupa-Notifs-Box').toggleClass('Notifs-Box-Active');
      $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
      $('.Dadupa-Mini-Profile').removeClass('Mini-Profile-Active');
    });

    $('.Add-New').click(function(e){
      $('.Dadupa-Popup-DropDown').toggleClass('Dadupa-Popup-DropDown_Active');
      $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
      $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
      e.stopPropagation()
    });

    // Hide dropdown menu on click outside
    $(document).on("click", function(event){
        if(!$(event.target).closest(".Dadupa-User").length){
            $('.Dadupa-Mini-Profile').removeClass('Mini-Profile-Active');
        }
        if(!$(event.target).closest(".Dadupa-Message-Popup").length){
            $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
        }
        if(!$(event.target).closest(".Dadupa-Alert-Popup").length){
            $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
        }
        if(!$(event.target).closest(".Messenger-PreferencesBTN").length){
            $('.Preferences-List').removeClass('Preferences-ListShow');
        }
        if(!$(event.target).closest(".Conversation-BTN").length){
            $('.ConversationOptions-List').removeClass('ConversationOptions-ListShow');
        }
    });
  }

  // Select on pressing COPY
  var els_copy = document.querySelectorAll("[data-copy]");
  for (var i = 0; i < els_copy.length; i++) {
    var el = els_copy[i];
    el.addEventListener("submit", function(e) {
      e.preventDefault();
      var text = e.target.querySelector('input[type="text"]').select();
      document.execCommand("copy");
    });
  }

  // Select all text when pressing inside text field
  var els_selectAll = document.querySelectorAll("[data-click-select-all]");
  for (var i = 0; i < els_selectAll.length; i++) {
    var el = els_selectAll[i];
    el.addEventListener("click", function(e) {
      e.target.select();
    });
  }




  var commendBoxID = document.getElementById('comment-box');

  if(commendBoxID !== null){

    var $commentBox = $('#comment-box');

    $commentBox.lightGallery({
        appendSubHtmlTo: '.lg-item',
        addClass: 'fb-comments',
        mode: 'lg-fade',
        download: false,
        enableDrag: false,
        enableSwipe: false
    });

    $commentBox.on('onAfterSlide.lg', function(event, prevIndex, index) {
        if (!$('.lg-outer .lg-item').eq(index).attr('data-fb')) {
            try {
                $('.lg-outer .lg-item').eq(index).attr('data-fb', 'loaded');
                FB.XFBML.parse();
            } catch (err) {
                $(window).on('fbAsyncInit', function() {
                    $('.lg-outer .lg-item').eq(index).attr('data-fb', 'loaded');
                    FB.XFBML.parse();
                });
            }
        }
    });

  }

  var multicommendBoxID = document.getElementById('multi-comment-box');

  if(commendBoxID !== null){

    var $multicommentBox = $('#multi-comment-box');

    $multicommentBox.lightGallery({
        appendSubHtmlTo: '.lg-item',
        addClass: 'fb-comments',
        mode: 'lg-fade',
        download: false,
        enableDrag: false,
        enableSwipe: false
    });

    $multicommentBox.on('onAfterSlide.lg', function(event, prevIndex, index) {
        if (!$('.lg-outer .lg-item').eq(index).attr('data-fb')) {
            try {
                $('.lg-outer .lg-item').eq(index).attr('data-fb', 'loaded');
                FB.XFBML.parse();
            } catch (err) {
                $(window).on('fbAsyncInit', function() {
                    $('.lg-outer .lg-item').eq(index).attr('data-fb', 'loaded');
                    FB.XFBML.parse();
                });
            }
        }
    });

  }

  $('.minimize-popup').click(function(){
    $('.popup-body').slideDown();
  })

  $('#vmobile-pills-tab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  $('.ConversationClose').click(function(){
    $('.tab-pane').removeClass('show');
    $('.tab-pane').removeClass('active');
  });
});
