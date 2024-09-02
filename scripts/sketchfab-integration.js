(function() {
    var iframe = document.getElementById('api-frame');
    var uid = 'bba4514c2ae046a7ac5576a4962bbbe1';
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
