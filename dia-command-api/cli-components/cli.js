const STANDARD_RETURN_TEMPLATE = {status: 0, data: {}};

class CLI {

    constructor() {
        this.body = {
            command_table: {}
        }
        this.standard = STANDARD_RETURN_TEMPLATE;
        this.process = true;
        this.prompt = ``
    }

    toggleProcess() {
        this.process = !this.process;
        return true;
    }

    getProcess = () => this.process;

    loadCommand(cmd_name, func_body) {
        this.body.command_table[cmd_name] = func_body
        return true
    }

    getError(status = 0, data = {}) {
        return {status, data};
    }

    

    runProcess() {
        try {
            while (cli.getProcess()) {
            process.stdin.on("data", (data) => {
                console.log(`You entered: ${data.toString().trim()}`);
            });
          }
        } catch (error) {
            console.error("[ART-INT][DIA][running-error]:", error);
            return false;  // Return false on error
        }
    }
      

}

const createCLI = () => {
    return new CLI();
}

module.exports = {
    createCLI,
    STANDARD_RETURN_TEMPLATE
}