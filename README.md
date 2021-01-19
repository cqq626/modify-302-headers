please read issues about my problems

# server.js
```
// 1. http://localhost:3000: return a html with a image
// 2. http://localhost:3000/302: 302 redirect to http://localhost:3000
node server.js

// 1. http://localhost:3000: return a html with a image(with Link Header)
SCENE=withlink node server.js
```

# index.js
visit html with puppeteer
```
// 302 redirect
node index.js

// intercept 302 redirect request and return response
SCENE=intercept node index.js

// direct visit html(with Link Header)
SCENE=withlink node index.js
```
