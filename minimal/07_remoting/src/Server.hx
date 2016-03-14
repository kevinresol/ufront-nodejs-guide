package;

import api.ApiContext;
import controller.HomeController;
using ufront.MVC;

class Server
{
	static function main() 
	{
		var ufrontApp = new UfrontApplication({
			indexController: HomeController,
			remotingApi: ApiContext, // specify our remoting API context (interface)
			defaultLayout: "layout.html",
		});
		
		// listen for incoming connection at this port number
		ufrontApp.listen(2987);
	}
}