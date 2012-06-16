jquery.google-search
====================

Execute google searches within your client-side javascript.

## Motivation

Did you ever take a look at Google's great AJAX search API and did you find out, that
they are deprecated and limited in the count of allowed daily requests? Have you
probably been thinking about using the praised *Custom Search API* ? If so, you might
also have found out, that you are only allowed to execute 100 requests per day
without paying money. Going on with research you finally thought about using Bing's awesome (no joke, it's well done !) search API but noticed that their indexing algorithm is slow and crappy? If so, you made the same journey as me.

## Solution

This jQuery plugin utilizes Google's API and is silently rendering a real search dialog into the page using the so-called [google.search.SearchControl](https://developers.google.com/web-search/docs/#The_Basics). You won't notice that. After rendering this thing, the plugin parses the rendered HTML and transforming it into an array of objects, deleting the rendered HTML and returning the objects to you.

## Data centric mode

If you basically interested in getting the data, you can use $.GoogleSearch. Doing so
won't render any HTML to your page but passes the search results to a specified callback. This is how it looks like:

    new $.GoogleSearch().search('search-term', {}, function(data) {
      // just executed a search for the query "search-term"
      console.log(data)
    })

The first parameter is the word / query string you want to search. The second
parameter is an object which is added to the query. Using it, will e.g. allow
you to search on specific pages only:

    new $.GoogleSearch().search('search-term', {
      site: 'depold.com'
    }, function(data) {
      // just executed a search for the query "search-term site:depold.com"
      console.log(data)
    })

## View centric mode

## License

Hereby placed under MIT license.

