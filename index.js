//jshint esversion:6

const c = document.querySelector(".cursor");
const eraseBtn = document.querySelector(".erase-btn");
const rainbowBtn = document.querySelector(".rainbow-btn");

let paintObjects = []; // Paint is stored here

let isNoPaint = false; // When 'true', hide the cursor and avoid painting
let shouldPaint = false; // When 'true', start painting i.e. pen down

let isRainBowPaint = false; // When 'true', change hue of paint
let hue = 0; // Keep track of hue (0-360)

$(rainbowBtn).click(() => {
    isRainBowPaint = !isRainBowPaint;
    if (isRainBowPaint) {
        rainbowBtn.innerHTML = `RAINBOW MODE - ON`;
    }
    else {
        rainbowBtn.innerHTML = `RAINBOW MODE - OFF`;
    }
});

// Detect mouse movement
$(document).on("mousemove", event => {
  const x = event.pageX;
  const y = event.pageY;
  moveCursorDiv(x, y);

  detectDeleteButtonProximity(x, y);
  paint(x, y);
});

$(document).on("mousedown", event => {
  
  // To ensure painting isn't available when mouse is near del-button
  if (!isNoPaint) {
    shouldPaint = true;
  }
});

$(document).on("mouseup", event => {
  shouldPaint = false;
});

// Delete paint
$(".erase-btn").click(() => {
  if (paintObjects.length > 0) {
    paintObjects.forEach(paint => {
      document.querySelector("body").removeChild(paint);
    });

    paintObjects = [];
  }
});


// Paint
function paint(x, y) {
  // Don't paint if the mouse is near the delete-button
  // and/or the mouse-button isn't down
  if (isNoPaint || !shouldPaint) { return; }

  const paint = document.createElement("div");
  paint.classList.add("paint");

  const xPos = x;
  const yPos = y;
  paint.style.left = `${xPos}px`;
  paint.style.top = `${yPos}px`;

  if (isRainBowPaint) {
    paint.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    hue += 1;
    if (hue > 360) { hue = 0; }
  }

  paintObjects.push(paint);

  $("body").append(paint);
}

// Move the cursor-div
function moveCursorDiv(x, y) {
  c.style.top = y + "px";
  c.style.left = x + "px";
}

// Hide cursor if on navbar
function detectDeleteButtonProximity(x, y) {
  if (y <= 40) {
    c.classList.add("hide");
    isNoPaint = true;
  }
  else {
    c.classList.remove("hide");
    isNoPaint = false;
  }
}