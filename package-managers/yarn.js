// TODO class
exports.yarn = {
  reservedWords: [
    "npm",
    "install",
    "uninstall",
    "i",
    "-D",
    "-S",
    "-g",
    "update",
    "rebuild",
    "cache",
    "clean",
    "version",
    "major",
    "minor",
    "patch",
  ],
  convertedFlags: {
    "--no-package-lock": "--no-lockfile",
    "--save-dev": "--dev",
    "-D": "--dev",
    "--save": null,
    "-S": null,
    "--save-optional": "--optional",
    "--save-exact": "--exact",
  },
  convertCommands: (packageName) => {
    return {
      "npm install": "yarn",
      [`npm install ${packageName}`]: `yarn add ${packageName}`,
      [`npm i ${packageName}`]: `yarn add ${packageName}`,
      "npm update": "yarn global upgrade",
      [`npm install ${packageName} --global`]: `yarn global add ${packageName}`,
      [`npm install ${packageName} -g`]: `yarn global add ${packageName}`,
      [`npm i ${packageName} --global`]: `yarn global add ${packageName}`,
      [`npm i ${packageName} -g`]: `yarn global add ${packageName}`,
      [`npm uninstall ${packageName}`]: `yarn remove ${packageName}`,
      "npm cache clean": "yarn cache clean",
      "npm rebuild": "yarn add --force",
      "npm version major": "yarn version --major",
      "npm version minor": "yarn version --minor",
      "npm version patch": "yarn version --patch",
    };
  },
};