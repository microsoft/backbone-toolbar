define([
  'sinon',
  'should',
  'component/grid-toolbar/filterInput',
],
function(sinon, should, FilterInput) {
  'use strict';
  describe('GridToolbar-FilterInput', function() {
    var filterInput;

    function click(filterInput) {
      filterInput.$el.find('button').trigger('click');
    }

    beforeEach(function() {
      filterInput = new FilterInput({placeholder: "Hello World"});
      filterInput.render();
    });

    it('onDidApply is OK', function() {
      var onApply = sinon.spy();
      filterInput.on('change', onApply);
      click(filterInput);
      onApply.should.have.been.called;
    });
  });
});
