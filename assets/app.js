/* ==========================================================================
   Superior Construct Group — site behaviour
   Plain ES5-compatible JS. No dependencies, no build step.
   ========================================================================== */
(function () {
  'use strict';

  var PAGES = ['home', 'services', 'markets', 'projects', 'qualifications', 'about', 'contact'];
  var TITLES = {
    home:           'Superior Construct Group, LLC — General Contracting, MEP & Commissioning',
    services:       'Services — Construction & Engineering | Superior Construct Group',
    markets:        'Markets — Superior Construct Group',
    projects:       'Our Work — Superior Construct Group',
    qualifications: 'Qualifications — Superior Construct Group',
    about:          'About — Superior Construct Group',
    contact:        'Contact Us — Superior Construct Group'
  };

  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- router */

  function pageFromHash() {
    var raw = (location.hash || '').replace(/^#\/?/, '').split(/[?#]/)[0].toLowerCase();
    if (!raw) return 'home';
    return PAGES.indexOf(raw) > -1 ? raw : 'home';
  }

  function showPage(id, scroll) {
    var sections = document.querySelectorAll('[data-page]');
    for (var i = 0; i < sections.length; i++) {
      sections[i].hidden = sections[i].getAttribute('data-page') !== id;
    }

    var links = document.querySelectorAll('.nav__link');
    for (var j = 0; j < links.length; j++) {
      if (links[j].getAttribute('data-nav') === id) {
        links[j].setAttribute('aria-current', 'page');
      } else {
        links[j].removeAttribute('aria-current');
      }
    }

    document.title = TITLES[id] || TITLES.home;

    var main = document.getElementById('main');
    if (main && !prefersReduced) {
      main.style.animation = 'none';
      void main.offsetWidth;
      main.style.animation = 'pageIn .5s cubic-bezier(.2,.7,.2,1) both';
    }

    if (scroll !== false) window.scrollTo(0, 0);

    closeNav();
    setupReveal();
    if (id === 'home') startCounters();
  }

  function route() { showPage(pageFromHash()); }

  window.addEventListener('hashchange', route);

  /* ------------------------------------------------------------ mobile nav */

  var nav = document.getElementById('primary-nav');
  var navToggle = document.querySelector('.nav-toggle');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link')) closeNav();
    });
  }

  /* -------------------------------------------------------- reveal on view */

  var observer = null;

  function setupReveal() {
    var nodes = document.querySelectorAll('[data-page]:not([hidden]) [data-reveal]');
    if (observer) observer.disconnect();

    if (prefersReduced || !('IntersectionObserver' in window)) {
      for (var k = 0; k < nodes.length; k++) {
        nodes[k].style.opacity = '1';
        nodes[k].style.transform = 'none';
      }
      return;
    }

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var delay = (i % 4) * 60;
      node.style.transition =
        'opacity .66s cubic-bezier(.2,.7,.2,1) ' + delay + 'ms, ' +
        'transform .66s cubic-bezier(.2,.7,.2,1) ' + delay + 'ms';

      if (node.getBoundingClientRect().top < window.innerHeight * 0.94) {
        node.style.opacity = '1';
        node.style.transform = 'none';
      } else {
        node.style.opacity = '0';
        node.style.transform = 'translateY(26px)';
        observer.observe(node);
      }
    }

    // Safety net: never leave content invisible if the observer misfires.
    window.clearTimeout(setupReveal.safety);
    setupReveal.safety = window.setTimeout(function () {
      for (var n = 0; n < nodes.length; n++) {
        nodes[n].style.opacity = '1';
        nodes[n].style.transform = 'none';
      }
    }, 4000);
  }

  /* ------------------------------------------------------------- counters */

  var rafId = null;

  function startCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    if (prefersReduced) {
      for (var i = 0; i < els.length; i++) els[i].textContent = format(els[i], parseFloat(els[i].getAttribute('data-count')));
      return;
    }

    if (rafId) cancelAnimationFrame(rafId);
    var start = null;
    var duration = 1500;

    function tick(now) {
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      for (var j = 0; j < els.length; j++) {
        els[j].textContent = format(els[j], parseFloat(els[j].getAttribute('data-count')) * eased);
      }
      if (p < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  }

  function format(el, value) {
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var num = decimals ? value.toFixed(decimals) : String(Math.round(value));
    return prefix + num + suffix;
  }

  /* --------------------------------------------------------- testimonials */

  var QUOTES = [
    {
      text: '“I recently worked with SCG on a remodel project. From start to finish his professionalism was evident. The team was punctual, skilled, and attentive to detail, as well as extremely communicative and responsive. He exceeded my expectations in every way and I highly recommend him.”',
      author: 'Amy'
    },
    {
      text: '“When I saw what SCG was doing with my neighbor’s bathroom renovation, I decided to have my own done using him. His bid was very reasonable, so I hired him. He ended up doing three of my bathrooms as well as my TV room and kitchen. His work is amazing. He is very receptive to customer requests on ongoing projects, as well as being clean, cooperative and conscientious — not to mention a great guy to work with. He is still doing work for me. Five stars.”',
      author: 'Mark Green'
    },
    {
      text: '“I recently had the pleasure of working with SCG for a complete renovation of my house, and I couldn’t be happier with the results. SCG demonstrated the utmost professionalism, attention to detail, and dedication to quality. They were always available to answer questions, provide updates, and offer expert advice, and transparent about timelines and costs — there were no surprises. Every aspect of the renovation, from the structural changes to the finishing touches, was executed with precision and care.”',
      author: 'Hajar'
    }
  ];

  var quoteIndex = 0;
  var quoteText = document.getElementById('quote-text');
  var quoteAuthor = document.getElementById('quote-author');
  var quoteDots = document.getElementById('quote-dots');
  var quoteTimer = null;

  function renderQuote() {
    if (!quoteText) return;
    quoteText.textContent = QUOTES[quoteIndex].text;
    quoteAuthor.textContent = '— ' + QUOTES[quoteIndex].author;
    var dots = quoteDots.querySelectorAll('.dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].setAttribute('aria-selected', i === quoteIndex ? 'true' : 'false');
    }
  }

  function stepQuote(delta) {
    quoteIndex = (quoteIndex + delta + QUOTES.length) % QUOTES.length;
    renderQuote();
  }

  if (quoteDots) {
    for (var q = 0; q < QUOTES.length; q++) {
      (function (index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Testimonial ' + (index + 1));
        dot.addEventListener('click', function () { quoteIndex = index; renderQuote(); });
        quoteDots.appendChild(dot);
      })(q);
    }
    renderQuote();

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-quote]');
      if (!btn) return;
      stepQuote(btn.getAttribute('data-quote') === 'next' ? 1 : -1);
    });

    if (!prefersReduced) {
      quoteTimer = window.setInterval(function () { stepQuote(1); }, 9000);
    }
  }

  /* ------------------------------------------------- before/after sliders */

  function initCompare(root) {
    var clip = root.querySelector('[data-compare-clip]');
    var bar = root.querySelector('[data-compare-bar]');
    var knob = root.querySelector('[data-compare-knob]');
    var pct = 50;

    function paint() {
      clip.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      bar.style.left = pct + '%';
      knob.style.left = pct + '%';
    }

    function moveTo(clientX) {
      var rect = root.getBoundingClientRect();
      pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
      paint();
    }

    root.addEventListener('pointerdown', function (ev) {
      ev.preventDefault();
      if (root.setPointerCapture) { try { root.setPointerCapture(ev.pointerId); } catch (e) {} }
      moveTo(ev.clientX);

      function onMove(e) { moveTo(e.clientX); }
      function onUp() {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      }
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    });

    paint();
  }

  var compares = document.querySelectorAll('[data-compare]');
  for (var c = 0; c < compares.length; c++) initCompare(compares[c]);

  /* ------------------------------------------------------------ the form */

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) { form.reportValidity(); return; }

      var button = form.querySelector('button[type="submit"]');
      var original = button.textContent;
      button.disabled = true;
      button.textContent = 'Sending…';
      status.hidden = true;
      status.className = 'form__status';

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (res) { return res.json().catch(function () { return {}; }).then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (result) {
          if (!result.ok) throw new Error((result.data && result.data.message) || 'Request failed');
          form.reset();
          button.textContent = 'Message sent ✓';
          status.textContent = 'Thank you — we will respond within one business day.';
          status.hidden = false;
        })
        .catch(function () {
          button.disabled = false;
          button.textContent = original;
          status.className = 'form__status form__status--error';
          status.innerHTML = 'Something went wrong. Please email ' +
            '<a href="mailto:info@superiorconstruc.com">info@superiorconstruc.com</a> instead.';
          status.hidden = false;
        });
    });
  }

  /* --------------------------------------------------------------- boot */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  route();
})();
