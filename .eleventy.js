module.exports = function (eleventyConfig) {
  // Copy static assets to output
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "site/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "site/site.webmanifest": "site.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "site/favicon-32x32.png": "favicon-32x32.png" });
  eleventyConfig.addPassthroughCopy({ "site/favicon-16x16.png": "favicon-16x16.png" });
  eleventyConfig.addPassthroughCopy({ "site/apple-touch-icon.png": "apple-touch-icon.png" });

  // (volitelně) base pro šablony – root webu
  eleventyConfig.addGlobalData("baseUrl", "");

  return {
    dir: {
      input: "site",
      includes: "_includes",
      output: "_site",
    },

  };
};
