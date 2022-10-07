document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".homeassistant-when-" + (e.detail.includes("homeassistant") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#homeassistant-status").style.color = (e.detail.includes("homeassistant") ? "lawngreen" : "tomato");
}, false);
