document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".mariadb-when-" + (e.detail.includes("mariadb") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#mariadb-status").style.color = (e.detail.includes("mariadb") ? "lawngreen" : "tomato");
}, false);
