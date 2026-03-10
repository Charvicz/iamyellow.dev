module.exports = function (eleventyConfig) {
  // Assets (včetně drone.css/js)
  eleventyConfig.addPassthroughCopy("site/assets");
  
  // API
  eleventyConfig.addPassthroughCopy({ "site/api": "api" });
  
  // DRONE FOTKY - přímo v rootu
  eleventyConfig.addPassthroughCopy("site/drone-promo");
  eleventyConfig.addWatchTarget("site/api/");
  
  return {
    dir: {
      input: "site",
      output: "_site"
    }
  };
};
