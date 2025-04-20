import { ZoneManager } from "./shared.js";

class Calculator {
  constructor() {
    this.velocity = 5.47;
    this.zoneManager = new ZoneManager();
    this.resultsEl = {
      zone: document.getElementById("zone"),
      angle: document.getElementById("angle"),
      velocity: document.getElementById("velocity"),
      time: document.getElementById("time"),
      distance: document.getElementById("distance"),
    };
  }

  simulate(angle) {
    const radians = (angle * Math.PI) / 180;
    const vx = this.velocity * Math.cos(radians);
    const vy = this.velocity * Math.sin(radians);
    const g = 9.81;
    const time = (2 * vy) / g;
    const distance = vx * time;
    return { angle, time, distance };
  }

  findBestAngleForZone(zone) {
    const avgDist = (zone.start + zone.end) / 2;
    let best = null;
    let minDiff = Infinity;
    for (let angle = 0; angle <= 90; angle++) {
      const result = this.simulate(angle);
      const diff = Math.abs(result.distance - avgDist);
      if (diff < minDiff) {
        best = result;
        minDiff = diff;
      }
    }
    return best;
  }

  handleClick(zone) {
    const result = this.findBestAngleForZone(zone);
    const distance = (this.velocity * Math.cos(result.angle * Math.PI / 180) * result.time).toFixed(2);
    this.resultsEl.zone.textContent = zone.name;
    this.resultsEl.angle.textContent = result.angle;
    this.resultsEl.velocity.textContent = this.velocity.toFixed(2);
    this.resultsEl.time.textContent = result.time.toFixed(2);
    this.resultsEl.distance.textContent = distance;
  }

  createButtons() {
    const container = document.getElementById("zoneButtons");
    const zones = this.zoneManager.getAll();
    zones.forEach((zone) => {
      const button = document.createElement("button");
      button.textContent = zone.name;
      button.addEventListener("click", () => this.handleClick(zone));
      container.appendChild(button);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const calculator = new Calculator();
  calculator.createButtons();
});