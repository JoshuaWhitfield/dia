```
    -> path = "C:/path/to/target";
    -> command(path, -f1"flag one", -f2 "flag two", exit());
    /*
        declared 'path' as string. "C:" from root, or "./" from tool root.
        called command with four parameters:
            - 'path'
            - '-f1' flags must always be preceded with a dash '-'.
              they must be followed by a string or integer "", or 1.
              the must be followed by the most logical separator, 
              in this case comma ','. system flags that are reserved 
              for verbosity etc are prefixed with double dash and a 
              capital letter to start '--Verbose' or '--V'
    */


    /*
        when you press enter, the lines go down and allow you to continue printing,
        when you press shift + enter or shift + r the code runs.
    */
```