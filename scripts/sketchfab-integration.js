(function() {
    var iframe = document.getElementById('api-frame');
    var uid = '383c6249a0f24d869202e3777a6096b0';
    var client = new Sketchfab(iframe);

    client.init(uid, {
        success: function(api) {
            api.start();
            api.addEventListener('viewerready', function() {
                console.log('Viewer is ready');
            });
        },
        error: function() {
            console.log('Viewer error');
        }
    });
})();
