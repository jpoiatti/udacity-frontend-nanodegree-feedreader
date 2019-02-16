/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds array (made of objects) and 
         * ensures each object has an URL defined
         * and the URL is not empty.
         */
        it('URLs are defined and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toContain('http://');
            }
        });


        /* This test loops through each feed
         * in the allFeeds array and ensures each
         * object has a name defined and the name 
         * is not empty.
         */
        it('names are defined and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(typeof feed.name).toBe('string');
                expect(feed.name).not.toBe('');
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', () => {
        /* This test ensures that the menu element is
         * hidden by default. Both HTML and
         * the CSS are analyzed to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', () => {
            // 'menu-hidden' is responsible for hidding the
            // menu when it's present in 'body' element,
            // therefore if body has this class, the menu
            // is hidden.
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon link is clicked. 
          * This test has two expectations: does the menu display 
          * when clicked and does it hide when clicked again.
          */ 
        it('changes visibility when clicked', () => {
            $('.menu-icon-link').trigger('click');
            // After clicking the menu icon link, expects the class
            // 'menu-hidden' to NOT be present in 'body' element.
            expect($('body').hasClass('menu-hidden')).toBe(false); 
            $('.menu-icon-link').trigger('click');
            // After clicking the menu icon link again, expects the
            // class 'menu-hidden' to be present in 'body' element.
            expect($('body').hasClass('menu-hidden')).toBe(true); 
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* Calls loadFeed with argument 0 to load 
         * the first feed (element 0 of array allFeeds).
         * Uses 'done' as the second (and callback) argument because
         * the loadFeed function is asynchronous, thefore
         * ensures it waits until feed 0 has been loaded 
         * to only then proceed with the tests defined in 'it'.
         */
        beforeEach((done) => {
            loadFeed(0, done);
        });
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * As the loadFeed() is asynchronous, this test uses
         * Jasmine's beforeEach and done() function
         * in the call of loadFeed above.
         */
        it('have at least a single .entry element within .feed container', (done) => {
            // Checks if .feed exists, it is defined and not null.
            expect($('.feed')).toExist();
            expect($('.feed .entry')).toBeDefined();
            expect($('.feed .entry')).not.toBe(null);

            // Checks if length of '.feed .entry' (which selects all 
            // <article> tags with class 'entry') is greater than zero,
            // meaning that .entry has at least one article.entry.
            expect($('.feed .entry').length).toBeGreaterThan(0);

            // As it was signalized to the beforeEach block above that it 
            // should work asynchronously, the 'done()' function 
            // is called here to resolve the promise made under the 
            // hood with beforeEach working asynchronously.
            done();
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        // Variables declarations
        let feed0FirstURL,
            feed1FirstURL,
            feed0FirstTitle,
            feed1FirstTitle;
        
        beforeEach((done) => {
            /* Calls loadFeed function with parameters '0' and 
             * a function. The '0' parameter instructs to load the
             * first feed (element index 0 from allFeeds array). 
             */
            loadFeed(0, () => {
                // Gets the feed's first element URL and 
                // stores it in feed0FirstURL variable.
                feed0FirstURL = $('body > div.feed > a:nth-child(1)')[0].href;

                // Gets the feed's first element title and 
                // stores it in feed0FirstTitle variable.
                feed0FirstTitle = $('h1.header-title')[0].innerText;
            });

            /* The same as the call of loadFeed above, but 
             * using the second feed (element index 1 from allFeeds 
             * array).
             */
            loadFeed(1, () => {
                feed1FirstURL = $('body > div.feed > a:nth-child(1)')[0].href;
                feed1FirstTitle = $('h1.header-title')[0].innerText;
                done();
            });
            
        });
        
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('updates the content when a new feed is selected', (done) => {
            // Tests if the feeds' first titles and URLs are defined.
            expect(feed0FirstTitle).toBeDefined();
            expect(feed0FirstURL).toBeDefined();
            expect(feed1FirstTitle).toBeDefined();
            expect(feed1FirstURL).toBeDefined();

            // Tests if the feeds' first titles and URLs are not null.
            expect(feed0FirstTitle).not.toBe(null);
            expect(feed0FirstURL).not.toBe(null);
            expect(feed1FirstTitle).not.toBe(null);
            expect(feed1FirstURL).not.toBe(null);

            // Tests if feed0 first URL is different from
            // feed1 first URL.
            expect(feed0FirstURL).not.toBe(feed1FirstURL);

            // Tests if feed0 first entry title is different from
            // feed1 first entry title.
            expect(feed0FirstTitle).not.toBe(feed1FirstTitle);

            // The 'done()' function is called here to resolve
            // the promise made under the hood with beforeEach
            // working asynchronously.
            done();
        });
    });
}());