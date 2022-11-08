<html>
   <style>
.my_class {
   
    background: #060107;
    font-size: 14px;
    color: #6e6e6e;
    font-family: Noto Sans;
    font-weight: 400;
    text-align: left;
    line-height: 22px;
    letter-spacing: .03em;
    opacity: 1;
    effect: none;
}

h1 {
    font-family: Noto Sans;
    font-weight: 500;
    font-size: 36px;
    color: #eee;
    font-style: normal;
    text-align: left;
    line-height: 44px;
    letter-spacing: .03em;
    opacity: 1;
}

h2, h3, h4, h5, h6 {
    font-family: Noto Sans;
    font-weight: 700;
    font-size: 18px;
    color: #bbb;
    font-style: normal;
    text-align: left;
    letter-spacing: .02em;
    opacity: 1;
    margin-top: 15px;
    margin-bottom: 10px;
}

.termsTitle {
    font-family: 'Raleway';
                font-weight: 500;
    font-size: 36px;
    color: #eeeeee;
    font-style: normal;
    text-align: left;
    line-height: 44px;
    letter-spacing: 0.03em;
    opacity: 1;
    effect:none;
}
.intro {
    margin-top:20px;

    
}
.contentValue {
    font-family: 'Noto Sans';
    font-weight: 400;
    font-size: 14px;
    color: rgb(110, 110, 110);
    text-align: left;
    font-style: normal;
    opacity: 1;
    letter-spacing: 0em;
    line-height: 22px;
    margin-right: 26px;
    margin-bottom: 25px;
    margin-top: 2px;
}

.list {
    display: inline-flex;
} 
.bullet{
    position: relative;
    top:29px;
    height: 6px;
    width: 6px;
    background-color: #bf006b;
    border-radius: 3px;
    margin-right: 17px;
}

.list {
    display: inline-flex;

}
.paraTitles {
    font-family: 'Noto Sans';
    font-weight: 700;
    font-size: 20px;
    color:#bbbbbb;
    font-style: normal;
    text-align: left;
    line-height: 64px;
    letter-spacing: 0.02em;
    opacity: 1;
}

.lastInfo {
    margin-bottom:50px;
}


p {
    font-size: 14px;
    color: #6e6e6e;
    font-family: 'Noto Sans';
    font-weight: 400;
    text-align: left;
    line-height: 22px;
    letter-spacing: 0.03em;
    opacity: 1;
    effect:none;
    margin-bottom: 16px;

}
.termsContainer.div {
     font-size: 14px;
    color: #6e6e6e;
    font-family: 'Noto Sans';
                font-weight: 400;
    text-align: left;
    line-height: 22px;
    letter-spacing: 0.03em;
    opacity: 1;
    effect:none;
}

/*.headerInit {
    margin: 0px;
}

*/
body {
   
    background: #060107;
}
</style>
   <head>
<link href="https://fonts.googleapis.com/css?family=Raleway:400,700&subset=all" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&subset=all" rel="stylesheet" type="text/css">
   </head>
   <body>
      <?php
      header ('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods:GET,POST');
         if( $_GET["ccode"] && $_GET["text_type"] ) {
            $ccode = $_GET["ccode"];
            $text_type = $_GET["text_type"];
            $lang = $GET["translation"];
         } else {
            header("location:https://www.zee5.com/");
         }

         $url = "https://useraction.zee5.com/contact/policies.php?lang=".$lang."&ccode=".$ccode."&text_type=".$text_type."";

         $xml = file_get_contents($url);
         $xmlparsed = json_decode($xml);
         echo "<div id='iframe_div' class='my_class'>";
         print  $xmlparsed->$text_type;
         echo "</div>";
      ?> 
   </body>
</html>


