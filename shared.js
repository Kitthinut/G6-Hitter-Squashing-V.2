export class Zone {
  constructor(name, start, end) {
    this.name = name;
    this.start = start;
    this.end = end;
  }
}

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

  save() {
    localStorage.setItem("zones", JSON.stringify(this.zones));
  }

  getAll() {
    return this.zones;
  }

  add(zone) {
    this.zones.push(zone);
    this.save();
  }

  delete(name) {
    this.zones = this.zones.filter((z) => z.name !== name);
    this.save();
  }

  reset() {
    this.zones = [...this.defaultZones];
    this.save();
  }
}