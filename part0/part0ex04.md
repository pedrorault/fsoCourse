## Part0 - Exercise 0.4

![Form post Sequence Diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgRm9ybSBwb3N0CgpVc2VyIC0-IEJyb3dzZXI6IAAMBWFkZHMgY29tbWVudCB0byBmb3JtIHRleHQgZmllbGQAHxdjbGlja3MgU2F2ZSBidXR0b24KAFAHLT5TZXJ2ZXI6IEhUVFAgUE9TVCBodHRwczovL2Z1bGxzdGFjay1leGFtcGxlYXBwLmhlcm9rdWFwcC5jb20vbmV3X25vdGUKbm90ZSBvdmVyIABICFBhcnNlIHJlcXVlc3QsIFxuQ3JlYXRlIG5ldyAAKQVmcm9tAGsGaW5mbywgXG5BZGQgaQCBUgVkYXRhLmpzb25cblJldHVybnMgcmVkaXJlY3QgZG8gL25vdGVzCgCBNQYtLT4AghsJUgAeB3MgdG8AgRstAEsFAIF-FkdFAIFlLgCBBBdIVE1MLWNvZGUAIUZtYWluLmNzAIFxFAASCQAfSmoATxlqcwoAg3ILAIUkCUV4ZWN1dGUAHAggY29kZVxuUgCECAZzAINWCgCEAAZzAIR_BQCFAxEAgks0AIQxCQCEDBIAEQoAgRYbJ29ucmVhZHlzdGF0ZWNoYW5nZScgRXZlbnQgSGFuZGxlcgCFMwYAghAHXG5Qb3B1bGF0ZXMgdGhlAINhBSB3aXRoAIVfBXMAhV8GAIEKCgoK&s=default)

```
title Form post

User -> Browser: User adds comment to form text field
User -> Browser: User clicks Save button
Browser->Server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
note over Server: Parse request, \nCreate new note from POST info, \nAdd it to data.json\nReturns redirect do /notes
Server-->Browser: Redirects to https://fullstack-exampleapp.herokuapp.com/notes
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
Server-->Browser: HTML-code
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
Server-->Browser: main.css
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
Server-->Browser: main.js
note over Browser: Execute main.js code\nRequests data.json from server
Browser->Server:HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
Server-->Browser:data.json
note over Browser: Execute 'onreadystatechange' Event Handler from main.js\nPopulates the HTML with notes from data.json
```
