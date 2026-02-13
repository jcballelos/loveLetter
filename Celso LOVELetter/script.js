// Get elements
const noBtn = document.getElementById("noBtn");

// Move NO button on hover/touch - more evasive
function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    const randomX = Math.random() * maxX + 10;
    const randomY = Math.random() * maxY + 10;
    
    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveButton();
});

// Create floating hearts with enhanced animation
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💜";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 2.5 + 4) + "s";
    heart.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5500);
}

const heartInterval = setInterval(createHeart, 300);

// Create falling flowers with enhanced animation
function createFlower() {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerHTML = "🌸";
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = (Math.random() * 2 + 4) + "s";
    flower.style.animationDelay = Math.random() * 0.3 + "s";
    document.body.appendChild(flower);
    
    setTimeout(() => flower.remove(), 5300);
}

// Enhanced Typing effect with smooth character appearance
function typeWriter(el, text, speed = 30) {
    el.innerHTML = "";
    let i = 0;
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            const span = document.createElement("span");
            span.style.display = "inline";
            span.style.animation = "charAppear 0.3s ease-out";
            span.textContent = char;
            el.appendChild(span);
            
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add character animation
const style = document.createElement('style');
style.textContent = `
    @keyframes charAppear {
        0% {
            opacity: 0;
            transform: translateY(10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Envelope click handler
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.classList.toggle('open');
        
        if (envelope.classList.contains('open')) {
            // Small delay before showing letter
            setTimeout(showLetter, 700);
        }
    }
}

// Show letter function
function showLetter() {
    const message = document.getElementById("message");
    message.style.opacity = "0";
    message.innerHTML = '<div class="letter"><span id="typed"></span><span class="cursor"></span></div>';
    
    // Smooth fade in
    setTimeout(() => {
        message.style.transition = "opacity 0.8s ease-in-out";
        message.style.opacity = "1";
    }, 50);

    const text = `My Dearest Ayezza 💜

You are my happiness, my peace, 
and my absolute favorite person.

Every moment with you feels like magic.
Every laugh, every smile, every heartbeat.

Thank you for choosing me today,
and for choosing me every single day.

I promise to love you with all my heart,
to protect you, to cherish you,
and to make you smile forever.

You are my greatest blessing.

Happy Valentine's Day 💕

Forever and always yours,
Cj 💖`;

    // Type with enhanced speed
    setTimeout(() => {
        typeWriter(document.getElementById("typed"), text, 22);
    }, 300);
}

// YES button click handler with envelope
function sayYes() {
    const music = document.getElementById("music");
    music.currentTime = 0;
    music.play().catch(err => console.log("Audio play failed:", err));
    
    // Remove the no button
    noBtn.style.display = "none";
    
    // Create more flowers with staggered timing
    for (let i = 0; i < 70; i++) {
        setTimeout(createFlower, i * 40);
    }

    // Create envelope
    const message = document.getElementById("message");
    message.innerHTML = `
        <div class="envelope-container">
            <div class="envelope" onclick="openEnvelope()">
                <div class="envelope-flap"></div>
                <div class="envelope-body">
                    <span>💌</span>
                </div>
            </div>
        </div>
    `;
    
    message.style.opacity = "0";
    message.style.transition = "opacity 0.8s ease-in-out";
    
    // Smooth fade in
    setTimeout(() => {
        message.style.opacity = "1";
    }, 50);
}

// Enhanced Fireworks effect with more particles
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 4;
        this.speedX = (Math.random() - 0.5) * 12;
        this.speedY = (Math.random() - 0.5) * 12;
        this.color = ["#ff4da6", "#ff1a8c", "#ff66cc", "#ffccff", "#ff0080", "#ff69b4"][Math.floor(Math.random() * 6)];
        this.life = 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.18;
        this.life -= 0.01;
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        ctx.globalAlpha = 1;
    }
}

function createFireworks(x, y) {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y));
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    
    if (particles.length > 0) {
        requestAnimationFrame(animateFireworks);
    }
}

// Create fireworks on click/yes
document.addEventListener("click", function(e) {
    if (e.target.closest(".yes")) {
        createFireworks(e.clientX, e.clientY);
        animateFireworks();
    }
});

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Log when page loads
console.log("🎉 Valentine's Day page loaded! Good luck, Cj! 💜");