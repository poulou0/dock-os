document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".filezilla-when-" + (e.detail.includes("filezilla") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#filezilla-status").style.color = (e.detail.includes("filezilla") ? "lawngreen" : "tomato");
}, false);
