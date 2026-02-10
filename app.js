document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const goButton = document.getElementById('goButton');
    
    function handleGo() {
        const input = urlInput.value.trim();
        if (!input) return;
        
        let url = input;
        
        // Check if input is a URL or search term
        if (!input.includes('.') && !input.startsWith('http')) {
            // Treat as search query
            url = 'https://www.google.com/search?q=' + encodeURIComponent(input);
        } else if (!input.startsWith('http://') && !input.startsWith('https://')) {
            // Add protocol if missing
            url = 'https://' + input;
        }
        
        // Redirect to proxy endpoint
        window.location.href = '/proxy?url=' + encodeURIComponent(url);
    }
    
    goButton.addEventListener('click', handleGo);
    
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleGo();
        }
    });
    
    // Cursor light effect
    const cursorLight = document.createElement('div');
    cursorLight.className = 'cursor-light';
    document.body.appendChild(cursorLight);
    
    // Store previous positions for line trail
    let prevX = null;
    let prevY = null;
    
    document.addEventListener('mousemove', function(e) {
        // Update light position
        cursorLight.style.left = e.clientX + 'px';
        cursorLight.style.top = e.clientY + 'px';
        
        // Create line trail
        if (prevX !== null && prevY !== null) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            
            // Calculate distance and angle between points
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            // Position and style the line
            trail.style.left = prevX + 'px';
            trail.style.top = prevY + 'px';
            trail.style.width = distance + 'px';
            trail.style.transform = `rotate(${angle}deg)`;
            trail.style.transformOrigin = '0 50%';
            
            document.body.appendChild(trail);
            
            // Remove trail after animation
            setTimeout(() => {
                trail.remove();
            }, 500);
        }
        
        prevX = e.clientX;
        prevY = e.clientY;
    });
});
