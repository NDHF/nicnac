# nicnac
Command-line email reader

# OVERVIEW

nicnac stands for Nicnac Is Certainly Not A Client. It exists because I had gone through the 
process of setting up an email server on my Raspberry Pi, and was unable to connect to an e-mail client. 

As a temporary solution, I wrote this node.js script to loop through files in the Maildir/new directory,
and parse any emails that had been received since the last time I ran nicnac.

# USAGE

Before running nicnac, make sure the folder containing nicnac.js and the Maildir folder share the same
parent folder. 

Navigate to the nicnac folder, and run 'node nicnac.js'.

 
