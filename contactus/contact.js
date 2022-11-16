const ConfigApiUrl = 'i18n/language.json'
var country_array = [];
var country = "";
var locationCountry = "";
var locationState = "";
var translation;
var platform;
var countryCode = "";

var that = this;
that = this;
var obj;
var selectedCategory = "";
var selectedSubCategory = "";
var maxLength = 13;
var dateArry = [];
var hextoken;
var user_data;
var country_list_data;
var selected_country_index;
var strings;
var updateUrlRec;
var resetData = false;
var submit_clicked = false;
var listenerCalled = [];
var autoSuggestTextValue = "";
var autoSuggestOrgTextValue = "";
var logoUrl;
var user_name = "Guest";

//passing category,subcategory values with english lang to api 
var selectedOriginalCategory = "";
var selectedOriginalSubCategory = "";
var availableTranslations = ['bn','de','en','gu','hi','hr','id','kn','ml','mr','ms','pa','ru','ta','te','th'];
var availablePlatforms = ['desktop_web','android_mobile','apple_app'];

$(document).ready(function() {
  
  //logo placement
  logoPlacementCal();
  
  closeSubmitResponseMsg();

  //calendar today
  var old_goToToday = $.datepicker._gotoToday
  $.datepicker._gotoToday = function(id) {
    old_goToToday.call(this,id);
    this._selectDate(id);
    $(id).blur();
  }

 $(".loader").css("display","flex");
 var categoryApiBasePath = "https://useraction.zee5.com/contact/contactus-catsubcat.php?"
 var user_type, contactData, newField, Drop_down, appversion; 

//get url param values
  $.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

//get country and state
function getCountry(asyncVal){
$.ajax({
    type: "GET",
    url: "https://xtra.zee5.com/country",         
    contentType: "application/json; charset=utf-8", 
    dataType: "json",
    async: asyncVal,
    success: function (data) {
      //country = data.country_code;
      locationCountry = data.country_code;
      locationState = data.state_code;
    },
    error: function (data) {
         $.ajax({
          type: "GET",         
          url: "https://b2bapi.zee5.com/v1/country",     
          contentType: "application/json; charset=utf-8", 
          dataType: "json",
          async: asyncVal,
          success: function (data) {
            //country = data.country_code;
            locationCountry = data.country_code;
            locationState = data.state_code;
          },
          error: function (data) {            
            locationCountry = "";
            locationState = "";
            },
         });
      },
   });
}
  
if($.urlParam('country') == 'null' || $.urlParam('country') == null || $.urlParam('country') == '' || $.urlParam('country') == undefined || $.urlParam('country') == 'undefined'){
   getCountry(false);
   if(locationCountry == ""){
    $('.somethingWrong').css("display","flex");
   }else{
    country = locationCountry;
   }
   USAnoteChanges();
} else{
   getCountry(true);   
   country = ($.urlParam('country')).toUpperCase();
   USAnoteChanges();
}


translation = ($.urlParam('translation') == 'NULL' || $.urlParam('translation') == 'null' || $.urlParam('translation') == null || $.urlParam('translation') == undefined || $.urlParam('translation') == "") ? 'en' : ($.urlParam('translation')).toLowerCase();
translation = (availableTranslations.indexOf(translation) == -1 ) ? 'en' : translation;
translation = translation ? translation : 'en';
platform = ($.urlParam('platform') == 'NULL' || $.urlParam('platform') == 'null' || $.urlParam('platform') == null || $.urlParam('platform') == undefined || $.urlParam('platform') == "") ? 'desktop_web' : ($.urlParam('platform')).toLowerCase();
platform = (availablePlatforms.indexOf(platform) == -1 ) ? 'desktop_web' : platform;
platform = platform ? platform : 'desktop_web';
user_type = $.urlParam('user_type');   // null
hextoken = $.urlParam('hextoken');
appversion = $.urlParam('app_version');
 var x, txt
 var contactUsGetUrl = categoryApiBasePath + 'country=' + country + '&translation=' + translation + '&platform=' + platform + '&user_type=' + user_type;
 var countryListPath = "https://b2bapi.zee5.com/front/countrylist.php?" + '&lang=' + translation;
 var faqlink = '/help/?country='+country+'&translation='+translation+'&platform='+platform+'&user_type='+user_type+'&app_version='+ appversion+'&hextoken='+hextoken;
 if(platform == 'desktop_web'){
   logoUrl = '/';
}else{
   logoUrl = 'zee5://zee5.com/';
}
$(".logo").attr("href",logoUrl);

 var categoryList = [];
 var categoryNames = [];
 var subCategoryList = [];
 var subCategoryFieldsList = [];

 var categoryContainer = $('#category_container');
 var fieldsContainer = $('#fields_container');
 var subCategoryContainer = $('#subCategory_container');
 var countryCountainer = $('#containerContainer');
 var count = 1;
 var categoryListId = [];
 var initialSelectedCountry = '';
 var initialSelectedCountryCode = '';
 var initialSelectedSupportTxt = '';
 var initialSelectedSupportTxtUrl = '';

//translations
  $.get(ConfigApiUrl, function(config, status) {
    strings = config.strings;    
    setStrings();    
 })
  function setStrings() {
   if(strings){
    var dispLang = strings[translation]
    $('.info').text(dispLang.INFO);
    $('.reg_mob').text(dispLang.REG_MOBILE_NO);
    $('#submitData').text(dispLang.SUBMIT);
    if(country === 'IN') {
      $('.countrySelectorText').text(dispLang.SELECT_COUNTRY_INFO);
    } else {
      $('.countrySelectorText').text(dispLang.SELECT_COUNTRY_INFO_INT);
    }
    $('.countrySpan').text(dispLang.SELECT_COUNTRY_INFO);
    $('.InvalidEmail').text(dispLang.INVALID_EMAIL);
    $('.cotentTxt').text(dispLang.MORE);
    $('.catSelectorText').text(dispLang.SELECT_CATEGORY);
    $('#subCatSpan').text(dispLang.SELECT_CATEGORY);
    $('.error').text(dispLang.ERROR);
    $('#resetData').text(dispLang.RESET_CAPS);
    $('#toastMsg').text(dispLang.RESPONSE_RECEIVED);
    $('.reg_email').text(dispLang.EMAIL_ID);
    $('.InvalidMobile').text(dispLang.INVALID_MOBILE_NO);
    $('.headingTxt').text(dispLang.CONTACTUS);
    $('.somethingWrong .title').text(dispLang.TRY_LATER); 
    $('.errorMsg').text(dispLang.ERROR_MESSAGE);
    $('#dateErrMsg').text(dispLang.INVALID_DATE); 
    $('#uploadAFile').val(dispLang.UPLOAD);
    $('.charactersstyle').text(dispLang.MINIMUM_CHARACTERS);


  }
}


 $.get(countryListPath, function(data, status) {

  //country_list_data = data;
  that.country_array = data;
  for (var i = 0; i < data.length; i++) {
   that.country_array = data;
   if (data[i].code === country) {
      that.selected_country_index = i
        if(user_type = 'loggedin') {
        //  console.log(hextoken)
          var form = new FormData();
          form.append("token", hextoken);
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://useraction.zee5.com/device/v2/getdeviceuser.php",
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
          }

        $.ajax(settings).done(function (response) {          
            user_data = JSON.parse(response);
            if((user_data.user.mobile !== '') && (user_data.user.mobile !== null) && (user_data.user.mobile !== undefined)) {
              user_data.user.mobile = user_data.user['mobile'].slice(that.country_array[that.selected_country_index]["phone-code"].length,user_data.user['mobile'].length);           
                $("#userMobile").val(user_data.user['mobile']);
                //$("#userMobile").prop("readonly", true);
            }

            if((user_data.user.email !== '') && (user_data.user.email !== null) && (user_data.user.email !== undefined)) {
              $(".email").addClass("floating-label-focus");
              $("#userEmail").val(user_data.user['email']);
            }
          
            //get user name 
            var firstName = "",lastName = "";
            firstName = ((user_data.user.first_name !== '') && (user_data.user.first_name !== null) && (user_data.user.first_name !== undefined)) ? (user_data.user.first_name).trim() : "";            
            lastName = ((user_data.user.last_name !== '') && (user_data.user.last_name !== null) && (user_data.user.last_name !== undefined)) ? (user_data.user.last_name).trim() : "";            
            user_name = (firstName == "" && lastName == "") ? "" : (firstName + " " + lastName).trim();

        }).fail(function(response){
  
        });

    }
    $("#countryOptions").text(data[i].name);
    initialSelectedCountry = data[i].name;
    $('.supportTxt').text(data[i].mail);
    initialSelectedSupportTxt = data[i].mail;
    initialSelectedSupportTxtUrl = 'mailto:' + data[i].mail + '?Subject=Feedback';
    $('.supportTxtUrl').attr('href',initialSelectedSupportTxtUrl);
    countryCode = '+' + data[i]["phone-code"] + '-';      
    $('#countryCode').val(countryCode);
    initialSelectedCountryCode = '+' + data[i]["phone-code"] + '-';
    $("#countryOptions").append(' <span class="imgClass"><img src="./down_arrow.png"></span>');
    $('#countrySpan').addClass('shiftSpan')
   }
   countryCountainer.append('<li class="borderBtm value1" onclick =changeCountry(' + i + ')><div class="txtVal">' + data[i].name + '</div></li>');
  }
  
  codeStyles();

 })

 $.get(contactUsGetUrl, function(data, status) {  
  obj = data;
   
  initiativeData();
  $(".main-container").css("visibility","visible");
  $(".loader").css("display","none");
   //input label animation
   inputLabelAnimation();  

  function initiativeData(){
    $.each(obj, function(index, item) {
   //default category list
   if (categoryList.indexOf(item.category_id) == -1) {
      categoryList.push(item.category_id);
       if((item.category.trim() != null) && (item.category.trim() != "") && (item.category.trim() != undefined)){           
           categoryNames.push(item.category.trim());
       }else{
          categoryNames.push(item.original_category.trim());
       }   
      categoryListId.push(item);
   }

   //default subcategory list of default selected category
   if (categoryList[0].trim().toLowerCase() == item.category_id.trim().toLowerCase()) {
      if((obj[0].subcategory != "") && (obj[0].subcategory != null) && (obj[0].subcategory != undefined)){
        $("#options").text(obj[0].subcategory.trim());
       
      }else{
         $("#options").text(obj[0].original_subcategory.trim());
      }      
    $("#options").append(' <span class="imgClass"><img src="./down_arrow.png"></span>');
    $('#subCatSpan').addClass('shiftSpan');
    $("#options").attr({
      "receivedid": obj[0].subcategory_id
     });
     $("#options").attr({
      "originalsubcategoryval": obj[0].original_subcategory
     });
    subCategoryList.push(item);
    createSubCategoryList(index, item);
   }
   selectedOriginalSubCategory = subCategoryList[0].original_subcategory;
   if (index == 0) {
    //create default fields controls with subcategory fields list 
    if (item.field_info) {
     $.each(item.field_info, function(index, item) {
      createFields(index, item);

      //initiate data check if any dropdown field contain subfields - create subfields
        if(item.field_type == 'Dropdown'){
          if(item.options){
              if(item.options[0].option_fields){
                  var subOption = item.options[0].option_value;
                  createSubFields(subOption);              
              }
          }
      }
     })
     $("#fields_container").css({"display": "", "width": ""});
    }else{
      $("#fields_container").css({"display": "inline-block", "width": "100%"});

    }
   }
   setStrings(); 
  })

//prefilled platform version
  if($('#platform_version') && appversion !== 'null' && appversion !== 'undefined' && !resetData) {
    $("#platform_version").prop("name", appversion);
    $("#platform_version").prop("value", appversion);
     //$('#dynamicText1').addClass("floating-label-focus")    
 }

 //prefilled app version
 if($('#app_version') && appversion !== 'null' && appversion !== 'undefined' && !resetData) {
    $("#app_version").prop("name", appversion);
    $("#app_version").prop("value", appversion);     
     //$('#dynamicText1').addClass("floating-label-focus")    
 }

  }

  //create category radio button control with category list

  $.each(categoryNames, function(index, item) {
   categoryContainer.append('<label class="radio-inline changeTxt" id="' + 'radioOpt' + index + '"> <div class="radioSize" id="optImg' + index + '"></div><input originalCategory="'+categoryListId[index].original_category+'" type="radio" id="catOpt' + index + '"class="hideRadio categoryItem" name="category_group" onclick =addAnimate("' + index + '","' + encodeURIComponent(categoryListId[index].category_id) + '")><span class="spanTxt" id="optImgRadio' + index + '">' + item + '</span></label><span class="radioMargin"></span>');
   $('#optImg' + index).addClass('defaultRadio');

  })


  //default category selected
  selectedCategory = categoryNames[0];
  selectedOriginalCategory = $('input[name="category_group"]:first').attr('originalcategory');
  $('#optImg0').addClass('addActiveRadio');
  $('input[name="category_group"]:first').attr('checked', true);


  // $('input:radio[class=hideRadio][id=optImg0]').prop('checked', true);
  $('input[name="category_group"]:first').attr({
   "receivedid": categoryListId[0].category_id
  });

    

  //click on category item
  $(".categoryItem").on("click", function() {  
   // change sub category value
   if(selectedOriginalCategory.trim().toLowerCase() == $('input[name="category_group"]:checked').attr('originalcategory').trim().toLowerCase() ) {
    return;
   }
   selectedSubCategory = ''; 
   selectedOriginalSubCategory = ''; 

   autoSuggestTextValue = "";
   autoSuggestOrgTextValue = "";

   //clear upload value
    $("#file_name").val('');
    updateUrlRec = '';

   createDataByCategory();
   setStrings();  
   closeSubmitResponseMsg(); 
  });

//create subcategory,fields using category
 function createDataByCategory(){
  selectedCategory = $('input[name="category_group"]:checked').parent().text().trim();
  selectedOriginalCategory = $('input[name="category_group"]:checked').attr('originalcategory');
   subCategoryList = [];
   subCategoryContainer.empty();
   fieldsContainer.empty();
    dateArry = []; // empty date array on change

   $.each(obj, function(index, item) {
    var sendItem = item;
    //get subcategory list by click on category item 
    if (item.original_category.trim().toLowerCase() == selectedOriginalCategory.trim().toLowerCase()) {
     subCategoryList.push(item);

    }
    //get fields list of first subcategory item by click on category item
    if (subCategoryList.length > 0) {
     if (item.original_subcategory.trim().toLowerCase() == subCategoryList[0].original_subcategory.trim().toLowerCase()) {
      // retain initial state for dropdown button after category change
       if((subCategoryList[0].subcategory != "") && (subCategoryList[0].subcategory != null) && (subCategoryList[0].subcategory != undefined)){       
         $("#options").text(subCategoryList[0].subcategory.trim());
      }else{
        $("#options").text(subCategoryList[0].original_subcategory.trim());
      } 
     //$("#options").text(subCategoryList[0].subcategory.trim());
     $("#options").append(' <span class="imgClass"><img src="./down_arrow.png"></span>');
     $("#options").attr({
        "receivedid": subCategoryList[0].subcategory_id
       });
      $("#options").attr({
         "originalsubcategoryval": subCategoryList[0].original_subcategory
       });
    
      if (item.field_info) {
       $.each(item.field_info, function(index, item) {
        createFields(index, item);

        //click on category check if any dropdown field contain subfields - create subfields
          if(item.field_type == 'Dropdown'){
            if(item.options){
                if(item.options[0].option_fields){
                    var subOption = item.options[0].option_value;
                    createSubFields(subOption);              
                }
            }
        }
       })
       $("#fields_container").css({"display": "", "width": ""});
      }else{
        $("#fields_container").css({"display": "inline-block", "width": "100%"});
      }
     
     }
    }

   })

    selectedOriginalSubCategory = subCategoryList[0].original_subcategory;

   //create subcategory dropdown control with subcategory list 
   $.each(subCategoryList, function(index, item) {
    createSubCategoryList(index, item);
   });

    //prefilled platform version
   if($('#platform_version') && appversion !== 'null' && appversion !== 'undefined') {
    $("#platform_version").prop("name", appversion);
    $("#platform_version").prop("value", appversion);    
     //$('#dynamicText1').addClass("floating-label-focus")   
 }

//prefilled app version
if($('#app_version') && appversion !== 'null' && appversion !== 'undefined') {
    $("#app_version").prop("name", appversion);
    $("#app_version").prop("value", appversion);     
     //$('#dynamicText1').addClass("floating-label-focus")    
 }

  $("#errMsg").val('');
   checkRequiredFields();

   //input label animation
   inputLabelAnimation();  
   setStrings(); 

 }

 //input label animation
 function inputLabelAnimation(){
    $('div#contact_form').find('input[type="text"]').each(function(index, item) {
        if(!$(this).val()){
          $(this).parent().find(".floating-label").removeClass("floating-label-focus");     
        }else{
          $(this).parent().find(".floating-label").addClass("floating-label-focus"); 
        }
    });
  }

  //click on subcategory item
  $("#subCategory_container").on("click", function(e) {
    setTimeout(function() {
     if(selectedOriginalSubCategory == $("#options").attr('originalsubcategoryval').trim() || ((selectedOriginalSubCategory == '') && ($("#options").attr('originalsubcategoryval').trim() === subCategoryList[0].original_subcategory.trim())) ) {
      return;
    }
    subCategoryFieldsList = [];
    fieldsContainer.empty();
    dateArry = []; // empty date array on change
    // set value of dropdown display 
    listenerCalled = [];

    autoSuggestTextValue = "";
    autoSuggestOrgTextValue = "";

    //clear upload value
    $("#file_name").val('');
    updateUrlRec = '';
    selectedSubCategory = $("#options").text().trim();
    selectedOriginalSubCategory = $("#options").attr('originalsubcategoryval').trim();
    //get fields by click on subcategory item
    $.each(obj, function(index, item) {
     if (item.original_category.trim().toLowerCase() == selectedOriginalCategory.trim().toLowerCase()) {
      if (item.original_subcategory.trim().toLowerCase() == selectedOriginalSubCategory.trim().toLowerCase()) {
       if (item.field_info) {
        $.each(item.field_info, function(index, item) {
         subCategoryFieldsList.push(item);
        })
        $("#fields_container").css({"display": "", "width": ""});
       }else{
         $("#fields_container").css({"display": "inline-block", "width": "100%"});
       }

      selectedOriginalSubCategory = item.original_subcategory;

      }
     }
    })

    //create fields controls with subcategory fields list 
    $.each(subCategoryFieldsList, function(index, item) {
     createFields(index, item);

     //click on subcategory check if any dropdown field contain subfields - create subfields
     if(item.field_type == 'Dropdown'){
      if(item.options){
          if(item.options[0].option_fields){
               var subOption = item.options[0].option_value;
               createSubFields(subOption);              
          }
      }
  }
    })

    $("#errMsg").val('');
    checkRequiredFields();

    //prefilled platform version
    if($('#platform_version') && appversion !== 'null' && appversion !== 'undefined') {
       $("#platform_version").prop("name", appversion);
       $("#platform_version").prop("value", appversion);
       //$('#dynamicText1').addClass("floating-label-focus");
    }

  //prefilled app version
  if($('#app_version') && appversion !== 'null' && appversion !== 'undefined') {
      $("#app_version").prop("name", appversion);
      $("#app_version").prop("value", appversion);     
       //$('#dynamicText1').addClass("floating-label-focus")    
   }

    //input label animation
    inputLabelAnimation();  

    setStrings();
    closeSubmitResponseMsg();
   }) // setTimeout   
 
  })

  
    $("div#contact_form").on('submit', '.uploadForm', function(e){ 
     e.preventDefault();
     $(".loader").css({"display":"flex","background":"transparent"});
     $.ajax({
            url: "https://b2bapi.zee5.com/partner/api/upload.php",
      type: "POST",
      data:  new FormData(this),
      contentType: false,
            cache: false,
      processData:false,
      beforeSend : function()
      {
       //$("#preview").fadeOut();
       $("#err").fadeOut();
      },
      success: function(data)
         {
      $(".loader").css("display","none");
        var myJSON = JSON.stringify(data);
        updateUrlRec = (data && data.download_link) ? (data.download_link) : ('');
        // alert(myJSON);
       if(data=='invalid')
       {
        // invalid file format.
        $("#err").html("Invalid File !").fadeIn();
       }
       else
       {
        if(data && (data.code === '200' || data.code === 200) ){
          $('#uploadAFile').prop('disabled',true);
          callToast('file',data.message);    
         }
         else{
          $('#uploadAFile').prop('disabled',true);
           callToast('file',data.message); 
           //clear upload value
          $("#file_name").val('');
          updateUrlRec = '';
         }
        // view uploaded file.
        $("#preview").html(data).fadeIn();
        $("#form")[0].reset(); 
       }
         },
        error: function(e) 
         {
          $(".loader").css("display","none");
          $("#err").html(e).fadeIn();
          $('#uploadAFile').prop('disabled',true);
          callToast('file',e.responseJSON.message); 
          //clear upload value
          $("#file_name").val('');
          updateUrlRec = '';
         }          
       });
    });

  //create subcategory list
  function createSubCategoryList(index, item) {
   subCategoryContainer.append('<li class="borderBtm value1" onclick =selectedSubcategory("' + ((item.subcategory != '' && item.subcategory != null && item.subcategory != undefined ) ? encodeURIComponent(item.subcategory) : encodeURIComponent(item.original_subcategory)) + '","' + encodeURIComponent(item.subcategory_id) + '","'+ encodeURIComponent(item.original_subcategory) +'") ><div class="txtVal" id="subCat' + index + '">' + ((item.subcategory != '' && item.subcategory != null && item.subcategory != undefined ) ? (item.subcategory) : (item.original_subcategory)) + '</div></li>');
  }

  //create fields list
  function createFields(index, item) {
   if (item.field_type.toLowerCase() == "text") {
    fieldsContainer.append('<div class="row no-gutters col-md-4 col-sm-4 col-lg-4 alignElm addBottom "><input type="text" autocomplete="nope" class="inputText addedValue fullWidth" id=' + item.field_id + ' title="' + item.field_id + '" ' + (item.field_category == "M" ? "required" : "notrequired") + '  /><span class="floating-label categoryFieldsMargin"  id="dynamicText' + index + '>' + ((item.field != '' && item.field != null && item.field != undefined ) ? (item.field) : (item.original_field)) + (item.field_category == "M" ? ' <span class="asterisk">*</span>' : '') + '</span></div>');
   }
   if (item.field_type.toLowerCase() == "textarea") {
   fieldsContainer.append('<div class="col-md-4 col-sm-4 col-lg-4 alignElm addBottom reduceWidthText"><input type="text" autocomplete="nope" class="inputText addedValue fullWidth" id=' + item.field_id + ' title="' + item.field_id + '" ' + (item.field_category == "M" ? "required" : "notrequired") + '/><span id= "dynamicText' + index + '" class="floating-label categoryFieldsMargin" >' + ((item.field != '' && item.field != null && item.field != undefined ) ? (item.field) : (item.original_field)) + (item.field_category == "M" ? ' <span class="asterisk">*</span>' : '') + '</span></div></div>');
   }
   if (item.field_type.toLowerCase() == "dropdown") {    
    if (item.options) {      
     //options data is available   
     fieldsContainer.append('<div class="col-md-4 col-sm-4 col-lg-4 alignElm addBottom reduceWidthText field-dropdown-list-container"><div class="dropdown"><button id ="' + item.field_id + '" class="btn btn-primary dropdown-toggle countrySelector fullWidth" org_option_val="'+item.options[0].original_option_value+'" title="' + item.field_id + '" type="button" data-toggle="dropdown" ' + (item.field_category == "M" ? "required" : "") + '><span class="dropdownText">' + item.options[0].option_value + '</span><span class="imgClass"><img src="./down_arrow.png"></span></button><span id="spanDyan' + index + '" class="floating-label hideElem shiftSpan" >' + ((item.field != '' && item.field != null && item.field != undefined ) ? (item.field) : (item.original_field)) + (item.field_category == "M" ? ' <span class="asterisk">*</span>' : '') + ' </span><ul id="select' + index + '" class="dropdown-menu dropValues fullWidth"></ul></div></div>');  
     $.each(item.options, function(indexDrp, itemDrp) {
      $('#select' + index).append($('<li class="borderBtm value1"><div onclick= selectedOption("' + encodeURIComponent(itemDrp.option_value) + '","' + item.field_id + '","' + index + '","'+encodeURIComponent(itemDrp.original_option_value)+'") class="txtVal field-dropdown-list-option">' + ((itemDrp.option_value != '' && itemDrp.option_value != null && itemDrp.option_value != undefined ) ? (itemDrp.option_value) : (itemDrp.original_option_value)) + '</div></li>'));

     })
    } else {
     //create dropdown options for user location/country

    }
   }
   if (item.field_type.toLowerCase() == "upload") {
            fieldsContainer.append('<div class="col-md-4 col-sm-4 col-lg-4 alignElm  addTop addBottom reduceWidthText upload-block"><div class="col-sm-12 col-md-12 col-lg-12 reduceWidthText no-padding-left" style="float:left;"><div class="uploadDiv addedValue"><form id="form" class="uploadForm" method="post" enctype="multipart/form-data"><input id="file_name" onchange="selectFile()" type="file" name="file_name" title="' + item.field_id + '"/><span id="spanDyanFile" class="floating-label hideElem changeLeft uploadTextTopSpan" >' + ((item.field != '' && item.field != null && item.field != undefined ) ? (item.field) : (item.original_field)) + ' </span><span onclick= "test()" for="file1" class="text-left uploadText">' + ((item.field != '' && item.field != null && item.field != undefined ) ? (item.field) : (item.original_field)) + '</span><input class="btn btn-primary uploadBtn" id="uploadAFile" type="submit" value="Upload">');
            $('#uploadAFile').prop('disabled',true);
            $(".uploadBtn").css({"background": "grey", "cursor": "pointer"});            
            $( window ).resize(function() {              
                setWidthUploadBtnText();             
            });             
            setTimeout(function(){
            setWidthUploadBtnText(); 
            setStrings();
            }, 0);   
function setWidthUploadBtnText(){
  var uploadBlockWidth = $('.upload-block').width();
  var uploadBtnWidth = $('.uploadBtn').innerWidth();
  var uploadTextWidth = uploadBlockWidth - uploadBtnWidth;
  $('.uploadText').width(uploadTextWidth);
  $('#file_name').width(uploadTextWidth);
  $('.uploadTextTopSpan').width(uploadBlockWidth);
}
            

           
   }

    if (item.field_type.toLowerCase() == "link") {
      fieldsContainer.append('<a target="_blank" href="'+faqlink+'"<div class="col-md-4 col-sm-4 col-lg-4 alignElm addBottom reduceWidthText inputText addedValueLink"><span id= "dynamicText' + index + '" class="categoryFieldsMargin" >' + ((item.field != '' && item.field != null && item.field != undefined ) ? (item.field) : (item.original_field)) + '</span></div></div></a>');
   }
    

   if (item.field_type.toLowerCase() == "date") {
    fieldsContainer.append('<div class="col-md-4 col-sm-4 col-lg-4 alignElm addBottom"><input type="text" readonly="true" onkeydown="restrictDateFormat(event)" onblur="dateValidation()" onfocus="hideErrorDate()" class="inputText dateText addedValue fullWidth datepicker" maxlength="10" id="datepicker_'+item.field_id+'" title="' + item.field_id + '"  ' + (item.field_category == "M" ? "required" : "") + ' /><span id= "dynamicText' + index + '" class="floating-label categoryFieldsMargin" >' + ((item.field != '' && item.field != null && item.field != undefined ) ? (item.field) : (item.original_field)) + (item.field_category == "M" ? ' <span class="asterisk">*</span>' : '') + '</span><div style="display: none;" id="dateErrMsg" class="InvalidDate">'+strings[translation].INVALID_DATE+'</div></div></div>');
  
    $("#datepicker_"+item.field_id).datepicker({     
      ignoreReadonly: true,
      allowInputToggle: true,
       changeMonth: true,
        changeYear: true,
         showButtonPanel: true,
      onSelect: function (date) {
         $('#dateErrMsg').css("display","none");
        //getDate(item.field_id,$(this).val());
        checkRequiredFields();
        if(!$(this).val()){
          $(this).parent().find(".floating-label").removeClass("floating-label-focus")
        }else{
           $(this).parent().find(".floating-label").addClass("floating-label-focus")
          }
          //$(this).removeAttr("inputmode");
        },
        dateFormat: 'dd.mm.yy',
        maxDate: 0
 });
   }
  }


  //check required fields status on changing input
  $('div#contact_form').on('keyup change paste', "input[required],#userMobile", function() {
   
     // if(!submit_clicked) {

        checkRequiredFields();

     // }
  });


  $('div#contact_form').on('keydown keyup','#episode_number',function(){
    restrictNumbers(event);
  })

  //check required fields status on changing dropdown and adding sub fields if data is available inside field dropdown
  $('div#contact_form').on('click', ".field-dropdown-list-option", function() {
   //create sub option fields
   var subOption = $(this).text();
    createSubFields(subOption);
    checkRequiredFields();
   }); 
 
   //create subfields
   function createSubFields(subOption){
   $.each(obj, function(index, item) {
    if (item.original_category.trim().toLowerCase() == selectedOriginalCategory.trim().toLowerCase()) {
     if (item.original_subcategory.trim().toLowerCase() == selectedOriginalSubCategory.trim().toLowerCase()) {
      if (item.field_info) {
       $.each(item.field_info, function(index2, item2) {        
        if (item2.field_type == 'Dropdown') {
         $.each(item2.options, function(index3, item3) {
          if (item3.option_value == subOption) {
           if (item3.option_fields) {
            
            //find selected field dropdown parent and add subfields after dropdown parent div
            var dropdownFieldParent = $( "#"+item2.field_id ).closest( ".field-dropdown-list-container");            
            fieldsContainer.find("span#sub-fields-container").remove();           
            dropdownFieldParent.after('<span id="sub-fields-container"></span>');
            var subFieldsCountainer = $('#sub-fields-container');
            $.each(item3.option_fields, function(index4, item4) {
             if (item4.field_type.toLowerCase() == "textbox") {
              subFieldsCountainer.append('<div class="col-md-4 col-sm-4 col-lg-4 alignElm addBottom reduceWidthText"><input type="text" autocomplete="nope" class="inputText addedValue fullWidth" id=' + item4.field_id + ' title="' + item4.field_id + '" ' + (item4.field_category == "M" ? "required" : "") + '/><span id= "dynamicText' + index4 + '" class="floating-label categoryFieldsMargin" >' + ((item4.field != '' && item4.field != null && item4.field != undefined ) ? (item4.field) : (item4.original_field)) + (item4.field_category == "M" ? ' <span class="asterisk">*</span>' : '') + '</span></div></div>');
             }
             if (item4.field_type.toLowerCase() == "textarea") {
              subFieldsCountainer.append('<div class="col-md-4 col-sm-4 col-lg-4 alignElm addBottom reduceWidthText"><input type="text" autocomplete="nope" class="inputText addedValue fullWidth" id=' + item4.field_id + ' title="' + item4.field_id + '" ' + (item4.field_category == "M" ? "required" : "") + '/><span id= "dynamicText' + index4 + '" class="floating-label categoryFieldsMargin" >' + ((item4.field != '' && item4.field != null && item4.field != undefined ) ? (item4.field) : (item4.original_field)) + (item4.field_category == "M" ? ' <span class="asterisk">*</span>' : '') + '</span></div></div>');

             }
             if (item4.field_type.toLowerCase() == "autosuggest") {              
              subFieldsCountainer.append('<div class="col-md-4 col-sm-4 col-lg-4 alignElm addBottom reduceWidthText"><input onkeyup="autocomplete_fn(' + item4.field_id + ')" type="text" class="inputText addedValue fullWidth" id=' + item4.field_id + ' title="' + item4.field_id + '" ' + (item4.field_category == "M" ? "required" : "") + '/><span id= "dynamicText' + index4 + '" class="floating-label categoryFieldsMargin" >' + ((item4.field != '' && item4.field != null && item4.field != undefined ) ? (item4.field) : (item4.original_field)) + (item4.field_category == "M" ? ' <span class="asterisk">*</span>' : '') + '</span></div></div>');

             }

            })
           }
          }

         })

        }
       })
      }
     }
    }
   })   
   }
  
  


  //restrict numbers only for input
  $('div#contact_form').on('keydown change', "#registered_user_id", function(e) {
   //inputRestrictNumbers(e);
   //e.preventDefault();
  });

  //input label animation on focusin and focusout
  $('div#contact_form').on('focusin','input[type="text"]',function(){
     $(this).parent().find(".floating-label").addClass("floating-label-focus");
  });
 $('div#contact_form').on('focusout','input[type="text"]',function(){
      if(!$(this).val()){
      $(this).parent().find(".floating-label").removeClass("floating-label-focus");     
    }
  });

 $('div#contact_form').on('click', ".datepicker", function(e) {
  setTimeout(function() {
          $('.datepicker').removeAttr("readonly");

    }, 0);  

  });


//app version label animation
$('div#contact_form').on('focusin','input#app_version,input#platform_version',function(){     
     $("input#app_version + span,input#platform_version + span").css({"top":"0px","transition":"0.2s ease all"})
  });
 $('div#contact_form').on('focusout','input#app_version,input#platform_version',function(){
      if(!$(this).val()){      
       $("input#app_version + span,input#platform_version + span").css({"top":"18px","transition":"0.2s ease all"})  
    }
  });
 
//restrict mobile number on paste
 $("div#contact_form #userMobile").on('paste', function(event) { 
   $("div#contact_form #userMobile").val($("div#contact_form #userMobile").val().replace(/[^0-9]/g, ''));
  
 });

//restrict episode number on paste
$('div#contact_form').on('paste','input#episode_number',function(){      
     setTimeout(function() {
       $("div#contact_form #episode_number").val($("div#contact_form #episode_number").val().replace(/[^0-9]/g, ''));
      var vnumber = $("div#contact_form #episode_number").val();
       if(vnumber.length >=2 && vnumber[0]=='0' && vnumber[1]=='0') {
          $("div#contact_form #episode_number").val(vnumber.substring(1));
       }

    }, 0);   
  }); 


 //RESET DATA START
window.resetFormData = function(){  
  resetData = true;  
   selectedSubCategory = '';
   selectedOriginalSubCategory = ''; 

   autoSuggestTextValue = "";
   autoSuggestOrgTextValue = "";
   //clear upload value
    $("#file_name").val('');
    updateUrlRec = '';

  //Clear subcategory and fields by category 
  createDataByCategory();
  setTimeout(function(){
            setStrings(); 
            }, 0);    
  

  //reset error message, mobile, email fields
    $("#errMsg").val('');
    // $("#userMobile").val('');
    // $("#userEmail").val('');
    checkRequiredFields();
    // hideErrorMobile();
    // hideErrorEmail();   
 
 //input label animation
 inputLabelAnimation();
 listenerCalled = [];
 resetData = false;

}
//RESET DATA END

 }) // contact us api details
checkRequiredFields();


//calculate margin for logo
function logoPlacementCal(){
  var bodyWidth = $('body').width();
  var containerWidth = $('.container').width();
  var logoWidth = $('.logo').width();
  var logoPlaceWidth  = bodyWidth - containerWidth;
  var logoMargin = (logoPlaceWidth - logoWidth)/2; 
  $('.logo').css('left',(logoMargin/2)-5);
}
$( window ).resize(function() {              
    logoPlacementCal();             
});

$('#contact_form').on('input', function() {
closeSubmitResponseMsg();
});

    if(country!="IN") {
      $('.charactersstyle').show()
    }else {
      $('.charactersstyle').hide()
    }

}) // document.ready

//created textbox width for countrycode by characters
function codeStyles() {      
      var countryCodeWidth = $('#countryCode').val().length * 10;
      $('#countryCode').innerWidth(countryCodeWidth);         
    }

//get all field values for form submit
function getAllValues() {
  submit_clicked = true;
  $('#submitData').prop('disabled', true);
  $('#submitData').removeClass('btnStyleSelected');
  $('#resetData').prop('disabled', true);
  $('#resetData').removeClass('btnStyleSelected');
 var country, email, mobile, categoryCheck, subcategory, subcategoryRec, errMsgTxt, subCatId, sendCompleteData, categoryId;
 sendCompleteData = {};
 email = document.getElementById("userEmail").value;
 mobile = document.getElementById("userMobile").value;
 categoryCheck = $('input[name="category_group"]:checked').attr('originalcategory').trim();
 category = (categoryCheck.length > 0) ? (categoryCheck) : ($('#optImgRadio0').text());
 subcategoryRec = $("#options").text().trim();
 subCatId = $("#options").attr("receivedid");
 categoryId =($('input[name="category_group"]:checked').attr("receivedid") && $('input[name="category_group"]:checked').attr("receivedid").length > 0) ? ($('input[name="category_group"]:checked').attr("receivedid")) : ($("#catOpt0").attr("receivedid"));
 subcategory = (subcategoryRec !== 'Select category') ? (subcategoryRec) : $("#subCat0").text();
 errMsgTxt = document.getElementById("errMsg").value;
 var elems = document.getElementsByTagName("*");
 var allDynamicVal = [];
 var dataEntry, textIndex, textVal;
  // get all dynamic fields value
 sendCompleteData = {
  "mobile": mobile,
  "email": email,
  "name":user_name,
  //"platform_name":platform,
  "message": errMsgTxt,
  /*"version":"14.16.2",
  "user_id":"686868-7979-8909",*/
  "country": locationCountry,
  "state":locationState
 }


var objCat = {}, objSubCat = {};

//objCat[categoryId] = category;
//objSubCat[subCatId] = subcategory;
objCat[categoryId] = selectedOriginalCategory;
objSubCat[subCatId] = selectedOriginalSubCategory;

sendCompleteData.category = objCat;
sendCompleteData.subcagtegory = objSubCat;
 for (var i = 0, m = elems.length; i < m; i++) {
  var sendData = {};
  if (elems[i].title && elems[i].title.length > 0) {
    if(elems[i].id && elems[i].id === 'file_name'){
      var imgPath;
      imgPath = '';
      imgPath = $('#file_name').attr('title');
      sendData[imgPath] = updateUrlRec
      allDynamicVal.push(sendData);
    } else if ((elems[i].id && elems[i].id.indexOf("datepicker_") === -1)) {

      //check the autosuggestion original value
      var textIndex = elems[i].title;
      if((elems[i].getAttribute('autocompleteorgvalue') != '') && (elems[i].getAttribute('autocompleteorgvalue') != null) && (elems[i].getAttribute('autocompleteorgvalue') != undefined)){
        textVal = (document.getElementById(textIndex).value.length > 0) ? (document.getElementById(textIndex).getAttribute("autocompleteorgvalue")) : (document.getElementById(textIndex).innerText);
      }else{
        textVal = (document.getElementById(textIndex).value.length > 0) ? (document.getElementById(textIndex).value) : ( (((elems[i].getAttribute('org_option_val') != '') && (elems[i].getAttribute('org_option_val') != null) && (elems[i].getAttribute('org_option_val') != undefined) )) ? (elems[i].getAttribute('org_option_val')) : (document.getElementById(textIndex).innerText)  );
      }
    sendData[elems[i].title] = textVal
    allDynamicVal.push(sendData);
   

   } else if (elems[i].id && elems[i].id.indexOf("datepicker_") != -1) {
    var dateVal;
    dateVal = document.getElementById("datepicker_"+elems[i].title).value;
    sendData[elems[i].title] = dateVal;
    allDynamicVal.push(sendData);
   }

  }
 }

 sendCompleteData.custom_fields = JSON.stringify(allDynamicVal);
 $('#body').css('pointer-events','none');
 submitData(sendCompleteData)
} //getValue function

//submit form
var submissionApi;
function submitData(sendCompleteData) {
  disableBtn();
  const path =  'https://useraction.zee5.com/contact/submission.php';
  submissionApi =  new XMLHttpRequest()
  submissionApi.onreadystatechange = function() {
    if (this.readyState === 4) {      
     if(this.status === 200){
      // toast message  
      callToast('formSubmit',null,'success');  
      //clearForms();
      $('#resetData').prop('disabled', false);
      $('#resetData').addClass('btnStyleSelected');
      // $('body').click(true);
      $('#body').css('pointer-events','');
      submit_clicked = false
      resetFormData();
     // $(".uploadText").text(''); 
     }else{
      callToast('formSubmit',null,'fail');  
       $('#resetData').prop('disabled', false);
      $('#resetData').addClass('btnStyleSelected');
      // $('body').click(true);
      $('#body').css('pointer-events','');
      submit_clicked = false
      checkRequiredFields()
      //resetFormData();
     }

    } 
    
  }
  submissionApi.open("POST", path )
  submissionApi.setRequestHeader("Content-type", "application/json");
  submissionApi.send(JSON.stringify(sendCompleteData))
}

//Toast message
function callToast(submitCategory,message,status) {
    // let p;
    // p = this.document.getElementById('toastMsg');
    // p.className = 'show';

if(submitCategory === 'formSubmit'){
  $('.toastMsg-submit-outer').show();
  if(status == 'success'){
    //submitResponseDiv = true
    $('.toastMsg-submit .message').text(strings[translation].RESPONSE_RECEIVED); 
  }else {
    $('.toastMsg-submit .message').text(strings[translation].TRY_LATER); 
  }


}else{
   let p;
    p = this.document.getElementById('toastMsg');
    p.className = 'show';
   $('#toastMsg').text(message);
    setTimeout(function() { p.className = p.className.replace('show', ''); }, 5000);
}

    // switch(msg) {      
    //   case 'file':
    //     $('#toastMsg').text('File uploaded successfully');
    //     break;
    //   case 'fileError':
    //     $('#toastMsg').text('The file could not be uploaded, please try again');
    //     break;
    //   case 'toastMsg':
    //     $('#toastMsg').text(strings[translation].RESPONSE_RECEIVED);
    //   break;
    // }  


   //(msg === 'toastMsg') ? ($('#toastMsg').text(dispLang.RESPONSE_RECEIVED))  : ($('#toastMsg').text('File uploaded successfully'));
    // setTimeout(function() { p.className = p.className.replace('show', ''); }, 5000);
}

function closeSubmitResponseMsg(){
  $('.toastMsg-submit-outer').hide();  
  $('.toastMsg-submit .message').text(''); 
}

//RESET ALl Values
function resetAllValues(){
  closeSubmitResponseMsg();  
  resetFormData();
}

// animation to radio button
function addAnimate(index, id) {

 var rates = document.getElementsByName('category_group');
 var rate_value;
 for (var i = 0; i < rates.length; i++) {
  $('#optImg' + i).removeClass('addActiveRadio');
  $('#optImg' + i).removeClass('animate');
  if (rates[i].checked) {
   $('input[name="category_group"]:checked').attr({
    "receivedid": decodeURIComponent(id)
   });
   $('#optImg' + index).addClass('addActiveRadio');
   $('#optImg' + index).addClass('animate');

  }
 }
}

// dynamic dropdown selected value
function selectedOption(id, ind, indexVal,orgValue) {
  if(id !== "" && id !== undefined && id!== null){
    $('#'+ind).text(decodeURIComponent(id));
  }else{
    $('#'+ind).text(decodeURIComponent(orgValue));
  }
 //$('#'+ind).text(decodeURIComponent(id));
 $('#'+ind).append(' <span class="imgClass"><img src="./down_arrow.png"></span>');
 $('#spanDyan' + indexVal).addClass('shiftSpan');
 $('#'+ind).attr('org_option_val',decodeURIComponent(orgValue));
 listenerCalled = [];
 closeSubmitResponseMsg();
}

// subcategory dropdown selected value
function selectedSubcategory(value, id, orgVal) {
 $("#options").attr({
  "receivedid": decodeURIComponent(id)
 });
 $("#options").text(decodeURIComponent(value));
 $("#options").attr({
  "originalsubcategoryval": decodeURIComponent(orgVal)
 });
 $("#options").append(' <span class="imgClass"><img src="./down_arrow.png"></span>');
 $('#subCatSpan').addClass('shiftSpan');
 closeSubmitResponseMsg();
}

function test() {
  $('#file_name').click()
}

function selectFile() {  
  $('#spanDyanFile').addClass('shiftSpan')
 x = document.getElementById("file_name");

 txt = "";
 if ('files' in x) {

  if (x.files.length == 0) {
   txt = "Select one or more files.";
  } else {
    closeSubmitResponseMsg();
   for (var i = 0; i < x.files.length; i++) {
    // txt += "<br><strong>" + (i+1) + ". file</strong><br>";
    var file = x.files[i];
    if ('name' in file) {
     txt += file.name;
    }
    // if ('size' in file) {
    //   txt += "size: " + file.size + " bytes <br>";
    // }
   }
   $('#uploadAFile').prop('disabled', false);
   $(".text-left").html(txt)
 //  }
 // } else {
 //  if (x.value == "") {
 //   txt += "Select one or more files.";
 //  } else {
 //   txt += "The files property is not supported by your browser!";
 //   txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
 //  }
 // }
}
}
}

// get country list data
function changeCountry(value) {
 $("#countryOptions").text(that.country_array[value].name);
 $('.supportTxt').text(that.country_array[value].mail);
 //SupportTxtUrl = 'mailto:' + data[i].mail + '?Subject=Feedback';
 $('.supportTxtUrl').attr('href','mailto:' + that.country_array[value].mail + '?Subject=Feedback');
 countryCode = '+' + that.country_array[value]["phone-code"] + '-';
 $('#countryCode').val(countryCode); 
 $("#countryOptions").append(' <span class="imgClass"><img src="./down_arrow.png"></span>');
 $('#countrySpan').addClass('shiftSpan')
 codeStyles(); 
 country = that.country_array[value].code;
 $('#loginMobileErrorMsg').css({'display': 'none'});
 mobileValidCommon(true);
 checkRequiredFields();
closeSubmitResponseMsg();
USAnoteChanges();
}


function USAnoteChanges(){
  if (country === 'US') {
    $('.delayNote').css({'display': 'none'});
    $('.usaSupport').css({'display': 'flex'});
  } else  {
    $('.delayNote').css({'display': 'block'});
    $('.usaSupport').css({'display': 'none'});
  }
}

function restrictNumbers(e) {
 // Allow: backspace, delete, tab, escape, enter.
 if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
  // Allow: Ctrl+A, Command+A
  (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
  // Allow: Ctrl+V, Command+V
  (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
  // Allow: home, end, left, right, down, up
  (e.keyCode >= 35 && e.keyCode <= 40)) {
  // let it happen, don't do anything
  return;
 }
 // Ensure that it is a number and stop the keypress
 if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
  e.preventDefault();
 }
 var elementId = e.target.id;
 $("#"+elementId).on('paste', function(event) {
  setTimeout(function() {
   $("#"+elementId).val($("#"+elementId).val().replace(/[^0-9]/g, ''));
  }, 0);
 });

var vnumber = $("#"+elementId).val();
 if(vnumber.length >=2 && vnumber[0]=='0' && vnumber[1]=='0') {
    $("#"+elementId).val(vnumber.substring(1));
 }

}


function MobileRestrictNumbers(e) {
 // Allow: backspace, delete, tab, escape, enter.
 if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
  // Allow: Ctrl+A, Command+A
  (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
  // Allow: Ctrl+V, Command+V
  (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
  // Allow: home, end, left, right, down, up
  (e.keyCode >= 35 && e.keyCode <= 40)) {
  // let it happen, don't do anything
  return;
 }
 // Ensure that it is a number and stop the keypress
 if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
  e.preventDefault();
 }
 var elementId = e.target.id;
 $("#"+elementId).on('paste', function(event) {
  setTimeout(function() {
   $("#"+elementId).val($("#"+elementId).val().replace(/[^0-9]/g, ''));
  }, 0);
 });
}

//Email validation START
var email_return = false;
function emailValidCommon(change) {
 if ($('#userEmail').length) {
  let count1;
  count1 = $('#userEmail').val().trim().length;
  if (count1 > 0) {

   let email_text;
   email_text = $('#userEmail').val().trim();
   let re;
   //re = /^([a-zA-Z0-9._+-]+)(@[a-zA-Z0-9-.]+)(.[a-zA-Z]{2,4}){2,}$/;
   //re = /^([a-zA-Z0-9._]+)(@(?=.{1,}.[^.]*$)+)([A-Za-z0-9-]+)(.[A-Za-z0-9]+)*(.[A-Za-z]{1,})$/;
   
   //working without e.test@gmail.com validation
   //re = /^([a-zA-Z0-9]+)(([^=<>()\[\]\\.,;:\s@^}|{#!%$*&?`~/+'"]+(\.[^=<>()\[\]\\.,;:\s@^}|{#!%$*&?`~/+'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
   //re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
   re = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
   let emailTest;
   emailTest = re.test(email_text);

   if (emailTest === false) {
    if (change) {
     $('#loginErrMsg').css({
      'display': 'block'
     });
     $('.emailId').css({
      'border-bottom': '1px solid red'
     });
    }
    email_return = false;
   } else {
    email_return = true;
    if (change) {
     $('#loginErrMsg').css({
      'display': 'none'
     });
    }
   }


  } else {
   email_return = false;
  }

  if (!email_return) {
   disableBtn();
  }
  return email_return;
 }
}

function hideErrorEmail() {
 $('.InvalidEmail').css({
  'display': 'none'
 }); 
}
//Email validation END


//Phone validation START
var mobile_return = false;
function mobileValidCommon(change) { 
if ($('#userMobile').length)  {
    let mobile_number, minMobileLength, maxMobileLength, count1;
    mobile_number = $('#userMobile').val().trim();
    minMobileLength = 4;
    maxMobileLength = maxLength;
    count1 = $('#userMobile').val().length;
    if (mobile_number !== undefined && mobile_number.length === 0 ) {
      if (change) {
        $('#loginMobileErrorMsg').css({'display': 'none'});        
      }
      mobile_return = true;
      return mobile_return;
    } else {
      if (change) {        
        $('#loginMobileErrorMsg').css({'display': 'block'});
      }
      if (mobile_number !== undefined && ((mobile_number.length < minMobileLength) || (mobile_number.length > maxMobileLength)) && mobile_number[0] !== '0') {
       
        mobile_return = false;
        return mobile_return;
      } else {
        if (country === 'IN' && countryCode && mobile_number.length === 10  && mobile_number[0] !== '0') {
          mobile_return = true;
          if (change) {            
            $('#loginMobileErrorMsg').css({'display': 'none'});
          }
          return mobile_return;
        } else if (country !== 'IN' && countryCode && mobile_number[0] !== '0' ) {
          mobile_return = true;
          if (change) {            
            $('#loginMobileErrorMsg').css({'display': 'none'});
          }
          return mobile_return;
        } else if (!countryCode && ((mobile_number.length > minMobileLength) && (mobile_number.length < maxMobileLength)) && mobile_number[0] !== '0') {
          mobile_return = true;
          if (change) {           
            $('#loginMobileErrorMsg').css({'display': 'none'});
          }
          return mobile_return;
        } else {          
          
          mobile_return = false;
           if (!mobile_return) {
               disableBtn();
              }
          return mobile_return;


        }
      }
    }
  }
  }
function hideErrorMobile() {
    $('.InvalidMobile').css({'display': 'none'});    
  }
//Phone validation END

//Date validation START

function restrictDateFormat(e) {
            let key;
            key = e.keyCode;
            if ( e.target.value.length === 2 &&  key !== 8 && key !== 46 ) {
              e.target.value = e.target.value + '.';              
            } else if (( e.target.value.length === 3 || e.target.value.length === 6) && key === 8 ) {
              let str;
              str = e.target.value;
              e.target.value = str.substring(0, str.length - 1)
              //$('#date').val(str.substring(0, str.length - 1));
            } else if (e.target.value.length === 5 &&  key !== 8 && key !== 46 ) {
              e.target.value = e.target.value + '.'; 
            }
              // Allow: backspace, delete, tab, escape, enter.
              if ($.inArray(e.keyCode, [ 8, 9, 27, 13, 46]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
              return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || (e.keyCode > 105 ))) {
              e.preventDefault();
            }
          };


function dateValidation(){
var date_valid = true;
let dateValue = $(".datepicker");
     if((dateValue) && (dateValue.length > 0)){
      //let dateValue;
      dateValue = dateValue.val();
      let dateReg;
      dateReg = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
      if (dateValue.match(dateReg)) {
        // todo
      } else {
        if (dateValue.length === 0) {
          // todo
        } else {          
          $('#dateErrMsg').css("display","block");
          date_valid = false;
        }
      }
      if (dateValue.length === 10) {
        let dd, mm, yy, day;
        dd = parseInt (dateValue.slice(0, 2), 10);
        mm  = parseInt (dateValue.slice(3, 5), 10);
        yy = parseInt (dateValue.slice(6, 10), 10);
        day = dd + 1;
        dateValue = new Date((mm) + '/' + dd + '/' + yy);        
            if (dd <= 0) {              
              $('#dateErrMsg').css("display","block");
            date_valid = false;
            }
            if (yy < 1900) {              
              $('#dateErrMsg').css("display","block");
              date_valid = false;
            }
            if (mm > 12 || mm === 0) {             
              $('#dateErrMsg').css("display","block");
              date_valid = false;
            }
              // Create list of days of a month [assume there is no leap year by default]
              let listofDays;
              listofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
              if (mm === 1 || mm > 2) {
                if (dd > listofDays[mm - 1]) {                 
                  $('#dateErrMsg').css("display","block");
                  date_valid = false;
                }
              }
              if (mm === 2) {
                let lyear = false;
                if ( (!(yy % 4) && yy % 100) || !(yy % 400)) {
                  lyear = true;
                }
                if ((lyear === false) && (dd >= 29)) {                 
                  $('#dateErrMsg').css("display","block");
                  date_valid = false;
                }
                if ((lyear === true) && (dd > 29)) {                 
                  $('#dateErrMsg').css("display","block");
                  date_valid = false;
                }
              }
                var today = new Date();
                //var fullDateToday = new Date(today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear());
                //var enteredDate = new Date(dateValue.getDate()+"/"+(dateValue.getMonth()+1)+"/"+dateValue.getFullYear());
                if(dateValue > today){
                   $('#dateErrMsg').css("display","block");
                   date_valid = false;
                }
            } else {
              if (dateValue.length === 0) {
                // todo
              } else {               
                $('#dateErrMsg').css("display","block");
                date_valid = false;

              }
            }           
            if (!date_valid) {
               disableBtn();
              }else{
                 $('.InvalidDate').css({'display': 'none'}); 
              }
            //  console.log("date_valid "+date_valid);
            return date_valid;

}
          }

    function hideErrorDate() {
    $('.InvalidDate').css({'display': 'none'});    
  }
//Date validation END

checkRequiredFields();
//check empty required fields count START
function checkRequiredFields() {

 setTimeout(function() {

  if(submit_clicked) {
    return;
  }
 var requiredFieldsEmptyCount = 0;
     
 $('div#contact_form').find('input[required],button[required]').each(function(index, item) {
  //check validations on button dropdown
  if ($(this).attr("type") == "button") {
   if ($(this).text().indexOf("*") > -1) {
    var currentDropdownButtonText = $(this).text().replace('*', '').trim();
    $.each(obj, function(index, item) {
     if (item.original_category.trim().toLowerCase() == selectedOriginalCategory.trim().toLowerCase()) {
      if (item.original_subcategory.trim().toLowerCase() == selectedOriginalSubCategory.trim().toLowerCase()) {
       if (item.field_info) {
        $.each(item.field_info, function(index2, item2) {
         if (item2.field == currentDropdownButtonText) {
          requiredFieldsEmptyCount++;
         }
        })
       }
      }
     }

    });

   }
  } else {
    //check validations on  input field required
   if ($(this).val()) {

   } else {
    requiredFieldsEmptyCount++;
   }
  }
 })

 // submit button disabled enabled by required fields 
 if (requiredFieldsEmptyCount > 0) {
  disableBtn();
 } else {
  //check email field validation
  var emialValid = emailValidCommon();
  var phoneValid = mobileValidCommon();
  var dateValid = dateValidation();
  var errormsgValue = $('#errMsg').val().length;
  var minchar = errormsgValue && errormsgValue >= 10 ? true : false;


if((dateValid != undefined) && (dateValid != null) ){
  if(country != "IN") {
    if ((!emialValid) || (!phoneValid) || (!dateValid) || (!minchar)) {
     disableBtn();
    } else {
     enableBtn();
    }
  }else {
    if ((!emialValid) || (!phoneValid) || (!dateValid)) {
     disableBtn();
    } else {
     enableBtn();
    }
  }
}else{
     if(country != "IN") {
     if ((!emialValid) || (!phoneValid) || (!minchar)) {
       disableBtn();
      } else {
       enableBtn();
      }
    }else {
      if ((!emialValid) || (!phoneValid)) {
       disableBtn();
      } else {
       enableBtn();
      }
    }
} 
 }

 return requiredFieldsEmptyCount;
},0);

}
//check empty required fields count END

function disableBtn() {
 $('#submitData').prop('disabled', true);
 $('#submitData').removeClass('btnStyleSelected');

 // $('#resetData').prop('disabled', true);
 // $('#resetData').removeClass('btnStyleSelected');
}

function enableBtn() {
 $('#submitData').prop('disabled', false);
 $('#submitData').addClass('btnStyleSelected');

 // $('#resetData').prop('disabled', false);
 // $('#resetData').addClass('btnStyleSelected');
}


function autocomplete_fn(id){

   //set autocomplete original value for freshdesk - if match with option value send eng original value else send entered value
   if((autoSuggestTextValue.trim()) != (id.value.trim())){
     id.setAttribute("autocompleteorgvalue",id.value);
   }
   else{
     id.setAttribute("autocompleteorgvalue",autoSuggestOrgTextValue);
   }

  //id.setAttribute("autocompleteorgvalue",id.value);
  var asset_type, asset_subtype;

  switch(id.id) {
    case  'show_name' : 
      asset_type = '6,1';
      asset_subtype = null;
      break;
    case 'channel_name': 
      asset_type ='9';
      asset_subtype = null;
      break;
    case 'movie_name': 
      asset_type = '0';
      asset_subtype = 'movie';
      break;
    case 'video_name': 
      asset_type = '0';
      asset_subtype = 'video';
      break;
    case 'news_name': 
      asset_type = '0';
      asset_subtype = 'news';
      break;
    case 'original_name': 
      asset_type= '6,1';
      asset_subtype = 'original';
      break;
    default: 
      asset_type = '0,6,9,1';
      asset_subtype = null;
      break;
  }

  if(id.value.length >= 2 && !listenerCalled[asset_type]) {
    listenerCalled[asset_type] = true;
      autocomplete(document.getElementById(id.id), id, asset_type, asset_subtype);    
   
  }
  //initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:



}

/*AUTO SUGGESTIONS START*///////////////////////
/*An array containing all the country names in the world:*/

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/

function autocomplete(inp, id, asset_type, asset_subtype) {
  /*the autocomplete function takes four arguments,
  the text field element, an array of possible autocompleted values, assetType, assetSubtype:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
  var a, b, i, val = this.value;
    if (val.length >= 3) {
      if(asset_subtype == null){
        var path = 'https://gwapi.zee5.com/content/getContent/autosuggestcontactus?q='+id.value+'&translation='+translation + '&country='+country + '&asset_type='+ asset_type
      }else{
        var path = 'https://gwapi.zee5.com/content/getContent/autosuggestcontactus?q='+id.value+'&translation='+translation + '&country='+country + '&asset_type='+ asset_type + '&asset_subtype='+ asset_subtype
      }
              
    var scope = this;
    $.get(path, function(data, status) {    
      names = []
      for(var i =0 ; i< data.docs.length; i++) {
          names.push({'title':data.docs[i].title,'original_title':(((data.docs[i].original_title != "") && (data.docs[i].original_title != null) && (data.docs[i].original_title != undefined) )?(data.docs[i].original_title) : "")})
      }
      arr = names
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", scope.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      scope.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          //if (arr[i].toUpperCase().indexOf(val.toUpperCase())) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          //b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML = arr[i].title.substr(0, val.length);
          b.innerHTML += arr[i].title.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' autocompleteorgvalue='"+arr[i].original_title+"' value='" + arr[i].title + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              var autocompleteorgvalue = this.getElementsByTagName("input")[0].getAttribute("autocompleteorgvalue");
              //inp.attr('orgValue') = this.getElementsByTagName("input")[0].orgValue;
              inp.setAttribute('autocompleteorgvalue', autocompleteorgvalue);

              autoSuggestTextValue = this.getElementsByTagName("input")[0].value;
              autoSuggestOrgTextValue = this.getElementsByTagName("input")[0].getAttribute("autocompleteorgvalue");
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        // }
      }
    })
} else {
      closeAllLists();

}
      
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
/*AUTO SUGGESTIONS END*///////////////////////////

