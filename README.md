**This package converts npm commands into yarn commands and vice versa. Meaning if you enter a npm command, this package will execute the yarn equivalent of it for you. **

## Installation

`npm install narm --global`

## Usage

Let's say you want to install Tailwind using yarn. In the command line you can enter:

`narm npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

and Narm will execute the yarn equivalent for you; which in this case is:

`yarn add tailwindcss@latest postcss@latest autoprefixer@latest --dev`

The same happens for converting yarn commands into npm commands. Let's say you want to install lodash using NPM. You can enter:

`narm yarn add lodash`

and Narm will execute the NPM equivalent for you; which in this case is:

`npm install lodash`
