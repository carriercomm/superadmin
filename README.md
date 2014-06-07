# Getting Started
> `Superadmin` application using Backbone.js, RequireJS, Grunt & Bower)

# Installation

1. Run ```cp src/scripts/config-default.js src/scripts/config.js``` to create a new configuration file.
2. Install [Node.js](http://nodejs.org/)
3. Run ```sudo npm install -g grunt-cli bower```
4. Run ```npm install``` to install the required dependencies.
5. Run ```npm build``` to build the distribution folder.
6. Run ```npm test``` to test the release files.

If on of these these fails, try running the command by yourself.

*`Superadmin` uses [Grunt][Grunt] as task runner and [Bower][Bower] for installing client-side packages*

# Project structure

You project directory will look like this:

- `.bowerrc`       - config file that tells [Bower][Bower] where to install packages
- `.gitignore`     - files that should not be commited to Git
- `package.json`   - file that specifies which packages should [npm][npm] install
- `dist`           - folder where compiled files are placed (do not edit files here)
- `src`            - folder with source files (write your code here)
	- `vendor` 	     - folder where [Bower][Bower] client-side packages are installed
	- `images`       - folder containing images
	- `scripts`    	 - folder with JavaScript code
	- `styles`       - folder containing stylesheets
	- `templates`    - folder containing template files
	- `oauth.html`   - OAuth2 markup sample file
	- `index.html`   - main markup file
	- `robots.txt`   - robots file

[Grunt]: http://gruntjs.com/
[Bower]: http://bower.io/
[npm]: https://www.npmjs.org/