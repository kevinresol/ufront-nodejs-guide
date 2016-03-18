package model;

typedef UserData =
{
	username:String,
	password:String,
}

class UserManager extends js.npm.mongoose.macro.Manager<UserData,User> {}

@:schemaOptions({
	autoIndex: true
})
class User extends js.npm.mongoose.macro.Model<UserData> {}