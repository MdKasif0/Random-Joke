// Function to fetch a joke from the JokeAPI
const fetchJoke = async () => {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    const data = await response.json();
    return data.joke;
};

// Update the joke text with fade-in effect
document.getElementById('joke-btn').addEventListener('click', async () => {
    const jokeText = document.getElementById('joke-text');
    jokeText.textContent = "Loading joke...";

    try {
        const joke = await fetchJoke();

        // Remove and re-add the fade-in class to trigger animation
        jokeText.classList.remove('fade-in');
        void jokeText.offsetWidth; // Trigger reflow to restart animation
        jokeText.textContent = joke;
        jokeText.classList.add('fade-in');
        
    } catch (error) {
        jokeText.textContent = "Failed to load joke. Try again!";
        console.error('Error:', error);
    }
});

// Dark mode toggle
const themeToggleButton = document.getElementById('theme-toggle');
const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
};

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
};

// Toggle theme on button click
themeToggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// Load theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    enableDarkMode();
}