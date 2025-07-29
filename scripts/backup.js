function circleAnim() {
    const startTime = performance.now(); // Record the start time
    const totalTime = timeLeft * 100; // Total animation time in milliseconds

    function updateCircle() {
        const elapsedTime = performance.now() - startTime; // Calculate elapsed time
        const progress = Math.min(elapsedTime / totalTime, 1); // Ensure progress doesn't exceed 1
        circleAngle = 100 - progress * 100; // Calculate the new angle
        console.log(elapsedTime, progress, circleAngle)
        document.querySelector(":root").style.setProperty("--circleAngle", `${circleAngle}%`);

        if (progress < 1) {
            requestAnimationFrame(updateCircle); // Continue the animation
        } else return;
    }

    requestAnimationFrame(updateCircle); // Start the animation
}

circleAngle = localTime  / (workTimeInput.value * 60);

60000