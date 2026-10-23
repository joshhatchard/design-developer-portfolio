// ==============================
// Global Variables
// ==============================

let squares = []; // Array to hold all shape cells (squares) currently displayed on the canvas
let hueBase; // Base hue value used for dynamic background and color generation
let shapeImages = []; // Array to hold all shape image assets (square, circle, triangle, etc.)
let canvas; // Canvas object reference

// Interaction sound assets
let splitSound, mergeSound, rotateSound, switchSound;
let touchOrigin = null;
let touchTarget = null;
let pendingTap = null;
let tapTimer = null;
let resetGeneration = 0;
let pointer = { x: -1, y: -1 };
let selectedCell = null;
let canvasResizeObserver = null;

function getCanvasSize() {
  const host = document.querySelector('main');
  return { width: host.clientWidth, height: host.clientHeight };
}

function resizeSketch() {
  if (!canvas) return;
  const { width: canvasWidth, height: canvasHeight } = getCanvasSize();
  if (canvasWidth > 0 && canvasHeight > 0 && (width !== canvasWidth || height !== canvasHeight)) {
    resizeCanvas(canvasWidth, canvasHeight);
  }
}

function getGridLayout() {
  const cellSize = min(width / 2, height / 2) - 40;
  const gridSize = cellSize * 2;
  return { gridSize, offsetX: (width - gridSize) / 2, offsetY: (height - gridSize) / 2 };
}

function getCellAt(x, y) {
  const { gridSize, offsetX, offsetY } = getGridLayout();
  return squares.find(cell => cell.contains(x, y, offsetX, offsetY, gridSize)) || null;
}

function updatePointer(event) {
  const rect = canvas.elt.getBoundingClientRect();
  pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function handlePointerDown(event) {
  event.preventDefault();
  canvas.elt.focus();
  updatePointer(event);
  if (event.pointerType !== 'mouse') return;

  beginAudio();
  const cell = getCellAt(pointer.x, pointer.y);
  if (!cell) return;
  selectedCell = cell;
  if (event.button === 0) cell.startShrink();
  if (event.button === 2) attemptMerge(cell);
}

function handleKeyboard(event) {
  const actions = {
    ArrowLeft: cell => cell.cycleImage(-1),
    ArrowRight: cell => cell.cycleImage(1),
    ArrowUp: cell => cell.startRotate(1),
    ArrowDown: cell => cell.startRotate(-1),
  };
  if (!actions[event.key]) return;
  event.preventDefault();
  beginAudio();
  const cell = getCellAt(pointer.x, pointer.y) || selectedCell;
  if (!cell) return;
  selectedCell = cell;
  actions[event.key](cell);
}

function beginAudio() {
  userStartAudio();
}

function resetSketch() {
  clearTimeout(tapTimer);
  pendingTap = null;
  touchOrigin = null;
  touchTarget = null;
  selectedCell = null;
  resetGeneration++;
  squares = [];
  hueBase = random(360);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) squares.push(new ShapeCell(i / 2, j / 2, 0.5, 0.5, 0));
  }
}

// ==============================
// Preload assets (runs before setup)
// ==============================
function preload() {
  // Load and store image assets into the shapeImages array
  shapeImages.push(
    // Assets created by Joshua Hatchard (me)
    loadImage('assets/square1.png'),
    loadImage('assets/square3.png'),
    loadImage('assets/circle1.png'),
    loadImage('assets/circle2.png'),
    loadImage('assets/circle4.png'),
    loadImage('assets/triangle2.png')
  );

  // Load interaction audio assets.
  splitSound = loadSound('audio/split.mp3');
  // Audio created by northern87 - Pixabay
  mergeSound = loadSound('audio/merge.mp3');
  // Audio created by abhicreates - Pixabay
  rotateSound = loadSound('audio/rotate.mp3');
  // Audio created by Universfield - Pixabay
  switchSound = loadSound('audio/switch.mp3');
}

// ==============================
// Setup (runs once at start)
// ==============================
function setup() {
  const { width: canvasWidth, height: canvasHeight } = getCanvasSize();
  canvas = createCanvas(canvasWidth, canvasHeight); // Fill the space above the controls
  canvas.parent(document.querySelector('main'));
  canvas.elt.oncontextmenu = () => false; // Disable right-click context menu on canvas
  canvas.elt.tabIndex = 0;
  canvas.elt.addEventListener('pointermove', updatePointer);
  canvas.elt.addEventListener('mousemove', updatePointer);
  canvas.elt.addEventListener('pointerleave', () => { pointer = { x: -1, y: -1 }; });
  canvas.elt.addEventListener('pointerdown', handlePointerDown);
  canvas.elt.addEventListener('keydown', handleKeyboard);
  canvas.elt.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.elt.addEventListener('touchend', handleTouchEnd, { passive: false });
  canvas.elt.addEventListener('touchcancel', () => {
    touchOrigin = null;
    touchTarget = null;
    clearTimeout(tapTimer);
    pendingTap = null;
  });

  canvasResizeObserver = new ResizeObserver(resizeSketch);
  canvasResizeObserver.observe(document.querySelector('main'));

  colorMode(HSB, 360, 100, 100); // Use Hue-Saturation-Brightness color mode
  noStroke(); // Disable outline strokes
  hueBase = random(360); // Pick a random hue base for the color palette

  resetSketch();
  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('pointerdown', event => event.stopPropagation());
  resetButton.addEventListener('touchstart', event => event.stopPropagation(), { passive: true });
  resetButton.addEventListener('click', resetSketch);
}

function windowResized() {
  resizeSketch();
}

// ==============================
// Main draw loop (runs every frame)
// ==============================
function draw() {
  background(hueBase, 80, 70); // Set dynamic HSB background color

  const { gridSize, offsetX, offsetY } = getGridLayout();

  // Sort squares so animating ones are drawn last (appear on top)
  let renderQueue = squares.slice().sort((a, b) => (a.animating ? 1 : 0) - (b.animating ? 1 : 0));

  // Draw each shape cell
  for (let cell of renderQueue) {
    cell.display(offsetX, offsetY, gridSize);
  }
}

// ==============================
// Helper function: Get cell under mouse
// ==============================
function getCellUnderMouse() {
  return getCellAt(pointer.x, pointer.y);
}

// ==============================
// Mouse interaction: click to split or merge
// ==============================

// ==============================
// Keyboard interaction: rotate or switch shapes
// ==============================

function handleTouchStart(event) {
  event.preventDefault();
  beginAudio();
  if (event.touches.length !== 1) {
    touchOrigin = null;
    touchTarget = null;
    return;
  }
  updatePointer(event.touches[0]);
  touchOrigin = { ...pointer };
  touchTarget = getCellAt(pointer.x, pointer.y);
}

function handleTouchEnd(event) {
  event.preventDefault();
  if (!touchOrigin || !touchTarget || !event.changedTouches.length) return;
  updatePointer(event.changedTouches[0]);
  const deltaX = pointer.x - touchOrigin.x;
  const deltaY = pointer.y - touchOrigin.y;
  const distance = sqrt(deltaX * deltaX + deltaY * deltaY);
  const cell = touchTarget;
  if (distance < 24) {
    const now = performance.now();
    if (pendingTap && now - pendingTap.time < 300 && Math.hypot(pointer.x - pendingTap.x, pointer.y - pendingTap.y) < 32) {
      clearTimeout(tapTimer);
      attemptMerge(pendingTap.cell);
      pendingTap = null;
    } else {
      if (pendingTap && squares.includes(pendingTap.cell)) pendingTap.cell.startShrink();
      clearTimeout(tapTimer);
      pendingTap = { cell, time: now, ...pointer };
      tapTimer = setTimeout(() => {
        if (pendingTap && squares.includes(pendingTap.cell)) pendingTap.cell.startShrink();
        pendingTap = null;
      }, 300);
    }
  } else {
    clearTimeout(tapTimer);
    pendingTap = null;
    if (abs(deltaX) > abs(deltaY)) cell.cycleImage(deltaX > 0 ? 1 : -1);
    else cell.startRotate(deltaY > 0 ? -1 : 1);
  }

  touchOrigin = null;
  touchTarget = null;
}

// ==============================
// Attempt to merge four adjacent cells into one
// ==============================
function attemptMerge(targetCell) {
  let depth = targetCell.depth;
  if (depth === 0) return; // Can't merge depth 0 cells

  // Get all cells at the same depth
  let sameLevelCells = squares.filter(c => c.depth === depth);

  // Calculate the parent's grid position and size
  let parentW = targetCell.rw * 2;
  let parentH = targetCell.rh * 2;
  let parentX = Math.floor(targetCell.rx / parentW) * parentW;
  let parentY = Math.floor(targetCell.ry / parentH) * parentH;

  // Find the group of 4 matching cells that form a square
  let group = sameLevelCells.filter(c =>
    c.rx >= parentX && c.rx < parentX + parentW &&
    c.ry >= parentY && c.ry < parentY + parentH &&
    c.rw === parentW / 2 && c.rh === parentH / 2
  );

  // If all 4 are present, animate and replace them with a parent cell
  if (group.length === 4) {
    for (let cell of group) {
      cell.animating = true;
      cell.animationType = 'shrinkForMerge';
      cell.animationStart = millis();
    }

    // Delay to allow shrink animation before merging
    const generation = resetGeneration;
    setTimeout(() => {
      if (generation !== resetGeneration) return;
      squares = squares.filter(c => !group.includes(c));
      let parent = new ShapeCell(parentX, parentY, parentW, parentH, depth - 1);
      parent.scale = 0.001; // Start tiny
      parent.animating = true;
      parent.animationType = 'grow';
      parent.animationStart = millis();
      squares.push(parent);
      selectedCell = parent;

      if (mergeSound) mergeSound.play(); // Play merge sound
    }, 200);
  }
}

// ==============================
// ShapeCell class: Represents each individual shape
// ==============================
class ShapeCell {
  constructor(rx, ry, rw, rh, depth, colorOverride, rotation, shapeIndex) {
    this.rx = rx; // Relative X position (0 to 1)
    this.ry = ry; // Relative Y position
    this.rw = rw; // Relative width
    this.rh = rh; // Relative height
    this.depth = depth || 0; // Depth in hierarchy (used for splitting/merging)
    this.color = colorOverride || color(hueBase, 80, 70); // Assigned color
    this.rotation = rotation !== undefined ? rotation : random([0, HALF_PI, PI, PI + HALF_PI]); // Initial rotation
    this.shapeIndex = shapeIndex !== undefined ? shapeIndex : floor(random(shapeImages.length)); // Index of shape image

    this.scale = 1; // Scale for animation
    this.animating = false; // Whether the cell is currently animating
    this.animationType = null; // Type of animation ('shrink', 'grow', etc.)
    this.animationStart = 0; // Timestamp when animation started

    this.rotating = false; // Is the cell rotating?
    this.rotationFrom = this.rotation; // Start rotation angle
    this.rotationTo = this.rotation; // End rotation angle
    this.rotStart = 0; // Rotation start time

    this.nextShapeIndex = null; // For shape switching animation
  }

  // Render this shape cell
  display(offsetX, offsetY, gridSize) {
    // Handle rotation animation
    if (this.rotating) {
      let t = (millis() - this.rotStart) / 200;
      if (t >= 1) {
        this.rotation = this.rotationTo % TWO_PI;
        this.rotating = false;
      } else {
        this.rotation = lerp(this.rotationFrom, this.rotationTo, easeInOutCubic(t));
      }
    }

    // Convert relative coordinates to pixel positions
    let x = offsetX + this.rx * gridSize;
    let y = offsetY + this.ry * gridSize;
    let w = this.rw * gridSize;
    let h = this.rh * gridSize;
    let drawX = x + w / 2;
    let drawY = y + h / 2;

    // Highlight on hover
    let displayColor = this.color;
    if (this.contains(pointer.x, pointer.y, offsetX, offsetY, gridSize)) {
      let h = hue(this.color);
      let s = saturation(this.color);
      let b = brightness(this.color);
      displayColor = color(h, s, b - 10);
    }

    let currentScale = this.scale;

    // Handle different animations
    if (this.animating) {
      let elapsed = millis() - this.animationStart;
      let duration = 200;
      if (this.animationType === 'shrinkForChange' || this.animationType === 'growAfterChange') duration = 150;

      let amt = constrain(elapsed / duration, 0, 1);
      let eased = easeInOutCubic(amt);

      if (this.animationType === 'shrink') {
        currentScale = constrain(lerp(1, 0, eased), 0.001, 1);
        if (amt >= 1) this._completeShrink();
      } else if (this.animationType === 'grow') {
        currentScale = constrain(lerp(0, 1, eased), 0.001, 1);
        this.scale = currentScale;
        if (amt >= 1) this.animating = false;
      } else if (this.animationType === 'shrinkForChange') {
        currentScale = constrain(lerp(1, 0, eased), 0.001, 1);
        if (amt >= 1) {
          this.shapeIndex = this.nextShapeIndex;
          this.animationType = 'growAfterChange';
          this.animationStart = millis();
        }
      } else if (this.animationType === 'growAfterChange') {
        currentScale = constrain(lerp(0, 1, eased), 0.001, 1);
        this.scale = currentScale;
        if (amt >= 1) this.animating = false;
      } else if (this.animationType === 'shrinkForMerge') {
        currentScale = constrain(lerp(1, 0, eased), 0.001, 1);
        this.scale = currentScale;
        if (amt >= 1) this.animating = false;
      }
    }

    // Draw the shape
    push();
    translate(drawX, drawY); // Move origin to center of cell
    rotate(this.rotation); // Apply rotation
    imageMode(CENTER);
    tint(displayColor); // Tint the image with cell color

    let img = shapeImages[this.shapeIndex]; // Get shape image
    if (img) {
      let gap = 0.01 * gridSize;
      let size = min(w, h) - gap;
      image(img, 0, 0, size * currentScale, size * currentScale);
    } else {
      fill(displayColor);
      rect(-w / 2, -h / 2, w * currentScale, h * currentScale);
    }
    pop();
  }

  // Check if a point is inside this cell
  contains(px, py, offsetX, offsetY, gridSize) {
    let x = offsetX + this.rx * gridSize;
    let y = offsetY + this.ry * gridSize;
    let w = this.rw * gridSize;
    let h = this.rh * gridSize;
    return px >= x && px <= x + w && py >= y && py <= y + h;
  }

  // Start shrinking animation to split the cell
  startShrink() {
    this.animating = true;
    this.animationType = 'shrink';
    this.animationStart = millis();
  }

  // Handle cell split completion
  _completeShrink() {
    squares = squares.filter(c => c !== this);
    let children = this._createChildren(); // Split into 4 smaller cells
    for (let child of children) {
      child.scale = 0.001;
      child.animating = true;
      child.animationType = 'grow';
      child.animationStart = millis();
      squares.push(child);
    }
    selectedCell = children[0];

    if (splitSound) splitSound.play(); // Play split sound
  }

  // Create 4 smaller cells from this one
  _createChildren() {
    if (this.depth >= 3) return [this]; // Max depth reached
    let halfW = this.rw / 2;
    let halfH = this.rh / 2;
    let d = this.depth + 1;
    return [
      new ShapeCell(this.rx, this.ry, halfW, halfH, d),
      new ShapeCell(this.rx + halfW, this.ry, halfW, halfH, d),
      new ShapeCell(this.rx, this.ry + halfH, halfW, halfH, d),
      new ShapeCell(this.rx + halfW, this.ry + halfH, halfW, halfH, d)
    ];
  }

  // Rotate the cell by 90 degrees in the given direction
  startRotate(direction) {
    if (this.rotating) return;
    this.rotating = true;
    this.rotationFrom = this.rotation;
    this.rotationTo = this.rotation + direction * HALF_PI;
    this.rotStart = millis();

    if (rotateSound) rotateSound.play();
  }

  // Animate switching to the next shape image
  cycleImage(direction) {
    if (this.animating) return;
    this.nextShapeIndex = (this.shapeIndex + direction + shapeImages.length) % shapeImages.length;
    this.animating = true;
    this.animationType = 'shrinkForChange';
    this.animationStart = millis();

    if (switchSound) switchSound.play();
  }
}

// ==============================
// Easing function for smooth animations
// ==============================
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}

// ==============================
// Handle window resize event
// ==============================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size dynamically
}
