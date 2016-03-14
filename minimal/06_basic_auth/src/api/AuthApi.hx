package api;

import auth.Auth;

using ufront.MVC;
using tink.CoreApi;

class AuthApi extends UFApi
{
	public function login(username:String, password:String):Surprise<Noise, Error>
	{
		// check the username and password,
		// (note: in reality you should probably check against the database instead of hardcoding like this)
		if(username == 'ufront' && password == 'ufrontpw')
		{
			// cast the auth interface into our implementation
			var authImplementation = Std.instance(auth, Auth);
			
			// initialize our auth handler
			authImplementation.init(username);
		}
		
		// our simple authentication logic example here is a sync operation.
		// in reality, you may want to query the database or do other async operations,
		// in that case you can return a "real" future instead of a "sync future"
		// as what I am doing here.
		return Future.sync(Success(Noise)); 
	}
}