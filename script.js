const canvas = document.getElementById("fanCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener("resize", resize);

const RAY_COUNT = 300;
const rays = [];

for (let i = 0; i < RAY_COUNT; i++) {
    const t = i / (RAY_COUNT - 1);
    rays.push({
        angle: -Math.PI / 2 + (t - 0.5) * Math.PI * 0.9,
        length: 0.35 + Math.random() * 0.65,
        width: 0.5 + Math.random() * 1,
        alpha: 0.25 + Math.random() * 0.65
    });
}

let targetMouse = 0;
let mouse = 0;

document.addEventListener("mousemove", function (e) {
    targetMouse = e.clientX / window.innerWidth - 0.5;
});

const startTime = performance.now();

function draw(now) {
    const time = Math.max(0, (now - startTime) / 1000);
    const grow = 1 - Math.pow(1 - Math.min(1, time / 1.6), 4);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mouse += (targetMouse - mouse) * 0.06;

    const cx = canvas.width / 2;
    const cy = canvas.height;
    const maxX = canvas.width * 0.4;
    const maxY = canvas.height * 0.8;

    for (const ray of rays) {
        const breathe = Math.sin(time * 0.8 + ray.angle * 10) * 0.03;
        const len = (ray.length + breathe) * grow;

        const angle = ray.angle + mouse * 0.25;
        const x = cx + Math.cos(angle) * maxX * len;
        const y = cy + Math.sin(angle) * maxY * len;

        ctx.strokeStyle = "rgba(255, 255, 255, " + ray.alpha + ")";
        ctx.lineWidth = ray.width;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, " + ray.alpha + ")";
        ctx.beginPath();
        ctx.arc(x, y, ray.width + 0.5, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
