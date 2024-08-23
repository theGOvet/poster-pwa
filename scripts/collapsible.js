// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {
    const collapsibleSections = document.querySelectorAll('.collapsible');

    collapsibleSections.forEach(section => {
        const heading = section.querySelector('h2');
        const content = section.querySelector('.content');

        heading.addEventListener('click', function() {
            // Toggle the expanded class and content visibility
            section.classList.toggle('expanded');
            content.style.display = section.classList.contains('expanded') ? 'block' : 'none';
        });

        // Check if URL hash matches this section's ID
        if (window.location.hash === '#' + section.id) {
            section.classList.add('expanded');
            content.style.display = 'block';
        }
    });

    // Handle hash change in URL
    window.addEventListener('hashchange', function() {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            collapsibleSections.forEach(section => {
                const content = section.querySelector('.content');
                if (section === targetSection) {
                    section.classList.add('expanded');
                    content.style.display = 'block';
                } else {
                    section.classList.remove('expanded');
                    content.style.display = 'none';
                }
            });
        }
    });
});


