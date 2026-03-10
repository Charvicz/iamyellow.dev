module.exports = function (eleventyConfig) {
  // 🔹 assets (JS, CSS, images…)
  eleventyConfig.addPassthroughCopy("site/assets");

  // 🔹 API (PHP soubory) → synchronizace do _site/api
  eleventyConfig.addPassthroughCopy({ "site/api": "api" });

  // 🔹 volitelné: ať Eleventy sleduje změny v API
  eleventyConfig.addWatchTarget("site/api/");

  eleventyConfig.addPassthroughCopy("site/images");

  return {
    dir: {
      input: "site",
      output: "_site"
    }
  };
};
