const { createTemplate, createTemplateObject, BLANK_MANUAL_BODY, STANDARD_TEMPLATE } = require("./prereqs/manualBody");
const { createLocal } = require('./prereqs/localScope');
const { createData } = require('./prereqs/usageData');

class MACRO {

    constructor(functionBody, manualBody = STANDARD_TEMPLATE) {
        this.iteration = 0
        const { cmd_name, short, long, description } = manualBody;
        this.usage = createTemplate(cmd_name, short, long, description);
        this.scope = createLocal(cmd_name);
        this.data = createData(cmd_name);
        this.body = {
            function: {
                name: cmd_name,
                run: functionBody
            }
        }
    }

    safeRun() {
        return this.body.function.run();
    }

    display() {
        console.log(`
            usage: ${this.usage}\n\n
            scope: ${this.scope}\n\n
            data: ${this.data}\n\n

        `)
    }

}