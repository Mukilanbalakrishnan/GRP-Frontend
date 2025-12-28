document.addEventListener('DOMContentLoaded', () => {
    // Form Submission Logic
    const form = document.getElementById('serviceForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Request submitted! Our team will contact you shortly.');
            form.reset();
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('marquee-track');
    if (!track) return;

    // Clone the entire set of cards and append them to the track
    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
});

    // Scroll Animation Logic
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});