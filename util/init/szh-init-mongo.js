var universalDaoModule = require('./../../build/server/UniversalDao.js');
var mongoDriver = require('./../../build/server/mongoDriver.js');
var config = require('./../../build/server/config.js');



console.log('initializing data');

mongoDriver.init(config.mongoDbURI, function(err) {
	if (err) {
		throw err;
	}

	console.log(mongoDriver.getDb);


	var _daoProfiles = new universalDaoModule.UniversalDao(mongoDriver, {
		collectionName : "securityProfiles"
	});


	var masterProfile={
			"id": "53cd19d5502cd4915bd08724",
			"baseData": {
				"name": "masterProfile"
			},
			"forcedCriteria": [
			],
			"security": {
				"permissions": {
					"System User" : true,
					"Registry - read" : true,
					"Registry - write" : true,
					"Security - read" : true,
					"Security - write" : true,
					"System Admin" : true,
					"Registry People" : true,
					"Registry Club" : true,
					"Registry Requests" : true,
					"Registry Competitions" : true,
					"RefereeReport - read - KM" : true,
					"RefereeReport - write - KM" : true,
					"Club - read - KM" : true,
					"Club - write - KM" : true,
					"Person - read - KM" : true,
					"Person - write - KM" : true,
					"Requests - read - KM" : true,
					"Requests - write - KM" : true,
					"Portal - write" : true
				},
				"groups": {

				}
			}
		};


		var defaultProfile={
			"id": "53cd19d5502cd4915bd08720",
			"baseData": {
				"name": "default"
			},
			"forcedCriteria": [
			],
			"security": {
				"permissions": {
					"System User": true,
					"Registry - read": true,
					"Registry - write": true
				},
				"groups": {

				}
			}
		};


		var clubManager={
			"id" : "55506df1ac67b8ebf4760e5f",
			"baseData" : {
				"name" : "Klubový manažér"
			},
			"security" : {
				"permissions" : {
					"System User" : true,
					"Registry People" : true,
					"Registry Requests" : true,
					"Person - read - KM" : true,
					"Person - write - KM" : true,
					"Requests - read - KM" : true,
					"Requests - write - KM" : true,
					"Club - read - KM" : true,
					"Club - write - KM" : true
				},
				"forcedCriteria" : [ 
					{
						"applySchema" : "uri://registries/people#views/fullperson-km/search",
						"crits" : [ 
							{
								"f" : "player.club.oid",
								"op" : "eq",
								"v" : null,
								"obj" : null,
								"expr" : "officer.club.oid"
							}
						]
					}
				]
			}
		}

		var matrikar={
			"id" : "555b234f5b576ef91ec6fedb",
			"baseData" : {
				"name" : "Matrikár"
			},
			"security" : {
				"permissions" : {
					"System User" : true,
					"Registry People" : true,
					"Registry Club" : true,
					"Registry Requests" : true,
					"Registry Competitions" : true,
					"Registry - read" : true,
					"Registry - write" : true,
					"Security - read" : true,
					"Security - write" : true,
					"Portal - write" : true
				},
				"forcedCriteria" : []
			}
		}

	var _dao = new universalDaoModule.UniversalDao(mongoDriver, {
		collectionName : "people"
	});


	_daoProfiles.save(defaultProfile,function(err){
		console.log(err);
	});
	_daoProfiles.save(clubManager,function(err){
		console.log(err);
	});
	_daoProfiles.save(matrikar,function(err){
		console.log(err);
	});
	_daoProfiles.save(masterProfile,function(err,data){

		console.log(data);
		_collection = mongoDriver.getDb().collection("people");


		// _collection.drop();
		_collection.ensureIndex({
			"systemCredentials.login.loginName" : 1
		},{
			unique : true,
			sparse : true
		},function(err) {
			if (err){
				console.log(err);
			}

			var johndoe={
				"id": "53cf5c54118025ff1b88e368",
				"systemCredentials": {
					"login": {
						"loginName": "Administrator",
						"passwordHash": "mcHWq0FyMluy3U3nGQJeYuR6ffSDxgtG1SaejicXJvdxyM/1NUP7X5Kx3LpvsAQ+XOq8Hs+maYLiEXDQYr3OCh2o+gtTxvhEz9Z4Bem0J09v7GyxdkD2S2zED7Obr6XzPzpaxaYfmFBHRR5iy2JDRx/lAcBM1L0qFfBnoXoGYm6jcUn6Klht9xoPnYGvDVdxtjWG9GqBrLfIJb1Aot3WCPOAG0BzlidfjdG0exJhkC0eOTwgFG4D8vP/AOblI2N+skZ3ztDb6NIxRIyd70bDooUhB7HcRnJgsrqBGg68UfBReHXYFnQYYa7Fv4/mR+4y+N+SpFXokYcKUI0e6sCPcQ==",
						"email": "websupport@unionsoft.sk",
						"salt": "johndoe"
					},
					"profiles": ["53cd19d5502cd4915bd08724"]
				},
				"baseData": {
					"name": "Administrator",
					"bornNumber": "7710101010",
					"surName": "UnionSoft s.r.o.",
					"birthDate": "19771010",
					"nationality": "SVK",
					"gender": "M"
				},
				"contactInfo": {
					"email": "websupport@unionsoft.sk",
					"street": "Galvaniho",
					"houseNumber": "17/B",
					"city": "Bratislava ",
					"phoneNumber": "+421 2 50267 117",
					"zipCode": "821 04",
					"country": "SVK"
				}
			};




			_dao.save(johndoe,function (err,data){

				console.log ('User saved');

				mongoDriver.close();
				});

			// var janedoe = {
			// 	"id":"53cf5c54118025ff1b88e367",
			// 	"systemCredentials": {
			// 		"login": {
			// 			"loginName" : "janedoe",
			// 			"passwordHash" : "mcHWq0FyMluy3U3nGQJeYuR6ffSDxgtG1SaejicXJvdxyM/1NUP7X5Kx3LpvsAQ+XOq8Hs+maYLiEXDQYr3OCh2o+gtTxvhEz9Z4Bem0J09v7GyxdkD2S2zED7Obr6XzPzpaxaYfmFBHRR5iy2JDRx/lAcBM1L0qFfBnoXoGYm6jcUn6Klht9xoPnYGvDVdxtjWG9GqBrLfIJb1Aot3WCPOAG0BzlidfjdG0exJhkC0eOTwgFG4D8vP/AOblI2N+skZ3ztDb6NIxRIyd70bDooUhB7HcRnJgsrqBGg68UfBReHXYFnQYYa7Fv4/mR+4y+N+SpFXokYcKUI0e6sCPcQ==",
			// 			"email": "root@localhost",
			// 			"salt" : "johndoe"
			// 		},
			// 		"profiles" : { "53cd19d5502cd4915bd08724":true}
			// 	}
			// };
			// _dao.save(janedoe,function (err,data){ console.log ('User saved'); process.exit(0);});

		});


	});



});
