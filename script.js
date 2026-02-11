// =====================================
// OUR JOURNEY · VALENTINE 2026
// BLANK FRAME · SPEECH BUBBLE · HEART POPUP
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- DOM ELEMENTS ----------
    const chapters = document.querySelectorAll('.chapter:not(.empty-frame-chapter)');
    const emptyChapter = document.querySelector('.empty-frame-chapter');
    const recordPlayer = document.getElementById('recordPlayer');
    const audio = document.getElementById('loverGirl');
    const progressCount = document.getElementById('progressCount');
    const heartPopup = document.getElementById('heartPopup');
    const yesButton = document.getElementById('yesButton');
    const celebrationMessage = document.getElementById('celebrationMessage');
    
    // ---------- STATE ----------
    let visitedCount = 0;
    const totalChapters = 15;
    let isMusicPlaying = false;
    let proposalShown = false;
    let currentVideo = null;
    
    // ---------- UPDATE PROGRESS ----------
    function updateProgress() {
        if (progressCount) {
            progressCount.textContent = visitedCount;
        }
        
        // Check if all 15 chapters are visited
        if (visitedCount >= totalChapters) {
            // UNLOCK THE EMPTY FRAME
            emptyChapter.setAttribute('data-unlocked', 'true');
            
            // Update caption text
            const captionText = emptyChapter.querySelector('.empty-caption-text');
            if (captionText) {
                captionText.textContent = 'Ready';
            }
            
            console.log('✅ ALL 15 MEMORIES VISITED - EMPTY FRAME UNLOCKED');
        }
    }
    
    // ---------- FADE OUT MUSIC ----------
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
        
        // If already visited, just toggle
        if (visited) {
            chapter.classList.toggle('active');
            return;
        }
        
        // ---------- FIRST TIME VISIT ----------
        chapter.setAttribute('data-visited', 'true');
        chapter.classList.add('visited');
        
        // Increment counter
        visitedCount++;
        console.log(`📍 Chapter ${chapterId} visited - ${visitedCount}/${totalChapters}`);
        
        // Animate pin
        const pinDot = chapter.querySelector('.pin-dot');
        pinDot.style.transform = 'scale(1.4)';
        setTimeout(() => {
            pinDot.style.transform = 'scale(1)';
        }, 300);
        
        // Update progress display
        updateProgress();
        
        // Auto-scroll to next chapter
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
    
    // ---------- EMPTY FRAME CLICK HANDLER - SIMPLIFIED ----------
    function handleEmptyFrameClick(e) {
        // Check if frame is unlocked
        const isUnlocked = emptyChapter.getAttribute('data-unlocked') === 'true';
        
        if (!isUnlocked) {
            // Locked - shake and log
            emptyChapter.classList.add('shake');
            setTimeout(() => emptyChapter.classList.remove('shake'), 500);
            console.log('🔒 Empty frame locked - keep visiting memories');
            return;
        }
        
        // Unlocked - show the heart popup!
        console.log('❤️ EMPTY FRAME CLICKED - SHOWING PROPOSAL');
        
        // Fade out music if playing
        if (isMusicPlaying) {
            fadeOutMusic();
        }
        
        // Pause video if playing
        if (currentVideo) {
            currentVideo.pause();
        }
        
        // SHOW THE HEART POPUP
        heartPopup.classList.add('visible');
        proposalShown = true;
    }
    
    // ---------- YES BUTTON CLICK HANDLER ----------
    function handleYesClick(e) {
        e.stopPropagation();
        console.log('💖 YES BUTTON CLICKED - SHE SAID YES!');
        
        // Hide heart popup
        heartPopup.classList.remove('visible');
        
        // Show celebration message
        celebrationMessage.classList.add('visible');
        
        // Confetti effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * 100 + '%';
                confetti.style.width = '12px';
                confetti.style.height = '12px';
                confetti.style.backgroundColor = ['#E9748D', '#FFD966', '#FFB3B3', '#D6B5FF'][Math.floor(Math.random() * 4)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                confetti.style.animation = 'pop 0.8s ease forwards';
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 1000);
            }, i * 30);
        }
    }
    
    // ---------- RECORD PLAYER ----------
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
    
    if (yesButton) {
        yesButton.addEventListener('click', handleYesClick);
    }
    
    // ---------- INITIAL SETUP ----------
    console.log('🌟🌟🌟 JOURNEY PATH READY 🌟🌟🌟');
    console.log('📸 15 memories - click each one');
    console.log('🔒 Empty frame locked until all 15 are visited');
    console.log('🎶 Click the record for Lover Girl');
    console.log('❤️ When unlocked, click empty frame for proposal');
    
    // Auto-scroll to first chapter
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