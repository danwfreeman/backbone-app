<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>AppFX Sales</title>

  <link href="../css/sales.css" rel="stylesheet" type="text/css"/>

  <script src="./jquery-min.js">
  </script>
  <script language="javascript">
    $(document).ready(function(){

      var error = <%= request.getAttribute("error") %>;
      var init = <%= request.getAttribute("init") %>;

      if (init === true) return;

      if (error != null) {
        $('span.error.login').text('Username or Password is invalid');
      }

    });
  </script>


</head>
<body>

<div class="main">
  <div class="header">
    <a href="/marketing"><img alt="logo" src="../images/general/logo.jpg"></a>
  </div>
  <div class="content">
    <div>
      <div id="landing">
        <div class="welcome-area">
          <h1>Welcome to AppFX</h1>

          <div class="verbiage">
            <p>Please log in if you have account info to the right.</p>

            <p>If you are interested in a Marketing agent position please click the apply button below.</p>

            <p>For more information on AppFX go to <a href="www.appfxtoys.com">appfxtoys.com</a> or <a href="blog.appfxtoys.com">blog.appfxtoys.com</a></p>
          </div>
        </div>
        <div class="login-area">
          <form method="post" action="login">
            <div class="data-entry"><label>Username</label><input type="text" name="username"/><span class="error username"></span></div>
            <div class="data-entry"><label>Password</label><input type="password" name="password"/><span class="error password"></span></div>
            <div class="data-entry"><button type="submit" name="login" value="login">Login</button></div>
            <div class="error-msg"><span class="error login"></span></div>
          </form>
        </div>

        <div class="apply-area"><a href="/marketing/apply"><img src="../images/marketing/apply.png" alt="apply"></a></div>

      </div>
    </div>
  </div>
</div>
</body>

</html>