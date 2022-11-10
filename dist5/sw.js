var serviceWorkerInstallTimestamp;
var serviceWorkerCurrentTimestamp;

var expiryDuration = 60* 60 * 1000




var CACHENAME = ['Zee5_Service_worker_asset_cache_v3.0','Zee5_Service_worker_json_cache_v3.0','Zee5_Service_worker_js_cache_v3.0']

var APIsToCache = [

  
                    {
                      'url':'https://catalogapi.zee5.com/v1/channel/genres',
                      'expiryDuration': expiryDuration
                    },
                    {
                      'url':'https://catalogapi.zee5.com/v1/tvshow/genres',
                      'expiryDuration': expiryDuration
                    },
                    {
                      'url':'https://catalogapi.zee5.com/v1/movie/genres',
                      'expiryDuration': expiryDuration
                    },
                    {
                      'url':'https://b2bapi.zee5.com/getlang.php',
                      'expiryDuration': expiryDuration
                    },
                    {
                      'url':'https://gwapi.zee5.com/content/getContent/tvshows',
                      'expiryDuration': expiryDuration
                    },
                    {
                      'url':'https://gwapi.zee5.com/content/getContent/home',
                      'expiryDuration': expiryDuration
                    },
                    {
                      'url':'https://gwapi.zee5.com/content/getContent/video',
                      'expiryDuration': expiryDuration
                    },
                    {
                      'url':'https://gwapi.zee5.com/content/getContent/premium',
                      'expiryDuration': expiryDuration
                    },
                    {
                      'url':'https://gwapi.zee5.com/content/getContent/zee5originals',
                      'expiryDuration': expiryDuration
                    },
                    {
                      'url':'https://gwapi.zee5.com/content/getContent/movies',
                      'expiryDuration': expiryDuration
                    }
                  ]

var apisToUpdate = [
                      'https://gwapi.zee5.com/content/getContent/tvshows',
                      'https://gwapi.zee5.com/content/getContent/home',
                      'https://gwapi.zee5.com/content/getContent/premium',
                      'https://gwapi.zee5.com/content/getContent/zee5originals',
                      'https://gwapi.zee5.com/content/getContent/movies',
                      'https://gwapi.zee5.com/content/getContent/video'
                  ]




var allCache = []




// In the following line, you should include the prefixes of implementations you want to test.
self.indexedDB = self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some self.IDB* objects:
self.IDBTransaction = self.IDBTransaction || self.webkitIDBTransaction || self.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
self.IDBKeyRange = self.IDBKeyRange || self.webkitIDBKeyRange || self.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)




  
var CACHENAME = []

self.addEventListener('install', function(evt) {
   self.skipWaiting();
   for(var i =0 ;i< CACHENAME.length ; i++) {
     evt.waitUntil(precache(CACHENAME[i],allCache[i]));
   }
});





self.addEventListener('activate', function(e) {
  serviceWorkerInstallTimestamp = new Date()
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (CACHENAME.indexOf(key) == -1) {
          return caches.delete(key).then(function(response) {
            self.deleteDB()
          });
         }
      }));
    })
  );
});


self.addEventListener('fetch', event => {
  //event.credentials = "same-origin"
  serviceWorkerCurrentTimestamp = new Date()
  const url = new URL(event.request.url);
  if(url.host !== 'www.google-analytics.com') {
        event.respondWith(async function() {
      const cache = await caches.open('Zee5_Service_worker_api_cache_v1.01');
      const cachedResponse = await cache.match(event.request.url);
      if (cachedResponse) {
        self.getdatabase(event)
        self.update('Zee5_Service_worker_api_cache_v1.01',event.request)   
        return cachedResponse;
      } else {
           for(var i =0 ;i< CACHENAME.length ; i++) {
              const cache1 = await caches.open(CACHENAME[i]);
              const cachedResponse1 = await cache.match(event.request);
              if(cachedResponse1) {
                return cachedResponse1
              }
        }
      }
      
      return fetch(event.request).then(function(response) {
        self.apiFoundToCache(event,response)
        return response;
      });
    }());
  }
});


function apiFoundToCache(event, response) {
  if(event.request.method === 'GET') {


    // fetch(event.request).then(function(response) {

        if (response.status === 401 || response.status === 404) {
          
        } else if(response.status >= 200 && response.status < 400) {
        var test = event.request;
        for(var i=0; i< APIsToCache.length; i++) {
          var patt = new RegExp(APIsToCache[i].url);
          if(test.url.match(patt) ){
            var time = new Date()
            var obj = {
              api: event.request.url,
              timeofchache: time,
              expiryDuration: APIsToCache[i].expiryDuration
            }
            
            
            return caches.open('Zee5_Service_worker_api_cache_v1.01').then(function(cache) {
              return cache.add(test).then(function(response) {
                self.databasefunction(obj)
              })
            })
          }
        }
        }
      // });
  }
};



function precache(nameofcache,typeofcache) {
  return caches.open(nameofcache).then(function (cache) {
    return cache.addAll(typeofcache);
  });
}



function invalidateCache(event) {
  
  caches.open('Zee5_Service_worker_api_cache_v1.01').then(function(cache) {
    cache.delete(event.request.url).then(function(response) {
      self.deleteDatabBase(event)
    });
  })
}


function invalidateStaticCache(event) {
  self.deleteDatabBase(event)
  for(i =0 ; i < APIsToCache.length; i++ )
    cache.delete(APIsToCache[i]).then(function(response) {
    });
}



function deleteDB() {
  var DBDeleteRequest = self.indexedDB.deleteDatabase("MyDatabase");

    DBDeleteRequest.onerror = function(event) {
    };
     
    DBDeleteRequest.onsuccess = function(event) {

    };
}



function update(typeofcache,request) {
  var test = request;
    for(var i=0; i< apisToUpdate.length; i++) {
      var patt = new RegExp(apisToUpdate[i]);
      if(test.url.match(patt) ){ 
          caches.open(typeofcache).then(function (cache) {
             fetch(request).then(function (response) {
              if (response.status === 200) {

               cache.put(test, response);
              }
            });
          });
      }
    }
}



function databasefunction(obj) {
  var open = self.indexedDB.open("MyDatabase", 1);
  open.onupgradeneeded = function() {
      var db = open.result;
      var store = db.createObjectStore("MyObjectStore", {keyPath: "api"});
      var index = store.createIndex("NameIndex", 'api');
  };
  open.onsuccess = function() {
      var db = open.result;
      var tx = db.transaction("MyObjectStore", "readwrite");
      var store = tx.objectStore("MyObjectStore");
      var index = store.index("NameIndex");
      store.put(obj);
      tx.oncomplete = function() {
          db.close();
      };
  }
}


function getdatabase(event) {
  var open = self.indexedDB.open("MyDatabase", 1);
  open.onupgradeneeded = function() {
      var db = open.result;
      var store = db.createObjectStore("MyObjectStore", {keyPath: "api"});
      var index = store.createIndex("NameIndex", 'api');
  };

  open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    var index = store.index("NameIndex");
    var gettime = store.get(event.request.url);
    gettime.onsuccess = function() {
        var time = gettime.result.timeofchache;
        var exp = gettime.result.expiryDuration;
        var diff = serviceWorkerCurrentTimestamp.getTime() -  time.getTime()
        if(diff >= exp) {
          self.invalidateCache(event)
          serviceWorkerInstallTimestamp = new Date()
          return fetch(event.request);
        }          
    };
    tx.oncomplete = function() {
        db.close();
    };
  }
}


function deleteDatabBase(event) {

  var open = self.indexedDB.open("MyDatabase", 1);
  open.onupgradeneeded = function() {
      var db = open.result;
      var store = db.createObjectStore("MyObjectStore", {keyPath: "api"});
      var index = store.createIndex("NameIndex", 'api');
  };

  open.onsuccess = function() {
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    var index = store.index("NameIndex");
    store.delete(event.request.url);
    tx.oncomplete = function() {
        db.close();
    };
  }
}