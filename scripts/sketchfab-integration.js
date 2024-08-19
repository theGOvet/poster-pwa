(function() {
    var iframe = document.getElementById('api-frame');
    var uid = '0635c339316347f0a6defb46ac4a34d8';
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
