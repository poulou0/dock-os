document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".whatsupdocker-when-" + (e.detail.includes("whatsupdocker") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#whatsupdocker-status").style.color = (e.detail.includes("whatsupdocker") ? "lawngreen" : "tomato");

  fetch(`${location.href}wud/api/containers`).then(async (res) => { document.querySelector("#wud-updates").innerHTML = `${(await res.json()).filter((r) => r.updateAvailable).length} updates`; });
}, false);
