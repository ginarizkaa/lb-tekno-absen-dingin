module.exports = function(DataCuti) {
    DataCuti.remoteMethod(
        'getDataCutiEmployee', 
        {
            description: 'get data by Id',
            accepts:[
                {arg: 'idEmployee', type: 'string'}
            ],
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http: { path: '/getDataCutiEmployee', verb: 'get'}
        }
    );
    DataCuti.getDataCutiEmployee = function(idEmployee, callback){
        new Promise(function(resolve, reject){ //fungsi promise untuk menjalankan code sesuai dengan urutannya
            
            var filter = {
                where: {
                    idEmployee : idEmployee
                }
            }
            DataCuti.find(filter, function(err, result){
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