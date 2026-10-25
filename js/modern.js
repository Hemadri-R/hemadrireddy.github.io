/* ===================================================================
   Hemadri Reddy - Modern Portfolio JavaScript
   Interactive Terminal, Filter Matrix, Stats & Smooth Navigation
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar scroll background effect & back-to-top visibility
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  // Clean URL: Strip #top on load and handle brand click without URL hash
  if (window.location.hash === '#top') {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }

  const navBrand = document.querySelector('.nav-brand');
  navBrand?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  });

  backToTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  });

  // 2. Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Active section indicator via Intersection Observer
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          const mappedId = (currentId === 'philosophy') ? 'about' : 
                           (currentId === 'interests' || currentId === 'goals') ? 'projects' : currentId;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${mappedId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(section => observer.observe(section));
  }

  // 4. Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Copy email to clipboard function
  const copyButtons = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('copy-toast');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'ihemadrireddy@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email address copied to clipboard!');
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 6. Animated stat number count-up on scroll
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    let animated = false;
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            const isFloat = target % 1 !== 0;
            let current = 0;
            const duration = 1400;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              stat.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statObserver.observe(statsSection);
    }
  }

  // 7. Interactive Terminal Test Runner Simulation
  const runTestBtn = document.getElementById('run-terminal-test');
  const clearTermBtn = document.getElementById('clear-terminal');
  const termBody = document.getElementById('terminal-output-body');

  const defaultTerminalLines = [
    '<div class="terminal-line"><span class="terminal-prompt">sdet@hemadri:~/universe-framework$</span> <span class="terminal-cmd">npx cucumber-js --tags "@smoke and @mcp"</span></div>',
    '<div class="terminal-line term-purple"><i class="fa-solid fa-microchip"></i> [MCP Host] Initializing Chrome DevTools MCP & ClickUp MCP servers... [CONNECTED]</div>',
    '<div class="terminal-line term-muted">Configuring CustomWorld context, loading 30+ Page Object Classes, baseURL: https://app.vitra.ai</div>',
    '<div class="terminal-line term-success"><i class="fa-solid fa-check"></i> [PASS] Scenario: Multilingual media dubbing & translation memory (Owner role) (1.42s)</div>',
    '<div class="terminal-line term-success"><i class="fa-solid fa-check"></i> [PASS] Scenario: REST API contract & JWT auth payload schema validation (340ms)</div>',
    '<div class="terminal-line term-success"><i class="fa-solid fa-check"></i> [PASS] Scenario: Autonomous locator self-healing on dynamic DOM tree (780ms)</div>',
    '<div class="terminal-line term-success"><i class="fa-solid fa-check"></i> [PASS] Scenario: Deeply nested JSON & DOCX synthetic test fixtures (260ms)</div>',
    '<div class="terminal-line term-info"><i class="fa-solid fa-chart-pie"></i> Generating Dual Allure Reports & Cucumber HTML... [SAVED ./allure-results]</div>',
    '<div class="terminal-line"><span class="term-success" style="font-weight:700;">✔ 4 scenarios passed (28 steps) [100% SUCCESS]</span> <span class="term-muted">Time: 2.80s</span></div>',
    '<div class="terminal-line"><span class="terminal-prompt">sdet@hemadri:~/universe-framework$</span> <span class="term-cursor"></span></div>'
  ];

  if (termBody) {
    termBody.innerHTML = defaultTerminalLines.join('');
  }

  if (runTestBtn && termBody) {
    let isRunning = false;
    runTestBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      runTestBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running...';
      termBody.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">sdet@hemadri:~/universe-framework$</span> <span class="terminal-cmd">npx playwright test --workers=4 --reporter=allure-playwright</span></div>';

      const sequence = [
        { text: '<div class="terminal-line term-info"><i class="fa-solid fa-network-wired"></i> [Playwright] Launching 4 parallel workers (Chromium, Firefox, WebKit headless)...</div>', delay: 350 },
        { text: '<div class="terminal-line term-purple"><i class="fa-solid fa-brain"></i> [MCP Bridge] Chrome DevTools MCP attached for live network interception & console monitoring.</div>', delay: 750 },
        { text: '<div class="terminal-line term-success"><i class="fa-solid fa-check"></i> ✓ [Worker 1] specs/rbac/owner-admin-access.spec.js (1.12s)</div>', delay: 1200 },
        { text: '<div class="terminal-line term-success"><i class="fa-solid fa-check"></i> ✓ [Worker 2] specs/api/translation-memory-contract.spec.js (480ms)</div>', delay: 1600 },
        { text: '<div class="terminal-line term-success"><i class="fa-solid fa-check"></i> ✓ [Worker 3] specs/e2e/video-dubbing-workflow.spec.js (1.35s)</div>', delay: 2100 },
        { text: '<div class="terminal-line term-success"><i class="fa-solid fa-check"></i> ✓ [Worker 4] specs/mcp/autonomous-locator-healing.spec.js (820ms)</div>', delay: 2500 },
        { text: '<div class="terminal-line term-info"><i class="fa-solid fa-circle-check"></i> [ClickUp MCP] Zero defect triggers reported. Release gate passed successfully!</div>', delay: 2900 },
        { text: '<div class="terminal-line"><span class="term-success" style="font-weight:700;">✔ 18 passed in 3.4s</span> <span class="badge badge-emerald">QUALITY SIGN-OFF GRANTED</span></div>', delay: 3200 },
        { text: '<div class="terminal-line"><span class="terminal-prompt">sdet@hemadri:~/universe-framework$</span> <span class="term-cursor"></span></div>', delay: 3400 }
      ];

      sequence.forEach(item => {
        setTimeout(() => {
          termBody.innerHTML += item.text;
          termBody.scrollTop = termBody.scrollHeight;
        }, item.delay);
      });

      setTimeout(() => {
        isRunning = false;
        runTestBtn.innerHTML = '<i class="fa-solid fa-play"></i> Re-Run Test';
      }, 3600);
    });
  }

  if (clearTermBtn && termBody) {
    clearTermBtn.addEventListener('click', () => {
      termBody.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">sdet@hemadri:~/universe-framework$</span> <span class="term-cursor"></span></div>';
    });
  }

  // 8. Skills Filtering Tabs Logic
  const filterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // 9. Interactive Theme Switcher Engine
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeOptions = document.querySelectorAll('.theme-option');

  // Load saved theme preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 'cyan';
  applyTheme(savedTheme);

  if (themeToggleBtn && themeDropdown) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!themeDropdown.contains(e.target) && e.target !== themeToggleBtn) {
        themeDropdown.classList.remove('open');
      }
    });
  }

  themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const selectedTheme = opt.getAttribute('data-set-theme');
      applyTheme(selectedTheme);
      try {
        localStorage.setItem('portfolio-theme', selectedTheme);
      } catch (err) {}
      if (themeDropdown) themeDropdown.classList.remove('open');
    });
  });

  function applyTheme(themeName) {
    if (themeName === 'cyan') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }

    themeOptions.forEach(opt => {
      if (opt.getAttribute('data-set-theme') === themeName) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Update label text if present
    const labelEl = document.querySelector('.theme-label-text');
    if (labelEl) {
      const names = {
        'cyan': 'Midnight',
        'violet': 'Violet',
        'emerald': 'Emerald',
        'carbon': 'Carbon',
        'light': 'Light'
      };
      labelEl.textContent = names[themeName] || 'Theme';
    }
  }
});
