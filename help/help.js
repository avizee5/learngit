//localhost/help?country=IN&translation=en&platform=desktop_app&user_type=guest&appversion=14.19.1
var country, translation, platform, user_type, appversion, faqBasePath, obj, categoryList, categoryListId, mainWrapper, categoryNames, countryError, logoUrl;
var availableTranslations = ['bn','de','en','gu','hi','hr','id','kn','ml','mr','ms','pa','ru','ta','te','th'];
var availablePlatforms = ['desktop_web','android_mobile','apple_app'];
$.urlParam = function (name) {
   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
   if (results == null) {
      return null;
   }
   else {
      return decodeURI(results[1]) || 0;
   }
}

//check the country value
if($.urlParam('country') == 'null' || $.urlParam('country') == null || $.urlParam('country') == '' || $.urlParam('country') == undefined || $.urlParam('country') == 'undefined'){
   $.ajax({
    type: "GET",
    url: "https://xtra.zee5.com/country",
    contentType: "application/json; charset=utf-8", 
    dataType: "json",
    async: false,
    success: function (data) {
      country = data.country_code;
      countryError = false;
    },
    error: function (data) {      
      countryError = true;      
    },
   });

}else{
   country = ($.urlParam('country')).toUpperCase();
}

translation = ($.urlParam('translation') == 'NULL' || $.urlParam('translation') == 'null' || $.urlParam('translation') == null || $.urlParam('translation') == undefined || $.urlParam('translation') == "") ? 'en' : ($.urlParam('translation')).toLowerCase();
translation = (availableTranslations.indexOf(translation) == -1 ) ? 'en' : translation;
translation = translation ? translation : 'en';
platform = ($.urlParam('platform') == 'NULL' || $.urlParam('platform') == 'null' || $.urlParam('platform') == null || $.urlParam('platform') == undefined || $.urlParam('platform') == "") ? 'desktop_web' : ($.urlParam('platform')).toLowerCase();
platform = (availablePlatforms.indexOf(platform) == -1 ) ? 'desktop_web' : platform;
platform = platform ? platform : 'desktop_web';
user_type = $.urlParam('user_type');
appversion = $.urlParam('app_version');
hextoken = $.urlParam('hextoken');

categoryList = [];
categoryNames= []
categoryListSeperated = {};
imageArray = ['question_mark-xhdpi.png','language-xhdpi.png','account-xhdpi.png','subscription-xhdpi.png'];
lang = {
   Write_to_Us : {
      bn : "আমাদের জানান",
      de : "Schreiben Sie uns",
      en : "Write To Us",
      gu : "અમને લખો",
      hi : "हमें लिखें",
      hr : "हमरा लोग के लिखीं",
      id : "Hubungi Kami",
      kn : "ನಮಗೆ ಬರೆಯಿರಿ",
      ml : "ഞങ്ങൾക്ക് എഴുതൂ",
      mr : "आम्हाला लिहा",
      ms : "Tulis Kepada Kami",
      pa : "ਸਾਨੂੰ ਲਿਖੋ",
      ru : "Напишите нам",
      ta : "எங்களுக்கு எழுதுங்கள்",
      te : "మాకు వ్రాసి పంపండి",
      th : "เขียนหาเรา",
   },
   Help : {
      bn : "সাহায্য",
      de : "Hilfe",
      en : "Help",
      gu : "હેલ્પ",
      hi : "हेल्प",
      hr : "सहायता",
      id : "Bantuan",
      kn : "ಸಹಾಯ",
      ml : "ഹെൽപ്",
      mr : "हेल्प",
      ms : "Bantuan",
      pa : "ਹੇਲ੍ਪ",
      ru : "Помощь",
      ta : "உதவிக்கு",
      te : "హెల్ప్",
      th : "ช่วยเหลือ"
   },
   TRY_LATER : {
      bn : "দয়া করে পরে চেস্টা করুন",
      de : "Bitte versuchen Sie es später erneut",
      en : "Please try again later",
      gu : "કૃપા કરીને પછીથી પ્રયાસ કરવો",
      hi : "कृपया बाद में प्रयास करें",
      hr : "कृपया बाद में प्रयास करीं",
      id : "Silahkan coba lagi",
      kn : "ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ",
      ml : "ദയവായി പിന്നീട് ശ്രമികുക",
      mr : "सभी कार्यक्रमों का अनुसरण बंद किया गया",
      ms : "Sila cuba Kemudian",
      pa : "ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
      ru : "Пожалуйста, попробуйте позже.",
      ta : "தயவுசெய்து பின்பு முயற்சிக்கவும்",
      te : "దయచేసి తరువాత ప్రయత్నించండి",
      th : "โปรดลองใหม่อีกครั้ง"
   }
   
}

faqBasePath = 'https://staginguseraction.zee5.com/contact/faq-listing.php?country=' + country + '&platform=' + platform + '&translation=' + translation;
contactUsUrl = '/contactUs/?country='+country+'&translation='+translation+'&platform='+platform+'&user_type='+user_type+'&app_version='+ appversion+'&hextoken='+hextoken;

if(platform == 'desktop_web'){
   logoUrl = '/';
}else{
   logoUrl = 'zee5://zee5.com/';
}

$(document).ready(function() {

   //logo placement
   logoPlacementCal();

   $(".contactLink").text(lang.Write_to_Us[translation]);
   $(".headerTitle").text(lang.Help[translation]);
   $(".contactLink").attr("href",contactUsUrl);
   $(".loader").css("display","flex");   
   if(countryError) {
      $('.somethingWrong').css("display","flex"); 
      $('.somethingWrong .title').text(lang.TRY_LATER[translation]);
   }

$.get(faqBasePath, function (data, status) {
   obj = data;  
   $(".loader").css("display","none");
   $(".main-container").css("visibility","visible");
   $.each(obj, function (index, item) {
      if (categoryList.indexOf(item.cat_id) == -1) {
         categoryList.push(item.cat_id);
         if(item.category == "" || item.category == null || item.category == undefined){
            categoryNames.push(item.original_category)
         }else{
            categoryNames.push(item.category)
         }
         
      }
   })

   $.each(categoryList, function (index, cat_id) {
      var eachSeperatedArray = [];
      $.each(obj, function (index_1, item_list) {
         if (cat_id == item_list.cat_id) {
            eachSeperatedArray.push(item_list);
         }
      })
      categoryListSeperated[cat_id] = eachSeperatedArray;
   })
   // console.log(categoryList, categoryListSeperated, 'categoryList')

   mainWrapper = $('.innerWrapper');

   $.each(categoryNames, function (index, item) {
      mainWrapper.append('<div id='+categoryList[index]+' class="faqSeg parentWrapper"><div onClick="callBack(this)" id="back"><img src="images/arrow-left.svg"/></div><div onClick= "callDetails(this)" class="segTitleWrapper wrapperContent"><div class="segIcon"><img src="images/'+imageArray[index]+'"/></div><div class="segTitle">' + item + '</div></div><div id= ' + item + ' class="segContentWrapper wrappedContents"></div></div>');
   }) /*'<div  class="faqSeg parentWrapper General"><div onClick= "test(this)" class="segTitleWrapper wrapperContent"><div class="segIcon"></div><div class="segTitle">'+ item + '</div></div><div id= '+ item +' class="segContentWrapper wrappedContents">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</div></div>'*/

   $.each(categoryListSeperated, function (category, item) {
      $(".innerWrapper .faqSeg").each(function () {
         // console.log($(this));
         // console.log($(this).find('.segTitleWrapper .segTitle').text().trim());
         var that = this;
         if ($(this).attr("id") == category) {
            $.each(categoryListSeperated[category], function (cat_elment, item_element) {
               if((item_element.que == "" || item_element.que == null || item_element.que == undefined) && (item_element.ans != "" && item_element.ans != null && item_element.ans != undefined)){
                  var newDiv = "<div class='itemWrapper'><span>" + item_element.original_que + "</span><div>" + item_element.ans + "</div></div>";
               }else if((item_element.que != "" && item_element.que != null && item_element.que != undefined) && (item_element.ans == "" || item_element.ans == null || item_element.ans == undefined)){
                  var newDiv = "<div class='itemWrapper'><span>" + item_element.que + "</span><div>" + item_element.original_ans + "</div></div>";
               }else if((item_element.que == "" || item_element.que == null || item_element.que == undefined) && (item_element.ans == "" || item_element.ans == null || item_element.ans == undefined)){
                  var newDiv = "<div class='itemWrapper'><span>" + item_element.original_que + "</span><div>" + item_element.original_ans + "</div></div>";
               }else{
                  var newDiv = "<div class='itemWrapper'><span>" + item_element.que + "</span><div>" + item_element.ans + "</div></div>";
               }

               //var newDiv = "<div class='itemWrapper'><span>" + item_element.que + "</span><div>" + item_element.ans + "</div></div>";
               $(that).find('.segContentWrapper').append(newDiv);
            })
            $(this).find('.segContentWrapper').accordion({
               header: "> div > span",
               collapsible: true,
               active: false,
               autoHeight: false,
               autoActivate: true,
               heightStyle: 'content'
            });
            $(this).find(".itemWrapper").prepend("<span class='arrow'></span>");
         }
      })
   });

   $(".contactLink").attr("href",contactUsUrl);
   $(".logo").attr("href",logoUrl);
   $(".ui-accordion .ui-accordion-header").click(function () {
      // testing 
      $(this).parents(".itemWrapper").toggleClass("open");
      $('.ui-accordion .ui-accordion-header').not(this).each(function () {
         if ($(this).parents(".itemWrapper").hasClass("open")) {
            $(this).parents(".itemWrapper").removeClass("open")
         }
      });
   });
   $(".itemWrapper span.arrow").click(function (){
      $(this).parents(".itemWrapper").find(".ui-accordion-header").click();
   });

   if(window.location.hash){
      var toDetail = localStorage.getItem("goDetail");
      if(window.location.hash && (localStorage.getItem("goDetail") == 0)){
         // alert(window.location.hash.split('#')[1]);
         if((jQuery.inArray(window.location.hash.split('#')[1], categoryList) != -1)){
            var parent = $(window.location.hash);
            parent.find(".segTitleWrapper").click();
         }
      }
   }


})


//calculate margin for logo
function logoPlacementCal(){
  var bodyWidth = $('body').width();
  var containerWidth = $('.innerWrapper').width();
  var logoWidth = $('.logo').width();
  var logoPlaceWidth  = bodyWidth - containerWidth;
  var logoMargin = (logoPlaceWidth - logoWidth)/2; 
  $('.logo').css('left',(logoMargin/2)-5);
}
$( window ).resize(function() {              
                logoPlacementCal();             
});

}); //document.ready end

function callDetails(that) {
   $(that).parents(".parentWrapper").addClass("open");
   $(that).parents(".parentWrapper").find('.segContentWrapper').slideToggle();
   $('.wrapperContent').not(that).each(function () {
      $(this).parents(".parentWrapper").addClass("close");
      $(this).parents(".parentWrapper").removeClass("open");
   });
   $(that).parents(".parentWrapper").find('#back').css("display","inline-block");
   localStorage.setItem("goDetail","1");
   localStorage.setItem("dPage","#" + $(that).parents(".parentWrapper").attr("id"));
   window.location.hash = $(that).parents('.parentWrapper').attr("id");
   localStorage.setItem("goDetail",0);
}

function callBack(that) {
   if ($(that).parents(".faqSeg").hasClass("open")) {
      $(that).parents(".faqSeg").find(".segContentWrapper").hide();
      $(that).parents(".faqSeg").removeClass("open");
   }
   if ($(".innerWrapper .faqSeg").hasClass("close")) {
      $(".innerWrapper .faqSeg").removeClass("close");
   }
   $(that).parents(".faqSeg").find(".segContentWrapper .itemWrapper").each(function(){
      if($(this).hasClass("open")){
         $(this).find(".ui-accordion-header").click();
      }
   });
   $(".innerWrapper .faqSeg").fadeIn();
   $(that).css("display","none");
   window.location.hash = '';
}


$(window).on('popstate', function() {
   var toDetail = localStorage.getItem("goDetail");
   // alert(localStorage.getItem("goDetail"));
   if(toDetail == 0){
      localStorage.removeItem("goDetail");
      var dPage = localStorage.getItem("dPage");
      // console.log(dPage);
      $(dPage).find('#back').click();
      localStorage.removeItem("dPage");
   }
   if(window.location.hash && (localStorage.getItem("goDetail") === null)){
      // alert(window.location.hash.split('#')[1]);
      if((jQuery.inArray(window.location.hash.split('#')[1], categoryList) != -1)){
         var parent = $(window.location.hash);
         parent.find(".segTitleWrapper").click();
      }
   }
 });

