const { createCLI, STANDARD_RETURN_TEMPLATE } = require('./cli');
const { createParams } = require('./param');
const { FIF } = require('func-fave');
const cli = createCLI();

cli.loadCommand('cls', 
    (params = createParams()) => {
        console.clear()
        return STANDARD_RETURN_TEMPLATE
    }
)

cli.loadCommand('ls', 
    (params) => {
        const IS_KEYWORD = false;

        function init() {
            const hasAllParameters = FIF( (!params.length && !(params.length > 2)) );
            return FIF(
                (!hasAllParameters),
                () => cli.getError(0, {"msg": "path not included or too many parameters"}),
                () => {
                    const checkIsKeyword = FIF( (params[1].split("/|\\").length > 1) );
                    return FIF(
                        (!checkIsKeyword)
                        ,
                        () => {
                            IS_KEYWORD = true;
                            return true;
                        },
                        () => true
                    )
                }
            )
        }
        
        const checkIsValidInit = init(); 
        const target_path = params[1];

        return FIF(
            (typeof(checkIsValidInit) == "object" && !checkIsValidInit.status)
            ,
            () => checkIsValidInit,
            () => {
                // add functionality here.
                cli.utils.sysMsg("ls", `changing to working directory: ${target_path}`);
                return cli.getError(1, {"msg": target_path})
            }
        )
    }
)

module.exports = {
    cli
}