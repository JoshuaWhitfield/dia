const { FIM, FFOR, FIF } = require('func-fave');

class Param {

    constructor() {
        this.body = {
            param_array: [],
            param_table: {},
            current_param: {},
            size: -1,
        }
    }

    self = () => this;
    get = () => this.body
    
    getCurrentParams = () => this.body.current_param
    getObjectParams = () => this.get().param_array
    getFormattedParams = () => {
        const params_arr = this.getObjectParams();
        const final_param = FFOR(
            params_arr
            ,
            (NODE) => {
                const { elem } = NODE.get();
                return elem.param_value;
            }
        ).join(" ");
        
        return final_param;
    }
    getArrayParams = () => {
        return this.getFormattedParams().split(" ")
    }

    searchParams(param_value) {

        return FIF(
            (typeof(this.get().param_array.indexOf(param_value)) == "number")
            ,
            () => param_value
        )
        
    }

    add(new_param_value) {
        return FIF(
            (typeof(this.get().param_array.indexOf({param_value: new_param_value})) != "number")
            ,
            () => {
                this.size++;
                const param_obj = {param_value: new_param_value};
                this.get().param_array.push(param_obj);
                this.get().param_table[this.size] = param_obj;
                this.get().current_param[this.size] = param_obj;
                return this.get()
            }
        )
    }

}

const createParams = () => {
    return new Param();
}

module.exports = {
    createParams,
}