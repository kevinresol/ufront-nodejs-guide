package controller;

#if client
import api.react.ReactMacro.jsx;
#end

using ufront.MVC;

class HomeController extends Controller
{
	@post
	public function postInject()
	{
		ViewResult.globalValues['title'] = "Ufront with React";
	}
	
	/**
		Serves a main page.
		On server-side it renders nothing but only send an almost-empty layout html plus the client js app to browser.
		Then on client-side it will render the react components.
	**/
	@:route(GET, "/")
	public function main()
	{
		return new ReactResult(jsx('
			<div>
				<h3>Home</h3>
				<a href="/about" className="pushstate">About Me</a>
			</div>
		'));
	}
	
	/**
		Serves another page
	**/
	@:route(GET, "/about")
	public function about()
	{
		return new ReactResult(jsx('
			<div>
				<h3>About</h3>
				<a href="/" className="pushstate">Home Page</a>
			</div>
		'));
	}
	
	
	#if server
	// we are not going to do anything with jsx on server-side
	public static inline function jsx(_) return null;
	#end
}
