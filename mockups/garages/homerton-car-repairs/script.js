// Homerton Car Repairs Mockup Script (multi-page)

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header scroll behavior
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-menu__link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 3. Date Picker Constraint (disable past dates) — contact page only
    const dateInput = document.getElementById('form-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // 4. Prefill registration on the booking form from ?reg= URL param
    //    (carried over from the Home hero "Get Started" finder)
    const formRegInput = document.getElementById('form-reg');
    if (formRegInput) {
        const params = new URLSearchParams(window.location.search);
        const reg = params.get('reg');
        if (reg) {
            formRegInput.value = reg.toUpperCase();
        }
    }

    // 5. Booking Form Submission Mock — contact page only
    const bookingForm = document.getElementById('booking-form');
    const successMsg = document.getElementById('form-success');

    if (bookingForm && successMsg) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            console.log('Booking Data Submitted:', Object.fromEntries(formData.entries()));

            bookingForm.style.opacity = '0';
            setTimeout(() => {
                bookingForm.style.display = 'none';
                successMsg.style.display = 'block';
                successMsg.style.opacity = '0';

                setTimeout(() => {
                    successMsg.style.transition = 'opacity 0.5s ease';
                    successMsg.style.opacity = '1';
                }, 50);
            }, 300);
        });
    }
});

// 6. Home hero finder → carry reg to the Contact booking form
function goToBooking() {
    const heroRegInput = document.querySelector('.hero .reg-input');
    const reg = heroRegInput ? heroRegInput.value.trim() : '';
    const query = reg ? '?reg=' + encodeURIComponent(reg.toUpperCase()) : '';
    window.location.href = 'contact.html' + query + '#booking';
}
