module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("site/assets");  // kopíruje VŠE včetně images + drone.css/js
  eleventyConfig.addPassthroughCopy({ "site/api": "api" });
  eleventyConfig.addWatchTarget("site/api/");
  
  return {
    dir: {
      input: "site",
      output: "_site"
    }
  };
};
