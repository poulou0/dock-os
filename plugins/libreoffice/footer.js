document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".libreoffice-when-" + (e.detail.includes("libreoffice") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#libreoffice-status").style.color = (e.detail.includes("libreoffice") ? "lawngreen" : "tomato");
}, false);
