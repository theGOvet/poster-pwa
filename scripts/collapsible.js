document.querySelectorAll('.collapsible').forEach((section) => {
    section.addEventListener('click', function() {
        // Get the content inside the section to toggle its visibility
        const content = section.querySelector('.content');

        // Toggle the display property
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});
