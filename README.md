# P5 Project Template
This is a project template to act as a starting point for any future p5 projects. It's designed to be lightweight so as to not overcomplicate things for a beginner. This means no npm and no webpack! However in the interests of usability it will install nvm and node version 16.*, along with browser-sync.

## Setup

### Pre-requisites
This repository assumes you have a bash (or similar) shell, powershell or windows `cmd:>` command line interfaces are not supported.
Git is also required!

### Installation

Clone the repository using `git clone`. In your terminal use the following commands to install the relevant dependencies:
```bash
$ cd p5-js-template
$ ./bin/install.sh
```
This should spit out a bunch of output from the installation process. To check that the installation was successful, you can execute the following command and see the output as below:
```bash
$ node --version
v16.13.0
```
If this doesn't work, try the following command (expected output included)
```bash
$ nvm use 16
Now using node v16.13.0 (npm v8.1.0)
```
If this doesn't give the expected result, consult the [nvm documentation](https://github.com/nvm-sh/nvm#installing-and-updating) for instructions on how to install nvm for your platform. Once it's installed successfully you can re-run `./bin/install.sh`.

## Usage

### Running your code
To view your project in the browser, in the terminal, from the project root run the following command. The expected output is shown below. 
```bash
$ ./bin/start.sh
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.206:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 --------------------------------------
[Browsersync] Serving files from: ./
[Browsersync] Watching files...
```
This should automatically open a browser tab but if you accidentally close the tab, or want to use a diffeerent browser simply use url labelled `Local: http://...` from the output of the start command.

The start command will automatically refresh the browser page when you change your code so you should be able to see any changes you make immediately. If nothing seems to be changing, press F12 while on the browser tab to open the dev tools and check the console for errors.

To stop running your project simply press `ctrl-C` on the terminal where it's running and the local server will terminate.

### Extending the template
The file that controls what p5 renders on the canvas is `./main.js`. The draw & setup functions playing the role of `draw` and `setup` from the [p5 documentation](https://p5js.org/). The functions in the `p5` library can be accessed as properties of the `s` object in `./main.js`.