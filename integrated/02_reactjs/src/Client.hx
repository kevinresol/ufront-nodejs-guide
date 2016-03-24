package;

import controller.HomeController;
import minject.Injector;
import react.App;
using ufront.MVC;

class Client
{
	public static var reactApp:App;
	public static var ufrontApp:ClientJsApplication;
	public static var injector:Injector;
	
	static function main() 
	{
		ufrontApp = new ClientJsApplication({
			indexController: HomeController,
			defaultLayout: "layout.html",
		});
		
		// Listen to any history changes using PushState, and process each request.
		ufrontApp.listen();
		
		// trigger the initial render
		ufrontApp.executeRequest();
	}
}