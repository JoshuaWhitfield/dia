const { createUtils } = require('../utils');
const STANDARD_RETURN_TEMPLATE = {status: 0, data: {}};

class CLI {

    constructor() {
        this.body = {
            command_table: {},
            path: "",
        }
        this.standard = STANDARD_RETURN_TEMPLATE;
        this.utils = createUtils();
    }

    toggleProcess() {
        this.process = !this.process;
        return true;
    }

    loadCommand(cmd_name, func_body) {
        this.body.command_table[cmd_name] = func_body
        return true
    }

    searchCommand = (cmd_name) => this.body.command_table[cmd_name];

    getError(status = 0, data = {}) {
        return {status, data};
    }
      

}

const createCLI = () => {
    return new CLI();
}

module.exports = {
    createCLI,
    STANDARD_RETURN_TEMPLATE
}