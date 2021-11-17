document.querySelector("#docker-ps").addEventListener('docker-ps', function (e) {
  document.querySelectorAll(".vscode-when-" + (e.detail.includes("vscode") ? "enabled" : "disabled"))
    .forEach((el) => el.classList.remove("d-none"))
  document.querySelector("#vscode-status").style.color = (e.detail.includes("vscode") ? "lawngreen" : "tomato");
}, false);
