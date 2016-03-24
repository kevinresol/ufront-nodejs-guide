package react;

import api.react.ReactMacro.jsx;
import api.react.ReactComponent;
import js.html.*;

using ufront.MVC;
using tink.CoreApi;

class App extends ReactComponentOfState<{?content:ReactComponent}>
{
	@inject
	public var ctx:HttpContext;
	
	public function new(props)
	{
		super(props);
		
		Client.injector.injectInto(this); // get our injections
		
		// initialize a state
		state = {}
	}
	
	override function render()
	{
		// just a proof-of-concept that you can really get the injected variables
		// basically you can inject anything here, e.g. remoting API, etc
		trace(ctx.auth.isLoggedIn());
		
		return jsx('
			<div>
				{state.content}
				<p>
					Note that when you click on the link above, the page is re-rendered by js (react), <br/>
					so that it is a single-page-app (SPA). But when you enter the URL directly <br/>
					(e.g. http://localhost:2987/about), you will still get the same result, because the <br/>
					the page is prepared on client-side (by ufrontApp.executeRequest() in Client.hx)
				</p>
			</div>
		');
	}
}

