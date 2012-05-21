buster.spec.expose()

describe('jquery.google-search', function() {
  before(function() {
    this.element = jQuery('<div>').appendTo(jQuery('body'))
  })

  it('prints "google-search"', function() {
    this.element.googleSearch()
    expect(this.element.text()).toEqual('google-search')
  })
})
