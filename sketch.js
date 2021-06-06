img = "";
video = "";
objects = [];
percent = 0;
var i;
status = "";
function preload() {
  video = createVideo('video.mp4');
}

function setup() {
  canvas = createCanvas(1000, 580);
  video.hide();
}

function playFeed() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById('status').innerHTML = "Detecting Objects";
}

function modelLoaded() {
  console.log("Model is Loaded");
  status = true;
  objectDetector.detect(video, gotResults);
  video.loop();
  video.speed(1);
  video.volume(0);
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 1000, 580);
  canvas.center();
  if (status != "") {
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) {
      stroke('red');
      fill('red');
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      document.getElementById('objects').innerHTML = "There are " + objects.lengh + " objects on video feed";
    }
  }
}
