const item = 'fuck';

const xCoefficient = 0.05;
const yCoefficient = 0.07;
const dotWidth = 1;
const dotHeight = 1;

// html params
const dotWidthRatio = 20;
const dotHeightRatio = 20;

const HEART_WIDTH = 70;
const HEART_HEIGHT = 40;

const calculateHeartLine = (x, y) => {
  const amendedX = x * xCoefficient;
  const amendedY = y * yCoefficient;
  return (amendedX ** 2 + amendedY ** 2 - 1) ** 3 - amendedX ** 2 * amendedY ** 3
}

const drawHeart = (onDrawHeartDot, onDrawHeartBlank, onDrawRowDone) => {
  for (let y = (HEART_HEIGHT / 2) * dotHeight; y > -(HEART_HEIGHT / 2) * dotHeight; y -= dotHeight) {
    onDrawRowDone(y);
    for (let x = -(HEART_WIDTH / 2) * dotWidth; x < (HEART_WIDTH / 2) * dotWidth; x += dotWidth) {
      if (calculateHeartLine(x, y) <= 0) {
        onDrawHeartDot(x, y);
      } else {
        onDrawHeartBlank(y);
      }
    }
  }
}

// const handleDrawRowDone = () => process.stdout.write('\n');
// const handleDrawHeartBlank = () => process.stdout.write(' ');
// const handleDrawHeartDot = (x, y) => process.stdout.write(item[x - y - item.length * (Math.floor((x - y) / item.length))]);

const handleDrawRowDone = (y) => {
  const root = document.getElementById('root');
  const freshLine = document.createElement('div');
  freshLine.className = 'heart-line';
  freshLine.id = `line-${y}`;
  root.appendChild(freshLine);
}
const handleDrawHeartDot = (x, y) => {
  const line = document.getElementById(`line-${y}`);
  const freshDot = document.createElement('div');
  freshDot.className = 'heart-dot';
  freshDot.style.width = `${dotWidth * dotWidthRatio}px`;
  freshDot.style.height = `${dotHeight * dotHeightRatio}px`;
  freshDot.style.backgroundImage = 'url(./logo.png)';
  freshDot.style.animationDelay = `${Math.random() > 0.5 ? 0 : 1}s`;
  if (Math.random() > 0.5) {
    freshDot.style.animation = 'dotAnimation1';
    if (Math.random() > 0.5) {
      freshDot.style.opacity = 0;
      freshDot.style.transform = 0.1;
      freshDot.style.animationDirection = 'alternate';
    } else {
      freshDot.style.opacity = 1;
      freshDot.style.transform = 'scale(0.7)';
      freshDot.style.animationDirection = 'alternate-reverse';
    }
  } else {
    freshDot.style.animation = 'dotAnimation2';
    if (Math.random() > 0.5) {
      freshDot.style.opacity = 0;
      freshDot.style.transform = 'scale(0.5)';
      freshDot.style.animationDirection = 'alternate';
    } else {
      freshDot.style.opacity = 1;
      freshDot.style.transform = 1;
      freshDot.style.animationDirection = 'alternate-reverse';
    }
  }
  freshDot.style.animationDuration = '0.5s';
  freshDot.style.animationIterationCount = 'infinite';
  freshDot.style.animationDelay = `${Math.random()}s`;
  line.appendChild(freshDot);
}

const handleDrawHeartBlank = (y) => {
  const line = document.getElementById(`line-${y}`);
  const freshBlank = document.createElement('div');
  freshBlank.className = 'heart-blank';
  freshBlank.style.width = `${dotWidth * dotWidthRatio}px`;
  freshBlank.style.height = `${dotHeight * dotHeightRatio}px`;
  freshBlank.innerHTML = ' ';
  line.appendChild(freshBlank);
}

drawHeart(handleDrawHeartDot, handleDrawHeartBlank, handleDrawRowDone)
