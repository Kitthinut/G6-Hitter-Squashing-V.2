class SettingsManager {
  constructor() {
    this.velocityInput = document.getElementById("racketVelocity");
    this.coefficientInput = document.getElementById("coefficient");
    this.massInput = document.getElementById("racketMass");
    this.saveBtn = document.getElementById("saveSettings");
    this.resetBtn = document.getElementById("resetSettings");
    this.init();
  }

  init() {
    const saved = JSON.parse(localStorage.getItem("settings"));
    if (saved) {
      this.velocityInput.value = saved.velocity;
      this.coefficientInput.value = saved.coefficient;
      this.massInput.value = saved.mass;
    } else {
      this.velocityInput.value = 5.47;
      this.coefficientInput.value = 0.85;
      this.massInput.value = 0.3;
    }

    this.saveBtn.addEventListener("click", () => this.save());
    this.resetBtn.addEventListener("click", () => this.reset());
  }

  save() {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        velocity: parseFloat(this.velocityInput.value),
        coefficient: parseFloat(this.coefficientInput.value),
        mass: parseFloat(this.massInput.value),
      })
    );
    alert("Settings saved!");
  }

  reset() {
    localStorage.removeItem("settings");
    this.velocityInput.value = 5.47;
    this.coefficientInput.value = 0.85;
    this.massInput.value = 0.3;
  }
}

window.addEventListener("DOMContentLoaded", () => new SettingsManager());