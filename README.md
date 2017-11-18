# Votest App (Web)

## Before start project must have, check :

### Node.js
> node -v or install -g
### Npm
> npm -v or install -g
### Gulp
> gulp -v or install

## For start project :
> Clone this repository
### In the console run next command:
> npm install

> npm run build:dev    # for developing
  + Compile all files, not min., reload pages.

> npm run build        # for production
  + Minimize index.html, spp.js, style.css.

### Structure

[doc structure sass](https://sass-guidelin.es/ru/#section-44);

+ **dest**
+ **src**
  + **images/**(just now => without sprites task)
  + **pug/**
    + **layout/**                            # include some sections like sass (header, footer, main, ...);
      - header.pug;
    + **index.pug**                          # root file for compile;
  + **sass/**
    + **base/**
      + _base.scss(test styles)              # base styles;  
      + _reset.scss(empty)                   # normalize/reset rules;
      + _typography.scss(test)               # typography rules;
      + ...                                  # etc;
    + **components/**
      + _buttons.scss(empty)                 # styles for buttons;
      + _carousel.scss(empty)                # if use carousel => styles;
      + _navigation.scss(empty)              # for some nav.;
      + ...                                  # etc;
    + **helpers/**
      + _functions.scss(empty)               # Sass functions;
      + _mixins.scss(test/responsive)        # Sass mixins;
      + _variables.scss(empty)               # Sass variables;
      + ...                                  # etc;
    + **layout/**
      + _header(test)                        # header;
      + ...                                  # etc;
    + **pages/**
      + _home.scss(empty)                    # home specific styles;
      + ...                                  # etc;
    + ...
    + **style.scss**                         # root file;
  + **scripts/**
    + **dest/**
      - files for production
    + **dev/**
      - files for developer **!important**

## Rules for linters:

> **Sass: gulp-sass-linter**

+ **sass-linter**  rules: 4 spaces if 2 just be error;
+ **!important: do not added all rules**
+ [Link to sass-linter rules list](https://github.com/sasstools/sass-lint/blob/develop/lib/config/sass-lint.yml);
+ [For good code](https://github.com/brigade/scss-lint/blob/master/lib/scss_lint/linter/README.md#bangformat);
+ [Or docs](https://www.npmjs.com/package/gulp-sass-lint);

> **JS: gulp-eslint**

+ **eslint** use: Airbnb => all rules in root .eslintrc.js file;
+ **parser options** use: JSX format, (source type: module ??);
+ **plugins** use: react;
+ **rules:** 
  - **"space-infix-ops": 0** : a=1 true, a= 1 true, a = 1 ||**Question, better: a = 1 true, a=1 false, a= 1 false ?**;
  - **"indent"** : 2 spaces else => error!;
  - **"linebreak-style":0,** : Windows friendly;
  - **"quotes"** : single, if double => false
    - [Documentation about quotes](https://eslint.org/docs/rules/quotes)
+ [Documentation gulp-eslint](https://www.npmjs.com/package/gulp-eslint);
+ [Rules](https://eslint.org/docs/rules/)

> **PUG: gulp-pug-linter**

+ **rules**: without custom rules, just now;
+ [Documentstion](https://www.npmjs.com/search?q=+gulp-pug-linter);

### All modules:

+ **Js, Babel**:
  - babel-cli;
  - babel-preset-env;
  - gulp-babel;
  - gulp-eslint => include config submodules;
  - gulp-uglyfly;
  - gulp-concat;
+ **PUG**:
  - gulp-pug;
  - gulp-pug-linter;
+ **Sass**:
  - gulp-sass;
  - gulp-sass-lint;
+ **Else**:
  - "git-scripts";
  - "gulp";
  - "gulp-autoprefixer";
  - "gulp-clean";
  - "gulp-htmlmin";
  - "gulp-noop";
  - "gulp-rename";
  - "gulp-sequence";
  - "gulp-uglyfly";
  - "gulp-watch";
  - "gulp-webserver";
  - "pre-commit";
  - "win-node-env";
## Team

- Roman Markhevka markhevkaroman@gmail.com
- John John john@john.com
- Alex Alex alex@alex.com
- Volodya Medvid volodya@medvid.com

## Development setup & configuration
## Production setup & configuration