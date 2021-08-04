const splitCommand = (command) => {
  // Converts "npm install react" to ["npm", "install", "react"]
  return command.split(" ");
};

const rearrangeFlags = (command, convertedFlags) => {
  const splittedCommand = splitCommand(command);
  const rawCommand = [];
  const flags = [];
  splittedCommand.forEach((word) => {
    // For each word, we check if the word is a flag and to do so, we check the flags for that package manager and if it is present in the flags for that package manager, we push it into flags
    if (Object.keys(convertedFlags).includes(word)) return flags.push(word);
    // If this part is reached, it means that the word was NOT a flag so we push it into the array as a part of the raw command
    rawCommand.push(word);
  });
  // We sort this so "npm --global install react" turns into "npm install react --global"
  rawCommand.sort((a, b) => {
    if (a.startsWith("-")) return 1;
    else if (b.startsWith("-")) return -1;
  });
  return [rawCommand, flags];
};

const getPackageNameFromCommand = (command, reservedWords) => {
  // We split the command so it becomes ['npm', 'install', 'react']
  const splittedCommand = splitCommand(command);
  // And if the word is not in the list of reserved words, it means that it's a package. For example in ['npm','install','react'] npm is reserved, install is reserved and react is not so react will be the name of the package
  // And since flags are in the list of reserved words, we check if the word doesn't start with "--""
  return splittedCommand.filter(
    (word) => !reservedWords.includes(word) && !word.startsWith("--")
  );
};

exports.convert = (command, packageManager) => {
  // packageName converts "npm install react" into ["react"] with the help of the function above
  let packageName = getPackageNameFromCommand(
    command,
    packageManager.reservedWords
  ).join(" ");

  // The object of converted commands
  const convertedCommands = packageManager.convertCommands(packageName);

  // We get [['npm', 'install', 'react'], ['--save-dev']] from 'npm install react --save-dev'
  let commandParts = rearrangeFlags(command, packageManager.convertedFlags);

  // The first element of the above variable, so for our example it's ['npm', 'install', 'react']
  const rawCommand = commandParts[0].join(" ");

  const commandFlags = [];

  commandParts[1].forEach((flag) => {
    const convertedFlag = packageManager.convertedFlags[flag];
    // We check if the flag has an equivalent in the package manager that we want to convert it into. if so, we push it into the empty array that we created above
    if (convertedFlag) commandFlags.push(convertedFlag);
  });

  if (convertedCommands[rawCommand] === undefined)
    throw new Error("Could not convert the given command: " + command);

  // And finally, we return what we got
  return `${convertedCommands[rawCommand]} ${commandFlags.join(" ")}`.trim();
};
