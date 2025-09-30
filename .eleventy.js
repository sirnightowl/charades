let Nunjucks = require("nunjucks");

module.exports = function(eleventyConfig) {

  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes")
  );

    eleventyConfig.setLibrary("njk", nunjucksEnvironment);
    eleventyConfig.addWatchTarget("./src/sass/");
    eleventyConfig.addPassthroughCopy("./src/img/");
    eleventyConfig.addPassthroughCopy("./src/scripts/");
    eleventyConfig.addPassthroughCopy("./public/js/components/");
    eleventyConfig.addPassthroughCopy("./public/js/models/");
    eleventyConfig.addPassthroughCopy("./public/js/services/");
    eleventyConfig.addPassthroughCopy("./public/js/tests/");
    eleventyConfig.addPassthroughCopy("./public/js/utils/");
    eleventyConfig.addPassthroughCopy("./public/js/app.js");
    eleventyConfig.addPassthroughCopy("./public/js/settings.js");
    eleventyConfig.addPassthroughCopy("./apple-touch-icon.png");
    eleventyConfig.addPassthroughCopy("./favicon-16x16.png");
    eleventyConfig.addPassthroughCopy("./favicon-32x32.png");
    eleventyConfig.addPassthroughCopy("./site.webmanifest");
    eleventyConfig.addPassthroughCopy("./safari-pinned-tab.svg");
    eleventyConfig.addPassthroughCopy("./browserconfig.xml");
    eleventyConfig.addPassthroughCopy("./android-chrome-*.png");
    eleventyConfig.addPassthroughCopy("./mstile-*.png");
    eleventyConfig.addPassthroughCopy("./fav.png");

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: "src",
      output: "docs"
    },
    pathPrefix: "/charades/"
  };
};
