document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".samba-when-" + (e.detail.includes("samba") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#samba-status").style.color = (e.detail.includes("samba") ? "lawngreen" : "tomato");
}, false);
