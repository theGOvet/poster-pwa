// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {
    // Select all sections with the class 'collapsible'
    const collapsibleSections = document.querySelectorAll('.collapsible');

    // Loop through each section
    collapsibleSections.forEach(section => {
        // Add a click event listener to the h2 inside each section
        section.querySelector('h2').addEventListener('click', function() {
            // Toggle the 'expanded' class on the section itself
            section.classList.toggle('expanded');

            // Get the content to be toggled
            const content = section.querySelector('.content');

            // Toggle the display property between 'block' and 'none'
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});

