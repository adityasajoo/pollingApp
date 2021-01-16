const Vote = require('../model/vote');

exports.vote_add = function (req, res) {
    let vote = new Vote({
        name: req.body.name,
        choice: req.body.choice,
        submissionDate: req.body.submissionDate
    });

    vote.save(function (err) {
        if (err) {
            console.log(`Could not save : ${err}`);
        } else {
            console.log("Poll Added");
        }
    });
}

exports.get_all = function () {
    return new Promise((resolve, reject) => {
        Vote.find({}, function (err, foundDocuments) {
            if (err) {
                console.log(`Couldn't Fetch : ${err}`);
                reject(err);
            } else {
                console.log(foundDocuments);
                resolve(foundDocuments);
            }
        });
    })

}

exports.date_count = function (choice) {
    return new Promise((resolve, reject) => {
        const aggregate = [{
                $match: {
                    choice: choice
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$submissionDate"
                        }
                    },
                    count: {
                        $sum: 1
                    },

                }
            },
            {
                $project: {
                    _id: 0,
                    submissionDate: "$_id",
                    count: 1,
                    choice: 1
                }
            },
        ];

        Vote.aggregate(aggregate, function (err, result) {
            if (err) {
                console.log(`Couldn't Fetch : ${err}`);
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        })
    })
}

exports.vote_count = function () {
    return new Promise((resolve, reject) => {
        const aggregate = [
            {
                $group: {
                    _id: "$choice",
                    count: {
                        $sum: 1
                    },

                }
            },
            {
                $project: {
                    _id: 0,
                    choice: "$_id",
                    count: 1
                }
            },
        ];

        Vote.aggregate(aggregate, function (err, result) {
            if (err) {
                console.log(`Couldn't Fetch : ${err}`);
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        })
    })

}