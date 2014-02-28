// gh:angleman/json-expected-string
// MIT
var util   = require('util')
, stream   = require('stream').Transform || require('readable-stream').Transform // stream 2 compatible
; 


// json string in and out
function JsonExpectedStream(expected) {
	var self = this;

	stream.call(self, { objectMode: true });

	self._transform = function (data, encoding, callback) {
		if (data) {
			var json   = data.toString('utf8');
			var parsed = JSON.parse(json);
			var row = {}
			for (var i=0; i < expected.length; i++) {
				var nam = expected[i]
				row[nam] = (typeof parsed[nam] !== 'undefined') ? parsed[nam] : ''
			}
			json = JSON.stringify(row)
			data = new Buffer(json, 'utf8')
		}
		self.push(data);
		callback();
	};
}


util.inherits(JsonExpectedStream, stream);
module.exports = JsonExpectedStream;