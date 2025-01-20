/*
    DATE - TIME
*/

const md5 = require("md5");

class Utils {

    getTimestamp() {
        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleString(); // Formats the date and time based on local settings
        return formattedDate
    }

    md5(input_string) {
        return md5(input_string);
    }
    
}

createUtils = () => {
    return new Utils;
}

module.exports = {
    createUtils,
}