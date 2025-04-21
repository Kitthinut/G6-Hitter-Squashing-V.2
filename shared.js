// This is one zone (like "Red zone" from 10m to 12m)
export class Zone {
  constructor(name, start, end) {
    this.name = name;
    this.start = start;
    this.end = end;
  }
}

// This helps manage zones (get, add, delete, reset)
export class ZoneManager {
  constructor() {
    this.defaultZones = [
      new Zone("Light Blue", 7.5, 11.3),
      new Zone("Green", 11.3, 15.1),
      new Zone("Yellow", 15.1, 18.9),
      new Zone("Orange", 18.9, 22.7),
      new Zone("Red", 22.7, 26.5),
    ];
    const saved = JSON.parse(localStorage.getItem("zones"));
    this.zones = saved || [...this.defaultZones];
  }

  // Save zones to localStorage
  save() {
    localStorage.setItem("zones", JSON.stringify(this.zones));
  }

  // Get all zones
  getAll() {
    return this.zones;
  }

  // Add a zone
  add(zone) {
    this.zones.push(zone);
    this.save();
  }

  // Delete a zone
  delete(name) {
    this.zones = this.zones.filter((z) => z.name !== name);
    this.save();
  }

  // Reset zones to defaults
  reset() {
    this.zones = [...this.defaultZones];
    this.save();
  }
}
