(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/
const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    // Mini-game twist: always play the game before going to yes_page.html
    startYesMiniGame();
}

// EmailJS message sending (used on yes_page.html)
(function setupMessageSending() {
    const EMAILJS_PUBLIC_KEY = "Jsq8y9n9irXxy36f-";
    const EMAILJS_SERVICE_ID = "service_vi9ffxq";
    const EMAILJS_TEMPLATE_ID = "template_xzyvp0c";

    let emailAvailable = false;

    if (window.emailjs) {
        try {
            emailjs.init(EMAILJS_PUBLIC_KEY);
            emailAvailable = true;
        } catch (e) {
            console.error("EmailJS init error:", e);
        }
    }

    window.addEventListener("load", () => {
        const sendBtn = document.getElementById("sendBtn");
        const loveInput = document.getElementById("loveInput");
        const display = document.getElementById("displayMessage");

        // Only run on pages that have the message UI (yes_page.html)
        if (!sendBtn || !loveInput || !display) return;

        sendBtn.addEventListener("click", () => {
            const input = loveInput.value.trim();
            if (!input) {
                display.textContent = "❌ Please type a message!";
                return;
            }
            if (!emailAvailable) {
                display.textContent = "❌ Email service not available. Check your EmailJS setup.";
                return;
            }
            sendBtn.disabled = true;
            display.textContent = "📨 Sending...";

            const templateParams = { mahiwagangmensahe: input };
            emailjs
                .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(
                    () => {
                        display.textContent = "💌 Message sent! 💖";
                        sendBtn.disabled = false;
                        loveInput.value = "";
                        setTimeout(function () {
                            window.location.href = "flower/flower.html";
                        }, 3000);
                    },
                    (error) => {
                        console.error("EmailJS Error:", error);
                        display.textContent = "❌ Failed to send! Check service/template/key in EmailJS.";
                        sendBtn.disabled = false;
                    }
                );
        });
    });
})();

// Fun twist for the Yes button on the main page
window.addEventListener("load", () => {
    const yesBtn = document.querySelector(".yes-button");
    if (!yesBtn) return;

    yesBtn.addEventListener("mouseenter", () => {
        yesBtn.classList.add("twist");
        setTimeout(() => {
            yesBtn.classList.remove("twist");
        }, 500);
    });
});

function startYesMiniGame() {
    // Only relevant on index.html (where the Yes/No buttons exist)
    const yesBtn = document.querySelector(".yes-button");
    if (!yesBtn) {
        window.location.href = "yes_page.html";
        return;
    }

    // Prevent stacking multiple overlays
    if (document.getElementById("yesGameOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "yesGameOverlay";
    overlay.innerHTML = `
        <div class="yes-game-card">
            <div class="yes-game-title">Catch the Hearts! 💖</div>
            <div class="yes-game-subtitle">Click 5 hearts before they disappear!</div>
            <div class="yes-game-arena" id="yesGameArena"></div>
            <div class="yes-game-status" id="yesGameStatus">0 / 5</div>
            <button type="button" class="yes-game-cancel" id="yesGameCancel">Not yet</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const arena = document.getElementById("yesGameArena");
    const status = document.getElementById("yesGameStatus");
    const cancel = document.getElementById("yesGameCancel");

    let score = 0;
    let hearts = [];
    let gameInterval = null;

    function createHeart() {
        if (!arena) return;
        
        const heart = document.createElement("div");
        heart.className = "yes-game-heart";
        heart.textContent = "💖";
        
        const x = Math.random() * (arena.offsetWidth - 50);
        const y = Math.random() * (arena.offsetHeight - 50);
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        // Random animation duration (2-4 seconds)
        const duration = 2000 + Math.random() * 2000;
        heart.style.animation = `heartFloat ${duration}ms ease-out forwards`;
        
        arena.appendChild(heart);
        hearts.push(heart);
        
        heart.addEventListener("click", () => {
            score += 1;
            if (status) status.textContent = `${score} / 5`;
            
            heart.style.animation = "heartPop 0.3s ease-out forwards";
            setTimeout(() => {
                heart.remove();
                hearts = hearts.filter(h => h !== heart);
            }, 300);
            
            if (score >= 5) {
                if (status) status.textContent = "You win! 💖";
                if (gameInterval) clearInterval(gameInterval);
                hearts.forEach(h => h.remove());
                setTimeout(() => {
                    overlay.remove();
                    window.location.href = "yes_page.html";
                }, 1000);
            }
        });
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
                hearts = hearts.filter(h => h !== heart);
            }
        }, duration);
    }

    // Start creating hearts
    createHeart();
    gameInterval = setInterval(() => {
        if (hearts.length < 3 && score < 5) {
            createHeart();
        }
    }, 1500);

    cancel.addEventListener("click", () => {
        if (gameInterval) clearInterval(gameInterval);
        hearts.forEach(h => h.remove());
        overlay.remove();
    });
}