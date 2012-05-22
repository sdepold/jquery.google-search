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
    this.element = $('<div>')
      .attr('id', 'search-results' + parseInt(Math.random() * 999999999))
      .css('display', 'none')
      .appendTo($('body'))
  }

  $.GoogleSearch.prototype.search = function(queryString, options, callback) {
    var self = this

    waitForGoogleLibs.call(this, function() {
      var query   = buildQueryString.call(self, queryString, options)
        , objects = []

      renderSearch.call(self, query, function(renderedResults) {
        renderedResults.each(function() {
          objects.push(extractDataFromResultEntry($(this)))
        })

        cleanupHTML.call(self)
        callback && callback(objects)
      })
    })
  }

  /////////////
  // private //
  /////////////

  var waitForGoogleLibs = function(callback) {
    var interval = setInterval(function() {
      if((typeof google !== 'undefined') && (typeof google.search !== 'undefined')) {
        clearInterval(interval)
        callback && callback()
      }
    }, 250)
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
    var searchControl = new google.search.SearchControl()

    searchControl.addSearcher(new google.search.WebSearch())
    searchControl.draw(this.element.get(0))
    searchControl.execute(queryString)

    var intervalId = setInterval(function() {
      var renderedResults = $('.gs-webResult')
        , objects         = []

      if(renderedResults.length > 0) {
        clearInterval(intervalId)
        callback && callback(renderedResults)
      }
    }, 250)
  }

  var cleanupHTML = function() {
    this.element.remove()
    $('.gstl_0 gssb_c').remove()
  }
})(jQuery)

// init google API lib + load search lib
document.write('<script src="https://www.google.com/jsapi" type="text/javascript"></script>')
document.write('<script type="text/javascript">')
document.write("google.load('search', '1', { nocss: true, nooldnames: true, language: 'de' })")
document.write("</script>")
