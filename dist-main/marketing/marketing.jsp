<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>AppFX Sales Registration</title>

  <link href="../css/sales.css" rel="stylesheet" type="text/css"/>

  <script src="./jquery-min.js">
  </script>
  <script language="javascript">
    $(document).ready(function(){
    var errorList = <%= request.getAttribute("errorList") %>;
    var name = <%= request.getAttribute("name") %>;
    var init = <%= request.getAttribute("init") %>;
    var entries = <%= request.getAttribute("entries") %>;

    if (init === true) return;

    // show errors on page, otherwise hide form and show thank you note
    if (errorList != null) {
    for (var key in errorList){
    $('span.error.'+key).text(errorList[key]);
    }

    // now populate fields entered, so they don't have to reenter everything
    for (var key in entries){
    if (key === 'hasCompany'){
    $('input[name=hasCompany]').attr('checked', 'checked');
    } else if (key === 'canLift'){
    $('input[name=canLift]').attr('checked', 'checked');
    } else if (key === 'resume'){
    $('textarea').text(entries[key]);
    } else {
    $('input[name='+key+']').val(entries[key]);
    }
    }


    } else {
    $("#thank-you-name").text(name);
    $("#thank-you").show();
    $("#sign-up").hide();
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
    <div id="thank-you" style="display:none">
      <h1>Thank you <span id="thank-you-name"></span>! We will contact you promptly to discuss this exciting opportunity!</h1>
    </div>
    <div>
      <div id="sign-up">
        <h1>Sign Up Form:</h1>

        <div class="verbiage">
          <span>Statement</span>: Our policy is to provide equal opportunity to all qualified persons without regard to race, creed, color, religious belief, sex, age, national origin, ancestry, physical or mental disability, or veteran status.
          (* are the Optional fields)
        </div>

        <form method="post" action="apply">
          <div class="data-entry"><label>First Name</label><input type="text" name="firstName"/><span class="error firstName"></span></div>
          <div class="data-entry"><label>Middle</label><input type="text" name="middleName"/><span class="error middleName"></span></div>
          <div class="data-entry"><label>Last Name</label><input type="text" name="lastName"/><span class="error lastName"></span></div>
          <div class="data-entry"><label>Address</label><input type="text" name="address"/><span class="error address"></span></div>
          <div class="data-entry"><label>City</label><input type="text" name="city"/><span class="error city"></span></div>
          <div class="data-entry"><label>State</label><input type="text" name="state"/><span class="error state"></span></div>
          <div class="data-entry"><label>Zip</label><input type="text" name="zip"/><span class="error zip"></span></div>
          <div class="data-entry"><label>Email</label><input type="text" name="email"/><span class="error email"></span></div>
          <div class="data-entry"><label>Phone</label><input type="text" name="phone"/><span class="error phone"></span></div>

          <div class="explanations">
            <div class="data-entry"><label>Desired Territory</label>
              <select name="territory">
                <option value=""></option>
                <option value="Akron,OH">Akron,OH </option>
                <option value="Albany-Schenectady-Troy,NY">Albany-Schenectady-Troy,NY </option>
                <option value="Albuquerque,NM">Albuquerque,NM </option>
                <option value="Allentown-Bethlehem-Easton,PA-NJ">Allentown-Bethlehem-Easton,PA-NJ </option>
                <option value="Atlanta-SandySprings-Roswell,GA">Atlanta-SandySprings-Roswell,GA </option>
                <option value="Augusta-RichmondCounty,GA-SC">Augusta-RichmondCounty,GA-SC </option>
                <option value="Austin-RoundRock,TX">Austin-RoundRock,TX </option>
                <option value="Bakersfield,CA">Bakersfield,CA </option>
                <option value="Baltimore-Columbia-Towson,MD">Baltimore-Columbia-Towson,MD </option>
                <option value="BatonRouge,LA">BatonRouge,LA </option>
                <option value="Birmingham-Hoover,AL">Birmingham-Hoover,AL </option>
                <option value="BoiseCity,ID">BoiseCity,ID </option>
                <option value="Boston-Cambridge-Newton,MA-NH">Boston-Cambridge-Newton,MA-NH </option>
                <option value="Bridgeport-Stamford-Norwalk,CT">Bridgeport-Stamford-Norwalk,CT </option>
                <option value="Buffalo-Cheektowaga-NiagaraFalls,NY">Buffalo-Cheektowaga-NiagaraFalls,NY </option>
                <option value="CapeCoral-FortMyers,FL">CapeCoral-FortMyers,FL </option>
                <option value="Charleston-NorthCharleston,SC">Charleston-NorthCharleston,SC </option>
                <option value="Charlotte-Concord-Gastonia,NC-SC">Charlotte-Concord-Gastonia,NC-SC </option>
                <option value="Chattanooga,TN-GA">Chattanooga,TN-GA </option>
                <option value="Chicago-Naperville-Elgin,IL-IN-WI">Chicago-Naperville-Elgin,IL-IN-WI </option>
                <option value="Cincinnati,OH-KY-IN">Cincinnati,OH-KY-IN </option>
                <option value="Cleveland-Elyria,OH">Cleveland-Elyria,OH </option>
                <option value="ColoradoSprings,CO">ColoradoSprings,CO </option>
                <option value="Columbia,SC">Columbia,SC </option>
                <option value="Columbus,OH">Columbus,OH </option>
                <option value="Dallas-FortWorth-Arlington,TX">Dallas-FortWorth-Arlington,TX </option>
                <option value="Dayton,OH">Dayton,OH </option>
                <option value="Deltona-DaytonaBeach-OrmondBeach,FL">Deltona-DaytonaBeach-OrmondBeach,FL </option>
                <option value="Denver-Aurora-Lakewood,CO">Denver-Aurora-Lakewood,CO </option>
                <option value="DesMoines-WestDesMoines,IA">DesMoines-WestDesMoines,IA </option>
                <option value="Detroit-Warren-Dearborn,MI">Detroit-Warren-Dearborn,MI </option>
                <option value="ElPaso,TX">ElPaso,TX </option>
                <option value="Fresno,CA">Fresno,CA </option>
                <option value="GrandRapids-Wyoming,MI">GrandRapids-Wyoming,MI </option>
                <option value="Greensboro-HighPoint,NC">Greensboro-HighPoint,NC </option>
                <option value="Greenville-Anderson-Mauldin,SC">Greenville-Anderson-Mauldin,SC </option>
                <option value="Harrisburg-Carlisle,PA">Harrisburg-Carlisle,PA </option>
                <option value="Hartford-WestHartford-EastHartford,CT">Hartford-WestHartford-EastHartford,CT </option>
                <option value="Houston-TheWoodlands-SugarLand,TX">Houston-TheWoodlands-SugarLand,TX </option>
                <option value="Indianapolis-Carmel-Anderson,IN">Indianapolis-Carmel-Anderson,IN </option>
                <option value="Jackson,MS">Jackson,MS </option>
                <option value="Jacksonville,FL">Jacksonville,FL </option>
                <option value="KansasCity,MO-KS">KansasCity,MO-KS </option>
                <option value="Knoxville,TN">Knoxville,TN </option>
                <option value="Lakeland-WinterHaven,FL">Lakeland-WinterHaven,FL </option>
                <option value="LasVegas-Henderson-Paradise,NV">LasVegas-Henderson-Paradise,NV </option>
                <option value="LittleRock-NorthLittleRock-Conway,AR">LittleRock-NorthLittleRock-Conway,AR </option>
                <option value="LosAngeles-LongBeach-Anaheim,CA">LosAngeles-LongBeach-Anaheim,CA </option>
                <option value="Louisville/JeffersonCounty,KY-IN">Louisville/JeffersonCounty,KY-IN </option>
                <option value="Madison,WI">Madison,WI </option>
                <option value="McAllen-Edinburg-Mission,TX">McAllen-Edinburg-Mission,TX </option>
                <option value="Memphis,TN-MS-AR">Memphis,TN-MS-AR </option>
                <option value="Miami-FortLauderdale-WestPalmBeach,FL">Miami-FortLauderdale-WestPalmBeach,FL </option>
                <option value="Milwaukee-Waukesha-WestAllis,WI">Milwaukee-Waukesha-WestAllis,WI </option>
                <option value="Minneapolis-St.Paul-Bloomington,MN-WI">Minneapolis-St.Paul-Bloomington,MN-WI </option>
                <option value="Nashville-Davidson-Murfreesboro-Franklin,TN">Nashville-Davidson-Murfreesboro-Franklin,TN </option>
                <option value="NewHaven-Milford,CT">NewHaven-Milford,CT </option>
                <option value="NewOrleans-Metairie,LA">NewOrleans-Metairie,LA </option>
                <option value="NewYork-Newark-JerseyCity,NY-NJ-PA">NewYork-Newark-JerseyCity,NY-NJ-PA </option>
                <option value="NorthPort-Sarasota-Bradenton,FL">NorthPort-Sarasota-Bradenton,FL </option>
                <option value="Ogden-Clearfield,UT">Ogden-Clearfield,UT </option>
                <option value="OklahomaCity,OK">OklahomaCity,OK </option>
                <option value="Omaha-CouncilBluffs,NE-IA">Omaha-CouncilBluffs,NE-IA </option>
                <option value="Orlando-Kissimmee-Sanford,FL">Orlando-Kissimmee-Sanford,FL </option>
                <option value="Oxnard-ThousandOaks-Ventura,CA">Oxnard-ThousandOaks-Ventura,CA </option>
                <option value="PalmBay-Melbourne-Titusville,FL">PalmBay-Melbourne-Titusville,FL </option>
                <option value="Philadelphia-Camden-Wilmington,PA-NJ-DE-MD">Philadelphia-Camden-Wilmington,PA-NJ-DE-MD </option>
                <option value="Phoenix-Mesa-Scottsdale,AZ">Phoenix-Mesa-Scottsdale,AZ </option>
                <option value="Pittsburgh,PA">Pittsburgh,PA </option>
                <option value="Portland-Vancouver-Hillsboro,OR-WA">Portland-Vancouver-Hillsboro,OR-WA </option>
                <option value="Providence-Warwick,RI-MA">Providence-Warwick,RI-MA </option>
                <option value="Provo-Orem,UT">Provo-Orem,UT </option>
                <option value="Raleigh,NC">Raleigh,NC </option>
                <option value="Richmond,VA">Richmond,VA </option>
                <option value="Riverside-SanBernardino-Ontario,CA">Riverside-SanBernardino-Ontario,CA </option>
                <option value="Rochester,NY">Rochester,NY </option>
                <option value="Sacramento–Roseville–Arden-Arcade,CA">Sacramento–Roseville–Arden-Arcade,CA </option>
                <option value="SaltLakeCity,UT">SaltLakeCity,UT </option>
                <option value="SanAntonio-NewBraunfels,TX">SanAntonio-NewBraunfels,TX </option>
                <option value="SanDiego-Carlsbad,CA">SanDiego-Carlsbad,CA </option>
                <option value="SanFrancisco-Oakland-Hayward,CA">SanFrancisco-Oakland-Hayward,CA </option>
                <option value="SanJose-Sunnyvale-SantaClara,CA">SanJose-Sunnyvale-SantaClara,CA </option>
                <option value="Scranton–Wilkes-Barre–Hazleton,PA">Scranton–Wilkes-Barre–Hazleton,PA </option>
                <option value="Seattle-Tacoma-Bellevue,WA">Seattle-Tacoma-Bellevue,WA </option>
                <option value="Spokane-SpokaneValley,WA">Spokane-SpokaneValley,WA </option>
                <option value="Springfield,MA">Springfield,MA </option>
                <option value="St.Louis,MO-IL">St.Louis,MO-IL </option>
                <option value="Stockton-Lodi,CA">Stockton-Lodi,CA </option>
                <option value="Syracuse,NY">Syracuse,NY </option>
                <option value="Tampa-St.Petersburg-Clearwater,FL">Tampa-St.Petersburg-Clearwater,FL </option>
                <option value="Toledo,OH">Toledo,OH </option>
                <option value="Tucson,AZ">Tucson,AZ </option>
                <option value="Tulsa,OK">Tulsa,OK </option>
                <option value="UrbanHonolulu,HI">UrbanHonolulu,HI </option>
                <option value="VirginiaBeach-Norfolk-NewportNews,VA-NC">VirginiaBeach-Norfolk-NewportNews,VA-NC </option>
                <option value="Washington-Arlington-Alexandria,DC-VA-MD-WV">Washington-Arlington-Alexandria,DC-VA-MD-WV </option>
                <option value="Wichita,KS">Wichita,KS </option>
                <option value="Winston-Salem,NC">Winston-Salem,NC </option>
                <option value="Worcester,MA-CT">Worcester,MA-CT </option>
                <option value="Youngstown-Warren-Boardman,OH-PA">Youngstown-Warren-Boardman,OH-PA </option>

              </select>
              <span class="error territory"></span>
            </div>
            <div class="data-entry"><label>Do you have your own company?</label><input type="checkbox" name="hasCompany" value="on"/><span class="error hasCompany"></span></div>
            <div class="data-entry indent"><label>If yes, what is its the name and what state is it registered with?*</label><input type="text" name="companyState"/><span class="error companyState"></span></div>
            <div class="data-entry"><label>Are you physically capable of exerting up to 10 pounds of force occasionally and/or a negligible
              amount of force frequently or constantly to lift, carry, push, pull or otherwise move objects?</label><input type="checkbox" name="canLift" value="on"/><span class="error canLift"></span></div>
            <div class="data-entry"><label class="resume">Resume (Please paste plain text resume here)</label><span class="error resume"></span><textarea name="resume"></textarea></div>
            <div class="data-entry"><label>I certify that the facts set forth in this application for independent contractor are true and complete to the best of my knowledge. I understand that if I am contracted, false statements on this application shall be considered sufficient cause for termination of any agreement in place. This company is hereby
              authorized to make any investigations of my prior educational and employment/company history. Please sign below:</label>
              <input type="text" name="initials" placeholder="ie: /john doe/"/><span class="error initials"></span></div>
          </div><!--&#47-->

          <div class="data-entry"><input type="submit" name="submit" value="Submit"/></div>

        </form>
      </div>
    </div>
  </div>
</div>
</body>

</html>