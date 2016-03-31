(function ($) {
    $.fn.extend({
        centerQueryPlan: function() {
            var $parent = this;
            var $rootElement = this.find(".query-plan-root:first .tree-branch > .tree-node").first();
            var newLeft = $parent.scrollLeft() + $rootElement.position().left - $parent.width() / 2 + $rootElement.width() / 2;
            $parent.scrollLeft(newLeft);
        }
    });

    $.fn.extend({
        addQueryPlanZoom: function() {
          $(this).append("<input type=\"range\" orient=\"vertical\" class=\"query-plan-zoom\" max=\"100\" min=\"25\" value=\"100\" step=\"5\" style=\"position:absolute;top:10px;left:10px; writing-mode: bt-lr;-webkit-appearance: slider-vertical; width: 8px;height: 175px;\" />");
          $(this).find(".tree").css("margin-left", '50px');
          $(this).scroll(function(e) {
            $(".query-plan-zoom").css('left', $(this).scrollLeft() + 10);
          });
          $(this).on('change', "input.query-plan-zoom", function (e) {
            var zoom = $(this).val();
            var mozZoom = zoom / 100;

            var zoomCss = { 'zoom': zoom};

            // Replace with transform, if supported
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
