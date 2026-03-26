// V tvém eleventy.js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("*.jpg");  // pro obrazek.jpg
  // ... zbytek
  
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
      data: "../_data"
    }
  };
};
