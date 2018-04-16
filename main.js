let cloudSettings = {
  radius : 5,
  maxAltitude : 30, // distance from the top, this is higher
  minAltitude : 70, // this is lower
  maxBaseWidth : 50,
  minBaseWidth : 15, // cannot be less than diameter (2x radius)
  maxDistBtnClouds : 500,
  minDistBtnClouds : 300,
  pace : 0.01
}
let clouds = [];
let latestCloud;
let worldHeight = window.innerHeight;
let worldWidth = window.innerWidth;
let x = 0;
let y = 1;

function start() {
  const canvas2DSupported = !!window.CanvasRenderingContext2D;
  if(canvas2DSupported) {
    let canvasClouds = document.getElementById('canvas-clouds');
    let canvasBg = document.getElementById('canvas-bg');

    canvasBg.width = canvasClouds.width = worldWidth;
    canvasBg.height = canvasClouds.height = worldHeight;
    let cloudsCtx = canvasClouds.getContext('2d');
    let bgCtx = canvasBg.getContext('2d');

    let skylineGradient = bgCtx.createLinearGradient(worldWidth/2, 0, worldWidth/2, worldHeight);
    skylineGradient.addColorStop(0.8, 'lightblue')
    skylineGradient.addColorStop(1, 'lightblue');
    bgCtx.fillStyle = skylineGradient;
    bgCtx.fillRect(0, 0, worldWidth, worldHeight);

    let cloudsGradient = cloudsCtx.createLinearGradient(worldWidth/2, 0, worldWidth/2, cloudSettings.minAltitude);
    cloudsGradient.addColorStop(0, 'white')
    cloudsGradient.addColorStop(0.4, 'rgb(255, 255, 255)');
    cloudsCtx.fillStyle = cloudsGradient;

    let firstCloud;
    latestCloud = firstCloud = generateCloud(cloudSettings);
    clouds.push(firstCloud);

    setInterval(
      () => {
        drawClouds(cloudsCtx);
        moveClouds();
      },
      1
    );
  }
}
function generateCloud(cloudSettings) {
  let baseWidth = rand(cloudSettings.minBaseWidth, cloudSettings.maxBaseWidth);
  let tailDistance = rand(cloudSettings.minDistBtnClouds, cloudSettings.maxDistBtnClouds);
  // distance required to initially draw cloud outside of viewport
  let roundedWidth = Math.floor(
    baseWidth / (cloudSettings.radius * 2)
  ) * cloudSettings.radius * 2; // round width to nearest diameter
  let baseStartOffset = roundedWidth + cloudSettings.radius;
  
  let altitude = rand(cloudSettings.minAltitude, cloudSettings.maxAltitude);
  let baseStart = [
    worldWidth + baseStartOffset,
    altitude
  ];
  let baseEnd = [
    baseStart[x] - baseWidth,
    baseStart[y]
  ];

  let pace;
  if (!cloudSettings.pace) {
    pace = 0.26 - Math.ceil(
      ((baseWidth - cloudSettings.minBaseWidth) / (cloudSettings.maxBaseWidth - cloudSettings.minBaseWidth)) * 25
    ) * 0.01; // pace (which is btn 0.01 and 0.25 px/ms) is proportional to cloudBaseWidth
  } else {
    pace = cloudSettings.pace;
  }

  // getting the 'bumps'
  let maxPossibleBumps = roundedWidth/(cloudSettings.radius * 2);
  let noOfBumps = rand(1, maxPossibleBumps);
  let bumpsPositions = [];
  for(let i = 0; i < noOfBumps; i++){
    let position = rand(1, maxPossibleBumps);
    while (bumpsPositions.indexOf(position) !== -1) {
      position = rand(1, maxPossibleBumps);
    }
    bumpsPositions.push(position);
  }
  bumpsPositions = bumpsPositions.sort(function (a, b){return a - b;});
  return { baseStart, baseEnd, baseWidth, tailDistance, pace, bumpsPositions };
}

function drawCloud(ctx, radius, cloud) {
  ctx.beginPath(); 
  ctx.arc(cloud.baseStart[x], cloud.baseStart[y] - radius, radius, toRadians(270), toRadians(90));
  ctx.lineTo(cloud.baseEnd[x], cloud.baseEnd[y]);
  ctx.arc(cloud.baseEnd[x], cloud.baseEnd[y] - radius, radius, toRadians(90), toRadians(270));
  for(let i = 0; i < cloud.bumpsPositions.length; i++){
    ctx.arc(cloud.baseEnd[x] + (cloud.bumpsPositions[i] * radius * 2) - radius, cloud.baseEnd[y] - 1.5 * radius, radius, toRadians(210), toRadians(330));
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
function drawClouds(ctx) {
  ctx.clearRect(0, 0, worldWidth + cloudSettings.minBaseWidth * 2, worldHeight);
  for(let i=0; i < clouds.length; i++){
    drawCloud(ctx, cloudSettings.radius, clouds[i]);
  }
}

function moveCloud(cloud) {
  cloud.baseStart[x] -= (cloud.pace * 25); // pace is px/25ms
  cloud.baseEnd[x] = cloud.baseStart[x] - cloud.baseWidth;
}
function moveClouds() {
  let cloudsToPurge = [];
  let addNewCloud = false;
  for(let i = 0; i < clouds.length; i++){
    let currentCloud = clouds[i];
    // move clouds
    moveCloud(currentCloud);
    // determine if one needs to be removed
    if(currentCloud.baseStart[x] + cloudSettings.radius <= 0){
      cloudsToPurge.push(i);
    }
    if(latestCloud.tailDistance <= worldWidth - latestCloud.baseStart[x] + cloudSettings.radius){
      latestCloud = generateCloud(cloudSettings);
      addNewCloud = true;
    }
    // rm/generate new cloud if conditions match
  }
  for(let i = 0; i < cloudsToPurge.length; i++){
    clouds.splice(cloudsToPurge[i], 1);
  }
  if(addNewCloud){
    clouds.push(latestCloud);
  }
}

// Helper functions
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function toRadians(deg) {
  return deg * 0.0174533;
}

// Where it all begins
window.requestAnimationFrame(start);