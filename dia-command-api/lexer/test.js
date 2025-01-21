
class Lexer {
    constructor() {
        this.tokens = [];
    }

    /**
     * Tokenize the input string
     * 
     * - Binary operator type: =, +=, -=, ++, --, >=, =>, ==, !=
     * - Single operand operator type: !, ? (checks truthiness, e.g., {"status": 1})
     * - The AST will recursively parse its body product and return syntax errors on discovery.
     * - The AST runs in functions, plugging in parameters.
     * - Parameters are callback functions that store information.
     * - The AST plugs information into Params and Func/Macro classes.
     */
    tokenize(input) {
        const patterns = {
            /* NAMING-CONVENTIONS */
            KEYWORD: /^[a-zA-Z0-9_-]+$/,
            GLOBAL_REF: /^\$[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*(.*)$/s,
            LOCAL_REF: /^\^[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*[^;]+$/,
            MACRO_CALL: /^->\s*[a-zA-Z_][a-zA-Z0-9_]*\s*(?:\([^)]*\))?$/,
            
            /**
             * -> NODE.get() as LOOP;
             * -> FOR(
             * ->  V,
             * ->  (LOOP) => {
             *         const { self, elem, index, jump, back, end, continue } = LOOP;
             *         print '
             *             IPv4: {elem}, 
             *         ';
             *     }
             * -> )
             * 
             * - `prompt: (expression) => {scope}` toggles a LOCAL_SCOPE token type when the `=>\s+{` occurs.
             * - This makes everything inside the following brackets a token of a local scope.
             * - The local scope has the expression as its parent, and every token under it is a child until bracket closure.
             * - `as` is a binary operator storing local assignments for the upcoming scope under a different name.
             */
            
            ANON_FUNC_DEF: /^\(.*\)\s*=>\s*\{[\s\S]*?\}$/,
            NODE_CALL: /^[A-Z][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*\(\)$/,
            REFERENCE: /^@/, // Reference operator (@)
            
            /* 
            
                prompt: write function do that takes something like reference 
                and keyword tokens and a 'do' function that loads an executes 
                a function that allows a callback to be run on the loaded
                keyword. 
            
            */

            /* 
                    add the following: 

                    EOL, 
             */
            BUILT: /\b(if|then|else|else if|end if|macro|end macro|while|end while|for|end for|return|let|const)\b/g, // Reserved keywords
            PIPE: /\b(pipe|p-p|\||_\|||\*|\|>)\b/g,
            
            /* OPERATORS */
            BINARY_OPERATOR: /^(=|\+=|-=|\+\+|--|>=|=>|==|!=)$/,
            SINGLE_OPERAND_OPERATOR: /^(not|!|\?)$/, // Matches ! and ?
            REPEAT_OPERATOR: /^<-|<$/,
            
            /* NUMERIC TYPES */
            INTEGER: /^[+-]?\d+$/, // Matches integers like 42, -42, +42
            FLOAT: /^[+-]?\d+\.\d+$/, // Matches floats like 3.14, -0.001, +2.718
            
            /* SEPARATORS */
            COMMA_SEP: /^,/,
            DOT_SEP: /^./,

            /*
                the dot separtor will be used to detect and compile and object that
                contains the value of the prefixed and suffixed tokens as names 
                for the keys in the pairs on the global_ref or local_ref. this will 
                be done with a function called 'do()'
            */

            /*
                the comma separator is just an aesthetic placeholder for the AST 
                as it parses through the contents of the token array.
            */

            /* BRACKETS */
            ARRAY: /^\[[\s\S]*?\]$/, // Matches entire arrays
            OBJECT: /^\{[\s\S]*?\}$/, // Matches entire objects
            EXPR: /^\{(\s\S)*?\}$/, // Matches entire expressions

            ARRAY_OPEN: /^\[/, // Array open bracket ( '[' )
            ARRAY_CLOSE: /^\]/, // Array close bracket ( ']' )

            CURLY_OPEN: /^\{/, // Curly braces open ( '{' )
            CURLY_CLOSE: /^\}/, // Curly braces close ( '}' )

            PAREN_OPEN: /^\(/, // Parentheses open ( '(' )
            PAREN_CLOSE: /^\)/, // Parentheses close ( ')' )

            /* COMMENTS */
            COMMENT: /^\/\/.*$/, // Matches single-line comments
            /* WHITE-SPACE */
            WHITE_SPACE: /^\s+$/, // Matches whitespace
            NEW_LINE: /^\n+$/,
            TAB_ACTION: /^\t+$/, /*
                prompt: Tab action means ending the current command sequence and starting a new one.
                You can create a macro that generates command call strings and places them in files
                alongside their macro/command names and functions.
                
                Automatically pipes the last results of data from all commands into the next pipe sequence:
                Syntax: 
                    -> --> !| ; --> not pipe
            */
        };

        // Split the input into parts (preserve quoted strings)
        const parts = input.match(/\/\*[\s\S]*?\*\/|\/\/.*|".*?"|'.*?'|\S+/g) || [];

        this.tokens = parts.map((part) => {
            for (const [type, regex] of Object.entries(patterns)) {
                if (regex.test(part)) {
                    return { type, value: part };
                }
            }
            return { type: "UNKNOWN", value: part };
        });

        return this.tokens;
    }
}

/**
 * Create a new Lexer instance.
 */
const createLexer = () => {
    return new Lexer();
};

const lexer = createLexer();

// Example usage
console.log(lexer.tokenize(`
    -> one: 1;
    -> result: add(^result, one) /* 
        Safe add and increment reassignment.
        System may implement multithreading in the future, so this ensures safety.
    */
`));

module.exports = {
    createLexer,
};


```
> node .\lexer.js\
[
  { type: 'UNKNOWN', value: '->' },
  { type: 'PIPE', value: 'one:' },
  { type: 'PIPE', value: '1;' },
  { type: 'UNKNOWN', value: '->' },
  { type: 'PIPE', value: 'result:' },
  { type: 'PIPE', value: 'add(^result,' },
  { type: 'PIPE', value: 'one)' },
  {
    type: 'PIPE',
    value: '/* \n' +
      '        Safe add and increment reassignment.\n' +
      '        System may implement multithreading in the future, so this ensures safety.\n' +
      '    */'
  }
]
```
should be 
```
> node .\lexer.js\
[
  { type: 'UNKNOWN', value: '->' },
  { type: 'KEYWORD', value: 'one' }, 
  { type: 'OBJECT_ASSIGN', value: '='},
  { type: 'INTEGER', value: '1' },
  { type: 'EOL', value: ';' },
  { type: 'EOL', value: ';' },
  { type: 'UNKNOWN', value: '->' },
  { type: 'KEYWORD', value: 'result' },
  { type: 'OBJECT_ASSIGN', value: '=' },
  { type: 'KEYWORD', value: 'add' },
  { type: 'EXPR', value: '(^result, one)' },
  { type: 'PAREN_OPEN', value: '(' },  -- openings
  { type: 'LOCAL_REF', value: '^' }, -- local ref denoting nect token (must be keyword)
  { type: 'KEYWORD', value: 'result' }, -- keyword 'result' is searched for in values, macros, and built-ins for function pair. function returns value.
  { type: 'COMMA_SEP', value: ',' }, 
  { type: 'KEYWORD', value: 'one' }, 
  { type: 'PAREN_CLOSE', value: ')' },  -- then closures.
  {
    type: 'COMMENT',
    value: '/* \n' +
      '        Safe add and increment reassignment.\n' +
      '        System may implement multithreading in the future, so this ensures safety.\n' +
      '    */'
  }
]
```

I need functions that are built in. including mainly do, for, and while. do will
help me put things together and run their operator, macro, and built in on values and keywords.
