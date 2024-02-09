// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuixar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
// index.js

import { Pilota } from './pilota.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const pilotes = [];

function creaPilotes() {
  for (let i = 0; i < 20; i++) {
    const mida = random(10, 20);
    const x = random(mida, width - mida);
    const y = random(mida, height - mida);
    const velX = random(-4, 4);
    const velY = random(-4, 4);
    const color = randomRGB();
    pilotes.push(new Pilota(x, y, velX, velY, color, mida));
  }
}

function loop() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  pilotes.forEach((pilota) => {
    pilota.dibuixa(ctx);
    pilota.mou();
  });

  detectaColisions();

  requestAnimationFrame(loop);
}

function detectaColisions() {
  for (let i = 0; i < pilotes.length; i++) {
    for (let j = i + 1; j < pilotes.length; j++) {
      const dx = pilotes[i].x - pilotes[j].x;
      const dy = pilotes[i].y - pilotes[j].y;
      const distancia = Math.sqrt(dx * dx + dy * dy);

      if (distancia < pilotes[i].mida + pilotes[j].mida) {
        const tmpVelX = pilotes[i].velX;
        pilotes[i].velX = pilotes[j].velX;
        pilotes[j].velX = tmpVelX;

        const tmpVelY = pilotes[i].velY;
        pilotes[i].velY = pilotes[j].velY;
        pilotes[j].velY = tmpVelY;
      }
    }
  }
}

creaPilotes();
loop();

export { width, height };
