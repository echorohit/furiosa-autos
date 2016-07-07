var express = require('express');
var router = express.Router();
var api = require('../lib/api');
var helpers = require('../lib/helpers');




/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/*
* Task 1:
* Make models alphabetically sortable (ascending, descending, default)
*/
router.get('/models', function(req, res, next) {
	// use api to get models and render output
	//Sorting pending
	var qParam = req.query['sort'] || 'no';
	if(qParam =='asc' || qParam =='desc' || qParam =='no') {
		qParam = qParam;
	} else  {
		qParam = 'no'
	}
	api.fetchModels()
		.then(function(models){
			var models = helpers.alphabeticSort(qParam, models);
			res.render('models', {"models": models});
		})
		.catch(function(err){
			res.render('error', {error: err});
		})

});

/*
* Task 2:
* Make services filterable by type (repair, maintenance, cosmetic)
*/
router.get('/services', function(req, res, next) {
	// use api to get services and render output

	var t = req.query['filter'] || '';

	api.fetchServices()
			.then(function(services) {
				var resService;
				if(t == 'repair' || t == 'maintenance' || t== 'cosmetic') {
					resService = helpers.filterServices(t, services);
				} else {
					resService = services;
				}
				res.render('services', {"services": resService});
			})
			.catch(function(err){
				res.render('error');
			})
});

/*
* Task 3:
* Bugfix: Something prevents reviews from being rendered
* Make reviews searchable (content and source)
*/
router.get('/reviews', function(req, res, next) {

	var searchTxt = req.query['searchTxt'] || '';
	return Promise.all([api.fetchCustomerReviews(), api.fetchCorporateReviews()])
		.then(function(reviews) {
			var reviewsArr = [];
			for(var i = 0 ; i < reviews.length; i++ ) {
				if(Array.isArray(reviews[i])) {
					for(var k in reviews[i]) {
						if(searchTxt!=''){

							if(reviews[i][k].content.search(searchTxt) > -1 || reviews[i][k].source.search(searchTxt) > -1) {
								reviewsArr.push(reviews[i][k]);
							}
						} else {
							reviewsArr.push(reviews[i][k]);
						}

					}
				}
			}

			console.log(reviewsArr);

			res.render('reviews', {reviews: reviewsArr});
		});
});

module.exports = router;
