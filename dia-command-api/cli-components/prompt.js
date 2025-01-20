const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ` 
            -[dia][ai]-[/root/htdocs]
            m[]
            k[]
            v[]
            h[]
            -:>
                
                ` // Display prompt
});

// Command history
const commandHistory = [];
let historyIndex = -1;

// Listen for user input
rl.on("line", (line) => {
  const trimmedLine = line.trim();

  if (trimmedLine) {
    // Add the command to history if it's not empty
    commandHistory.push(trimmedLine);
    historyIndex = commandHistory.length; // Reset index after a new command
    console.log(`You entered: ${trimmedLine}`);
  }

  rl.prompt(); // Display the prompt again
});

// Listen for keypress events
readline.emitKeypressEvents(process.stdin);
process.stdin.on("keypress", (str, key) => {
  if (key.name === "up") {
    // Navigate up in history
    if (historyIndex > 0) {
      historyIndex--;
      rl.write(null, { ctrl: true, name: "u" }); // Clear current input
      rl.write(commandHistory[historyIndex]); // Write the previous command
    }
  } else if (key.name === "down") {
    // Navigate down in history
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      rl.write(null, { ctrl: true, name: "u" }); // Clear current input
      rl.write(commandHistory[historyIndex]); // Write the next command
    } else {
      // Clear input if at the end of history
      historyIndex = commandHistory.length;
      rl.write(null, { ctrl: true, name: "u" });
    }
  }
});

// Exit the program on CTRL+C
rl.on("SIGINT", () => {
  console.log("\nExiting CLI...");
  process.exit(0);
});

// Start the prompt
rl.prompt();

