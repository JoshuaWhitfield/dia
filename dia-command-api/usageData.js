const md5 = require("md5");
const 

const STANDARD_HISTORY_OBJECT = {
    state: false,
    data: {}
}

class Data {
    constructor(_cmd_name) {
        this.cmd_name = _cmd_name;
        this.cmd_id = md5(_cmd_name);
        this.body = {
            history: []
        }
    }

    addHistory(history_object) {

    }


}