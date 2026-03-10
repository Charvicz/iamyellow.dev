module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("site/assets");  // kopíruje VŠE včetně images + drone.css/js
  eleventyConfig.addPassthroughCopy({ "site/api": "api" });
  eleventyConfig.addWatchTarget("site/api/");
  eleventyConfig.addPassthroughCopy("site/drone-promo");  // kopíruje drone-promo do _site/drone-promo

  return {
    dir: {
      input: "site",
      output: "_site"
    }
  };
};
