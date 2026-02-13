// ===========================
// VARIABEL GLOBAL
// ===========================
let currentMessage = '';
let currentSeal = 1;
let currentFrame = 'roses';
let mapInstance = null;
let markers = [];
let audioContext = null;
let isPlayingMusic = false;
let savedPoetry = '';

// ===========================
// INISIALISASI
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    createFallingHearts();
    createStars();
    setupEnvelopeClick();
    setupTabNavigation();
    initializeMap();
    startCountdown();
    initAudioContext();
});

// ===========================
// ANIMASI HATI BERJATUHAN
// ===========================
function createFallingHearts() {
    const canvas = document.getElementById('hearts-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const heartCount = 30;

    for (let i = 0; i < heartCount; i++) {
        hearts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            radius: Math.random() * 15 + 10,
            velocityY: Math.random() * 1 + 0.5,
            velocityX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.3
        });
    }

    function drawHeart(ctx, x, y, radius, opacity) {
        ctx.save();
        ctx.fillStyle = `rgba(255, 105, 180, ${opacity})`;
        ctx.globalAlpha = opacity;
        
        ctx.beginPath();
        ctx.moveTo(x, y + radius * 0.5);
        
        // Kurva jantung
        ctx.bezierCurveTo(
            x - radius, y - radius * 0.3,
            x - radius, y + radius * 0.3,
            x, y + radius
        );
        
        ctx.bezierCurveTo(
            x + radius, y + radius * 0.3,
            x + radius, y - radius * 0.3,
            x, y + radius * 0.5
        );
        
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach(heart => {
            heart.y += heart.velocityY;
            heart.x += heart.velocityX;

            // Tambah ke opacity saat jatuh
            if (heart.opacity < 0.8) {
                heart.opacity += 0.002;
            }

            // Wrap around jika keluar dari layar
            if (heart.y > canvas.height) {
                heart.y = -30;
                heart.x = Math.random() * canvas.width;
                heart.opacity = Math.random() * 0.5 + 0.3;
            }

            if (heart.x < -50) {
                heart.x = canvas.width + 50;
            } else if (heart.x > canvas.width + 50) {
                heart.x = -50;
            }

            drawHeart(ctx, heart.x, heart.y, heart.radius, heart.opacity);
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===========================
// ANIMASI BINTANG
// ===========================
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 20;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = (Math.random() * 3) + 's';
        starsContainer.appendChild(star);
    }
}

// ===========================
// ENVELOPE FUNCTIONALITY
// ===========================
function setupEnvelopeClick() {
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', function() {
        this.classList.toggle('open');
    });
}

// ===========================
// TAB NAVIGATION
// ===========================
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Hapus active dari semua button dan pane
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Tambah active ke button dan pane yang dipilih
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// ===========================
// MESSAGE FUNCTIONALITY
// ===========================
function updateMessage() {
    const input = document.getElementById('message-input');
    currentMessage = input.value || 'Terima kasih telah menjadi orang istimewa dalam hidupku...';
    document.getElementById('display-message').textContent = currentMessage;
    
    // Buka amplop
    document.getElementById('envelope').classList.add('open');
    
    // Tambah animasi
    const messageBox = document.querySelector('.display-message');
    messageBox.style.animation = 'none';
    setTimeout(() => {
        messageBox.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// ===========================
// COUNTDOWN TIMER
// ===========================
function startCountdown() {
    function updateTimer() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let valentineDay = new Date(currentYear, 1, 14); // 14 Februari

        // Jika Valentine sudah lewat tahun ini, hitung ke tahun depan
        if (now > valentineDay) {
            valentineDay = new Date(currentYear + 1, 1, 14);
        }

        const difference = valentineDay - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        const timerElement = document.getElementById('countdown-timer');
        if (timerElement) {
            timerElement.innerHTML = `
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="font-size: 2.5em; font-weight: bold; color: #ff69b4;">${days}</div>
                        <div style="color: #666;">Hari</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5em; font-weight: bold; color: #ff69b4;">${hours}</div>
                        <div style="color: #666;">Jam</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5em; font-weight: bold; color: #ff69b4;">${minutes}</div>
                        <div style="color: #666;">Menit</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5em; font-weight: bold; color: #ff69b4;">${seconds}</div>
                        <div style="color: #666;">Detik</div>
                    </div>
                </div>
            `;
        }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ===========================
// AUDIO CONTEXT & PIANO
// ===========================
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playPiano() {
    if (!audioContext) initAudioContext();
    
    if (isPlayingMusic) return;
    isPlayingMusic = true;

    // Melodi piano: Romantis
    const notes = [
        { freq: 261.63, duration: 0.5 },  // C
        { freq: 293.66, duration: 0.5 },  // D
        { freq: 329.63, duration: 0.5 },  // E
        { freq: 349.23, duration: 1 },    // F
        { freq: 392.00, duration: 0.5 },  // G
        { freq: 440.00, duration: 0.5 },  // A
        { freq: 493.88, duration: 1.5 },  // B
        { freq: 440.00, duration: 0.5 },  // A
        { freq: 392.00, duration: 0.5 },  // G
        { freq: 349.23, duration: 1 },    // F
        { freq: 329.63, duration: 0.5 },  // E
        { freq: 293.66, duration: 0.5 },  // D
        { freq: 261.63, duration: 2 },    // C
    ];

    playNotes(notes);
}

function playNotes(notes) {
    let currentTime = audioContext.currentTime;

    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);

        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);

        currentTime += note.duration;
    });

    // Set flag untuk berhenti setelah selesai
    setTimeout(() => {
        isPlayingMusic = false;
    }, currentTime - audioContext.currentTime + 1000);
}

function stopPiano() {
    isPlayingMusic = false;
    // Menghentikan semua oscillator adalah complex, jadi kita cukup stop flag
}

function setVolume(value) {
    // Implementasi volume control bisa dilakukan dengan gainNode
    const volume = value / 100;
    console.log('Volume set to:', volume);
}

// ===========================
// PHOTO GALLERY
// ===========================
function handlePhotoUpload(event) {
    const files = event.target.files;
    const gallery = document.getElementById('gallery-display');

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item frame-${currentFrame}`;
            
            const img = document.createElement('img');
            img.src = e.target.result;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '×';
            deleteBtn.onclick = () => galleryItem.remove();
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(deleteBtn);
            gallery.appendChild(galleryItem);
        };
        reader.readAsDataURL(file);
    });
}

function selectFrame(frameType) {
    currentFrame = frameType;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.className = `gallery-item frame-${frameType}`;
    });
}

// ===========================
// POETRY GENERATION
// ===========================
function generatePoetry() {
    const poetryTemplates = [
        "Hatimu adalah melodi indah\nyang membuat hidup saya bermakna,\nSetiap senyum mu adalah cahaya\nyang menerangi setiap hariku.\n\nCintaku untuk mu tak terbatas,\nSeperti bintang di langit malam,\nAbadi, hangat, dan penuh harapan,\nUntuk selamanya bersama mu.",

        "Di antara jutaan orang di dunia,\nHatinya memilih untuk mencintai dirimu,\nSetiap langkah bersama adalah bahagia,\nSetiap detik bersama adalah kenangan berharga.\n\nKamu adalah alasan saya tersenyum,\nKamu adalah mimpi yang menjadi nyata,\nTerima kasih telah menjadi bagian dari hidupku,\nRahasia terbesar kebahagiaanku.",

        "Ketika aku memandang matamu,\nAku melihat masa depan penuh warna,\nSetiap kata darimu musik di telingaku,\nSetiap sentuhan darimu membuat jantung berdegup cepat.\n\nCinta ini adalah hadiah terindah,\nyang pernah aku terima dalam hidup,\nMereka mengatakan cinta itu gerak hati,\nTapi cintaku untuk mu adalah keputusan hati.",

        "Dalam kesunyian malam yang panjang,\nAra terbayang senyumanmu,\nUntuk membuat hidup lebih bermakna,\nKamu adalah alasan aku percaya pada cinta.\n\nBersama mu, dunia terasa lebih cerah,\nBersama mu, segalanya mungkin terjadi,\nTerima kasih karena membuat hari istimewaku,\nMenjadi lebih indah, lebih bermakna, lebih berarti."
    ];

    const randomPoetry = poetryTemplates[Math.floor(Math.random() * poetryTemplates.length)];
    const poetryDisplay = document.getElementById('poetry-display');
    poetryDisplay.textContent = randomPoetry;
    savedPoetry = randomPoetry;
}

function savePoetry() {
    const poetryInput = document.getElementById('poetry-input').value;
    if (poetryInput) {
        savedPoetry = poetryInput;
        const poetryDisplay = document.getElementById('poetry-display');
        poetryDisplay.textContent = poetryInput;
        alert('Puisi berhasil disimpan!');
    } else {
        alert('Silakan tulis puisi terlebih dahulu!');
    }
}

// ===========================
// MAP FUNCTIONALITY
// ===========================
function initializeMap() {
    // Inisialisasi map dengan lokasi default (Jakarta)
    mapInstance = L.map('map').setView([-6.2088, 106.8456], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(mapInstance);

    // Tambah kemampuan klik pada map
    mapInstance.on('click', function(e) {
        document.getElementById('location-name').dataset.lat = e.latlng.lat;
        document.getElementById('location-name').dataset.lng = e.latlng.lng;
    });
}

function addMemoryLocation() {
    const locationName = document.getElementById('location-name').value;
    const lat = document.getElementById('location-name').dataset.lat;
    const lng = document.getElementById('location-name').dataset.lng;

    if (!locationName) {
        alert('Silakan masukkan nama lokasi!');
        return;
    }

    if (!lat || !lng) {
        alert('Silakan klik pada peta untuk memilih lokasi!');
        return;
    }

    // Tambah marker ke map
    const marker = L.marker([lat, lng]).addTo(mapInstance)
        .bindPopup(locationName);

    markers.push({
        name: locationName,
        lat: lat,
        lng: lng,
        marker: marker
    });

    // Tambah ke list
    const locationsList = document.getElementById('locations-list');
    const locationItem = document.createElement('div');
    locationItem.className = 'location-item';
    locationItem.innerHTML = `
        <span><strong>📍 ${locationName}</strong><br><small>${lat.toFixed(4)}, ${lng.toFixed(4)}</small></span>
        <button onclick="removeLocation('${locationName}')">Hapus</button>
    `;
    locationsList.appendChild(locationItem);

    document.getElementById('location-name').value = '';
    delete document.getElementById('location-name').dataset.lat;
    delete document.getElementById('location-name').dataset.lng;
}

function removeLocation(locationName) {
    const index = markers.findIndex(m => m.name === locationName);
    if (index > -1) {
        mapInstance.removeLayer(markers[index].marker);
        markers.splice(index, 1);

        // Update list
        const locationsList = document.getElementById('locations-list');
        const items = locationsList.querySelectorAll('.location-item');
        items.forEach(item => {
            if (item.textContent.includes(locationName)) {
                item.remove();
            }
        });
    }
}

// ===========================
// SEAL SELECTION
// ===========================
function setSeal(sealNumber) {
    currentSeal = sealNumber;
    const waxSeal = document.getElementById('wax-seal');
    
    waxSeal.classList.remove('seal-1', 'seal-2', 'seal-3', 'seal-4', 'seal-5');
    waxSeal.classList.add(`seal-${sealNumber}`);
    waxSeal.textContent = sealNumber;

    // Tampilkan notifikasi
    const sealNames = ['', 'Mawar Merah', 'Hati Emas', 'Bintang Perak', 'Bululintar', 'Mahkota Mutiara'];
    alert(`Segel ${sealNames[sealNumber]} dipilih untuk amplop Anda!`);
}

// ===========================
// DOWNLOAD & SHARE
// ===========================
function downloadCard() {
    // Menggunakan html2canvas untuk mendownload kartu sebagai gambar
    // Untuk sekarang, kita akan membuat simulasi dengan membuat file HTML
    
    const cardContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Kartu Ucapan Valentine</title>
        <style>
            body {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #333;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .card {
                background: white;
                max-width: 600px;
                margin: 20px auto;
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            h1 { color: #764ba2; }
            .message { 
                background: #fff5e1;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                border-left: 4px solid #ff69b4;
                white-space: pre-wrap;
            }
            .footer { color: #999; margin-top: 30px; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>💝 Hari Valentine 💝</h1>
            <div class="message">${currentMessage || 'Pesan spesial untuk Anda'}</div>
            <p><strong>Segel Dipilih:</strong> Tipe ${currentSeal}</p>
            ${savedPoetry ? `<div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 10px;"><strong>Puisi:</strong><pre>${savedPoetry}</pre></div>` : ''}
            <div class="footer">
                <p>Dibuat dengan 💕 untuk orang spesial</p>
                <p>${new Date().toLocaleDateString('id-ID')}</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(cardContent));
    element.setAttribute('download', 'Kartu-Valentine.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert('Kartu Valentine berhasil diunduh!');
}

function shareCard() {
    const shareText = `💝 Aku ingin berbagi Kartu Ucapan Valentine Spesial:\n\n"${currentMessage}"\n\nGenerated with Love on Valentine's Day! ❤️`;

    // Cek jika Web Share API tersedia
    if (navigator.share) {
        navigator.share({
            title: '💝 Jangan Dibukaaa',
            text: shareText,
        }).catch(err => console.log('Error:', err));
    } else {
        // Fallback ke copy ke clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Teks bagikan telah disalin ke clipboard!');
        }).catch(err => {
            alert('Teks untuk dibagikan:\n' + shareText);
        });
    }
}

// ===========================
// EVENT LISTENERS TAMBAHAN
// ===========================
window.addEventListener('resize', function() {
    // Canvas hati akan di-resize otomatis
});

// Handle untuk menambah tombol delete pada gallery items
document.addEventListener('click', function(e) {
    if (e.target.className === 'delete-btn') {
        e.target.parentElement.remove();
    }
});

