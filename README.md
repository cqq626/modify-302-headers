# server.js
1. http://localhost:3000: return a html with a image
2. http://localhost:3000/302: 302 redirect to http://localhost:3000

# index.js
visit http://localhost:3000/302 with puppeteer
```
// direct visit node.js
node index.js

// intercept http://localhost:3000/302 request and return response
SCENE=intercept node index.js
```