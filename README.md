Narm converts npm commands into yarn commands and vice versa. Meaning if you enter a npm command, narm will execute the yarn equivalent of it for you.

> If you are enjoying narm, giving it a star would be highly appreciated!

## Getting Started

### Installation

Install narm globally using NPM:

`npm install narm --global`

or Yarn:
`yarn global add narm`

## Usage and examples

For using Narm, simply add "narm" at the start of your command and narm will automatically convert and execute your command to yarn/npm.

#### Example 1:

Input: `narm npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

Output: `yarn add tailwindcss@latest postcss@latest autoprefixer@latest --dev`

#### Example 2:

Input: `narm yarn add lodash`

Output: `npm install lodash`

## Find any bugs/issues?

If you encountered any issues or bugs while using narm, please make sure to open a new issue.

## Contribution

Contributions to narm are greatly appreciated. To contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
