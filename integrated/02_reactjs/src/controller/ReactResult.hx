package controller;

using ufront.MVC;
using tink.CoreApi;

#if client

import api.react.ReactMacro.jsx;
import api.react.ReactDOM;
import react.App;

/**
	We need a way to trigger a re-render in our react app.
	Here we use a PartialViewResult with ClientAction to do that.
**/
abstract ReactResult(AddClientActionResult<PartialViewResult, RenderPageActionData>) to AddClientActionResult<PartialViewResult, RenderPageActionData>
{
	public function new(content:Dynamic)
		this = new PartialViewResult({}, "../empty.html").addClientAction(RenderPageAction, {content: content});
}

class RenderPageAction extends UFClientAction<RenderPageActionData>
{
	override public function execute(httpContext:HttpContext, ?data:RenderPageActionData)
	{
		// store the current injector for use in react components
		Client.injector = httpContext.injector;
		
		// create and mount the react app if not yet done so
		if(Client.reactApp == null) Client.reactApp = cast ReactDOM.render(jsx('<App/>'), js.Browser.document.getElementById("app"));
		
		// set the contents
		Client.reactApp.setState({content: data.content});
	}
}

typedef RenderPageActionData = 
{
	content:Dynamic,
}

#else

// on server-side it is just a plain view result
abstract ReactResult(PartialViewResult) to PartialViewResult
{
	public inline function new(_)
		this = new PartialViewResult({}, "../empty.html");
}

#end