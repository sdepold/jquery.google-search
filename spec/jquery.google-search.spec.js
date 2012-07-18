buster.testRunner.timeout = 3000
buster.spec.expose()

describe('jquery.google-search', function() {
  describe('search', function() {
    before(function() {
      this.googleSearch = new $.GoogleSearch()
    })

    after(function() {
      this.googleSearch.cleanUp()
    })

    it("returns only results with content", function(done) {
      this.googleSearch.search('foo', {}, function(data) {
        data.forEach(function(row) {
          expect($.trim(row.content)).not.toEqual("")
        })

        done()
      })
    })

    it("returns results which have the searched keyword included", function(done) {
      this.googleSearch.search('foo', {}, function(data) {
        data.forEach(function(row) {
          var hasFooInTitle = (row.title.toLowerCase().indexOf('foo') !== -1)
            , hasFooInContent = (row.content.toLowerCase().indexOf('foo') !== -1)

          expect(hasFooInTitle || hasFooInContent).toBeTrue()
        })

        done()
      })
    })
  })

  describe('cleanUp', function() {
    beforeAll(function() {
      this.googleSearch = new $.GoogleSearch()
    })

    it("cleans up the DOM", function() {
      this.googleSearch.cleanUp()
      expect($('body > *').length).toEqual(0)
    })
  })
})
