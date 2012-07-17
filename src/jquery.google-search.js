(function($) {

  //////////////////////////
  // view centric methods //
  //////////////////////////

  $.fn.googleSearch = function() {
    $(this).text('google-search')
  }

  //////////////////////////
  // data centric methods //
  //////////////////////////

  $.GoogleSearch = function() {
    this.target = $('body')
  }

  $.GoogleSearch.libsLoaded = false

  $.GoogleSearch.prototype.search = function(queryString, options, callback) {
    var self = this

    waitForGoogleLibs.call(this, function() {
      var query   = buildQueryString.call(self, queryString, options)
        , objects = []

      renderSearch.call(self, query, function(renderedResults) {
        renderedResults.each(function() {
          objects.push(extractDataFromResultEntry($(this)))
        })

        callback && callback(objects)
      })
    })
  }

  $.GoogleSearch.prototype.cleanUp = function() {
    getSearchContainer.call(this).remove()
    $('.gstl_0.gssb_c').remove()
    $('#private_metadata.gsc-snippet-metadata').parent().remove()
  }

  /////////////
  // private //
  /////////////

  var waitForGoogleLibs = function(callback) {
    var interval = setInterval(function() {
      if ($.GoogleSearch.libsLoaded) {
        clearInterval(interval)
        callback && callback()
      }
    }, 100)
  }

  var extractDataFromResultEntry = function($entry) {
    return {
      title: $($('a.gs-title', $entry).get(0)).text(),
      url: $($('a.gs-title', $entry).get(0)).attr('href'),
      description: $('div.gs-bidi-start-align.gs-snippet', $entry).text()
    }
  }

  var buildQueryString = function(queryString, options) {
    var query = [ queryString ]

    for(var key in (options || {})) {
      query.push(key + ':' + options[key])
    }

    return query.join(" ")
  }

  var renderSearch = function(queryString, callback) {
    getSearchControl.call(this).execute(queryString)

    var intervalId = setInterval(function() {
      var renderedResults = $('.gs-webResult')
        , objects         = []

      if(renderedResults.length > 0) {
        clearInterval(intervalId)
        callback && callback(renderedResults)
      }
    }, 250)
  }

  var getSearchControl = function() {
    if(!this.searchControl) {
      this.searchControl = new google.search.SearchControl()
      this.searchControl.addSearcher(new google.search.WebSearch())
      this.searchControl.draw(getSearchContainer.call(this).get(0))
    }

    return this.searchControl
  }

  var getSearchContainer = function() {
    if(!this.element) {

      this.element = $('<div>')
        .attr('id', 'search-results' + parseInt(Math.random() * 999999999))
        .css('display', 'none')

      this.target.append(this.element)
    }

    return this.element
  }

  var loadGoogleLibs = function(callback) {
    $.getScript('https://www.google.com/jsapi').success(function() {
      google.load('search', '1', { callback: callback })
    })
  }

  loadGoogleLibs(function() {
    $.GoogleSearch.libsLoaded = true
  })
})(jQuery)
