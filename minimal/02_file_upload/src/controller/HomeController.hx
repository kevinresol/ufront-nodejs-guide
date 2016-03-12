package controller;

using ufront.MVC;

class HomeController extends Controller
{
	/**
		Serves the upload form
	**/
	@:route(GET, "/")
	public function main()
	{
		return new ViewResult({
			title: "Ufront NodeJS Guide",
		});
	}
	
	/**
		Handles the uploaded file.
	**/
	@:route(POST, "/upload")
	public function upload()
	{
		trace(context.request.post);
		trace(context.request.files.keys());
		var file = context.request.files['upload']; // use the form input name to retrieve the file
		if(file != null)
		{
			// save a copy of the file to disk, otherwise the temp uploaded file 
			// will be deleted at the end of the request
			file.writeToFile(context.contentDirectory + file.originalFileName);
		}
		
		// return a result
		return new JsonResult({
			success: file != null,
		});
	}
}