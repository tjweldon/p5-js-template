#!/bin/zsh
[[ -d "./resources" ]] || mkdir "resources"
curl https://github.com/processing/p5.js/releases/download/v1.4.0/p5.js > "./resources/p5.js";

nvm 2&>1 > /dev/null || curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash;

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

(nvm install 16 && nvm use 16) || echo "Failed to install node"; exit 1

npm install -g browser-sync