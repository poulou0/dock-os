document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".shellinabox-when-" + (e.detail.includes("shellinabox") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#shellinabox-status").style.color = (e.detail.includes("shellinabox") ? "lawngreen" : "tomato");
}, false);
