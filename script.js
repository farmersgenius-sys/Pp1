// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide navigation functionality
    let navTimeout;
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    
    // Only set up navigation if elements exist
    if (navbar && navToggle) {
        // Auto-hide navigation after 3 seconds of inactivity
        function startNavTimeout() {
            clearTimeout(navTimeout);
            navTimeout = setTimeout(() => {
                if (navbar.classList.contains('active')) {
                    hideNavigation();
                }
            }, 3000);
        }
        
        // Show navigation when hovering over toggle area
        navToggle.addEventListener('mouseenter', function() {
            if (!navbar.classList.contains('active')) {
                showNavigation();
            }
        });
        
        // Keep navigation open when hovering over it
        navbar.addEventListener('mouseenter', function() {
            clearTimeout(navTimeout);
        });
        
        // Start timeout when leaving navigation
        navbar.addEventListener('mouseleave', function() {
            startNavTimeout();
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', function() {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        // Hide navigation after clicking a link
        setTimeout(hideNavigation, 500);
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip if href is just "#" or empty
            if (href === '#' || href === '#!') {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced scroll effects
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Show/hide navigation toggle based on scroll (only if navToggle exists)
        if (navToggle) {
            if (scrolled > 100) {
                navToggle.style.opacity = '0.8';
            } else {
                navToggle.style.opacity = '1';
            }
        }
    });
    
    // Counter animation for statistics
    const counters = document.querySelectorAll('.stat-number');
    const counterObserverOptions = {
        threshold: 0.7
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const count = +counter.innerText;
                const increment = target / 100;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => {
                        counterObserver.observe(counter);
                    }, 20);
                } else {
                    counter.innerText = target;
                    if (target === 99) {
                        counter.innerText = target + '%';
                    } else if (target === 10000) {
                        counter.innerText = target + '+';
                    }
                }
            }
        });
    }, counterObserverOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.tool-card, .scheme-card, .timeline-item, .feature-card, .about-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
    
    // Add loading message
    console.log('Farmer Genius website loaded successfully! 🌱');
    console.log('All interactive features are ready to use.');
    
    // Performance logging
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Website loaded in ${loadTime.toFixed(2)}ms`);
    });
});

// Seed Quality Checker Function
function checkSeedQuality() {
    const seed = document.getElementById('seed-select').value;
    const resultDiv = document.getElementById('seed-quality-result');

    if (!seed) {
        showResult(resultDiv, 'Please select a seed type.', 'error');
        return;
    }

    const seedQualityData = {
        wheat: {
            tests: [
                {
                    name: "Float Test",
                    description: "Take a glass of water, put wheat seeds inside. Good seeds sink, bad seeds float."
                },
                {
                    name: "Germination Test", 
                    description: "Place 100 seeds in moist cloth. After 7 days, count germinated seeds. If more than 80 grow, quality is good."
                },
                {
                    name: "Color & Size",
                    description: "Healthy wheat seeds are uniform in size and golden-brown in color. Avoid shriveled or discolored seeds."
                }
            ]
        },
        rice: {
            tests: [
                {
                    name: "Salt Water Test",
                    description: "Mix 2 spoons of salt in water. Drop rice seeds. Good seeds sink to bottom."
                },
                {
                    name: "Purity Check",
                    description: "Remove broken or shriveled seeds; only full grains should be kept for planting."
                },
                {
                    name: "Moisture Test",
                    description: "Good rice seeds should have 12-14% moisture. Bite test - good seeds make cracking sound."
                }
            ]
        },
        corn: {
            tests: [
                {
                    name: "Physical Inspection",
                    description: "Select plump, well-filled kernels. Avoid cracked, moldy, or insect-damaged seeds."
                },
                {
                    name: "Germination Test",
                    description: "Place 100 seeds between wet paper towels. After 7 days, 85+ should germinate for good quality."
                },
                {
                    name: "Vigor Test",
                    description: "Good corn/maize seeds are bright yellow/orange, uniform in size, and have hard texture."
                }
            ]
        },
        cotton: {
            tests: [
                {
                    name: "Acid Delinting Check",
                    description: "Quality cotton seeds are properly delinted with smooth surface, no fuzzy material."
                },
                {
                    name: "Size Uniformity",
                    description: "Select seeds of uniform size. Discard very small or very large seeds."
                },
                {
                    name: "Viability Test",
                    description: "Cut test - good cotton seeds have white, firm cotyledons inside."
                }
            ]
        },
        mustard: {
            tests: [
                {
                    name: "Color Test",
                    description: "Good mustard seeds are dark brown to black, shiny, and uniform in color."
                },
                {
                    name: "Oil Content Check",
                    description: "Press seeds between fingers - good seeds release oil and have strong aroma."
                },
                {
                    name: "Purity Test",
                    description: "Remove broken seeds, stones, and other crop seeds. 98% purity is ideal."
                }
            ]
        },
        soybean: {
            tests: [
                {
                    name: "Visual Inspection",
                    description: "Good soybean seeds are cream to light yellow, plump, and free from cracks."
                },
                {
                    name: "Split Test", 
                    description: "Split seeds to check - good seeds have white to cream colored cotyledons."
                },
                {
                    name: "Water Absorption",
                    description: "Soak 100 seeds in water for 4 hours. Good seeds absorb water and swell uniformly."
                }
            ]
        },
        groundnut: {
            tests: [
                {
                    name: "Shell Removal",
                    description: "Remove shells carefully. Good groundnut seeds are pink to red with thin seed coat."
                },
                {
                    name: "Float Test",
                    description: "In water, good groundnut seeds sink. Floating seeds are likely damaged or immature."
                },
                {
                    name: "Crush Test",
                    description: "Good seeds are firm and don't crush easily. Avoid soft or spongy seeds."
                }
            ]
        },
        sugarcane: {
            tests: [
                {
                    name: "Bud Viability",
                    description: "Check 3-bud setts. Buds should be plump, fresh, and not dried or damaged."
                },
                {
                    name: "Node Quality",
                    description: "Select setts from middle portion of cane, 8-10 months old with healthy nodes."
                },
                {
                    name: "Disease Check",
                    description: "Avoid setts with red rot, smut, or other disease symptoms. Use disease-free mother plants."
                }
            ]
        },
        pulses: {
            tests: [
                {
                    name: "Seed Coat Check",
                    description: "Good pulse seeds have intact, smooth seed coat without cracks or holes."
                },
                {
                    name: "Weevil Test",
                    description: "Check for insect holes. Avoid seeds with small round holes indicating weevil damage."
                },
                {
                    name: "Age Test",
                    description: "Fresh pulse seeds are bright colored. Old seeds become dull and have poor germination."
                }
            ]
        },
        vegetables: {
            tests: [
                {
                    name: "Size Grading",
                    description: "Select uniform sized seeds. Very small or very large seeds often have poor germination."
                },
                {
                    name: "Moisture Check",
                    description: "Good vegetable seeds should be dry (8-12% moisture) and make rattling sound in packet."
                },
                {
                    name: "Germination Test",
                    description: "Test germination on wet paper. 80%+ germination indicates good quality seeds."
                }
            ]
        }
    };

    const seedInfo = seedQualityData[seed];
    const testsHTML = seedInfo.tests.map(test => `
        <div style="margin-bottom: 15px; padding: 10px; background: #f0f8f0; border-left: 4px solid var(--primary-green); border-radius: 5px;">
            <h5 style="color: var(--primary-green); margin-bottom: 5px;">${test.name}</h5>
            <p style="margin: 0; font-size: 0.9rem;">${test.description}</p>
        </div>
    `).join('');

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 15px;">Quality Tests for ${seed.charAt(0).toUpperCase() + seed.slice(1)} Seeds:</h4>
            ${testsHTML}
            <div style="margin-top: 15px; padding: 10px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem;">
                <strong>💡 Tip:</strong> Always buy certified seeds from authorized dealers for best results.
            </div>
            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 0.8rem; color: #666;">
                <strong>⚠️ Disclaimer:</strong> Quality tests are general guidelines. Seed standards may vary by region. For certified quality assurance, consult local seed certification agencies.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Crop Disease Identifier Function
function searchDisease() {
    const crop = document.getElementById('disease-crop-select').value;
    const searchTerm = document.getElementById('disease-search').value.toLowerCase();
    const resultDiv = document.getElementById('disease-result');

    if (!searchTerm) {
        showResult(resultDiv, 'Please enter disease name or symptoms to search.', 'error');
        return;
    }

    const diseaseDatabase = [
        // Rice Diseases
        { crop: 'rice', disease: 'Blast', symptoms: 'Small brown spots on leaves, spreading quickly', identification: 'Spots enlarge into diamond-shaped lesions. Crop looks burned.', solution: 'Use resistant seed varieties; spray tricyclazole fungicide.' },
        { crop: 'rice', disease: 'Brown Spot', symptoms: 'Small brown spots with yellow halo on leaves', identification: 'Spots are circular, brown center with yellow margin', solution: 'Improve field drainage, spray mancozeb fungicide.' },
        { crop: 'rice', disease: 'Bacterial Blight', symptoms: 'Water-soaked lesions on leaf tips', identification: 'Lesions turn yellow then brown, spread along leaf margins', solution: 'Use copper-based bactericides, plant resistant varieties.' },
        { crop: 'rice', disease: 'Sheath Blight', symptoms: 'Oval lesions on leaf sheath near water level', identification: 'Gray-green lesions with brown borders', solution: 'Reduce plant density, apply validamycin fungicide.' },
        { crop: 'rice', disease: 'False Smut', symptoms: 'Orange powder masses replace individual rice grains', identification: 'Individual grains become large orange balls', solution: 'Use copper oxychloride, avoid over-fertilization.' },

        // Wheat Diseases  
        { crop: 'wheat', disease: 'Rust', symptoms: 'Yellow-orange powder on leaves', identification: 'Powder rubs off easily on hand, appears as pustules', solution: 'Remove infected leaves, use fungicide (propiconazole).' },
        { crop: 'wheat', disease: 'Loose Smut', symptoms: 'Black powdery masses replace wheat grains', identification: 'Entire head becomes black powder at maturity', solution: 'Use systemic fungicide seed treatment.' },
        { crop: 'wheat', disease: 'Karnal Bunt', symptoms: 'Fishy smell from grains, partial black powder in grains', identification: 'Only part of grain affected, strong fishy odor', solution: 'Use seed treatment with tebuconazole.' },
        { crop: 'wheat', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves', identification: 'White flour-like coating, mainly on upper leaf surface', solution: 'Spray sulfur-based fungicide, improve air circulation.' },
        { crop: 'wheat', disease: 'Septoria Blight', symptoms: 'Small brown spots with dark centers on leaves', identification: 'Spots have dark pycnidia (small black dots) in center', solution: 'Use fungicides like chlorothalonil, practice crop rotation.' },

        // Corn/Maize Diseases
        { crop: 'corn', disease: 'Corn Borer', symptoms: 'Holes in stalks and ears, sawdust-like frass', identification: 'Small holes with larvae inside stalks', solution: 'Use Bt corn, apply chemical insecticides during early stages.' },
        { crop: 'corn', disease: 'Leaf Blight', symptoms: 'Long grayish lesions on leaves', identification: 'Boat-shaped lesions, gray center with dark borders', solution: 'Plant resistant varieties, spray mancozeb fungicide.' },
        { crop: 'corn', disease: 'Downy Mildew', symptoms: 'Yellow stripes on leaves, white growth on undersides', identification: 'Parallel yellow stripes, white fuzzy growth underneath', solution: 'Use metalaxyl seed treatment, improve drainage.' },
        { crop: 'corn', disease: 'Common Smut', symptoms: 'Large grayish galls on ears, tassels, or stalks', identification: 'Tumor-like growths that burst open releasing black spores', solution: 'Remove and destroy affected plants, avoid high nitrogen.' },
        { crop: 'corn', disease: 'Armyworm', symptoms: 'Holes in leaves, complete defoliation in severe cases', identification: 'Green caterpillars with stripes, feeding in groups', solution: 'Use pheromone traps, spray insecticides like chlorpyrifos.' },

        // Cotton Diseases
        { crop: 'cotton', disease: 'Bollworm', symptoms: 'Holes in cotton bolls, larvae inside', identification: 'Small green/brown larvae inside bolls, circular holes', solution: 'Use pheromone traps, spray bio-pesticide (Bt).' },
        { crop: 'cotton', disease: 'Wilt', symptoms: 'Yellowing and wilting of plants, vascular browning', identification: 'Plants wilt despite adequate moisture, brown vascular tissue', solution: 'Plant wilt-resistant varieties, improve soil drainage.' },
        { crop: 'cotton', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew, stunted growth', identification: 'Small green insects on undersides of leaves', solution: 'Use insecticidal soap, encourage beneficial insects.' },
        { crop: 'cotton', disease: 'Thrips', symptoms: 'Silver patches on leaves, stunted plant growth', identification: 'Tiny insects causing silvering of leaf surface', solution: 'Use blue sticky traps, spray neem oil or imidacloprid.' },
        { crop: 'cotton', disease: 'Red Spider Mite', symptoms: 'Yellow speckling on leaves, fine webbing', identification: 'Tiny red mites on undersides, fine silk webbing', solution: 'Increase humidity, use miticides like abamectin.' },

        // Sugarcane Diseases
        { crop: 'sugarcane', disease: 'Red Rot', symptoms: 'Red discoloration inside stalks, sour smell', identification: 'Internal reddening with cross-bands, alcoholic odor', solution: 'Plant resistant varieties, use healthy seed material.' },
        { crop: 'sugarcane', disease: 'Smut', symptoms: 'Black whip-like structures from growing points', identification: 'Long black whips emerging from shoots', solution: 'Remove affected tillers, plant disease-free setts.' },
        { crop: 'sugarcane', disease: 'Yellow Leaf', symptoms: 'Yellowing of midrib, premature leaf death', identification: 'Bright yellow midrib, spreading to entire leaf', solution: 'Use virus-free planting material, control aphid vectors.' },
        { crop: 'sugarcane', disease: 'Mosaic', symptoms: 'Light and dark green patches on leaves', identification: 'Mosaic pattern of light and dark green areas', solution: 'Plant resistant varieties, control aphid vectors.' },
        { crop: 'sugarcane', disease: 'Scale Insect', symptoms: 'White waxy scales on stalks, yellowing', identification: 'White cotton-like scales attached to stalks', solution: 'Spray malathion or use systemic insecticides.' },

        // Vegetable Diseases
        { crop: 'vegetables', disease: 'Damping Off', symptoms: 'Seedling collapse at soil level', identification: 'Young seedlings fall over, stem rotted at base', solution: 'Use fungicide-treated seeds, improve drainage.' },
        { crop: 'vegetables', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves', identification: 'White flour-like covering on leaf surfaces', solution: 'Spray sulfur or potassium bicarbonate, improve air circulation.' },
        { crop: 'vegetables', disease: 'Anthracnose', symptoms: 'Dark sunken spots on fruits', identification: 'Circular dark lesions with pink spore masses', solution: 'Use copper fungicides, practice crop rotation.' },
        { crop: 'vegetables', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew, virus transmission', identification: 'Small soft-bodied insects in colonies', solution: 'Use insecticidal soap, encourage ladybirds.' },
        { crop: 'vegetables', disease: 'Whitefly', symptoms: 'Yellow leaves, sticky honeydew, virus spread', identification: 'Tiny white flying insects on leaf undersides', solution: 'Use yellow sticky traps, spray neem oil.' },

        // Fruit Diseases
        { crop: 'fruits', disease: 'Fruit Fly', symptoms: 'Maggots in fruits, premature fruit drop', identification: 'Small holes in fruits with larvae inside', solution: 'Use pheromone traps, spray malathion before fruit set.' },
        { crop: 'fruits', disease: 'Anthracnose', symptoms: 'Dark spots on fruits, premature ripening', identification: 'Circular dark lesions expanding on fruits', solution: 'Spray copper fungicides, harvest at proper maturity.' },
        { crop: 'fruits', disease: 'Scale Insects', symptoms: 'Waxy bumps on branches, yellowing leaves', identification: 'Hard or soft scales attached to stems and leaves', solution: 'Spray horticultural oil, use systemic insecticides.' },
        { crop: 'fruits', disease: 'Mealybugs', symptoms: 'White cotton-like clusters, honeydew', identification: 'White waxy insects in clusters on stems/fruits', solution: 'Use alcohol swabs, spray insecticidal soap.' },
        { crop: 'fruits', disease: 'Canker', symptoms: 'Raised corky lesions on fruits and leaves', identification: 'Circular raised spots with water-soaked margins', solution: 'Use copper bactericides, prune affected parts.' }
    ];

    // Filter diseases based on crop and search term
    let filteredDiseases = diseaseDatabase;
    
    if (crop) {
        filteredDiseases = filteredDiseases.filter(d => d.crop === crop);
    }
    
    filteredDiseases = filteredDiseases.filter(d => 
        d.disease.toLowerCase().includes(searchTerm) || 
        d.symptoms.toLowerCase().includes(searchTerm) ||
        d.identification.toLowerCase().includes(searchTerm)
    );

    if (filteredDiseases.length === 0) {
        showResult(resultDiv, 'No diseases found matching your search. Try different keywords like "spots", "holes", "yellow", "wilt", etc.', 'error');
        return;
    }

    const diseasesHTML = filteredDiseases.map(d => `
        <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid var(--primary-green); border-radius: 8px;">
            <h5 style="color: var(--primary-green); margin-bottom: 10px;">🌾 ${d.crop.toUpperCase()}: ${d.disease}</h5>
            <div style="margin-bottom: 8px;">
                <strong>🔍 Symptoms:</strong> ${d.symptoms}
            </div>
            <div style="margin-bottom: 8px;">
                <strong>👁️ How to Identify:</strong> ${d.identification}
            </div>
            <div style="background: #e8f5e8; padding: 8px; border-radius: 4px;">
                <strong>💊 Solution:</strong> ${d.solution}
            </div>
        </div>
    `).join('');

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 15px;">Found ${filteredDiseases.length} Disease(s):</h4>
            ${diseasesHTML}
            <div style="margin-top: 15px; padding: 10px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem;">
                <strong>⚠️ Important:</strong> For severe infestations, consult your local agricultural extension officer for specific treatment recommendations.
            </div>
            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 0.8rem; color: #666;">
                <strong>⚠️ Disclaimer:</strong> Disease information is general guidance. Regional variations in disease patterns and treatment effectiveness may occur. Always confirm diagnosis with local experts before treatment.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Expanded Fertilizer Calculator Function
function calculateFertilizer() {
    const crop = document.getElementById('crop-select').value;
    const area = parseFloat(document.getElementById('area-input').value);
    const resultDiv = document.getElementById('fertilizer-result');

    if (!crop || !area || area <= 0) {
        showResult(resultDiv, 'Please select a crop and enter a valid area.', 'error');
        return;
    }

    // Comprehensive fertilizer requirements per acre (in kg)
    const fertilizerData = {
        rice: { urea: 50, dap: 40, mop: 20, organic: 1000, timing: '3 splits: basal, tillering, panicle initiation' },
        wheat: { urea: 60, dap: 50, mop: 25, organic: 800, timing: '3 splits: sowing, crown root, flowering' },
        corn: { urea: 65, dap: 45, mop: 30, organic: 1200, timing: '3 splits: sowing, knee-high, tasseling' },
        cotton: { urea: 40, dap: 35, mop: 25, organic: 1500, timing: '4 splits: sowing, squaring, flowering, boll development' },
        sugarcane: { urea: 120, dap: 60, mop: 40, organic: 2000, timing: '3 splits: planting, 45 days, 90 days' },
        soybean: { urea: 15, dap: 40, mop: 30, organic: 1000, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        mustard: { urea: 35, dap: 25, mop: 15, organic: 800, timing: '2 splits: sowing, branching stage' },
        groundnut: { urea: 10, dap: 50, mop: 40, organic: 1200, timing: '2 splits: sowing, pegging (low nitrogen due to fixation)' },
        tomato: { urea: 55, dap: 60, mop: 50, organic: 1500, timing: '4 splits: transplanting, flowering, fruit set, fruit development' },
        potato: { urea: 45, dap: 55, mop: 60, organic: 1200, timing: '3 splits: planting, hilling, tuber formation' },
        onion: { urea: 40, dap: 35, mop: 30, organic: 1000, timing: '3 splits: transplanting, bulb initiation, bulb development' },
        garlic: { urea: 35, dap: 30, mop: 25, organic: 800, timing: '3 splits: planting, clove formation, bulb development' },
        chili: { urea: 45, dap: 40, mop: 35, organic: 1200, timing: '4 splits: transplanting, flowering, fruit set, harvest period' },
        cabbage: { urea: 50, dap: 45, mop: 40, organic: 1500, timing: '3 splits: transplanting, head initiation, head development' },
        cauliflower: { urea: 50, dap: 45, mop: 40, organic: 1500, timing: '3 splits: transplanting, curd initiation, curd development' },
        brinjal: { urea: 45, dap: 40, mop: 35, organic: 1200, timing: '4 splits: transplanting, flowering, fruit set, continuous harvest' },
        okra: { urea: 40, dap: 35, mop: 30, organic: 1000, timing: '3 splits: sowing, flowering, fruit development' },
        carrot: { urea: 30, dap: 25, mop: 20, organic: 1000, timing: '2 splits: sowing, root development' },
        radish: { urea: 25, dap: 20, mop: 15, organic: 800, timing: '2 splits: sowing, root swelling' },
        spinach: { urea: 35, dap: 20, mop: 15, organic: 800, timing: '2 splits: sowing, leaf development' },
        banana: { urea: 200, dap: 100, mop: 150, organic: 3000, timing: '12 monthly splits throughout the year' },
        mango: { urea: 100, dap: 80, mop: 120, organic: 2000, timing: '3 splits: pre-flowering, fruit set, fruit development' },
        orange: { urea: 80, dap: 60, mop: 100, organic: 1500, timing: '3 splits: pre-flowering, fruit set, fruit development' },
        apple: { urea: 120, dap: 80, mop: 100, organic: 2000, timing: '3 splits: bud break, fruit set, fruit development' },
        grapes: { urea: 60, dap: 40, mop: 80, organic: 1500, timing: '3 splits: bud break, fruit set, veraison' },
        papaya: { urea: 80, dap: 60, mop: 100, organic: 1500, timing: '6 splits every 2 months' },
        guava: { urea: 60, dap: 40, mop: 80, organic: 1200, timing: '3 splits: pre-flowering, fruit set, fruit development' },
        pomegranate: { urea: 50, dap: 40, mop: 60, organic: 1200, timing: '3 splits: pre-flowering, fruit set, fruit development' },
        chickpea: { urea: 10, dap: 40, mop: 30, organic: 1000, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        lentil: { urea: 8, dap: 35, mop: 25, organic: 800, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        pigeon_pea: { urea: 12, dap: 45, mop: 35, organic: 1200, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        black_gram: { urea: 8, dap: 30, mop: 20, organic: 800, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        green_gram: { urea: 8, dap: 30, mop: 20, organic: 800, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        field_pea: { urea: 10, dap: 35, mop: 25, organic: 800, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        sesame: { urea: 20, dap: 25, mop: 15, organic: 600, timing: '2 splits: sowing, flowering' },
        sunflower: { urea: 30, dap: 40, mop: 25, organic: 1000, timing: '2 splits: sowing, head formation' },
        safflower: { urea: 25, dap: 30, mop: 20, organic: 800, timing: '2 splits: sowing, branching' },
        castor: { urea: 35, dap: 40, mop: 25, organic: 1000, timing: '3 splits: sowing, flowering, spike development' },
        coconut: { urea: 500, dap: 320, mop: 1200, organic: 5000, timing: '2 splits per year: pre-monsoon, post-monsoon' },
        arecanut: { urea: 200, dap: 150, mop: 300, organic: 2000, timing: '2 splits per year: pre-monsoon, post-monsoon' },
        cardamom: { urea: 30, dap: 30, mop: 60, organic: 1500, timing: '3 splits: pre-monsoon, mid-monsoon, post-monsoon' },
        black_pepper: { urea: 50, dap: 50, mop: 100, organic: 2000, timing: '3 splits: pre-monsoon, mid-monsoon, post-monsoon' },
        turmeric: { urea: 60, dap: 40, mop: 80, organic: 1500, timing: '3 splits: planting, tillering, rhizome development' },
        ginger: { urea: 50, dap: 35, mop: 70, organic: 1500, timing: '3 splits: planting, tillering, rhizome development' },
        coriander: { urea: 20, dap: 25, mop: 15, organic: 600, timing: '2 splits: sowing, branching' },
        cumin: { urea: 15, dap: 20, mop: 10, organic: 500, timing: '2 splits: sowing, branching' },
        fenugreek: { urea: 15, dap: 25, mop: 15, organic: 600, timing: '2 splits: sowing, branching' },
        fennel: { urea: 25, dap: 30, mop: 20, organic: 800, timing: '2 splits: sowing, umbel formation' },
        jute: { urea: 40, dap: 20, mop: 15, organic: 1000, timing: '2 splits: sowing, fiber development' },
        tea: { urea: 150, dap: 50, mop: 100, organic: 2000, timing: '6 splits throughout the year' },
        coffee: { urea: 80, dap: 60, mop: 120, organic: 1500, timing: '3 splits: pre-monsoon, post-monsoon, post-harvest' },
        rubber: { urea: 100, dap: 50, mop: 150, organic: 2000, timing: '2 splits per year: beginning and end of monsoon' }
    };

    const requirements = fertilizerData[crop];
    if (!requirements) {
        showResult(resultDiv, 'Fertilizer data not available for this crop. Please select another crop.', 'error');
        return;
    }

    const urea = (requirements.urea * area).toFixed(1);
    const dap = (requirements.dap * area).toFixed(1);
    const mop = (requirements.mop * area).toFixed(1);
    const organic = (requirements.organic * area).toFixed(0);

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 15px;">Fertilizer Requirements for ${area} acre(s) of ${crop.charAt(0).toUpperCase() + crop.slice(1)}:</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: var(--primary-green); margin-bottom: 10px;">📦 Fertilizer Quantities:</h5>
                <p><i class="fas fa-leaf" style="color: #4caf50;"></i> <strong>Urea:</strong> ${urea} kg</p>
                <p><i class="fas fa-seedling" style="color: #8bc34a;"></i> <strong>DAP:</strong> ${dap} kg</p>
                <p><i class="fas fa-spa" style="color: #009688;"></i> <strong>MOP:</strong> ${mop} kg</p>
                <p><i class="fas fa-recycle" style="color: #795548;"></i> <strong>Organic Compost:</strong> ${organic} kg</p>
            </div>
            <div style="background: #e3f2fd; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">⏰ Application Timing:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.timing}</p>
            </div>
            <div style="background: #e8f5e8; padding: 10px; border-radius: 5px; font-size: 0.9rem;">
                <strong>💡 Pro Tip:</strong> Apply fertilizers based on soil test results for optimal crop yield and soil health.
            </div>
            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 0.8rem; color: #666;">
                <strong>⚠️ Disclaimer:</strong> Values are general recommendations per acre. Actual requirements vary by soil type, climate, variety, and region. Consult local agricultural extension officers for precise recommendations.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Irrigation Calculator Function
function calculateIrrigation() {
    const landSize = parseFloat(document.getElementById('land-size').value);
    const crop = document.getElementById('irrigation-crop').value;
    const resultDiv = document.getElementById('irrigation-result');

    if (!crop || !landSize || landSize <= 0) {
        showResult(resultDiv, 'Please select a crop and enter a valid land size.', 'error');
        return;
    }

    // Comprehensive water requirements per acre (in liters)
    const waterData = {
        rice: { daily: 15000, season: 120, schedule: 'Continuous flooding, 5 cm water during growing season', method: 'Flood irrigation' },
        wheat: { daily: 8000, season: 100, schedule: '5-6 irrigations, each 5-6 cm depth', method: 'Furrow irrigation' },
        corn: { daily: 10000, season: 90, schedule: '3-4 irrigations at knee-height and flowering stage', method: 'Sprinkler irrigation' },
        cotton: { daily: 12000, season: 160, schedule: '6-8 irrigations from squaring to boll development', method: 'Drip irrigation' },
        sugarcane: { daily: 20000, season: 365, schedule: '30-35 irrigations throughout year', method: 'Furrow irrigation' },
        soybean: { daily: 6000, season: 90, schedule: '2-3 irrigations during flowering and pod filling', method: 'Sprinkler irrigation' },
        mustard: { daily: 4000, season: 120, schedule: '3-4 irrigations during branching and flowering', method: 'Furrow irrigation' },
        groundnut: { daily: 5000, season: 120, schedule: '4-5 irrigations during pegging and pod development', method: 'Drip irrigation' },
        tomato: { daily: 8000, season: 120, schedule: 'Daily irrigation in small quantities', method: 'Drip irrigation' },
        potato: { daily: 6000, season: 100, schedule: '8-10 irrigations light and frequent', method: 'Sprinkler irrigation' },
        onion: { daily: 5000, season: 150, schedule: '15-20 irrigations light and frequent', method: 'Drip irrigation' },
        garlic: { daily: 4000, season: 180, schedule: '12-15 irrigations avoiding waterlogging', method: 'Furrow irrigation' },
        chili: { daily: 6000, season: 180, schedule: 'Frequent light irrigations', method: 'Drip irrigation' },
        cabbage: { daily: 7000, season: 90, schedule: '8-10 irrigations during head formation', method: 'Sprinkler irrigation' },
        cauliflower: { daily: 7000, season: 100, schedule: '10-12 irrigations during curd development', method: 'Sprinkler irrigation' },
        brinjal: { daily: 8000, season: 180, schedule: 'Regular irrigation avoiding water stress', method: 'Drip irrigation' },
        okra: { daily: 6000, season: 120, schedule: '6-8 irrigations during flowering and fruiting', method: 'Furrow irrigation' },
        carrot: { daily: 5000, season: 100, schedule: '6-8 light irrigations for root development', method: 'Sprinkler irrigation' },
        radish: { daily: 4000, season: 45, schedule: '4-5 irrigations during root swelling', method: 'Sprinkler irrigation' },
        spinach: { daily: 3000, season: 45, schedule: '6-8 light irrigations', method: 'Sprinkler irrigation' },
        banana: { daily: 25000, season: 365, schedule: 'Daily irrigation throughout year', method: 'Drip irrigation' },
        mango: { daily: 15000, season: 365, schedule: '15-20 irrigations during dry season', method: 'Basin irrigation' },
        orange: { daily: 12000, season: 365, schedule: '12-15 irrigations avoiding water stress', method: 'Drip irrigation' },
        apple: { daily: 10000, season: 200, schedule: '10-12 irrigations during fruit development', method: 'Drip irrigation' },
        grapes: { daily: 8000, season: 180, schedule: '8-10 irrigations from fruit set to harvest', method: 'Drip irrigation' },
        papaya: { daily: 15000, season: 365, schedule: 'Regular irrigation throughout year', method: 'Basin irrigation' },
        guava: { daily: 10000, season: 365, schedule: '12-15 irrigations during flowering and fruiting', method: 'Basin irrigation' },
        pomegranate: { daily: 8000, season: 180, schedule: '8-10 irrigations during fruit development', method: 'Drip irrigation' },
        chickpea: { daily: 4000, season: 120, schedule: '2-3 irrigations during flowering and pod filling', method: 'Furrow irrigation' },
        lentil: { daily: 3500, season: 110, schedule: '2-3 irrigations during flowering', method: 'Furrow irrigation' },
        pigeon_pea: { daily: 5000, season: 180, schedule: '3-4 irrigations during flowering and pod development', method: 'Furrow irrigation' },
        black_gram: { daily: 3000, season: 70, schedule: '2-3 irrigations during flowering', method: 'Furrow irrigation' },
        green_gram: { daily: 3000, season: 65, schedule: '2-3 irrigations during flowering', method: 'Furrow irrigation' },
        field_pea: { daily: 4000, season: 120, schedule: '3-4 irrigations during pod development', method: 'Furrow irrigation' },
        sesame: { daily: 3000, season: 90, schedule: '3-4 irrigations avoiding excess moisture', method: 'Furrow irrigation' },
        sunflower: { daily: 6000, season: 90, schedule: '4-5 irrigations during head formation', method: 'Furrow irrigation' },
        safflower: { daily: 4000, season: 120, schedule: '3-4 irrigations during branching and flowering', method: 'Furrow irrigation' },
        castor: { daily: 5000, season: 150, schedule: '4-5 irrigations during spike development', method: 'Furrow irrigation' },
        coconut: { daily: 40000, season: 365, schedule: 'Daily irrigation in coastal areas', method: 'Basin irrigation' },
        arecanut: { daily: 30000, season: 365, schedule: 'Regular irrigation throughout year', method: 'Basin irrigation' },
        cardamom: { daily: 8000, season: 365, schedule: 'Frequent light irrigations', method: 'Sprinkler irrigation' },
        black_pepper: { daily: 10000, season: 365, schedule: 'Regular irrigation avoiding waterlogging', method: 'Drip irrigation' },
        turmeric: { daily: 8000, season: 270, schedule: '15-20 irrigations during rhizome development', method: 'Furrow irrigation' },
        ginger: { daily: 8000, season: 240, schedule: '12-15 irrigations during rhizome development', method: 'Furrow irrigation' },
        coriander: { daily: 3000, season: 100, schedule: '4-5 light irrigations', method: 'Sprinkler irrigation' },
        cumin: { daily: 2500, season: 120, schedule: '3-4 irrigations avoiding excess moisture', method: 'Furrow irrigation' },
        fenugreek: { daily: 3000, season: 120, schedule: '4-5 irrigations during pod development', method: 'Furrow irrigation' },
        fennel: { daily: 4000, season: 150, schedule: '6-8 irrigations during umbel formation', method: 'Furrow irrigation' },
        jute: { daily: 8000, season: 120, schedule: '6-8 irrigations during fiber development', method: 'Furrow irrigation' },
        tea: { daily: 6000, season: 365, schedule: 'Frequent light irrigations year-round', method: 'Sprinkler irrigation' },
        coffee: { daily: 8000, season: 365, schedule: '10-12 irrigations during dry season', method: 'Drip irrigation' },
        rubber: { daily: 10000, season: 365, schedule: 'Regular irrigation during dry months', method: 'Basin irrigation' }
    };

    const requirements = waterData[crop];
    if (!requirements) {
        showResult(resultDiv, 'Irrigation data not available for this crop. Please select another crop.', 'error');
        return;
    }

    const dailyWater = (requirements.daily * landSize).toFixed(0);
    const seasonalWater = (requirements.daily * requirements.season * landSize / 1000).toFixed(1);
    const weeklyWater = (dailyWater * 7 / 1000).toFixed(1);

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 15px;">Irrigation Plan for ${landSize} acre(s) of ${crop.charAt(0).toUpperCase() + crop.slice(1)}:</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: var(--primary-green); margin-bottom: 10px;">💧 Water Requirements:</h5>
                <p><i class="fas fa-tint" style="color: #2196f3;"></i> <strong>Daily:</strong> ${new Intl.NumberFormat().format(dailyWater)} liters</p>
                <p><i class="fas fa-calendar-week" style="color: #03a9f4;"></i> <strong>Weekly:</strong> ${weeklyWater} thousand liters</p>
                <p><i class="fas fa-calendar" style="color: #00bcd4;"></i> <strong>Seasonal:</strong> ${seasonalWater} thousand liters</p>
            </div>
            <div style="background: #e8f5e8; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">📅 Irrigation Schedule:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.schedule}</p>
            </div>
            <div style="background: #fff3e0; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">🚿 Recommended Method:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.method}</p>
            </div>
            <div style="background: #e3f2fd; padding: 10px; border-radius: 5px; font-size: 0.9rem;">
                <strong>💡 Pro Tip:</strong> Use drip irrigation to save 30-50% water and increase crop yields with better water use efficiency.
            </div>
            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 0.8rem; color: #666;">
                <strong>⚠️ Disclaimer:</strong> Water requirements vary by soil type, climate, and growing conditions. Values are per acre estimates. Adjust based on local conditions and weather patterns.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Show Result Helper Function
function showResult(resultDiv, content, type) {
    resultDiv.innerHTML = content;
    resultDiv.className = `result show ${type}`;
    
    // Add different styling based on type
    if (type === 'error') {
        resultDiv.style.background = '#ffebee';
        resultDiv.style.borderColor = '#f44336';
        resultDiv.style.color = '#d32f2f';
    } else {
        resultDiv.style.background = '#fff9c4';
        resultDiv.style.borderColor = '#ffc107';
        resultDiv.style.color = '#1b5e20';
    }

    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Enhanced Table Row Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.crop-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            this.style.zIndex = '1';
            this.style.position = 'relative';
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            this.style.zIndex = 'auto';
            this.style.position = 'static';
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Form Validation and Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to input fields
    const inputFields = document.querySelectorAll('.input-field');
    
    inputFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        // Add real-time validation feedback
        field.addEventListener('input', function() {
            if (this.type === 'number' && this.value < 0) {
                this.style.borderColor = '#f44336';
                this.style.boxShadow = '0 0 5px rgba(244, 67, 54, 0.3)';
            } else {
                this.style.borderColor = '#4caf50';
                this.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.3)';
            }
        });
    });
});

// Add loading animation to buttons
document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load (optional)
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the next line if you want typing effect
        // typeWriter(heroTitle, originalText, 80);
    }
});

// Add smooth reveal animation to sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Enhanced mobile menu animation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
        link.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Add scroll progress indicator
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrolled}%;
            height: 3px;
            background: #ffc107;
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrolled + '%';
    }
});

// Console log for debugging
console.log('Farmer Genius website loaded successfully! 🌱');
console.log('All interactive features are ready to use.');

// Error handling for calculations
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You can add user-friendly error messages here
});

// Performance monitoring (optional)
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Website loaded in ${loadTime.toFixed(2)}ms`);
});

// ============== AI ASSISTANT CHATBOT FUNCTIONALITY ==============

// Chat widget state
let isChatOpen = false;

// Toggle chat widget visibility
function toggleChatWidget() {
    const chatWidget = document.getElementById('chat-widget');
    const chatButton = document.getElementById('chat-button');
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        chatWidget.style.display = 'flex';
        chatButton.style.display = 'none';
        setTimeout(() => {
            chatWidget.classList.add('chat-open');
        }, 10);
        
        // Focus on input when opening
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 300);
    } else {
        chatWidget.classList.remove('chat-open');
        setTimeout(() => {
            chatWidget.style.display = 'none';
            chatButton.style.display = 'flex';
        }, 300);
    }
}

// Send message function with real AI integration
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Call real AI API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        hideTypingIndicator();
        
        if (response.ok) {
            addMessage(data.response, 'bot');
        } else {
            addMessage(data.error || 'Sorry, I encountered an error. Please try again!', 'bot');
        }
    } catch (error) {
        hideTypingIndicator();
        console.error('Chat error:', error);
        addMessage('🤔 I\'m having connection issues. Please check your internet and try again!', 'bot');
    }
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Add message to chat
function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-avatar user-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Animate message appearance
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Quick question function
function askQuickQuestion(question) {
    document.getElementById('chat-input').value = question;
    sendMessage();
}


// Initialize chat widget state on page load
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chat-widget');
    const chatButton = document.getElementById('chat-button');
    
    // Initially hide chat widget
    chatWidget.style.display = 'none';
    chatButton.style.display = 'flex';
    
    // Add animation to chat button
    setTimeout(() => {
        chatButton.classList.add('pulse-animation');
    }, 3000);
});

// Add pulse animation class periodically to draw attention
setInterval(() => {
    const chatButton = document.getElementById('chat-button');
    if (chatButton && !isChatOpen) {
        chatButton.classList.add('pulse-animation');
        setTimeout(() => {
            chatButton.classList.remove('pulse-animation');
        }, 2000);
    }
}, 30000); // Every 30 seconds

// Navigation Toggle Functions
let navTimeout;

function toggleNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const icon = navToggle.querySelector('i');
    
    if (navbar.classList.contains('active')) {
        hideNavigation();
    } else {
        showNavigation();
    }
}

function showNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const icon = navToggle.querySelector('i');
    
    navbar.classList.add('active');
    navToggle.classList.add('active');
    icon.className = 'fas fa-times';
    
    // Start auto-hide timeout
    setTimeout(() => {
        if (navbar.classList.contains('active')) {
            startNavTimeout();
        }
    }, 100);
}

function hideNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const icon = navToggle.querySelector('i');
    
    navbar.classList.remove('active');
    navToggle.classList.remove('active');
    icon.className = 'fas fa-bars';
    
    clearTimeout(navTimeout);
}

function startNavTimeout() {
    clearTimeout(navTimeout);
    navTimeout = setTimeout(() => {
        const navbar = document.getElementById('navbar');
        if (navbar.classList.contains('active')) {
            hideNavigation();
        }
    }, 3000);
}

// ==================== SETTINGS FUNCTIONALITY ====================

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    setupSettingsEventListeners();
});

// Settings data structure
const defaultSettings = {
    theme: 'light',
    language: 'en',
    notifications: {
        weather: true,
        schemes: true,
        tips: true
    }
};

// Load settings from localStorage or use defaults
function loadSettings() {
    try {
        const savedSettings = localStorage.getItem('farmerGeniusSettings');
        const settings = savedSettings ? JSON.parse(savedSettings) : defaultSettings;
        
        // Apply theme
        applyTheme(settings.theme);
        
        // Apply language
        applyLanguage(settings.language);
        
        // Update settings page controls if on settings page
        updateSettingsUI(settings);
        
        return settings;
    } catch (error) {
        console.log('Error loading settings:', error);
        return defaultSettings;
    }
}

// Save settings to localStorage
function saveSettingsToStorage(settings) {
    try {
        localStorage.setItem('farmerGeniusSettings', JSON.stringify(settings));
        return true;
    } catch (error) {
        console.log('Error saving settings:', error);
        return false;
    }
}

// Apply theme to the document
function applyTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
    }
}

// Apply language to the document
function applyLanguage(language) {
    document.documentElement.lang = language;
    
    // Update all elements with data-en and data-hi attributes
    const elements = document.querySelectorAll('[data-en][data-hi]');
    elements.forEach(element => {
        if (language === 'hi' && element.getAttribute('data-hi')) {
            element.textContent = element.getAttribute('data-hi');
        } else if (language === 'en' && element.getAttribute('data-en')) {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update placeholders for input elements
    const inputElements = document.querySelectorAll('[data-en-placeholder][data-hi-placeholder]');
    inputElements.forEach(element => {
        if (language === 'hi' && element.getAttribute('data-hi-placeholder')) {
            element.placeholder = element.getAttribute('data-hi-placeholder');
        } else if (language === 'en' && element.getAttribute('data-en-placeholder')) {
            element.placeholder = element.getAttribute('data-en-placeholder');
        }
    });
}

// Update settings UI controls
function updateSettingsUI(settings) {
    // Update theme radio buttons
    const themeInputs = document.querySelectorAll('input[name="theme"]');
    themeInputs.forEach(input => {
        input.checked = input.value === settings.theme;
    });
    
    // Update language radio buttons
    const languageInputs = document.querySelectorAll('input[name="language"]');
    languageInputs.forEach(input => {
        input.checked = input.value === settings.language;
    });
    
    // Update notification checkboxes
    const weatherCheckbox = document.getElementById('weather-alerts');
    const schemeCheckbox = document.getElementById('scheme-updates');
    const tipsCheckbox = document.getElementById('farming-tips');
    
    if (weatherCheckbox) weatherCheckbox.checked = settings.notifications.weather;
    if (schemeCheckbox) schemeCheckbox.checked = settings.notifications.schemes;
    if (tipsCheckbox) tipsCheckbox.checked = settings.notifications.tips;
}

// Setup event listeners for settings controls
function setupSettingsEventListeners() {
    // Theme change listeners
    const themeInputs = document.querySelectorAll('input[name="theme"]');
    themeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                applyTheme(this.value);
                showSettingsMessage(`Theme changed to ${this.value} mode`, 'success');
            }
        });
    });
    
    // Language change listeners
    const languageInputs = document.querySelectorAll('input[name="language"]');
    languageInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                applyLanguage(this.value);
                const message = this.value === 'hi' ? 'भाषा हिंदी में बदली गई' : 'Language changed to English';
                showSettingsMessage(message, 'success');
            }
        });
    });
}

// Save all settings
function saveSettings() {
    try {
        const settings = {
            theme: document.querySelector('input[name="theme"]:checked')?.value || 'light',
            language: document.querySelector('input[name="language"]:checked')?.value || 'en',
            notifications: {
                weather: document.getElementById('weather-alerts')?.checked || false,
                schemes: document.getElementById('scheme-updates')?.checked || false,
                tips: document.getElementById('farming-tips')?.checked || false
            }
        };
        
        if (saveSettingsToStorage(settings)) {
            const message = settings.language === 'hi' ? 'सेटिंग्स सफलतापूर्वक सेव हो गईं!' : 'Settings saved successfully!';
            showSettingsMessage(message, 'success');
        } else {
            const message = settings.language === 'hi' ? 'सेटिंग्स सेव करने में त्रुटि!' : 'Error saving settings!';
            showSettingsMessage(message, 'error');
        }
    } catch (error) {
        console.log('Error in saveSettings:', error);
        showSettingsMessage('Error saving settings!', 'error');
    }
}

// Reset settings to default
function resetSettings() {
    try {
        const confirmMessage = document.documentElement.lang === 'hi' 
            ? 'क्या आप वाकई सेटिंग्स को डिफ़ॉल्ट पर रीसेट करना चाहते हैं?' 
            : 'Are you sure you want to reset settings to default?';
            
        if (confirm(confirmMessage)) {
            // Clear localStorage
            localStorage.removeItem('farmerGeniusSettings');
            
            // Apply default settings
            applyTheme(defaultSettings.theme);
            applyLanguage(defaultSettings.language);
            updateSettingsUI(defaultSettings);
            
            const message = defaultSettings.language === 'hi' 
                ? 'सेटिंग्स डिफ़ॉल्ट पर रीसेट हो गईं!' 
                : 'Settings reset to default!';
            showSettingsMessage(message, 'success');
        }
    } catch (error) {
        console.log('Error in resetSettings:', error);
        showSettingsMessage('Error resetting settings!', 'error');
    }
}

// Show settings message notification
function showSettingsMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.settings-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `settings-message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        min-width: 250px;
        text-align: center;
        animation: slideInRight 0.3s ease;
    `;
    messageDiv.textContent = message;
    
    // Add to body
    document.body.appendChild(messageDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Quick theme toggle function (can be called from anywhere)
function toggleTheme() {
    const currentSettings = loadSettings();
    const newTheme = currentSettings.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    
    // Update settings and save
    currentSettings.theme = newTheme;
    saveSettingsToStorage(currentSettings);
    updateSettingsUI(currentSettings);
    
    const message = newTheme === 'dark' 
        ? (currentSettings.language === 'hi' ? 'डार्क मोड सक्रिय' : 'Dark mode enabled')
        : (currentSettings.language === 'hi' ? 'लाइट मोड सक्रिय' : 'Light mode enabled');
    showSettingsMessage(message, 'success');
}

// Quick language toggle function
function toggleLanguage() {
    const currentSettings = loadSettings();
    const newLanguage = currentSettings.language === 'en' ? 'hi' : 'en';
    applyLanguage(newLanguage);
    
    // Update settings and save
    currentSettings.language = newLanguage;
    saveSettingsToStorage(currentSettings);
    updateSettingsUI(currentSettings);
    
    const message = newLanguage === 'hi' ? 'भाषा हिंदी में बदली गई' : 'Language changed to English';
    showSettingsMessage(message, 'success');
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Console logging for development
console.log('🌾 Farmer Genius Settings initialized! Available functions:');
console.log('- toggleTheme() - Quick theme toggle');
console.log('- toggleLanguage() - Quick language toggle'); 
console.log('- saveSettings() - Save all settings');
console.log('- resetSettings() - Reset to defaults');