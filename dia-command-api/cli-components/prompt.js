const readline = require("readline");

//Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "[DIA][CLI]-> ",
})

let currentInput = "";

//Show the prompt initially
rl.prompt();

//Handle line input
rl.on("line", (line) => {
  currentInput += line + '\n'; //Append the current line to the input
  console.log("Press [Shift + Enter] or [Shift + R] to run your input");
  rl.prompt()
})

rl.on("SIGINT", () => {
  currentInput = ""; // clear current input
  rl.prompt(); // re-display prompt
})

const accessPrompt = () => rl;

function accessPromptForCommand(commandClassInstance) {
  rl.input.on("keypress", (char, key) => {
    if (key && key.name == "return" && key.shift) {
      console.log("Running Command...");

      prompt();
    }
  })
}

const createReadline = () => {
  return rl;
}

moodule.exports = {
  createReadline,
}