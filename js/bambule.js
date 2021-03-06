jQuery(document).ready(function ($) {
  //custom Scripts

  /* init Functions */
  revealPosts();

  /* Variable Declarations*/
  var carousel = '.bambule-carousel-thumb';
  var last_scroll = 0;

  /* Carousel Functions */
  bambule_get_bs_thumbs(carousel);

  $(carousel).on('slid.bs.carousel', function () {
    bambule_get_bs_thumbs(carousel);
  });

  function bambule_get_bs_thumbs(carousel) {

    $(carousel).each(function () {

      var nextThumb = $(this).find('.item.active').find('.next-image-preview').data('image');
      var prevThumb = $(this).find('.item.active').find('.prev-image-preview').data('image');
      $(this).find('.carousel-control.right').find('.thumbnail-container').css({ 'background-image': 'url(' + nextThumb + ')' });
      $(this).find('.carousel-control.left').find('.thumbnail-container').css({ 'background-image': 'url(' + prevThumb + ')' });

    });

  }

  /* Ajax Functions */
  $(document).on('click', '.bambule-load-more:not(.loading)', function () {

    var that = $(this);
    var page = that.data('page');
    var newPage = page + 1;
    var ajaxurl = that.data('url');
    var prev = that.data('prev');

    if (typeof prev === 'undefined') {
      prev = 0;
    }

    that.addClass('loading').find('.text').slideUp(320);
    that.find('.bambule-icon').addClass('spin');

    $.ajax({

      url: ajaxurl,
      type: 'post',
      data: {

        page: page,
        prev: prev,
        action: 'bambule_load_more',

      },
      error: function (response) {
        console.log(response);
      },

      success: function (response) {

        if (response == 0) {

          $('.bambule-posts-container').append('<div class="text-center"><h6> No more posts to load.</h6></div>');
          that.slideUp(320);

        }        else {

          setTimeout(function () {

            if (prev == 1) {

              $('.bambule-posts-container').prepend(response);
              newPage = page - 1;

            } else {

              $('.bambule-posts-container').append(response);

            }

            if (newPage == 1) {

              that.slideUp(320);

            } else {

              that.data('page', newPage);

              that.removeClass('loading').find('.text').slideDown(320);
              that.find('.bambule-icon').removeClass('spin');

            }

            revealPosts();

          }, 1000);

        }

      },
    });

  });

  /* Scroll Functions */
  $(window).scroll(function () {

    var scroll = $(window).scrollTop();

    if (Math.abs(scroll - last_scroll) > $(window).height() * 0.1) {
      last_scroll = scroll;

      $('.page-limit').each(function (index) {

        if (isVisible($(this))) {

          history.replaceState(null, null, $(this).attr('data-page'));
          return (false);

        }

      });

    }

  });

  /* Helper Functions */
  function revealPosts() {

    var posts = $('article:not(.reveal)');
    var i = 0;

    setInterval(function () {

      if (i >= posts.length) return false;

      var el = posts[i];
      $(el).addClass('reveal').find('.bambule-carousel-thumb').carousel();

      i++;

    }, 200);

  };

  function isVisible(element) {

    var scroll_pos = $(window).scrollTop();
    var window_height = $(window).height();
    var el_top = $(element).offset().top;
    var el_height = $(element).height();
    var el_bottom = el_top + el_height;

    return ((el_bottom - el_height * 0.25 > scroll_pos) && (el_top < (scroll_pos + 0.5 * window_height)));

  }

});
