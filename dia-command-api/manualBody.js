const md5 = require("md5");

const B = "•";

const BLANK_USAGE_BODY = {
    name: "CMD-NAME: ", 
    usage: {
        short: "SHORT: ",
        long: "LONG: "
    },
    description: "DESC: "
}

const STANDARD_TEMPLATE = {
    cmd_name: "example_cmd",
    short: `
        -exa [param 1] -F a:127.0.16.5
        -exa [param 2] -F a:127.0.17.4 
        -exa [param 3] -F a:127.0.0.1 
    `,
    long: `
        example_cmd [parameter one] -Flag assignment:127.0.28.2
        example_cmd [parameter two] -Flag assignment:127.0.10.35 
        example_cmd ...`,
    description: `
        this command is called 'example_cmd'. It has both a short 
        and long option description. you can put a multiple things
        in a command input including the command name, parameters, 
        flags, and assignments.
        
        details:

            ${B} '-exa' is the shortened name for the command, 
            abbreviated and preffixed by a dash '-' symbol.

            ${B} parameters are emphasized by brackets in usage
            syntax. like so [parameter].

            ${B} '-Flags' are used inside commands as option identifiers,
            and externally as macro flags which start with a dollar sign '$'

            ${B} 'assignments: ...' are keywords that store any information, 
            including macros. you can pass keywords to macros as function parameters and get 
            information out which you can store in another macro.

                -> result: operateOn({keyword}, '[parameter one] $Flag')
                -> result | echo

            you can make assignments anywhere and they will be stored global scope.
            the delimiter for making local assignments specific to the scope
            of a command is '^'. you can create a copy of a global keyword and
            use it in the local scope of the command by denoting it with '^'. 
            this helps with dealing with commands or macros that are impure.
            (meaning the value going into a function is different when it exits)

                -> one: 1;
                -> result: add(^result, one) /* 
                    safe add and increment
                    reassignment. system may implement multithreading 
                    in the future so this makes things safer.
                */ 

        `,
}

class Usage {
    constructor(_usageName = "usage_name", _usageBody = BLANK_USAGE_BODY) {
        this.usageName = _usageName;
        this.usageBody = _usageBody;
        this.usageID = md5(this.usageName);
        this.currentBody = BLANK_usage_BODY;
    }

    confirmUsage(usage_id) {  
        return (usage_id == this.usageID);
    }

    getUsage() {
        return this.currentBody;
    }

    updateUsage() {
        this.currentBody = this.usageBody;
        return this.currentBody;
    }

    setup(usage_short_item, usage_long_item, description) {
        this.setCmdName(this.usageName);
        this.setUsageShort(usage_short_item);
        this.setUsageLong(usage_long_item);
        this.setDescription(description);

        this.currentBody = this.usageBody;
        return this.currentBody
    }

    setName(new_usage_name, usage_body_item = this.usageName) {
        usage_body_item = new_usage_name;
        return usage_body_item;
    }

    setCmdName(new_cmd_name, usage_body_item = this.usageBody.name) {
        usage_body_item += new_cmd_name;
        return usage_body_item;
    } 

    setUsageShort(new_usage_short_item, usage_body_item = this.usageBody.usage.short) {
        usage_body_item += new_usage_short_item;
        return usage_body_item;
    }

    setUsageLong(new_usage_long_item, usage_body_item = this.usageBody.usage.long) {
        usage_body_item += new_usage_long_item;
        return usage_body_item;
    }

    setDescription(new_description, usage_body_item = this.usageBody.description) {
        usage_body_item += new_description;
        return usage_body_item;
    }
    
}

class Template {
    constructor(cmd_name, usage_short_item, usage_long_item, description) {
        this.cmd_name = cmd_name;
        this.short = usage_short_item;
        this.long = usage_long_item;
        this.description = description;

        return this.createUsage(
            this.cmd_name, this.short, this.long, this.description
        )
    }

    createUsage = (cmd_name, usage_short_item, usage_long_item, description) => {
        const usage = new Usage(cmd_name);
        usage.setup(cmd_name, usage_short_item, usage_long_item, description)
        return usage
    }
}

const createTemplate = (cmd_name, usage_short_item, usage_long_item, description) {
    return new Template(cmd_name, usage_short_item, usage_long_item, description);
}

module.exports = {
    createTemplate,
    BLANK_USAGE_BODY, B,
    STANDARD_TEMPLATE,
}