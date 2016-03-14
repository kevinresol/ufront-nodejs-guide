package auth;

using ufront.MVC;

class User implements UFAuthUser
{
	// required by the interface
	public var userID(get, never):String;
	
	// actually stores the user id
	var userId:String;
	
	public function new(userId:String)
	{
		this.userId = userId;
	}
	
	// required by the interface
	public function can(?permission:EnumValue, ?permissions:Iterable<EnumValue>):Bool
	{
		// for minimal demonstration purpose, here simply returns true to allow all permissions.
		// in reality, you should implement your own logic (e.g. query database, etc)
		// to determine if an user is "can" do the specified permissions
		return true;
	}
	
	function get_userID() return userId;
}