## Part0 - Exercise 0.5

![SPA Sequence Diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgU2luZ2xlIFBhZ2UgQXBwbGljYXRpb24KCkJyb3dzZXItPlNlcnZlcjogSFRUUCBHRVQgaHR0cHM6Ly9mdWxsc3RhY2stZXhhbXBsZWFwcC5oZXJva3VhcHAuY29tL3NwYQoAOgYtLT4ASwc6IEhUTUwtY29kZQAfRm1haW4uY3NzAFcTABIJAIEGSC5qAFMUABIHbm90ZSBvdmVyIACBYglFeGVjdXRlABsHIGNvZGVcblJlcXVlc3RzIGRhdGEuanNvbiBmcm9tIHMAgmUFAIJpEQCCRTQAUQkAgm0SABEKAIEVGydvbnJlYWR5c3RhdGVjaGFuZ2UnIEV2ZW50IEhhbmRsZXIAgSwHAIIOBVxuUG9wdWxhdGVzIHRoZQCDXAUgd2l0aCBSZWRyYXdOb3RlcyBmdW5jdGlvbg&s=default)

```
title Single Page Application

Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa
Server-->Browser: HTML-code
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
Server-->Browser: main.css
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa.js
Server-->Browser: spa.js
note over Browser: Execute spa.js code\nRequests data.json from server
Browser->Server:HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
Server-->Browser:data.json
note over Browser: Execute 'onreadystatechange' Event Handler from spa.js\nPopulates the HTML with RedrawNotes function
```