# Getting Started
> `Superadmin` application using Backbone.js, RequireJS, Grunt & Bower)

# Installation

1. Install [Node.js](http://nodejs.org/)
2. Run ```sudo npm install -g grunt-cli bower```
3. Run ```bower install``` to install the required client-side dependencies.

If on of these these fails, try running the command by yourself.

*`Superadmin` uses [Grunt][Grunt] as task runner and [Bower][Bower] for installing client-side packages*

# Project structure

You project directory will look like this:

- `.bowerrc`       - config file that tells [Bower][Bower] where to install packages
- `.gitignore`     - files that should not be commited to Git
- `package.json`   - file that specifies which packages should [npm][npm] install
- `node_modules`   - folder where [npm][npm] packages are installed
- `dist`           - folder where generated files are placed (do not edit files here)
- `src`            - folder with source files (write your code here)
	- `vendor` 	     - folder where [Bower][Bower] client-side packages are installed
	- `images`       - folder containing images
	- `index.html`   - main markup file
	- `js`      	 - folder with JavaScript code
	- `css`       	 - folder containing stylesheets

[Grunt]: http://gruntjs.com/
[Bower]: http://bower.io/
[npm]: https://www.npmjs.org/