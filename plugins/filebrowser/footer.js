document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".filebrowser-when-" + (e.detail.includes("filebrowser") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#filebrowser-status").style.color = (e.detail.includes("filebrowser") ? "lawngreen" : "tomato");
}, false);
