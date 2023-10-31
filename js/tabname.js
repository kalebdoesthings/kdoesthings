
  if (localStorage.getItem("newTitle") == null) {
  document.title = ("Settings")
}
else { var titleName = localStorage.getItem("newTitle");
          document.title = (titleName)
}