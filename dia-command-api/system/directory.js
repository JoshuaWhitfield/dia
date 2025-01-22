

class Directory {
    constructor(path = "/") {
      this.path = path;
    }
  
    setPath(newPath) {
      this.path = newPath;
      
    }

    getPath() {
        return this.path;
    }
  
    listContents() {
      console.log(`Listing contents of directory: ${this.path}`);
      // Mock implementation
      return ["file1.txt", "file2.txt", "subdir"];
    }
  }
  
  const createDirectory = (path = "./") => {

  }