document.addEventListener('DOMContentLoaded', () => {

// Mobile menu
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Phone formatting
const telInput = document.getElementById('tel');
if (telInput) {
    telInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '');
        if (x.startsWith('998')) x = x.substring(3);
        x = x.substring(0, 9);
        
        let formatted = '+998';
        if (x.length > 0) formatted += ' ' + x.substring(0, 2);
        if (x.length > 2) formatted += ' ' + x.substring(2, 5);
        if (x.length > 5) formatted += ' ' + x.substring(5, 7);
        if (x.length > 7) formatted += ' ' + x.substring(7, 9);
        
        e.target.value = formatted;
    });
}

// Form submission
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const ism = document.getElementById('ism').value.trim();
    const tel = document.getElementById('tel').value.trim();
    const xizmat = document.getElementById('xizmat').value;
    const xabar = document.getElementById('xabar').value.trim();
    
    if (!ism || !tel || !xizmat) {
        alert('Barcha maydonlarni to\'ldiring!');
        return;
    }
    
    const btn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMessage');
    
    btn.disabled = true;
    btn.textContent = 'Yuborilmoqda...';
    
    fetch('/send-order.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ism, tel, xizmat, xabar})
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok) {
            successMsg.style.display = 'block';
            document.getElementById('orderForm').reset();
            setTimeout(() => successMsg.style.display = 'none', 5000);
        } else {
            alert('Xatolik: ' + data.error);
        }
    })
    .catch(() => alert('Internet aloqasini tekshiring!'))
    .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Yuborish';
    });
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({behavior: 'smooth'});
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#0A192F';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = '#0A192F';
        navbar.style.boxShadow = 'none';
    }
});

});