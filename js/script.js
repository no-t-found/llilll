/* ================================================================
   CONSOLIDATED JAVASCRIPT - PORTFOLIO WEBSITE
   ================================================================

   FILE STRUCTURE:
   ---------------
   1. Utility Functions
   2. Cursor Movement Scripts
   3. Contact Page Scripts
   4. Splide Slider Initialization
   5. Window and Document Touch Detection
   6. Index Page Specific Scripts
   7. General Page Scripts
   8. Scroll To Top Functionality
   9. Enhanced Mobile Drag Interaction

   ================================================================ */

/* 1. UTILITY FUNCTIONS
   =================== */

// Document ready helper function
function documentReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

/* 2. CURSOR MOVEMENT SCRIPTS
   ========================== */

// High-performance custom cursor for all pages (SIMPLIFIED & WORKING)
documentReady(function() {
    // Only create cursor on desktop devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Remove cursor styles on mobile
        document.body.style.cursor = 'auto';
        return;
    }
    
    // Simple cursor hiding
    const style = document.createElement('style');
    style.textContent = `
        * { cursor: none !important; }
        body::before { display: none !important; }
    `;
    document.head.appendChild(style);
    
    let cursor = null;
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    
    // Create cursor element
    function createCursor() {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, rgba(255, 0, 0, 0.4) 0%, rgba(255, 0, 0, 0.2) 30%, rgba(255, 0, 0, 0.1) 60%, transparent 80%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
            filter: blur(1px);
            will-change: transform;
            opacity: 0;
        `;
        document.body.appendChild(cursor);
    }
    
    // Update cursor position
    function updateCursor() {
        if (cursor) {
            cursor.style.transform = `translate(${mouseX - 30}px, ${mouseY - 30}px)`;
        }
        isMoving = false;
    }
    
    // Mouse move handler
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(updateCursor);
        }
        
        // Show cursor when moving
        if (cursor && cursor.style.opacity !== '1') {
            cursor.style.opacity = '1';
        }
    }
    
    // Mouse enter handler
    function handleMouseEnter() {
        if (cursor) {
            cursor.style.opacity = '1';
        }
    }
    
    // Mouse leave handler
    function handleMouseLeave() {
        if (cursor) {
            cursor.style.opacity = '0';
        }
    }
    
    // Initialize cursor
    createCursor();
    
    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
            // Enhanced cursor interaction for works page
        console.log('Checking for works page...');
        console.log('Current pathname:', window.location.pathname);
        console.log('Document body classes:', document.body.className);
        
        // Always initialize on any page that has marquee containers
        const marqueeContainers = document.querySelectorAll('.berflow._2');
        console.log('Found marquee containers:', marqueeContainers.length);
        
        if (marqueeContainers.length > 0) {
            console.log('Marquee containers found, initializing...');
            
            // Enhanced marquee gallery with auto-scroll, loop, and manual control
            initAdvancedMarquee();
            
            // Additional mobile touch support
            setTimeout(() => {
                console.log('📱 Adding additional mobile support...');
                marqueeContainers.forEach((container, index) => {
                    container.addEventListener('touchstart', (e) => {
                        console.log(`📱 Global touch start on container ${index + 1}`);
                    }, {passive: false});
                });
            }, 500);
        } else {
            console.log('No marquee containers found, skipping initialization');
        }
});

/* ADVANCED MARQUEE GALLERY SYSTEM
   ================================= */

function initAdvancedMarquee() {
    const marqueeContainers = document.querySelectorAll('.berflow._2');
    
    console.log('🎪 Initializing Advanced Marquee System...');
    console.log('Found marquee containers:', marqueeContainers.length);
    console.log('Document ready state:', document.readyState);
    
    // Prevent multiple initializations
    if (window.marqueeInitialized) {
        console.log('⚠️ Marquee already initialized, skipping');
        return;
    }
    window.marqueeInitialized = true;
    
    marqueeContainers.forEach((container, index) => {
        console.log(`🎠 Initializing marquee ${index + 1}`);
        const marquee = container.querySelector('.marq');
        const marqueeIn = marquee ? marquee.querySelector('.marq-in') : null;
        const items = marqueeIn ? Array.from(marqueeIn.querySelectorAll('.marq-in_div')) : [];
        
        if (!marquee || !marqueeIn || items.length === 0) {
            console.log(`❌ Skipping marquee ${index + 1} - missing elements:`, {
                marquee: !!marquee,
                marqueeIn: !!marqueeIn,
                items: items.length
            });
            return;
        }
        
        console.log(`✅ Marquee ${index + 1} has ${items.length} items`);
        
        // Create isolated variables for each marquee instance
        let userScrollTimeout;
        let currentPosition = 0;
        
        // Calculate item width including margins
        const itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(items[0]).marginRight);
        const totalWidth = itemWidth * items.length;
        const containerWidth = container.offsetWidth;
        
        // Duplicate items for seamless loop
        const originalHTML = marqueeIn.innerHTML;
        marqueeIn.innerHTML = originalHTML + originalHTML;
        
        // Start with first item centered
        const initialOffset = (containerWidth / 2) - (itemWidth / 2);
        currentPosition = initialOffset;
        
        // CSS animation handles the auto-scroll - no JavaScript animation needed
        
        // Enhanced manual scroll handlers with better touch support
        let isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                             window.matchMedia('(max-width: 768px)').matches ||
                             ('ontouchstart' in window) ||
                             (navigator.maxTouchPoints > 0) ||
                             window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let isHorizontalDrag = false;
        let lastScrollPosition = currentPosition;
        let dragThreshold = isMobileDevice ? 5 : 8; // Even lower threshold for mobile
        let lastMoveTime = 0;
        let velocity = 0;
        
        function handleStart(e) {
            // Enhanced mobile debugging
            const isTouchEvent = e.type.includes('touch');
            console.log(`🖱️ Drag start on marquee ${index + 1}:`, e.type, 'Mobile:', isMobileDevice, 'Touch Event:', isTouchEvent);
            console.log('Event details:', {
                type: e.type,
                target: e.target.tagName,
                touches: isTouchEvent ? e.touches.length : 'N/A',
                screenX: isTouchEvent ? e.touches[0].screenX : e.screenX,
                screenY: isTouchEvent ? e.touches[0].screenY : e.screenY
            });
            
            const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
            const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
            
            startX = clientX;
            startY = clientY;
            isDragging = true;
            isHorizontalDrag = false;
            lastScrollPosition = currentPosition;
            lastMoveTime = Date.now();
            velocity = 0;
            
            // Pause CSS animation during drag
            marquee.style.animationPlayState = 'paused';
            
            clearTimeout(userScrollTimeout);
            clearTimeout(hoverTimeout);
            
            // Add drag styles
            if (!isMobileDevice) {
                marqueeIn.style.cursor = 'grabbing';
            }
            marqueeIn.style.userSelect = 'none';
            marqueeIn.classList.add('dragging');
            
            // Enhanced touch event handling
            if (isTouchEvent) {
                e.preventDefault();
                e.stopPropagation();
                // Disable text selection on mobile
                document.body.style.userSelect = 'none';
                document.body.style.webkitUserSelect = 'none';
                document.body.style.webkitTouchCallout = 'none';
                console.log(`📱 Touch event prevented for marquee ${index + 1} - coordinates: ${clientX}, ${clientY}`);
            }
            
            console.log(`✅ Marquee ${index + 1} drag started - ${isMobileDevice ? 'Mobile' : 'Desktop'} | Position: ${currentPosition} | Coords: ${clientX}, ${clientY}`);
        }
        
        function handleMove(e) {
            if (!isDragging) return;
            
            const isTouchEvent = e.type.includes('touch');
            const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
            const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            const currentTime = Date.now();
            
            // Calculate velocity for momentum (mobile primarily)
            if (currentTime - lastMoveTime > 0) {
                velocity = deltaX / (currentTime - lastMoveTime);
                lastMoveTime = currentTime;
            }
            
            // Determine if this is a horizontal or vertical drag
            if (!isHorizontalDrag && (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
                isHorizontalDrag = Math.abs(deltaX) > Math.abs(deltaY);
                
                // On mobile, be more permissive for horizontal drags
                if (isMobileDevice && Math.abs(deltaX) > dragThreshold / 2) {
                    isHorizontalDrag = true;
                    console.log(`📱 Marquee ${index + 1} detected horizontal drag on mobile: ${deltaX}px`);
                }
            }
            
            // Only handle horizontal drags for the marquee
            if (isHorizontalDrag) {
                e.preventDefault();
                e.stopPropagation();
                
                currentPosition = lastScrollPosition + deltaX;
                marqueeIn.style.transform = `translateX(${currentPosition}px)`;
                
                // Add momentum effect visual feedback on mobile
                if (isMobileDevice && Math.abs(velocity) > 0.5) {
                    marqueeIn.style.transition = 'none';
                }
                
                // More frequent debug for mobile
                const debugFrequency = isMobileDevice ? 20 : 50;
                if (Math.abs(deltaX) % debugFrequency < 5) {
                    console.log(`🏃 Marquee ${index + 1} dragging: ${deltaX}px | Position: ${currentPosition}px | Velocity: ${velocity.toFixed(3)}`);
                }
            } else if (Math.abs(deltaY) > dragThreshold && !isMobileDevice) {
                // Allow vertical scrolling of the page (less strict on mobile)
                isDragging = false;
                isUserScrolling = false;
                marqueeIn.style.cursor = 'grab';
                console.log(`⬆️ Marquee ${index + 1} switching to vertical scroll`);
            }
        }
        
        function handleEnd(e) {
            if (!isDragging) return;
            
            const isTouchEvent = e.type.includes('touch');
            console.log(`🖱️ Drag end on marquee ${index + 1}:`, e.type, 'Mobile:', isMobileDevice, 'Touch Event:', isTouchEvent);
            
            isDragging = false;
            const wasHorizontalDrag = isHorizontalDrag;
            isHorizontalDrag = false;
            
            // Remove drag styles
            if (!isMobileDevice) {
                marqueeIn.style.cursor = 'grab';
            }
            marqueeIn.classList.remove('dragging');
            
            // Re-enable text selection on mobile
            if (isTouchEvent) {
                document.body.style.userSelect = '';
                document.body.style.webkitUserSelect = '';
                document.body.style.webkitTouchCallout = '';
            }
            
            // Only process if we had a horizontal drag
            if (wasHorizontalDrag) {
                // Add momentum for mobile devices
                if (isMobileDevice && Math.abs(velocity) > 0.2) {
                    // Apply momentum based on velocity (improved for mobile)
                    const momentumDistance = velocity * 250; // Slightly reduced for more control
                    currentPosition += momentumDistance;
                    console.log(`📱 Marquee ${index + 1} momentum applied:`, momentumDistance, 'Final position:', currentPosition);
                }
                
                // Don't snap to nearest item - keep current position
                // Just ensure we're within bounds for seamless looping
                if (currentPosition <= -totalWidth) {
                    currentPosition = initialOffset;
                } else if (currentPosition >= initialOffset + itemWidth) {
                    currentPosition = -totalWidth + initialOffset;
                }
                
                // Apply the final position without snapping
                marqueeIn.style.transform = `translateX(${currentPosition}px)`;
                
                console.log(`✅ Marquee ${index + 1} position maintained at:`, currentPosition);
            }
            
            // Resume CSS animation after delay (longer on mobile)
            const resumeDelay = isMobileDevice ? 3000 : 2000;
            userScrollTimeout = setTimeout(() => {
                if (!isHovering && !isDragging) {
                    marqueeIn.style.transition = '';
                    marquee.style.animationPlayState = 'running';
                    console.log(`▶️ Marquee ${index + 1} CSS animation resumed from position:`, currentPosition);
                }
            }, resumeDelay);
        }
        
        // Event listeners for manual control with better touch handling
        container.addEventListener('mousedown', handleStart, {passive: false});
        container.addEventListener('mousemove', handleMove, {passive: false});
        container.addEventListener('mouseup', handleEnd, {passive: false});
        container.addEventListener('mouseleave', handleEnd, {passive: false});
        
        // Touch events with enhanced mobile support
        container.addEventListener('touchstart', handleStart, {passive: false});
        container.addEventListener('touchmove', handleMove, {passive: false});
        container.addEventListener('touchend', handleEnd, {passive: false});
        container.addEventListener('touchcancel', handleEnd, {passive: false});
        
        // Additional direct touch event handling on marquee-in for better mobile support
        marqueeIn.addEventListener('touchstart', (e) => {
            console.log(`📱 Direct touch on marquee-in ${index + 1}`, {
                target: e.target.tagName,
                touches: e.touches.length,
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY
            });
            handleStart(e);
        }, {passive: false});
        
        marqueeIn.addEventListener('touchmove', (e) => {
            handleMove(e);
        }, {passive: false});
        
        marqueeIn.addEventListener('touchend', (e) => {
            handleEnd(e);
        }, {passive: false});
        
        // Additional mobile touch activation for embedded videos
        const videoElements = container.querySelectorAll('iframe, video');
        videoElements.forEach(video => {
            video.addEventListener('touchstart', (e) => {
                console.log(`📱 Touch start on video in marquee ${index + 1}`);
                // Enable video interaction but still allow drag
                e.stopPropagation();
            }, {passive: false});
        });
        
        // Enhanced hover pause with better reliability
        let hoverTimeout;
        let isHovering = false;
        
        // Enhanced hover interactions for gallery items
        const videoContainers = container.querySelectorAll('.video-container-six, .marq-in_div');
        
        container.addEventListener('mouseenter', (e) => {
            isHovering = true;
            clearTimeout(hoverTimeout);
            clearTimeout(userScrollTimeout);
            if (!isDragging) {
                // Pause CSS animation
                marquee.style.animationPlayState = 'paused';
                console.log(`🎯 Marquee ${index + 1} paused on hover`);
            }
        });
        
        container.addEventListener('mouseleave', (e) => {
            isHovering = false;
            clearTimeout(hoverTimeout);
            if (!isDragging) {
                // Resume CSS animation after a short delay
                hoverTimeout = setTimeout(() => {
                    if (!isHovering && !isDragging) {
                        marquee.style.animationPlayState = 'running';
                        console.log(`▶️ Marquee ${index + 1} resumed after hover`);
                    }
                }, 300);
            }
        });
        
        // Enhanced hover effects for individual items
        videoContainers.forEach(item => {
            item.addEventListener('mouseenter', () => {
                console.log(`🎯 Item hover - pausing marquee ${index + 1}`);
                marquee.style.animationPlayState = 'paused';
                clearTimeout(hoverTimeout);
            });
            
            item.addEventListener('mouseleave', () => {
                if (!isHovering && !isDragging) {
                    hoverTimeout = setTimeout(() => {
                        if (!isHovering && !isDragging) {
                            marquee.style.animationPlayState = 'running';
                            console.log(`▶️ Item unhover - resuming marquee ${index + 1}`);
                        }
                    }, 300);
                }
            });
        });
        
        // Additional hover pause for individual marquee items (integrated with CSS animation)
        items.forEach((item, itemIndex) => {
            item.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                isHovering = true;
                clearTimeout(hoverTimeout);
                clearTimeout(userScrollTimeout);
                if (!isDragging) {
                    marquee.style.animationPlayState = 'paused';
                    console.log(`🎯 Marquee ${index + 1} item ${itemIndex} hovered - paused`);
                }
            });
            
            item.addEventListener('mouseleave', (e) => {
                // Don't immediately resume - let container handle it
                if (!container.matches(':hover')) {
                    isHovering = false;
                    if (!isDragging) {
                        hoverTimeout = setTimeout(() => {
                            if (!isHovering && !isDragging) {
                                marquee.style.animationPlayState = 'running';
                                console.log(`▶️ Marquee ${index + 1} resumed after item ${itemIndex} hover`);
                            }
                        }, 300);
                    }
                }
            });
        });
        
        // Activate CSS animation instead of JavaScript auto-scroll
        marquee.classList.add('active');
        
        // Set initial cursor
        marqueeIn.style.cursor = 'grab';
        
        // Final mobile debug
        if (isMobileDevice) {
            console.log(`📱 Mobile marquee ${index + 1} ready - Testing touch events...`);
            // Test touch event listener attachment
            setTimeout(() => {
                console.log(`📱 Marquee ${index + 1} touch test: Container events attached`);
            }, 100);
        }
        
        console.log(`🎉 Marquee ${index + 1} initialized successfully! CSS animation activated. Mobile: ${isMobileDevice}`);
    });
    
    console.log(`🚀 Advanced Marquee System initialization complete! ${marqueeContainers.length} galleries ready.`);
    console.log(`📱 Mobile device detected: ${marqueeContainers.length > 0 ? marqueeContainers[0].querySelector('.marq').isMobileDevice || 'Unknown' : 'N/A'}`);
    
    // Fallback initialization after a delay if needed
    setTimeout(() => {
        const unInitializedMarquees = document.querySelectorAll('.berflow._2 .marq:not(.active)');
        if (unInitializedMarquees.length > 0) {
            console.log(`🔄 Re-initializing ${unInitializedMarquees.length} marquees...`);
            unInitializedMarquees.forEach(marquee => {
                marquee.classList.add('active');
                console.log('🔄 Fallback activation for marquee');
            });
        }
    }, 2000);
}

/* 3. CONTACT PAGE SCRIPTS
   ======================= */

// Splide slider initialization (only if element exists)
documentReady(function() {
    const splideElement = document.querySelector('.splide');
    if (splideElement && typeof Splide !== 'undefined') {
        new Splide('.splide', {
            type: 'loop',
            perPage: 1,
            focus: 'center',
            fixedWidth: '40%',
            rewind: true,
            flickMaxPages: 2,
            updateOnMove: true,
            drag: true,
            start: 3,
        }).mount();
    }
});

// Contact title visibility management
documentReady(function() {
    const contactTitle = document.querySelector('.contact-title');
    if (contactTitle) {
        contactTitle.style.display = 'block';
        contactTitle.style.visibility = 'visible';
        contactTitle.style.opacity = '1';
        console.log('Contact title ensured visible');
    }
});

// Clean contact title management (remove duplicates)
documentReady(function() {
    const contactTitles = document.querySelectorAll('h1.contact-title, .contact-title');
    console.log('Total contact titles found:', contactTitles.length);
    
    // Keep only the first one, hide all others
    contactTitles.forEach((title, index) => {
        if (index === 0) {
            // First one - make sure it's visible
            title.style.display = 'block';
            title.style.visibility = 'visible';
            title.style.opacity = '1';
            console.log('Main contact title ensured visible');
        } else {
            // All others - hide completely
            title.style.display = 'none';
            title.style.visibility = 'hidden';
            title.style.opacity = '0';
            console.log('Duplicate contact title hidden:', index);
        }
    });
});

// Main title validation
documentReady(function() {
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        console.log('Clean contact title loaded successfully');
    }
});

/* 4. WINDOW AND DOCUMENT TOUCH DETECTION
   ====================================== */

// Webflow touch detection
!function(o, c) {
    var n = c.documentElement,
        t = " w-mod-";
    n.className += t + "js";
    ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch");
}(window, document);

/* 5. INDEX PAGE SPECIFIC SCRIPTS
   ============================== */

// Index page cursor is now handled by universal cursor above

/* 6. GENERAL PAGE SCRIPTS
   ======================= */

// Page load optimization
documentReady(function() {
    // Add loaded class to body after page loads
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
    
    // Optimize performance for animations
    if ('requestIdleCallback' in window) {
        requestIdleCallback(function() {
            // Defer non-critical animations
            const animations = document.querySelectorAll('[data-animation]');
            animations.forEach(function(element) {
                element.classList.add('animation-ready');
            });
        });
    }
});

// Video management for better performance and mobile autoplay
documentReady(function() {
    const iframes = document.querySelectorAll('iframe[src*="youtube"]');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    console.log('Found YouTube iframes:', iframes.length, 'Mobile device:', isMobile);
    
    // Enhanced YouTube embeds with mobile autoplay support
    iframes.forEach(function(iframe, index) {
        console.log(`Processing iframe ${index + 1}:`, iframe.src);
        
        // For mobile devices, try to force autoplay when video comes into view
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        console.log(`Video ${index + 1} in viewport`);
                        
                        // For mobile, try to trigger autoplay when video becomes visible
                        if (isMobile) {
                            // Reload iframe with autoplay parameters when it comes into view
                            const currentSrc = iframe.src;
                            if (!currentSrc.includes('&forceplay=1')) {
                                iframe.src = currentSrc + '&forceplay=1';
                                console.log(`Reloaded video ${index + 1} for mobile autoplay`);
                            }
                        }
                    } else {
                        console.log(`Video ${index + 1} out of viewport`);
                    }
                });
            }, {
                threshold: 0.5 // Trigger when 50% of video is visible
            });
            
            observer.observe(iframe);
        }
        
        // Add touch event to start video on mobile
        if (isMobile) {
            const container = iframe.closest('.video-container-six');
            if (container) {
                container.addEventListener('touchstart', function() {
                    console.log(`Touch detected on video ${index + 1}, attempting autoplay`);
                    // Try to reload with fresh autoplay
                    const currentSrc = iframe.src;
                    iframe.src = currentSrc.replace('&forceplay=1', '') + '&forceplay=1&t=' + Date.now();
                }, { once: true });
            }
        }
    });
});

// Mobile optimization
documentReady(function() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Optimize for mobile performance
        const heavyAnimations = document.querySelectorAll('.heavy-animation');
        heavyAnimations.forEach(function(element) {
            element.classList.add('mobile-optimized');
        });
    }
});

// Error handling for missing dependencies
window.addEventListener('error', function(e) {
    console.warn('Script error caught:', e.message);
    // Graceful degradation - continue without failing
});

/* 7. PROJECT PAGE SCRIPTS
   ====================== */

// Back button functionality for project pages
function goBack() {
    console.log('goBack function called');
    try {
        window.location.href = 'works.html';
    } catch (error) {
        console.error('Error in goBack function:', error);
        // Fallback navigation method
        window.location = 'works.html';
    }
}

// Ensure goBack is globally available
window.goBack = goBack;

// Additional fallback: ensure back button is clickable
documentReady(function() {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        console.log('Back button found, ensuring it is clickable');
        
        // Ensure the button is clickable (no preventDefault - let HTML link work)
        backButton.style.cursor = 'pointer';
        backButton.style.pointerEvents = 'auto';
        backButton.style.zIndex = '100000';
    } else {
        console.log('Back button not found');
    }
});

/* End of script.js */

/* 8. SCROLL TO TOP FUNCTIONALITY
   ============================== */

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Make scrollToTop globally available
window.scrollToTop = scrollToTop;

// Show/hide scroll to top button based on scroll position
documentReady(function() {
    function initScrollButton() {
        const scrollButton = document.getElementById('scroll-to-top');
        if (scrollButton) {
            console.log('Scroll button found and initializing...');
            
            // Initially hide the button
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
            scrollButton.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
            
            // Show/hide button based on scroll position
            function handleScroll() {
                if (window.pageYOffset > 300) {
                    scrollButton.style.opacity = '1';
                    scrollButton.style.visibility = 'visible';
                } else {
                    scrollButton.style.opacity = '0';
                    scrollButton.style.visibility = 'hidden';
                }
            }
            
            window.addEventListener('scroll', handleScroll);
            
            // Add click event listener as backup
            scrollButton.addEventListener('click', scrollToTop);
            
            // Test initial visibility
            handleScroll();
            
            console.log('Scroll button initialized successfully');
        } else {
            console.error('Scroll button not found!');
        }
    }
    
    // Try immediately
    initScrollButton();
    
    // Also try after a short delay in case of timing issues
    setTimeout(initScrollButton, 100);
});

/* 9. ENHANCED MOBILE DRAG INTERACTION - REMOVED
   ============================================== */
   
// This section was removed to prevent conflicts with the existing advanced marquee system
// The existing marquee system in initAdvancedMarquee() already handles user interactions properly

/* End of enhanced script.js */ 