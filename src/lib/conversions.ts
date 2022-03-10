import { PackageManagers } from "../types/package-manager";

export type Conversion = { [key in PackageManagers]: string | string[] };

export type Conversions = Conversion[];

//? Values in the objects can be arrays because
//? There are sometimes aliases for some commands and
//? This prevents repeating the same command.
export const conversions: Conversions = [
  { npm: ["npm install", "npm i"], yarn: ["yarn", "yarn upgrade"] },
  { npm: "npm rebuild", yarn: "yarn add --force" },
  {
    npm: ["npm install $package", "npm i $package"],
    yarn: "yarn add $package",
  },
  { npm: "npm uninstall $package", yarn: "yarn remove $package" },

  { npm: "npm cache clean", yarn: "yarn cache clean $package" },
  { npm: "npm version major", yarn: "yarn version --major" },
  { npm: "npm version minor", yarn: "yarn version --minor" },
  { npm: "npm version patch", yarn: "yarn version --patch" },
  {
    npm: ["npm update --global", "npm update -g"],
    yarn: "yarn global upgrade",
  },
  {
    npm: "npm rebuild",
    yarn: "yarn add --force",
  },

  {
    //TODO: I hate this
    npm: [
      "npm install $package --global",
      "npm install $package -g",
      "npm install -g $package",
      "npm install --global $package",
      "npm i $package --global",
      "npm i $package -g",
      "npm i -g $package",
      "npm i --global $package",
    ],
    yarn: "yarn global add $package",
  },
  {
    npm: [
      "npm uninstall $package --global",
      "npm uninstall $package -g",
      "npm uninstall -g $package",
      "npm uninstall --global $package",
    ],
    yarn: "yarn global remove $package",
  },
];
