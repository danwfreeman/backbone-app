<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%


  //RequestDispatcher rd = request.getRequestDispatcher("/router");
  //rd.forward(request, response);


  System.out.println("in jsp servlet");

  String agent = request.getHeader("User-Agent");
  String site = request.getParameter("site");

  if (agent.toLowerCase().contains("mobile") && "standard".equals(site) == false) {
    response.sendRedirect("/mobile/");
  }

%>


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta name="apple-itunes-app" content="app-id=716379554, affiliate-data=myAffiliateData, app-argument=myURL">
  <title>AppFX</title>

  <link rel="stylesheet" type="text/css" media="screen" href="css/slider.css">
  <link href="css/style.css" rel="stylesheet" type="text/css"/>

  <link rel="shortcut icon" href="images/logo.ico" >

  <link rel="stylesheet" type="text/css" href="lib/css/sliderkit-core.css" media="screen, projection"/>
  <link rel="stylesheet" type="text/css" href="lib/css/sliderkit-fxcar.css" media="screen, projection"/>

  <!-- Slider Kit compatibility -->
  <!--[if IE 6]>
  <link rel="stylesheet" type="text/css" href="lib/css/sliderkit-demos-ie6.css"/><![endif]-->
  <!--[if IE 7]>
  <link rel="stylesheet" type="text/css" href="lib/css/sliderkit-demos-ie7.css"/><![endif]-->
  <!--[if IE 8]>
  <link rel="stylesheet" type="text/css" href="lib/css/sliderkit-demos-ie8.css"/><![endif]-->

  <script type="text/javascript" data-main="js/config" src="/common/libs/require.js"></script>
</head>




<!--[if lt IE 8]>
<div style=' clear: both; text-align:center; position: relative;'>
  <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode">
    <img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today."/>
  </a>
</div>
<![endif]-->
<!--[if lt IE 9]>
<script type="text/javascript" src="js/html5.js"></script>
<link rel="stylesheet" type="text/css" media="screen" href="css/ie.css">
<![endif]-->
</head>

<body>
<div class="mainSec">
  <div id="topPrt">
    <div class="logo"><a href="#"><img src="../images/general/logo.jpg" alt="logo"/></a></div>
    <div id="header" class="topRight">
      <div class="user-name-area">
        <div id="logout" style="display:none">
          <a class="link" href="#logout">logout</a>
        </div>
        <div style="display:none" class="user-name">Welcome: <span class="name"></span></div>
        <div id="login">
          <a class="link" href="#login">login</a>
        </div>
      </div>

      <p>Your Cart has <span class="sum">0</span> <span>Items</span></p>

      <p class="cost">Total cost is <span class="header-total">$0.00</span></p>

      <div class="cartlink"><a href="#cart">VIEW YOUR CART</a></div>
    </div>
    <div class="message-area">
      <div class="message"></div>
    </div>
    <div class="ajax-wrapper">
      <div class="global-ajax-loading" style="display:none">Loading....</div>
    </div>

  </div>
</div>

<div id="navPrt">
  <div class="mainSec">
    <div class="nav">
      <ul id="navLinks">
        <li><a class="active" id="car" href="#car">FX CAR</a></li>
        <li><a id="stickers" href="#stickers">FX STICKERS</a></li>
        <li><a id="track" href="#track">FX TRACK</a></li>
        <li><a id="getapp" href="#getapp">FX DRIVER</a></li>
        <li><a id="device" href="#device">DEVICE XCHANGE</a></li>
        <li><a id="safety" href="#safety">PRODUCT DESIGN</a></li>
        <li><a id="blog" href="#blog">ABOUT US</a></li>
        <li class="nbd"><a id="contactus" href="#contactus">CONTACT US</a></li>
      </ul>
    </div>
  </div>
</div>

<div class="mainSec">
  <div id="page-content">

  </div>

  <div id="socialPrt">
    <div class="mainSec">
      <div class="socialMain">
        <a class="fb" href="https://www.facebook.com/pages/Appfx/486457961406257" target="_blank"></a>
        <a class="twit" href="https://twitter.com/@appfxtoys" target="_blank"></a>
        <a class="utube" href="http://www.youtube.com/appfxtoy" target="_blank"></a>
      </div>
    </div>
  </div>

  <div id="copyright-footer">All trademarks and copyrights on this page are owned by their respective owners.</div>

  <div id="footerprt">
    <div class="fmenu">
      <ul>
        <li><a href="/mobile">Mobile</a></li>
        <li><a class="current">Standard</a></li>
        <li class="ndbr"><a href="#policy">Privacy</a></li>
      </ul>
    </div>

    <div class="copyright">Copyright &#169; 2013 DC Labs LLC. All Rights Reserved.</div>

  </div>


</div>

<div class="footerGreen"></div>


</body>
</html>


