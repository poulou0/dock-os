document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".retroarchweb-when-" + (e.detail.includes("retroarchweb") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#retroarchweb-status").style.color = (e.detail.includes("retroarchweb") ? "lawngreen" : "tomato");
}, false);
