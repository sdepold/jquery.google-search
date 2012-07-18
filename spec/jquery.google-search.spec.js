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
          console.log(row)
          expect(row.content.toLowerCase().indexOf('foo')).not.toEqual(-1)
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
