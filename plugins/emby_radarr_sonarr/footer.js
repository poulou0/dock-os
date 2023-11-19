document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".emby-when-" + (e.detail.includes("emby") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#emby-status").style.color = (e.detail.includes("emby") ? "lawngreen" : "tomato");
}, false);
