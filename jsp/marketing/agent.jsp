<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>AppFX Marketing</title>

  <link href="../css/sales.css" rel="stylesheet" type="text/css"/>

  <script src="./jquery-min.js">
  </script>
  <script language="javascript">
    $(document).ready(function(){

    var currentSlide = 'slide0';

    // show slide one initially
    setSlide(currentSlide);

    $( ".links span" ).click(function(el, ev) {
    var slide = $(el.currentTarget).attr('class');
    setSlide(slide);
    });

    function setSlide(slide){
    currentSlide = slide;
    $(".slide").hide(); // hide all text for all slides
    $(".slide-area img.image").attr('src', '../images/marketing/'+slide+'.gif');
    $(".slide-area img.image").attr('alt', slide);
    $("#"+slide).show();
    }

    $(".next").click(function(el,ev) {

    if (currentSlide === 'slide0'){
    setSlide('slide1');
    } else if (currentSlide === 'slide1'){
    setSlide('slide2');
    } else if (currentSlide === 'slide2'){
    setSlide('slide3');
    } else if (currentSlide === 'slide3'){
    setSlide('slide4');
    } else if (currentSlide === 'slide4'){
    setSlide('slide5');
    } else if (currentSlide === 'slide5'){
    setSlide('slide6');
    } else if (currentSlide === 'slide6'){
    setSlide('slide0');
    }
    });

    $(".previous").click(function(el,ev) {

    if (currentSlide === 'slide0'){
    setSlide('slide6');
    } else if (currentSlide === 'slide1'){
    setSlide('slide0');
    } else if (currentSlide === 'slide2'){
    setSlide('slide1');
    } else if (currentSlide === 'slide3'){
    setSlide('slide2');
    } else if (currentSlide === 'slide4'){
    setSlide('slide3');
    } else if (currentSlide === 'slide5'){
    setSlide('slide4');
    } else if (currentSlide === 'slide6'){
    setSlide('slide5');
    }
    });


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
<div id="agent">
<div class="navigation">
  <div class="links">
    <div><span class="slide1">DC Labs LLC</span></div>
    <div><span class="slide2">Opportunity</span></div>
    <div class="indent"><span class="slide3">a) Organic Campaign</span></div>
    <div class="indent"><span class="slide4">b) Region</span></div>
    <div class="indent"><span class="slide5">c) Growth</span></div>
    <div><span class="slide6">Next Steps</span></div>
  </div>
  <div>
    <div class="download-link"><a href="../pdf/dc_labs_marketing_agent.pdf">Download This Presentation</a></div>
  </div>
</div>


<div class="slide-area">
  <img class="image" src="" alt="">

  <!--<div>-->
    <!--<div class="next-previous">-->
      <!--<div class="previous">Previous</div>-->
      <!--<div class="next">Next</div>-->
    <!--</div>-->
  <!--</div>-->

  <div class="slide-text">
    <div id="slide1" class="slide" style="display:none">
      <div>
        <h2>DC Labs LLC</h2>
      </div>
      <ul>
        <li>Formed in 2012</li>
        <li>Limited Liability Corporation registered in the State of Oregon</li>
        <li>Partners
          <ul>
            <li>Dan Freeman - Programmer Specialist</li>
            <li>Chae Pak - Product Designer</li>
          </ul>
        </li>
        <li>App development and Toy manufacturing specialty
          <ul>
            <li>Primary focus Apple iPhone and iPod Touch apps</li>
            <li>Plastics manufacturing</li>
          </ul>
        </li>
        <li>Development Partners in China and India</li>
        <li>3D Modeling Partner in Detroit, MI</li>
      </ul>
    </div>

    <div id="slide2" class="slide" style="display:none">
      <div>
        <h2>New Opportunity</h2>
      </div>
      <div class="verbiage">
        <p>
          Latest Technology Allows an App To Be Combined With a Car to Create Hours of Fun! Marketers Who Get In Early Are Going To Get Rich!
        </p>

        <p>
          The new FX Car and FX Driver app work together to create hours of fun. You simply load your iPhone or iPod (with the FX Driver app installed) into the FX Car and wallah! Hours of fun and enjoyment at your fingertips!
        </p>
      </div>
      <ul>
        <li>FX Car & FX Driver combined bring hours of fun.</li>
        <li>Make money by showing people how to save 50% on the FX Car.</li>
        <li>Re-imagined toy car has custom stickers to spruce up your ride just the way you like it.</li>
        <li>Works with iPhone and iPod (Android coming soon).</li>
        <li>Personal promo code saves 50% for your Prospects and keeps track of your sales.</li>
        <li>Earn money having fun.</li>
        <li>Sophisticated app is easy to understand, yet fun, and challenging to play.</li>
        <li>FX Driver comes with the latest graphics and enriched sounds to enhance real life driving.</li>
        <li>Earn money helping people save 50% off the purchase of the FX Car.</li>
      </ul>
    </div>

    <div id="slide3" class="slide" style="display:none">
      <div>
        <h2>Opportunity - Organic Campaign</h2>
      </div>
      <div class="verbiage">
        <p>DC Labs is promoting their FX Car & Driver through a nationwide launch with a retail price of $24.00 for the car, and just $2.99 for the app.</p>

        <p>However, when you become an independent marketer for DC Labs (at no cost to you), we'll give you a trackable promo code that you can share with all your peeps for an immediate 50% off the FX Car. You become an instant hero and make money too!</p>
      </div>
      <ul>
        <li>DC LABS only advertises and sells the FX Car for $24.00 retail.
          <ul>
            <li>Your Opportunity: Your Personalized Promo Code reduces the price by 50%, and makes you money every time someone uses your promo code.</li>
            <li>Prospects get a quality toy for just $12.00 (our cost) using your promo code.</li>
            <li>You can sell as many as you want. Promo Codes are time-based (normally 90 days), with no quantity limit.</li>
          </ul>
        </li>
        <li>This is for Marketing Experts who have their own company or independent agents.</li>
        <li>Our Custom Sales approach builds the value of the car, then offers a 50% savings to your Prospects. You make money every time a prospect uses your promo code. It's a win-win!
          <ul>
            <li>DC LABS build the retail value of $24 for FX Car through digital channels.</li>
            <li>You promote locally by driving Prospects to our website where they'll use your specially prepared promo code that saves them $12.00 and keeps track of your profit.</li>
            <li>Doing demos and then handing out flyers have shown to produce the best results.</li>
            <li>Customers use your promo code to save 50% and you make money!</li>
          </ul>
        </li>
      </ul>
    </div>

    <div id="slide4" class="slide" style="display:none">
      <div>
        <h2>Opportunity - Own your Territory</h2>
      </div>
      <div class="verbiage">
        <p>You can lock up your territory and knock out any competition by being one the first marketers to get in on the action. Not to mention this can turn into a contractual commitment with DC Labs within 6 months or less...and keeps you earning more.</p>
      </div>
      <ul>
        <li>Own your region, on a first-come-first-serve basis
          <ul>
            <li>Standard term length is 6 months</li>
          </ul>
        </li>

        <li>Number of agents per capita
          <ul>
            <li>Population of 10M or more - 10 Agents</li>
            <li>Population of 5M to 10M - 5 Agents</li>
            <li>Population of 3M to 5M - 3 Agents</li>
            <li>Population of 1M to 3M - 1 Agent</li>
            <li>Population of under 1M will have no Agents at this time</li>
            <li>We ensure you have at least 1 to 2 million people for your territory to guarantee a set number of sales.</li>
          </ul>
        </li>

        <li>Territories are protected through fan activity and sales. The specifics of this arrangement are very unique and will be discussed at contract time. However, here are some of the factors used as part of a balanced scorecard:
          <ul>
            <li>Number of flyers distributed</li>
            <li>Number of promo codes used</li>
            <li>Number of fans/inquiries generated in that region</li>
            <li>Level of activity in the AppFX online sales community</li>
            <li>Level of engagement including sales and product ideas, better and more efficient ways to use the app.</li>
          </ul>
        </li>
      </ul>
    </div>


    <div id="slide5" class="slide" style="display:none">
      <div>
        <h2>Opportunity - Growth</h2>
      </div>
      <ul>
        <li>Commission-only position lets you create as much income as you want.
          <ul>
            <li>Positions can be contractually committed to turn into permanent employment if an agent shows consistent sales within 6 months of 30k pieces sold.</li>
          </ul>
        </li>
      </ul>
      <div class="verbiage">
        <p>We'll pay you for each personal promo code used, and the more of your Prospects who buy the FX Car, the more money you make. Not just because you're getting more sales, but because we increase your commissions based on the number of units bought using your personal promo code.</p>

        <p>That means once you hit the next level, ALL YOUR PREVIOUS SALES GET AN INSTANT PAY RAISE!</p>

        <p>For instance, we'll pay you $2.00 for each personal promo code used up to 5000 units per month. But sell just one more (5001) and your commission jumps to $15,003! When you get 10,001 Prospects to use your promo code, your income skyrockets to $40,004.00 for the month!</p>
      </div>
      <ul>
        <li>Commission Structure
          <ul>
            <li>$2.00 up to 5k pieces per month</li>
            <li>$3.00 up to 10k pieces per month</li>
            <li>$4.00 anything over 10k pieces per month</li>
            <li>All inclusive jump in scale, so 10,001 pays out at $40,004 per month.</li>
          </ul>
        </li>
        <li>Share Share Ideas with others online
          <ul>
            <li>Twitter and Instagram are working well</li>
          </ul>
        </li>

        <li>Easily keep track of your earnings online.</li>
        <li>Get paid biweekly for the two weeks prior.</li>
      </ul>
      <div class="verbiage">
        <p>This is perfect solution for old phones too. Because now you can take those old phones (if you want to share the fun with a younger sibling) and download the app, slide the phone into the custom compartment, and let your little bro' have at it!</p>
      </div>
    </div>

    <div id="slide6" class="slide" style="display:none">
      <div>
        <h2>Your Next Steps</h2>
      </div>
      <ul>
        <li>Sign Terms and Agreement and NDA
          <ul>
            <li>Read Product Information Website</li>
            <li>Support community membership (Zoho)</li>
          </ul>
        </li>
        <li>Understand the Do's and Dont's (Marketing Agent Policy in Zoho)</li>
      </ul>
      <div>
        <h2>Additional Recommended Steps</h2>
      </div>
      <ul>
        <li>Invest in POS (Point of Sales) Materials
          <ul>
            <li>No markup if bought from DC Labs</li>
            <li>Have a used iPhone or iPod (estimated $75.00 from eBay)</li>
            <li>Have a Tablet (estimated $99.00 for Android tablet online)</li>
            <li>Procure 5,000 flyers printed with personal promo code.</li>
            <li>Order 5 pieces of the product ($45 from DC LABS)</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="next-previous">
  <div class="previous">Previous</div>
  <div class="next">Next</div>
</div>

</div>
</div>
</div>
</div>
</body>

</html>