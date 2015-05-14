## Notice

this is all using a fork of delite and deliteful 

https://github.com/mc007/delite
https://github.com/mc007/deliteful


## Goals for themes

##Multi-theme support: 90% done

The following modifications have been done:

1. All CSS classes in xdelite/themes/superhero (Reference theme) are prefixed with .@{themeName} which is defined in 
xdelite/themes/superhero
2. All LESS files have been flatted for simple and short paths
3. All dependencies of the superhero theme are in the xdelite/superhero folder now. Please don't reference files
   outside this folder.
4. All require-js css urls in deliteful/widgets have been modified for always the same pattern: 
    
        "delite/theme!{{themeRoot}}/{{theme}}/Button/Button.css"

4. delite/Scrollable/themes/* is no longer needed
5. delite/themes/* is no longer needed

Todo's:

1. as the theme path pattern is now always the same, it makes sense to change it from: 
    
        "delite/theme!{{themeRoot}}/{{theme}}/Button/Button.css"
to
 
        "delite/theme!{{themeRoot}}/{{theme}}/{{Widget}}/{{Widget}}.css"

I have currently no solution to remove this require since delite/register isn't not working async. Because this 
string belongs into the widget's properties and also to support other build tasks than delite/delitful's build-system.


3. Port the original bootstrap theme the same way, just as reference. 
 
Remarks:

1. The sample files in deliteful/samples are working with this theme but 'superhero' had to be added to the body's class.
2. delite/theme & delite/register has been patched to resolve themeRoot.


## CSS prefixing/class-names for widgets

[Link to issue](https://github.com/ibm-js/deliteful/issues/525#issuecomment-76394688)
[Other](http://tkrugg.github.io/bootstrap-deliteful/compiled/all-Button.html)

As described in the issue, you have to patch delite/register for changing baseClass:'d-button' to 'btn' to get other
stock-themes working without bigger efforts. But as all sample files have to remain intact, another solution is required
for d-button-warning. See below and ticket.

## Boostrap specifics
