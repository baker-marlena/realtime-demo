// configure the Firebase database
var config = {
    apiKey: YOUR VALUE HERE,
    databaseURL: YOUR URL HERE
  };

// initalize the database
firebase.initializeApp(config);

// create a reference to the database
const database = firebase.database();

$("#create-button").click(sessionStart);
$("#join-button").click(sessionJoin);

function sessionStart(){
  event.preventDefault();
  let sessionKey = $("#create-session").val();
  // create a reference to the current session
  let currentSession = database.ref(sessionKey);
  sessionCreate(currentSession);
  setupPage("user_1", currentSession);
  listenToOther("user_2", currentSession);
}

// set that new session with the nested data for it
function sessionCreate (sessionKey) {
  sessionKey.set({
    user_1:{
      textInput:""
    },
    user_2:{
      textInput:""
    }
  })
}

function sessionJoin (){
  event.preventDefault();
  // by referencing the same session name, the second user shares that data
  let currentSession = database.ref($("#join-session").val());
  setupPage("user_2", currentSession);
  listenToOther("user_1", currentSession)
}

// update the database with every key up
function setupPage (user, currentSession) {
  $("#typing-area").keyup(function () {
    currentSession.child(user).update({textInput:this.value})
  })
}

// listen to the datatabase for any changes in the other user's input and display that on the page, in real time
function listenToOther (otherUser, currentSession) {
    currentSession.child(otherUser).child("textInput").on('value', (snapshot) =>{
          $("#viewing-space").text(snapshot.val());
        })
}
