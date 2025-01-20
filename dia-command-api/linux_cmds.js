const { createCLI, STANDARD_RETURN_TEMPLATE } = require('./cli');

const cli = createCLI();

cli.loadCommand('cls', 
    () => {
        console.clear()
        return STANDARD_RETURN_TEMPLATE
    }
)

module.exports = {
    cli
}