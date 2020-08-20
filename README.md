# nicnac
Command-line email reader

# OVERVIEW

nicnac stands for Nicnac Is Certainly Not A Client. It exists because I had gone through the 
process of setting up an email server on my Raspberry Pi, and was unable to connect to an e-mail client. 

As a temporary solution, I wrote this node.js script to loop through files in the Maildir/new directory,
and parse any emails that had been received since the last time I ran nicnac.

# SETUP

Before running nicnac.js, be sure to create a file called lastchecked.txt. You may leave the file empty
to start off with.

# USAGE

Before running nicnac, make sure the folder containing nicnac.js and the Maildir folder share the same
parent folder. 

Navigate to the nicnac folder, and run 'node nicnac.js'.

This script only works for plain-text emails, and attachments are out, naturally.

# WHAT IS DISPLAYED

nicnac will parse the text of an email file, and return the following information: date, from (who sent 
the email), the subject line, and the body. The body of the email is identified by specific strings of 
characters within the file, signaling the start and end of the relevant text. 

# FILTERS

nicnac will filter any emails of 10 Kilobytes or larger. The script reads image files as a base64 string, 
so opening an email with a 4 Megabyte image will look like Matrix code rain. nicnac should return the filename 
of any email of 10K or larger, so these files can be opened manually in the text editor of your choice. 
10K should be plenty for any plain-text email.

# CURRENT FUNCTIONALITY

nicnac has so far read emails from Gmail, Yahoo Mail, iPhone Mail. It has also read emails sent from text messaging
applications. Interestingly, text messages seem to include the body of the message in the subject line.

# TODO

- Add parsing functionality for different email applications.

- Add more filtering options to restrict spam. 
