exports.npm = {
  // Words that are reserved by the package manager and cannot be used for installing/removing any package
  reservedWords: [
    "yarn",
    "add",
    " global",
    "remove",
    "cache",
    "clean",
    "upgrade",
    "version",
  ],
  // Flags for yarn package manager converted to npm
  convertedFlags: {
    "--flat": null,
    "--har": null,
    "--no-lockfile": "--no-package-lock",
    "--pure-lockfile": null,
    "--dev": "--save-dev",
    "--peer": null,
    "--optional": "--save-optional",
    "--exact": "--save-exact",
    "--tilde": null,
    "--major": "major",
    "--major": "major",
    "--patch": "patch",
  },
  // This is a function that gets the package name and dynamically sets its keys according to the input. For example, yarn add ${packageName} will be converted into yarn add vue
  convertCommands: (packageName) => {
    return {
      "yarn add": "npm install",
      [`yarn add ${packageName}`]: `npm install ${packageName} --save`,
      // Notice --global wasn't added as a flag because it's handled differently in yarn
      [`yarn global add ${packageName}`]: `npm install ${packageName} --global`,
      "yarn global upgrade": "npm update --global",
      "yarn add --force": "npm rebuild",
      [`yarn remove ${packageName}`]: `npm uninstall ${packageName}`,
      [`yarn cache clean ${packageName}`]: "npm cache clean",
      "yarn version": "npm version",
    };
  },
};
