jQuery(document).ready(function ($) {

var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;

$('.form-wizard').addClass('mobile-heigth');
$(".next").click(function(){
    if($("#form-wizard").valid()){
      if(animating) return false;

      animating = true;

      current_fs = $(this).parent();

      next_fs = $(this).parent().next();

      previous_fs = $(this).parent().next();

      $(".form-wizard").removeClass('mobile-heigth');
      $(".form-wizard").addClass('move-form');
      $("#wizardbar li").eq($("fieldset").index(current_fs)).addClass("done");
      $("#wizardbar li").eq($("fieldset").index(next_fs)).addClass("active");
      next_fs.show();
      current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
          scale = 1 - (1 - now) * 0.2;
          left = (now * 50)+"%";
          opacity = 1 - now;
          current_fs.css({
            'transform': 'scale('+scale+')',
          });
          next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: 500,
        complete: function(){
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeOutQuint'
      });
    }

});

$(".previous").click(function(){
  if(animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  $(".social-login").show();
  $(".form-wizard").removeClass('move-form');
  //de-activate current step on progressbar
  $("#wizardbar li").eq($("fieldset").index(previous_fs)).removeClass("done");
  $("#wizardbar li").eq($("fieldset").index(current_fs)).removeClass("active");
  // $("#progressbar li").eq($("fieldset").index(current_fs)).addClass("active");

  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = ((1-now) * 50)+"%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({'left': left});
      previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
    },
    duration: 300,
    complete: function(){
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    // easing: 'easeInOutCirc'
  });
});

$(".submit").click(function(){
  return false;
});

});
