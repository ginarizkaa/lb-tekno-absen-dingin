module.exports = function(DataUser) {
    DataUser.remoteMethod(
        'getDataBySpv', 
        {
            description: 'get data by Id Spv',
            accepts:[
                {arg: 'idSpv', type: 'string'}
            ],
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http: { path: '/getDataBySpv', verb: 'get'}
        }
    );
    DataUser.getDataBySpv = function(idSpv, callback){
        new Promise(function(resolve, reject){ //fungsi promise untuk menjalankan code sesuai dengan urutannya
            
            var filter = {
                where: {
                    idSpv : idSpv
                }
            }
            DataUser.find(filter, function(err, result){
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