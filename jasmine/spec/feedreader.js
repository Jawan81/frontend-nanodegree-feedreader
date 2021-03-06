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
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toEqual(0);
        });

        /*
         * This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should be ensured that all feeds have a valid URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed).toBeDefined();
                expect(feed.url).toBeDefined();
                expect(feed.url).toEqual(jasmine.any(String));
                expect(feed.url.length).toBeGreaterThan(0);
                // additionally check if it's a valid URL
                expect(isURL(feed.url)).toEqual(true);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should be ensured that all feeds have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed).toBeDefined();
                expect(feed.name).toBeDefined();
                expect(feed.name).toEqual(jasmine.any(String));
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });

    /*
     * Tests the menu.
     */
    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default by checking if the .menu-hidden CSS
         * class is set for the body element.
         */
        it('should hide the menu by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again. Again the
          * .menu-hidden CSS class of the body element is checked
          * before and after a click on the menu icon.
          */
        it('should toggle the menu when the menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            var body = $('body');
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toEqual(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toEqual(true);
        });
    });

    /*
     * Tests the initial RSS feed entries
     */
    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * As loadFeed() is asynchronous this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            // tell loadFeed to load the feeds with index 0.
            loadFeed(0, function() {
                done();
            });
        });

        it('should show at least one feed', function(done) {
            // check that there is at least one entry
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /*
     * This suite tests the selection of new feeds.
     */
     describe('New Feed Selection', function() {
         var contentFeed0 = '';

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * We again use Jasmine's async done() function as loadFeed() runs asynchronously.
         */
         beforeEach(function(done) {
             // load feeds with index 0
             loadFeed(0, function() {
                 // store resulting feeds of index 0 and load feeds with index 1
                 contentFeed0 = $('.feed').html();
                 loadFeed(1, function () {
                     done();
                 });
             });
         });

         it('should change the feed content', function(done) {
             // check that the content has changed
             var contentFeed1 = $('.feed').html();
             expect(contentFeed1).not.toEqual(contentFeed0);
             done();
         });
    });


    /**
     * ADDITIONAL TESTS
     */

    /*
     * This suite tests for loading feeds from an external API instead
     * of using the static allFeeds variable.
     *
     * NOTE: As long the allFeeds variable is loaded statically these tests might contradict other
     * test suites in this file. If this feature is implemented other tests must be adapted
     * accordingly.
     */
    describe('RSS Feed API', function() {
        /*
         * Check the allFeeds variable is empty after loading.
         */
        it('allFeeds are defined and empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toEqual(0);
        });

        /*
         * Check that an API endpoint is defined.
         */
        it('feed API endpoint is defined', function() {
            expect(feedApiEndpoinnt).toBeDefined();
            expect(isURL(feedApiEndpoinnt)).toEqual(true);
        });

        /*
         * We expect the loadAllFeeds() function to run asynchronously.
         */
        beforeEach(function(done) {
            loadAllFeeds(function() {
                done();
            })
        });

        /*
         * After loading the feeds from an API the allFeeds array should be filled.
         */
        it('should load feeds from an API', function(done) {
            expect(allFeeds.length).toBeGreaterThan(0);
            done();
        });

        /*
         * This test loops through each feed
         * in the allFeeds object and ensures it has a valid URL defined
         * and that the URL is not empty.
         */
        it('should be ensured that all feeds have a valid URL', function(done) {
            allFeeds.forEach(function(feed) {
                expect(feed).toBeDefined();
                expect(feed.url).toBeDefined();
                expect(feed.url).toEqual(jasmine.any(String));
                expect(feed.url.length).toBeGreaterThan(0);
                // additionally check if it's a valid URL
                expect(isURL(feed.url)).toEqual(true);
            });

            done();
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should be ensured that all feeds have a name', function(done) {
            allFeeds.forEach(function(feed) {
                expect(feed).toBeDefined();
                expect(feed.name).toBeDefined();
                expect(feed.name).toEqual(jasmine.any(String));
                expect(feed.name.length).toBeGreaterThan(0);
            });
            done();
        });
    });
}());
