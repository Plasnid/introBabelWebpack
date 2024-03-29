# introBabelWebpack

## What is the Purpose of This Repo?
This repository is all about setting up basic babel and webpack functionality.  What are Babel and Webpack?

### What is Babel
Babel is a transpiler! We use it to convert between different versions of JavaScript.  In this project we are converting from ES6 and higher to ES5.  We do this because ES5 is the most compatible version of JavaScript.  JavaScript is a living language.  It has standards that change and improve over time. Browsers tend to have their own engines for interpreting JavaScript, so we can't always be sure that they will be completely up to date with all modern web standards.

Babel helps us convert our modern JavaScript to the ES5 version automatically, so we can use the newest standards and still reach a wide audience.  Babel parters perfectly with Webpack, which combines multiple scripts into one.

### What is Webpack
Webpack is a bundling tool, but it can do far more.  Most often we use it to combine scripts for improved site performance, but it can also compress, route files, or transform with the use of loaders.  Webpack uses babel as a loader to convert files, then takes that converted content and combines it into a single bundled file.  It does more than just JavaScript too.  It can also handle CSS, SASS, Images, and much more.

## How To Build This Project From Scratch

1. Create a new folder.  You can call it anything you like, but you might want to name it webpack_babel_project in this instance to keep it's purpose in your mind.  Notice there are no capital letters in the name. 
2. In our new folder, make 2 more folders
    1. a folder named __dist__ which will hold our output for our javascript.
    2. a folder named __src__ which will hold the javascript files we work on.
3. Drag your project folder into VS Code
4. Open a terminal in VS Code by going to Terminal/New Terminal in the top menu.
5. THIS STEP IS ONLY FOR MAC! IF YOU ARE PC GO TO STEP 4. Only if you are on mac, go to your terminal and type in the following command and press enter:
    1. chmod -R 777 ./
    
    Why did we just type that command?  Our scripts are going to write a bundle.js file into our dist folder.  With that command we changed our project folder to be full open to reading and writing.  If we didn't do this, when we ran our build script, we would get errors.

    What did we just do?  We made our project folder and all its children readable, writable, and executable for all users.  Do not do this for your professional projects, only our demonstrations.
6. In the __dist__ folder make an __index.html__ file and give it the following contents
~~~~
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yes, I am being bundled!</title>
</head>
<body>
    <h1>All Bundled Together</h1>
    <script src="./bundle.js"></script>
</body>
</html>
~~~~
7. In our _src_ folder make a file called _index.js_.
8. In our _src_ folder make a file called _otherFile.js_.
9. In your terminal type each of the commands below.  Hit enter after each command: 
    1. npm init -y
    2. npm install --save-dev @babel/core
    3. npm install --save-dev @babel/node
    4. npm install --save-dev @babel/preset-env
    5. npm install --save-dev babel-loader
    6. npm install --save-dev webpack
    7. npm install --save-dev webpack-cli
    8. npm install --save-dev webpack-dev-server
10. Now that all our libraries are installed, open your package.json file.  We want the scripts section to look like this:
~~~~
"scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development",
    "build": "webpack --config ./webpack.config.js --mode production"
},
~~~~
## Our Taskrunners(scripts)   
### start
Lets break down our scripts into the component parts.  The start script is all about building and testing.  This is just for us, the developers, not the public.

__webpack-dev-server__ is a library we are using to run our project in a node server environment. It's like having our file online.

__--config ./webpack.config.js__ is telling our script where to find the config for our webpack setup.

__--mode development__ is telling our script that we don't want to compress our file in our output folder.  We are setting he mode to development.  If we set the mode to production, it would compress our file by removing all the tabs and spaces.  In this mode we don't see a _bundle.js_ file appear in our output folder.  Our output folder is the _dist_ folder.

### build
Our build script is for when we are ready to release the project.  In this script we aren't running a server.  In this script we are going to build a _bundle.js_ file and putting it into our _dist_ folder. 

__webpack__ is the name of the library we are going to use to compress and compile our js file.  It starts with _src/index.js_ and checks the imports that our js file is pulling in.

__--config ./webpack.config.js__ like in our previous script, is showing us where our configuration file is.

__--mode production__ tells our script that want to compress and remove all the spaces and tabs.

## What Do Our devDependencies Do?
__@babel/core__ is the core set of instructions for babel.
 
__@babel/node__ is a CLI(command line interface) for babel in node. It lets us use scripts to control babel.

__@babel/preset-env__ is a plugin for babel that lets it convert ES6+ to ES5 JavaScript.

__babel-loader__ lets us use babel inside of webpack.

__webpack__ is a file bundler.

__webpack-cli__ is a command line interface(CLI) so we can use scripts with webpack.

__webpack-dev-server__ gives us a temporary server environment to test out our sites with our code combined in webpack.

At this point we are done with our _package.json_ file.

11. Make a file in the root of your project called _.babelrc_

The contents of the file should be:
~~~~
{
    "presets": [
        "@babel/preset-env"
    ]
}
~~~~
This file holds onto the different presets we use to convert files.  They can be for javascript, jade(pug), css, typescript, or any number of other files.

12. Make a file in the root of your project called _webpack.config.js_

The contents of the file should be:
~~~~
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        static: './dist'
    }
};
~~~~
### What does each part of the webpack.config.js do?
__entry__ shows us what file we are going to start our script with.  In this case it is _src/index.js_

__module__ holds onto a list of rules for us.  Each rule has a test and a use.  Sometimes, they have an exclude too.  In this case we are testing for any file ending with js, except if it is in the node_modules folder.  When we find one, we are going to use babel-loader, which will call preset-env to convert it to ES5.

__resolve__ holds onto a list of extensions webpack checks on.

__output__ looks for a folder named _dist_ in the root of our project, and will put our compiled code there, in a file called _bundle.js_

__devServer__ tells webpack-dev-server to serve content from our _dist_ folder.

## Thats All Our Setup! Now a tiny bit of code!
Now thats done, lets add code to our js files.

13. In src/index.js add the following code:
~~~~
import { bestCheese, worstCheese } from './otherFile.js'

console.log("borkings to all and to all a good bork!");
let titleFun = `${bestCheese} and ${worstCheese} are two different cheeses of interesting origin!.`;
console.log(titleFun);
let theTitler = document.querySelector("h1");
theTitler.innerText = titleFun;
~~~~

14. In otherFile.js add the following code:
~~~~
let bestCheese = "cheddar";
let worstCheese = "Pied-de-Vent";

export { bestCheese, worstCheese };
~~~~

15. Save everything. Go to your terminal type the code below and hit enter.
~~~~
npm run start
~~~~

16. In your browser go to http://localhost:8080

What does your title say?  If it says:

Cheddar and Pied-de-vent are two different cheeses of interesting origin!

Then you have it right :)

## So Whats Going On Here?

Your webpage is being served from localhost:8080.  It is grabbing content from your dist folder.  What is in your dist folder?  _index.html_. Index is pointing to _bundle.js_.  _bundle.js_ is a combination of _src/index.js_ and _otherFile.js_.  

_otherFile.js_ is an ES6 module, so it only exports what we want it to.  In this case it is exporting two variables; bestCheese and worstCheese.  We could export anything though.  Classes, functions, variables...you name it!

One last thing...how do we stop our server?  Click on your terminal then press __control-c__ on your keyboard and your server will stop.