const TOKEN_TYPES = {
    COMMAND: /^[a-zA-Z0-9_-]+$/,
    ARGUMENT: /^--?\w+|".*?"|'.*?'|\w+$/,
    PIPE: /^\|$/,
    REDIRECT: /^(>|>>|<)$/,
    KEYWORD: /@\$\w+$/,
    MACRO_DEF: /^(\w+)\(([^)]*)\)\s*{\s*(.*?)\s*}$/s,  // Corrected regex for macro definition
    WHITE_SPACE: /^\s+/,
  }
  
  function tokenize(input) {
    const tokenPatterns = [
      { type: 'Keyword', regex: /\b(if|then|else\sif|else\sif|end\sif|macro|end\smacro|while|end\swhile|for|end\sfor|return|let|const)\b/g },
      { type: 'Identifier', regex: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g },
      { type: 'Number', regex: /\b\d+(\.\d+)?\b/g },
      { type: 'Operator', regex: /[+\-*/%|&=!<>^]=?|==|>=|<=|\|\|#?\w+/g },
      { type: 'Pipe', regex: /\|>|_\|?|\|/g },
      { type: 'Macro', regex: /#\s*define\s+[a-zA-Z_][a-zA-Z0-9_]*\s+/g },
      { type: 'String', regex: /(["'])((?:\\\1|.)*?)\1/g },
      { type: 'SingleLineComment', regex: /\/\/[^\n]*/g },
      { type: 'MultiLineComment', regex: /\/\*[\s\S]*?\*\//g },
      { type: 'WhiteSpace', regex: TOKEN_TYPES.WHITE_SPACE }  // Added white space handling
    ];
  
    let tokens = [];
    
    while (input.length > 0) {
      let matched = false;
  
      for (let pattern of tokenPatterns) {
        const match = pattern.regex.exec(input);
  
        if (match && match.index === 0) {
          // If the token is whitespace, skip it
          if (pattern.type === 'WhiteSpace') {
            input = input.slice(match[0].length); // Skip over whitespace
            matched = true;
            break;
          }
          
          // Otherwise, add it as a token
          tokens.push({ type: pattern.type, value: match[0] });
          input = input.slice(match[0].length); // Remove matched part from input
          matched = true;
          break;
        }
      }
  
      // If no match is found, skip the current character (could be unrecognized or invalid input)
      if (!matched) {
        input = input.slice(1);
      }
    }
  
    return tokens;
  }
  
  const code = `function test() {
    let a = 5;
    let b = 10;
    if (a | b) {
      return a + b;
    }
  }`;
  
  console.log(tokenize(code));
  