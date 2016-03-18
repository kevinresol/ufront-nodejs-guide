package;

import api.*;
import ufront.tasks.UFTaskSet;
import model.User;
import model.Managers;

using ufront.MVC;
using tink.CoreApi;

class Tasks extends UFTaskSet
{
	static function main()
	{
		var tasks = new Tasks();
		
		// Inject our content directory in case we need to write to it.
		tasks.injector.map(String, "contentDirectory").toValue("../uf-content/");
		
		// init database
		Managers.init(tasks.injector);
		
		// Inject all our APIs.
		for (api in CompileTime.getAllClasses(UFApi)) tasks.injector.mapRuntimeTypeOf(api).toSingleton(api);
		
		// Use CLI logging, which prints both to a log file and to the CLI output.
		tasks.useCLILogging("logs/tasks.log");

		// Execute the task runner
		var args = Sys.args();
		tasks.execute(args);
		
	}
	
	@inject @:skip
	public var userManager:UserManager;
	
	/**
		Create a user in database
		
		Usage: node tasks.js --create-user
	**/
	public function createUser()
	{
		userManager.create({username: 'ufront', password: 'ufrontpw'}, function(err, user) {
			if(err != null) trace(err);
			Sys.exit(0);
		});
	}
}