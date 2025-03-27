document.addEventListener("DOMContentLoaded", function () {
    console.log("External script loaded and running!");

    const canvas = document.getElementById('weSpinWheel');
    if (!canvas) {
        console.error("Canvas not found!");
        return;
    }

    const ctx = canvas.getContext('2d');
    let rotation = 0;

    function drawWheel() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2;

        const activeSlices = JSON.parse(canvas.getAttribute("data-slices"));
        const angle = (2 * Math.PI) / activeSlices.length;

        activeSlices.forEach((slice, i) => {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle * i, angle * (i + 1));
            ctx.closePath();
            ctx.fillStyle = slice.bgColor;
            ctx.fill();
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle * i + angle / 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(slice.text, radius * 0.6, 5);
            ctx.restore();
        });

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.15, 0, 2 * Math.PI);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    }

    function spinWheel() {
        let spinAngle = Math.floor(Math.random() * 360) + 1440;
        let duration = 3;

        canvas.style.transition = 'transform ' + duration + 's ease-out';
        canvas.style.transform = 'rotate(' + (rotation + spinAngle) + 'deg)';
        rotation += spinAngle;
    }

    window.spinWheel = spinWheel; // Expose function globally

    drawWheel();
});
