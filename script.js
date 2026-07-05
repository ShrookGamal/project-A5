document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('overlay');
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.desktop-nav ul li a');
    const sections = document.querySelectorAll('section');
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeAll = () => {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeMenu.addEventListener('click', closeAll);
    overlay.addEventListener('click', closeAll);
    document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', closeAll));
    let counterStarted = false;
    const stats = document.querySelectorAll('.num');
    const startCounter = () => {
        if (counterStarted) return; 
        counterStarted = true;
        stats.forEach(counter => {
            const target = +counter.getAttribute('data-val');
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / 100;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + (target === 100 ? '%' : '+');
                }
            };
            updateCount();
        });
    };
    const handleScroll = () => {
        const scrollPos = window.scrollY + 150; 
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                        link.classList.add('active');
                    }
                });
            }
        });
        const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - 100) {
                el.classList.add('active');
                if (el.classList.contains('reveal-right')) startCounter();
            }
        });
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.padding = '10px 0';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.padding = '15px 0';
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const closeLightbox = document.querySelector('.close-lightbox');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.classList.remove('hide');
                setTimeout(() => item.style.opacity = "1", 10);
            } else {
                item.style.opacity = "0";
                setTimeout(() => item.classList.add('hide'), 400);
            }
        });
    });
});
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const media = item.querySelector('img, video');
        lightboxContent.innerHTML = ''; 

        if (media.tagName === 'IMG') {
            const newImg = document.createElement('img');
            newImg.src = media.src;
            lightboxContent.appendChild(newImg);
        } else {
            const newVid = document.createElement('video');
            newVid.src = media.src;
            newVid.controls = true;
            newVid.autoplay = true;
            lightboxContent.appendChild(newVid);
        }
        
        lightbox.classList.add('active');
    });
});
closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxContent.innerHTML = ''; 
});
lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) {
        lightbox.classList.remove('active');
        lightboxContent.innerHTML = '';
    }
});