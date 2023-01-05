function titleChange() {
const newTitle = prompt("What Would You Like The New Title To Be")
document.title = (newTitle)
localStorage.setItem("newTitle", newTitle)


}