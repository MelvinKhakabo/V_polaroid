// =====================================
// OUR JOURNEY · VALENTINE 2026
// Linear Story Path · Empty Frame Proposal
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- DOM ELEMENTS ----------
    const chapters = document.querySelectorAll('.chapter:not(.empty-frame-chapter)');
    const emptyChapter = document.querySelector('.empty-frame-chapter');
    const recordPlayer = document.getElementById('recordPlayer');
    const audio = document.getElementById('loverGirl');
    const progressCount = document.getElementById('progressCount');
    const emptyFrameImage = document.getElementById('emptyFrameImage');
    const emptyCaption = document.getElementById('emptyCaption');
    
    // ---------- STATE ----------
    let visitedCount = 0;
    const totalChapters = 15;
    let isMusicPlaying = false;
    let proposalShown = false;
    let currentVideo = null;
    
    // ---------- HELPER FUNCTIONS ----------
    function updateProgress() {
        if (progressCount) {
            progressCount.textContent = visitedCount;
        }
        
        // Check if all chapters visited
        if (visitedCount >= totalChapters) {
            // Unlock empty frame
            emptyChapter.setAttribute('data-unlocked', 'true');
            
            // Update empty frame appearance
            const captionText = emptyChapter.querySelector('.empty-caption-text');
            if (captionText) {
                captionText.textContent = 'Ready for you';
            }
            
            // Remove locked class
            const emptyPolaroid = emptyChapter.querySelector('.empty-polaroid');
            if (emptyPolaroid) {
                emptyPolaroid.classList.remove('locked');
            }
            
            console.log('🎉 All 15 memories visited. Empty frame unlocked!');
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
    
    // ---------- CHAPTER CLICK HANDLER ----------
    function handleChapterClick(e) {
        const chapter = e.currentTarget;
        const chapterId = chapter.getAttribute('data-id');
        const visited = chapter.getAttribute('data-visited') === 'true';
        
        // Handle video (Chapter 5)
        if (chapterId === '5') {
            const video = chapter.querySelector('video');
            if (video) {
                if (video.paused) {
                    video.play().catch(e => console.log('Video play failed:', e));
                    currentVideo = video;
                } else {
                    video.pause();
                }
            }
        }
        
        // If already visited, just toggle active state
        if (visited) {
            chapter.classList.toggle('active');
            return;
        }
        
        // ---------- FIRST TIME VISITING THIS CHAPTER ----------
        chapter.setAttribute('data-visited', 'true');
        chapter.classList.add('visited');
        chapter.classList.add('active');
        
        // Increment counter
        visitedCount++;
        console.log(`📍 Chapter ${chapterId} visited. Progress: ${visitedCount}/${totalChapters}`);
        
        // Animate the pin
        const pinDot = chapter.querySelector('.pin-dot');
        pinDot.style.transform = 'scale(1.4)';
        setTimeout(() => {
            pinDot.style.transform = 'scale(1)';
        }, 300);
        
        // Update progress display
        updateProgress();
        
        // Auto-scroll to next chapter smoothly
        const nextChapter = chapter.nextElementSibling;
        if (nextChapter) {
            setTimeout(() => {
                nextChapter.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'center'
                });
            }, 400);
        }
    }
    
    // ---------- EMPTY FRAME CLICK - PROPOSAL INSIDE FRAME ----------
    function handleEmptyFrameClick(e) {
        const isUnlocked = emptyChapter.getAttribute('data-unlocked') === 'true';
        
        if (!isUnlocked) {
            // Locked - gentle shake
            emptyChapter.classList.add('shake');
            setTimeout(() => emptyChapter.classList.remove('shake'), 500);
            console.log('🔒 Not yet. Keep visiting your memories.');
            return;
        }
        
        if (proposalShown) return;
        proposalShown = true;
        
        // Fade out Lover Girl
        if (isMusicPlaying) {
            fadeOutMusic();
        }
        
        // Pause video if playing
        if (currentVideo) {
            currentVideo.pause();
        }
        
        // ---------- TRANSFORM EMPTY FRAME INTO PROPOSAL ----------
        const emptyImage = document.getElementById('emptyFrameImage');
        const captionEl = document.getElementById('emptyCaption');
        
        // Clear existing content
        emptyImage.innerHTML = '';
        captionEl.innerHTML = '';
        
        // Add proposal class
        emptyImage.classList.add('proposal-mode');
        
        // Style and set proposal content
        emptyImage.style.backgroundColor = '#FFF9F9';
        emptyImage.style.display = 'flex';
        emptyImage.style.flexDirection = 'column';
        emptyImage.style.alignItems = 'center';
        emptyImage.style.justifyContent = 'center';
        emptyImage.style.padding = '24px 20px';
        emptyImage.style.height = 'auto';
        emptyImage.style.minHeight = '200px';
        
        // Add proposal text with staggered animation
        emptyImage.innerHTML = `
            <p style="font-family: 'DM Serif Display', serif; font-size: 1rem; color: #4A4A4A; margin-bottom: 8px; text-align: center; opacity: 0; animation: fadeInUp 0.5s ease forwards 0.2s;">
                You've placed us on the map. Fifteen times.
            </p>
            <p style="font-family: 'DM Serif Display', serif; font-size: 1rem; color: #4A4A4A; margin-bottom: 8px; text-align: center; opacity: 0; animation: fadeInUp 0.5s ease forwards 0.5s;">
                This one is still blank.
            </p>
            <p style="font-family: 'DM Serif Display', serif; font-size: 1rem; color: #4A4A4A; margin-bottom: 16px; text-align: center; opacity: 0; animation: fadeInUp 0.5s ease forwards 0.8s;">
                I only know I want you in the frame.
            </p>
            <h2 style="font-family: 'DM Serif Display', serif; font-size: 1.6rem; color: #E9748D; margin-bottom: 20px; text-align: center; opacity: 0; animation: fadeInUp 0.6s ease forwards 1.1s;">
                Will you be my Valentine?
            </h2>
        `;
        
        // Create heart button
        const heartButton = document.createElement('div');
        heartButton.className = 'heart-response';
        heartButton.style.opacity = '0';
        heartButton.style.animation = 'fadeInUp 0.6s ease forwards 1.5s';
        heartButton.innerHTML = `
            <div class="heart-icon"></div>
            <span class="heart-text">Yes, always</span>
        `;
        emptyImage.appendChild(heartButton);
        
        // Update caption
        captionEl.innerHTML = '<p style="text-align: center; font-style: italic; color: #D14B6E; font-size: 0.8rem; letter-spacing: 2px;">February 14, 2026</p>';
        
        // Add click handler to heart
        heartButton.addEventListener('click', handleHeartClick);
        
        console.log('❤️❤️❤️ Proposal revealed!');
    }
    
    // ---------- HEART CLICK - SHE SAID YES ----------
    function handleHeartClick(e) {
        e.stopPropagation();
        
        const emptyImage = document.getElementById('emptyFrameImage');
        const captionEl = document.getElementById('emptyCaption');
        
        // Celebration mode
        emptyImage.innerHTML = `
            <p style="font-size: 4rem; margin-bottom: 0.5rem; animation: pop 0.6s ease;">❤️</p>
            <p style="font-family: 'DM Serif Display', serif; font-size: 2rem; color: #E9748D; margin-bottom: 0.5rem; text-align: center; animation: fadeIn 0.8s ease;">
                Thank you.
            </p>
            <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; font-style: italic; color: #6B4E71; text-align: center; animation: fadeIn 1s ease;">
                The next adventure begins now.
            </p>
        `;
        
        captionEl.innerHTML = '<p style="text-align: center; color: #E9748D; font-weight: 600; font-size: 1rem;">♡ forever yours ♡</p>';
        
        // Confetti effect (simple)
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * 100 + '%';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = ['#E9748D', '#FFD966', '#FFB3B3', '#D6B5FF'][Math.floor(Math.random() * 4)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                confetti.style.animation = 'pop 0.8s ease forwards';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 1000);
            }, i * 50);
        }
        
        console.log('💖 SHE SAID YES! 💖');
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
                });
        }
    }
    
    // ---------- ADD EVENT LISTENERS ----------
    chapters.forEach(chapter => {
        chapter.addEventListener('click', handleChapterClick);
    });
    
    if (emptyChapter) {
        emptyChapter.addEventListener('click', handleEmptyFrameClick);
    }
    
    if (recordPlayer) {
        recordPlayer.addEventListener('click', handleRecordClick);
    }
    
    // ---------- INITIAL SETUP ----------
    console.log('🌟 Journey path ready. 15 memories waiting.');
    console.log('🔒 Empty frame locked. Visit all 15 chapters to unlock.');
    console.log('🎶 Click the record to play our song.');
    
    // Add animation styles if not present
    if (!document.getElementById('journeyAnimations')) {
        const style = document.createElement('style');
        style.id = 'journeyAnimations';
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pop {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.3); }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto-scroll to first chapter on load
    setTimeout(() => {
        const firstChapter = document.querySelector('.chapter');
        if (firstChapter) {
            firstChapter.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'center'
            });
        }
    }, 500);
});