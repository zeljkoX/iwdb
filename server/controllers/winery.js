var mongoose = require('mongoose'),
    Winery = mongoose.model('Winery'),
    Edit = mongoose.model('Edit'),
    Problem = mongoose.model('Problem'),
    events = require('events'),
    event = new events.EventEmitter();

/**
 * List all wines in db
 *TO DO select fields which to return
 */
exports.listing = function(req, res) {
    var page = pagination(req);
    var query = filter(req, 'country');
    Winery.find(query).limit(page.size).skip(page.start).lean().exec(function(err, result) {
        res.send(result);
    });
};
/**
 * Add a winery
 */
exports.add = function(req, res) {
    var winery = new Winery(req.body);
    winery.save(function(err, doc) {
        if (err) {
            return res.json(400, err);
        }
        event.emit('winery:add', doc);
        return res.json(doc);
    });
};

/**
 *	To implement with elastic search
 */
exports.search = function(req, res) {

};

/**
 *	Showing a specific wine
 */
exports.show = function(req, res) {
    res.json(req.doc.toObject());
    req.doc.pageView();
    event.emit('winery:show', doc);
    return;
};

/**
 *	Redirect a url with id to url with  id and title
 */
exports.redirect = function(req, res) {
    res.location(req.doc.idurl);

    /*
    Winery.findById(req.id, '+idurl', function(err, doc) {
        if (!err) {
            return res.location(idUrl);
        } else {
            event.emit('winery:show', doc);
            return res.send(err);
        }
    });
    */
};

/**
 *  User edits a document
 *  Fields changes, explanatio set from req.body
 */
exports.edit = function(req, res) {
    var edit = new Edit(req.body);
    edit.date = new Date();
    edit.category = 'Winery';
    edit.user = req.user; //TO DO req user
    edit.save(function(err, doc) {
        if (err) {
            return res.json(400, err);
        }
        event.emit('edit:add', doc);
        return res.json(doc);
    });
};

/**
 *  Implementation of Report a problem
 */
exports.problem = function(req, res) {
    var problem = new Problem(req.body);
    problem.date = new Date();
    problem.user = req.user;
    problem.page = req.params.id;
    problem.save(function(err, doc) {
        if (err) {
            return res.json(400, err);
        }
        event.emit('problem:add', doc);
        return res.json(doc);
    });
};


/**
 *  #Admin specific controllers
 */


/**
 *  Admin: Show document with all fields
 */
exports.adminShow = function(req, res) {
    res.json(req.doc);
};

/**
 *  Admin: Change document fields
 */
exports.adminWineryChange = function(req, res) {
    var doc = req.doc;
    delete req.body._id; //prevent id field
    req.body.lastModified = new Date();
    doc.update(req.body, function(err, numberAffected, rawResponse) {
        if (err) {
            return res.json(400, err);
        }
        return res.send(200, rawResponse);
    });
};

/**
 *  Admin: Delete document
 */
exports.adminWineryDelete = function(req, res) {
    req.doc.remove(function(err, doc) {
        if (err) {
            return res.json(400, err);
        }
        res.json(200);
        event.emit('winery:delete', doc);
        return;
    });
};

/**
 *  Admin: Report a problem
 */
exports.adminPublish = function(req, res) {
    var doc = req.doc;
    doc.publish(function(err) {
        if (err) {
            return res.json(400, err)
        }
        res.json(200);
        event.emit('winery:publish', doc);
        return;
    });
};

/*********************
*   Respond to events
*
*********************/

event.on('wine:add', function(wine){
    Winery.findById(wine.winery._id, function(err, winery){
        if (err){
            //implement adding to db errors
        }
        winery.addWine(wine, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});

event.on('wine:remove', function(wine){
    Winery.findById(wine.winery._id, function(err, winery){
        if (err){
            //implement adding to db errors
        }
        winery.removeWine(wine, function(err){
          if (err){
            //implement adding to db errors
        }  
        });
    });
});