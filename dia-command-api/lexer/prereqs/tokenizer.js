const TOKEN_TYPES = {
    COMMAND: /^[a-zA-Z0-9_-]+$/,  // Matches command names
    ASSIGNMENT_GLOBAL: /^\$[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*(.*)$/s,  // Global assignment (e.g., $result = 10), multi-line support
    ASSIGNMENT_LOCAL: /^\^[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*[^;]+$/,  // Local assignment (e.g., ^result = 5)
    MACRO_CALL: /^->\s*[a-zA-Z_][a-zA-Z0-9_]*\s*(?:\([^)]*\))?$/,  // Macro calls (e.g., -> myMacro(param1, param2))
    REFERENCE: /^@/,  // Reference operator (@)
    PIPE: /\|/g,  // Pipe operator
    KEYWORD: /\b(if|then|else|else if|end if|macro|end macro|while|end while|for|end for|return|let|const)\b/g,  // Reserved keywords
    MACRO_MAIN: /\b(pipe|p-p|\||move|touch)\b/g,
    ARRAY_OPEN: /^\[/,  // Array open bracket ([)
    ARRAY_CLOSE: /^\]/,  // Array close bracket (])
    CURLY_OPEN: /^\{/,  // Curly braces open ({)
    CURLY_CLOSE: /^\}/,  // Curly braces close (})
    WHITE_SPACE: /^\s+/  // Whitespace
  };
  function tokenize(input) {
    const tokenPatterns = [
      { type: 'Assignment_Global', regex: TOKEN_TYPES.ASSIGNMENT_GLOBAL },
      { type: 'Assignment_Local', regex: TOKEN_TYPES.ASSIGNMENT_LOCAL },
      { type: 'Macro_Call', regex: TOKEN_TYPES.MACRO_CALL },
      { type: 'Reference', regex: TOKEN_TYPES.REFERENCE },  // Handle @ as a reference operator
      { type: 'Pipe', regex: TOKEN_TYPES.PIPE },
      { type: 'Keyword', regex: TOKEN_TYPES.KEYWORD },
      { type: 'Array_Open', regex: TOKEN_TYPES.ARRAY_OPEN },
      { type: 'Array_Close', regex: TOKEN_TYPES.ARRAY_CLOSE },
      { type: 'Curly_Open', regex: TOKEN_TYPES.CURLY_OPEN },
      { type: 'Curly_Close', regex: TOKEN_TYPES.CURLY_CLOSE },
      { type: 'WhiteSpace', regex: TOKEN_TYPES.WHITE_SPACE }
    ];
    
    let tokens = [];
  
    while (input.length > 0) {
      let matched = false;
  
      for (let pattern of tokenPatterns) {
        const match = pattern.regex.exec(input);
  
        if (match && match.index === 0) {
          // Skip whitespace
          if (pattern.type === 'WhiteSpace') {
            input = input.slice(match[0].length);
            matched = true;
            break;
          }
  
          // Handle assignments based on scope
          if (pattern.type === 'Assignment_Global') {
            // Capture everything after global assignment
            tokens.push({ type: pattern.type, value: match[0], scope: 'global' });
            input = input.slice(match[0].length); // Remove the assignment part from input
            matched = true;
            break;
          } else if (pattern.type === 'Assignment_Local') {
            tokens.push({ type: pattern.type, value: match[0], scope: 'local' });
            input = input.slice(match[0].length);
            matched = true;
            break;
          }
  
          // Handle other token types (macros, references, pipes, keywords, brackets, curly braces)
          tokens.push({ type: pattern.type, value: match[0] });
          input = input.slice(match[0].length);
          matched = true;
          break;
        }
      }
  
      // Skip unrecognized characters
      if (!matched) {
        input = input.slice(1);
      }
    }
  
    return tokens;
  }
  
  // Example input
  const input = `
  $globalVar = 10
    -> myMacro
    -> myMacro()
    -> @myMacro()
    -> myMacro({$globalVar})
    -> anotherMacro({$globalVar}, [param_one, param_two])
  `;
  
  console.log(JSON.stringify(tokenize(input), null, 2));
  