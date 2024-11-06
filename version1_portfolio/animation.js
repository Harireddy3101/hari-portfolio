console.log('Animation script loaded');
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content loaded');
    var introAnimation = document.querySelector('.intro-animation');
    var introText = document.querySelector('.intro-text');
    var content = document.querySelector('.content');
    var themeToggle = document.getElementById('theme-toggle');
    var hamburgerMenu = document.querySelector('.hamburger-menu');
    var navMenu = document.querySelector('.nav-menu');
    // Theme switcher
    var toggleTheme = function () {
        document.body.classList.toggle('dark-mode');
        var isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode.toString());
        updateThemeToggleText();
    };
    var updateThemeToggleText = function () {
        var isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    };
    // Check for saved theme preference or use user's system preference
    var prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    var savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true' || (savedTheme === null && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    updateThemeToggleText();
    // Ensure the theme toggle button is clickable
    themeToggle.addEventListener('click', toggleTheme);
    // Intro animation
    var startIntroAnimation = function () {
        introText.style.opacity = '1';
        introText.style.transform = 'scale(1)';
        setTimeout(function () {
            introText.style.opacity = '0';
            introText.style.transform = 'scale(1.5)';
            setTimeout(function () {
                introAnimation.style.transform = 'scaleX(0)';
                introAnimation.style.transformOrigin = 'right';
                setTimeout(function () {
                    introAnimation.style.display = 'none';
                    revealContent();
                }, 500);
            }, 500);
        }, 1500);
    };
    // Remove the observeElements function and its call
    var revealContent = function () {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        // Remove the observeElements() call
    };
    // Start the intro animation
    startIntroAnimation();
    // Log to console for debugging
    console.log('DOMContentLoaded event fired');
    console.log('Theme toggle button:', themeToggle);
    hamburgerMenu.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });
    // Close menu when a nav item is clicked
    document.querySelectorAll('.nav-menu a').forEach(function (item) {
        item.addEventListener('click', function () {
            navMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });
});
// Log to console for debugging
console.log('Script loaded');
