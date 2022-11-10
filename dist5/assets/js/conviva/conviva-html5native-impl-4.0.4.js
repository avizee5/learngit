/*! (C) 2020 Conviva, Inc. All rights reserved. Confidential and proprietary. */
!function(a,b){if("function"==typeof define&&define.amd?define(b):"object"==typeof exports&&(module.exports=b()),void 0!==a)if(void 0===a.Conviva){if(void 0!==a.ConvivaModule)return
;if(a.ConvivaModuleLoading)return;a.ConvivaModuleLoading=!0,a.ConvivaModule=b(),delete a.ConvivaModuleLoading}else{if(void 0!==a.Conviva.ProxyMonitor)return;if(a.ConvivaModuleLoading)return;var c=b()
;a.ConvivaModuleLoading=!0,a.Conviva.ProxyMonitor=c.ProxyMonitor,a.Conviva.Impl.Html5PlayerInterface=c.Impl.Html5PlayerInterface,a.Conviva.Impl.Html5Proxy=c.Impl.Html5Proxy,
delete a.ConvivaModuleLoading}}(this,function(){var a={};return function(){"use strict";!function(){a.Impl=a.Impl||{};var b=a.Impl.Html5PlayerInterface=function(a,c,d){function e(a,c){
if(this._log("Html5PlayerInterface._constr()"),!a)throw new Error("Html5PlayerInterface: playerStateManager argument cannot be null.")
;if(!c)throw new Error("Html5PlayerInterface: videoElement argument cannot be null.");this._playerStateManager=a,this._videoElement=c,this._eventListeners=[],this._registerVideoEventListeners(),
this._resetPlayHeadTimes(),this._resetTimeupdate(),this._startPolling(),this._findCurrentState(),this._playerStateManager.setClientMeasureInterface(this),
this._playerStateManager.setModuleNameAndVersion("HTML5",b.version),
null!=this._systemFactory&&null!=this._systemFactory._metadataInterface&&null==this._systemFactory._metadataInterface.getFrameworkName()&&this._playerStateManager.setPlayerType("HTML5")}
var f=this,g=500,h=4e3/g,i=2e3/g;f._lastPlayHeadTimeSpeeds=[],f._timeupdate=0,f._lastTimeupdate=0,f._currentTimeIsInvalid=!1,f._systemFactory=d,this._timerInterface=new Conviva.Impl.Html5Timer,
this._loggingInterface=d.buildLogger(),this._loggingInterface.setModuleName("Html5PlayerInterface"),this._width=-1,this._height=-1,this._addEventListener=function(a,b,c){
void 0===c&&(c=f._videoElement),f._eventListeners.push([a,b,c]),window.addEventListener?c.addEventListener(a,b,!1):c.attachEvent("on"+a,b)},this._removeEventListener=function(a,b,c){
void 0===c&&(c=f._videoElement),window.removeEventListener?c.removeEventListener(a,b,!1):c.detachEvent("on"+a,b)},this._registerVideoEventListeners=function(){f._addEventListener("ended",function(){
f._receivedHtml5Event("ended")}),f._addEventListener("pause",function(){f._receivedHtml5Event("pause")}),f._addEventListener("playing",function(){
return 0==f._videoElement.currentTime?void(f._currentTimeIsInvalid=!0):f._videoElement.currentTime>0?void(f._currentTimeIsInvalid=!1):void 0}),f._addEventListener("waiting",function(){
f._receivedHtml5Event("waiting")}),f._addEventListener("timeupdate",function(){f._currentTimeIsInvalid&&(f._timeupdate++,
f._playerStateManager.getPlayerState()===Conviva.PlayerStateManager.PlayerState.PLAYING||f._videoElement.seeking||f._receivedHtml5Event("playing"))}),f._addEventListener("error",function(){
if(f._videoElement.error){var a=f._videoElement.error.code;f._reportHtml5Error(a)}}),f._addEventListener("loadedmetadata",f._loadedMetadata),f._addEventListener("seeking",function(){
f.isSeekStarted||(f.isSeekStarted=!0,f._playerStateManager.setPlayerSeekStart(-1)),
f._currentTimeIsInvalid&&f._playerStateManager.getPlayerState()!==Conviva.PlayerStateManager.PlayerState.BUFFERING&&(f._log("Adjusting Conviva player state to: BUFFERING"),
f._receivedHtml5Event("waiting"))}),f._addEventListener("seeked",function(){f.isSeekStarted=!1,f._playerStateManager.setPlayerSeekEnd()}),f._monitorErrorsFromSourceElements()},this.getPHT=function(){
return 1e3*f._videoElement.currentTime},this.getBufferLength=function(){var a=f._videoElement.buffered;if(void 0!==a){for(var b=0,c=0;c<a.length;c++){var d=a.start(c),e=a.end(c)
;d<=f._videoElement.currentTime&&f._videoElement.currentTime<e&&(b+=e-f._videoElement.currentTime)}return f._currentBufferLength=b,1e3*f._currentBufferLength}},this.getSignalStrength=function(){
return Conviva.PlayerStateManager.DEFAULT_SIGNAL_STRENGTH},this.getRenderedFrameRate=function(){return Conviva.PlayerStateManager.DEFAULT_RENDERED_FRAME_RATE},
this._monitorErrorsFromSourceElements=function(){if(void 0!==f._videoElement.children){var a=function(){f._log("Caught non-specific error from <source> element, reporting as ERR_UNKNOWN"),
f._reportHtml5Error(0)};f._videoElement._sources=f._videoElement.children;for(var b=0;b<f._videoElement._sources.length;b++){var c=f._videoElement._sources[b]
;"SOURCE"==c.tagName&&f._addEventListener("error",a,c)}}},this._removeVideoEventHandlers=function(){for(var a=0;a<f._eventListeners.length;a++){var b=f._eventListeners[a]
;f._removeEventListener(b[0],b[1],b[2])}f._eventListeners=[]},this._findCurrentState=function(){f._prevReadyState=f._videoElement.readyState,
0===f._videoElement.readyState?f._updateConvivaPlayerState(Conviva.PlayerStateManager.PlayerState.STOPPED):f._videoElement.ended?f._updateConvivaPlayerState(Conviva.PlayerStateManager.PlayerState.STOPPED):(f._videoElement.paused||f._videoElement.seeking)&&f._updateConvivaPlayerState(Conviva.PlayerStateManager.PlayerState.PAUSED),
f._videoElement.readyState>=f._videoElement.HAVE_METADATA&&f._loadedMetadata()},this._receivedHtml5Event=function(a){var b=f._convertHtml5EventToConvivaPlayerState(a)
;f._log("Received HTML5 event: "+a+". Mapped to Conviva player state: "+b),f._updateConvivaPlayerState(b)},this._updateConvivaPlayerState=function(a){f._playerStateManager.setPlayerState(a),
f._resetPlayHeadTimes(),f._playerStateRecentlyChanged=!0},this._convertHtml5EventToConvivaPlayerState=function(a){switch(a){case"playing":return Conviva.PlayerStateManager.PlayerState.PLAYING
;case"waiting":return Conviva.PlayerStateManager.PlayerState.BUFFERING;case"ended":case"stopped":return Conviva.PlayerStateManager.PlayerState.STOPPED;case"pause":
return Conviva.PlayerStateManager.PlayerState.PAUSED;default:return Conviva.PlayerStateManager.PlayerState.UNKNOWN}},this._reportHtml5Error=function(a){var b;switch(a){case 1:b="MEDIA_ERR_ABORTED"
;break;case 2:b="MEDIA_ERR_NETWORK";break;case 3:b="MEDIA_ERR_DECODE";break;case 4:b="MEDIA_ERR_SRC_NOT_SUPPORTED";break;default:b="MEDIA_ERR_UNKNOWN"}f._log("Reporting error: code="+a+" message="+b)
;var c=Conviva.Client.ErrorSeverity.FATAL;f._playerStateManager.sendError(b,c)},this._loadedMetadata=function(){var a=f._videoElement.duration;isNaN(a)||a==1/0||f._playerStateManager.setDuration(a)
;var b=f._videoElement.videoWidth;!isNaN(b)&&b>=0&&f._playerStateManager.setVideoResolutionWidth(b);var c=f._videoElement.videoHeight;!isNaN(c)&&c>=0&&f._playerStateManager.setVideoResolutionHeight(c)
},this._startPolling=function(){this._previousPosition=0,this._currentPosition=0,this._currentBufferLength=0,
this._pollingTimerCancel=this._timerInterface.createTimer(this._poll,500,"Html5PlayerInterface._poll()")},this._poll=function(){f._pollStreamerResolution(),f._pollPosition(),
f._inferPlayerStateFromPosition()},this._pollStreamerResolution=function(){var a=f._videoElement.videoWidth;!isNaN(a)&&a>=0&&a!=f._width&&(f._playerStateManager.setVideoResolutionWidth(a),f._width=a)
;var b=f._videoElement.videoHeight;!isNaN(b)&&b>=0&&b!=f._height&&(f._playerStateManager.setVideoResolutionHeight(b),f._height=b)},this._pollPosition=function(){f._previousPosition=f._currentPosition,
f._currentPosition=f._videoElement.currentTime;var a=Date.now();if(f._lastPollTime>0&&a>f._lastPollTime){var b=f._currentPosition-f._previousPosition;b<0&&(b=0);var c=b/(a-f._lastPollTime)*1e3
;f._lastPlayHeadTimeSpeeds.push(c)}f._lastPollTime=a,f._lastPlayHeadTimeSpeeds.length>Math.max(h,i)&&f._lastPlayHeadTimeSpeeds.shift()},this._inferPlayerStateFromPosition=function(){
var a=f._lastPlayHeadTimeSpeeds.length;if(a>=Math.min(i,h)){for(var b=0,c=f._lastPlayHeadTimeSpeeds.slice(),d=0;d<c.length;d++)b+=c[d];b/=a;var e=1,g=.25,j=f._videoElement.playbackRate
;!isNaN(j)&&j!=1/0&&j>0&&(Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0&&j<.5&&(j=.5),e*=j,g*=j);var k=f._playerStateManager.getPlayerState()
;if(k!=Conviva.PlayerStateManager.PlayerState.PLAYING&&a>=i&&Math.abs(b-e)<g)return f._log("Adjusting Conviva player state to: PLAYING"),
void f._updateConvivaPlayerState(Conviva.PlayerStateManager.PlayerState.PLAYING)
;if(k==Conviva.PlayerStateManager.PlayerState.PLAYING&&a>=h&&0==b)return void(f._videoElement.paused?k!=Conviva.PlayerStateManager.PlayerState.PAUSED&&(f._log("Adjusting Conviva player state to: PAUSED"),
f._updateConvivaPlayerState(Conviva.PlayerStateManager.PlayerState.PAUSED)):f._videoElement.seeking||(f._log("Adjusting Conviva player state to: BUFFERING"),
f._updateConvivaPlayerState(Conviva.PlayerStateManager.PlayerState.BUFFERING)))
;if(f._currentTimeIsInvalid)return void(f._videoElement.paused?(k!=Conviva.PlayerStateManager.PlayerState.PAUSED&&(f._log("Adjusting Conviva player state to: PAUSED"),
f._updateConvivaPlayerState(Conviva.PlayerStateManager.PlayerState.PAUSED)),
f._timeupdate=f._lastTimeupdate):f._videoElement.seeking||(f._timeupdate>1&&f._timeupdate==f._lastTimeupdate&&(f._log("Adjusting Conviva player state to: BUFFERING"),
f._updateConvivaPlayerState(Conviva.PlayerStateManager.PlayerState.BUFFERING)),f._lastTimeupdate=f._timeupdate))}},this._stopPolling=function(){this._pollingTimerCancel()},
this._resetPlayHeadTimes=function(){f._lastPlayHeadTimeSpeeds=[],f._previousPosition=-1,f._lastPollTime=0},this._resetTimeupdate=function(){f._lastTimeupdate=0,f._timeupdate=0},this._log=function(a){
this._loggingInterface.log(a,Conviva.SystemSettings.LogLevel.DEBUG)},e.apply(this,arguments),this.cleanup=function(){this._log("Html5PlayerInterface.cleanup()"),this._stopPolling(),
this._removeVideoEventHandlers(),this._videoElement=null,this._playerStateManager=null}};b.version="2.151.0.37032",a.Impl=a.Impl||{};var c=a.Impl.Html5Proxy=function(a,b,d,e){function f(a,b,d){
if(!a)throw new Error("Html5Proxy: videoElement argument cannot be null.");this._videoElement=a,this._videoAnalytics=d,this._loggingInterface=b.buildLogger(),
this._loggingInterface.setModuleName("Html5Proxy"),this._log("Html5Proxy._constr()"),this._eventListeners=[],this._registerVideoEventListeners(),this._resetPlayHeadTimes(),this._resetTimeupdate(),
this._startPolling(),this._findCurrentState();var f={};f[e.Constants.MODULE_NAME]="HTML5",f[e.Constants.MODULE_VERSION]=c.version,this._videoAnalytics.setContentInfo(f);var g={}
;g[e.Constants.FRAMEWORK_NAME]="HTML5",this._videoAnalytics.setPlayerInfo(g)}var g=this,h=500,i=4e3/h,j=2e3/h;g._lastPlayHeadTimeSpeeds=[],g._timeupdate=0,g._lastTimeupdate=0,
g._currentTimeIsInvalid=!1,this._timerInterface=new e.Impl.Html5Timer,this._width=-1,this._height=-1,this._playerState=e.Constants.PlayerState.UNKNOWN,this._addEventListener=function(a,b,c){
void 0===c&&(c=g._videoElement),g._eventListeners.push([a,b,c]),window.addEventListener?c.addEventListener(a,b,!1):c.attachEvent("on"+a,b)},this._removeEventListener=function(a,b,c){
void 0===c&&(c=g._videoElement),window.removeEventListener?c.removeEventListener(a,b,!1):c.detachEvent("on"+a,b)},this._registerVideoEventListeners=function(){g._addEventListener("ended",function(){
g._updateConvivaPlayerState(e.Constants.PlayerState.STOPPED)}),g._addEventListener("pause",function(){g._updateConvivaPlayerState(e.Constants.PlayerState.PAUSED)}),
g._addEventListener("playing",function(){return 0==g._videoElement.currentTime?void(g._currentTimeIsInvalid=!0):g._videoElement.currentTime>0?void(g._currentTimeIsInvalid=!1):void 0}),
g._addEventListener("waiting",function(){g._updateConvivaPlayerState(e.Constants.PlayerState.BUFFERING)}),g._addEventListener("timeupdate",function(){g._currentTimeIsInvalid&&(g._timeupdate++,
g._playerState==e.Constants.PlayerState.PLAYING||g._videoElement.seeking||g._updateConvivaPlayerState(e.Constants.PlayerState.PLAYING))}),g._addEventListener("error",function(){
if(null!=g._videoElement&&g._videoElement.error){var a="Error Message: "+g._videoElement.error.message+", Error Code: "+g._videoElement.error.code
;g._videoAnalytics.reportPlaybackError(a,e.Constants.ErrorSeverity.FATAL)}}),g._addEventListener("loadedmetadata",function(){var a=g._videoElement.duration;if(!isNaN(a)&&a!=1/0){var b={}
;b[e.Constants.DURATION]=a,g._videoAnalytics.setContentInfo(b)}var c=g._videoElement.videoWidth,d=g._videoElement.videoHeight
;(!isNaN(c)&&c>0||!isNaN(d)&&d>0)&&g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.RESOLUTION,c,d,"CONVIVA")}),g._addEventListener("seeking",function(){
g.isSeekStarted||(g.isSeekStarted=!0,g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.SEEK_STARTED,"CONVIVA")),
g._currentTimeIsInvalid&&g._playerState!=e.Constants.PlayerState.BUFFERING&&(g._log("Adjusting Conviva player state to: BUFFERING"),g._updateConvivaPlayerState(e.Constants.PlayerState.BUFFERING))}),
g._addEventListener("seeked",function(){g.isSeekStarted=!1,g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.SEEK_ENDED,"CONVIVA")}),g._monitorErrorsFromSourceElements()},
this.getBufferLength=function(){var a=g._videoElement.buffered;if(void 0!==a){for(var b=0,c=0;c<a.length;c++){var d=a.start(c),e=a.end(c)
;d<=g._videoElement.currentTime&&g._videoElement.currentTime<e&&(b+=e-g._videoElement.currentTime)}return g._currentBufferLength=b,1e3*g._currentBufferLength}},
this._monitorErrorsFromSourceElements=function(){if(void 0!==g._videoElement.children){var a=function(){g._log("Caught non-specific error from <source> element, reporting as ERR_UNKNOWN"),
g._reportHtml5Error(0)};g._videoElement._sources=g._videoElement.children;for(var b=0;b<g._videoElement._sources.length;b++){var c=g._videoElement._sources[b]
;"SOURCE"==c.tagName&&g._addEventListener("error",a,c)}}},this._removeVideoEventHandlers=function(){for(var a=0;a<g._eventListeners.length;a++){var b=g._eventListeners[a]
;g._removeEventListener(b[0],b[1],b[2])}g._eventListeners=[]},this._findCurrentState=function(){g._prevReadyState=g._videoElement.readyState,
0===g._videoElement.readyState?g._updateConvivaPlayerState(e.Constants.PlayerState.STOPPED):g._videoElement.ended?g._updateConvivaPlayerState(e.Constants.PlayerState.STOPPED):(g._videoElement.paused||g._videoElement.seeking)&&g._updateConvivaPlayerState(e.Constants.PlayerState.PAUSED)
},this._updateConvivaPlayerState=function(a){g._playerState=a,g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.PLAYER_STATE,g._playerState,"CONVIVA"),g._resetPlayHeadTimes(),
g._playerStateRecentlyChanged=!0},this._reportHtml5Error=function(a){var b;switch(a){case 1:b="MEDIA_ERR_ABORTED";break;case 2:b="MEDIA_ERR_NETWORK";break;case 3:b="MEDIA_ERR_DECODE";break;case 4:
b="MEDIA_ERR_SRC_NOT_SUPPORTED";break;default:b="MEDIA_ERR_UNKNOWN"}g._log("Reporting error: code="+a+" message="+b);var c=e.Client.ErrorSeverity.FATAL;g._videoAnalytics.reportPlaybackError(b,c)},
this._startPolling=function(){this._previousPosition=0,this._currentPosition=0,this._currentBufferLength=0,
this._pollingTimerCancel=this._timerInterface.createTimer(this._poll,500,"Html5Proxy._poll()")},this._poll=function(){
g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.PLAY_HEAD_TIME,1e3*g._videoElement.currentTime,"CONVIVA"),
g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.BUFFER_LENGTH,g.getBufferLength(),"CONVIVA"),
g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.RESOLUTION,g._videoElement.videoWidth,g._videoElement.videoHeight,"CONVIVA"),g._pollPosition(),g._inferPlayerStateFromPosition()},
this._pollPosition=function(){g._previousPosition=g._currentPosition,g._currentPosition=g._videoElement.currentTime;var a=Date.now();if(g._lastPollTime>0&&a>g._lastPollTime){
var b=g._currentPosition-g._previousPosition;b<0&&(b=0);var c=b/(a-g._lastPollTime)*1e3;g._lastPlayHeadTimeSpeeds.push(c)}g._lastPollTime=a,
g._lastPlayHeadTimeSpeeds.length>Math.max(i,j)&&g._lastPlayHeadTimeSpeeds.shift()},this._inferPlayerStateFromPosition=function(){var a=g._lastPlayHeadTimeSpeeds.length;if(a>=Math.min(j,i)){
for(var b=0,c=g._lastPlayHeadTimeSpeeds.slice(),d=0;d<c.length;d++)b+=c[d];b/=a;var f=1,h=.25,k=g._videoElement.playbackRate
;if(!isNaN(k)&&k!=1/0&&k>0&&(Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0&&k<.5&&(k=.5),f*=k,h*=k),
g._playerState!=e.Constants.PlayerState.PLAYING&&a>=j&&Math.abs(b-f)<h)return g._log("Adjusting Conviva player state to: PLAYING"),void g._updateConvivaPlayerState(e.Constants.PlayerState.PLAYING)
;if(g._playerState==e.Constants.PlayerState.PLAYING&&a>=i&&0==b)return void(g._videoElement.paused?g._playerState!=e.Constants.PlayerState.PAUSED&&(g._log("Adjusting Conviva player state to: PAUSED"),
g._updateConvivaPlayerState(e.Constants.PlayerState.PAUSED)):g._videoElement.seeking||(g._log("Adjusting Conviva player state to: BUFFERING"),
g._updateConvivaPlayerState(e.Constants.PlayerState.BUFFERING)))
;if(g._currentTimeIsInvalid)return void(g._videoElement.paused?(g._playerState!=e.Constants.PlayerState.PAUSED&&(g._log("Adjusting Conviva player state to: PAUSED"),
g._updateConvivaPlayerState(e.Constants.PlayerState.PAUSED)),
g._timeupdate=g._lastTimeupdate):g._videoElement.seeking||(g._timeupdate>1&&g._timeupdate==g._lastTimeupdate&&(g._log("Adjusting Conviva player state to: BUFFERING"),
g._updateConvivaPlayerState(e.Constants.PlayerState.BUFFERING)),g._lastTimeupdate=g._timeupdate))}},this._stopPolling=function(){null!=this._pollingTimerCancel&&this._pollingTimerCancel()},
this._resetPlayHeadTimes=function(){g._lastPlayHeadTimeSpeeds=[],g._previousPosition=-1,g._lastPollTime=0},this._resetTimeupdate=function(){g._lastTimeupdate=0,g._timeupdate=0},this._log=function(a){
this._loggingInterface.log(a,e.SystemSettings.LogLevel.DEBUG)},f.apply(this,arguments),this.cleanup=function(){this._log("Html5Proxy.cleanup()"),this._stopPolling(),this._removeVideoEventHandlers(),
this._videoElement=null}};c.version="4.0.4";a.ProxyMonitor={_proxyMonitor:null,release:function(){null!=this._proxyMonitor&&this._proxyMonitor.cleanup()},initConvivaDropIn:function(b,c,d,e){
var f="No player proxy initialized";if(null!==b&&b instanceof HTMLVideoElement)return this._proxyMonitor=new a.Impl.Html5Proxy(b,c,d,e),this._proxyMonitor;throw new Error(f)}}}()}(),a});