 //pushing data into correct inputs in form is not working correctly
 //math for train arrival time is not working correctly
 //connecting to firebase is working great!
 //spent a lot of time trying to get functions to work that i didn't style it at all. 

 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD1iZB8YNW6HAsxhp8TzBvOYfKt00exV58",
    authDomain: "trainscheduler-e29fe.firebaseapp.com",
    databaseURL: "https://trainscheduler-e29fe.firebaseio.com",
    projectId: "trainscheduler-e29fe",
    storageBucket: "trainscheduler-e29fe.appspot.com",
    messagingSenderId: "273007024982"
  };
  firebase.initializeApp(config);

//submit button on click pushes info into inputs
$("#submit").on("click",function(event){
    event.preventDefault()
    train = $("#trainName").val().trim()
    destination = $("#destination").val()
    frequency = $("#frequency").val()
    nextArrival = $("#nextArrival").val()


    database.ref().push({
        train: train,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    })
});

  //variable names and database push
var database = firebase.database();
var index = 1
var train = ""
var destination = ""
var frequency = ""
// var nextArrival = ""
// var minutesAway = ""


database.ref().on("child_added",function(snapshot){
    // console.log(snapshot.val())
    createTrain(snapshot)

})

//connecting new data into table with function
function createTrain(data){
    train = data.val().train
    destination = data.val().destination
    frequency = data.val().frequency
    nextArrival = data.val().nextArrival
    minutesAway = data.val().minutesAway



    console.log(train, destination, frequency, nextArrival)
    var time = moment().diff(moment(frequency, "X"), "time");
    // console.log(time)
    var row = $("<tr>")
    // not sure if needed ->
    var indexTag = $("<td>").text("#" + index)
    var trainTag = $("<td>").text(train)
    var destinationTag = $("<td>").text(destination)
    var nextArrivalTag = $("<td>").text(nextArrival)
    var minutesAwayTag = $("<td>").text(minutesAway)
    // this is where it gets tricky, the math for the new times of trains
    var newTimeTag = $("<td>").text(time)
    var eta = frequency - parseInt(minutesAway)
    var etaTag = $("<td>").text(eta)
    index++

    var freq = parseInt(freq);
    

    var firstTimeConverted = moment(nextArrival, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % frequency;
    // console.log(tRemainder);
    var tMinutesTillTrain = frequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    $('#currentTime').text(currentTime);

    //appends each data into each data box
    row.append(indexTag)
    row.append(trainTag)
    row.append(destinationTag)
    row.append(nextArrivalTag)
    row.append(minutesAwayTag)
    row.append(nextTrain)
    row.append(newTimeTag)

    $("#trainTable").append(row) 
}
