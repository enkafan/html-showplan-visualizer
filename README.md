html-showplan-visualizer
====================

This is a utility for transforming XML query execution plans into HTML via XSLT.

The stylesheet is completely XSLT 1.0 compatible, and with the exception of the polyfill the output is all HTML + CSS.

## Using html-query-plan in a web page ##

In order to embed a html query plan into a web page you must:

  1. Link to one of the stylesheets in the dist folder. There is one for light and dark backgrounds, and another set with the same except there is no font specified
  1. Use a polyfill js library to add detail / summary support. Current [browser support](http://caniuse.com/#feat=details) is unfortunately limited. Included is a simple implementation that requires
     no additional libraries. It also has the added benefit of not forcing in an arrow.
  1. Place the output of the showplan.xslt stylesheet inside some div on your page

Step 2. is optional but you'll see all the details expanded by default.

### About ###

This library borrows heavily from the work originally done by Justin Pealing's [html-query-plan](https://github.com/JustinPealing/html-query-plan) XSLT. The goal is to build upon that script and add idea's from Alex Tatiyants's excellent [Postgres EXPLAIN Visualizer](http://tatiyants.com/postgres-query-plan-visualization/?platform=hootsuite)

Benefits over html-query-plan (and most other SHOWPLAN visualizers)

 * Clean output focusing on just the important details of the operation.
 * Vertical display of the plan. Left to right scrolling to visualize the data I feel is cumbersome to work with.
 * Instead of a tooltip, the details will remain open. Many times I'll want to look at specific values and compare them with other options. Tooltips caused me to frequently rely on things like taking a screenshot of the tooltips so I could view them at the same time.
 * Slightly more modern codebase. Tried to make it as easy as possible to integrate the output into third party applications by not being opinionated about fonts. Many of the options such as the height of the treen odes and colors can be tweaked via the included SCSS theme files.

Things that are missing for a reason:

 * No icons. I've never found the icons valuable over simply reading the actual name of the operation. They clutter up the display. One thing I'd like to potentially investigate is using a color coded system of blue, green and yellow the icons currently represent.

## Developing ##

 * Gulp tasks are configured to make things a bit easier. Running `Gulp Xsl` will take all the xml and showplan files found in the test_plans folder and apply they dark, light and no-font XSLT to create HTML files for testing.

###Todo:###

 * Start far left. On super complex queries you gotta scroll WAY to the left to find the initial statement.
 * **Fixed:*8 Estimated Operator Cost has a bug but I'm not quite sure what it is. Justin's library was way off for specific operators. I'm about 95% sure it was related to rebinds and rewinds not being taken into account in the calculation. That resolves the issue of some queries having four operators equal to 3% total. However there is still an issue with some queries going over 110%. SSMS displays them properly. I'm not sure if they are punting on queries over 100% and just rounding down, or if they work some additional magic on their estimated operator cost that I'm not aware of.
 * Color code each operator.
   * Logical and physical operators should be blue.
   * Cursor operators should be yellow.
   * Assign, Declare, If, Select (Result), While and other language operators should be green.
 * Better support for multiple queries per plan. Right now it'll lay them out horizontally.
 * Better support for actual performance vs estimated performance when that data is available.
 * Better information related to scalar operations.
 * Pev has a neat little thing where it'll highlight the operation in a popup window. Not sure if we have enough data available in the SHOWPLAN to do this but it might work
