// open database
// Create objectStore
// Make transactions
let db;

//To open a database
let openRequest = indexedDB.open("myDatabase");

// Event driven -> Listeners
openRequest.addEventListener("success", (e) => {
  console.log("DB success");
  db = openRequest.result;
});

openRequest.addEventListener("error", (e) => {
  console.log("DB Error");
});

openRequest.addEventListener("upgradeneeded", (e) => {
  console.log("DB upgraded and also for initial DB creation");
  db = openRequest.result;

  db.createObjectStore("video", { keyPath: "id"});
  db.createObjectStore("image", { keyPath: "id"});
});
