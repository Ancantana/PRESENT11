let capture;
let textInput;
let capturedImage;

function setup() {
  createCanvas(400, 300);
  capture = createCapture(VIDEO);
  capture.size(400, 300);
  capture.hide();

  textInput = select('#textInput');
  textInput.input(updateCapturedImage);
  textInput.elt.maxLength = 100;
  textInput.elt.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      takeImage();
    }
  });
}

function draw() {
  background(220);

  // Display the camera feed on the left side
  image(capture, 0, 5);

  // Display the ASCII art on the right side
  fill(0);
  textSize(8);
  text(generateAsciiArt(), 410, 30);
}

function windowResized() {
  resizeCanvas(800, 600);
  capture.size(400, 300);
}

function updateCapturedImage() {
  takeImage();
}

function takeImage() {
  // Capture the current video frame
  capturedImage = capture.get();

  // Convert the image into grayscale for ASCII art
  capturedImage.filter(GRAY);

  // Redraw to update the ASCII art
  redraw();
}

function generateAsciiArt() {
  if (!capturedImage) {
    return '';
  }

  let asciiArt = '';
  let w = capturedImage.width;
  let h = capturedImage.height;

  for (let y = 0; y < h; y += 10) {
    for (let x = 0; x < w; x += 6) {
      let index = int(map(brightness(capturedImage.get(x, y)), 0, 255, 0, 9));
      asciiArt += ' .:-=+*%@#'[index];
    }
    asciiArt += '\n';
  }
  return asciiArt;
}

