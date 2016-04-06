(function ($) {
    $.fn.extend({
        centerQueryPlan: function() {
            var $parent = this;
            var $rootElement = this.find('.query-plan-root:first .tree-branch > .tree-node').first();
            var newLeft = $parent.scrollLeft() + $rootElement.position().left - $parent.width() / 2 + $rootElement.width() / 2;
            $parent.scrollLeft(newLeft);
            return this;
        }
    });

    $.fn.extend({
        makeFooterClickable: function() {
            var $parent = this;
            var $rootElement = this.find('.query-plan-root:first .tree-branch > .tree-node').first();
            var newLeft = $parent.scrollLeft() + $rootElement.position().left - $parent.width() / 2 + $rootElement.width() / 2;
            $parent.scrollLeft(newLeft);
            return this;
        }
    });

    $.fn.extend({
        addQueryPlanZoom: function() {
          // add the scroll control and add room for in the tree
          $(this).append('<input type=\"range\" orient=\"vertical\" class=\"query-plan-zoom\" max=\"100\" min=\"25\" value=\"100\" step=\"5\" style=\"position:absolute;top:10px;left:10px; writing-mode: bt-lr;-webkit-appearance: slider-vertical; width: 8px;height: 175px;\" />');
          $(this).find('.tree').css('margin-left', '50px');

          // add an event to keep the scroll control somewhat visible
          $(this).scroll(function(e) {
            $('.query-plan-zoom').css('left', $(this).scrollLeft() + 10);
          });

          // add an event to watch for the query plan range control to change and zoom appropriately
          $(this).on('change', 'input.query-plan-zoom', function (e) {
            var zoom = $(this).val();
            var mozZoom = zoom / 100;

            var zoomCss = { 'zoom': zoom};

            if('transform' in document.body.style)
            {
                zoomCss = {
                  'transform': 'scale(' + mozZoom + ')',
                  'transform-origin': 'left top'
                };
            }

            $(e.delegateTarget).find('.query-plan-root').css(zoomCss);
            return this;
          });
        }
    });
})(jQuery);
