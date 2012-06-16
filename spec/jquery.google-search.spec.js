buster.testRunner.timeout = 10000
buster.spec.expose()

describe('jquery.google-search', function() {


  describe('search', function() {
    beforeAll(function() {
      this.googleSearch = new $.GoogleSearch()
    })

    it("returns results which have the searched keyword included", function(done) {
      console.log('fix empty result row')

      this.googleSearch.search('foo', {}, function(data) {
        data.forEach(function(row) {
          if((row.url !== undefined) && (row.url !== 'undefined')) {
            expect(row.description.toLowerCase().indexOf('foo')).not.toEqual(-1)
          }
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
