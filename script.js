// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

// Cek tema yang tersimpan di localStorage atau gunakan preferensi sistem
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Set tema awal
if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
} else {
    htmlElement.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

// Toggle tema saat tombol diklik
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    if (newTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Tutup menu mobile saat link diklik
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth Scroll untuk Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link saat Scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    const navHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Animasi Skill Bar saat Scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 100) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}

// Intersection Observer untuk animasi skill bar
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Navbar Shadow saat Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px var(--shadow-lg)';
    } else {
        navbar.style.boxShadow = '0 2px 10px var(--shadow)';
    }
});

// Form Contact Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Ambil nilai form
        const name = document.getElementById('name')?.value ?? '';
        const email = document.getElementById('email')?.value ?? '';
        const subject = document.getElementById('subject')?.value ?? '';
        const message = document.getElementById('message')?.value ?? '';
        
        // Validasi sederhana
        if (!name || !email || !subject || !message) {
            alert('Mohon lengkapi semua field!');
            return;
        }
        
        // Simulasi pengiriman (bisa diganti dengan API call)
        console.log('Form Data:', { name, email, subject, message });
        
        // Tampilkan pesan sukses
        alert('Terima kasih! Pesan Anda telah dikirim. Saya akan menghubungi Anda segera.');
        
        // Reset form
        contactForm.reset();
    });
}

// Animasi Reveal saat Scroll (halus & profesional)
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

function setupTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;

    if (prefersReducedMotion) return; // hormati preferensi user

    const raw = el.getAttribute('data-typing') || el.textContent || 'Web Developer';
    const words = raw
        .split('|')
        .map(s => s.trim())
        .filter(Boolean);

    if (words.length === 0) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 70;
    const deleteSpeed = 38;
    const pauseAfterType = 900;
    const pauseAfterDelete = 280;

    const tick = () => {
        const current = words[wordIndex % words.length];

        if (!isDeleting) {
            charIndex = Math.min(current.length, charIndex + 1);
            el.textContent = current.slice(0, charIndex);

            if (charIndex >= current.length) {
                isDeleting = true;
                setTimeout(tick, pauseAfterType);
                return;
            }

            setTimeout(tick, typeSpeed);
            return;
        }

        // deleting
        charIndex = Math.max(0, charIndex - 1);
        el.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex += 1;
            setTimeout(tick, pauseAfterDelete);
            return;
        }

        setTimeout(tick, deleteSpeed);
    };

    // Start: set kosong dulu biar efeknya kerasa
    el.textContent = '';
    setTimeout(tick, 350);
}

function setupParallax() {
    if (prefersReducedMotion) return;
    // hanya untuk mouse/trackpad (biar tetap smooth di HP)
    const finePointer = window.matchMedia?.('(pointer: fine)')?.matches ?? false;
    if (!finePointer) return;

    const hero = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    const imageWrapper = document.querySelector('.image-wrapper');
    if (!hero || !heroText || !imageWrapper) return;

    heroText.classList.add('parallax-ready');
    imageWrapper.classList.add('parallax-ready');

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
        rafId = 0;
        // kekuatan kecil biar terlihat premium, bukan norak
        const tx = targetX;
        const ty = targetY;

        heroText.style.transform = `translate3d(${tx * 6}px, ${ty * 6}px, 0)`;
        imageWrapper.style.transform = `translate3d(${tx * 10}px, ${ty * 10}px, 0)`;
    };

    const onMove = (e) => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);

        // clamp [-1, 1]
        targetX = Math.max(-1, Math.min(1, dx));
        targetY = Math.max(-1, Math.min(1, dy));

        if (!rafId) rafId = window.requestAnimationFrame(apply);
    };

    const reset = () => {
        targetX = 0;
        targetY = 0;
        if (!rafId) rafId = window.requestAnimationFrame(apply);
    };

    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', reset);
}

function setupRevealAnimations() {
    if (prefersReducedMotion) {
        document.body.classList.add('is-loaded');
        return;
    }

    // Fade-in halaman
    document.body.classList.add('is-loaded');

    // Tambahkan class .reveal ke elemen-elemen penting
    const revealTargets = document.querySelectorAll(
        '.hero-text > *, .hero-image, .section-title, .about-text p, .stat-item, .skill-card, .project-card, .contact-item, .contact-form'
    );

    revealTargets.forEach((el) => {
        el.classList.add('reveal');
    });

    // Stagger halus untuk elemen hero
    const heroItems = document.querySelectorAll('.hero-text > *');
    heroItems.forEach((el, idx) => {
        el.style.transitionDelay = `${Math.min(idx, 8) * 80}ms`;
    });

    // Hindari "kedip": tampilkan yang sudah ada di viewport
    revealTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
            el.classList.add('is-visible');
        }
    });

    const revealObserver = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
}

// Scroll progress bar (indikator halus di bagian atas)
function setupScrollProgress() {
    const progressEl = document.getElementById('scrollProgress');
    if (!progressEl) return;

    let ticking = false;

    const update = () => {
        ticking = false;
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop || 0;
        const scrollHeight = doc.scrollHeight - window.innerHeight;

        if (scrollHeight <= 0) {
            progressEl.classList.add('is-hidden');
            progressEl.style.width = '0%';
            return;
        }

        progressEl.classList.remove('is-hidden');
        const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        progressEl.style.width = `${pct}%`;
    };

    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
}

window.addEventListener('DOMContentLoaded', () => {
    setupRevealAnimations();
    setupScrollProgress();
    setupTypingEffect();
    setupParallax();
});

// Handle Profile Image Loading
const profileImage = document.getElementById('profileImage');
const profilePlaceholder = document.getElementById('profilePlaceholder');

if (profileImage) {
    profileImage.addEventListener('load', () => {
        // Jika gambar berhasil dimuat, tampilkan gambar dan sembunyikan placeholder
        profileImage.classList.add('loaded');
        if (profilePlaceholder) {
            profilePlaceholder.classList.add('hidden');
        }
    });

    profileImage.addEventListener('error', () => {
        // Jika gambar gagal dimuat, tampilkan placeholder
        profileImage.classList.remove('loaded');
        if (profilePlaceholder) {
            profilePlaceholder.classList.remove('hidden');
        }
    });

    // Cek apakah gambar sudah dimuat (untuk kasus gambar dari cache)
    if (profileImage.complete && profileImage.naturalHeight !== 0) {
        profileImage.classList.add('loaded');
        if (profilePlaceholder) {
            profilePlaceholder.classList.add('hidden');
        }
    }
}

// Handle Project Image Loading
const projectImages = document.querySelectorAll('.project-img');
projectImages.forEach(img => {
    const projectImageContainer = img.closest('.project-image');
    const placeholder = projectImageContainer?.querySelector('.project-placeholder');
    
    if (img && placeholder) {
        img.addEventListener('error', () => {
            // Jika gambar gagal dimuat, tampilkan placeholder
            img.style.display = 'none';
            placeholder.style.display = 'flex';
        });
        
        img.addEventListener('load', () => {
            // Jika gambar berhasil dimuat, pastikan placeholder tersembunyi
            placeholder.style.display = 'none';
        });
        
        // Cek apakah gambar sudah dimuat
        if (img.complete && img.naturalHeight !== 0) {
            placeholder.style.display = 'none';
        } else if (img.complete && img.naturalHeight === 0) {
            // Gambar gagal dimuat
            img.style.display = 'none';
            placeholder.style.display = 'flex';
        }
    }
});

// Back to Top Button (opsional, bisa ditambahkan jika diperlukan)
let backToTopButton = null;

function createBackToTopButton() {
    backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Kembali ke atas');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--accent-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px var(--shadow-lg);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.transform = 'translateY(-5px)';
        backToTopButton.style.boxShadow = '0 8px 20px var(--shadow-lg)';
    });
    
    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.transform = 'translateY(0)';
        backToTopButton.style.boxShadow = '0 5px 15px var(--shadow-lg)';
    });
}

// Inisialisasi Back to Top Button
createBackToTopButton();

// Handle resize untuk mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});
