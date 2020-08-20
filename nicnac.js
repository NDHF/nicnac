const fs = require("fs");

let command = process.argv[2];
//console.log(command);

let date = new Date();
let currentTime = date.getTime();

let lastchecked = parseInt(fs.readFileSync("./lastchecked.txt",
    {encoding: "utf8", flag:"r"}));

fs.readdir("../Maildir/new/", function (err, emails) {
   let numberOfEmails = 0;
   let counter = 0;
   function parseEmail(emailLine) {
       if (emailLine.slice(0, 14) === "Return-Path: <") {
           console.log("FROM: " + emailLine.slice(14, emailLine.length - 1));
       } else if (emailLine.slice(0, 8) === "Subject:") {
           console.log("SUBJECT: " + emailLine.slice(9));
       } else if (emailLine.slice(0, 5) === "Date:") {
           console.log("DATE: " + emailLine.slice(6));
       } else if ((emailLine.slice(0, 5) === "--000") ||
           (emailLine.slice(0, 23) === "X-Mailer: iPhone Mail (") ||
           (emailLine.slice(0, 8) === "------=_")) {
           if (counter === 0) {
               counter = 1;
           } else if (counter === 1) {
               counter = 0;
           }
       } else {
           if ((counter === 1) &&
               (emailLine.slice(0, 13) !== "Content-Type:")) {
                   console.log(emailLine);
           }
       }
   }
   function displayEmail(email) {
       //    E-MAILS INCLUDE TIME SINCE UNIX EPOCH IN THE FILE NAME
       // THIS VALUE MUST BE MULTIPLIED BY 1000 TO CONVERT TIME TO 
       // MILLISECONDS
       let emailSent = (parseInt(email.split(".")[0]) * 1000);
       //     UNCOMMENT THE LINE BELOW, AND COMMENT THE LINE AFTER, 
       // TO ENABLE TESING BY SHOWING ALL EMAILS
       //if (1 === 1) {
       if (emailSent > lastchecked) {
           let fileSize = fs.statSync("../Maildir/new/" + email).size;
           // FILTER LARGE EMAILS, IMAGES DISPLAY AS MATRIX CODE RAIN
           if (fileSize > 9999) {
                console.log(
                "\n" +
                "THE E-MAIL " + email + "IS MORE THAN 10 KB. IT MAY CONTAIN AN IMAGE. " +
                "\n" +
                "REVIEW THE E-MAIL IN A TEXT EDITOR" +
                 "\n" +
                 "\n" +
                 "****" +
                 "\n"
                );
           } else {
               fs.readFile("../Maildir/new/" + email, "UTF-8", function (err, data) {
                  if (err) throw err;
                  //console.log(data);
                  data = data.split("\n");
                  //console.log(data);
                  counter = 0;
                  data.forEach(parseEmail);
                  console.log("\n");
                  console.log("* * * * *");
                  console.log("\n");
               });
           }
           numberOfEmails += 1;
        }
   }

   setTimeout(function () {
     emails.forEach(displayEmail);
   }, 1000);
   setTimeout(function () {
     let emailMessage = "";
     if (numberOfEmails === 0) {
         console.log("NO NEW EMAILS.");
     } else if (numberOfEmails === 1) {
         console.log("ONE NEW EMAIL.");
     } else if (numberOfEmails > 1) {
         console.log("THERE ARE " + numberOfEmails + " NEW EMAILS.");
     } else {
         console.log("THERE WAS A PROBLEM IN DETERMINING THE NUMBER OF NEW EMAILS.");
     }
   }, 2000);
   fs.writeFile("./lastchecked.txt", currentTime, (err) => {
       if (err) {
         console.log(err)
       }
   });
});
