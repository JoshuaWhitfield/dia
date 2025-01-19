const { createTemplate, createTemplateObject, BLANK_MANUAL_BODY, STANDARD_TEMPLATE } = require("./manualBody");
const { createLocal } = require('./localScope');

class Command {
    constructor(commandName, functionBody, manualBody = STANDARD_TEMPLATE){
        this.iteration = 0
        const { cmd_name, short, long, description } = manualBody;
        this.usage = createTemplate(cmd_name, short, long, description);
        this.scope = createLocal(cmd_name);
        this.data = 
    }
}