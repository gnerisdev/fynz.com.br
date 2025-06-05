// Menu
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerButton = document.getElementById('hamburgerButton');
  const navList = document.getElementById('navList');

  if (hamburgerButton && navList) {
    hamburgerButton.addEventListener('click', function () {
      navList.classList.toggle('nav__list--open');
      hamburgerButton.classList.toggle('nav__hamburger--open');
      const isExpanded = navList.classList.contains('nav__list--open');
      hamburgerButton.setAttribute('aria-expanded', isExpanded);
    });
  }
});

// Scroll
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    console.log()
    if (window.scrollY >= 1) {
      header.classList.add('custom-scroll');
    } else {
      header.classList.remove('custom-scroll');
    }
  });
});

// 
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-item__header');
    header.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      item.classList.toggle('active');
    });
  });
});

// Slide Swiper
document.addEventListener('DOMContentLoaded', () => {
  const testimonials = [
    {
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Stephen Huber',
      handle: 'stephen_huber',
      text: `Uau. Acabei de abrir uma solicitação com <a>@Lemonade_Inc</a> e recebi o pagamento em literalmente 7 segundos. Se você aluga ou possui um imóvel, PRECISA ter esse seguro. <a>#seguro</a> <a>#lemonade</a> <a>#NãoÉPublicidade</a>`
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Maria Salamanka',
      handle: 'MariaSalamankaM',
      text: `Sempre me decepciono com o quanto seguradoras dificultam os reembolsos. Acabei de ter minha primeira boa experiência com um pedido. Atendimento incrivelmente rápido e eficaz com <a>@Lemonade_Inc</a>.`
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/73.jpg',
      name: 'Rohan Gandhi',
      handle: 'timesnewrohan',
      text: `<a>@Lemonade_Inc</a> Acabei de contratar um seguro residencial com vocês e, sinceramente, foi mais fácil do que pedir uma pizza. Excelente experiência!`
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
      name: 'Usuária Satisfeita',
      handle: '@outra_usuaria',
      text: `Esse é mais um ótimo depoimento para mostrar como o Swiper funciona bem!`
    }
  ];
  
  const swiperWrapper = document.querySelector('#slide-testimonial .swiper-wrapper');

  const createSlideHTML = (testimonial) => `
    <div class="swiper-slide testimonial-card">
      <div class="testimonial-card__header">
        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-card__avatar">
        <div class="testimonial-card__info">
          <p class="testimonial-card__name">${testimonial.name}</p>
          <p class="global-text testimonial-card__handle">${testimonial.handle}</p>
        </div>
      </div>
      <p class="global-text testimonial-card__text">${testimonial.text}</p>
    </div>
  `;

  testimonials.forEach(testimonial => swiperWrapper.innerHTML += createSlideHTML(testimonial));
  testimonials.forEach(testimonial => swiperWrapper.innerHTML += createSlideHTML(testimonial));

  new Swiper('#slide-testimonial', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: false,
    allowTouchMove: false,
    speed: 20000,
    autoplay: { delay: 0, disableOnInteraction: false },
    freeMode: true,
    freeModeMomentum: false,
  });

  function animateCounter(element, duration = 1000) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      element.textContent = value + '%';

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target + '%';
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.percent');
        cards.forEach(card => animateCounter(card));
        obs.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.1 }); 

  observer.observe(document.getElementById('main-challenges'));

});