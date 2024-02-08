const {MongoClient}=require('mongodb')
// conneting database
let dbconnection
function connectToDb(callingserver){
   MongoClient.connect('mongodb+srv://MONI:moth@cluster0.rga4oaj.mongodb.net/expensetracker?retryWrites=true&w=majority').then(function(client){
    dbconnection=client.db()
    callingserver()
   }).catch(function(error){
callingserver(error)
   })
}
// to use or access connected db
function getDb(){
return dbconnection
}
// to export the functions
module.exports={connectToDb,getDb}