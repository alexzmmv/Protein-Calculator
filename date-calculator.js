document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create and add overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking on overlay
        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Date Calculator Logic
    const calculateButton = document.getElementById('calculate-button');
    const inseminationDateInput = document.getElementById('insemination-date');
    const resultContainer = document.getElementById('result-container');
    const farrowingDateDisplay = document.getElementById('farrowing-date');

    // Set today's date as default
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    inseminationDateInput.value = todayString;

    calculateButton.addEventListener('click', () => {
        const inseminationDate = new Date(inseminationDateInput.value);
        
        if (!inseminationDateInput.value) {
            alert('Vă rugăm să introduceți data însămânțării!');
            return;
        }

        // Add 114 days to the insemination date
        const farrowingDate = new Date(inseminationDate);
        farrowingDate.setDate(farrowingDate.getDate() + 114);

        // Format the date in Romanian style (DD.MM.YYYY)
        const day = String(farrowingDate.getDate()).padStart(2, '0');
        const month = String(farrowingDate.getMonth() + 1).padStart(2, '0');
        const year = farrowingDate.getFullYear();
        
        // Get day of week in Romanian
        const daysOfWeek = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
        const dayOfWeek = daysOfWeek[farrowingDate.getDay()];

        // Display the result
        farrowingDateDisplay.textContent = `${dayOfWeek}, ${day}.${month}.${year}`;
        resultContainer.classList.remove('hidden');

        // Smooth scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Allow Enter key to calculate
    inseminationDateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateButton.click();
        }
    });
});
