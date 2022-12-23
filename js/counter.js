window.onload = function() {
  viewCount2 = 0;
  
  if (localStorage.getItem('viewCount2')) {
    viewCount2 = localStorage.getItem('viewCount2');
  }
  viewCount2++;
  const viewCount3 = viewCount2 + " People Have visited this site"
  localStorage.setItem('viewCount2', viewCount2);
  document.getElementById('view-counter').innerHTML = viewCount3;
}
