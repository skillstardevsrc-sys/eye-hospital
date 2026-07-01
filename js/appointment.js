/**
 * Appointment Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('home-appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const inputs = appointmentForm.querySelectorAll('input, select');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = 'var(--border)';
                }
            });
            
            if (valid) {
                // Simulate form submission
                const btn = appointmentForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
                btn.disabled = true;
                
                setTimeout(() => {
                    alert('Appointment Booked Successfully!');
                    appointmentForm.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 1500);
            }
        });
    }
});
