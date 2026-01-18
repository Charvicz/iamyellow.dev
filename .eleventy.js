module.exports = function (eleventyConfig) {
  // ✅ Copy static assets to output
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "site/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "site/site.webmanifest": "site.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "site/favicon-32x32.png": "favicon-32x32.png" });
  eleventyConfig.addPassthroughCopy({ "site/favicon-16x16.png": "favicon-16x16.png" });
  eleventyConfig.addPassthroughCopy({ "site/apple-touch-icon.png": "apple-touch-icon.png" });

  return {
    dir: {
      input: "site",
      includes: "_includes",
      output: "_site",
    },

    // ✅ protože to budeš mít na doméně jako https://iamyellow.dev/site/...
    pathPrefix: "/site/",
  };
};


module.exports = function (eleventyConfig) {
  // passthrough copy...
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });

  // ✅ přidej tohle:
  eleventyConfig.addGlobalData("baseUrl", "/site");

  return {
    dir: {
      input: "site",
      includes: "_includes",
      output: "_site",
    },
    pathPrefix: "/site/",
  };
};
