document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".minidlna-when-" + (e.detail.includes("minidlna") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#minidlna-status").style.color = (e.detail.includes("minidlna") ? "lawngreen" : "tomato");
}, false);
