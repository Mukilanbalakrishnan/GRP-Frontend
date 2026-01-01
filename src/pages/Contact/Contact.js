
// Form Logic (Basic interaction)
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Sending...';
        btn.classList.add('opacity-75', 'cursor-not-allowed');

        // Simulate sending
        setTimeout(() => {
            alert('Message Sent! (Simulation)');
            form.reset();
            btn.innerText = originalText;
            btn.classList.remove('opacity-75', 'cursor-not-allowed');
        }, 1500);
    });
}
