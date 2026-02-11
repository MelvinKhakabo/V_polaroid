// =====================================
// OUR MAP · VALENTINE 2026
// Lover Girl · 15 Memories · Empty Frame
// Brighter, bolder, full of heart
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    // ---------- DOM ELEMENTS ----------
    const pins = document.querySelectorAll('.memory-pin');
    const emptyPin = document.querySelector('.empty-frame-pin');
    const recordPlayer = document.getElementById('recordPlayer');
    const audio = document.getElementById('loverGirl');
    const emptyFrameImage = document.getElementById('emptyFrameImage');
    const emptyCaption = document.getElementById('emptyCaption');
    
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
                audio.volume = 1;
                clearInterval(fadeInterval);
                recordPlayer.classList.remove('playing');
                isMusicPlaying = false;
            }
        }, 100);
    }
    
    // ---------- PIN CLICK HANDLER (JPEG + MP4) ----------
    function handlePinClick(e) {
        const pin = e.currentTarget;
        const pinId = pin.getAttribute('data-id');
        const visited = pin.getAttribute('data-visited') === 'true';
        
        // Get the polaroid element
        let polaroid = pin.querySelector('.polaroid');
        let mediaDiv = polaroid.querySelector('.polaroid-image');
        
        // SPECIAL HANDLING FOR PIN 5 - VIDEO
        if (pinId === '5') {
            // Check if video element already exists
            if (!mediaDiv.querySelector('video')) {
                // Clear background and inject video
                mediaDiv.style.backgroundImage = 'none';
                mediaDiv.style.backgroundColor = '#FFE5E5';
                mediaDiv.innerHTML = `
                    <video loop muted playsinline style="width:100%; height:100%; object-fit:cover; border-radius: 2px;">
                        <source src="assets/images/5.mp4" type="video/mp4">
                    </video>
                `;
            }
            
            // Play/pause logic
            if (!visited) {
                // First time click - play after short delay
                setTimeout(() => {
                    const video = mediaDiv.querySelector('video');
                    if (video) {
                        video.play().catch(e => console.log('Video play failed:', e));
                    }
                }, 200);
            } else {
                // Already visited - toggle video play/pause
                const video = mediaDiv.querySelector('video');
                if (video) {
                    if (polaroid.classList.contains('hidden')) {
                        video.pause();
                    } else {
                        video.play().catch(e => console.log('Video play failed:', e));
                    }
                }
            }
        }
        
        // If already visited, just toggle visibility
        if (visited) {
            if (polaroid) {
                polaroid.classList.toggle('hidden');
            }
            return;
        }
        
        // ---------- FIRST TIME VISITING THIS PIN ----------
        pin.setAttribute('data-visited', 'true');
        pin.classList.add('visited');
        
        // Show the polaroid
        if (polaroid) {
            polaroid.classList.remove('hidden');
        }
        
        // Increment counter
        visitedCount++;
        console.log(`📍 Memory ${pinId} visited. Progress: ${visitedCount}/${totalPins}`);
        
        // Add little burst of color to pin
        pin.style.transform = 'scale(1.2)';
        setTimeout(() => {
            pin.style.transform = 'scale(1)';
        }, 200);
        
        // Check if all pins are visited
        checkAllVisited();
    }
    
    // ---------- RECORD PLAYER - LOVER GIRL ----------
    function handleRecordClick() {
        if (!audio) return;
        
        if (isMusicPlaying) {
            audio.pause();
            recordPlayer.classList.remove('playing');
            isMusicPlaying = false;
            console.log('⏸️ Music paused');
        } else {
            audio.volume = 1;
            audio.play()
                .then(() => {
                    recordPlayer.classList.add('playing');
                    isMusicPlaying = true;
                    console.log('🎵 Lover Girl - Laufey');
                })
                .catch(err => {
                    console.log('Audio error:', err);
                    // Fallback - user interaction might be needed
                    alert('Click the record again to play our song ♡');
                });
        }
    }
    
    // ---------- EMPTY FRAME CLICK - DIRECT PROPOSAL INSIDE FRAME ----------
    function handleEmptyFrameClick(e) {
        const isUnlocked = emptyPin.getAttribute('data-unlocked') === 'true';
        
        if (!isUnlocked) {
            // Locked - gentle shake
            emptyPin.classList.add('shake');
            setTimeout(() => emptyPin.classList.remove('shake'), 500);
            console.log('🔒 Not yet. Keep exploring.');
            return;
        }
        
        if (proposalShown) return;
        proposalShown = true;
        
        // Fade out Lover Girl
        if (isMusicPlaying) {
            fadeOutMusic();
        }
        
        // ---------- TRANSFORM EMPTY FRAME INTO PROPOSAL ----------
        const emptyPolaroid = emptyPin.querySelector('.empty-polaroid');
        const emptyImage = document.getElementById('emptyFrameImage');
        const captionEl = document.getElementById('emptyCaption');
        
        // Clear existing content
        emptyImage.innerHTML = '';
        captionEl.innerHTML = '';
        
        // Style the frame for proposal
        emptyImage.style.backgroundColor = '#FFF9F9';
        emptyImage.style.backgroundImage = 'none';
        emptyImage.style.display = 'flex';
        emptyImage.style.flexDirection = 'column';
        emptyImage.style.alignItems = 'center';
        emptyImage.style.justifyContent = 'center';
        emptyImage.style.padding = '24px 20px';
        emptyImage.style.height = '180px';
        
        // Add proposal text line by line (for animation feel)
        emptyImage.innerHTML = `
            <p style="font-family: 'DM Serif Display', serif; font-size: 0.95rem; color: #4A4A4A; margin-bottom: 6px; text-align: center; opacity: 0; animation: fadeInUp 0.4s ease forwards 0.2s;">
                You've placed us on the map. Fifteen times.
            </p>
            <p style="font-family: 'DM Serif Display', serif; font-size: 0.95rem; color: #4A4A4A; margin-bottom: 6px; text-align: center; opacity: 0; animation: fadeInUp 0.4s ease forwards 0.5s;">
                This one is still blank.
            </p>
            <p style="font-family: 'DM Serif Display', serif; font-size: 0.95rem; color: #4A4A4A; margin-bottom: 12px; text-align: center; opacity: 0; animation: fadeInUp 0.4s ease forwards 0.8s;">
                I only know I want you in the frame.
            </p>
            <h2 style="font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #E9748D; margin-bottom: 16px; text-align: center; opacity: 0; animation: fadeInUp 0.5s ease forwards 1.1s;">
                Will you be my Valentine?
            </h2>
        `;
        
        // Create heart button
        const heartButton = document.createElement('div');
        heartButton.className = 'heart-response';
        heartButton.style.marginTop = '4px';
        heartButton.style.opacity = '0';
        heartButton.style.animation = 'fadeInUp 0.5s ease forwards 1.4s';
        heartButton.innerHTML = `
            <div class="heart-icon" style="background-color: #FFFFFF;"></div>
            <span class="heart-text" style="color: #FFFFFF; font-weight: 600;">Yes</span>
        `;
        emptyImage.appendChild(heartButton);
        
        // Update caption
        captionEl.innerHTML = '<p style="text-align: center; font-style: italic; color: #B76E79; font-size: 0.7rem; letter-spacing: 1px;">February 14, 2026</p>';
        
        // Add click handler to heart
        heartButton.addEventListener('click', handleHeartClick);
        
        // Add animation styles dynamically if not present
        if (!document.getElementById('proposalAnimations')) {
            const style = document.createElement('style');
            style.id = 'proposalAnimations';
            style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('❤️ Proposal revealed inside the frame.');
    }
    
    // ---------- HEART CLICK - SHE SAID YES ----------
    function handleHeartClick(e) {
        e.stopPropagation();
        
        const emptyImage = document.getElementById('emptyFrameImage');
        const captionEl = document.getElementById('emptyCaption');
        
        // Transform into celebration
        emptyImage.innerHTML = `
            <p style="font-size: 3.2rem; margin-bottom: 0.5rem; animation: pop 0.5s ease;">❤️</p>
            <p style="font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: #E9748D; margin-bottom: 0.5rem; text-align: center; animation: fadeIn 0.6s ease;">
                Thank you.
            </p>
            <p style="font-family: 'Inter', sans-serif; font-size: 1rem; font-style: italic; color: #6B4E71; text-align: center; animation: fadeIn 0.8s ease;">
                The next adventure begins now.
            </p>
        `;
        
        captionEl.innerHTML = '<p style="text-align: center; color: #E9748D; font-weight: 500;">♡ forever yours ♡</p>';
        
        // Add pop animation
        if (!document.getElementById('heartPopAnimation')) {
            const style = document.createElement('style');
            style.id = 'heartPopAnimation';
            style.textContent = `
                @keyframes pop {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('💌 She said YES. ❤️');
    }
    
    // ---------- ADD EVENT LISTENERS ----------
    pins.forEach(pin => {
        pin.addEventListener('click', handlePinClick);
    });
    
    if (emptyPin) {
        emptyPin.addEventListener('click', handleEmptyFrameClick);
    }
    
    if (recordPlayer) {
        recordPlayer.addEventListener('click', handleRecordClick);
    }
    
    // ---------- ADD SHAKE ANIMATION FOR LOCKED FRAME ----------
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            60% { transform: translateX(-3px); }
            80% { transform: translateX(3px); }
        }
        
        .polaroid-image video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 2px;
            display: block;
        }
        
        .memory-pin.visited .pin-dot {
            background-color: #E9748D;
            border-color: white;
            box-shadow: 0 0 0 2px rgba(233, 116, 141, 0.3);
        }
        
        .empty-frame-pin[data-unlocked="true"] .empty-polaroid {
            border: 2px solid #E9748D;
            box-shadow: 0 0 20px rgba(233, 116, 141, 0.3);
            animation: softGlow 2s infinite ease-in-out;
        }
        
        @keyframes softGlow {
            0% { box-shadow: 0 0 10px rgba(233, 116, 141, 0.2); }
            50% { box-shadow: 0 0 25px rgba(233, 116, 141, 0.4); }
            100% { box-shadow: 0 0 10px rgba(233, 116, 141, 0.2); }
        }
        
        .heart-response {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 28px;
            background-color: #E9748D;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(233, 116, 141, 0.3);
        }
        
        .heart-response:hover {
            background-color: #D14B6E;
            transform: scale(1.08);
            box-shadow: 0 8px 18px rgba(209, 75, 110, 0.4);
        }
        
        .heart-icon {
            width: 18px;
            height: 18px;
            background-color: white;
            transform: rotate(45deg);
            position: relative;
        }
        
        .heart-icon::before,
        .heart-icon::after {
            content: '';
            width: 18px;
            height: 18px;
            background-color: white;
            border-radius: 50%;
            position: absolute;
        }
        
        .heart-icon::before {
            left: -9px;
            top: 0;
        }
        
        .heart-icon::after {
            top: -9px;
            left: 0;
        }
        
        .heart-text {
            color: white;
            font-weight: 600;
            font-size: 1rem;
            letter-spacing: 1px;
        }
    `;
    document.head.appendChild(style);
    
    // ---------- INITIAL LOG ----------
    console.log('🗺️❤️ Map ready! 15 memories, 1 video, Lover Girl on vinyl.');
    console.log('🔒 Empty frame is locked. Visit all 15 to unlock.');
    console.log('🎶 Click the record to play our song.');
});