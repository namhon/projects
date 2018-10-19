# feedreader testing -

## Table of Contents
- how to test
- files
- contributing

## how to test:
1. check allfeeds defined properly and not empty
    - try to test after modifying the feeds from app.js
    - change any url to ''; from allFeeds in app.js

2. check each feed has URL defined and not empty
    - try to test after modifying the feeds from app.js
    - change any url to ''; from allFeeds in app.js

3. check each feed has name defined and not empty
    - try to test after modifying the feeds from app.js
    - change any name to ''; from allFeeds in app.js

4. check menu is hidden by default
    - try to test with displaying menu from the beginning
    - test after having below codes to the 'it' function of 'menu hidden by default' at feedreader.js
            const menu_list = document.querySelector('.menu-icon-link');
            menu_list.click();

5. check menu is shown/hidden by click
    - test after comment out the menu_list.click() from it function

6. check loadfeed works properly
    - check after set the feed = '';

7. check loadfeed update the new feed properly
    - check it from console.log of the two contents feeds

## files:
- feedreader.js: jasmine spec file
- app.js: javascript file
- index.html: html file 
- style.css: css file

## contributing
Hon Nam