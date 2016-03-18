package model;

// schema for our User model in database
typedef UserData =
{
	username:String,
	password:String,
}

// collection manager
class UserManager extends js.npm.mongoose.macro.Manager<UserData,User> {}

@:schemaOptions({
	autoIndex: true
})
class User extends js.npm.mongoose.macro.Model<UserData> {}