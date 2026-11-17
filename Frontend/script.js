const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

const massRange = document.getElementById('massRange');
const kRange = document.getElementById('kRange');
const cRange = document.getElementById('cRange');
const massVal = document.getElementById('massVal');
const kVal = document.getElementById('kVal');
const cVal = document.getElementById('cVal');
const resetBtn = document.getElementById('resetBtn');

let m = parseFloat(massRange.value);
let k = parseFloat(kRange.value);
let c = parseFloat(cRange.value);

let x = 1.0; // Initial displacement (meters)
let v = 0.0; // Initial velocity
let t = 0.0;
const dt = 0.02;

// Update labels
function updateLabels() {
    massVal.textContent = m;
    kVal.textContent = k;
    cVal.textContent = c;
}

[massRange, kRange, cRange].forEach(input => {
    input.addEventListener('input', (e) => {
        m = parseFloat(massRange.value);
        k = parseFloat(kRange.value);
        c = parseFloat(cRange.value);
        updateLabels();
    });
});

resetBtn.addEventListener('click', () => {
    x = 1.0;
    v = 0.0;
    t = 0.0;
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];
    chart.update();
});

// Setup Chart.js
const ctxChart = document.getElementById('oscillationChart').getContext('2d');
const chart = new Chart(ctxChart, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: 'Displacement (x)', borderColor: '#38bdf8', data: [], borderWidth: 2, pointRadius: 0 },
            { label: 'Velocity (v)', borderColor: '#f43f5e', data: [], borderWidth: 2, pointRadius: 0 }
        ]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            x: { title: { display: true, text: 'Time (s)', color: '#94a3b8' }, ticks: { color: '#94a3b8' } },
            y: { title: { display: true, text: 'Amplitude', color: '#94a3b8' }, ticks: { color: '#94a3b8' }, suggestedMin: -1.5, suggestedMax: 1.5 }
        }
    }
});

function drawSpring(xPos, yPos, length, coils) {
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, yPos);

    let dx = length / (coils * 2);
    let currentX = 50;
    let toggle = 1;

    for (let i = 0; i < coils * 2; i++) {
        currentX += dx;
        let currentY = yPos + (toggle * 15);
        ctx.lineTo(currentX, currentY);
        toggle *= -1;
    }
    ctx.lineTo(xPos, yPos);
    ctx.stroke();
}

function animate() {
    // Physics integration step
    let acceleration = (-k * x - c * v) / m;
    v += acceleration * dt;
    x += v * dt;
    t += dt;

    // Render Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Wall anchor
    ctx.fillStyle = '#64748b';
    ctx.fillRect(40, 40, 10, 120);

    // Map physical displacement (-1.5m to 1.5m) to pixel coordinates (150px to 450px)
    let blockX = 250 + (x * 120);
    drawSpring(blockX, 100, blockX - 50, 12);

    // Mass block
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(blockX, 70, 50, 60);
    ctx.fillStyle = '#0f172a';
    ctx.font = '12px sans-serif';
    ctx.fillText('m', blockX + 18, 105);

    // Update chart data periodically
    if (Math.round(t * 50) % 3 === 0) {
        chart.data.labels.push(t.toFixed(1));
        chart.data.datasets[0].data.push(x);
        chart.data.datasets[1].data.push(v);

        if (chart.data.labels.length > 100) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
            chart.data.datasets[1].data.shift();
        }
        chart.update('none');
    }

    requestAnimationFrame(animate);
}

updateLabels();
animate();