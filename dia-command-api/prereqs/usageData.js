const { createUtils } = require('../utils');
const utils = createUtils();

const STANDARD_HISTORY_OBJECT = {
    timestamp: utils.getTimestamp(),
    name: utils.md5(this.timestamp),
    state: false,
    data: {}
}

class Data {
    constructor(_cmd_name) {
        this.cmd_name = _cmd_name;
        this.cmd_id = utils.md5(_cmd_name);
        this.body = {
            history: []
        }
    }

    addHistory(data, state) {
        this.body.history.push({
            timestamp: utils.getTimestamp(),
            name: utils.md5(this.timestamp),
            state,
            data
        })
    }

}

const createData = (cmd_name) => {
    return new Data(cmd_name);
}

module.exports = {
    createData,
}