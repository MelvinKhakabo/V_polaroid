// =====================================
// OUR MAP · VALENTINE 2026
// Lover Girl · 15 Memories · Empty Frame
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    // ---------- DOM ELEMENTS ----------
    const pins = document.querySelectorAll('.memory-pin');
    const emptyPin = document.querySelector('.empty-frame-pin');
    const recordPlayer = document.getElementById('recordPlayer');
    const audio = document.getElementById('loverGirl');
    const proposalOverlay = document.getElementById('proposalOverlay');
    const heartResponse = document.getElementById('heartResponse');
    
    // ---------- STATE ----------
    let visitedCount = 0;
    const totalPins = 15;
    let isMusicPlaying = false;
    let proposalShown = false;
    
    // ---------- HELPER FUNCTIONS ----------
    function checkAllVisited() {
        if (visitedCount >= totalPins) {
            // Unlock the empty frame
            emptyPin.setAttribute('data-unlocked', 'true');
            emptyPin.classList.add('unlocked');
            
            // Update empty frame caption
            const captionText = emptyPin.querySelector('.empty-caption-text');
            if (captionText) {
                captionText.textContent = 'Ready.';
            }
            
            // Remove locked class
            const emptyPolaroid = emptyPin.querySelector('.empty-polaroid');
            if (emptyPolaroid) {
                emptyPolaroid.classList.remove('locked');
            }
            
            console.log('🎉 All 15 memories visited. Empty frame unlocked.');
        }
    }
    
    function fadeOutMusic() {
        if (!audio) return;
        
        let volume = audio.volume;
        const fadeInterval = setInterval(() => {
            if (volume > 0.05) {
                volume -= 0.05;
                audio.volume = volume;
            } else {
                audio.pause();
                audio.volume = 1; // Reset for next time
                clearInterval(fadeInterval);
                
                // Stop record animation
                recordPlayer.classList.remove('playing');
                isMusicPlaying = false;
            }
        }, 100);
    }
    
    // ---------- PIN CLICK HANDLER ----------
    function handlePinClick(e) {
        const pin = e.currentTarget;
        const pinId = pin.getAttribute('data-id');
        const visited = pin.getAttribute('data-visited') === 'true';
        
        // If already visited, just show photo without counting
        if (visited) {
            // Toggle polaroid visibility
            const polaroid = pin.querySelector('.polaroid');
            if (polaroid) {
                polaroid.classList.toggle('hidden');
            }
            return;
        }
        
        // First time visiting this pin
        pin.setAttribute('data-visited', 'true');
        pin.classList.add('visited');
        
        // Show the polaroid
        const polaroid = pin.querySelector('.polaroid');
        if (polaroid) {
            polaroid.classList.remove('hidden');
        }
        
        // Increment counter
        visitedCount++;
        console.log(`📍 Memory ${pinId} visited. Progress: ${visitedCount}/${totalPins}`);
        
        // Update progress tracker if visible
        const progressTracker = document.getElementById('progressTracker');
        if (progressTracker) {
            progressTracker.textContent = `${visitedCount}/${totalPins}`;
        }
        
        // Check if all pins are visited
        checkAllVisited();
    }
    
    // ---------- RECORD PLAYER (MUSIC) ----------
    function handleRecordClick() {
        if (!audio) return;
        
        if (isMusicPlaying) {
            audio.pause();
            recordPlayer.classList.remove('playing');
            isMusicPlaying = false;
        } else {
            // Reset volume and play
            audio.volume = 1;
            audio.play()
                .then(() => {
                    recordPlayer.classList.add('playing');
                    isMusicPlaying = true;
                    console.log('🎵 Lover Girl - Laufey');
                })
                .catch(err => {
                    console.log('Audio playback failed:', err);
                });
        }
    }
    
    // ---------- EMPTY FRAME CLICK (PROPOSAL) ----------
    function handleEmptyFrameClick(e) {
        const isUnlocked = emptyPin.getAttribute('data-unlocked') === 'true';
        
        if (!isUnlocked) {
            // Locked - do nothing, maybe subtle shake
            emptyPin.classList.add('shake');
            setTimeout(() => {
                emptyPin.classList.remove('shake');
            }, 500);
            console.log('🔒 Empty frame is locked. Visit all 15 memories first.');
            return;
        }
        
        if (proposalShown) return;
        
        // UNLOCKED - show proposal
        proposalShown = true;
        
        // Fade out music
        if (isMusicPlaying) {
            fadeOutMusic();
        }
        
        // Show proposal overlay
        proposalOverlay.classList.add('visible');
        
        // Play camera shutter sound (simulated with console)
        console.log('📸 Click. Frame captured.');
        
        // Animate text lines (CSS handles fade, but we can log)
        console.log('❤️ Proposal initiated.');
    }
    
    // ---------- HEART RESPONSE (YES) ----------
    function handleHeartClick() {
        // Final moment - expand heart, show message
        
        // Create final confirmation
        const proposalCard = document.querySelector('.proposal-card');
        const proposalContent = document.querySelector('.proposal-content');
        
        // Change content to final affirmation
        if (proposalContent) {
            proposalContent.innerHTML = `
                <p style="font-size: 2rem; margin-bottom: 1rem;">❤️</p>
                <p style="font-family: 'DM Serif Display'; font-size: 1.8rem; color: #C97C5D; margin-bottom: 1rem;">Thank you.</p>
                <p style="font-family: 'Inter'; font-size: 1.1rem; font-style: italic; color: #5A4C3A;">The next adventure begins now.</p>
                <p style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.7;">February 14, 2026</p>
            `;
        }
        
        console.log('💌 She said YES.');
    }
    
    // ---------- ADD EVENT LISTENERS ----------
    
    // Memory pins
    pins.forEach(pin => {
        pin.addEventListener('click', handlePinClick);
        
        // Optional: hover already shows polaroid via CSS, but we keep click as primary
    });
    
    // Empty frame pin
    if (emptyPin) {
        emptyPin.addEventListener('click', handleEmptyFrameClick);
    }
    
    // Record player
    if (recordPlayer) {
        recordPlayer.addEventListener('click', handleRecordClick);
    }
    
    // Heart response
    if (heartResponse) {
        heartResponse.addEventListener('click', handleHeartClick);
    }
    
    // ---------- ADD SHAKE ANIMATION (for locked frame) ----------
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shake 0.5s ease;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .empty-polaroid.locked {
            opacity: 0.7;
        }
        
        .proposal-overlay.visible {
            opacity: 1;
            pointer-events: auto;
        }
        
        .polaroid.hidden {
            display: none;
        }
        
        .polaroid {
            display: block;
        }
    `;
    document.head.appendChild(style);
    
    // ---------- INITIAL STATE ----------
    console.log('🗺️ Map ready. 15 memories waiting. Lover Girl on the record player.');
    console.log('🔒 Empty frame locked. Visit all 15 pins to unlock.');
});