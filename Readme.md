## General purpose tools and customizations for delite/deliteful

### Resources and themes
 
 1. Currently too hardcoded in delite/deliteful, solved by a requirejs.load hook and a variable mixin

### Handlebar templates

 1. Same as CSS/Themes: resolved by a requirejs.load hook and a variable mixin

### Widgets

 1. Delite/Deliteful is currently lacking of an API for enumerating and managing widgets, since there is no equivalent 
 for dijit/registry. 
 
 
 2. Widget base class is still too simple, missing support for suspend/resume in regard of widget caching, and event
 subscriptions go through addListener for native events, and uses Widget#on for non-HTML events.  
