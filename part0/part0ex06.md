## Part0 - Exercise 0.6

![Form post SPA Sequence Diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgU1BBIHBvc3QKClVzZXIgLT4gQnJvd3NlcjogAAwFYWRkcyBjb21tZW50IHRvIGZvcm0gdGV4dCBmaWVsZAAfF2NsaWNrcyBTYXZlIGJ1dHRvbgpub3RlIG92ZXIAVwpQYXJzZSByZXF1ZXN0IHZpYSBqYXZhc2NyaXB0XG5DcmVhdGUgbmV3IAA3BWFuZCBhcHBlbmQgaQCBBgV0aGUgZXhpc3RpbmcAHgVzXG5Vc2UAEwVmdW5jdGlvbiBSZWRyYXdOb3RlcyB0byByZS1yZW5kZXIATgZzZQAgBndpdGhvdXQgcmVsb2FkaW5nXG5TZW5kAHMKAGgHc2VydmVyCgCCHActPlMACwU6IEhUVFAgUE9TVCBodHRwczovL2Z1bGxzdGFjay1leGFtcGxlYXBwLmhlcm9rdWFwcC5jb20vbmV3X25vdGVfc3BhCg&s=default)

```
title SPA post

User -> Browser: User adds comment to form text field
User -> Browser: User clicks Save button
note over Browser: Parse request via javascript\nCreate new note and append it to the existing notes\nUse the function RedrawNotes to re-render note section without reloading\nSend new note to the server
Browser->Server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa

```
