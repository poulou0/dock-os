document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".onlyoffice-when-" + (e.detail.includes("onlyoffice") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#onlyoffice-status").style.color = (e.detail.includes("onlyoffice") ? "lawngreen" : "tomato");
}, false);
