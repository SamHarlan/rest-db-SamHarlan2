var db = require('../db');

exports.insert = function InsertHandler(birthDate, firstName, lastName, gender, phone, done){
    var values = [new Date(birthDate).toISOString(), firstName, lastName, gender, phone];
    db.get().query(
        'INSERT INTO friends (birth_date, first_name, last_name, gender, phone) ' +
        'VALUES (?,?,?,?,?)', values, function InsertQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result.insertId);
        });
}

exports.getAll = function GetAllHandler(done){
    db.get().query(
        'SELECT * FROM friends LIMIT 100', function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

exports.findById = function FindByIdHandler(id, done){
    db.get().query(
        'SELECT * FROM friends WHERE friend_id = ?', id, 
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

exports.findByName = function FindByNameHandler(name, done){
    db.get().query(
        'SELECT * FROM friends WHERE first_name = ?', id, 
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}