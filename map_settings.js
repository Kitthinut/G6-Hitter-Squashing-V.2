import { Zone, ZoneManager } from "./shared.js";

class ZoneEditor {
  constructor() {
    this.zoneManager = new ZoneManager();
    this.nameInput = document.getElementById("zoneName");
    this.startInput = document.getElementById("zoneStart");
    this.endInput = document.getElementById("zoneEnd");
    this.addButton = document.getElementById("addZoneButton");
    this.resetButton = document.getElementById("resetZonesButton");
    this.zoneList = document.getElementById("zoneList");

    this.addButton.addEventListener("click", () => this.addZone());
    this.resetButton.addEventListener("click", () => this.resetZones());
    this.render();
  }

  addZone() {
    const zone = new Zone(
      this.nameInput.value,
      parseFloat(this.startInput.value),
      parseFloat(this.endInput.value)
    );
    this.zoneManager.add(zone);
    this.clearInputs();
    this.render();
  }

  deleteZone(name) {
    this.zoneManager.delete(name);
    this.render();
  }

  resetZones() {
    this.zoneManager.reset();
    this.render();
  }

  clearInputs() {
    this.nameInput.value = "";
    this.startInput.value = "";
    this.endInput.value = "";
  }

  render() {
    const zones = this.zoneManager.getAll();
    this.zoneList.innerHTML = "";
    zones.forEach((zone) => {
      const li = document.createElement("li");
      li.textContent = `${zone.name} (${zone.start}m - ${zone.end}m)`;
      const btn = document.createElement("button");
      btn.textContent = "❌";
      btn.onclick = () => this.deleteZone(zone.name);
      li.appendChild(btn);
      this.zoneList.appendChild(li);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => new ZoneEditor());
