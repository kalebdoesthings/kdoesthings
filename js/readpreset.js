function read() {



if (localStorage.getItem("faviconIsTrue") == null){
    
    return
    
}




if (localStorage.getItem("faviconIsTrue") == "1") {
    
    var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = '../img/favicons/google.ico';
}




if (localStorage.getItem("faviconIsTrue") == "2") {
    
    var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = '../img/favicons/classes.svg';
}



if (localStorage.getItem("faviconIsTrue") == "3") {
    
    var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = '../img/favicons/drive.ico';
}
if (localStorage.getItem("faviconIsTrue") == "4") {
    
    var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = '../img/favicons/blank.ico';
}


}




if (localStorage.getItem("faviconIsTrue") != null) {
read()

}