var express = require('express');
var app = express();
var path = require('path');
// var php = require('node-php');
var nodemailer = require('nodemailer'),
	parser = require('body-parser'),
	util = require('util'),
	validator = require('express-validator');

var smtpTransport = require('nodemailer-smtp-transport');




//var execPHP = require('./execphp.js')
app.use(express.static('public'))
app.use('/', express.static(path.join(__dirname, 'public')))
//app.use("/", php.cgi('/path/to/execphp.js')); 

//var execPHP = require('./execphp.js')();

//execPHP.phpFolder = '';

// app.use('*.php',function(request,response,next) {
// 	// execPHP.parseFile(request.originalUrl,function(phpResult) {
// 	// 	response.write(phpResult);
// 	// 	response.end();
// 	// });
// });

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(validator());
 
// Email transporter configuration
// var transporter = nodemailer.createTransport({
//     host: 'lema.franklin93@gmail.com', //smtp.gmail.com
//     port: 465,  // secure:true for port 465, secure:false for port 587
//     secure: true,
//     auth: {
//         user: 'lema.franklin93',
//         pass: 'Yoodanja12',
//     }
// });

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'lemafranklin89@gmail.com',
//     pass: 'Yoodanja12'
//   }
// });

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'lemafranklin89@gmail.com',
    pass: 'Yoodanja12?'
  }
}));
 
// Route
app.post('/email/send', function(request, response){
	console.log ("yuyu");
	console.log (request.body);

	var body = request.body;
 
	request.checkBody('email', 'Please enter email address').notEmpty();
	request.checkBody('email', 'Please enter valid email address').isEmail();
	request.checkBody('subject', 'Please enter subject').notEmpty();
	request.checkBody('message', 'Please enter messaage').notEmpty();
 
	request.getValidationResult().then(function(result) {
		console.log ("r"+ result);
		if (!result.isEmpty()) {
			var arrResponse = {'status':'error', 'data':util.inspect(result.array())}
			response.status(200).send(JSON.stringify(arrResponse));
		} else {
			var mailOptions = {
				from: body.email,
				to: 'Franklin.Lema93@myhunter.cuny.edu',
				subject: body.subject,
				text: "Portfolio message: "+'\n'+
					   "Sender:" +body.name+'\n'+
					   "email: " + body.email+'\n'+
					   "Message: " + body.message
		};

			// var params = {
			//     from: '"Gopal Joshi " <notify@sgeek.org>',
			//     to: body.email,
			//     subject: body.subject,
			//     html: body.message
			// };
			console.log ("p"+ mailOptions);
			console.log (transporter);

			transporter.sendMail(mailOptions, (mailError, mailReponse) => {
			    if (mailError) {
			        var arrResponse = {'status':'failure', 'error': mailError};
			    	console.log ("err"+ mailError);
			} else {
			    	var arrResponse = {'status':'success', 'data': mailReponse.accepted};
					console.log ("succ"+ arrResponse);
			}

			//response.redirect('back');
			response.redirect('/index.html');
			//response.
			//response.status(200).send(JSON.stringify(arrResponse));
			});
		}
	});
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT} 00`);
});