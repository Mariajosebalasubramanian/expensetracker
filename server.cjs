const express= require('express')
// Importing the required functions from dbConnection.cjs
const {connectToDb, getDb} = require('./dbconnect.cjs') 
const app =express()
const bodyParser=require("body-parser");
const { ObjectId } = require('mongodb');
app.use(bodyParser.json());
let db
connectToDb(function(error){
    if(error){
        console.log("error in connection")
        console.log(error)
    }
    else { // if no error in establishing connection
        // process.env.PORT : cloud service
        // 8000 : local machine
        const port = process.env.PORT || 8000
        app.listen(port)
        db = getDb()
        console.log(`Listening on port ${port}...`)
        console.log("Listening on port ${port}...")
    }

})
/*

 * Expense Tracker
 * Functionalities : adding entry, getting the summaries of previous entries, editing and deleting
 * Input fields : Category, Amount, Date
 * 
 * CRUD : Create, Read, Update and Delete
 * 
 * get-entries / get-data - GET
 * add-entry - POST
 * edit-entry - PATCH
 * delete-entry - DELETE
 * user vandhu data va query,body,params la vachi snd pannalam
 
request-> GET,POST,PATCH,DELETE
status code 4 la start aachuna client side error 5 na server side error
*/

app.post('/add-entry',function(request,response){
    db.collection('expensedata').insertOne(request.body).then(function(){
      response.status(201).json({
      "status":"entry added successfully"
      })
    }).catch(function(){
response.status(500).json({
    "status":"entry not added successfully"
})
    })
})

// app.get('/get-entries', function(request, response) {
//     // Declaring an empty array
//     const entries = []
//     db.collection('expensedata')
//     .find({}, { projection: { "Date":"20/07/2023" , Amount: 1 } })
//     .forEach(entry => entries.push(entry))
//     .then(function() {
//         response.status(200).json(entries)
        
//     }).catch(function() {
//         response.status(404).json({
//             "status" : "Could not fetch documents"
//         })
app.get('/get-entries', function(request, response) {
    // Declaring an empty array
    const entries = []
    db.collection('expensedata')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function() {
        response.status(200).json(entries)
    }).catch(function() {
        response.status(500).json({
            "status" : "Could not fetch documents"
        })

    })
})
app.delete('/delete-entries', function(request, response) {
    if(ObjectId.isValid(request.query.id)) {
        db.collection('expensedata').deleteOne({
            _id : new ObjectId(request.query.id)
        }).then(function() {
            response.status(200).json({
                "status" : "Entry successfully deleted"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Entry not deleted"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})
// app.delete('/delete-entries',function(request,response){
   
//     db.collection('expensedata')
//     .deleteMany({
//         // _id: new ObjectId('65c0b126655591e0c57ad728') ipdiyum panalam
//         Category:request.query.Category

        
//     }).then(function(){
//         response.status(200).json({
//             "status":"entry deleted successfully"
//             })
//     }).catch(function(){
//         response.status(500).json({
//             "status":"entry not deleted successfully"
//             })
//     })
    
// })
app.patch('/update-entries/:id',function(request,response){
    if(ObjectId.isValid(request.params.id)){
    db.collection('expensedata')
    .updateOne(
       {_id: new ObjectId(request.params.id)},
       {$set:request.body}    
    )
    .then(function(){
        response.status(200).json({
            "status":"entry updated successfully"
            })
    })
    .catch(function(){
        response.status(500).json({
            "status":"entry not updated successfully"
            })
    })}else{
        response.status(500).json({
            "status":"invalid object id"
        })
    }
    
})
// git add . 
// git commit
// git push origin main
// 