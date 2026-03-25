// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'white';
    navLinks.style.flexDirection = 'column';
    navLinks.style.padding = '20px';
    navLinks.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            navLinks.style.display = 'none';
        }
    });
});

// Cambiar navbar al scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
});

// Modal de imágenes
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');

const images = [
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop'
];

function openModal(index) {
    modal.style.display = 'block';
    modalImg.src = images[index];
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer click fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closePaymentModal();
    }
});

// Modal de Pago
const paymentModal = document.getElementById('paymentModal');

function openPaymentModal() {
    paymentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    paymentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal de pago al hacer click fuera
paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        closePaymentModal();
    }
});

// Procesar pago
function processPayment(method) {
    const messages = {
        'webpay': 'Redirigiendo a WebPay...',
        'mercadopago': 'Redirigiendo a MercadoPago...',
        'paypal': 'Redirigiendo a PayPal...'
    };
    
    // Simulación de procesamiento
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(messages[method] + '\n\nEn una implementación real, esto conectaría con la pasarela de pago correspondiente.\n\nPara pagos directos, contacta al:\n+56 9 7796 52XX');
        btn.innerHTML = originalText;
        btn.disabled = false;
        closePaymentModal();
    }, 1500);
}

// Formulario de agendamiento
document.getElementById('agendarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const tratamiento = document.getElementById('tratamiento').value;
    const fecha = document.getElementById('fecha').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Validación
    if (!nombre || !telefono || !email || !tratamiento || !fecha) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    // Simulación de envío
    const btn = e.target.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`¡Solicitud enviada con éxito!\n\nHola ${nombre}, hemos recibido tu solicitud para ${tratamiento} el día ${fecha}.\n\nNos contactaremos al ${telefono} para confirmar tu cita.\n\n¡Gracias por elegir Nua Skin & Wellness!`);
        
        btn.textContent = originalText;
        btn.disabled = false;
        e.target.reset();
    }, 2000);
});

// Establecer fecha mínima (hoy)
const fechaInput = document.getElementById('fecha');
const today = new Date().toISOString().split('T')[0];
fechaInput.setAttribute('min', today);

// Animación de entrada al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animar
document.querySelectorAll('.tratamiento-card, .gallery-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto parallax sutil en hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

console.log('🌸 Nua Skin & Wellness - Web cargada exitosamente');
