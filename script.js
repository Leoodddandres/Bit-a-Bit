document.addEventListener('DOMContentLoaded', function() {
    // Hide Header on scroll down
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Scroll Down
            header.classList.add('header-hidden');
        } else {
            // Scroll Up
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop;
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Handle Menu Links
    const menuLinks = document.querySelectorAll('.menu-link');
    const sections = document.querySelectorAll('.section-content');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links and sections
            menuLinks.forEach(item => item.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show the corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // If we have hash navigation, update URL but prevent default behavior
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });
    
    // Submenu toggle for mobile
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    
    hasSubmenu.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });
    
    // Submenu category filters
    const submenuFilters = document.querySelectorAll('.submenu a');
    
    submenuFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // First activate the Categorías section
            menuLinks.forEach(item => item.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            const categoriesLink = document.querySelector('[data-section="categorias"]');
            categoriesLink.classList.add('active');
            document.getElementById('categorias').classList.add('active');
            
            // Then filter the games
            const filterValue = this.getAttribute('data-filter');
            filterGamesByCategory(filterValue);
            
            // Update URL
            history.pushState(null, null, this.getAttribute('href'));
        });
    });
    
    // Handle hash changes (for direct links and back/forward navigation)
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', handleHashChange);
    
    function handleHashChange() {
        const hash = window.location.hash || '#inicio';
        const section = hash.substring(1);
        
        if (document.getElementById(section)) {
            menuLinks.forEach(item => item.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            
            const activeLink = document.querySelector(`[data-section="${section}"]`);
            if (activeLink) activeLink.classList.add('active');
            
            document.getElementById(section).classList.add('active');
        }
    }
    
    // Hero Slider functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    function goToSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        goToSlide(prev);
    }
    
    // Auto slide
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Event listeners for slider controls
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetSlideInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetSlideInterval();
    });
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
            resetSlideInterval();
        });
    });
    
    // Start auto sliding
    startSlideInterval();
    
    // Category Filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const gameCards = document.querySelectorAll('.game-card');
    const sortSelect = document.getElementById('sort-by');
    
    // Filter games based on category
    function filterGamesByCategory(category) {
        // Update active class on category buttons
        categoryBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Filter game cards
        gameCards.forEach(card => {
            if (category === 'all' || card.dataset.category.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Tag Filtering
    const tagFilters = document.querySelectorAll('.tag-filter');
    let activeTags = [];
    
    tagFilters.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagValue = this.getAttribute('data-tag');
            
            // Toggle active class
            this.classList.toggle('active');
            
            // Add or remove tag from active tags array
            if (this.classList.contains('active')) {
                activeTags.push(tagValue);
            } else {
                activeTags = activeTags.filter(tag => tag !== tagValue);
            }
            
            // Filter games by tags
            filterGamesByTags();
        });
    });
    
    function filterGamesByTags() {
        if (activeTags.length === 0) {
            // If no tags are selected, show all games (but respect category filters)
            const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-filter');
            filterGamesByCategory(activeCategory);
            return;
        }
        
        gameCards.forEach(card => {
            const cardTags = card.dataset.tags ? card.dataset.tags.split(' ') : [];
            const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-filter');
            const matchesCategory = activeCategory === 'all' || card.dataset.category.includes(activeCategory);
            
            // Check if card has at least one of the active tags
            const hasTag = activeTags.some(tag => cardTags.includes(tag));
            
            if (matchesCategory && hasTag) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Event listeners for category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter games
            if (activeTags.length > 0) {
                filterGamesByTags();
            } else {
                filterGamesByCategory(this.dataset.filter);
            }
        });
    });
    
    // Sort games based on selected option
    function sortGames(sortOption) {
        const gamesList = Array.from(gameCards);
        const gamesContainer = document.querySelector('.games-grid');
        
        // Clear the container
        gamesContainer.innerHTML = '';
        
        // Sort by the selected option
        if (sortOption === 'recent') {
            // For demo purposes, we'll just keep the original order
            gamesList.forEach(game => gamesContainer.appendChild(game));
        } else if (sortOption === 'popular') {
            // Sort by rating (for demo, we'll just reverse the order)
            gamesList.sort((a, b) => {
                const ratingA = parseFloat(a.querySelector('.rating').textContent.split(' ')[1]);
                const ratingB = parseFloat(b.querySelector('.rating').textContent.split(' ')[1]);
                return ratingB - ratingA;
            });
            gamesList.forEach(game => gamesContainer.appendChild(game));
        } else if (sortOption === 'az') {
            // Sort alphabetically
            gamesList.sort((a, b) => {
                const titleA = a.querySelector('h3').textContent;
                const titleB = b.querySelector('h3').textContent;
                return titleA.localeCompare(titleB);
            });
            gamesList.forEach(game => gamesContainer.appendChild(game));
        }
    }
    
    // Event listener for sort select
    sortSelect.addEventListener('change', function() {
        sortGames(this.value);
    });
    
    // News Filtering
    const newsFilters = document.querySelectorAll('.news-filter');
    const newsCards = document.querySelectorAll('.news-card');
    
    newsFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            newsFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Filter news cards
            const filterType = this.getAttribute('data-filter');
            
            newsCards.forEach(card => {
                if (filterType === 'all' || card.getAttribute('data-type') === filterType) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Time Period Filtering for Top Downloads
    const timeFilters = document.querySelectorAll('.time-filter');
    const topGames = document.querySelectorAll('.top-game');
    
    timeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            timeFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Filter top games
            const timeperiod = this.getAttribute('data-time');
            
            topGames.forEach(game => {
                if (game.getAttribute('data-time').includes(timeperiod)) {
                    game.style.display = 'grid';
                } else {
                    game.style.display = 'none';
                }
            });
        });
    });
    
    // Real-time Search
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    const gameData = [
        { id: 'schedule', title: 'Schedule', category: 'Simulación, Estrategia', thumb: 'url("https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/3164500/3a542c825f36b33cd1f8fe51d28ed5eee7abc75d/capsule_616x353.jpg?t=1742853609")' },
        { id: 'gta4', title: 'Grand Theft Auto IV', category: 'Acción, Aventura', thumb: 'url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/12210/capsule_616x353.jpg?t=1721061564")' },
        { id: 'lastofus', title: 'The Last of Us', category: 'Acción, Aventura', thumb: 'url("https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png")' },
        { id: 'modernwarfare2', title: 'Modern Warfare 2', category: 'Acción, Shooter', thumb: 'url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/10180/capsule_616x353.jpg?t=1654809646")' },
        { id: 'theforest', title: 'The Forest', category: 'Acción, Supervivencia', thumb: 'url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/242760/header.jpg?t=1699381053")' },
        { id: 'darksouls', title: 'Dark Souls', category: 'Acción, RPG', thumb: 'url("https://e.snmc.io/lk/gv/x/fdfe79f1302449ddb53f6db81e6cac76/7469616")' },
        { id: 'prototype', title: 'Prototype', category: 'Acción', thumb: 'url("https://i.ytimg.com/vi/XdHj9apjH5M/sddefault.jpg")' },
        { id: 'narutostorm', title: 'Naruto Storm', category: 'Acción, Lucha', thumb: 'url("https://fanatical.imgix.net/product/original/f74ed3a0-5ba4-4270-bc71-783ea7ec1dfa.jpg?auto=compress,format&w=870&fit=crop&h=489")' },
        { id: 'pes6', title: 'PES 6 Evolution Soccer', category: 'Deportes, Acción', thumb: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-oF9dt8_bSsEfp6vpsD--zzhEwlsFMU54Jw&s")' },
        { id: 'borderlands3', title: 'Borderlands 3', category: 'Acción, RPG', thumb: 'url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/397540/capsule_616x353.jpg?t=1654809646")' },
        { id: 'mortalkombat', title: 'Mortal Kombat', category: 'Acción, Lucha', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Mortal_Kombat_11_cover_art.jpg/220px-Mortal_Kombat_11_cover_art.jpg")' },
        { id: 'terraria', title: 'Terraria', category: 'Acción, Aventura', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Terraria_cover_art.jpg/220px-Terraria_cover_art.jpg")' },
        { id: 'streamerlife', title: 'Streamer Life Simulator', category: 'Simulación', thumb: 'url("https://steamcdn-a.akamaihd.net/steam/apps/1564020/capsule_616x353.jpg?t=1661972496")' },
        { id: 'left4dead2', title: 'Left 4 Dead 2', category: 'Acción, Shooter', thumb: 'url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/550/capsule_616x353.jpg?t=1654809646")' },
        { id: 'worldbox', title: 'World Box', category: 'Simulación, Estrategia', thumb: 'url("https://steamcdn-a.akamaihd.net/steam/apps/2266700/capsule_616x353.jpg?t=1654809646")' },
        { id: 'darksouls2', title: 'Dark Souls 2', category: 'Acción, RPG', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Dark_Souls_II_cover_art.jpg/220px-Dark_Souls_II_cover_art.jpg")' },
        { id: 'subnautica', title: 'Subnautica', category: 'Aventura, Supervivencia', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Subnautica_cover_art.jpg/220px-Subnautica_cover_art.jpg")' },
        { id: 'godmaster', title: 'God Master', category: 'Acción, Plataformas', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/5/59/God_Master_cover.jpg/220px-God_Master_cover.jpg")' },
        { id: 'cuphead', title: 'Cuphead', category: 'Acción, Plataformas', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Cuphead_cover_art.jpg/220px-Cuphead_cover_art.jpg")' },
        { id: 'blur', title: 'Blur', category: 'Carreras, Acción', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Blur_cover_art.jpg/220px-Blur_cover_art.jpg")' },
        { id: 'residentevil4', title: 'Resident Evil 4', category: 'Acción, Terror', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Resident_Evil_4_cover_art.jpg/220px-Resident_Evil_4_cover_art.jpg")' },
        { id: 'partyanimals', title: 'Party Animals', category: 'Acción, Multijugador', thumb: 'url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1260320/capsule_616x353.jpg?t=1741588032")' },
        { id: 'littlenightmares', title: 'Little Nightmares', category: 'Aventura, Terror', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Little_Nightmares_cover_art.jpg/220px-Little_Nightmares_cover_art.jpg")' },
        { id: 'halo2', title: 'Halo 2 Online Multiplayer', category: 'Acción, Shooter', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Halo_2_cover_art.jpg/220px-Halo_2_cover_art.jpg")' },
        { id: 'manhunt2', title: 'Manhunt 2', category: 'Acción, Terror', thumb: 'url("https://assets-prd.ignimgs.com/2022/01/04/manhunt-2-button-1641281784696.jpg")' }
    ];
    
    // Enhance search functionality
    searchInput.addEventListener('input', function() {
        const searchValue = this.value.toLowerCase().trim();
        
        if (searchValue.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        // Improved search algorithm with better matching
        const matchingGames = gameData.filter(game => {
            // Match by title (highest priority)
            const titleMatch = game.title.toLowerCase().includes(searchValue);
            
            // Match by category (second priority)
            const categoryMatch = game.category.toLowerCase().includes(searchValue);
            
            // If searching for exact words, give higher score
            const exactWordMatch = game.title.toLowerCase().split(' ').some(word => word === searchValue) ||
                                   game.category.toLowerCase().split(' ').some(word => word === searchValue);
            
            // If starts with the search term, give higher priority
            const startsWithMatch = game.title.toLowerCase().startsWith(searchValue);
            
            // Calculate match score
            game.matchScore = 0;
            if (titleMatch) game.matchScore += 10;
            if (categoryMatch) game.matchScore += 5;
            if (exactWordMatch) game.matchScore += 3;
            if (startsWithMatch) game.matchScore += 5;
            
            return titleMatch || categoryMatch;
        });
        
        // Sort by match score
        matchingGames.sort((a, b) => b.matchScore - a.matchScore);
        
        // Update search results with improved layout and ensure thumbnails appear
        if (matchingGames.length > 0) {
            searchResults.innerHTML = '';
            
            matchingGames.forEach(game => {
                const resultItem = document.createElement('a');
                resultItem.href = `game.html?id=${game.id}`;
                resultItem.className = 'search-result-item';
                
                resultItem.innerHTML = `
                    <div class="search-result-thumb" style="background: ${game.thumb}"></div>
                    <div class="search-result-info">
                        <h4>${game.title}</h4>
                        <span>${game.category}</span>
                    </div>
                `;
                
                searchResults.appendChild(resultItem);
            });
            
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<div class="search-result-item">No se encontraron resultados</div>';
            searchResults.classList.add('active');
        }
    });

    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Load More Games Button
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    loadMoreBtn.addEventListener('click', function() {
        // This would typically load more games from the server
        // For demo purposes, we'll just show a message
        this.textContent = 'Cargando...';
        
        setTimeout(() => {
            this.textContent = 'No hay más juegos';
            this.disabled = true;
            this.style.opacity = 0.5;
        }, 1500);
    });
    
    // Telegram bot integration for suggestions form
    const suggestionsForm = document.querySelector('.suggestions-form');
    if (suggestionsForm) {
        suggestionsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const suggestionType = document.getElementById('suggestion-type').value;
            const message = document.getElementById('message').value;
            
            // Show loading indicator
            const loadingIndicator = document.querySelector('.submit-loading');
            loadingIndicator.style.display = 'block';
            
            // Format message for Telegram
            const telegramMessage = `
📩 Nueva Sugerencia:
👤 Nombre: ${name}
📧 Email: ${email}
📋 Tipo: ${suggestionType}
💬 Mensaje: ${message}
            `;
            
            // Send to Telegram
            const botToken = '7340213346:AAHW4gyS3nUjq4bXSSVJJdQRFUAhtZqgsxU';
            const chatId = '-1002298786793';
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage
                })
            })
            .then(response => response.json())
            .then(data => {
                loadingIndicator.style.display = 'none';
                if (data.ok) {
                    alert('¡Gracias! Tu sugerencia ha sido enviada correctamente.');
                    suggestionsForm.reset();
                } else {
                    alert('Hubo un error al enviar tu sugerencia. Por favor, inténtalo más tarde.');
                    console.error('Telegram API error:', data);
                }
            })
            .catch(error => {
                loadingIndicator.style.display = 'none';
                alert('Hubo un error al enviar tu sugerencia. Por favor, inténtalo más tarde.');
                console.error('Fetch error:', error);
            });
        });
    }
});