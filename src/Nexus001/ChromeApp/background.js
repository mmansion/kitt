chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
  	id: "NexusWindow",
    bounds: {
      width: 600,
      height: 600
    }
  });
});
