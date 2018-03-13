"use strict";

var MoleculeMovementModel = function MoleculeMovementModel(canvasContainer, sliderContainer) {
  this.canvas = document.querySelector(canvasContainer);
  this.tempRate = 2; // Temp Rate = Temp / 10; Default: 20 deg, rate: 2
  this.basisSpeed = 5; // Basis speed in pixels per second
  this.molecules = [];
  this.init = function(width, height, moleculeNumber) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.molecule(moleculeNumber);
  };

  this.addMolecule = function() {
    var temp = document.createElement("div");
    temp.className = "molecule";
    temp.style.left = this.randomCord("x") + "px";
    temp.style.bottom = this.randomCord("y") + "px";
    this.molecules.push(temp);
    this.canvas.appendChild(temp);
  };

  this.randomMove = function(axis, element) {
    var oldCord = void 0;
    var move = this.basisSpeed * this.tempRate; //console.log('Movement :' + move);
    switch (axis) {
      case "x":
        oldCord = parseInt(element.style.left);
        break;
      case "y":
        oldCord = parseInt(element.style.bottom);
        break;
    } //console.log('Old coordinate: ' + oldCord);
    var newCord = oldCord + (Math.floor(Math.random() * (move - -move + 1)) + -move);

    switch (axis) {
      case 'x':
        if (newCord < 20 || newCord > this.canvasWidth - 20) {} else {
          //console.log('New coordinate: ' + newCord);
          return newCord;
        }
      case 'y':
        if (newCord < 20 || newCord > this.canvasHeight - 20) {} else {
          //console.log('New coordinate: ' + newCord);
          return newCord;
        }
    }
  };

  this.moleculeMove = function() {
    for (var i = 0; i < this.molecules.length; i++) {
      var elem = this.molecules[i];
      elem.style.left = this.randomMove('x', elem) + 'px';
      elem.style.bottom = this.randomMove('y', elem) + 'px';
    }
  };

  this.randomCord = function(axis) {
    switch (axis) {
      case "x":
        return Math.floor(Math.random() * (this.canvasWidth - 20 - 20)) + 20;
      case "y":
        return Math.floor(Math.random() * (this.canvasHeight - 20 - 20)) + 20;
      default:
        console.log("ERROR: Unexpected axis");
        break;
    }
  };

  this.molecule = function(number) {
    if (number) {
      for (var i = 0; i < number; i++) {
        this.addMolecule();
      }
    } else {
      return this.molecules;
    }
  };

  this.temperature = function(temperature) {
    if (temperature) {
      this.tempRate = temperature / 10;
    } else {
      return this.tempRate * 10;
    }
  };

  this.slider = document.querySelector(sliderContainer);

  noUiSlider.create(this.slider, {
    start: [20],
    tooltips: true,
    range: {
      'min': [0],
      'max': [200]
    },
    format: wNumb({
      decimals: 0
    }),
    margin: 30,
    pips: {
      mode: 'values',
      values: [0, 50, 100, 150, 200],
      density: 10
    }
  });
};

if (screen.width < 420) {
  var main = new MoleculeMovementModel("#canvas", "#ranger");
  main.init(250, 150, 40);
  console.log('Конфигурация для экранов, шириной меньше 400 пикселей');
  console.log('Config for screens, width < 400');
}

if (420 < screen.width && screen.width < 620) {
  var main = new MoleculeMovementModel("#canvas", "#ranger");
  main.init(400, 300, 100);
  console.log('Конфигурация для экранов, шириной меньше 600 пикселей');
  console.log('Config for screens, width < 600');
}
if (620 < screen.width && screen.width < 820) {
  var main = new MoleculeMovementModel("#canvas", "#ranger");
  main.init(580, 450, 130);
  console.log('Конфигурация для экранов, шириной меньше 800 пикселей');
  console.log('Config for screens, width < 800');
}
if (820 < screen.width && screen.width < 1020) {
  var main = new MoleculeMovementModel("#canvas", "#ranger");
  main.init(7800, 600, 200);
  console.log('Конфигурация для экранов, шириной меньше 1000 пикселей');
  console.log('Config for screens, width < 1000');
}
if (1020 < screen.width && screen.width < 1020) {
  var main = new MoleculeMovementModel("#canvas", "#ranger");
  main.init(1000, 700, 300);
  console.log('Конфигурация для экранов, шириной больше 1000 пикселей');
  console.log('Config for screens, width > 1000');
}
if (screen.width > 1220) {
  var main = new MoleculeMovementModel("#canvas", "#ranger");
  main.init(1180, 700, 400);
  console.log('Конфигурация для экранов, шириной больше 1000 пикселей');
  console.log('Config for screens, width > 1000');
}

var timer = setTimeout(function run() {
  main.tempRate = main.slider.noUiSlider.get() / 10;
  main.moleculeMove();
  setTimeout(run, 1000);
}, 1000);
