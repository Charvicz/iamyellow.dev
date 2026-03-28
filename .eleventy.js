module.exports = function(eleventyConfig) {
  // --- PŮVODNÍ NASTAVENÍ ---
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("site/assets");
  eleventyConfig.addPassthroughCopy({ "site/api": "api" });
  eleventyConfig.addPassthroughCopy("site/drone-promo");
  eleventyConfig.addWatchTarget("site/api/");
  eleventyConfig.addPassthroughCopy("site/assets/images/export_makleri");

  // --- NOVÉ FILTRY PRO MAKLÉŘE ---
  eleventyConfig.addFilter("localeString", function(value) {
  if (!value) return "0";
  return (Number(value) * 1000).toLocaleString('cs-CZ');
});

  // --- KONFIGURACE ADRESÁŘŮ ---
    return {
    dir: {
      input: "site",
      output: "_site",
      includes: "_includes",
      data: "_data"    // ← přidej toto
    }
  };
};
