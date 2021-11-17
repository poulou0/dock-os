document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".phpmyadmin-when-" + (e.detail.includes("phpmyadmin") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#phpmyadmin-status").style.color = (e.detail.includes("phpmyadmin") ? "lawngreen" : "tomato");
}, false);
