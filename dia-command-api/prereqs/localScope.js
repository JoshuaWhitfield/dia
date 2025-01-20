const md5 = require('md5');
const { FIF, FDEC, FFOR } = require('func-fave');

const MARKUP = {
    charsets: {
        alpha: 'qwertyuiopasdfghjklzxcvbnm',
        number: '1234567890',
        symbol: '~\`!@%&()_+-=\|[]{};\':\"\,<>/?\"',
    }
}

class Local {
    constructor(_scope_name) {
        this.scope_name = _scope_name;
        this.scope_id = md5(_scope_name);
        this.scope_body = {
            keywords: {},
            size: 0,
        };
    }

    confirmScope(scope_id) {
        return (scope_id = this.scope_id);
    }

    updateScope(new_scope_keywords_object) {
        this.scope_body.keywords = new_scope_keywords_object;
    }

    searchAssignment(scope_name) {
        return this.scope_body.keywords[scope_name]
    }

    defineAssignment(new_keyword_name, value) {

        return FDEC(
            FIF(
                (typeof(new_keyword_name) == "string")
                ,
                () => {
                    const result = FFOR(
                        new_keyword_name,
                        (NODE) => {
                            const { index, elem } = NODE.get();
                            return FIF(
                                (typeof(MARKUP.charsets.symbol.indexOf(new_keyword_name)) != "number")
                            )
                        },
                    )

                    return FIF(
                        (typeof(result.indexOf(false)) != "number"),
                        () => {
                            return FIF(
                                (typeof(this.scope_body.keywords[new_keyword_name]) == "undefined")
                                ,
                                () => {
                                    console.log(`       [scope]: local assignment ${new_keyword_name} made!`)
                                    return true;
                                },
                                () => {
                                    console.log(`       [scope][error]: local assignment ${new_keyword_name} already exists...`)
                                    return false
                                }
                            );
                        },
                        () => {
                            console.log(`       [scope][error]: illegal character '${MARKUP.charsets.symbol[result.indexOf(false)]}'`)
                            return false;
                        }
                    )
                }
            )
            ,
            () => {
                this.scope_body.keywords[new_keyword_name] = value;
                return this.searchAssignment(new_keyword_name);
            }

        )

    }

}

createLocal = (scope_name) => {
    return new Local(scope_name);
}

module.exports = {
    createLocal,
    MARKUP
}