(function ($) {
  /**
   * set csrf header for ajax
   * from http://stackoverflow.com/questions/11200068/how-to-implement-csrf-protection-in-ajax-calls-using-express-js-looking-for-com
   */
  var CSRF_HEADER = 'X-CSRF-Token';
  var setCSRFToken = function(securityToken) {
    jQuery.ajaxPrefilter(function(options, _, xhr) {
      if ( !xhr.crossDomain ) 
        xhr.setRequestHeader(CSRF_HEADER, securityToken);
    });
  };
  setCSRFToken($('meta[name="csrf-token"]').attr('content'));

  // start!
  $(document).ready(function () {

    // 登录操作
    $('form#loginForm').submit(function (e) {
      var username = $('input[name="username"]').val();
      var password = $('input[name="password"]').val();

      if (!username && !password) {
        alert('用户名和密码不能为空！');
        return e.preventDefault();
      }
    });

    // 注册操作
    $('form#signupForm').submit(function (e) {
      var username = $('input[name="username"]').val();
      var password = $('input[name="password"]').val();
      var passwordConfirm = $('input[name="passwordConfirm"]').val();

      if (!username && !password) {
        alert('用户名和密码不能为空！');
        return e.preventDefault();
      }

      if (password !== passwordConfirm) {
        alert('两次密码不匹配！');
        return e.preventDefault();
      }
    });

    // 登录或注册时进行取消操作
    $('form#loginForm #cancelBtn, form#signupForm #cancelBtn').click(function (e) {
      location.href = document.referrer;
      return e.preventDefault();
    });

    // 修改文章时进行验证
    $('form#editPostForm').submit(function (e) {
      var title = $('input[name="title"]').val();
      var content = $('textarea[name="content"]').val();

      if (!title && !content) {
        alert('标题和内容不能为空！');
        return e.preventDefault();
      }
    });

    // 修改文章时取消操作
    $('form#editPostForm #cancelBtn').click(function (e) {
      if (confirm('你确定要取消吗？\n你的操作讲不会被保存')) {
        location.href = document.referrer;
      }

      return e.preventDefault();
    });

    // 删除文章
    $('a[data-action="deletePost"]').click(function (e) {
      if (confirm('你确定要删除这篇文章？')) {
        var url = $(this).data('href');

        $.post(url, function (res) {
          location.href = '/';
        });
      }

      return e.preventDefault();
    });

  });

})(jQuery);