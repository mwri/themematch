# themematch [![Build Status](https://travis-ci.org/mwri/themematch.svg?branch=master)](https://travis-ci.org/mwri/themematch) [![Coverage Status](https://coveralls.io/repos/github/mwri/themematch/badge.svg?branch=master)](https://coveralls.io/github/mwri/themematch?branch=master)


ThemeMatch chooses from available themes for GUI sub components in order
to best match the main/container theme.

For example, imagine a web app with various user selectable themes has
various plugins, supplied with their own themes... in order to look sane
each selection of a theme for the web app must accompany selection of
compatible themes for each plugin. Plugin authors may provide themes to
match the web app, but if web app has 30 themes, they might not, and
additional themes may be added to the web app over time.

For example, if the core web app may implements these themes:

* A **dark** theme with a blackish background and white features.
* A **light**, a more traditional theme, black on white.
* A light and airy greeny blue **ocean** theme.
* A rich, darker, **sunset** theme, red on yellow.

If a plugin implements just basic light and dark themes then one of
these must be chosen for each of the above. In this case the right
decision is for the widget's light theme to be used with the container
light or ocean themes, and the dark theme with the container dark or
sunset themes, and ThemeMatch helps to make this easy.

**NOTE** that ThemeMatch doesn't actually provide functionality actually
relating to GUIs at all, it just manages the data and logic. If you
want a more complete solution, use
[jquery.themeselect](https://github.com/mwri/jquery.themeselect), which
uses ThemeMatch to provide a complete solution for managing plugins
CSS choices and dynamically switching themes, loading and unloading CSS for
the core and all plugins for you.

## Worked example

In order to work, ThemeMatch must know about the themes available, this
example introduces four themes (the same four mentioned above, and they
are used in the tests too):

Name | Description
:-- | :--
dark | Black (ish) background with white (ish) features.
light | A more traditional black on white background.
ocean | A light and airy green on green blue.
sunset  | A muddier red on yellow.

Create the ThemeMatch object:

```
let tm = new themematch();
```

Tell it about the four available themes:

```
tm.add_theme({ name: 'dark', backgrounds: [ '#000000' ], foregrounds: [ '#ffffff' ] });
tm.add_theme({ name: 'light', backgrounds: [ '#ffffff' ], foregrounds: [ '#000000' ] });
tm.add_theme({ name: 'sunset', backgrounds: [ '#ffffaa' ], foregrounds: [ '#990000' ] });
tm.add_theme({ name: 'ocean', backgrounds: [ '#aaffdd' ], foregrounds: [ '#006600' ] });
```

Tell it about the two sub components/widgets/plugins:

```
let sidebar_tm = tm.add_sub({
    name: 'sidebar',
    themes: [
        { name: 'sb_normal', backgrounds: [ '#dddddd' ], foregrounds: [ '#333333' ] },
        { name: 'sb_inverse', backgrounds: [ '#333333' ], foregrounds: [ '#eeeeee' ] },
        { name: 'sb_muddy', backgrounds: [ '#eeeeee' ], foregrounds: [ '#991111' ] },
    ],
});
let feature_tm = tm.add_sub({
    name: 'feature',
    themes: [
        { name: 'f_dark', backgrounds: [ '#222222' ], foregrounds: [ '#dddddd' ] },
        { name: 'f_light', backgrounds: [ '#dddddd' ], foregrounds: [ '#222222' ] },
        { name: 'f_muddy', backgrounds: [ '#aaeebb' ], foregrounds: [ '#992200' ] },
        { name: 'f_watery', backgrounds: [ '#99eecc' ], foregrounds: [ '#227744' ] },
    ],
});
```

You can also combine all the above by providing `themes` and `subs`
parameters to the constructor, for example:

```
let tm = new themematch({
    themes: [
        { name: 'dark', backgrounds: [ '#000000' ], foregrounds: [ '#ffffff' ] },
        { name: 'light', backgrounds: [ '#ffffff' ], foregrounds: [ '#000000' ] },
        { name: 'sunset', backgrounds: [ '#ffffaa' ], foregrounds: [ '#990000' ] },
        { name: 'ocean', backgrounds: [ '#aaffdd' ], foregrounds: [ '#006600' ] },
    ],
    subs: [
        { name: 'sidebar',
            themes: [
                { name: 'sb_normal', backgrounds: [ '#dddddd' ], foregrounds: [ '#333333' ] },
                { name: 'sb_inverse', backgrounds: [ '#333333' ], foregrounds: [ '#eeeeee' ] },
                { name: 'sb_muddy', backgrounds: [ '#eeee66' ], foregrounds: [ '#991111' ] },
            ] },
        { name: 'feature',
            themes: [
                { name: 'f_dark', backgrounds: [ '#222222' ], foregrounds: [ '#dddddd' ] },
                { name: 'f_light', backgrounds: [ '#dddddd' ], foregrounds: [ '#222222' ] },
                { name: 'f_muddy', backgrounds: [ '#aaeebb' ], foregrounds: [ '#992200' ] },
                { name: 'f_watery', backgrounds: [ '#99eecc' ], foregrounds: [ '#227744' ] },
            ] },
    ],
});
```

Now, select any of the root themes and a list of themes will be returned, one
theme for each sub component/widget/plugin, hopefully the best choice in each
case:

```
let dark_themes = tm.select('dark');
```

The value of `dark_themes` is then:

```
[ { name: 'dark',
    backgrounds: [ '#000000' ],
    foregrounds: [ '#ffffff' ] },
  { name: 'sb_inverse',
    backgrounds: [ '#333333' ],
    foregrounds: [ '#eeeeee' ] },
  { name: 'f_dark',
    backgrounds: [ '#222222' ],
    foregrounds: [ '#dddddd' ] } ]
```

Selecting the 'light' theme collects the lighest themes:

```
tm.select('light');
```

Return value:

```
[ { name: 'light',
    backgrounds: [ '#ffffff' ],
    foregrounds: [ '#000000' ] },
  { name: 'sb_normal',
    backgrounds: [ '#dddddd' ],
    foregrounds: [ '#333333' ] },
  { name: 'f_light',
    backgrounds: [ '#dddddd' ],
    foregrounds: [ '#222222' ] } ]
```

Selecting the 'sunset' theme it is less completely obvious what
the solution is, but the 'sb_muddy' and 'f_muddy' themes turn out
to be the best match on balance because of their quite red foregrounds:

```
tm.select('sunset');
```

Return value:

```
[ { name: 'sunset',
    backgrounds: [ '#ffffaa' ],
    foregrounds: [ '#990000' ] },
  { name: 'sb_muddy',
    backgrounds: [ '#eeeeee' ],
    foregrounds: [ '#991111' ] },
  { name: 'f_muddy',
    backgrounds: [ '#aaeebb' ],
    foregrounds: [ '#992200' ] } ]
```

Selecting the 'ocean' theme, again not completely obvious what
the soltion should be, but it is very light so 'sb_normal' is
selected for the sidebar, for lack of anything better, and 'f_watery'
for 'feature', the green and blue influences making a better match
than 'f_light':

```
tm.select('ocean');
```

Return value:

```
[ { name: 'ocean',
    backgrounds: [ '#aaffdd' ],
    foregrounds: [ '#006600' ] },
  { name: 'sb_normal',
    backgrounds: [ '#dddddd' ],
    foregrounds: [ '#333333' ] },
  { name: 'f_watery',
    backgrounds: [ '#99eecc' ],
    foregrounds: [ '#227744' ] } ]
```

## Multiple colour themes

Notice that `backgrounds` and `foregrounds` is always a list. Multiple
colours may be specified, and their significance will be weighted by
their order.

If you provide two colours for example, the first will be weighted
with a 67% importance, and the second with a 33% importance. If three
colours are given, then they are given 50%, 33% and 17% weightings.
Any number may be used but the significance of the latter colours
quickly becomes quite marginal.

## Colour specification

All the examples above use 6 digit hex colour codes, but three
digit hex abbreviations (e.g. #12A) and most CSS notation is supported
including percentages, RGBa and HSLa specifications, and colour names.

## ES5, ES6 and minification

The `dist` folder has the following files available:

File | Description
:-- | :--
themematch.js | Limited ES6 features (works with Node.js v4+ and most browsers)
themematch_es5.js | ES5 translation (should work with anything)
themematch_es5.min.js | Minified ES5 translation
