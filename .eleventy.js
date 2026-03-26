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
  
  const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Filtr pro hezké URL adresy (Jan Novák -> jan-novak)
  eleventyConfig.addFilter("slugify", function(value) {
    return slugify(value, { lower: true, strict: true });
  });

  // Filtr pro formátování peněz
  eleventyConfig.addFilter("localeString", function(value) {
    return Number(value).toLocaleString('cs-CZ');
  });

  // Kopírování fotek do výstupní složky
  eleventyConfig.addPassthroughCopy("site/assets/images/export_makleri");

  return {
    dir: {
      input: "site",
      output: "_site"
    }
  };
};

};
