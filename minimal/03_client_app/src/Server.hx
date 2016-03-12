package;

import controller.HomeController;
using ufront.MVC;

class Server
{
	static function main() 
	{
		var ufrontApp = new UfrontApplication({
			indexController: HomeController, // all incoming requests will be handled by this controller
			defaultLayout: "layout.html", // use this file as the default layout for a ViewResult
		});
		
		// listen for incoming connection at this port number
		ufrontApp.listen(2987);
	}
}