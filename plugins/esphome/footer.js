document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".esphome-when-" + (e.detail.includes("esphome") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#esphome-status").style.color = (e.detail.includes("esphome") ? "lawngreen" : "tomato");
}, false);
