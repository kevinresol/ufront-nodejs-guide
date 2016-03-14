package auth;

using ufront.MVC;

class Auth implements UFAuthHandler
{
	// required by the interface
	public var currentUser(get, never):UFAuthUser;
	
	// actually stores the user;
	var _currentUser:User;
	
	// initialize our auth handler with an user id,
	// this user id should be the result of some authentication (e.g. username/password)
	public function init(userId:String)
	{
		_currentUser = new User(userId);
	}
	
	// required by the interface
	public function hasPermission (permission:EnumValue):Bool
	{
		return isLoggedIn() && _currentUser.can(permission);
	}
	
	// required by the interface
	public function hasPermissions (permissions:Iterable<EnumValue>):Bool
	{
		return isLoggedIn() && _currentUser.can(permissions);
	}
	
	// required by the interface
	public function isLoggedIn():Bool
	{
		return _currentUser != null;
	}
	
	// required by the interface
	public function isLoggedInAs(user:UFAuthUser):Bool
	{
		return isLoggedIn() && _currentUser.userID == user.userID;
	}
	
	// required by the interface
	public function requireLogin ():Void
	{
		if(!isLoggedIn()) throw HttpError.authError(ANotLoggedIn);
	}
	
	// required by the interface
	public function requireLoginAs (user:UFAuthUser):Void
	{
		if(!isLoggedInAs(user)) throw HttpError.authError(ANotLoggedInAs(user));
	}
	
	// required by the interface
	public function requirePermission (permission:EnumValue):Void
	{
		if(!hasPermission(permission)) throw HttpError.authError(ANoPermission(permission));
	}
	
	// required by the interface
	public function requirePermissions (permissions:Iterable<EnumValue>):Void
	{
		for(permission in permissions) if(!hasPermission(permission)) throw HttpError.authError(ANoPermission(permission));
	}
	
	// required by the interface
	public function toString ():String
	{
		return "Auth";
	}
	
	function get_currentUser() return _currentUser;
}