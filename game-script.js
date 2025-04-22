document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle (same as in main script)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Submenu toggle for mobile
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    
    hasSubmenu.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    // Real-time Search (same as main script)
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Sample game data for search functionality - Updated with new games and consistent thumbnails
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
        { id: 'borderlands3', title: 'Borderlands 3', category: 'Acción, RPG', thumb: 'url("https://image.api.playstation.com/vulcan/ap/rnd/202010/1512/8ThoZrEbXfb7aJ8MLNkuFYgX.png")' },
        { id: 'mortalkombat', title: 'Mortal Kombat', category: 'Acción, Lucha', thumb: 'url("https://image.api.playstation.com/vulcan/img/rnd/202106/0722/S5WzSQRZbdzmxiiDW6MGuXCO.png")' },
        { id: 'terraria', title: 'Terraria', category: 'Acción, Aventura', thumb: 'url("https://image.api.playstation.com/cdn/UP4040/CUSA00740_00/NZSgQkpJgkLrxkMlPsQbYJx2yVm0Pp9T.png")' },
        { id: 'streamerlife', title: 'Streamer Life Simulator', category: 'Simulación', thumb: 'url("https://cdn.cloudflare.steamstatic.com/steam/apps/1261040/header.jpg")' },
        { id: 'left4dead2', title: 'Left 4 Dead 2', category: 'Acción, Shooter', thumb: 'url("https://cdn.cloudflare.steamstatic.com/steam/apps/550/header.jpg")' },
        { id: 'worldbox', title: 'World Box', category: 'Simulación, Estrategia', thumb: 'url("https://play-lh.googleusercontent.com/rRxm8SW88PvR88NuiDnFrRbKytP4llOc1tWxkJoT--atZCrw9S7yZBfxG_QuZPtTKA")' },
        { id: 'darksouls2', title: 'Dark Souls 2', category: 'Acción, RPG', thumb: 'url("https://image.api.playstation.com/cdn/EP0700/CUSA01589_00/32UyZSUlPcvYcfWQJyPfkBF7aaAuHVPM.png")' },
        { id: 'subnautica', title: 'Subnautica', category: 'Aventura, Supervivencia', thumb: 'url("https://image.api.playstation.com/vulcan/img/rnd/202010/2621/BjVQ8AagBo7ETrQi8bGJnH0b.png")' },
        { id: 'godmaster', title: 'God Master', category: 'Acción, Plataformas', thumb: 'url("https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg")' },
        { id: 'cuphead', title: 'Cuphead', category: 'Acción, Plataformas', thumb: 'url("https://image.api.playstation.com/vulcan/ap/rnd/202207/1823/XP5OTmhELLBhvQQqWyEgqwCz.png")' },
        { id: 'blur', title: 'Blur', category: 'Carreras, Acción', thumb: 'url("https://upload.wikimedia.org/wikipedia/en/5/5f/Blur_Video_Game_Cover.jpg")' },
        { id: 'residentevil4', title: 'Resident Evil 4', category: 'Acción, Terror', thumb: 'url("https://image.api.playstation.com/vulcan/ap/rnd/202210/0706/EVWyZD63pahuh95eKloFaJuC.png")' },
        { id: 'partyanimals', title: 'Party Animals', category: 'Acción, Multijugador', thumb: 'url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1260320/capsule_616x353.jpg?t=1741588032")' },
        { id: 'littlenightmares', title: 'Little Nightmares', category: 'Aventura, Terror', thumb: 'url("https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/424840/ba87af54ef0e5694a98d640c57e7f80370b0b88f.jpg")' },
        { id: 'halo2', title: 'Halo 2 Online Multiplayer', category: 'Acción, Shooter', thumb: 'url("https://i.blogs.es/b00ea5/halo2/450_1000.webp")' },
        { id: 'manhunt2', title: 'Manhunt 2', category: 'Acción, Terror', thumb: 'url("https://assets-prd.ignimgs.com/2022/01/04/manhunt-2-button-1641281784696.jpg")' },
        { id: 'legojurassic', title: 'Lego Jurassic World', category: 'Aventura, Familiar', thumb: 'url("https://play-lh.googleusercontent.com/4-sfrry21gCySENZbZmGojrS66zqjMn0mztjQ6Mg5bMS3TV3oQ81B5szcIljQx1DHA")' },
        { id: 'blasphemous', title: 'Blasphemous', category: 'Aventura, Plataformas', thumb: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjRxN4qYPnLywxtrYcfaeM6JwJ5BMTMRw9Ew&s")' },
        { id: 'raymanorigins', title: 'Rayman Origins', category: 'Aventura, Plataformas', thumb: 'url("https://static.wikia.nocookie.net/doblaje-fanon/images/7/7f/Rayman_Origins_Box_Art.jpg/revision/latest?cb=20201115030219&path-prefix=es")' },
        { id: 'southpark', title: 'South Park: The Stick of Truth', category: 'Aventura, RPG', thumb: 'url("https://image.api.playstation.com/cdn/UP0001/CUSA04768_00/z4hPg2i1Gdm09eBu4RQDMCbzYd0wmvCK.png")' },
        { id: 'saintsrow2', title: 'Saints Row 2', category: 'Aventura, Acción', thumb: 'url("https://store-images.s-microsoft.com/image/apps.4943.69317625881218501.f5ef7efb-e80d-48e3-86ae-964377c2a501.84548a94-c495-4668-a817-940fa97e9649?q=90&w=480&h=270")' }
    ];
    
    if (searchInput) {
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
            
            // Update search results with improved layout
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
    }
    
    // Load game data based on URL parameter
    function loadGameData() {
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('id');
        
        // Mock data - in a real application, this would come from a backend
        const gameData = {
            'schedule': {
                title: 'Schedule',
                category: 'Simulación, Estrategia',
                rating: '4.6',
                release: '15 Ene 2023',
                description: 'Schedule es un juego de simulación y gestión de tiempo que te permite organizar y optimizar tu vida diaria. Con una interfaz intuitiva y herramientas potentes, Schedule te ayuda a planificar tus actividades, establecer metas y hacer un seguimiento de tu progreso. Ideal para estudiantes, profesionales y cualquier persona que busque mejorar su productividad y equilibrio entre vida laboral y personal.',
                features: [
                    'Interfaz intuitiva y fácil de usar',
                    'Herramientas avanzadas de planificación y gestión de tiempo',
                    'Múltiples modos de juego: individual y multijugador en línea',
                    'Personalización completa de actividades y objetivos',
                    'Estadísticas detalladas para analizar tu rendimiento',
                    'Compatibilidad con dispositivos móviles y de escritorio'
                ],
                version: '0.5.2',
                size: '165 MB',
                updated: '25 Abr 2025',
                developer: 'ScheduleSoft',
                publisher: 'ScheduleSoft',
                releaseDate: '15 Ene 2023',
                mode: 'Un jugador, Multijugador',
                language: 'Español, Inglés',
                downloadLink: 'https://file10.gofile.io/download/web/c5086dbc-a872-405f-8e4f-e7e47266e16a/Schedule-Fix.ONLY.V2.rar',
                onlineFilesLink: 'https://download2351.mediafire.com/j5sp1yasisdgMMdTo7V_NZo1eOGzkYWY3oAyHvuIqab--DofIiHYa3S83huEC0atvUxuEu1P3TNP8RWehtuu0uk5mpiJQ_B0gafFIw49BRthk_eJ0h0NBcQtYWde3rubh5cF4xwd9kR3oUaisybC3pMVY3lEoVkEM-mN0p7kAque/1qivc580kq7ch3n/Schedule.I.v0.5.2.rar'
            },
            'darksouls': {
                title: 'Dark Souls',
                category: 'Acción, RPG',
                rating: '4.8',
                release: '22 Sep 2011',
                description: 'Dark Souls es un desafiante juego de rol de acción que se desarrolla en un universo oscuro y de fantasía. Famoso por su alta dificultad, el juego te envía en un viaje a través de un mundo interconectado lleno de enemigos formidables y jefes épicos. Con su sistema de combate meticuloso, diseño de niveles intrincado y rica tradición, Dark Souls ha definido un género y se ha convertido en un clásico de culto en la industria de los videojuegos.',
                features: [
                    'Combate táctico y desafiante que requiere paciencia y habilidad',
                    'Mundo interconectado con múltiples rutas y atajos',
                    'Amplia variedad de armas, armaduras y hechizos para personalizar tu estilo de juego',
                    'Jefes memorables con patrones únicos',
                    'Sistema de niveles de personaje profundo y flexible',
                    'Versión Remastered con gráficos mejorados y rendimiento optimizado'
                ],
                version: 'Remastered',
                size: '8 GB',
                updated: '28 Abr 2025',
                developer: 'FromSoftware',
                publisher: 'Bandai Namco Entertainment',
                releaseDate: '22 Sep 2011',
                mode: 'Un jugador, Multijugador',
                language: 'Español, Inglés, Francés, Alemán, Italiano y más',
                downloadLink: 'https://www.mediafire.com/file/cbn8sigj19vxl2N/dsiisotfs.1.02.GAMEZFULL.COM.PART01.RAR/FILE'
            },
            'gta4': {
                title: 'Grand Theft Auto IV',
                category: 'Acción, Aventura',
                rating: '4.9',
                release: '29 Abr 2008',
                description: 'Grand Theft Auto IV es un juego de acción y aventura en mundo abierto desarrollado por Rockstar North. Ambientado en Liberty City, una versión ficticia de Nueva York, el juego sigue la historia de Niko Bellic, un inmigrante de Europa del Este que llega a América buscando realizar el "sueño americano" y escapar de su turbulento pasado. A través de una narrativa madura y realista, el jugador experimentará el submundo criminal de la ciudad mientras Niko intenta encontrar su lugar y enfrentarse a las consecuencias de sus decisiones.',
                features: [
                    'Mundo abierto detallado y vivo basado en Nueva York',
                    'Historia madura con personajes complejos y decisiones morales',
                    'Sistema de conducción y física realista',
                    'Misiones variadas con múltiples formas de completarlas',
                    'Modo multijugador con diversos modos de juego'
                ],
                version: 'Complete Edition',
                size: '22 GB',
                updated: '15 Abr 2024',
                developer: 'Rockstar North',
                publisher: 'Rockstar Games',
                releaseDate: '29 Abr 2008',
                mode: 'Un jugador, Multijugador',
                language: 'Español, Inglés, Francés, Alemán, Italiano y más',
                downloadLink: 'https://www.mediafire.com/file/r19w6z4njgja0o8/Gta_IV_The_Complete_Edition_-_TheFenix010.rar/file'
            },
            'lastofus': {
                title: 'The Last of Us',
                category: 'Acción, Aventura',
                rating: '4.9',
                release: '14 Jun 2013',
                description: 'The Last of Us es un juego de acción y aventura desarrollado por Naughty Dog. Ambientado veinte años después de que una pandemia devastadora se extendiera por los Estados Unidos, sigue la historia de Joel, un superviviente atormentado por su pasado, quien debe escoltar a una joven de 14 años llamada Ellie a través de un país post-apocalíptico mientras lucha contra criaturas caníbales infectadas por una mutación del hongo Cordyceps y contra peligrosos supervivientes humanos.',
                features: [
                    'Historia emotiva con personajes profundos y memorables',
                    'Combina elementos de supervivencia, acción y aventura',
                    'Gráficos impresionantes y detallados',
                    'Sistema de crafting y mejora de armas',
                    'Exploración de un mundo post-apocalíptico lleno de peligros'
                ],
                version: '1.0',
                size: '25 GB',
                updated: '10 Feb 2024',
                developer: 'Naughty Dog',
                publisher: 'Sony Computer Entertainment',
                releaseDate: '14 Jun 2013',
                mode: 'Un jugador',
                language: 'Español, Inglés, Francés, Alemán, Italiano y más',
                downloadLink: 'https://www.mediafire.com/file/emhwia4z0pjhfe4/',
                minRequirements: {
                    os: 'Windows 10 (versión 1909 o posterior) 64-bit',
                    cpu: 'AMD Ryzen 5 1500X / Intel Core i7-4770K',
                    ram: '16 GB RAM',
                    gpu: 'AMD Radeon RX 470 (4 GB) / NVIDIA GeForce GTX 970 (4 GB)',
                    directx: 'Versión 12',
                    storage: '100 GB SSD'
                },
                recRequirements: {
                    os: 'Windows 10 (versión 1909 o posterior) 64-bit',
                    cpu: 'AMD Ryzen 7 3700X / Intel Core i7-8700',
                    ram: '16 GB RAM',
                    gpu: 'AMD Radeon RX 5800 XT / NVIDIA GeForce RTX 2070 SUPER',
                    directx: 'Versión 12',
                    storage: '100 GB SSD'
                }
            },
            'modernwarfare2': {
                title: 'Modern Warfare 2',
                category: 'Acción, Shooter',
                rating: '4.7',
                release: '10 Nov 2009',
                description: 'Call of Duty: Modern Warfare 2 es la secuela del aclamado juego de acción en primera persona de Infinity Ward. La historia se desarrolla cinco años después de los eventos de Call of Duty 4, con una nueva y escalofriante amenaza que pone al mundo al borde del colapso. El juego cuenta con una emocionante campaña para un solo jugador, un innovador modo cooperativo Spec Ops, y el adictivo modo multijugador que ha definido la saga.',
                features: [
                    'Intensa campaña para un jugador llena de acción y giros argumentales',
                    'Modo multijugador con múltiples mapas, armas y personalizaciones',
                    'Modo cooperativo Spec Ops para misiones tácticas',
                    'Sistema de clases y progresión mejorado',
                    'Gráficos y efectos visuales de primera calidad'
                ],
                version: '1.2',
                size: '12 GB',
                updated: '15 Ene 2024',
                developer: 'Infinity Ward',
                publisher: 'Activision',
                releaseDate: '10 Nov 2009',
                mode: 'Un jugador, Multijugador, Cooperativo',
                language: 'Español, Inglés, Francés, Alemán, Italiano y más',
                downloadLink: 'https://www.mediafire.com/file/xy7bpesb260hpor/?dkey=f38as08vrex&r=661',
                minRequirements: {
                    os: 'Windows 10 64-bit',
                    cpu: 'Intel Core i3-6100 / Core i5-2500K o AMD Ryzen 3 1200',
                    ram: '8 GB RAM',
                    gpu: 'NVIDIA GeForce GTX 960 o AMD Radeon RX 470',
                    directx: 'Versión 12',
                    storage: '125 GB de espacio disponible'
                },
                recRequirements: {
                    os: 'Windows 10 64-bit o Windows 11 64-bit',
                    cpu: 'Intel Core i7-4770K o AMD Ryzen 5 1500X',
                    ram: '12 GB RAM',
                    gpu: 'NVIDIA GeForce GTX 1060 o AMD Radeon RX 580',
                    directx: 'Versión 12',
                    storage: '125 GB de espacio disponible'
                }
            },
            'theforest': {
                title: 'The Forest',
                category: 'Acción, Supervivencia',
                rating: '4.6',
                release: '30 Abr 2018',
                description: 'The Forest es un juego de terror y supervivencia en primera persona que tiene lugar en un bosque habitado por caníbales mutantes. Como el único superviviente de un accidente aéreo, debes encontrar a tu hijo y luchar por sobrevivir utilizando herramientas y armas que puedes elaborar. El juego combina elementos de construcción de bases, exploración, y combate en un mundo abierto generado proceduralmente.',
                features: [
                    'Mundo abierto lleno de flora y fauna',
                    'Sistema de construcción completo para crear refugios y defensas',
                    'Ciclo día/noche realista que afecta a las mecánicas de juego',
                    'Enemigos con IA avanzada y comportamientos complejos',
                    'Modo cooperativo multijugador'
                ],
                version: '1.12',
                size: '5 GB',
                updated: '8 Mar 2024',
                developer: 'Endnight Games',
                publisher: 'Endnight Games',
                releaseDate: '30 Abr 2018',
                mode: 'Un jugador, Multijugador',
                language: 'Español, Inglés, Francés, Alemán, Italiano y más',
                downloadLink: 'https://www.mediafire.com/file/dxllo4cwn2yqq8p/'
            },
            'prototype': {
                title: 'Prototype',
                category: 'Acción',
                rating: '4.5',
                release: '9 Jun 2009',
                description: 'Prototype es un juego de acción en mundo abierto donde controlas a Alex Mercer, un hombre que despierta sin recuerdos pero con poderes superhumanos. Ambientado en una versión ficticia de Nueva York infectada por un virus mortal, el juego te permite usar las impresionantes habilidades de Alex para trepar edificios, transformar partes de tu cuerpo en armas letales, consumir enemigos para ganar sus recuerdos y habilidades, y sembrar el caos a través de la ciudad.',
                features: [
                    'Libertad de movimiento sin precedentes en un entorno urbano',
                    'Poderes y habilidades únicas que evolucionan a lo largo del juego',
                    'Sistema de combate fluido y espectacular',
                    'Misiones principales y secundarias variadas',
                    'Historia de ciencia ficción con giros inesperados'
                ],
                version: '1.0',
                size: '5 GB',
                updated: '12 Dec 2023',
                developer: 'Radical Entertainment',
                publisher: 'Activision',
                releaseDate: '9 Jun 2009',
                mode: 'Un jugador',
                language: 'Español, Inglés, Francés, Alemán',
                downloadLink: 'https://www.mediafire.com/file/5jvux1z0hh77etk/Prototype.rar/file?dkey=0ucldy502tf&r=1272'
            },
            'narutostorm': {
                title: 'Naruto Storm',
                category: 'Acción, Lucha',
                rating: '4.7',
                release: '5 Feb 2013',
                description: 'Naruto Storm es un juego de lucha basado en la popular serie de anime y manga Naruto. Con gráficos cel-shading que recrean fielmente el estilo visual del anime, el juego permite a los jugadores controlar a sus personajes favoritos en batallas espectaculares. Cuenta con un amplio roster de personajes, cada uno con sus propias técnicas ninja y jutsu definitivos, y ofrece tanto un modo historia que sigue la trama original como un competitivo modo multijugador.',
                features: [
                    'Gráficos cel-shading que capturan la esencia del anime',
                    'Más de 100 personajes jugables de la serie',
                    'Batallas ninja dinámicas con movimientos espectaculares',
                    'Modo historia que abarca los principales arcos argumentales',
                    'Modo versus local y online'
                ],
                version: '1.0',
                size: '15 GB',
                updated: '20 Mar 2024',
                developer: 'CyberConnect2',
                publisher: 'Bandai Namco Entertainment',
                releaseDate: '5 Feb 2013',
                mode: 'Un jugador, Multijugador',
                language: 'Español, Inglés, Japonés, Francés, Alemán',
                downloadLink: 'https://www.mediafire.com/file/muwh6baptb5z0c8/SHNASTRE-ADXGames.net.rar/file?dkey=cal7q7h33at&r=1990'
            },
            'partyanimals': {
                title: 'Party Animals',
                category: 'Acción, Multijugador',
                rating: '4.7',
                release: '20 Sep 2023',
                description: 'Party Animals es un divertido juego de lucha multijugador donde controlas adorables criaturas que luchan en entornos interactivos. Con físicas realistas y controles simples pero difíciles de dominar, Party Animals ofrece horas de diversión caótica con amigos, ya sea en línea o en el modo local.',
                features: [
                    'Multijugador en línea y local',
                    'Diversos personajes jugables con apariencias personalizables',
                    'Múltiples modos de juego: Last Stand, Team Score y más',
                    'Físicas realistas que crean situaciones hilarantes',
                    'Entornos interactivos llenos de sorpresas'
                ],
                version: '1.0.3.0',
                size: '3.2 GB',
                updated: '5 Mar 2024',
                developer: 'Recreate Games',
                publisher: 'Source Technology',
                releaseDate: '20 Sep 2023',
                mode: 'Un jugador, Multijugador',
                language: 'Español, Inglés, Francés, Alemán, y más',
                downloadLink: 'https://www.mediafire.com/file/ak1zzeut7q5sba9/Party.Animals.v1.0.3.0.rar/file'
            },
            'littlenightmares': {
                title: 'Little Nightmares',
                category: 'Aventura, Terror',
                rating: '4.8',
                release: '28 Abr 2017',
                description: 'Little Nightmares es un juego de aventura y terror que sumerge a los jugadores en un inquietante mundo donde deberán guiar a Six, una niña con impermeable amarillo, a través de Las Fauces, un misterioso navío habitado por almas corrompidas en busca de su próxima comida. Con una atmósfera opresiva y un diseño visual único, Little Nightmares ofrece una experiencia escalofriante y cautivadora.',
                features: [
                    'Atmósfera inquietante y diseño visual único',
                    'Puzles ingeniosos integrados en el entorno',
                    'Combina elementos de plataformas, sigilo y exploración',
                    'Narrativa contada a través del ambiente y sin diálogos',
                    'Enemigos memorables y perturbadores'
                ],
                version: '1.0',
                size: '4 GB',
                updated: '15 Feb 2024',
                developer: 'Tarsier Studios',
                publisher: 'BANDAI NAMCO Entertainment',
                releaseDate: '28 Abr 2017',
                mode: 'Un jugador',
                language: 'Español, Inglés, Francés, Alemán, Italiano, y más',
                downloadLink: 'https://www.mediafire.com/file/v1qfpsqwohtn3r1/Little_Nightmares.rar/file'
            },
            'halo2': {
                title: 'Halo 2 Online Multiplayer',
                category: 'Acción, Shooter',
                rating: '4.9',
                release: '9 Nov 2004',
                description: 'Halo 2 Online Multiplayer es una versión modificada del clásico Halo 2 centrada en la experiencia multijugador. Este legendario FPS de Bungie continúa la historia del Jefe Maestro y presenta innovaciones que redefinieron el género. Con un enfoque en el multijugador online, esta versión permite disfrutar de los modos competitivos que hicieron famosa a la franquicia, incluyendo los modos Captura la Bandera, Asalto, Asesino y muchos más.',
                features: [
                    'Experiencia multijugador completa con servidores dedicados',
                    'Todos los mapas clásicos de Halo 2',
                    'Múltiples modos de juego que incluyen los favoritos de los fans',
                    'Sistema de rangos y progresión',
                    'Posibilidad de crear partidas personalizadas'
                ],
                version: '1.0',
                size: '5.5 GB',
                updated: '10 Feb 2024',
                developer: 'Bungie',
                publisher: 'Microsoft Game Studios',
                releaseDate: '9 Nov 2004',
                mode: 'Multijugador',
                language: 'Español, Inglés',
                downloadLink: 'https://www.mediafire.com/file/rwxxzfqsj4m7plr/Halo_2_Online_Multiplayer.rar/file'
            },
            'manhunt2': {
                title: 'Manhunt 2',
                category: 'Acción, Terror',
                rating: '4.5',
                release: '29 Oct 2007',
                description: 'Manhunt 2 es un juego de terror y sigilo donde controlas a Daniel Lamb, un paciente que escapa de un asilo mental junto con Leo Kasper, un sociópata peligroso. Con una atmósfera oscura y violenta, el juego desafía a los jugadores a navegar por escenarios peligrosos mientras descubren más sobre su perturbado pasado. Conocido por su controversia debido a su contenido gráfico, Manhunt 2 ofrece una experiencia intensa que combina elementos de terror psicológico y acción.',
                features: [
                    'Narrativa psicológica oscura y perturbadora',
                    'Sistema de sigilo avanzado con ejecuciones contextuales',
                    'Variedad de armas e instrumentos letales',
                    'Ambientación opresiva y diseño de niveles detallado',
                    'Colección completa que incluye contenido adicional'
                ],
                version: 'Collection Edition',
                size: '4.7 GB',
                updated: '20 Mar 2024',
                developer: 'Rockstar London',
                publisher: 'Rockstar Games',
                releaseDate: '29 Oct 2007',
                mode: 'Un jugador',
                language: 'Español, Inglés',
                downloadLink: 'https://www.mediafire.com/file/sis9bum9fhv917x/Manhunt_Collection_Edition.rar/file'
            },
            'legojurassic': {
                title: 'Lego Jurassic World',
                category: 'Aventura, Familiar',
                rating: '4.6',
                release: '10 Jun 2015',
                description: 'LEGO Jurassic World es un videojuego de acción y aventura que recrea las cuatro películas de la saga Jurassic Park. Explora Isla Nublar e Isla Sorna con el humor característico de LEGO mientras revives escenas icónicas y luchas contra dinosaurios feroces.',
                features: [
                    'Juega a través de las cuatro películas de Jurassic Park',
                    'Colecciona ámbar y desbloquea más de 20 especies de dinosaurios jugables',
                    'Personaliza tus propios dinosaurios',
                    'Explora Isla Nublar e Isla Sorna libremente',
                    'Multijugador cooperativo local'
                ],
                version: '1.0',
                size: '6.2 GB',
                updated: '15 Mar 2024',
                developer: 'TT Games',
                publisher: 'Warner Bros. Interactive Entertainment',
                releaseDate: '10 Jun 2015',
                mode: 'Un jugador, Cooperativo local',
                language: 'Español, Inglés, Francés, Alemán, Italiano y más',
                downloadLink: 'https://www.mediafire.com/file/vvfrwatwulz0cr6/L%25CC%25B7e%25CC%25B7g%25CC%25B7o%25CC%25B7_J%25CC%25B7u%25CC%25B7r%25CC%25B7a%25CC%25B7s%25CC%25B7s%25CC%25B7i%25CC%25B7c%25CC%25B7_W%25CC%25B7o%25CC%25B7r%25CC%25B7l%25CC%25B7d%25CC%25B7.rar/file',
                minRequirements: {
                    os: 'Windows 7/8/10 (64-bit)',
                    cpu: 'Intel Core i3-530 2.93GHz / AMD Phenom II X4 940 3.0GHz',
                    ram: '4 GB RAM',
                    gpu: 'NVIDIA GeForce 8800 GS / AMD Radeon HD 3850',
                    directx: 'Versión 11',
                    storage: '10 GB de espacio disponible'
                },
                recRequirements: {
                    os: 'Windows 7/8/10 (64-bit)',
                    cpu: 'Intel Core i5-750 2.67GHz / AMD Phenom II X4 965 3.4GHz',
                    ram: '6 GB RAM',
                    gpu: 'NVIDIA GeForce GTX 550 Ti / AMD Radeon HD 6790',
                    directx: 'Versión 11',
                    storage: '10 GB de espacio disponible'
                }
            },
            'blasphemous': {
                title: 'Blasphemous',
                category: 'Aventura, Plataformas',
                rating: '4.8',
                release: '10 Sep 2019',
                description: 'Blasphemous es un brutal juego de acción y plataformas con elementos RPG ambientado en el retorcido mundo de Cvstodia. Explora un ciclo interminable de muerte y castigo mientras rompes las cadenas de la maldición eterna. Enfréntate a enemigos grotescos y jefes épicos con ataques devastadores.',
                features: [
                    'Combate fluido y brutal',
                    'Mundo interconectado con múltiples rutas',
                    'Historia oscura y profunda',
                    'Arte pixel detallado y atmósfera gótica religiosa',
                    'Sistema de mejora de personaje y habilidades'
                ],
                version: '4.0.67',
                size: '5.7 GB',
                updated: '5 Abr 2024',
                developer: 'The Game Kitchen',
                publisher: 'Team17',
                releaseDate: '10 Sep 2019',
                mode: 'Un jugador',
                language: 'Español, Inglés, Francés, Alemán, Italiano y más',
                downloadLink: 'https://www.mediafire.com/file/i20dlwvqkeorjwq/BPG.v4.0.67.GamezFull.com.rar/file',
                minRequirements: {
                    os: 'Windows 7/8/10',
                    cpu: 'Intel Core i5-2300 2.8GHz / AMD FX-6300 3.5GHz',
                    ram: '4 GB RAM',
                    gpu: 'NVIDIA GeForce GTX 480 / AMD Radeon HD 5870',
                    directx: 'Versión 10',
                    storage: '2 GB de espacio disponible'
                },
                recRequirements: {
                    os: 'Windows 7/8/10',
                    cpu: 'Intel Core i5-3470 3.2GHz / AMD FX-8350 4.0GHz',
                    ram: '8 GB RAM',
                    gpu: 'NVIDIA GeForce GTX 660 / AMD Radeon HD 7850',
                    directx: 'Versión 11',
                    storage: '2 GB de espacio disponible'
                }
            },
            'raymanorigins': {
                title: 'Rayman Origins',
                category: 'Aventura, Plataformas',
                rating: '4.7',
                release: '15 Nov 2011',
                description: 'Rayman Origins es un juego de plataformas en 2D que regresa a las raíces de la serie. Con un vibrante estilo artístico dibujado a mano y un humor característico, Rayman y sus amigos deben salvar el Claro de los Sueños de las pesadillas que lo están invadiendo. Disfruta de más de 60 niveles llenos de plataformas, combate y recolección.',
                features: [
                    'Hasta 4 jugadores en multijugador cooperativo local',
                    'Niveles variados con diferentes mecánicas de juego',
                    'Gráficos 2D dibujados a mano en alta definición',
                    'Música original y divertida',
                    'Diversos personajes jugables'
                ],
                version: '1.0',
                size: '4.3 GB',
                updated: '20 Feb 2024',
                developer: 'Ubisoft Montpellier',
                publisher: 'Ubisoft',
                releaseDate: '15 Nov 2011',
                mode: 'Un jugador, Cooperativo local (hasta 4 jugadores)',
                language: 'Español, Inglés, Francés, Alemán, Italiano y más',
                downloadLink: 'https://www.mediafire.com/file/cdmg3x7jiggn54l/Rayman_Origins.rar/file',
                minRequirements: {
                    os: 'Windows XP/Vista/7',
                    cpu: 'Intel Pentium IV 3.0GHz / AMD Athlon 64 3000+',
                    ram: '1 GB RAM (2 GB para Windows Vista/7)',
                    gpu: 'NVIDIA GeForce 6800GT / ATI Radeon X1950 Pro (256MB VRAM)',
                    directx: 'Versión 9.0c',
                    storage: '4.5 GB de espacio disponible'
                },
                recRequirements: {
                    os: 'Windows 7 (64-bit)',
                    cpu: 'Intel Core 2 Duo E6700 2.66GHz / AMD Athlon 64 X2 6000+',
                    ram: '2 GB RAM',
                    gpu: 'NVIDIA GeForce GTX 260 / ATI Radeon HD 4850',
                    directx: 'Versión 9.0c',
                    storage: '4.5 GB de espacio disponible'
                }
            },
            'southpark': {
                title: 'South Park: The Stick of Truth',
                category: 'Aventura, RPG',
                rating: '4.5',
                release: '4 Mar 2014',
                description: 'South Park: The Stick of Truth es un juego de rol desarrollado por Obsidian Entertainment en colaboración con los creadores de South Park. Como "el chico nuevo", debes ayudar a los chicos de South Park en una épica aventura para conseguir el Palo de la Verdad. Con el estilo gráfico característico de la serie y un humor irreverente, te sumergirás en un mundo lleno de referencias a South Park.',
                features: [
                    'Historia escrita y con voces de Trey Parker y Matt Stone',
                    'Gráficos idénticos a la serie animada',
                    'Sistema de combate por turnos con elementos de tiempo',
                    'Explora el pueblo de South Park',
                    'Personaliza a tu personaje con diferentes clases y equipamiento'
                ],
                version: '1.0',
                size: '5.1 GB',
                updated: '10 Abr 2024',
                developer: 'Obsidian Entertainment',
                publisher: 'Ubisoft',
                releaseDate: '4 Mar 2014',
                mode: 'Un jugador',
                language: 'Español, Inglés, Francés, Alemán, Italiano y más',
                downloadLink: 'https://www.mediafire.com/file/m6tbwmyvspejany/South_Park_The_Stick_of_Truth.rar/file',
                minRequirements: {
                    os: 'Windows XP SP3/Vista SP2/7 SP1/8',
                    cpu: 'Intel Pentium Dual-Core E2180 2.0GHz / AMD Athlon 64 X2 3800+',
                    ram: '2 GB RAM',
                    gpu: 'NVIDIA GeForce 8800GT / AMD Radeon HD 3870 (256MB VRAM)',
                    directx: 'Versión 9.0c',
                    storage: '6 GB de espacio disponible'
                },
                recRequirements: {
                    os: 'Windows 7 SP1/8',
                    cpu: 'Intel Core 2 Duo E4600 2.4GHz / AMD Athlon 64 X2 5600+',
                    ram: '4 GB RAM',
                    gpu: 'NVIDIA GeForce GTX 260 / AMD Radeon HD 4890',
                    directx: 'Versión 9.0c',
                    storage: '6 GB de espacio disponible'
                }
            },
            'saintsrow2': {
                title: 'Saints Row 2',
                category: 'Aventura, Acción',
                rating: '4.4',
                release: '14 Oct 2008',
                description: 'Saints Row 2 es un juego de acción y aventura en mundo abierto que continúa la historia del líder de los Saints, quien despierta de un coma para encontrar que su pandilla ha sido derrotada. Ambientado en la ciudad ficticia de Stilwater, deberás reconstruir tu pandilla y reclamar las calles de tus rivales. Con un mundo abierto completamente personalizable y un modo cooperativo, ofrece innumerables horas de juego.',
                features: [
                    'Mundo abierto con actividades variadas',
                    'Personaje completamente personalizable',
                    'Multiplayer cooperativo en línea',
                    'Combate a pie y en vehículos',
                    'Bandas rivales con estilos distintivos'
                ],
                version: '1.0',
                size: '8.2 GB',
                updated: '25 Mar 2024',
                developer: 'Volition',
                publisher: 'THQ',
                releaseDate: '14 Oct 2008',
                mode: 'Un jugador, Multijugador cooperativo',
                language: 'Español, Inglés, Francés, Alemán, Italiano',
                downloadLink: 'https://www.mediafire.com/file/nxj3szjbqz93koz/Saints_Row_2.rar/file',
                minRequirements: {
                    os: 'Windows XP/Vista',
                    cpu: 'Intel Pentium 4 3.0GHz / AMD Athlon 64 3200+',
                    ram: '2 GB RAM',
                    gpu: 'NVIDIA GeForce 7800GT / ATI Radeon X1800',
                    directx: 'Versión 9.0c',
                    storage: '10 GB de espacio disponible'
                },
                recRequirements: {
                    os: 'Windows Vista/7',
                    cpu: 'Intel Core 2 Duo 2.4GHz / AMD Athlon 64 X2 4600+',
                    ram: '3 GB RAM',
                    gpu: 'NVIDIA GeForce 8800GT / ATI Radeon HD 3850',
                    directx: 'Versión 9.0c',
                    storage: '10 GB de espacio disponible'
                }
            },
            // Default game data if ID not found
            'default': {
                title: 'Juego no encontrado',
                category: 'N/A',
                rating: '0.0',
                release: 'N/A',
                description: 'La información de este juego no está disponible.',
                features: ['No hay características disponibles'],
                version: 'N/A',
                size: 'N/A',
                updated: 'N/A',
                developer: 'N/A',
                publisher: 'N/A',
                releaseDate: 'N/A',
                mode: 'N/A',
                language: 'N/A',
                downloadLink: '#'
            }
        };
        
        // Get game data or use default if not found
        const data = gameData[gameId] || gameData['default'];
        
        // Update page with game data
        document.getElementById('game-title').textContent = data.title;
        document.getElementById('game-category').textContent = data.category;
        document.getElementById('game-rating').innerHTML = `<i class="fas fa-star"></i> ${data.rating}`;
        document.getElementById('game-release').textContent = data.release;
        document.getElementById('game-description-text').textContent = data.description;
        
        // Update features list
        const featuresList = document.getElementById('game-features-list');
        featuresList.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Update sidebar info
        document.getElementById('game-version').textContent = data.version;
        document.getElementById('game-size').textContent = data.size;
        document.getElementById('game-updated').textContent = data.updated;
        document.getElementById('game-developer').textContent = data.developer;
        document.getElementById('game-publisher').textContent = data.publisher;
        document.getElementById('game-release-date').textContent = data.releaseDate;
        document.getElementById('game-mode').textContent = data.mode;
        document.getElementById('game-language').textContent = data.language;
        
        // Update download link
        const downloadBtn = document.querySelector('.download-box .btn-full');
        if (downloadBtn) {
            downloadBtn.href = data.downloadLink;
        }
        
        // Update online files link if available
        const onlineFilesBtn = document.querySelector('.download-box .btn-full:nth-child(4)');
        if (onlineFilesBtn && data.onlineFilesLink) {
            onlineFilesBtn.href = data.onlineFilesLink;
            onlineFilesBtn.style.display = 'block';
        } else if (onlineFilesBtn) {
            onlineFilesBtn.style.display = 'none';
        }
        
        // Update title
        document.title = `${data.title} - Bit a Bit`;
        
        // Update hero background based on game
        const heroBg = document.getElementById('game-hero-bg');
        switch(gameId) {
            case 'schedule':
                heroBg.style.background = 'linear-gradient(to right, rgba(8, 10, 16, 0.7), rgba(8, 10, 16, 0.5)), url("https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/3164500/3a542c825f36b33cd1f8fe51d28ed5eee7abc75d/capsule_616x353.jpg?t=1742853609") center/cover no-repeat';
                break;
            case 'gta4':
                heroBg.style.background = 'linear-gradient(to right, rgba(8, 10, 16, 0.7), rgba(8, 10, 16, 0.5)), url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/12210/capsule_616x353.jpg?t=1721061564") center/cover no-repeat';
                break;
            case 'lastofus':
                heroBg.style.background = 'linear-gradient(to right, rgba(8, 10, 16, 0.7), rgba(8, 10, 16, 0.5)), url("https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png") center/cover no-repeat';
                break;
            case 'modernwarfare2':
                heroBg.style.background = 'linear-gradient(to right, rgba(8, 10, 16, 0.7), rgba(8, 10, 16, 0.5)), url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/10180/capsule_616x353.jpg?t=1654809646") center/cover no-repeat';
                break;
            case 'darksouls':
                heroBg.style.background = 'linear-gradient(to right, rgba(8, 10, 16, 0.7), rgba(8, 10, 16, 0.5)), url("https://e.snmc.io/lk/gv/x/fdfe79f1302449ddb53f6db81e6cac76/7469616") center/cover no-repeat';
                break;
            case 'partyanimals':
                heroBg.style.background = 'linear-gradient(to right, rgba(8, 10, 16, 0.7), rgba(8, 10, 16, 0.5)), url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1260320/capsule_616x353.jpg?t=1741588032") center/cover no-repeat';
                break;
            case 'manhunt2':
                heroBg.style.background = 'linear-gradient(to right, rgba(8, 10, 16, 0.7), rgba(8, 10, 16, 0.5)), url("https://assets-prd.ignimgs.com/2022/01/04/manhunt-2-button-1641281784696.jpg") center/cover no-repeat';
                break;
            case 'theforest':
                heroBg.style.background = 'linear-gradient(to right, rgba(8, 10, 16, 0.7), rgba(8, 10, 16, 0.5)), url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/242760/header.jpg?t=1699381053") center/cover no-repeat';
                break;
            default:
                heroBg.style.background = 'linear-gradient(to right, rgba(6, 10, 20, 0.9), rgba(6, 10, 20, 0.7)), radial-gradient(circle at center, #3a0ca3, #10131b)';
        }
        
        // Update system requirements if available
        if (data.minRequirements) {
            document.getElementById('min-os').textContent = data.minRequirements.os;
            document.getElementById('min-cpu').textContent = data.minRequirements.cpu;
            document.getElementById('min-ram').textContent = data.minRequirements.ram;
            document.getElementById('min-gpu').textContent = data.minRequirements.gpu;
            document.getElementById('min-directx').textContent = data.minRequirements.directx;
            document.getElementById('min-storage').textContent = data.minRequirements.storage;
        }
        
        if (data.recRequirements) {
            document.getElementById('rec-os').textContent = data.recRequirements.os;
            document.getElementById('rec-cpu').textContent = data.recRequirements.cpu;
            document.getElementById('rec-ram').textContent = data.recRequirements.ram;
            document.getElementById('rec-gpu').textContent = data.recRequirements.gpu;
            document.getElementById('rec-directx').textContent = data.recRequirements.directx;
            document.getElementById('rec-storage').textContent = data.recRequirements.storage;
        }
    }
    
    // Load game data
    loadGameData();
    
    // Load More Reviews Button
    const loadMoreReviewsBtn = document.querySelector('#user-reviews .btn-load-more');
    
    loadMoreReviewsBtn.addEventListener('click', function() {
        this.textContent = 'Cargando...';
        
        // Simulate loading delay
        setTimeout(() => {
            // Add two more reviews
            const reviewsContainer = document.getElementById('user-reviews');
            
            const newReviews = `
                <div class="review">
                    <div class="review-header">
                        <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='50' height='50'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23457b9d'/%3E%3Cpath d='M30 35h40v5H30zM30 45h40v5H30zM30 55h40v5H30z' fill='%23f8f9fa'/%3E%3C/svg%3E" alt="Usuario" class="user-avatar">
                        <div>
                            <h4>Miguel Rodríguez</h4>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                            <span class="review-date">10 de julio, 2023</span>
                        </div>
                    </div>
                    <p class="review-text">El juego tiene buena jugabilidad, pero encontré varios bugs que afectan la experiencia. Los gráficos son buenos pero no tan impresionantes como esperaba.</p>
                </div>
                <div class="review">
                    <div class="review-header">
                        <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='50' height='50'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23ffb703'/%3E%3Cpath d='M30 35h40v5H30zM30 45h40v5H30zM30 55h40v5H30z' fill='%23f8f9fa'/%3E%3C/svg%3E" alt="Usuario" class="user-avatar">
                        <div>
                            <h4>Ana Martínez</h4>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <span class="review-date">5 de julio, 2023</span>
                        </div>
                    </div>
                    <p class="review-text">¡Absolutamente maravilloso! La narrativa es impecable y los personajes son memorables. La ambientación y la música crean una atmósfera perfecta. Recomendado 100%.</p>
                </div>
            `;
            
            // Insert before the button
            this.insertAdjacentHTML('beforebegin', newReviews);
            
            // Update button text and disable it
            this.textContent = 'No hay más reseñas';
            this.disabled = true;
            this.style.opacity = 0.5;
        }, 1500);
    });
    
    // Image gallery (for screenshots)
    const screenshots = document.querySelectorAll('.screenshot');
    
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('click', function() {
            // This would typically open a lightbox gallery
            // For demonstration purposes, we'll just add a simple effect
            if (!this.classList.contains('placeholder')) {
                this.classList.toggle('fullscreen');
                if (this.classList.contains('fullscreen')) {
                    this.style.position = 'fixed';
                    this.style.top = '50%';
                    this.style.left = '50%';
                    this.style.transform = 'translate(-50%, -50%)';
                    this.style.width = '80%';
                    this.style.height = '80%';
                    this.style.zIndex = '1000';
                } else {
                    this.style.position = '';
                    this.style.top = '';
                    this.style.left = '';
                    this.style.transform = '';
                    this.style.width = '';
                    this.style.height = '';
                    this.style.zIndex = '';
                }
            }
        });
    });
    
    // Enhanced animations for buttons
    const downloadBtns = document.querySelectorAll('.btn-download');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(247, 37, 133, 0.6)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});