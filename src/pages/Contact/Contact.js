
// Form Logic (Basic interaction)

const API_BASE_URL = window.ENV.API_BASE_URL;
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




const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    // Validation
    if (!name || !email || !phone || !message) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch(
            `${API_BASE_URL}/api/enquiry-create.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    message
                })
            }
        );

        const data = await res.json();

        if (!data.status) {
            alert(data.message || "Submission failed");
            return;
        }

        alert("Message sent successfully ✅");
        contactForm.reset();

    } catch (err) {
        console.error("Contact form error:", err);
        alert("Server error. Please try again later.");
    }
});
