(function() {
    var modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgb(0,0,0)';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    document.body.appendChild(modal);

    var modalImg = document.createElement('img');
    modalImg.id = 'modal-image';
    modalImg.style.margin = 'auto';
    modalImg.style.display = 'block';
    modalImg.style.maxWidth = '80%';
    modalImg.style.maxHeight = '80%';
    modal.appendChild(modalImg);

    var caption = document.createElement('div');
    caption.id = 'caption';
    caption.style.color = '#ccc';
    caption.style.textAlign = 'center';
    caption.style.marginTop = '10px';
    modal.appendChild(caption);

    var closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.textContent = '×';
    closeSpan.style.color = '#fff';
    closeSpan.style.fontSize = '40px';
    closeSpan.style.fontWeight = 'bold';
    closeSpan.style.position = 'absolute';
    closeSpan.style.top = '10px';
    closeSpan.style.right = '25px';
    closeSpan.style.cursor = 'pointer';
    modal.appendChild(closeSpan);

    document.querySelectorAll('.thumbnail').forEach(function(thumbnail) {
        thumbnail.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.getAttribute('data-full');
            caption.textContent = this.alt;
        });
    });

    closeSpan.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
})();
