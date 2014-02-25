var util   = require('util')
, stream   = require('stream').Transform || require('readable-stream').Transform // stream 2 compatible
; 

 
// json string in and out
function JsonExpectedStream(expected) {
	var self = this;
 
	self.expected = expected;
  
	stream.call(self, { objectMode: true });
 
	self._transform = function (data, encoding, callback) {
		if (data && self.expected) {
			var json   = data.toString('utf8');
			var parsed = JSON.parse(json);
			var expected = {}
			for (var i in self.expected) {
				expected = (parsed[i]) ? parsed[i] : self.expected[i];
			}
			json = JSON.stringify(expected);
			data = new Buffer(json, 'utf8');
		}
		self.push(data);
		callback();
	};
}

 
util.inherits(JsonExpectedStream, stream);
 
module.exports = JsonExpectedStream;