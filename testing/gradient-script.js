let isAnimating = true;
let currentColors = [
    '#12c2e9',
    '#c471ed',
    '#f64f59'
];

const gradientElement = document.querySelector('.gradient-background');
const mousePosition = document.querySelector('.mouse-position');
const speedControl = document.getElementById('speed');

// Mouse movement effect
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    // Update mouse position indicator
    mousePosition.style.left = `${clientX}px`;
    mousePosition.style.top = `${clientY}px`;
    
    // Calculate relative position
    const xPos = (clientX / window.innerWidth) * 100;
    const yPos = (clientY / window.innerHeight) * 100;
    
    // Update gradient position based on mouse
    if (!isAnimating) {
        gradientElement.style.backgroundPosition = `${xPos}% ${yPos}%`;
    }
});

// Toggle animation
function toggleAnimation() {
    isAnimating = !isAnimating;
    gradientElement.style.animation = isAnimating 
        ? 'gradientMove 15s ease infinite'
        : 'none';
}

// Change colors
function changeColors() {
    const newColors = [
        `hsl(${Math.random() * 360}, 70%, 60%)`,
        `hsl(${Math.random() * 360}, 70%, 60%)`,
        `hsl(${Math.random() * 360}, 70%, 60%)`
    ];
    
    currentColors = newColors;
    updateGradient();
}

// Update gradient colors
function updateGradient() {
    gradientElement.style.background = `linear-gradient(
        45deg,
        ${currentColors[0]},
        ${currentColors[1]},
        ${currentColors[2]}
    )`;
    gradientElement.style.backgroundSize = '400% 400%';
}

// Control animation speed
speedControl.addEventListener('input', (e) => {
    const speed = 21 - e.target.value; // Invert the value for more intuitive control
    gradientElement.style.animation = isAnimating 
        ? `gradientMove ${speed}s ease infinite`
        : 'none';
});

// Handle window resize
window.addEventListener('resize', () => {
    if (!isAnimating) {
        gradientElement.style.backgroundPosition = '0% 50%';
    }
}); 