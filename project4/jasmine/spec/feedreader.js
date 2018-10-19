// feedreader.js

$(function() {
    describe('RSS Feeds', function(){
        //check allFeeds variable has been defined and not empty.
        it('are defined', function(){
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // check each feed in the allFeeds has a URL defined and not empty
        it('each feed URL defined', function(){
            for(let feed of allFeeds){
                //console.log(feed);
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            };
        });

        // check each feed in the allFeeds has a name defined and not empty
        it('each feed name defined', function(){
            for(let feed of allFeeds){
                //console.log(feed);
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            };
        });
    });

    describe('The menu', function() {
        // check menu element is hidden by default. 
        it('menu hidden by default', function(){
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        })

        // check menu changes when the menu icon is clicked (vice versa)
         it('menu display changes by click', function(){
            const body = document.querySelector('body');
            const menu_list = document.querySelector('.menu-icon-link');
            menu_list.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu_list.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });
    });
        
    describe('Initial Entries', function(){
        // check loadFeed works properly with at least a single .entry element within the .feed container.
        // Remember, loadFeed() is asynchronous so this test will require the use of Jasmine's beforeEach and asynchronous done() function.
        beforeEach((done) => {
            loadFeed(0, done);
            //done();
        });

        it('loadFeed works properly', () => {
            const feed = document.querySelector('.feed');
            console.log(feed.children.length);
            expect(feed.children.length > 0).toBe(true);
        });
    });

    describe('New Feed Selection', function(){
        // check when a new feed is loaded by the loadFeed function that the content actually changes.
        // compare feed_0 and feed_1 and check contents are same or not
        beforeEach((done) => {
            loadFeed(0);
            loadFeed(1, done);
            //done();
        });

        it('content changes', function(){
            const feed = document.querySelector('.feed');
            //console.log(feed.children[0].innerText);
            //console.log(feed.children[1].innerText);
            expect(feed.children[0].innerText === feed.children[1].innerText).toBe(false);
        })
    });
}());
