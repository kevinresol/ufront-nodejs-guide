package;

import controller.HomeController;
using ufront.MVC;

class Server
{
	static function main() 
	{
		// prepare the temp file upload middleware, which will save the uploaded
		// to a temp location, and delete it when the request ends
		var uploadMiddleware = new TmpFileUploadMiddleware();
		
		var ufrontApp = new UfrontApplication({
			indexController: HomeController, // all incoming requests will be handled by this controller
			defaultLayout: "layout.html", // use this file as the default layout for a ViewResult
			requestMiddleware: [uploadMiddleware], // handle the uploaded file when a request comes
			responseMiddleware: [uploadMiddleware], // make it a response middleware so that it will delete the temp file
		});
		
		// listen for incoming connection at this port number
		ufrontApp.listen(2987);
	}
}