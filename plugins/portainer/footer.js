document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".portainer-when-" + (e.detail.includes("portainer") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#portainer-status").style.color = (e.detail.includes("portainer") ? "lawngreen" : "tomato");
}, false);
