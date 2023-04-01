document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".wgeasy-when-" + (e.detail.includes("wgeasy") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#wgeasy-status").style.color = (e.detail.includes("wgeasy") ? "lawngreen" : "tomato");
}, false);
