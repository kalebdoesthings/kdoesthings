function titleChange() {
const newTitle = prompt("What Would You Like The New Title To Be")
document.title = (newTitle)
localStorage.setItem("newTitle", newTitle)


}

function preset(){
    const choice = prompt("1 For Google \n 2 For Google Classroom \n 3 For Google Drive \n 4 For Blank \n Reload To Save Changes")
    if (choice == "1") {
     const googletext = "Google"
     var one = "1"
     var two = "2"
     var three = "3"
     var four = "4"
     localStorage.setItem("faviconIsTrue", one)
     localStorage.setItem("newTitle", googletext)
     var newtitlegoogle = localStorage.getItem("newTitle")
     document.title = (newtitlegoogle)
     localStorage.setItem("newFavicon", one) 
   }
    if (choice == "2") {
     const classtext = "Classes"
     var one = "1"
     var two = "2"
     var three = "3"
     var four = "4"
     localStorage.setItem("faviconIsTrue", two)
     localStorage.setItem("newTitle", classtext)
     var newtitlegoogle = localStorage.getItem("newTitle")
     document.title = (newtitlegoogle)
     localStorage.setItem("newFavicon", two)
 
 
    }    
     
    if (choice == "3") {
     const drivetext = "Google Drive"
     var one = "1"
     var two = "2"
     var three = "3"
     var four = "4"
     localStorage.setItem("faviconIsTrue", three)
     localStorage.setItem("newTitle", drivetext)
     var newtitlegoogle = localStorage.getItem("newTitle")
     document.title = (newtitlegoogle)
     localStorage.setItem("newFavicon", three)
 
 
    }   
    if (choice == "4") {
      const blanktext = "ㅤ"
      var one = "1"
      var two = "2"
      var three = "3"
      var four = "4"
      localStorage.setItem("faviconIsTrue", four)
      localStorage.setItem("newTitle", blanktext)
      var newtitlegoogle = localStorage.getItem("newTitle")
      document.title = (newtitlegoogle)
      localStorage.setItem("newFavicon", four) 
    }
   }

function reset() {
    const areyousure = confirm("Are You Sure You Want To Reset Tab Name")
    if (areyousure) {
   localStorage.removeItem("newTitle")
   localStorage.removeItem("faviconIsTrue")
   location.reload()  
 }}




 