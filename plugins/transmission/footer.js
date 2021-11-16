document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".transmission-when-" + (e.detail.includes("transmission") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#transmission-status").style.color = (e.detail.includes("transmission") ? "lawngreen" : "tomato");
}, false);
