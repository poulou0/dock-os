document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".motioneye-when-" + (e.detail.includes("motioneye") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#motioneye-status").style.color = (e.detail.includes("motioneye") ? "lawngreen" : "tomato");
}, false);
