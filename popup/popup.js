var startButton = document.getElementById("start-button");
startButton.addEventListener("click", async function (e) {
  const url = "https://www.facebook.com/marketplace/create";
  chrome.tabs.create({ url });
});
