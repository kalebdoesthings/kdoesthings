self.addEventListener('install',function(){
    console.log('SW installed 1...');
});

self.addEventListener('activate',function(){
    console.log('SW Activated 1....');
});
self.addEventListener('fetch', function(event) {
    event.respondWith(async function() {
       try{
         var res = await fetch(event.request);
         return res;
       }
       catch(error){
         return null;
        }
      }());
  });
