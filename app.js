/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('ServiceWorker registered:', registration);
    }).catch(error => {
      console.error('ServiceWorker registration failed:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  let count = localStorage.getItem('accessCount') || 0;
  count++;
  localStorage.setItem('accessCount', count);
  document.getElementById('access-count').textContent = `You have accessed this app ${count} times`;
});

*/

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('ServiceWorker registered:', registration);
    }).catch(error => {
      console.error('ServiceWorker registration failed:', error);
    });
}

// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', () => {
  // Access Count Tracking
  let count = localStorage.getItem('accessCount') || 0;
  count++;
  localStorage.setItem('accessCount', count);
  document.getElementById('access-count').textContent = `You have accessed this app ${count} times`;

  // Initialize Sketchfab Viewer
  initializeSketchfabViewer();
});

// Sketchfab Viewer Initialization
function initializeSketchfabViewer() {
  const iframe = document.getElementById('api-frame');
  const uid = '0635c339316347f0a6defb46ac4a34d8'; // Replace with your model's UID
  const client = new Sketchfab(iframe);

  client.init(uid, {
    success: function onSuccess(api) {
      api.start();
      api.addEventListener('viewerready', function () {
        console.log('Viewer is ready');
      });
    },
    error: function onError(e) {
      console.error('Viewer error:', e);
      // Show fallback message with a direct link to Sketchfab
      const fallbackMessage = document.getElementById('fallback-message');
      fallbackMessage.style.display = 'block';
      fallbackMessage.innerHTML = `
        <p>Unable to load the 3D model in this browser. 
        <a href="https://sketchfab.com/models/${uid}" target="_blank">Click here to view the model directly on Sketchfab</a>.</p>
      `;
    }
  });
}

