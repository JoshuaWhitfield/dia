const { createUtils } = require("../utils");

class Lexer {
    constructor() {
        this.tokens = [];
        this.utils = createUtils();
    }

    tokenize(input) {
        const patterns = {
            // NAMING CONVENTIONS
            KEYWORD: /^[a-zA-Z_][a-zA-Z0-9_-]*$/, // Matches keywords like 'one', 'result'
            GLOBAL_REF: /^\$[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*(.*)$/s, // Matches global assignments
            LOCAL_REF: /^\^[a-zA-Z_][a-zA-Z0-9_]*$/, // Matches local references like '^result'
            MACRO_CALL: /^->\s*[a-zA-Z_][a-zA-Z0-9_]*\s*(?:\([^)]*\))?$/, // Matches macro calls

            // OPERATORS AND SEPARATORS
            OBJECT_ASSIGN: /^=$/, // Matches assignment operator '='
            COMMA_SEP: /^,$/, // Matches commas
            DOT_SEP: /^\.$/, // Matches dot for object property access
            EOL: /^;$/, // Matches end of line ';'

            // EXPRESSION HANDLING
            EXPR: /^\(.*?\)$/, // Matches expressions like '(^result, one)'
            PAREN_OPEN: /^\($/, // Parentheses open
            PAREN_CLOSE: /^\)$/, // Parentheses close

            // NUMERIC TYPES
            INTEGER: /^[+-]?\d+$/, // Matches integers like 42, -42
            FLOAT: /^[+-]?\d+\.\d+$/, // Matches floats like 3.14

            // BRACKETS
            CURLY_OPEN: /^\{$/, // Matches '{'
            CURLY_CLOSE: /^\}$/, // Matches '}'

            // COMMENTS AND WHITESPACE
            COMMENT: /^\/\*[\s\S]*?\*\/$/, // Matches multi-line comments
            WHITE_SPACE: /^\s+$/, // Matches whitespace
        };

        // Split the input into tokens
        const parts = input.match(/\/\*[\s\S]*?\*\/|\/\/.*|".*?"|'.*?'|\S+/g) || [];

        this.tokens = parts.map((part) => {
            for (const [type, regex] of Object.entries(patterns)) {
                if (regex.test(part)) {
                    return { 
                        type,
                        value: part.trim(),
                        hash: this.utils.md5(value),
                        timestamp: this.utils.getTimestamp()
                    }; // Trim extra spaces
                }
            }
            return { type: "UNKNOWN", value: part }; // Fallback for unrecognized input
        });

        return this.tokens;
    }
}

