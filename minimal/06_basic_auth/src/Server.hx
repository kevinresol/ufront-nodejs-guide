package;

import auth.Auth;
import controller.HomeController;
using ufront.MVC;

class Server
{
	static function main() 
	{
		var ufrontApp = new UfrontApplication({
			indexController: HomeController,
			defaultLayout: "layout.html",
			authImplementation: Auth, // specify our auth implementation
		});
		
		// listen for incoming connection at this port number
		ufrontApp.listen(2987);
	}
}