document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".ftp-when-" + (e.detail.includes("ftp") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#ftp-status").style.color = (e.detail.includes("ftp") ? "lawngreen" : "tomato");
}, false);
