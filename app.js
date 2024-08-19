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
