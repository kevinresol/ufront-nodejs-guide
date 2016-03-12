package;

import controller.HomeController;
using ufront.MVC;

class Client
{
	static function main() 
	{
		var ufrontApp = new ClientJsApplication({
			indexController: HomeController,
			defaultLayout: "layout.html",
		});
		
		// Listen to any history changes using PushState, and process each request.
		ufrontApp.listen();
	}
}