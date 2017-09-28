/**
*
*/
class ExecPHP {
	/**
	*
	*/
	constructor() {
		this.phpPath = 'C:\\Users\\Martin\\Desktop\\Dropbox\\Mediumprojects\\phpinnode\\php\\php.exe';
		this.phpFolder = '';
	}	
	/**
	*
	*/
	parseFile(fileName,callback) {
		var realFileName = this.phpFolder + fileName;
		
		console.log('parsing file: ' + realFileName);

		var exec = require('child_process').exec;
		var cmd = this.phpPath + ' ' + realFileName;
		
		exec(cmd, function(error, stdout, stderr) {
			callback(stdout);
		});
		console.log("lit"); 
	}
	
}
console.log("lit2"); 
module.exports = function() {
	return new ExecPHP();
};