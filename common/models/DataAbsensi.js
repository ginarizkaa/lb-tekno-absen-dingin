
module.exports = function(DataAbsensi) {
    var moment = require ('moment')
    var start = moment().startOf('day'); // set to 12:00 am today
    var end = moment().endOf('day'); // set to 23:59 pm today

    DataAbsensi.remoteMethod(
        'getToday', 
        {
            description: 'get data today',
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http: { path: '/getToday', verb: 'get'}
        }
    );
    DataAbsensi.getToday = function(callback){
        
        new Promise(function(resolve, reject){ //fungsi promise untuk menjalankan code sesuai dengan urutannya
            //let date1 = moment(Date.now())
            var filter = {
                include: [
                    "DataEmployee", 
                    "DataAsesor"
                ],
                where: {
                    date: {gt: start, lt: end}
                }
            }
            DataAbsensi.find(filter, function(err, result){
                if(err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that name')
                    err.statusCode = 404
                    reject (err)
                }

                resolve (result)
            })
        }).then(function(res){
            if (!res) callback (err)
            return callback (null, res)
        }).catch(function(err){
            callback(err);
        });
    };

    DataAbsensi.remoteMethod(
        'getTodayEmployee', 
        {
            description: 'get data today',
            accepts:[
                {arg: 'idEmployee', type: 'string'},
            ],
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http: { path: '/getTodayEmployee', verb: 'get'}
        }
    );
    DataAbsensi.getTodayEmployee = function(idEmployee, callback){
        
        new Promise(function(resolve, reject){ //fungsi promise untuk menjalankan code sesuai dengan urutannya
            var filter = {
                include: [
                    "DataEmployee", 
                    "DataAsesor"
                ],
                where: {
                    and:[
                        {date: {gt: start, lt: end}},
                        {idEmployee: idEmployee}
                    ]
                }
            }
            DataAbsensi.find(filter, function(err, result){
                if(err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that name')
                    err.statusCode = 404
                    reject (err)
                }

                resolve (result)
            })
        }).then(function(res){
            if (!res) callback (err)
            return callback (null, res)
        }).catch(function(err){
            callback(err);
        });
    }
};