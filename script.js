function Typer(selector, txt) {
  this.el = document.querySelector(selector);
  this.txt = txt;
  this.length = txt.length;
  this.index = 0;
}

Typer.prototype.update = function() {
  this.index = Math.min(this.length, this.index + 1);
  this.el.innerText = this.getText();
};

Typer.prototype.getText = function() {

  if (this.done()) {
    return this.txt;
  }

  return this.txt.substring(0, this.index) + new Array(this.length - this.index + 1).join(' ');
};

Typer.prototype.done = function() {
  return this.index === this.length;
};

Typer.prototype.reset = function() {
  this.index = 0;
  this.el.innerText = this.getText();
};

function Timer(max) {
  this.index = 0;
  this.max = max;
}

Timer.prototype.update = function() {
  this.index++;
};

Timer.prototype.done = function() {
  return this.index === this.max;
};

Timer.prototype.reset = function() {
  this.index = 0;
};

function Animation(selector, frames) {
  this.el = document.querySelector(selector);
  this.index = 0;
  this.length = frames.length;
  this.frames = frames;
}

Animation.prototype.update = function() {
  var val = this.frames[this.index];

  this.index++;

  if (this.index >= this.length) {
    this.index = 0;
  }

  this.el.innerHTML = val;
};

var input = new Typer('#input', 'Input: bananas'),
  output = new Typer('#output', 'Output: code'),
  arm = new Animation('#arm', [
    '   <span class=banana>)</span>___',
    '    <span class=banana>)</span>__',
    '     <span class=banana>)</span>_',
    '      <span class=banana>)</span>',
    '      <span class=banana></span>_',
    '     <span class=banana></span>__',
    '    <span class=banana></span>___'
  ]),
  mouth = new Animation('#mouth', [
    '-',
    '-',
    '-',
    'o',
    '-',
    '-',
    '-'
  ]),
  hand1 = new Animation('#hand1', [
    '\\',
    '<span class=skin>m</span>'
  ]),
  hand2 = new Animation('#hand2', [
    '<span class=skin>m</span>',
    ' '
  ]),
  timer = new Timer(30),
  speed = 250;

function update() {

  timer.update();

  input.update();

  if (input.done()) {
    output.update();
  }

  arm.update();
  mouth.update();
  hand1.update();
  hand2.update();

  if (timer.done()) {
    input.reset();
    output.reset();
    timer.reset();
  }

  setTimeout(update, speed);
}

function scaleIt() {
  var monkey = document.querySelector('.monkey'),
    width = monkey.clientWidth,
    fontSize = 10,
    maxFontSize = 40;

  while (width < window.innerWidth - fontSize * 2 && fontSize < maxFontSize) {
    monkey.style.fontSize = fontSize + 'px';
    fontSize++;
    width = monkey.clientWidth;
  }
}

scaleIt();
update();