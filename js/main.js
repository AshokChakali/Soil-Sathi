// Main JavaScript functionality for AgriFlow platform

class AgriFlowApp {
    constructor() {
        this.currentLanguage = this.loadLanguage();
        this.translations = this.getTranslations();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupScrollEffects();
        this.setupSearch();
        this.setupAuthModal();
        this.setupTooltips();
        this.setupNotifications();
        this.setupI18n();
    }

    // Custom smooth scroll with configurable duration and easing
    smoothScrollToY(targetY, duration = 1500) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();
        const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            window.scrollTo(0, startY + distance * eased);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', this.handleNavbarScroll.bind(this));
        
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                // Lock body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Smooth scrolling for anchor links (slower, eased)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const navbar = document.getElementById('navbar');
                    const offset = navbar ? navbar.offsetHeight : 0;
                    const rect = target.getBoundingClientRect();
                    const targetY = window.pageYOffset + rect.top - offset;
                    this.smoothScrollToY(targetY, 1500);
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
    }

    // ---------------- I18N ----------------
    getTranslations() {
        return {
            en: {
                'nav.home': 'Home',
                'nav.market': 'Market',
                'nav.booking': 'Booking',
                'nav.help': 'Help',
                'nav.login': 'Login',
                'search.placeholder': 'Search Mills, Price...',
                'lang.toggleLabel': 'Change language',
                'hero.title1': 'Smart Digital Platform',
                'hero.title2': 'for Farm-to-Mill',
                'hero.title3': 'Logistics ',
                'hero.description': 'Revolutionizing agriculture with AI-powered logistics optimization and precision soil analysis for sustainable farming practices.',
                'hero.cta.explore': 'Explore Platform',
                'hero.cta.getStarted': 'Get Started',
                'cards.card1.tooltip': 'Real-time crop monitoring',
                'cards.card1.text': 'Live Analytics',
                'cards.card2.tooltip': 'Optimized delivery routes',
                'cards.card2.text': 'Smart Routes',
                'cards.card3.tooltip': 'AI soil analysis',
                'cards.card3.text': 'Soil Insights',
                'features.title': 'Platform Features',
                'features.subtitle': 'Empowering farmers with cutting-edge technology',
                'features.card1.title': 'Crop Monitoring',
                'features.card1.desc': 'Real-time tracking of crop health, growth stages, and yield predictions using satellite imagery and IoT sensors.',
                'features.card1.stat': 'Accuracy',
                'features.card2.title': 'Smart Logistics',
                'features.card2.desc': 'Optimized supply chain management from farm to mill with AI-powered route planning and inventory tracking.',
                'features.card2.stat': 'Cost Reduction',
                'features.card3.title': 'Soil Analysis',
                'features.card3.desc': 'Comprehensive soil health assessment with personalized fertilizer recommendations and sustainability insights.',
                'features.card3.stat': 'Monitoring',
                'features.card4.title': 'Mobile App',
                'features.card4.desc': 'Access all features on-the-go with our intuitive mobile application designed for farmers in the field.',
                'features.card4.stat': 'Active Users',
                'global.title': 'Global Agriculture Network',
                'global.subtitle': 'Connecting farms worldwide for sustainable agriculture',
                'global.card1.title': 'Active Farms',
                'global.card1.change': '+12% this month',
                'global.card2.title': 'Connected Mills',
                'global.card2.change': '+8% this month',
                'global.card3.title': 'Total Yield',
                'global.card3.change': '+15% this season',
                'cta.title': 'Ready to Transform Your Agriculture?',
                'cta.subtitle': 'Join thousands of farmers already using AgriFlow to optimize their operations and increase yields.',
                'cta.primary': 'Start Free Trial',
                'cta.secondary': 'Learn More',
                'footer.tagline': 'Revolutionizing agriculture through technology, sustainability, and innovation.',
                'footer.platform.title': 'Platform',
                'footer.platform.link1': 'Farm-to-Mill Logistics',
                'footer.platform.link2': 'Soil Advisory',
                'footer.platform.link3': 'Features',
                'footer.platform.link4': 'Pricing',
                'footer.company.title': 'Company',
                'footer.company.link1': 'About Us',
                'footer.company.link2': 'Careers',
                'footer.company.link3': 'Contact',
                'footer.company.link4': 'Blog',
                'footer.support.title': 'Support',
                'footer.support.link1': 'Help Center',
                'footer.support.link2': 'Documentation',
                'footer.support.link3': 'API',
                'footer.support.link4': 'Status',
                'footer.legal.privacy': 'Privacy Policy',
                'footer.legal.terms': 'Terms of Service',
                'footer.legal.cookies': 'Cookie Policy',
                'footer.copyright': '© 2024 AgriFlow. All rights reserved.'
            },
            hi: {
                'nav.home': 'होम',
                'nav.market': 'बाज़ार',
                'nav.booking': 'बुकिंग',
                'nav.help': 'सहायता',
                'nav.login': 'लॉगिन',
                'search.placeholder': 'मिल, कीमत खोजें...',
                'lang.toggleLabel': 'भाषा बदलें',
                'hero.title1': 'स्मार्ट डिजिटल प्लेटफ़ॉर्म',
                'hero.title2': 'फार्म-टू-मिल के लिए',
                'hero.title3': 'लॉजिस्टिक्स ',
                'hero.description': 'एआई-संचालित लॉजिस्टिक्स अनुकूलन और सटीक मृदा विश्लेषण के साथ कृषि में क्रांति।',
                'hero.cta.explore': 'प्लेटफ़ॉर्म देखें',
                'hero.cta.getStarted': 'शुरू करें',
                'cards.card1.tooltip': 'रियल-टाइम फसल निगरानी',
                'cards.card1.text': 'लाइव एनालिटिक्स',
                'cards.card2.tooltip': 'अनुकूलित डिलीवरी रूट',
                'cards.card2.text': 'स्मार्ट रूट्स',
                'cards.card3.tooltip': 'एआई मृदा विश्लेषण',
                'cards.card3.text': 'मृदा इनसाइट्स',
                'features.title': 'प्लेटफ़ॉर्म फीचर्स',
                'features.subtitle': 'उन्नत तकनीक से किसानों को सशक्त बनाना',
                'features.card1.title': 'फसल निगरानी',
                'features.card1.desc': 'उपग्रह इमेजरी और IoT सेंसर का उपयोग करके फसल स्वास्थ्य, वृद्धि चरण और उपज भविष्यवाणी का रियल-टाइम ट्रैकिंग।',
                'features.card1.stat': 'सटीकता',
                'features.card2.title': 'स्मार्ट लॉजिस्टिक्स',
                'features.card2.desc': 'एआई-संचालित रूट प्लानिंग और इन्वेंट्री ट्रैकिंग के साथ फार्म से मिल तक सप्लाई चेन प्रबंधन।',
                'features.card2.stat': 'लागत में कमी',
                'features.card3.title': 'मृदा विश्लेषण',
                'features.card3.desc': 'व्यक्तिगत उर्वरक सिफारिशों और स्थिरता अंतर्दृष्टि के साथ व्यापक मृदा स्वास्थ्य मूल्यांकन।',
                'features.card3.stat': 'निगरानी',
                'features.card4.title': 'मोबाइल ऐप',
                'features.card4.desc': 'खेत में किसानों के लिए डिज़ाइन किए गए हमारे सहज मोबाइल ऐप के साथ सभी फीचर्स का उपयोग करें।',
                'features.card4.stat': 'सक्रिय उपयोगकर्ता',
                'global.title': 'वैश्विक कृषि नेटवर्क',
                'global.subtitle': 'टिकाऊ कृषि के लिए विश्वभर के खेतों को जोड़ना',
                'global.card1.title': 'सक्रिय फार्म',
                'global.card1.change': 'इस महीने +12%',
                'global.card2.title': 'कनेक्टेड मिल्स',
                'global.card2.change': 'इस महीने +8%',
                'global.card3.title': 'कुल उपज',
                'global.card3.change': 'इस सीज़न +15%',
                'cta.title': 'क्या आप अपनी कृषि बदलने के लिए तैयार हैं?',
                'cta.subtitle': 'हजारों किसान पहले से ही AgriFlow का उपयोग करके अपना संचालन अनुकूलित कर रहे हैं और पैदावार बढ़ा रहे हैं।',
                'cta.primary': 'फ्री ट्रायल शुरू करें',
                'cta.secondary': 'और जानें',
                'footer.tagline': 'प्रौद्योगिकी, स्थिरता और नवाचार के माध्यम से कृषि में क्रांति।',
                'footer.platform.title': 'प्लेटफ़ॉर्म',
                'footer.platform.link1': 'फार्म-टू-मिल लॉजिस्टिक्स',
                'footer.platform.link2': 'मृदा सलाह',
                'footer.platform.link3': 'फीचर्स',
                'footer.platform.link4': 'प्राइसिंग',
                'footer.company.title': 'कंपनी',
                'footer.company.link1': 'हमारे बारे में',
                'footer.company.link2': 'करियर',
                'footer.company.link3': 'संपर्क',
                'footer.company.link4': 'ब्लॉग',
                'footer.support.title': 'सहायता',
                'footer.support.link1': 'हेल्प सेंटर',
                'footer.support.link2': 'प्रलेखन',
                'footer.support.link3': 'API',
                'footer.support.link4': 'स्थिति',
                'footer.legal.privacy': 'गोपनीयता नीति',
                'footer.legal.terms': 'सेवा की शर्तें',
                'footer.legal.cookies': 'कुकी नीति',
                'footer.copyright': '© 2024 AgriFlow. सर्वाधिकार सुरक्षित.'
            },
            te: {
                'nav.home': 'హోమ్',
                'nav.market': 'మార్కెట్',
                'nav.booking': 'బుకింగ్',
                'nav.help': 'సహాయం',
                'nav.login': 'లాగిన్',
                'search.placeholder': 'మిల్స్, ధర వెతకండి...',
                'lang.toggleLabel': 'భాష మార్చండి',
                'hero.title1': 'స్మార్ట్ డిజిటల్ ప్లాట్‌ఫార్మ్',
                'hero.title2': 'ఫార్మ్-టు-మిల్ కోసం',
                'hero.title3': 'లాజిస్టిక్స్ ',
                'hero.description': 'ఏఐ శక్తితో నడిచే లాజిస్టిక్స్ ఆప్టిమైజేషన్ మరియు ఖచ్చితమైన నేల విశ్లేషణతో వ్యవసాయంలో విప్లవం.',
                'hero.cta.explore': 'ప్లాట్‌ఫార్మ్ చూడండి',
                'hero.cta.getStarted': 'ప్రారంభించండి',
                'cards.card1.tooltip': 'రియల్-టైమ్ పంట పర్యవేక్షణ',
                'cards.card1.text': 'లైవ్ అనలిటిక్స్',
                'cards.card2.tooltip': 'ఆప్టిమైజ్డ్ డెలివరీ మార్గాలు',
                'cards.card2.text': 'స్మార్ట్ రూట్స్',
                'cards.card3.tooltip': 'ఏఐ నేల విశ్లేషణ',
                'cards.card3.text': 'సాయిల్ ఇన్‌సైట్స్',
                'features.title': 'ప్లాట్‌ఫార్మ్ లక్షణాలు',
                'features.subtitle': 'అత్యాధునిక సాంకేతికతతో రైతులను శక్తివంతం చేయడం',
                'features.card1.title': 'పంట పర్యవేక్షణ',
                'features.card1.desc': 'ఉపగ్రహ చిత్రాలు మరియు IoT సెన్సార్లను ఉపయోగించి పంట ఆరోగ్యం, వృద్ధి దశలు మరియు దిగుబడి అంచనాల రియల్-టైమ్ ట్రాకింగ్.',
                'features.card1.stat': 'ఖచ్చితత్వం',
                'features.card2.title': 'స్మార్ట్ లాజిస్టిక్స్',
                'features.card2.desc': 'ఏఐ-శక్తితో మార్గ ప్రణాళిక మరియు ఇన్వెంటరీ ట్రాకింగ్‌తో ఫార్మ్ నుండి మిల్ వరకు సరఫరా గొలుసు నిర్వహణ.',
                'features.card2.stat': 'ఖర్చు తగ్గింపు',
                'features.card3.title': 'నేల విశ్లేషణ',
                'features.card3.desc': 'వ్యక్తిగత ఎరువుల సిఫారసులతో మరియు స్థిరత్వం అంతర్దృష్టులతో సమగ్ర నేల ఆరోగ్య అంచనా.',
                'features.card3.stat': 'మానిటరింగ్',
                'features.card4.title': 'మొబైల్ యాప్',
                'features.card4.desc': 'రైతుల కోసం రూపొందించిన మా ఇంట్యూటివ్ మొబైల్ యాప్‌తో అన్ని లక్షణాలను ఎప్పుడైనా యాక్సెస్ చేయండి.',
                'features.card4.stat': 'సక్రియ వినియోగదారులు',
                'global.title': 'గ్లోబల్ అగ్రికల్చర్ నెట్‌వర్క్',
                'global.subtitle': 'స్థిరమైన వ్యవసాయం కోసం ప్రపంచవ్యాప్తంగా ఉన్న ఫార్మ్‌లను కలపడం',
                'global.card1.title': 'సక్రియ ఫార్మ్స్',
                'global.card1.change': 'ఈ నెల +12%',
                'global.card2.title': 'కనెక్ట్ అయిన మిల్స్',
                'global.card2.change': 'ఈ నెల +8%',
                'global.card3.title': 'మొత్తం దిగుబడి',
                'global.card3.change': 'ఈ సీజన్ +15%',
                'cta.title': 'మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధమా?',
                'cta.subtitle': 'AgriFlowను ఉపయోగిస్తున్న వేలాది మంది రైతులతో చేరండి, వారి కార్యకలాపాలను ఆప్టిమైజ్ చేసి దిగుబడులను పెంచండి.',
                'cta.primary': 'ఉచిత ట్రయల్ ప్రారంభించండి',
                'cta.secondary': 'ఇంకా తెలుసుకోండి',
                'footer.tagline': 'సాంకేతికత, స్థిరత్వం మరియు ఆవిష్కరణల ద్వారా వ్యవసాయంలో విప్లవం.',
                'footer.platform.title': 'ప్లాట్‌ఫార్మ్',
                'footer.platform.link1': 'ఫార్మ్-టు-మిల్ లాజిస్టిక్స్',
                'footer.platform.link2': 'నేల సలహా',
                'footer.platform.link3': 'లక్షణాలు',
                'footer.platform.link4': 'ధరలు',
                'footer.company.title': 'కంపెనీ',
                'footer.company.link1': 'మా గురించి',
                'footer.company.link2': 'కెరీయర్స్',
                'footer.company.link3': 'సంప్రదించండి',
                'footer.company.link4': 'బ్లాగ్',
                'footer.support.title': 'సపోర్ట్',
                'footer.support.link1': 'హెల్ప్ సెంటర్',
                'footer.support.link2': 'డాక్యుమెంటేషన్',
                'footer.support.link3': 'API',
                'footer.support.link4': 'స్థితి',
                'footer.legal.privacy': 'గోప్యతా విధానం',
                'footer.legal.terms': 'సేవ నిబంధనలు',
                'footer.legal.cookies': 'కుకీ విధానం',
                'footer.copyright': '© 2024 AgriFlow. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.'
            }
        };
    }

    loadLanguage() {
        try {
            return localStorage.getItem('app_lang') || 'en';
        } catch (_) {
            return 'en';
        }
    }

    saveLanguage(lang) {
        try {
            localStorage.setItem('app_lang', lang);
        } catch (_) {}
    }

    setupI18n() {
        // Apply initial language
        this.applyTranslations();
        // Setup UI interactions
        const toggleBtn = document.getElementById('lang-toggle');
        const menu = document.getElementById('lang-menu');
        const switcher = document.getElementById('lang-switcher');

        if (toggleBtn && menu && switcher) {
            // Set button label to current language code
            toggleBtn.textContent = this.currentLanguage.toUpperCase();
            toggleBtn.setAttribute('aria-label', this.t('lang.toggleLabel'));

            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                toggleBtn.setAttribute('aria-expanded', String(!expanded));
                menu.style.display = expanded ? 'none' : 'block';
            });

            // Menu option clicks
            menu.querySelectorAll('.lang-option').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const lang = e.currentTarget.getAttribute('data-lang');
                    this.setLanguage(lang);
                    // Close menu
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    menu.style.display = 'none';
                });
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!switcher.contains(e.target)) {
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    menu.style.display = 'none';
                }
            });
        }
    }

    t(key) {
        const dict = this.translations[this.currentLanguage] || {};
        return dict[key] || this.translations.en[key] || '';
    }

    setLanguage(lang) {
        if (!this.translations[lang]) return;
        this.currentLanguage = lang;
        this.saveLanguage(lang);
        const toggleBtn = document.getElementById('lang-toggle');
        if (toggleBtn) toggleBtn.textContent = lang.toUpperCase();
        this.applyTranslations();
    }

    applyTranslations() {
        // Elements with text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = this.t(key);
            if (value) el.textContent = value;
        });

        // Elements with placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const value = this.t(key);
            if (value) el.setAttribute('placeholder', value);
        });

        // Elements with data-tooltip
        document.querySelectorAll('[data-i18n-data-tooltip]').forEach(el => {
            const key = el.getAttribute('data-i18n-data-tooltip');
            const value = this.t(key);
            if (value) el.setAttribute('data-tooltip', value);
        });

        // Elements with aria-label
        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            const value = this.t(key);
            if (value) el.setAttribute('aria-label', value);
        });
    }

    handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    handleKeyboardNavigation(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            this.closeAllModals();
        }

        // Alt key toggles system cursor (accessibility)
        if (e.altKey) {
            document.body.classList.add('system-cursor');
        } else {
            document.body.classList.remove('system-cursor');
        }
    }

    initializeAnimations() {
        // Initialize GSAP ScrollTrigger
        if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero title animation
        this.animateHeroTitle();
        
        // Feature cards animation
        this.animateFeatureCards();
        
        // Scroll reveal animations
        this.setupScrollReveal();
    }

    animateHeroTitle() {
        const titleLines = document.querySelectorAll('.title-line');
        
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(titleLines, 
                { 
                    opacity: 0, 
                    y: 50 
                },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.2, 
                    ease: "power2.out" 
                }
            );
        } else {
            // Fallback CSS animation
            titleLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    }

    animateFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        if (typeof gsap !== 'undefined' && ScrollTrigger) {
            featureCards.forEach((card, index) => {
                gsap.fromTo(card,
                    { 
                        opacity: 0, 
                        y: 50 
                    },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.6, 
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }
    }

    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    setupScrollEffects() {
        // Parallax effect for hero section (reduced while snapping to avoid jitter)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.getElementById('hero');
                
                if (hero) {
                    // Apply gentler parallax to avoid fighting scroll-snap
                    hero.style.transform = `translateY(${Math.round(scrolled * 0.2)}px)`;
                }
                ticking = false;
            });
        }, { passive: true });

        // Floating cards animation
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.5}s`;
        });

        // Active section highlighting during snap
        const sections = [
            { id: 'hero', link: 'index.html' },
            { id: 'features', link: '#features' }
        ];
        const navLinks = document.querySelectorAll('.nav-link');
        const setActiveLink = (hashOrHref) => {
            navLinks.forEach(l => l.classList.remove('active'));
            const match = Array.from(navLinks).find(l => l.getAttribute('href') === hashOrHref);
            if (match) match.classList.add('active');
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                    const conf = sections.find(s => s.id === entry.target.id);
                    if (conf) setActiveLink(conf.link);
                }
            });
        }, { threshold: [0.6] });

        sections.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchContainer = document.querySelector('.search-container');
        
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim();
                
                if (query.length > 2) {
                    searchTimeout = setTimeout(() => {
                        this.performSearch(query);
                    }, 300);
                } else {
                    this.hideSearchResults();
                }
            });

            // Show/hide search results on focus/blur
            searchInput.addEventListener('focus', () => {
                if (searchInput.value.trim().length > 2) {
                    this.showSearchResults();
                }
            });

            searchInput.addEventListener('blur', (e) => {
                // Delay hiding to allow clicking on results
                setTimeout(() => {
                    if (!e.relatedTarget || !e.relatedTarget.closest('.search-results')) {
                        this.hideSearchResults();
                    }
                }, 200);
            });
        }
    }

    performSearch(query) {
        // Mock search results - in real app, this would be an API call
        const mockResults = [
            {
                title: "Crop Monitoring Dashboard",
                description: "Real-time crop health tracking and yield predictions",
                url: "#features"
            },
            {
                title: "Soil Analysis Report",
                description: "Comprehensive soil health assessment and recommendations",
                url: "soil-advisory.html"
            },
            {
                title: "Logistics Optimization",
                description: "AI-powered supply chain management from farm to mill",
                url: "logistics.html"
            },
            {
                title: "Weather Forecasting",
                description: "Accurate weather predictions for optimal farming decisions",
                url: "#features"
            }
        ];

        const filteredResults = mockResults.filter(result => 
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(filteredResults);
    }

    displaySearchResults(results) {
        const searchContainer = document.querySelector('.search-container');
        let resultsContainer = searchContainer.querySelector('.search-results');
        
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            searchContainer.appendChild(resultsContainer);
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            resultsContainer.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="window.location.href='${result.url}'">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-description">${result.description}</div>
                </div>
            `).join('');
        }

        this.showSearchResults();
    }

    showSearchResults() {
        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.classList.add('active');
        }
    }

    hideSearchResults() {
        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.classList.remove('active');
        }
    }

    setupAuthModal() {
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        const authForms = document.querySelectorAll('.auth-form');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tab = button.dataset.tab;
                
                // Update active tab
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show corresponding form
                authForms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === `${tab}-form`) {
                        form.classList.add('active');
                    }
                });
            });
        });

        // Form submissions
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Show loading state
        this.showLoading('Logging in...');
        
        // Simulate API call
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Login successful!', 'success');
            this.closeAuthModal();
        }, 2000);
    }

    handleRegister() {
        const formData = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            password: document.getElementById('reg-password').value,
            farmType: document.getElementById('farm-type').value
        };
        
        // Show loading state
        this.showLoading('Creating account...');
        
        // Simulate API call
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Account created successfully!', 'success');
            this.closeAuthModal();
        }, 2000);
    }

    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip active';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translate(-50%, -100%)';
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    setupNotifications() {
        // Create notification container if it doesn't exist
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${this.getNotificationTitle(type)}</div>
                <button class="notification-close">&times;</button>
            </div>
            <div class="notification-message">${message}</div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => this.hideNotification(notification), 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }

    getNotificationTitle(type) {
        const titles = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Information'
        };
        return titles[type] || 'Notification';
    }

    showLoading(message = 'Loading...') {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }

    hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    openAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        this.closeAuthModal();
    }
}

// Global functions for HTML onclick handlers
function openAuthModal() {
    if (window.agriFlowApp) {
        window.agriFlowApp.openAuthModal();
    }
}

function closeAuthModal() {
    if (window.agriFlowApp) {
        window.agriFlowApp.closeAuthModal();
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbar = document.getElementById('navbar');
        const offset = navbar ? navbar.offsetHeight : 0;
        const rect = section.getBoundingClientRect();
        const targetY = window.pageYOffset + rect.top - offset;
        if (window.agriFlowApp && window.agriFlowApp.smoothScrollToY) {
            window.agriFlowApp.smoothScrollToY(targetY, 1500);
        } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.agriFlowApp = new AgriFlowApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page is visible
        document.body.classList.remove('page-hidden');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Trigger custom resize event
        window.dispatchEvent(new CustomEvent('app-resize'));
    }, 250);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgriFlowApp;
};






const translations = {
  en: {
    "nav.home": "Home",
    "nav.market": "Market",
    "nav.booking": "Booking",
    "nav.help": "Help",
    "nav.login": "Login",
    "hero.title1": "Smart Digital Platform",
    "hero.title2": "for Farm-to-Mill",
    "hero.title3": "Logistics",
    "hero.description":" A smart digital platform designed to bridge the gap between farms and mills.It streamlines logistics with real-time connectivity and intelligent insights. Ensuring efficiency, transparency, and farmer-centric supply chain management",
    "hero.cta.explore": "Explore Platform",
    "hero.cta.getStarted": "Get Started",
    "cards.card1.text": "Live Analytics",
    "cards.card2.text": "Smart Routes",
    "cards.card3.text": "Soil Insights",
    "features.title": "Platform Features",
    "features.subtitle": "Empowering farmers with cutting-edge technology",
    "features.card1.title": "Crop Monitoring",
    "features.card1.desc": "Real-time tracking of crop health, growth stages, and yield predictions using satellite imagery and IoT sensors.",
    "features.card1.stat": "Accuracy",
    "features.card2.title": "Smart Logistics",
    "features.card2.desc": "Optimized supply chain management from farm to mill with AI-powered route planning and inventory tracking.",
    "features.card2.stat": "Cost Reduction",
    "features.card3.title": "Soil Analysis",
    "features.card3.desc": "Comprehensive soil health assessment with personalized fertilizer recommendations and sustainability insights.",
    "features.card3.stat": "Monitoring",
    "features.card4.title": "Mobile App",
    "features.card4.desc": "Access all features on-the-go with our intuitive mobile application designed for farmers in the field.",
    "features.card4.stat": "Active Users",
    "global.title": "Global Agriculture Network",
    "global.subtitle": "Connecting farms worldwide for sustainable agriculture",
    "global.card1.title": "Active Farms",
    "global.card1.change": "+12% this month",
    "global.card2.title": "Connected Mills",
    "global.card2.change": "+8% this month",
    "global.card3.title": "Total Yield",
    "global.card3.change": "+15% this season",
    "cta.title": "Ready to Transform Your Agriculture?",
    "cta.subtitle": "Join thousands of farmers already using AgriFlow to optimize their operations and increase yields.",
    "cta.primary": "Start Free Trial",
    "cta.secondary": "Learn More",
    "footer.tagline": "Revolutionizing agriculture through technology, sustainability, and innovation.",
    "footer.platform.title": "Platform",
    "footer.platform.link1": "Farm-to-Mill Logistics",
    "footer.platform.link2": "Soil Advisory",
    "footer.platform.link3": "Features",
    "footer.platform.link4": "Pricing",
    "footer.company.title": "Company",
    "footer.company.link1": "About Us",
    "footer.company.link2": "Careers",
    "footer.company.link3": "Contact",
    "footer.company.link4": "Blog",
    "footer.support.title": "Support",
    "footer.support.link1": "Help Center",
    "footer.support.link2": "Documentation",
    "footer.support.link3": "API",
    "footer.support.link4": "Status",
    "footer.copyright": "© 2024 AgriFlow. All rights reserved.",
    "footer.legal.privacy": "Privacy Policy",
    "footer.legal.terms": "Terms of Service",
    "footer.legal.cookies": "Cookie Policy",
    'features.title': 'Platform Features',
    'features.subtitle': 'Empowering farmers with cutting-edge technology',
    'features.card1.title': 'Market Analysis',
    'features.card1.desc': 'Gain real-time insights into market trends, price fluctuations, and competitive landscapes, enabling data-driven decisions and strategic planning for maximum profitability.',
    'features.card1.stat': 'Profit Margin Increase',
    // Add more keys as needed
  },
  hi: {
    "nav.home": "होम",
    "nav.market": "बाजार",
    "nav.booking": "बुकिंग",
    "nav.help": "सहायता",
    "nav.login": "लॉगिन",
    "hero.title1": "स्मार्ट डिजिटल प्लेटफ़ॉर्म",
    "hero.title2": "फार्म-टू-मिल के लिए",
    "hero.title3": "लॉजिस्टिक्स",
    "hero.description": "कृषि में क्रांति लाएं एआई-आधारित लॉजिस्टिक्स और सटीक मिट्टी विश्लेषण के साथ।",
    "hero.cta.explore": "प्लेटफ़ॉर्म देखें",
    "hero.cta.getStarted": "शुरू करें",
    "cards.card1.text": "लाइव एनालिटिक्स",
    "cards.card2.text": "स्मार्ट मार्ग",
    "cards.card3.text": "मिट्टी अंतर्दृष्टि",
    "features.title": "प्लेटफ़ॉर्म फीचर्स",
    "features.subtitle": "किसानों को अत्याधुनिक तकनीक से सशक्त बनाना",
    "features.card1.title": "फसल निगरानी",
    "features.card1.desc": "सैटेलाइट इमेजरी और IoT सेंसर का उपयोग करके फसल स्वास्थ्य, वृद्धि चरण और उपज की भविष्यवाणी की रीयल-टाइम ट्रैकिंग।",
    "features.card1.stat": "शुद्धता",
    "features.card2.title": "स्मार्ट लॉजिस्टिक्स",
    "features.card2.desc": "फार्म से मिल तक एआई-पावर्ड मार्ग योजना और इन्वेंटरी ट्रैकिंग के साथ आपूर्ति श्रृंखला प्रबंधन।",
    "features.card2.stat": "लागत में कमी",
    "features.card3.title": "मिट्टी विश्लेषण",
    "features.card3.desc": "व्यक्तिगत उर्वरक सिफारिशों और स्थिरता अंतर्दृष्टि के साथ व्यापक मिट्टी स्वास्थ्य मूल्यांकन।",
    "features.card3.stat": "निरंतर निगरानी",
    "features.card4.title": "मोबाइल ऐप",
    "features.card4.desc": "फील्ड में किसानों के लिए डिज़ाइन किए गए हमारे सहज मोबाइल एप्लिकेशन के साथ सभी फीचर्स का उपयोग करें।",
    "features.card4.stat": "सक्रिय उपयोगकर्ता",
    "global.title": "वैश्विक कृषि नेटवर्क",
    "global.subtitle": "स्थायी कृषि के लिए विश्वभर के फार्मों को जोड़ना",
    "global.card1.title": "सक्रिय फार्म",
    "global.card1.change": "+12% इस माह",
    "global.card2.title": "कनेक्टेड मिल्स",
    "global.card2.change": "+8% इस माह",
    "global.card3.title": "कुल उपज",
    "global.card3.change": "+15% इस सीजन",
    "cta.title": "क्या आप अपनी कृषि बदलने के लिए तैयार हैं?",
    "cta.subtitle": "हजारों किसान पहले से ही AgriFlow का उपयोग कर रहे हैं।",
    "cta.primary": "फ्री ट्रायल शुरू करें",
    "cta.secondary": "और जानें",
    "footer.tagline": "प्रौद्योगिकी, स्थिरता और नवाचार के माध्यम से कृषि में क्रांति।",
    "footer.platform.title": "प्लेटफ़ॉर्म",
    "footer.platform.link1": "फार्म-टू-मिल लॉजिस्टिक्स",
    "footer.platform.link2": "मिट्टी सलाह",
    "footer.platform.link3": "फीचर्स",
    "footer.platform.link4": "मूल्य निर्धारण",
    "footer.company.title": "कंपनी",
    "footer.company.link1": "हमारे बारे में",
    "footer.company.link2": "करियर",
    "footer.company.link3": "संपर्क करें",
    "footer.company.link4": "ब्लॉग",
    "footer.support.title": "सहायता",
    "footer.support.link1": "हेल्प सेंटर",
    "footer.support.link2": "डॉक्यूमेंटेशन",
    "footer.support.link3": "एपीआई",
    "footer.support.link4": "स्थिति",
    "footer.copyright": "© 2024 AgriFlow. सर्वाधिकार सुरक्षित।",
    "footer.legal.privacy": "गोपनीयता नीति",
    "footer.legal.terms": "सेवा की शर्तें",
    "footer.legal.cookies": "कुकी नीति",
    'feature.card': 'प्लेटफ़ॉर्म फीचर्स',
    'feature.icon': 'उन्नत तकनीक से किसानों को सशक्त बनाना',
    'feature.title': 'बाज़ार विश्लेषण',
    'features.desc': 'बाजार के रुझान, कीमतों में उतार-चढ़ाव और प्रतिस्पर्धी परिदृश्य में वास्तविक समय की जानकारी प्राप्त करें, जिससे अधिकतम लाभप्रदता के लिए डेटा-संचालित निर्णय और रणनीतिक योजना सक्षम हो सके।',
    'features.card1.stat': 'लाभ मार्जिन में वृद्धि'
    // Add more keys as needed
  },
  te: {
    "nav.home": "హోమ్",
    "nav.market": "మార్కెట్",
    "nav.booking": "బుకింగ్",
    "nav.help": "సహాయం",
    "nav.login": "లాగిన్",
    "hero.title1": "స్మార్ట్ డిజిటల్ ప్లాట్‌ఫామ్",
    "hero.title2": "ఫార్మ్-టు-మిల్ కోసం",
    "hero.title3": "లాజిస్టిక్స్",
    "hero.description": "వ్యవసాయ క్షేత్రాలు మరియు మిల్లుల మధ్య ఉన్న అంతరాన్ని తగ్గించడానికి రూపొందించిన స్మార్ట్ డిజిటల్ ప్లాట్‌ఫారమ్. ఇది రియల్-టైమ్ కనెక్టివిటీ మరియు మేధావంతమైన విశ్లేషణలతో లోజిస్టిక్స్‌ను సులభతరం చేస్తుంది. సామర్థ్యం, పారదర్శకత మరియు రైతు కేంద్రిత సరఫరా గొలుసు నిర్వహణను నిర్ధారిస్తుంది.",
    "hero.cta.explore": "ప్లాట్‌ఫామ్ అన్వేషించండి",
    "hero.cta.getStarted": "ప్రారంభించండి",
    "cards.card1.text": "లైవ్ అనలిటిక్స్",
    "cards.card2.text": "స్మార్ట్ మార్గాలు",
    "cards.card3.text": "మట్టి విశ్లేషణ",
    "features.title": "ప్లాట్‌ఫామ్ ఫీచర్లు",
    "features.subtitle": "అత్యాధునిక సాంకేతికతతో రైతులను శక్తివంతం చేయడం",
    "features.card1.title": "పంట మానిటరింగ్",
    "features.card1.desc": "ఉపగ్రహ చిత్రాలు మరియు IoT సెన్సార్లతో పంట ఆరోగ్యం, వృద్ధి దశలు, దిగుబడి అంచనాల రియల్-టైమ్ ట్రాకింగ్.",
    "features.card1.stat": "ఖచ్చితత్వం",
    "features.card2.title": "స్మార్ట్ లాజిస్టిక్స్",
    "features.card2.desc": "AI ఆధారిత మార్గ ప్రణాళిక మరియు నిల్వ ట్రాకింగ్‌తో ఫార్మ్ నుండి మిల్ వరకు సరఫరా గొలుసు నిర్వహణ.",
    "features.card2.stat": "ఖర్చు తగ్గింపు",
    "features.card3.title": "మట్టి విశ్లేషణ",
    "features.card3.desc": "వ్యక్తిగత ఎరువుల సిఫార్సులు మరియు స్థిరత్వం విశ్లేషణతో సమగ్ర మట్టి ఆరోగ్య అంచనా.",
    "features.card3.stat": "నిరంతర మానిటరింగ్",
    "features.card4.title": "మొబైల్ యాప్",
    "features.card4.desc": "రైతుల కోసం రూపొందించిన మా మొబైల్ యాప్‌తో అన్ని ఫీచర్లను ఎక్కడైనా పొందండి.",
    "features.card4.stat": "యాక్టివ్ యూజర్లు",
    "global.title": "ప్రపంచ వ్యవసాయ నెట్‌వర్క్",
    "global.subtitle": "స్థిరమైన వ్యవసాయానికి ప్రపంచవ్యాప్తంగా ఫార్మ్‌లను కలపడం",
    "global.card1.title": "యాక్టివ్ ఫార్మ్స్",
    "global.card1.change": "+12% ఈ నెల",
    "global.card2.title": "కనెక్టెడ్ మిల్స్",
    "global.card2.change": "+8% ఈ నెల",
    "global.card3.title": "మొత్తం దిగుబడి",
    "global.card3.change": "+15% ఈ సీజన్",
    "cta.title": "మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధంగా ఉన్నారా?",
    "cta.subtitle": "వెయ్యి మంది రైతులు ఇప్పటికే AgriFlow ఉపయోగిస్తున్నారు.",
    "cta.primary": "ఉచిత ట్రయల్ ప్రారంభించండి",
    "cta.secondary": "ఇంకా తెలుసుకోండి",
    "footer.tagline": "సాంకేతికత, స్థిరత్వం మరియు నవీనత ద్వారా వ్యవసాయాన్ని విప్లవాత్మకంగా మార్చడం.",
    "footer.platform.title": "ప్లాట్‌ఫామ్",
    "footer.platform.link1": "ఫార్మ్-టు-మిల్ లాజిస్టిక్స్",
    "footer.platform.link2": "మట్టి సలహా",
    "footer.platform.link3": "ఫీచర్లు",
    "footer.platform.link4": "ధరలు",
    "footer.company.title": "కంపెనీ",
    "footer.company.link1": "మా గురించి",
    "footer.company.link2": "కెరీర్స్",
    "footer.company.link3": "సంప్రదించండి",
    "footer.company.link4": "బ్లాగ్",
    "footer.support.title": "సహాయం",
    "footer.support.link1": "హెల్ప్ సెంటర్",
    "footer.support.link2": "డాక్యుమెంటేషన్",
    "footer.support.link3": "API",
    "footer.support.link4": "స్థితి",
    "footer.copyright": "© 2025 Soil Sathi. అన్ని హక్కులు పరిరక్షించబడ్డాయి.",
    "footer.legal.privacy": "గోప్యతా విధానం",
    "footer.legal.terms": "సేవా నిబంధనలు",
    "footer.legal.cookies": "కుకీ విధానం",
    'feature.card': 'ప్లాట్‌ఫార్మ్ లక్షణాలు',
    'feature.icon': 'అత్యాధునిక సాంకేతికతతో రైతులను శక్తివంతం చేయడం',
    'feature.title': 'మార్కెట్ విశ్లేషణ',
    'features.desc': 'మార్కెట్ పోకడలు, ధరల హెచ్చుతగ్గులు మరియు పోటీ వాతావరణం గురించి నిజ-సమయ అంతర్దృష్టులను పొందండి, గరిష్ట లాభదాయకత కోసం డేటా-ఆధారిత నిర్ణయాలు మరియు వ్యూహాత్మక ప్రణాళికను అనుమతిస్తుంది.',
    'features.card1.stat': 'లాభాల పెరుగుదల'
    // Add more keys as needed
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const langDropdown = document.getElementById('lang-dropdown');
  if (langDropdown) {
    langDropdown.addEventListener('change', function() {
      setLanguage(this.value);
    });
    setLanguage(langDropdown.value); // Set default language
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const langDropdown = document.getElementById('lang-dropdown');
  if (langDropdown) {
    langDropdown.value = 'en'; // Set dropdown to English by default
    langDropdown.addEventListener('change', function() {
      setLanguage(this.value);
    });
    setLanguage('en'); // Set default language to English on load
  }
});


document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.slideshow-image');
    let currentImageIndex = 0;

    function changeImage() {
        // Remove 'active' class from the current image
        images[currentImageIndex].classList.remove('active');

        // Increment index, looping back to 0 if it exceeds the number of images
        currentImageIndex = (currentImageIndex + 1) % images.length;

        // Add 'active' class to the new current image
        images[currentImageIndex].classList.add('active');
    }

    // Set the interval to change the image every 3 seconds (3000 milliseconds)
    setInterval(changeImage, 3000);
});








// Add this code to your main.js file
// It's a good practice to put this at the beginning of the file.

// const loginBtn = document.querySelector('.btn-primary[data-i18n="nav.login"]');
// const logoutBtn = document.createElement('button');
// logoutBtn.className = 'btn-primary';
// logoutBtn.textContent = 'Logout';
// logoutBtn.style.display = 'none';

// function updateUIForAdmin() {
//     const navActions = document.querySelector('.nav-actions');
//     const loginBtnElement = navActions.querySelector('.btn-primary[data-i18n="nav.login"]');
//     if (loginBtnElement) {
//         loginBtnElement.style.display = 'none';
//     }
//     navActions.prepend(logoutBtn);
//     logoutBtn.style.display = 'block';

//     const bookingLink = document.querySelector('a[href="Booking.html"]');
//     if (bookingLink) {
//         bookingLink.removeAttribute('href');
//         bookingLink.addEventListener('click', loadAdminBookingPage);
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     if (localStorage.getItem('isAdminLoggedIn') === 'true') {
//         updateUIForAdmin();
//     }
// });

// logoutBtn.addEventListener('click', () => {
//     localStorage.removeItem('isAdminLoggedIn');
//     window.location.reload();
// });

  
// const ADMIN_EMAIL = 'Sagros5504@gmail.com';
// const ADMIN_PASSWORD = 'Sagros';

// const loginForm = document.getElementById('login-form');
// if (loginForm) {
//     loginForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const email = document.getElementById('login-email').value;
//         const password = document.getElementById('login-password').value;
//         const userType = document.getElementById('login-user-type').value;

//         if (userType === 'admin' && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//             localStorage.setItem('isAdminLoggedIn', 'true');
//             alert('Admin login successful!');
//             closeAuthModal();
//             updateUIForAdmin();
//         } else {
//             alert('Invalid credentials or user type.');
//         }
//     });
// }


// Get elements by their IDs
// const adminBookingPage = document.getElementById('admin-toggle');
// const userBookingPage = document.getElementById('user-toggle');
// const loginBtn = document.querySelector("login-button");

// // Add event listeners for the toggle buttons
// adminBookingPage.onclick = function() {
  
//     if(loginBtn.onclick)
//     {
//         booking.setAttribute('href', 'BookingAdmin.html');
//     }
// }

// userBookingPage.addEventListener('click', () => {
//     // Show user booking page and hide admin booking page
//     userBookingPage.classList.add('active');
//     adminBookingPage.classList.remove('active');
//     showUserBookingPage();
// });