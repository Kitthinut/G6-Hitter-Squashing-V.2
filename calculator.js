import { ZoneManager } from "./shared.js";

class Calculator {
  constructor() {
    // Physics constants
    this.u_b = 5.787;      // Initial ball velocity before bounce
    this.e = 0.42;         // Coefficient of restitution
    this.h = 0.27;         // Drop height
    this.g = 9.81;         // Gravity

    // Actual velocity after bounce
    this.velocity = this.e * this.u_b;

    // Zone manager
    this.zoneManager = new ZoneManager();

    // UI element references
    this.resultsEl = {
      zone: document.getElementById("zone"),
      angle: document.getElementById("angle"),
      time: document.getElementById("time"),
      distance: document.getElementById("distance"),
    };
  }

  // Simulate how far a ball goes at a given angle
  simulate(angle) {
    const alphaRad = (angle * Math.PI) / 180; // Convert angle to radians
    const v0 = this.velocity; // Initial velocity after bounce
    const vx = v0 * Math.cos(alphaRad); // Horizontal component of velocity
    const vy = v0 * Math.sin(alphaRad); // Vertical component of velocity
    const g = this.g;
    const h = this.h;

    // Calculate time of flight using the quadratic formula for vertical motion:
    // 0 = -0.5 * g * t^2 + vy * t + h
    const time = (vy + Math.sqrt(vy * vy + 2 * g * h)) / g;

    // Calculate horizontal distance:
    const distance = vx * time;

    return { angle, time, distance };
  }

  // Use binary search to find the angle that gets closest to zone center
  findBestAngleForZone(zone) {
    const R = (zone.start + zone.end) / 2;
    let low = 0;
    let high = 90;
    let bestAngle = 0;
    let bestDiff = Infinity;

    for (let i = 0; i < 100; i++) {
      const mid = (low + high) / 2;
      const { distance } = this.simulate(mid);
      const diff = Math.abs(distance - R);

      if (diff < bestDiff) {
        bestDiff = diff;
        bestAngle = mid;
      }

      if (distance > R) {
        high = mid;
      } else {
        low = mid;
      }

      if (bestDiff < 0.001) break;
    }

    return this.simulate(bestAngle);
  }

  // What happens when you click a zone button
  handleClick(zone) {
    const result = this.findBestAngleForZone(zone);

    this.resultsEl.zone.textContent = zone.name;
    this.resultsEl.angle.textContent = result.angle.toFixed(2);
    this.resultsEl.time.textContent = result.time.toFixed(2);
    this.resultsEl.distance.textContent = result.distance.toFixed(2);
  }

  // Build zone buttons dynamically
  createButtons() {
    const container = document.getElementById("zoneButtons");
    container.innerHTML = ""; // Clear existing buttons

    const zones = this.zoneManager.getAll();
    zones.forEach((zone) => {
      const button = document.createElement("button");
      button.textContent = zone.name;
      button.addEventListener("click", () => this.handleClick(zone));
      container.appendChild(button);
    });
  }
}

// Start when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  const calculator = new Calculator();
  calculator.createButtons();
});
