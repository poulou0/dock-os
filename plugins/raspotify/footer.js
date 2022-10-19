document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".raspotify-when-" + (e.detail.includes("raspotify") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#raspotify-status").style.color = (e.detail.includes("raspotify") ? "lawngreen" : "tomato");
}, false);
