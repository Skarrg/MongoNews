var db = require("../models");


module.exports = function (app) {

  app.get("/", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
      var dbObject = { article: dbArticle };
      res.render("index", dbObject);
    });
  });

  app.get("/leaveComment/:id", function (req, res) {
    var id = { id: req.params.id };
    res.render("leaveComment", id);

  })

  app.post("/addComment", function (req, res) {
    db.Note.create({ comments: req.body.comments }).then(function (data) {
      db.Article.update({ _id: req.body.id }, { $push: { note: data._id } }, { new: true }).then(function (result) {

        db.Article.find({}).then(function (dbArticle) {
          var dbObject = { article: dbArticle };
          res.render("index", dbObject);
        });
      }).catch(function (err) { console.log(err) });
    });
  });

  app.get('*',function (req, res) {
    res.redirect('/');
});
}