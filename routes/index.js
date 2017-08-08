var express = require('express');
var router = express.Router();

var ShortUrl = require('../models/shorturl');

/**
 * Description: Redirecting to original website
 * Author:
 */
router.get('/:url', function(req, res, next) {
  var tinyUrl = req.params.url;
  ShortUrl.findOne({shortUrl: tinyUrl},function(err, response) {
    if(err) {
      return res.json({
        title: 'errorOcoured',
        errror: err
      });
    }
    res.redirect(response.mainUrl);
  });
});

/**
 * Description: Creating new tiny url
 * Author:
 */
router.post('/createUrl', function(req, res, next){
  var bigurl = req.body.url;
  var text = "";

  /**
   * Description: Check if url is already exist
   * Author:
   */
  ShortUrl.findOne({mainUrl: req.body.url}, function(err, resExist) {
      //@ If error
      if(err) {
        return res.json({
          title: 'errorOcoured',
          errror: err
        });
      }
      
      //@ If already exist
      if(resExist != null && resExist.mainUrl === req.body.url) {
          res.json({
            title: 'Url is already exist',
            url: resExist
          });
      } else {
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          
          //@ Creating mongoose object
          var encryptUrl = text;
          var shortUrls = new ShortUrl({
            mainUrl: req.body.url,
            shortUrl: encryptUrl
          });
          //@ Saving data to db
          shortUrls.save(function(err, response) {
            if(err) {
              return res.json({
                title: 'errorOcoured',
                errror: err
              });
            }
            res.json({
              title: 'Url created successfully',
              url: response
            });

          });
      }
      
  });
});

module.exports = router;
