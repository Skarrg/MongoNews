var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
app.get("/api/scrape", function(req, res) {

    axios.get("http://www.thetimesinplainenglish.com/").then(function(response) {
  
      var $ = cheerio.load(response.data);
  
      $(".post h2").each(function(i, element) {
  
        var result = {};
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      res.send("Scrape Complete");
    });
  });


}