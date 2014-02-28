<img src="https://raw.github.com/angleman/json-expected-stream/master/logo.jpg" align="right" width="354px" />
# json-expected-stream 

Filter stream that enforces only selected JSON object strings exist and that they do exist. 


## Install

```bash
npm install json-expected-stream
```

## Usage

Sample ```logfile.json``` line:

```js
{"ip": "198.55.125.23", "timestamp":"2014-02-24 10:29:42", "url": "http:\/\/somedomain.com"}
```

```js
var fs                 = require('fs');
var logstream          = fs.createReadStream('logfile.json');
var split              = new require('split')();
var JsonExpectedStream = require('json-expected-stream');
var expectedStream     = new JsonExpectedStream([ "url", "city", "timestamp" ]);

logstream
.pipe(split)
.pipe(expectedStream)
.pipe(process.stdout) //  {"url": "http:\/\/somedomain.com", "city": null, "timestamp":"2014-02-24 10:29:42"}
```

## License 

### MIT
