document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".firefox-when-" + (e.detail.includes("firefox") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#firefox-status").style.color = (e.detail.includes("firefox") ? "lawngreen" : "tomato");
}, false);
