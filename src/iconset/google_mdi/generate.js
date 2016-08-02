var
    fs = require('fs'),
    rl = require('readline').createInterface({
	                                                                            input: fs.createReadStream('google_mdi_codepoints'),
	                                                                            output: process.stdout,
	                                                                            terminal: false,
    }),
    liga = [],
    content = [];

rl.on('line', function (line) {
	                                        var _split = line.split(' ');
	
	                                        liga.push(_split[0]);
	                                        content.push('&#x' + _split[1] + ';');
});

rl.on('close', function () {
	
	                                        var map = {};
	
	                                        liga.forEach(function (e, i, a) {
		                                        map[liga[i]] = content[i];
	});
	
	                                        fs.writeFile('mapfile_google_mdi.json', JSON.stringify(map, null, 4), function (err, data) {
		                                        if (err) {
			                                        return console.log(err);
		}
	});
	
});
