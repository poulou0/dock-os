document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".nextcloud-when-" + (e.detail.includes("nextcloud") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#nextcloud-status").style.color = (e.detail.includes("nextcloud") ? "lawngreen" : "tomato");
}, false);
