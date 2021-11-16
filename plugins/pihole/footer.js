document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".pihole-when-" + (e.detail.includes("pihole") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#pihole-status").style.color = (e.detail.includes("pihole") ? "lawngreen" : "tomato");
}, false);
