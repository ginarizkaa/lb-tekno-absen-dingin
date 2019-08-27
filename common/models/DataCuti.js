module.exports = function(DataCuti) {
    DataCuti.remoteMethod(
        'getDataCutiBySpv', 
        {
            description: 'get data by Id',
            accepts:[
                {arg: 'idSpv', type: 'string'}
            ],
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http: { path: '/getDataCutiBySpv', verb: 'get'}
        }
    );
    DataCuti.getDataCutiBySpv = function(idSpv, callback){
        new Promise(function(resolve, reject){ //fungsi promise untuk menjalankan code sesuai dengan urutannya
            
            var filter = {
                include: [
                    "DataEmployee", 
                    "DataAsesor",
                    "DataJenisCuti"
                ],
                where: {
                    idAsesor : idSpv
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