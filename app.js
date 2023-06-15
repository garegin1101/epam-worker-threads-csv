import extending from "./extending/index.js";

const dirname = process.argv[2];

// Validate command-line argument
if (!dirname) {
  throw Error('Dirname is missing');
}

extending(dirname);

