define([
  'sinon',
  'should',
  'component/grid-toolbar/dropdown',
  'component/grid-toolbar/buttonMenuItem'
],
function(sinon, should, Dropdown, ButtonMenuItem) {
  'use strict';
  describe('GridToolbar-dropdownbutton', function() {
    var item1, item2, button;

    // trigger the el's click event.
    function click(btn) {
      btn.$el.trigger('click');
    }

    // trigger the secondary element's click event.
    function clickSecondary(btn) {
      btn.$el.find('.secondary').trigger('click');
    }

    beforeEach(function() {
      item1 = new ButtonMenuItem({title: "hello", linkText: "remove"});
      item2 = new ButtonMenuItem({title: "world"});
      button = new Dropdown({
        title: "test",
        menuItems: [item1, item2]
      });
      button.render();
    });

    it('onDidClickMenuItem is normal', function() {
      var onClick = sinon.spy();
      button.on('click:item', onClick);
      click(item1);
      onClick.should.have.been.called;

      onClick.reset();
      click(item2);
      onClick.should.have.been.called;
    });

    it('onDidClickMenuItemSecondary', function() {
      var onClick = sinon.spy();
      button.on('click:link', onClick);
      clickSecondary(item1);
      onClick.should.have.been.called;
    });
  });
});
