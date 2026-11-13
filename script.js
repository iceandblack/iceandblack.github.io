
/* ==========================================
   BLACKICE TECH
   ANIMATIONS AND SLIDESHOW CONTROLLER
========================================== */


/* ==========================================
   1. HERO CANVAS ANIMATION
========================================== */

const canvas = document.getElementById("fanCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    if (ctx) {

        let canvasWidth = 0;
        let canvasHeight = 0;

        // Resize canvas correctly
        function resizeCanvas() {

            const rect = canvas.getBoundingClientRect();

            const dpr = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            canvasWidth = rect.width;
            canvasHeight = rect.height;

            canvas.width = Math.round(canvasWidth * dpr);
            canvas.height = Math.round(canvasHeight * dpr);

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);


        // Ray settings
        const RAY_COUNT = 300;

        const rays = [];

        for (let i = 0; i < RAY_COUNT; i++) {

            const t = i / (RAY_COUNT - 1);

            rays.push({

                angle:
                    -Math.PI / 2 +
                    (t - 0.5) * Math.PI * 0.9,

                length:
                    0.35 + Math.random() * 0.65,

                width:
                    0.5 + Math.random() * 1,

                alpha:
                    0.25 + Math.random() * 0.65

            });

        }


        // Mouse movement
        let targetMouse = 0;
        let mouse = 0;

        document.addEventListener("mousemove", function (e) {

            targetMouse =
                e.clientX / window.innerWidth - 0.5;

        });


        // Animation start
        const startTime = performance.now();


        // Main animation function
        function draw(now) {

            const time = Math.max(
                0,
                (now - startTime) / 1000
            );


            // Opening animation
            const grow = 1 - Math.pow(
                1 - Math.min(1, time / 1.6),
                4
            );


            // Clear canvas
            ctx.clearRect(
                0,
                0,
                canvasWidth,
                canvasHeight
            );


            // Smooth mouse movement
            mouse += (targetMouse - mouse) * 0.06;


            // Animation origin
            const cx = canvasWidth / 2;
            const cy = canvasHeight;

            const maxX = canvasWidth * 0.4;
            const maxY = canvasHeight * 0.8;


            // Draw rays
            for (const ray of rays) {

                // Breathing effect
                const breathe =
                    Math.sin(
                        time * 0.8 + ray.angle * 10
                    ) * 0.03;


                const len =
                    (ray.length + breathe) * grow;


                // Mouse interaction
                const angle =
                    ray.angle + mouse * 0.25;


                const x =
                    cx + Math.cos(angle) * maxX * len;

                const y =
                    cy + Math.sin(angle) * maxY * len;


                // Ray lines
                ctx.strokeStyle =
                    `rgba(255, 255, 255, ${ray.alpha})`;

                ctx.lineWidth = ray.width;

                ctx.beginPath();

                ctx.moveTo(cx, cy);

                ctx.lineTo(x, y);

                ctx.stroke();


                // Ray particles
                ctx.fillStyle =
                    `rgba(255, 255, 255, ${ray.alpha})`;

                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    ray.width + 0.5,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }


            // Continue animation
            requestAnimationFrame(draw);

        }


        // Start animation
        requestAnimationFrame(draw);

    }

}



/* ==========================================
   2. PROJECTS SLIDESHOW
========================================== */

const slides = document.querySelectorAll(".slide");

if (slides.length > 1) {

    let current = 0;

    function showNextSlide() {

        slides[current].classList.remove("active");

        current = (current + 1) % slides.length;

        slides[current].classList.add("active");

    }

    // Change image every 3 seconds
    setInterval(showNextSlide, 3000);

}



/* ==========================================
   3. ABOUT SECTION SLIDESHOW
========================================== */

const slides2 = document.querySelectorAll(".slide2");

if (slides2.length > 1) {

    let current2 = 0;

    function showNextSlide2() {

        slides2[current2].classList.remove("active2");

        current2 = (current2 + 1) % slides2.length;

        slides2[current2].classList.add("active2");

    }

    // Change image every 5 seconds
    setInterval(showNextSlide2, 5000);

}



/* ==========================================
   4. AUTOMATIC FOOTER YEAR
========================================== */

const footerYear = document.getElementById("footer-year");

if (footerYear) {

    footerYear.textContent = new Date().getFullYear();

}

