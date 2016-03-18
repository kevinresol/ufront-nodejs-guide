package;

import auth.Auth;
import auth.AuthMiddleware;
import controller.HomeController;
import model.Managers;

using ufront.MVC;

class Server
{
	static function main() 
	{
		var ufrontApp = new UfrontApplication({
			indexController: HomeController,
			defaultLayout: "layout.html",
			authImplementation: Auth, // specify our auth implementation
			requestMiddleware: [new AuthMiddleware()], // our auth middleware will check, when a request arrives, for a login access token
		});
		
		// init database
		Managers.init(ufrontApp.injector);
		
		// listen for incoming connection at this port number
		ufrontApp.listen(2987);
	}
}