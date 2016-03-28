(function ($) {
    $.fn.extend({
        centerQueryPlan: function() {
            var $parent = this;
            var $rootElement = this.find(".query-plan-root:first .tree-branch > .tree-node").first();
            var newLeft = $parent.scrollLeft() + $rootElement.position().left - $parent.width() / 2 + $rootElement.width() / 2;
            $parent.scrollLeft(newLeft);
        }
    });
})(jQuery);
