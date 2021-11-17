document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".duplicati-when-" + (e.detail.includes("duplicati") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#duplicati-status").style.color = (e.detail.includes("duplicati") ? "lawngreen" : "tomato");
}, false);
