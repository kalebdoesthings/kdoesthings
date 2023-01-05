// Make a request to the server to get the contents of the jokes
fetch('../js/jokes.txt')
  .then(response => response.text()) // Convert the response to a string
  .then(contents => {
    // Split the contents of the jokes into an array of lines
    const lines = contents.split('\n');

    // Generate a random index within the range of the number of lines
    const randomIndex = Math.floor(Math.random() * lines.length);

    // Use the random index to access a random line from the array of lines
    const randomLine = lines[randomIndex];

    // Do something with the random line
    console.log(randomLine);
    dadjoke = "Here Is A Dadjoke: " + randomLine;
    document.getElementById('dadjoke').innerHTML = dadjoke;
  });

