const readline = require("readline");

const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ` 
            -[dia][ai]>
            -[/root/htdocs]> <[httpd conf distro]d
            -[httpd-vhost.cnf httpd-register.ini ...]f
            m[]
            k[]
            v[]
            h[]
            -:>
                
                ` // Display prompt
});

const STANDARD_PROMPT = {
    path: `-[]`
}

class Prompt {

    constructor(_path, _keyword_array, _macro_array, _ipv4_array, _lhost_array) {
        this.path = _path;
        this.keyword_array = _keyword_array;
        this.macro_array = _macro_array;
        this.ipv4_array = _ipv4_array;
        this.lhost_array = _lhost_array;

        this.body = {
            prompt: ``,
        }

    }

    setPrompt(path, keyword_array, macro_array, ipv4_array, lhost_array) {

        this.body.prompt = `
            -[dia][ai]-[${path}]
            
                m[${macro_array}]
                k[${keyword_array}]
                v[${ipv4_array}]
                h[${lhost_array}]
            
            -:> `
    }

    getPrompt() {
        return this.body.prompt
    }






}

const createPrompt = (header, path, keyword_array, macro_array, ipv4, lhost) => {
    return new Prompt(header, path, keyword_array, macro_array, ipv4, lhost)
}

//write prompt class in
const prompt = createPrompt()


// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ` 
              -[dia][ai]-[/root/htdocs]
              m[]
              k[]
              v[]
              h[]
              -:>
                  
                  ` // Display prompt
  });
  