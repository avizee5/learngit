(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"tb+r":function(e,t,n){"use strict";n.r(t);var i=n("CcnG"),l=(n("EfPX"),n("Dn3B")),a=n("6nr9"),s=n("c+W5"),o=n("fHJZ"),r=n("XsXs"),c=n("9jJz"),u=n("nE/I"),h=n("dwY0"),g=n("Lpmr"),p=n("OlR4"),d=n("HtUY"),v=n("sE5F"),m=n("WyiN"),f=n("AytR"),b=n("EVdn"),w=n("buEt"),y=(n("h2cs"),n("DDB7"),n("Ip0R")),C=function(){function e(e,t,n,i,l,a,s,o,r,c,u,h,g,p,d,v){var m=this;this.linkservice=e,this.commonService=t,this.platformId=n,this.networkService=i,this.gtm=l,this.videoService=a,this.settingsService=s,this.epgService=o,this.filterService=r,this.location=c,this.route=u,this.routerLink=h,this.headerservicesService=g,this.http=p,this.routeservice=d,this.subscriptionService=v,this.view="livetv",this.channels=[],this.completeChannels=[],this.filterCheck=[],this.businessTypes=[],this.completeGrid=[],this.liveTvCategory=[],this.completeGenre=[],this.DATA=!0,this.timer=[],this.adSpacing=2,this.tempData=[],this.premium=!1,this.contentUpdate=!1,this.ngUnsubscribe=new w.a,this.assetbasepath=f.a.assetsBasePath,Object(y.y)(this.platformId)&&(this.localStorage=localStorage,this.window=window,this.navigator=navigator),this.epgService.getcurrentTime(f.a.serverTimeUrl).takeUntil(this.ngUnsubscribe).subscribe(function(e){m.serverTime=new Date(e.serverdate),m.currentTime=m.serverTime.getTime()},function(e){m.serverTime=new Date,m.currentTime=m.serverTime.getTime()}),this.router=h,this.router2=this.window.location.pathname,this.headerservicesService.viewChange(this.router2),this.routeservice.setRoute(this.router2),this.routeservice.setLoginRoute(this.window.location.pathname),this.destroyFilter=this.filterService.configObservable.subscribe(function(e){var t;m.selectedFilters=e,t=m.networkService.getScreenStatus(),m.selectedFilters&&(!0===t&&b("#loaderPage").css("display","block"),m.autoloaderDisable=!1,setTimeout(function(){m.update()},1e3))}),this.window=window,this.version=this.window.appVersion,this.navigator=navigator,this.platform=this.navigator.userAgent.match(/mobile|iPhone|iPod|iPad/i)?"Web Mobile":"Web Desktop"}return e.prototype.ngOnInit=function(){var e=this;Object(y.y)(this.platformId)&&(this.localStorage=localStorage,this.window=window,this.navigator=navigator),this.headerservicesService.breadCrump([{label:"BREADCRUMB.HOME",url:"/",enable:!0},{label:"BREADCRUMB.LIVE",url:this.router2,enable:!1}]),this.countryCode=this.settingsService.getCountry(),this.linkservice.addTag({rel:"canonical",href:this.window.location.origin+"/"+this.routeservice.getBaseLocation()+"livetv"}),this.settingsService.getCompleteConfig(),(this.navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)||this.window.innerWidth<=768)&&(this.touchScreen=!0),this.commonService.qgraphevent("LIVETVsection_visited",{country:this.countryCode,state:this.localStorage.getItem("state_code")}),this.filterbar=!1,this.filterFlag=!1,!0===this.networkService.getScreenStatus()&&b("#loaderPage").css("display","block"),this.pageName="live tv",this.gtm.sendPageName(this.pageName),this.gtm.sendEvent(),this.gtm.storeWindowError(),this.settingsService.bluekaiPagename("liveTv"),this.window.scrollTo(0,0),this.sub=this.route.params.takeUntil(this.ngUnsubscribe).subscribe(function(t){e.id=t.id,e.name=t.name,e.watch=t.watch}),this.filter_titles=[{code:"2",name:"DETAILS.GENRE"},{code:"1",name:"COMMON.LANGUAGE"}]},e.prototype.openfilterNav=function(){this.filterbar=!0},e.prototype.closeFilter=function(e){this.filterbar=!1},e.prototype.getServerTime=function(){var e=this;this.epgService.getcurrentTime(f.a.serverTimeUrl).takeUntil(this.ngUnsubscribe).subscribe(function(t){e.serverTime=new Date(t.serverdate),e.currentTime=e.serverTime.getTime(),e.update()},function(t){e.serverTime=new Date,e.currentTime=e.serverTime.getTime(),e.update()})},e.prototype.update=function(){var e=this;this.liveTvCategory=[],this.categories=this.filterService.getSelectedGenre(),this.languages=this.filterService.getSelectedLanguage(),this.genres=this.filterService.getChannelsGenre();var t=this.filterService.getSelectedLanguage();if(this.languages=t.join(),window.scrollTo(0,0),0===this.genres.length){var n=void 0;n=new m.a(this.http,null,null),this.countryCode=this.settingsService.getCountry(),n.v1ChannelByIdGet("genres",void 0,this.countryCode).takeUntil(this.ngUnsubscribe).timeout(f.a.timeOut).subscribe(function(t){var n;(n=t).genres&&(e.genresdata=[],e.genresdata=e.filterService.getIds(n.genres),e.filterService.setChannelsGenre(n.genres),e.filterCall())},function(t){e.DATA=!1,e.autoloaderDisable=!0,b("#loaderPage").css("display","none"),e.gtm.sendErrorEvent("api",t)})}if(this.genres.length>0){var i=void 0;i=[];for(var l=0;l<this.genres.length;l++)i.push(this.genres[l].id);this.genresdata=[],this.genresdata=i.join(","),this.filterCall()}},e.prototype.filterCall=function(){this.categories.length>0&&(this.genresdata=[],this.genresdata=this.categories.join(",")),this.fetchCall()},e.prototype.fetchCall=function(){var e,t,n,i,l=this;this.genreObject={},e=this.filterService.gettranslation(),t=new m.b(this.http,null,null),n=this.settingsService.getCountry(),(i=new v.d).append("X-Z5-AppPlatform",this.platform),i.append("X-Z5-Appversion",this.version);var a=new v.h({method:v.g.Get,headers:i});this.http.request(f.a.catalogbasepath+"/v1/channel/bygenre?sort_by_field=channel_number&genres="+this.genresdata+"&languages="+this.languages+"&country="+n+"&translation="+e,a).timeout(f.a.timeOut).takeUntil(this.ngUnsubscribe).subscribe(function(e){var n;l.liveTvValue=e.json(),l.filterFlag=!0,l.completeChannelList=[],l.completeBusinesstypesList=[],n=[],l.tempData=[],l.filterCheck=[];for(var i=0;i<l.liveTvValue.items.length;i++)if(l.liveTvValue.items[i].items.length>0){n.push(l.liveTvValue.items[i].title),l.liveTvValue.items[i].title&&l.filterCheck.push(l.liveTvValue.items[i].title);var a,s,o="",r="";(i-2)%l.adSpacing==0&&(o="div-gpt-ad-1521551569137-"+(i-2)/l.adSpacing,r="div-gpt-ad-1521551617284-"+(i-2)/l.adSpacing),l.liveTvCategory.push(l.liveTvValue.items[i].id?{adDesktop:o,adMobile:r,title:l.liveTvValue.items[i].title,original_title:l.liveTvValue.items[i].id,type:"livetv",content:""}:{adDesktop:o,adMobile:r,title:l.liveTvValue.items[i].title,original_title:"",type:"livetv",content:""}),l.genreObject[l.liveTvValue.items[i].title]=i,l.channelList=[],l.businessTypesList=[];for(var c=0;c<l.liveTvValue.items[i].items.length;c++)l.channelList.push(l.liveTvValue.items[i].items[c].id),l.businessTypesList.push(l.liveTvValue.items[i].items[c].business_type);a=l.channelList.join(","),s=l.businessTypesList.join(","),l.completeChannelList.push(a),l.completeBusinesstypesList.push(s)}if(0===l.filterCheck.length&&(l.DATA=!1,l.autoloaderDisable=!0,b("#loaderPage").css("display","none")),l.completeChannelList.length>0)for(var u=function(e){l.completeChannelList[e].length>0?(l.countryCode=l.settingsService.getCountry(),t.v1EpgNowGet(l.completeChannelList[e],void 0,void 0,void 0,l.countryCode).takeUntil(l.ngUnsubscribe).timeout(f.a.timeOut).subscribe(function(t){l.genreObject[n[e]]=e,l.tempData.push(t),l.fetchData(n[e],n[e],t,l.completeBusinesstypesList[e])},function(e){l.gtm.sendErrorEvent("api",e)})):l.tempData.push("")},h=0;h<l.completeChannelList.length;h++)u(h)},function(e){l.DATA=!1,b("#loaderPage").css("display","none")})},e.prototype.fetchData=function(e,t,n,i){var l;if(this.filter=!0,l=i.split(","),this.completeGrid=[],this.grid=[],n.items.length>0){for(var a=0;a<n.items.length;a++){var s;n.items[a].items.length>0?(this.startTime=Date.parse(n.items[a].items[0].start_time),this.elapsed=this.currentTime-this.startTime,s=this.elapsed/1e3,Math.floor(s/n.items[a].items[0].duration*100)<=100&&(this.progress=Math.floor(s/n.items[a].items[0].duration*100)),this.grid={channel:n.items[a].title,channel_name:n.items[a].title,channel_original_title:n.items[a].original_title,channel_id:n.items[a].id,list_image:n.items[a].items[0].list_image,original_title:n.items[a].items[0].original_title,title:n.items[a].items[0].title,id:n.items[a].items[0].id,business_type:l[a],elapsed:this.elapsed,duration:n.items[a].items[0].duration,genres:n.items[a].genres,progress:this.progress,asset_type:10},this.completeGrid.push(this.grid)):(this.grid={channel:n.items[a].title,channel_name:n.items[a].title,channel_original_title:n.items[a].original_title,channel_id:n.items[a].id,list_image:"",genres:n.items[a].genres,asset_type:10,business_type:l[a]},this.completeGrid.push(this.grid))}var o;this.liveTvCategory[this.genreObject[e]].content=this.completeGrid,this.liveTvCategory.length>0?(this.DATA=!0,this.liveTvCategory.length===this.tempData.length&&(this.liveTvCategory[0].content=this.liveTvCategory[0].content,this.contentUpdate=!this.contentUpdate,o=this,setTimeout(function(){o.getServerTime()},3e5),b("#loaderPage").css("display","none"),this.autoloaderDisable=!0)):(this.DATA=!1,b("#loaderPage").css("display","none"))}else this.DATA=!1,b("#loaderPage").css("display","none")},e.prototype.ngOnDestroy=function(){this.linkservice.removeCanonicalLink(),this.destroyFilter.unsubscribe(),this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()},e}(),T=function(){},M=n("pMnS"),U=n("ymtI"),_=n("4mzP"),S=n("ZYCi"),O=n("3FoF"),k=n("zNit"),L=n("Lpae"),P=n("wApe"),x=n("Y/ON"),D=n("GHGJ"),A=n("sw+E"),I=n("THGi"),E=n("mQRN"),z=i.Ka({encapsulation:0,styles:[[".nodataavailable[_ngcontent-%COMP%]{position:relative;height:75vh;top:20vh}.icon-unselect[_ngcontent-%COMP%]{background:rgba(0,0,0,0);border:none;outline:0}.ad-container[_ngcontent-%COMP%]{position:relative;margin-bottom:20px;width:100%;overflow:hidden}.ad-desktop[_ngcontent-%COMP%], .ad-mobile[_ngcontent-%COMP%]{position:relative;margin:auto;display:table}button.icon-unselect[_ngcontent-%COMP%]:hover{border-color:#bf006b}button.icon-unselect[_ngcontent-%COMP%]:active{background-color:#bf006b}.auto-loader[_ngcontent-%COMP%]{background:url(/assets/common/loading.gif) center/30px 30px no-repeat;width:100%;height:40px;display:block}.title1[_ngcontent-%COMP%]{padding-top:137px;margin-left:calc(19.53%);margin-bottom:calc(100vw*(14/1920));font-family:Roboto;font-weight:500;font-size:36px;color:#eee;opacity:1;display:block;letter-spacing:.03em}#filter-button[_ngcontent-%COMP%]{font-family:Roboto;font-weight:400;width:126px;height:40px;font-size:16px;color:#fff;border-radius:2px;letter-spacing:2px;position:relative;float:right;right:calc(23.1%);border:1px solid #eee;background-color:rgba(255,255,255,0);outline:0;margin-top:-36px}#filter-button[_ngcontent-%COMP%]:hover{border-color:#bf006b;color:#bf006b}#filter-button[_ngcontent-%COMP%]:focus{background-color:#bf006b;border:1px ridge #bf006b;color:#fff}#filter-icon[_ngcontent-%COMP%]{position:relative;float:right;right:calc(5%);display:none;padding-right:0;margin-top:-28px}.footerSpace[_ngcontent-%COMP%]{height:40px}@media only screen and (min-width:1400px) and (max-width:10000px){#filter-button[_ngcontent-%COMP%]{right:calc(24.5%)}.title1[_ngcontent-%COMP%]{margin-left:calc(19.53%)}}@media only screen and (min-width:770px) and (max-width:1400px){#filter-button[_ngcontent-%COMP%]{right:calc(7.88%)}.title1[_ngcontent-%COMP%]{margin-left:calc(7.3%)}}@media screen and (max-width:769px) and (min-width:481px){.title1[_ngcontent-%COMP%]{padding-top:140px;margin-left:calc(2.5%);font-size:36px;width:95%}#filter-button[_ngcontent-%COMP%]{display:none}#filter-icon[_ngcontent-%COMP%]{display:block}}@media screen and (max-width:480px) and (min-width:0px){.title1[_ngcontent-%COMP%]{padding-top:140px;margin-left:calc(2.5%);font-size:20px;width:96%}#filter-button[_ngcontent-%COMP%]{display:none}#filter-icon[_ngcontent-%COMP%]{display:block;right:calc(2.5%)}}.occupyAvailableSpace[_ngcontent-%COMP%]{width:100%;height:100%}"]],data:{}});function N(e){return i.gb(0,[(e()(),i.Ma(0,0,null,null,1,"app-scroll-list",[],null,null,null,U.b,U.a)),i.La(1,770048,null,0,_.a,[v.e,p.a,i.z,o.a,S.l,h.a,a.a],{arrayList:[0,"arrayList"],detectChange:[1,"detectChange"],yIndex:[2,"yIndex"]},null)],function(e,t){e(t,1,0,t.parent.context.$implicit,t.component.contentUpdate,t.parent.context.index)},null)}function R(e){return i.gb(0,[(e()(),i.Ma(0,0,null,null,2,"div",[],null,null,null,null,null)),(e()(),i.Da(16777216,null,null,1,null,N)),i.La(2,16384,null,0,y.n,[i.M,i.J],{ngIf:[0,"ngIf"]},null)],function(e,t){e(t,2,0,t.context.$implicit.content)},null)}function V(e){return i.gb(0,[(e()(),i.Ma(0,0,null,null,2,"div",[],null,null,null,null,null)),(e()(),i.Da(16777216,null,null,1,null,R)),i.La(2,802816,null,0,y.m,[i.M,i.J,i.q],{ngForOf:[0,"ngForOf"]},null)],function(e,t){e(t,2,0,t.component.liveTvCategory)},null)}function j(e){return i.gb(0,[(e()(),i.Ma(0,0,null,null,12,"div",[],null,null,null,null,null)),(e()(),i.Ma(1,0,null,null,2,"h1",[["class","title1"]],null,null,null,null,null)),(e()(),i.eb(2,null,[""," "])),i.Ya(131072,O.a,[k.a,i.h]),(e()(),i.Ma(4,0,null,null,2,"button",[["id","filter-button"],["tabindex","-1"]],null,[[null,"click"]],function(e,t,n){var i=!0;return"click"===t&&(i=!1!==e.component.openfilterNav()&&i),i},null,null)),(e()(),i.eb(5,null,["",""])),i.Ya(131072,O.a,[k.a,i.h]),(e()(),i.Ma(7,0,null,null,1,"button",[["class","icon-unselect"],["id","filter-icon"],["tabindex","-1"]],null,[[null,"click"]],function(e,t,n){var i=!0;return"click"===t&&(i=!1!==e.component.openfilterNav()&&i),i},null,null)),(e()(),i.Ma(8,0,null,null,0,"img",[["alt","filterIcon"],["class","occupyAvailableSpace"]],[[8,"src",4]],null,null,null,null)),(e()(),i.Ma(9,0,null,null,1,"app-selected-options",[],[[8,"hidden",0]],[["window","scroll"],["window","resize"]],function(e,t,n){var l=!0;return"window:scroll"===t&&(l=!1!==i.Wa(e,10).onScrollEvent(n)&&l),"window:resize"===t&&(l=!1!==i.Wa(e,10).onResize(n)&&l),l},L.b,L.a)),i.La(10,638976,null,0,P.a,[i.z,o.a,l.a],{showOptions:[0,"showOptions"]},null),(e()(),i.Da(16777216,null,null,1,null,V)),i.La(12,16384,null,0,y.n,[i.M,i.J],{ngIf:[0,"ngIf"]},null)],function(e,t){var n=t.component;e(t,10,0,n.filterFlag),e(t,12,0,n.liveTvCategory)},function(e,t){var n=t.component;e(t,2,0,i.fb(t,2,0,i.Wa(t,3).transform("MENU.LIVE_CAPS"))),e(t,5,0,i.fb(t,5,0,i.Wa(t,6).transform("COMMON.FILTER"))),e(t,8,0,n.assetbasepath+"assets/common/refine_icon.png"),e(t,9,0,!n.filterFlag)})}function F(e){return i.gb(0,[(e()(),i.Ma(0,0,null,null,12,"div",[],null,null,null,null,null)),(e()(),i.Ma(1,0,null,null,2,"h1",[["class","title1"]],null,null,null,null,null)),(e()(),i.eb(2,null,[""," "])),i.Ya(131072,O.a,[k.a,i.h]),(e()(),i.Ma(4,0,null,null,2,"button",[["id","filter-button"],["tabindex","-1"]],null,[[null,"click"]],function(e,t,n){var i=!0;return"click"===t&&(i=!1!==e.component.openfilterNav()&&i),i},null,null)),(e()(),i.eb(5,null,["",""])),i.Ya(131072,O.a,[k.a,i.h]),(e()(),i.Ma(7,0,null,null,1,"button",[["class","icon-unselect"],["id","filter-icon"],["tabindex","-1"]],null,[[null,"click"]],function(e,t,n){var i=!0;return"click"===t&&(i=!1!==e.component.openfilterNav()&&i),i},null,null)),(e()(),i.Ma(8,0,null,null,0,"img",[["alt","filterIcon"],["class","occupyAvailableSpace"]],[[8,"src",4]],null,null,null,null)),(e()(),i.Ma(9,0,null,null,1,"app-selected-options",[],[[8,"hidden",0]],[["window","scroll"],["window","resize"]],function(e,t,n){var l=!0;return"window:scroll"===t&&(l=!1!==i.Wa(e,10).onScrollEvent(n)&&l),"window:resize"===t&&(l=!1!==i.Wa(e,10).onResize(n)&&l),l},L.b,L.a)),i.La(10,638976,null,0,P.a,[i.z,o.a,l.a],{showOptions:[0,"showOptions"]},null),(e()(),i.Ma(11,0,null,null,1,"app-data-unavailable",[["class","nodataavailable"]],null,null,null,x.b,x.a)),i.La(12,114688,null,0,D.a,[],null,null)],function(e,t){e(t,10,0,t.component.filterFlag),e(t,12,0)},function(e,t){var n=t.component;e(t,2,0,i.fb(t,2,0,i.Wa(t,3).transform("MENU.LIVE_CAPS"))),e(t,5,0,i.fb(t,5,0,i.Wa(t,6).transform("COMMON.FILTER"))),e(t,8,0,n.assetbasepath+"assets/common/refine_icon.png"),e(t,9,0,!n.filterFlag)})}function G(e){return i.gb(0,[i.cb(402653184,1,{carousel_element:0}),(e()(),i.Ma(1,0,null,null,3,"app-filter",[],null,[[null,"changestatus"],["window","resize"]],function(e,t,n){var l=!0,a=e.component;return"window:resize"===t&&(l=!1!==i.Wa(e,4).onResize(n)&&l),"changestatus"===t&&(l=!1!==a.closeFilter(n)&&l),l},A.b,A.a)),i.La(2,278528,null,0,y.l,[i.q,i.r,i.k,i.B],{ngClass:[0,"ngClass"]},null),i.Za(3,{show:0,hide:1}),i.La(4,770048,null,0,I.a,[i.z,o.a,E.a,l.a,a.a],{filter:[0,"filter"],arrayList:[1,"arrayList"],view:[2,"view"],viewname:[3,"viewname"]},{changestatus:"changestatus"}),(e()(),i.Da(16777216,null,null,1,null,j)),i.La(6,16384,null,0,y.n,[i.M,i.J],{ngIf:[0,"ngIf"]},null),(e()(),i.Da(16777216,null,null,1,null,F)),i.La(8,16384,null,0,y.n,[i.M,i.J],{ngIf:[0,"ngIf"]},null)],function(e,t){var n=t.component;e(t,2,0,e(t,3,0,n.filterbar,!n.filterbar)),e(t,4,0,n.filterbar,n.filter_titles,n.view,"livetv"),e(t,6,0,n.DATA),e(t,8,0,!n.DATA)},null)}var W=i.Ia("app-livetv",C,function(e){return i.gb(0,[(e()(),i.Ma(0,0,null,null,1,"app-livetv",[],null,null,null,G,z)),i.La(1,245760,null,0,C,[g.a,p.a,i.z,h.a,o.a,u.a,a.a,r.a,l.a,y.j,S.a,S.l,s.a,v.e,c.a,d.a],null,null)],function(e,t){e(t,1,0)},null)},{},{},[]),B=n("2c8r"),J=n("/zm2"),Y=n("ZYjt"),X=n("mIVG"),Z=n("ukD8"),H=n("d2mR"),q=n("v8xJ"),$=n("aayi"),K=n("0RE5"),Q=n("5dM8"),ee=n("5cNS");n.d(t,"LivetvModuleNgFactory",function(){return te});var te=i.Ja(T,[],function(e){return i.Ta([i.Ua(512,i.j,i.X,[[8,[M.a,W]],[3,i.j],i.v]),i.Ua(4608,y.p,y.o,[i.s,[2,y.B]]),i.Ua(4608,B.I,B.I,[]),i.Ua(5120,J.bc,J.lc,[[3,J.bc],i.x,B.I]),i.Ua(5120,J.ic,J.kc,[[3,J.ic],J.bc]),i.Ua(4608,J.cc,J.cc,[J.bc,J.ic]),i.Ua(5120,J.Xb,J.jc,[[3,J.Xb]]),i.Ua(4608,J.oc,J.oc,[J.ic]),i.Ua(4608,J.Wb,J.Wb,[J.cc,J.Xb,i.j,J.oc,i.g,i.p,i.x]),i.Ua(6144,B.m,null,[Y.b]),i.Ua(4608,B.o,B.o,[[2,B.m]]),i.Ua(1073742336,S.n,S.n,[[2,S.t],[2,S.l]]),i.Ua(1073742336,y.b,y.b,[]),i.Ua(1073742336,X.a,X.a,[]),i.Ua(1073742336,Z.a,Z.a,[]),i.Ua(1073742336,H.a,H.a,[]),i.Ua(1073742336,q.a,q.a,[]),i.Ua(1073742336,B.L,B.L,[]),i.Ua(1073742336,B.J,B.J,[]),i.Ua(1073742336,J.ac,J.ac,[]),i.Ua(1073742336,J.Yb,J.Yb,[]),i.Ua(1073742336,J.c,J.c,[]),i.Ua(1073742336,B.c,B.c,[]),i.Ua(256,J.k,!0,[]),i.Ua(1073742336,J.M,J.M,[[2,Y.b],[2,J.k]]),i.Ua(1073742336,J.kb,J.kb,[]),i.Ua(1073742336,J.Ra,J.Ra,[]),i.Ua(1073742336,$.a,$.a,[]),i.Ua(1073742336,K.a,K.a,[]),i.Ua(1073742336,Q.a,Q.a,[]),i.Ua(1073742336,ee.a,ee.a,[]),i.Ua(1073742336,T,T,[]),i.Ua(1024,S.j,function(){return[[{path:"",component:C}]]},[])])})}}]);