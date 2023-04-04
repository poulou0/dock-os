document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".wireguard-when-" + (e.detail.includes("wireguard") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#wireguard-status").style.color = (e.detail.includes("wireguard") ? "lawngreen" : "tomato");
}, false);
