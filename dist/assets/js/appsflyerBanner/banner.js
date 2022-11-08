 var banner = new AFBanner();
   var settings = {
   // banner settings
   title: "ZEE5-Movies, TV Shows, LIVE TV & Originals",
   subtitle: "click to open",
   app_icon: "/assets/common/android-chrome-256x256.png",
   call_to_action: "Open",
   show_only_mobile: true,
   

   // attribution settings
   media_source: "banner_pid",
   campaign: "banner_c",
   ad: "banner_ad",
   ad_id: "banner_ad_id",
   site_id: "banner_site_id",
   sub1: "banner_sub1",
   

   // routing settings
   onelink_id: "RlQq",
   subdomain: "wingboard",
   mobile_deeplink: "wingboard://"
};
banner.init("my-banner", settings);