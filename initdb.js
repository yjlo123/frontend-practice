var db = new alasql.Database();
db.exec('CREATE TABLE employee (\
id INT AUTO_INCREMENT, \
name VARCHAR(50), \
age INT, country VARCHAR(20))');

db.exec('INSERT INTO employee (name, age, country) VALUES \
("Liu Siwei", 24, "China"),\
("Jiang Hao", 25, "Singapore"),\
("Tang Zijian", 24, "Japan")\
');

db.exec('CREATE TABLE user (\
id INT AUTO_INCREMENT, \
name VARCHAR(50), \
password VARCHAR(100), \
email VARCHAR(50))');

db.exec('INSERT INTO user (name, password, email) VALUES \
("user1", "pass1", "123@abc.com")');

var dbUtil = {
	getAllUser: function(start, limit){
		return db.exec('SELECT * FROM user');
	},
	getUser: function(start, limit){
		return db.exec('SELECT * FROM user LIMIT 5');//, [parseInt(start), parseInt(limit)]);
	},
	countUser: function(){
		return db.exec('SELECT COUNT(*) AS num FROM user');
	},
	addUser: function(newUser){
		db.exec('INSERT INTO user (name, password, email) VALUES \
		(?, ?, ?)', [newUser.name, newUser.password, newUser.email]);
	},
	delUser: function(uid){
		db.exec('DELETE FROM user WHERE id=?', [uid]);
	},
	updateUser: function(userDetail, uid){
		//alert(JSON.stringify(userDetail)+" "+uid);
		db.exec('UPDATE user SET name=?, email=? WHERE id=?',
			[userDetail["name"], userDetail["email"], parseInt(uid)]);
	}
}