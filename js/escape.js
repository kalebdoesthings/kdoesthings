
document.addEventListener("keyup", function(event) {
      if (event.keyCode === 192) {
        var link = document.querySelector("link[rel~='icon']");
  if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = 'https://google.com/favicon.ico';
  document.title = "Google";
        window.open('https://classroom.google.com')
      }
  });