const GameState = {
    timer: 90,
    maxTimer: 90,
    interval: null,
    countdown: 5,
    countdownInterval: null,
    level: 3,
    activeBlock: 1, // Default focus on first editable
    numColors: 5,   // User selectable
    colors: [],
    targetScheme: 'COMPLEMENTARY',
    isSampling: false
};

// ... existing DOM refs ...
const landing = document.getElementById('chroma-landing');
const app = document.getElementById('chroma-app');
const startBtn = document.getElementById('start-btn');
const resultOverlay = document.getElementById('result-overlay');
const resultBackBtn = document.getElementById('result-back-btn');
const gameBackBtn = document.getElementById('game-back-btn');

const canvas = document.getElementById('color-wheel-canvas');
const ctx = canvas.getContext('2d');
const handle = document.getElementById('color-wheel-handle');

const hueThumb = document.getElementById('hue-thumb');
const satThumb = document.getElementById('sat-thumb');
const litThumb = document.getElementById('lit-thumb');
const satTrack = document.getElementById('sat-track');
const hexInput = document.getElementById('hex-input');

// Define schemes with difficulty weights
const SCHEMES = {
    'COMPLEMENTARY': { name: 'Complementary', offsets: [180], weight: 1.2 },
    'ANALOGOUS': { name: 'Analogous', offsets: [-60, -30, 30, 60], weight: 1.1 },
    'TRIADIC': { name: 'Triadic', offsets: [120, 240], weight: 1.4 },
    'SPLIT_COMPLEMENTARY': { name: 'Split-Complementary', offsets: [150, 210], weight: 1.4 },
    'TETRADIC': { name: 'Tetradic', offsets: [90, 180, 270], weight: 1.6 },
    'MONOCHROMATIC': { name: 'Monochromatic', offsets: [0], weight: 1.0 }
};

// ... navigation logic stays the same ...
startBtn.addEventListener('click', () => {
    landing.style.opacity = '0';
    setTimeout(() => {
        landing.style.display = 'none';
        app.style.display = 'flex';
        document.body.classList.add('game-active');
        initGame();
        updateLiveHarmonyUI();
    }, 500);
});

function backToLanding() {
    resultOverlay.classList.add('hidden');
    app.style.display = 'none';
    document.body.classList.remove('game-active');
    landing.style.display = 'flex';
    setTimeout(() => { landing.style.opacity = '1'; }, 10);
    clearInterval(GameState.interval);
    if (GameState.countdownInterval) {
        clearInterval(GameState.countdownInterval);
        GameState.countdownInterval = null;
    }
    const overlay = document.getElementById('countdown-overlay');
    if (overlay) overlay.classList.add('hidden');

    // Kick the dots to ensure they resume cursor tracking
    if (window._landingGrid) {
        window._landingGrid.inView = true;
        window._landingGrid.resize();
    }
}

resultBackBtn.addEventListener('click', backToLanding);
if (gameBackBtn) gameBackBtn.addEventListener('click', backToLanding);

function initGame() {
    // Clean timer values map based on color count
    const timerMap = {
        3: 45,
        4: 60,
        5: 90,
        6: 120,
        7: 150,
        8: 180
    };
    GameState.maxTimer = timerMap[GameState.numColors] || 60;
    GameState.timer = GameState.maxTimer;

    // Pick random target scheme
    const keys = Object.keys(SCHEMES);
    GameState.targetScheme = keys[Math.floor(Math.random() * keys.length)];

    // Generate colors based on numColors
    GameState.colors = Array.from({ length: GameState.numColors }, () => ({
        h: Math.floor(Math.random() * 360),
        s: 40 + Math.random() * 50,
        l: 30 + Math.random() * 40
    }));

    // Inject blocks into DOM
    const stage = document.getElementById('chroma-stage');
    if (stage) {
        stage.innerHTML = '';
        GameState.colors.forEach((col, idx) => {
            const section = document.createElement('section');
            section.className = `color-block ${idx === 0 ? 'locked' : 'editable'}`;
            section.id = `block-${idx}`;

            const badgeClass = idx === 0 ? 'lock-badge' : 'edit-badge';
            const badgeText = idx === 0 ? 'Base Color' : 'Editing';
            const icon = idx === 0 ?
                `<svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.31548 6.27539C8.31548 6.25402 8.29825 6.23679 8.27688 6.23679H2.11765C2.09628 6.23679 2.07905 6.25402 2.07905 6.27539V9.66279C2.07905 9.68416 2.09628 9.7014 2.11765 9.7014H8.27688C8.29825 9.7014 8.31548 9.68416 8.31548 9.66279V6.27539ZM6.58318 3.46496C6.58318 2.69957 5.96264 2.07909 5.19727 2.07905C4.43185 2.07905 3.81135 2.69954 3.81135 3.46496V4.15774H6.58318V3.46496ZM8.66188 4.19319C9.64752 4.37427 10.3945 5.2374 10.3945 6.27539V9.66279C10.3945 10.8323 9.44638 11.7804 8.27688 11.7804H2.11765C0.948154 11.7804 0 10.8323 0 9.66279V6.27539C0 5.23752 0.746829 4.3744 1.7323 4.19319V3.46496C1.7323 1.55141 3.28372 0 5.19727 0C7.11077 4.74165e-05 8.66188 1.55144 8.66188 3.46496V4.19319Z" fill="currentColor"/></svg>` :
                `<svg viewBox="0 0 22 22" fill="currentColor" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M14.5107 0.741244C15.4994 -0.246946 17.1033 -0.247217 18.0918 0.741244L20.3262 2.9766C21.3146 3.96524 21.3147 5.56908 20.3262 6.55765L6.55664 20.3243C6.08107 20.8011 5.43642 21.0664 4.7666 21.0664H1.2002C0.537459 21.0664 8.24506e-06 20.529 0 19.8662V16.2998C0 15.6291 0.266068 14.9836 0.744141 14.5078L11.9971 3.25394C12.0042 3.24645 12.0112 3.23883 12.0186 3.23148C12.0259 3.22413 12.0335 3.21711 12.041 3.20999L14.5107 0.741244ZM16.3945 2.43851C16.3432 2.38716 16.2584 2.38715 16.207 2.43851L14.5645 4.08011L16.9854 6.50199L18.6289 4.86038C18.6802 4.80907 18.6801 4.72525 18.6289 4.67386L16.3945 2.43851ZM2.40039 18.666H4.7666C4.80233 18.666 4.83456 18.6519 4.85742 18.6289L15.2891 8.19827L12.8672 5.77738L2.4375 16.209C2.41451 16.2319 2.40039 16.2641 2.40039 16.2998V18.666Z"/></svg>`;

            const dragHandle = idx > 0 ? `
                <div class="drag-handle">
                    <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.33684 0C6.43077 2.99358e-05 6.52116 0.0148208 6.60735 0.0390625C6.61152 0.0402434 6.61588 0.040756 6.62004 0.0419922C6.79099 0.0925067 6.94205 0.187436 7.06145 0.313477L12.3759 5.62598C12.7664 6.01633 12.767 6.64944 12.3769 7.04004C11.9864 7.4306 11.3524 7.43145 10.9618 7.04102L7.33684 3.41602V19.915L10.9618 16.29C11.3523 15.8996 11.9854 15.8997 12.3759 16.29C12.7664 16.6806 12.7664 17.3136 12.3759 17.7041L7.0761 23.0039C6.89321 23.2055 6.63044 23.3329 6.33684 23.333C6.17937 23.333 6.03087 23.2953 5.89836 23.2305C5.88672 23.2248 5.87466 23.22 5.86321 23.2139C5.85316 23.2085 5.84374 23.202 5.83391 23.1963C5.78876 23.1701 5.74451 23.1413 5.70305 23.1074C5.69039 23.097 5.67905 23.0852 5.66692 23.0742C5.65397 23.0626 5.64033 23.0515 5.62785 23.0391L0.292893 17.7041C-0.0976309 17.3136 -0.0976311 16.6806 0.292893 16.29C0.683417 15.8995 1.31643 15.8995 1.70696 16.29L5.33684 19.9199V3.41113L1.70696 7.04102C1.31636 7.43125 0.683289 7.43053 0.292893 7.04004C-0.0975082 6.64946 -0.0976554 6.01643 0.292893 5.62598L5.62785 0.292969L5.70305 0.224609C5.82855 0.122136 5.97334 0.0557745 6.12395 0.0234375C6.12788 0.0225858 6.13172 0.0213131 6.13567 0.0205078C6.15185 0.0172361 6.16819 0.0151602 6.18449 0.0126953C6.22481 0.0065384 6.26579 0.00314277 6.30754 0.00195312C6.31667 0.0017073 6.32576 0.000973886 6.33489 0.000976562L6.33684 0Z" fill="currentColor"/>
                    </svg>
                </div>
            ` : '';

            section.innerHTML = `
                ${dragHandle}
                <div class="block-badge ${badgeClass}">${icon}<span class="badge-text">${badgeText}</span></div>
                <div class="block-label" id="label-${idx}">#000000</div>
            `;
            stage.appendChild(section);
            section.onclick = () => {
                if (GameState.isSampling) {
                    sampleColorFromBlock(idx);
                } else if (idx > 0) {
                    selectBlock(idx);
                }
            };
        });

        // Initialize Sortable
        if (GameState.sortable) {
            GameState.sortable.destroy();
        }
        GameState.sortable = new Sortable(stage, {
            handle: '.drag-handle',
            animation: 150,
            filter: '.locked',
            onMove: function (evt) {
                return evt.related.className.indexOf('locked') === -1;
            },
            onEnd: function (evt) {
                const item = GameState.colors.splice(evt.oldIndex, 1)[0];
                GameState.colors.splice(evt.newIndex, 0, item);
                
                // Fix IDs and handlers based on new DOM order
                const sections = stage.querySelectorAll('.color-block');
                sections.forEach((sec, newIdx) => {
                    sec.id = `block-${newIdx}`;
                    sec.querySelector('.block-label').id = `label-${newIdx}`;
                    sec.onclick = () => {
                        if (GameState.isSampling) {
                            sampleColorFromBlock(newIdx);
                        } else if (newIdx > 0) {
                            selectBlock(newIdx);
                        }
                    };
                });
                
                // Fix selectedBlock tracking
                if (GameState.activeBlock === evt.oldIndex) {
                    GameState.activeBlock = evt.newIndex;
                } else if (GameState.activeBlock > evt.oldIndex && GameState.activeBlock <= evt.newIndex) {
                    GameState.activeBlock--;
                } else if (GameState.activeBlock < evt.oldIndex && GameState.activeBlock >= evt.newIndex) {
                    GameState.activeBlock++;
                }
                
                updateBlocksUI();
            }
        });
    }

    updateBlocksUI();
    drawColorWheel();
    // Delay selectBlock(1) and inject CSS variable for positioning
    document.getElementById('chroma-app').style.setProperty('--num-colors', GameState.numColors);
    startCountdown();

    const schemeName = SCHEMES[GameState.targetScheme].name;
    const schemeEl = document.getElementById('scheme-name-header');
    if (schemeEl) schemeEl.innerText = `${schemeName.toUpperCase()}`;
}

function playBeep(freq = 440, duration = 0.1) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) { /* Audio blocked or not supported */ }
}

function startTimer() {
    if (GameState.interval) clearInterval(GameState.interval);

    const timerEl = document.querySelector('.timer-text');
    timerEl.style.color = ''; // Reset color
    
    // Use deciseconds for 1 decimal point precision
    let ds = Math.round(GameState.timer * 10);
    
    const fmt = (decisecs) => {
        return (decisecs / 10).toFixed(1);
    };

    timerEl.innerText = fmt(ds);

    let lastBeep = -1;

    GameState.interval = setInterval(() => {
        ds--;
        
        if (ds <= 0) {
            ds = 0;
            timerEl.innerText = '0.0';
            clearInterval(GameState.interval);
            showResults();
            return;
        }

        const secs = ds / 10;
        GameState.timer = secs;
        timerEl.innerText = fmt(ds);

        // Visual alert for last 10 seconds
        if (secs <= 10) {
            timerEl.style.color = '#C66060';
        }

        // 3 beeps for last 3 seconds (3.0, 2.0, 1.0)
        if (secs <= 3 && secs > 0 && Number.isInteger(secs) && secs !== lastBeep) {
            playBeep(440, 0.08); // Higher pitch, short beep
            lastBeep = secs;
        }
    }, 100);
}

function startCountdown() {
    const overlay = document.getElementById('countdown-overlay');
    const numEl = document.getElementById('countdown-number');
    const skipBtn = document.getElementById('skip-countdown-btn');

    if (!overlay || !numEl) return;

    const updateMaskPosition = () => {
        const controls = document.querySelector('.chroma-controls');
        const firstBlock = document.getElementById('block-0');
        if (!controls || !firstBlock) return;

        const controlsRect = controls.getBoundingClientRect();
        const firstBlockRect = firstBlock.getBoundingClientRect();

        overlay.style.setProperty('--controls-h', `${controlsRect.height}px`);

        const isVertical = window.innerWidth <= 768;
        if (isVertical) {
            overlay.style.setProperty('--mask-top', `${firstBlockRect.bottom}px`);
            overlay.style.setProperty('--mask-left', `0px`);
        } else {
            // Include header height (firstBlockRect.top usually begins right below header)
            overlay.style.setProperty('--mask-top', `${firstBlockRect.top}px`);
            overlay.style.setProperty('--mask-left', `${firstBlockRect.right}px`);
        }
        overlay.style.setProperty('--mask-bottom', `${controlsRect.height}px`);
    };

    updateMaskPosition();
    window.addEventListener('resize', updateMaskPosition);
    GameState._maskResizeHandler = updateMaskPosition;


    // Synchronize header timer to show the upcoming game's duration
    const timerText = document.querySelector('.timer-text');
    if (timerText) {
        timerText.innerText = GameState.timer.toFixed(1);
        timerText.style.color = ''; // Ensure normal color during countdown
    }

    GameState.countdown = 10;
    numEl.innerText = GameState.countdown;
    overlay.classList.remove('hidden');

    if (GameState.countdownInterval) clearInterval(GameState.countdownInterval);

    skipBtn.onclick = skipCountdown;

    GameState.countdownInterval = setInterval(() => {
        GameState.countdown--;
        if (GameState.countdown <= 0) {
            skipCountdown();
        } else {
            numEl.innerText = GameState.countdown;
        }
    }, 1000);
}

function skipCountdown() {
    const overlay = document.getElementById('countdown-overlay');
    if (overlay) overlay.classList.add('hidden');
    if (GameState.countdownInterval) {
        clearInterval(GameState.countdownInterval);
        GameState.countdownInterval = null;
    }
    if (GameState._maskResizeHandler) {
        window.removeEventListener('resize', GameState._maskResizeHandler);
        GameState._maskResizeHandler = null;
    }
    selectBlock(1);
    startTimer();
}

// ... drawColorWheel, updateBlocksUI, selectBlock, updateControlsFromState, setupEvents, handleWheel, renderResultGraph ...
function drawColorWheel() {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2;
    const currentSat = GameState.colors[GameState.activeBlock].s;

    const imgData = ctx.createImageData(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= radius) {
                let angle = Math.atan2(dy, dx) * (180 / Math.PI);
                if (angle < 0) angle += 360;
                const lightness = 1.0 - (distance / radius);
                const c = chroma.hsl(angle, currentSat / 100, lightness).rgb();
                const i = (y * width + x) * 4;
                imgData.data[i] = c[0];
                imgData.data[i + 1] = c[1];
                imgData.data[i + 2] = c[2];
                imgData.data[i + 3] = 255;
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function updateBlocksUI() {
    GameState.colors.forEach((col, idx) => {
        const chromaCol = chroma.hsl(col.h, col.s / 100, col.l / 100);
        const hex = chromaCol.hex();
        const block = document.getElementById(`block-${idx}`);
        const label = document.getElementById(`label-${idx}`);

        if (block) {
            block.style.backgroundColor = hex;
            const isDark = chromaCol.luminance() < 0.35;
            const contentColor = isDark ? '#FFFFFF' : '#000000';
            block.style.color = contentColor;
            block.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

            const badges = block.querySelectorAll('.block-badge, .block-label');
            badges.forEach(el => {
                el.style.color = contentColor;
                el.style.borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
            });

            const icons = block.querySelectorAll('svg');
            icons.forEach(icon => icon.style.fill = contentColor);
        }
        if (label) label.innerText = hex.toUpperCase();
    });
    updateLiveHarmonyUI();
}

/**
 * Per-offset coverage score for classification only.
 * For each required angle in the scheme, find the BEST matching player color.
 * A scheme wins when its required angles are COVERED — not just when colors are "somewhere near" one of them.
 * This correctly disambiguates Complementary (1 target at 180°) from Split-Complementary (2 targets at 150°/210°).
 */
function classifyCoverage(playerColors, seedColor, scheme) {
    const targetOffsets = scheme.offsets;
    let totalCoverage = 0;

    targetOffsets.forEach(offset => {
        const targetHue = (seedColor.h + offset + 360) % 360;
        let minDist = 360;
        playerColors.forEach(col => {
            const dist = getShortestHueDist(col.h, targetHue);
            if (dist < minDist) minDist = dist;
        });
        // Balanced decay: e^(-0.03 * dist)
        totalCoverage += Math.exp(-0.03 * minDist);
    });

    // Normalize by number of offsets so schemes with more offsets don't auto-win
    return (totalCoverage / targetOffsets.length) * 60.0;
}

/**
 * Real-time Harmony Detection for Game Header
 */
function updateLiveHarmonyUI() {
    const players = GameState.colors.slice(1);
    const seed = GameState.colors[0];

    let bestSchemeKey = null;
    let maxScore = -1;

    for (const key in SCHEMES) {
        const score = classifyCoverage(players, seed, SCHEMES[key]);
        if (score > maxScore) {
            maxScore = score;
            bestSchemeKey = key;
        }
    }

    const schemeEl = document.getElementById('scheme-name-header');
    if (!schemeEl) return;

    // Threshold: below ~25 points (≈43% of 60) treat as "no scheme"
    if (maxScore < 25) {
        schemeEl.innerText = 'NO SCHEME FOUND';
        schemeEl.classList.remove('match');
        return;
    }

    const scheme = SCHEMES[bestSchemeKey];
    schemeEl.innerText = `${scheme.name.toUpperCase()} MATCH`;

    if (bestSchemeKey === GameState.targetScheme && maxScore > 55) {
        schemeEl.classList.add('match');
    } else {
        schemeEl.classList.remove('match');
    }
}

function selectBlock(index) {
    if (index === 0) return;
    document.querySelectorAll('.color-block').forEach(b => b.classList.remove('active'));
    const activeBlock = document.getElementById(`block-${index}`);
    if (activeBlock) activeBlock.classList.add('active');
    GameState.activeBlock = index;
    drawColorWheel();
    updateControlsFromState();
}

function updateControlsFromState() {
    const col = GameState.colors[GameState.activeBlock];
    const hexVal = chroma.hsl(col.h, col.s / 100, col.l / 100).hex();

    document.getElementById('hue-val').innerText = `${Math.round(col.h)}°`;
    document.getElementById('sat-val').innerText = `${Math.round(col.s)}%`;
    document.getElementById('lit-val').innerText = `${Math.round(col.l)}%`;

    hueThumb.style.left = `${(col.h / 360) * 100}%`;
    satThumb.style.left = `${col.s}%`;
    satTrack.style.background = `linear-gradient(to right, #808080, ${chroma.hsl(col.h, 1, col.l / 100).hex()})`;

    document.getElementById('lit-thumb').style.left = `${col.l}%`;
    hexInput.value = hexVal.replace('#', '').toUpperCase();

    const maxRadius = canvas.width / 2;
    const distance = maxRadius * (1.0 - (col.l / 100));
    const angleRads = col.h * (Math.PI / 180);
    const centerX = canvas.width / 2;
    const handleX = centerX + (Math.cos(angleRads) * distance);
    const handleY = centerX + (Math.sin(angleRads) * distance);

    handle.style.left = `${(handleX / canvas.width) * 100}%`;
    handle.style.top = `${(handleY / canvas.width) * 100}%`;

    updateLiveHarmonyUI();
}

function setupEvents() {
    // Stepper logic
    const minus = document.getElementById('qty-minus');
    const plus = document.getElementById('qty-plus');
    const valDisplay = document.getElementById('qty-val');

    if (minus && plus && valDisplay) {
        const updateButtons = () => {
            minus.disabled = GameState.numColors <= 3;
            plus.disabled = GameState.numColors >= 8;
        };

        minus.onclick = () => {
            if (GameState.numColors > 3) {
                GameState.numColors--;
                valDisplay.innerText = GameState.numColors;
                updateButtons();
            }
        };
        plus.onclick = () => {
            if (GameState.numColors < 8) {
                GameState.numColors++;
                valDisplay.innerText = GameState.numColors;
                updateButtons();
            }
        };

        // Initial state
        updateButtons();
    }

    // These run once at page load
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.onclick = () => {
            landing.style.opacity = '0';
            setTimeout(() => {
                landing.style.display = 'none';
                app.style.display = 'flex';
                document.body.classList.add('game-active');
                initGame();
                updateLiveHarmonyUI();
            }, 500);
        }; const evalBtn = document.getElementById('evaluate-btn');
        if (evalBtn) {
            evalBtn.onclick = () => {
                clearInterval(GameState.interval);
                showResults();
            };
        }

        const tryAnotherBtn = document.getElementById('try-another-btn');
        if (tryAnotherBtn) {
            tryAnotherBtn.onclick = () => {
                resultOverlay.classList.add('hidden');
                initGame();
            };
        }

        const retryBtn = document.getElementById('retry-btn');
        if (retryBtn) {
            retryBtn.onclick = () => {
                resultOverlay.classList.add('hidden');
                GameState.timer = GameState.maxTimer;
                updateBlocksUI(); drawColorWheel(); startCountdown();
            };
        }

        const quitHomeBtn = document.getElementById('result-back-btn');
        if (quitHomeBtn) quitHomeBtn.onclick = backToLanding;

        let isDraggingWheel = false;
        canvas.onmousedown = (e) => { isDraggingWheel = true; handleWheel(e); };
        canvas.addEventListener('touchstart', (e) => { isDraggingWheel = true; handleWheel(e); }, { passive: true });

        window.addEventListener('mousemove', (e) => { if (isDraggingWheel) handleWheel(e); });
        window.addEventListener('touchmove', (e) => {
            if (isDraggingWheel) {
                if (e.cancelable) e.preventDefault();
                handleWheel(e);
            }
        }, { passive: false });
        window.addEventListener('mouseup', () => { isDraggingWheel = false; });
        window.addEventListener('touchend', () => { isDraggingWheel = false; });

        function setupSlider(trackId, updateCb, redrawCb) {
            let isDragging = false;
            const track = document.getElementById(trackId);
            const processDrag = (e) => {
                const rect = track.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                let percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
                updateCb(percent);
                updateBlocksUI();
                updateControlsFromState();
                updateLiveHarmonyUI();
            };
            track.onmousedown = (e) => { isDragging = true; processDrag(e); };
            track.addEventListener('touchstart', (e) => { isDragging = true; processDrag(e); }, { passive: true });

            window.addEventListener('mousemove', (e) => { if (isDragging) processDrag(e); });
            window.addEventListener('touchmove', (e) => { if (isDragging) processDrag(e); }, { passive: false });
            window.addEventListener('mouseup', () => {
                if (isDragging && redrawCb) redrawCb();
                isDragging = false;
            });
            window.addEventListener('touchend', () => {
                if (isDragging && redrawCb) redrawCb();
                isDragging = false;
            });
        }

        setupSlider('hue-track', (p) => { GameState.colors[GameState.activeBlock].h = (p / 100) * 360; }, () => drawColorWheel());
        setupSlider('sat-track', (p) => { GameState.colors[GameState.activeBlock].s = p; }, () => drawColorWheel());
        setupSlider('lit-track', (p) => { GameState.colors[GameState.activeBlock].l = p; }, () => drawColorWheel());

        hexInput.onchange = (e) => {
            try {
                const valid = chroma(e.target.value);
                const hsl = valid.hsl();
                GameState.colors[GameState.activeBlock] = { h: isNaN(hsl[0]) ? 0 : hsl[0], s: hsl[1] * 100, l: hsl[2] * 100 };
                updateBlocksUI(); drawColorWheel(); updateControlsFromState();
            } catch (err) { updateControlsFromState(); }
        };

        const colorPickerBtn = document.getElementById('color-picker-btn');
        if (colorPickerBtn) {
            if ('EyeDropper' in window) {
                colorPickerBtn.title = 'Pick color from screen';
                colorPickerBtn.addEventListener('click', async () => {
                    try {
                        const eyeDropper = new EyeDropper();
                        const result = await eyeDropper.open();
                        const hsl = chroma(result.sRGBHex).hsl();
                        GameState.colors[GameState.activeBlock] = {
                            h: isNaN(hsl[0]) ? 0 : hsl[0],
                            s: hsl[1] * 100,
                            l: hsl[2] * 100
                        };
                        updateBlocksUI(); drawColorWheel(); updateControlsFromState();
                    } catch (err) {
                        // User cancelled — do nothing
                    }
                });
            } else {
                // Fallback: Internal Sampler for Mobile/Safari/Firefox
                colorPickerBtn.title = 'Sample color from palette';
                colorPickerBtn.addEventListener('click', () => {
                    toggleSamplingMode();
                });
            }
        }
    }
}

function setupMobileCorners() {
    const corners = document.querySelectorAll('.corner');

    corners.forEach(corner => {
        // Skip the back button corner as it's a direct link
        if (corner.classList.contains('tl')) return;

        corner.addEventListener('click', (e) => {
            // Only handle click expansion on mobile/tablet
            if (window.innerWidth > 1024) return;

            // If we click an actual link inside the expanded menu, let it happen
            if (e.target.closest('a') && !e.target.classList.contains('corner')) return;

            const wasExpanded = corner.classList.contains('expanded');

            // Close all other corners
            corners.forEach(c => c.classList.remove('expanded'));

            if (!wasExpanded) {
                corner.classList.add('expanded');
                e.stopPropagation();
            }
        });
    });

    // Close corners when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && !e.target.closest('.corner')) {
            corners.forEach(c => c.classList.remove('expanded'));
        }
    });

    // On mobile, also close when starting game or returning
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            corners.forEach(c => c.classList.remove('expanded'));
        });
    }
}

function toggleSamplingMode() {
    GameState.isSampling = !GameState.isSampling;
    const btn = document.getElementById('color-picker-btn');
    const stage = document.getElementById('chroma-stage');

    if (GameState.isSampling) {
        btn.classList.add('sampling-active');
        stage.classList.add('sampling-mode');
        // Optional: show a small toast or message
    } else {
        btn.classList.remove('sampling-active');
        stage.classList.remove('sampling-mode');
    }
}

function sampleColorFromBlock(index) {
    const colorToCopy = GameState.colors[index];
    GameState.colors[GameState.activeBlock] = { ...colorToCopy };

    updateBlocksUI();
    drawColorWheel();
    updateControlsFromState();
    toggleSamplingMode(); // Exit mode after pick
}

function handleWheel(e) {
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left - centerX;
    const y = clientY - rect.top - centerX;
    let distance = Math.min(centerX, Math.sqrt(x * x + y * y));
    let angle = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
    GameState.colors[GameState.activeBlock].h = angle;
    GameState.colors[GameState.activeBlock].l = (1.0 - (distance / centerX)) * 100;
    updateControlsFromState(); updateBlocksUI();
}

function renderResultGraph() {
    const rCanvas = document.getElementById('result-wheel-canvas');
    const rCtx = rCanvas.getContext('2d');
    const lCanvas = document.getElementById('result-lines-canvas');
    const lCtx = lCanvas.getContext('2d');
    const radius = rCanvas.width / 2;
    const centerX = radius;
    rCtx.clearRect(0, 0, rCanvas.width, rCanvas.height);
    lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);

    const imgData = rCtx.createImageData(rCanvas.width, rCanvas.height);
    for (let y = 0; y < rCanvas.height; y++) {
        for (let x = 0; x < rCanvas.width; x++) {
            const dx = x - centerX; const dy = y - centerX;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= radius) {
                let angle = (Math.atan2(dy, dx) * (180 / Math.PI) + 360) % 360;
                const c = chroma.hsl(angle, 1, 1 - (dist / radius)).rgb();
                const i = (y * rCanvas.width + x) * 4;
                imgData.data[i] = c[0]; imgData.data[i + 1] = c[1]; imgData.data[i + 2] = c[2]; imgData.data[i + 3] = 255;
            }
        }
    }
    rCtx.putImageData(imgData, 0, 0);

    const nodes = GameState.colors.map(col => {
        const dist = radius * (1.0 - (col.l / 100));
        const rads = col.h * (Math.PI / 180);
        return { x: centerX + Math.cos(rads) * dist, y: centerX + Math.sin(rads) * dist, color: chroma.hsl(col.h, col.s / 100, col.l / 100).hex() };
    });
    lCtx.beginPath(); lCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    lCtx.lineWidth = 1;
    nodes.forEach(n => { lCtx.moveTo(centerX, centerX); lCtx.lineTo(n.x, n.y); });
    lCtx.stroke();
    nodes.forEach(n => {
        lCtx.beginPath(); lCtx.arc(n.x, n.y, 7, 0, 2 * Math.PI);
        lCtx.fillStyle = n.color; lCtx.fill();
        lCtx.lineWidth = 1.5; lCtx.strokeStyle = '#fff'; lCtx.stroke();
    });
}

// Scoring Helpers
function getShortestHueDist(h1, h2) {
    const diff = Math.abs(h1 - h2) % 360;
    return diff > 180 ? 360 - diff : diff;
}

function calculateHueScore(playerColors, seedColor, scheme) {
    const targetOffsets = scheme.offsets;
    let discordanceCount = 0;

    const totalHueCohesion = playerColors.map(col => {
        let minDelta = 360;
        targetOffsets.forEach(offset => {
            const targetHue = (seedColor.h + offset + 360) % 360;
            const dist = getShortestHueDist(col.h, targetHue);
            if (dist < minDelta) minDelta = dist;
        });

        // Also check distance to seed itself (allowing shades of seed)
        const seedDist = getShortestHueDist(col.h, seedColor.h);
        if (seedDist < minDelta) minDelta = seedDist;

        // Strict cutoff: If a color is essentially "alien" to the scheme (>45deg from any slot), 
        // it contributes 0 and triggers a massive discordance penalty.
        if (minDelta > 45) {
            discordanceCount++;
            return 0;
        }

        return Math.exp(-0.04 * minDelta);
    });

    // Final Hue Score: Average of block cohesion * discordance penalty
    const avgCohesion = playerColors.length > 0 ? (totalHueCohesion.reduce((a, b) => a + b, 0) / playerColors.length) : 0;
    const discordancePenalty = Math.pow(0.4, discordanceCount); // 60% drop per alien color

    return {
        score: (avgCohesion * discordancePenalty) * 60.0,
        discordanceCount: discordanceCount
    };
}

function getBestMatch(colors) {
    const seed = colors[0];
    const players = colors.slice(1);
    let best = { key: 'MONOCHROMATIC', score: 0, rawHue: 0 };

    Object.keys(SCHEMES).forEach(key => {
        const scheme = SCHEMES[key];
        const hRes = calculateHueScore(players, seed, scheme);
        const sSL = calculateSLScore(players, seed, key === 'MONOCHROMATIC');
        const pU = checkUniquenessPenalty(colors);

        const weighted = Math.min(100, (hRes.score + sSL) * pU);

        if (weighted > best.score) {
            best = {
                key: key,
                score: weighted,
                hueAccuracy: Math.round((hRes.score / 60) * 100),
                slHarmony: Math.round((sSL / 40) * 100),
                name: scheme.name,
                pU: pU,
                discordanceCount: hRes.discordanceCount,
                rawHScore: hRes.score
            };
        }
    });

    return best;
}

function updateLiveHarmonyUI() {
    const best = getBestMatch(GameState.colors);
    const headerEl = document.getElementById('scheme-name-header');
    if (headerEl) {
        headerEl.innerText = `${best.name} ${best.hueAccuracy}%`;
        // Match quality indicators
        if (best.hueAccuracy >= 80) headerEl.style.color = '#ebd9cd';
        else if (best.hueAccuracy >= 50) headerEl.style.color = 'rgba(235, 217, 205, 0.8)';
        else headerEl.style.color = 'rgba(255, 255, 255, 0.5)';
    }
}

function calculateSLScore(playerColors, seedColor, isMonochrome) {
    const n = playerColors.length;
    let totalSLCohesion = 0;

    // Ideal spreading for monochrome
    const monoTargets = [15, 35, 55, 75, 95];

    playerColors.forEach((col, idx) => {
        let dist;
        if (isMonochrome) {
            let nearestLDist = Math.min(...monoTargets.map(t => Math.abs(col.l - t)));
            dist = Math.sqrt(Math.pow((col.s - seedColor.s) * 1.2, 2) + Math.pow(nearestLDist, 2));
        } else {
            const sDiff = (col.s - seedColor.s) * 1.2;
            const lDiff = Math.abs(col.l - seedColor.l);
            const lPenalty = lDiff <= 15 ? (lDiff * 0.4) : (6.0 + (lDiff - 15));
            dist = Math.sqrt(Math.pow(sDiff, 2) + Math.pow(lPenalty, 2));
        }
        // Balanced decay: e^(-0.017 * dist)
        totalSLCohesion += Math.exp(-0.017 * dist);
    });

    return (totalSLCohesion / n) * 40.0;
}

function checkUniquenessPenalty(colors) {
    for (let i = 0; i < colors.length; i++) {
        for (let j = i + 1; j < colors.length; j++) {
            const hDist = getShortestHueDist(colors[i].h, colors[j].h);
            const dist = Math.sqrt(
                Math.pow(hDist, 2) +
                Math.pow(colors[i].s - colors[j].s, 2) +
                Math.pow(colors[i].l - colors[j].l, 2)
            );
            if (dist < 3.0) return 0.8;
        }
    }
    return 1.0;
}

function showResults() {
    try {
        const best = getBestMatch(GameState.colors);
        const { hueAccuracy, slHarmony, pU, discordanceCount } = best;
        const finalScore = best.score.toFixed(1);

        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
        const setStyle = (id, prop, val) => { const el = document.getElementById(id); if (el) el.style[prop] = val; };

        setVal('final-score', finalScore);

        const tagEl = document.getElementById('scheme-tag');
        if (tagEl) {
            // Tightened threshold: Only show tag for clear harmonies (>= 60%)
            if (parseFloat(hueAccuracy) >= 60) {
                tagEl.innerText = best.name.toUpperCase();
                tagEl.style.display = 'inline-block';
            } else {
                tagEl.style.display = 'none';
            }
        }

        setVal('stat-hue', `${hueAccuracy}%`);
        setVal('stat-lum', `${slHarmony}%`);
        setStyle('bar-hue', 'width', `${hueAccuracy}%`);
        setStyle('bar-lum', 'width', `${slHarmony}%`);

        // Secondary stats for the "geeky" feel
        setVal('global-accuracy', `${finalScore}%`);
        setVal('meta-score', (finalScore / 100).toFixed(4));
        setVal('delta-val', (1.0 - (finalScore / 100)).toFixed(2));

        let feedback = "";

        if (finalScore >= 50) {
            if (finalScore >= 90) feedback = "Vibe check: Elite. You're seeing the spectrum on a whole different level. 💎";
            else if (discordanceCount > 0) feedback = "Tight palette, but some of these colors are crashing the party. Keep it harmonious. ⚡";
            else if (hueAccuracy >= 80 && slHarmony < 70) feedback = "Hue placement is cracked, but your saturation and lighting are doing their own thing. 🌈";
            else if (slHarmony >= 80 && hueAccuracy < 70) feedback = "Light and saturation are on point, but your hues drifted off-frequency. 🔊";
            else if (pU < 1.0) feedback = "Solid vibes, but those twin-like colors are killing the depth. Mix it up! 🌀";
            else feedback = "You're catchin' the rhythm. Sharpen those edges and you'll be unstoppable. 🚀";
        } else {
            // Score < 50: Constructive "what went bad"
            if (discordanceCount > 0) feedback = "Absolute chaos. Some of these shades are on a completely different planet. 🪐";
            else if (pU < 1.0) feedback = "Too many clones. Give each block its own soul to juice that score. 👻";
            else if (hueAccuracy < 50 && slHarmony < 50) feedback = "The connection is lost. Hues are misaligned and tones are out of sync. 📡";
            else if (hueAccuracy < 50) feedback = "Hues are way off-base. The harmony is asking for a different frequency. 🎼";
            else feedback = "The vibe is flat—saturation and lighting aren't vibing with the seed. ☁️";
        }

        const resultDesc = document.querySelector('.result-desc');
        if (resultDesc) resultDesc.innerText = feedback;

        renderResultGraph();
        resultOverlay.classList.remove('hidden');
        // Kick the dotted-bg grid — it was hidden at init so IntersectionObserver never fired
        if (window._resultGrid) {
            window._resultGrid.inView = true;
            window._resultGrid.resize();
        }
    } catch (e) { console.error("showResults Error:", e); }
}

/**
 * Ported InteractiveGrid (Sloshy Dots) from Portfolio App.js
 */
class InteractiveGrid {
    constructor(element) {
        this.el = element;
        this.triggerEl = element;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d', { alpha: true });

        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.pointerEvents = "none";
        this.canvas.style.zIndex = "0";

        this.el.style.backgroundImage = "none";
        if (getComputedStyle(this.el).position === 'static') {
            this.el.style.position = "relative";
        }
        this.el.style.overflow = "hidden";

        Array.from(this.el.children).forEach(child => {
            if (getComputedStyle(child).position === 'static') {
                child.style.position = 'relative';
                child.style.zIndex = '1';
            }
        });

        this.el.insertBefore(this.canvas, this.el.firstChild);
        this.triggerEl = this.el;

        // Use a more standard breakpoint for mobile (768px)
        this.isMobile = window.innerWidth <= 768;
        this.spacing = this.isMobile ? 14 : 20;
        this.mouseRadius = 350; // Increased feel
        this.tension = this.isMobile ? 0.015 : 0.03;
        this.dampening = this.isMobile ? 0.85 : 0.92;

        this.mouse = { x: -1000, y: -1000, active: false };
        this.gyro = { bx: 0, gy: 0, vbx: 0, vgy: 0 };
        this.ripples = []; // NEW: Click-based ripples
        this.points = [];
        this.isAnimating = false;
        this.inView = true;

        this.animate = this.animate.bind(this);
        this.resize = this.resize.bind(this);

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.inView = true;
                this.resize(); // Force resize when coming back into view
                if (!this.isAnimating) this.startLoop();
            } else {
                this.inView = false;
            }
        }, { rootMargin: '100px' });
        this.observer.observe(this.el);

        this.resize();
        this.bindEvents();
    }

    resize() {
        const rect = this.el.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.points = [];
        for (let x = 0; x <= this.width + this.spacing; x += this.spacing) {
            for (let y = 0; y <= this.height + this.spacing; y += this.spacing) {
                this.points.push({ ox: x, oy: y, x: x, y: y, vx: 0, vy: 0 });
            }
        }
        if (!this.isAnimating) this.startLoop();
    }

    bindEvents() {
        window.addEventListener('resize', this.resize);

        if (!this.isMobile) {
            window.addEventListener('mousemove', (e) => {
                if (!this.inView) return;
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
                this.mouse.active = true;
                this.startLoop();
            });
            window.addEventListener('mouseleave', () => {
                this.mouse.active = false;
            });
        } else {
            window.addEventListener('deviceorientation', (e) => {
                if (!this.inView) return;
                const nextGx = Math.max(-45, Math.min(45, e.gamma || 0));
                const nextGy = Math.max(-45, Math.min(45, e.beta || 0));

                // Track velocity for slosh
                this.gyro.vbx = (nextGy - this.gyro.bx) * 0.85;
                this.gyro.vgy = (nextGx - this.gyro.gy) * 0.85;
                this.gyro.bx = nextGy;
                this.gyro.gy = nextGx;
                this.startLoop();
            });
        }

        this.triggerEl.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.ripples.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                radius: 0,
                life: 1
            });
            this.startLoop();
        });
        this.triggerEl.addEventListener('touchstart', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.ripples.push({
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top,
                radius: 0,
                life: 1
            });
            this.startLoop();
        }, { passive: true });
    }

    startLoop() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    animate() {
        if (!document.body.contains(this.el) || !this.inView) {
            this.isAnimating = false;
            return;
        }

        let needsUpdate = false;
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i = this.ripples.length - 1; i >= 0; i--) {
            let r = this.ripples[i];
            r.radius += 10;
            r.life -= 0.03;
            if (r.life <= 0) this.ripples.splice(i, 1);
            else needsUpdate = true;
        }

        let forceX_global = (this.gyro.gy / 45) * 1.5;
        let forceY_global = (this.gyro.bx / 45) * 1.5;

        for (let p of this.points) {
            let forceX = 0, forceY = 0;
            let distToMouse = 9999;

            if (!this.isMobile && this.mouse.active) {
                let dx = this.mouse.x - p.ox;
                let dy = this.mouse.y - p.oy;
                distToMouse = Math.sqrt(dx * dx + dy * dy);
                if (distToMouse < this.mouseRadius) {
                    let pull = Math.pow((this.mouseRadius - distToMouse) / this.mouseRadius, 2);
                    forceX += dx * pull * 0.02;
                    forceY += dy * pull * 0.02;
                    needsUpdate = true;
                }
            } else if (this.isMobile) {
                forceX += forceX_global * 0.15;
                forceY += forceY_global * 0.15;

                // Slosh inertia
                forceX += this.gyro.vgy * 0.35;
                forceY += this.gyro.vbx * 0.35;
                needsUpdate = true;
            }

            for (let r of this.ripples) {
                let dx = p.x - r.x;
                let dy = p.y - r.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let thick = 25;
                if (Math.abs(dist - r.radius) < thick) {
                    let push = r.life * ((thick - Math.abs(dist - r.radius)) / thick);
                    forceX += (dx / (dist || 1)) * push * 20;
                    forceY += (dy / (dist || 1)) * push * 20;
                    needsUpdate = true;
                }
            }

            let spX = (p.ox - p.x) * this.tension;
            let spY = (p.oy - p.y) * this.tension;
            forceX += spX;
            forceY += spY;

            p.vx = (p.vx + forceX) * this.dampening;
            p.vy = (p.vy + forceY) * this.dampening;
            p.x += p.vx;
            p.y += p.vy;

            if (Math.abs(p.vx) > 0.05 || Math.abs(p.vy) > 0.05) needsUpdate = true;

            this.ctx.beginPath();
            let size = this.isMobile ? 0.8 : 1.5;
            let opacity = 0.1;

            if (!this.isMobile && distToMouse < this.mouseRadius) {
                let shine = (this.mouseRadius - distToMouse) / this.mouseRadius;
                size += shine * 0.5;
                opacity += shine * 0.2;
            }

            this.ctx.fillStyle = `rgba(235, 217, 205, ${opacity})`;
            this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        if (needsUpdate || (!this.isMobile && this.mouse.active)) {
            requestAnimationFrame(this.animate);
        } else {
            this.isAnimating = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupEvents(); // Initialize event listeners once
    setupMobileCorners(); // Initialize mobile corner expansions

    const grids = {};
    document.querySelectorAll('.dotted-bg').forEach(el => {
        const grid = new InteractiveGrid(el);
        if (el.id) grids[el.id] = grid;
    });
    // Expose grids so we can kick them
    window._resultGrid = grids['result-overlay'] || null;
    window._landingGrid = grids['chroma-landing'] || null;
});
