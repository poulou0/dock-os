document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".rhasspy-when-" + (e.detail.includes("rhasspy") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#rhasspy-status").style.color = (e.detail.includes("rhasspy") ? "lawngreen" : "tomato");
}, false);
