var db = require('../db');

exports.insert = function InsertHandler(birthDate, firstName, lastName, gender, phone, done){
    //var values = [new Date(birthDate).toISOString(), firstName, lastName, gender, phone];
    var values = [new Date(birthDate).toISOString().slice(0, 19).replace('T', ' '), firstName, lastName, gender, phone];
    //var values = [birthDate, firstName, lastName, gender, phone];
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
        'SELECT * FROM friends LIMIT 600', function SelectQueryHandler(err, result, fields){
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
        'SELECT * FROM friends WHERE first_name = ?', name, 
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}



exports.delete = function FriendsDeleteHandler(id,done) {

    db.get().query(
        'DELETE FROM friends WHERE friend_id = ?', id, 
        function DeleteQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

exports.update = function FriendsUpdateHandler(id, birthDate, firstName, lastName, gender, phone, done) {
    console.log("entered update function");
    var values = [new Date(birthDate).toISOString().slice(0, 19).replace('T', ' '), firstName, lastName, gender, phone];
    db.get().query(
        'UPDATE friends SET (birth_date, first_name, last_name, gender, phone) ' + 'VALUES (?,?,?,?,?)', values + 'WHERE friend_id = ?', id,
        function UpdateQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result.insertId);
        });
}