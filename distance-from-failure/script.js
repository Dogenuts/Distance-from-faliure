document.addEventListener('DOMContentLoaded', () => {
    const debrisField = document.getElementById('debris-field');
    const prologueTextContainer = document.getElementById('prologue-text');
    const continueBtn = document.getElementById('continue-btn');
    const hint = document.getElementById('hint');

    const CHAPTERS = [
        {
            meta: '00. PROLOGUE',
            lines: [
                "The mistake I made was a pattern.",
                "I kept choosing distance from failure.",
                "I could see the tower.",
                "I just didn’t test the path."
            ],
            colors: { top: '#ff7eb3', bottom: '#8e44ad', mist: 'rgba(160, 210, 180, 0.6)', glow: '#4fffcb' },
            scale: 1,
            yOffset: '45%'
        },
        {
            meta: '01. RECOVERY',
            lines: [
                "I stopped running from the echo.",
                "The ground felt solid beneath me.",
                "The tower didn't move.",
                "It waited for my resolve."
            ],
            colors: { top: '#4facfe', bottom: '#00f2fe', mist: 'rgba(200, 255, 230, 0.2)', glow: '#ffffff' },
            scale: 1.3,
            yOffset: '50%'
        },
        {
            meta: '02. ASCENT',
            lines: [
                "The climb is the proof.",
                "Every step is a test of intent.",
                "The air is thin, but clear.",
                "The summit is no longer a dream."
            ],
            colors: { top: '#243b55', bottom: '#141e30', mist: 'rgba(100, 150, 255, 0.1)', glow: '#00d2ff' },
            scale: 2.5,
            yOffset: '70%'
        },
        {
            meta: '03. BRIDGE',
            lines: [
                "A crossing appeared.",
                "Between what was and what will be.",
                "I didn't look back.",
                "The threshold is open."
            ],
            colors: { top: '#f83600', bottom: '#f9d423', mist: 'rgba(255, 200, 100, 0.1)', glow: '#fff' },
            scale: 4,
            yOffset: '90%'
        },
        {
            meta: '04. THE END',
            lines: [
                "I am here.",
                "The distance is zero.",
                "The pattern is broken.",
                "I am the path."
            ],
            colors: { top: '#000000', bottom: '#000000', mist: 'rgba(255, 255, 255, 0.05)', glow: '#fff' },
            scale: 10,
            yOffset: '120%'
        }
    ];

    let currentChapterIndex = 0;
    let proximity = 0;
    let isRevealing = false;
    let revealedStep = -1;
    const debrisList = [];

    // 1. Generate Debris
    const generateDebris = () => {
        const DEBRIS_COUNT = 22;
        for (let i = 0; i < DEBRIS_COUNT; i++) {
            const d = document.createElement('div');
            d.className = 'debris';
            const z = Math.random();
            const size = 4 + z * 24;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const opacity = 0.1 + z * 0.7;
            const blur = (1 - z) * 6;
            
            d.style.width = `${size}px`;
            d.style.height = `${size}px`;
            d.style.left = `${x}%`;
            d.style.top = `${y}%`;
            d.style.opacity = opacity;
            d.style.filter = `blur(${blur}px)`;
            d.style.zIndex = Math.floor(z * 10);
            
            const duration = 12 + Math.random() * 20;
            const delay = Math.random() * -40;
            const style = document.createElement('style');
            const animName = `float-debris-${i}`;
            style.innerHTML = `@keyframes ${animName} { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) rotate(${Math.random() * 720}deg); } }`;
            document.head.appendChild(style);
            d.style.animation = `${animName} ${duration}s ease-in-out infinite alternate`;
            d.style.animationDelay = `${delay}s`;
            debrisField.appendChild(d);
            debrisList.push({ el: d, x, y, z, baseOpacity: opacity });
        }
    };

    // 2. Scene Update
    const updateScene = (index) => {
        const chapter = CHAPTERS[index];
        
        // Update Colors
        document.documentElement.style.setProperty('--sky-top', chapter.colors.top);
        document.documentElement.style.setProperty('--sky-bottom', chapter.colors.bottom);
        document.documentElement.style.setProperty('--mist-color', chapter.colors.mist);
        document.documentElement.style.setProperty('--glow-color', chapter.colors.glow);
        
        // Update Monolith Position/Scale
        const monoliths = document.querySelectorAll('.monolith, .monolith-placeholder');
        monoliths.forEach(m => {
            m.style.transition = 'all 3s cubic-bezier(0.4, 0, 0.2, 1)';
            m.style.top = chapter.yOffset;
            // Scale is handled via --p in CSS, but we can add a base scale if needed
        });

        // Prepare Text
        prologueTextContainer.innerHTML = '';
        const meta = document.createElement('p');
        meta.className = 'line meta';
        meta.textContent = chapter.meta;
        prologueTextContainer.appendChild(meta);

        chapter.lines.forEach(text => {
            const p = document.createElement('p');
            p.className = 'line';
            p.textContent = text;
            prologueTextContainer.appendChild(p);
        });

        isRevealing = false;
        revealedStep = -1;
        continueBtn.classList.remove('visible');
    };

    const revealNextLine = () => {
        const lines = prologueTextContainer.querySelectorAll('.line');
        if (revealedStep < lines.length - 1) {
            revealedStep++;
            lines[revealedStep].classList.add('visible');
            if (revealedStep < lines.length - 1) {
                setTimeout(revealNextLine, 1800);
            } else {
                setTimeout(() => continueBtn.classList.add('visible'), 1500);
            }
        }
    };

    // 3. Interaction
    window.addEventListener('mousemove', (e) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
        document.documentElement.style.setProperty('--my', `${e.clientY}px`);

        const tx = vw * 0.5;
        const ty = vh * 0.45;
        const dx = e.clientX - tx;
        const dy = e.clientY - ty;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(vw, vh) * 0.7;
        proximity = Math.max(0, 1 - dist / maxDist);
        
        const baseRadius = 120;
        const screenDiagonal = Math.sqrt(vw*vw + vh*vh);
        const targetRadius = screenDiagonal * 1.2;
        const currentRadius = baseRadius + (proximity * proximity * (targetRadius - baseRadius));
        
        document.documentElement.style.setProperty('--mask-radius', `${currentRadius}px`);
        document.documentElement.style.setProperty('--p', proximity.toFixed(3));

        // Debris
        debrisList.forEach(d => {
            const pushFactor = proximity * 60 * d.z;
            const angle = Math.atan2(e.clientY - (vh * d.y / 100), e.clientX - (vw * d.x / 100));
            d.el.style.marginLeft = `${-Math.cos(angle) * pushFactor}px`;
            d.el.style.marginTop = `${-Math.sin(angle) * pushFactor}px`;
            d.el.style.opacity = d.baseOpacity * Math.max(0.1, d.z + proximity - 0.5);
        });

        if (proximity > 0.68 && !isRevealing) {
            isRevealing = true;
            revealNextLine();
            hint.style.opacity = '0';
        }
    });

    continueBtn.addEventListener('click', () => {
        if (currentChapterIndex < CHAPTERS.length - 1) {
            // Transition to next chapter
            document.body.style.pointerEvents = 'none';
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.inset = '0';
            overlay.style.background = '#000';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 1.5s ease';
            overlay.style.zIndex = '100';
            document.body.appendChild(overlay);

            setTimeout(() => overlay.style.opacity = '1', 10);
            
            setTimeout(() => {
                currentChapterIndex++;
                updateScene(currentChapterIndex);
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    document.body.style.pointerEvents = 'auto';
                }, 1500);
            }, 1600);
        } else {
            // Final End
            document.body.style.transition = 'opacity 3s ease';
            document.body.style.opacity = '0';
            setTimeout(() => window.location.reload(), 3000);
        }
    });

    // Init
    generateDebris();
    updateScene(0);
});
