# Votest App (Web)
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
      + _buttons.scss(emoty)                 # styles for buttons;
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

## Team

- John John john@john.com
- Alex Alex alex@alex.com
- Volodya Medvid volodya@medvid.com

## Development setup & configuration
## Production setup & configuration