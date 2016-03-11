(function (console, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var CompileTime = function() { };
$hxClasses["CompileTime"] = CompileTime;
CompileTime.__name__ = ["CompileTime"];
var CompileTimeClassList = function() { };
$hxClasses["CompileTimeClassList"] = CompileTimeClassList;
CompileTimeClassList.__name__ = ["CompileTimeClassList"];
CompileTimeClassList.get = function(id) {
	if(CompileTimeClassList.lists == null) CompileTimeClassList.initialise();
	return CompileTimeClassList.lists.get(id);
};
CompileTimeClassList.getTyped = function(id,type) {
	return CompileTimeClassList.get(id);
};
CompileTimeClassList.initialise = function() {
	CompileTimeClassList.lists = new haxe_ds_StringMap();
	var m = haxe_rtti_Meta.getType(CompileTimeClassList);
	if(m.classLists != null) {
		var _g = 0;
		var _g1 = m.classLists;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			var array = item;
			var listID = array[0];
			var list = new List();
			var _g2 = 0;
			var _g3 = array[1].split(",");
			while(_g2 < _g3.length) {
				var typeName = _g3[_g2];
				++_g2;
				var type = Type.resolveClass(typeName);
				if(type != null) list.push(type);
			}
			CompileTimeClassList.lists.set(listID,list);
		}
	}
};
var DateTools = function() { };
$hxClasses["DateTools"] = DateTools;
DateTools.__name__ = ["DateTools"];
DateTools.delta = function(d,t) {
	var t1 = d.getTime() + t;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedRight: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			return b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.add(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.add(HxOverrides.substr(s,offset,p.pos - offset));
			buf.add(f(this));
			if(p.len == 0) {
				buf.add(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.add(HxOverrides.substr(s,offset,null));
		return buf.b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
Lambda.find = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(f(v)) return v;
	}
	return null;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	head: null
	,val: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Server = function() { };
$hxClasses["Server"] = Server;
Server.__name__ = ["Server"];
Server.main = function() {
	var ufrontApp = new ufront_app_UfrontApplication({ indexController : controller_HomeController, defaultLayout : "layout.html"});
	ufrontApp.listen(2987);
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.instance = function(value,c) {
	if((value instanceof c)) return value; else return null;
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var ufront_web_Controller = function() {
};
$hxClasses["ufront.web.Controller"] = ufront_web_Controller;
ufront_web_Controller.__name__ = ["ufront","web","Controller"];
ufront_web_Controller.prototype = {
	context: null
	,baseUri: null
	,injectContext: function(context) {
		this.context = context;
		var uriPartsBeforeRouting = context.actionContext.get_uriParts();
		var remainingUri = haxe_io_Path.addTrailingSlash(uriPartsBeforeRouting.join("/"));
		var fullUri = haxe_io_Path.addTrailingSlash(context.getRequestUri());
		this.baseUri = "~" + haxe_io_Path.addTrailingSlash(HxOverrides.substr(fullUri,0,fullUri.length - remainingUri.length));
	}
	,execute: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(ufront_web_HttpError.internalServerError("Field execute() in ufront.web.Controller is an abstract method, please override it in " + this.toString() + " ",null,{ fileName : "Controller.hx", lineNumber : 219, className : "ufront.web.Controller", methodName : "execute"})));
	}
	,executeSubController: function(controller) {
		return this.context.injector._instantiate(controller).execute();
	}
	,toString: function() {
		return Type.getClassName(js_Boot.getClass(this));
	}
	,ufTrace: function(msg,pos) {
		if(this.context != null) this.context.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MTrace}); else haxe_Log.trace("" + Std.string(msg),pos);
	}
	,ufLog: function(msg,pos) {
		if(this.context != null) this.context.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MLog}); else haxe_Log.trace("Log: " + Std.string(msg),pos);
	}
	,ufWarn: function(msg,pos) {
		if(this.context != null) this.context.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MWarning}); else haxe_Log.trace("Warning: " + Std.string(msg),pos);
	}
	,ufError: function(msg,pos) {
		if(this.context != null) this.context.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MError}); else haxe_Log.trace("Error: " + Std.string(msg),pos);
	}
	,wrapResult: function(result,wrappingRequired) {
		if(result == null) {
			var actionResult = new ufront_web_result_EmptyResult(true);
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(actionResult));
		} else {
			var future;
			if((wrappingRequired & 1 << ufront_web_result_ResultWrapRequired.WRFuture[1]) != 0) future = this.wrapInFuture(result); else future = result;
			var surprise;
			if((wrappingRequired & 1 << ufront_web_result_ResultWrapRequired.WROutcome[1]) != 0) surprise = this.wrapInOutcome(future); else surprise = future;
			var finalResult;
			if((wrappingRequired & 1 << ufront_web_result_ResultWrapRequired.WRResultOrError[1]) != 0) finalResult = this.wrapResultOrError(surprise); else finalResult = surprise;
			return finalResult;
		}
	}
	,wrapInFuture: function(result) {
		return tink_core__$Future_Future_$Impl_$.sync(result);
	}
	,wrapInOutcome: function(future) {
		return tink_core__$Future_Future_$Impl_$.map(future,function(result) {
			return tink_core_Outcome.Success(result);
		});
	}
	,wrapResultOrError: function(surprise) {
		return tink_core__$Future_Future_$Impl_$.map(surprise,function(outcome) {
			switch(outcome[1]) {
			case 0:
				var result = outcome[2];
				return tink_core_Outcome.Success(ufront_web_result_ActionResult.wrap(result));
			case 1:
				var error = outcome[2];
				return tink_core_Outcome.Failure(ufront_web_HttpError.wrap(error,null,{ fileName : "Controller.hx", lineNumber : 308, className : "ufront.web.Controller", methodName : "wrapResultOrError"}));
			}
		});
	}
	,setContextActionResultWhenFinished: function(result) {
		var _g = this;
		result(function(outcome) {
			switch(outcome[1]) {
			case 0:
				var ar = outcome[2];
				_g.context.actionContext.actionResult = ar;
				break;
			default:
			}
		});
	}
	,__class__: ufront_web_Controller
};
var controller_HomeController = function() {
	ufront_web_Controller.call(this);
};
$hxClasses["controller.HomeController"] = controller_HomeController;
controller_HomeController.__name__ = ["controller","HomeController"];
controller_HomeController.__super__ = ufront_web_Controller;
controller_HomeController.prototype = $extend(ufront_web_Controller.prototype,{
	main: function() {
		return new ufront_web_result_ViewResult(ufront_view__$TemplateData_TemplateData_$Impl_$.setObject((function($this) {
			var $r;
			var obj = { };
			$r = obj != null?obj:{ };
			return $r;
		}(this)),{ title : "Ufront NodeJS Guide", message : "Welcome to Ufront!"}));
	}
	,json: function() {
		return new ufront_web_result_JsonResult({ title : "Ufront NodeJS Guide", message : "Welcome to Ufront!"});
	}
	,redirect: function() {
		return new ufront_web_result_RedirectResult("/");
	}
	,file: function() {
		return new ufront_web_result_FilePathResult("package.json");
	}
	,execute: function() {
		var uriParts = this.context.actionContext.get_uriParts();
		var params = this.context.request.get_params();
		var method = this.context.request.get_httpMethod();
		this.context.actionContext.controller = this;
		this.context.actionContext.action = "execute";
		try {
			if(method.toLowerCase() == "get" && 0 == uriParts.length) {
				this.context.actionContext.action = "main";
				this.context.actionContext.args = [];
				this.context.actionContext.get_uriParts().splice(0,0);
				var wrappingRequired;
				var i = haxe_rtti_Meta.getFields(controller_HomeController).main.wrapResult[0];
				wrappingRequired = i;
				var result = this.wrapResult(this.main(),wrappingRequired);
				this.setContextActionResultWhenFinished(result);
				return result;
			} else if(method.toLowerCase() == "get" && 1 == uriParts.length && uriParts[0] == "json") {
				this.context.actionContext.action = "json";
				this.context.actionContext.args = [];
				this.context.actionContext.get_uriParts().splice(0,1);
				var wrappingRequired1;
				var i1 = haxe_rtti_Meta.getFields(controller_HomeController).json.wrapResult[0];
				wrappingRequired1 = i1;
				var result1 = this.wrapResult(this.json(),wrappingRequired1);
				this.setContextActionResultWhenFinished(result1);
				return result1;
			} else if(method.toLowerCase() == "get" && 1 == uriParts.length && uriParts[0] == "redirect") {
				this.context.actionContext.action = "redirect";
				this.context.actionContext.args = [];
				this.context.actionContext.get_uriParts().splice(0,1);
				var wrappingRequired2;
				var i2 = haxe_rtti_Meta.getFields(controller_HomeController).redirect.wrapResult[0];
				wrappingRequired2 = i2;
				var result2 = this.wrapResult(this.redirect(),wrappingRequired2);
				this.setContextActionResultWhenFinished(result2);
				return result2;
			} else if(method.toLowerCase() == "get" && 1 == uriParts.length && uriParts[0] == "file") {
				this.context.actionContext.action = "file";
				this.context.actionContext.args = [];
				this.context.actionContext.get_uriParts().splice(0,1);
				var wrappingRequired3;
				var i3 = haxe_rtti_Meta.getFields(controller_HomeController).file.wrapResult[0];
				wrappingRequired3 = i3;
				var result3 = this.wrapResult(this.file(),wrappingRequired3);
				this.setContextActionResultWhenFinished(result3);
				return result3;
			}
			throw new js__$Boot_HaxeError(ufront_web_HttpError.pageNotFound({ fileName : "HomeController.hx", lineNumber : 5, className : "controller.HomeController", methodName : "execute"}));
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return ufront_core_SurpriseTools.asSurpriseError(e,"Uncaught error while executing " + Std.string(this.context.actionContext.controller) + "." + this.context.actionContext.action + "()",{ fileName : "HomeController.hx", lineNumber : 5, className : "controller.HomeController", methodName : "execute"});
		}
	}
	,__class__: controller_HomeController
});
var express_Express = require("express");
var express__$Next_Next_$Impl_$ = {};
$hxClasses["express._Next.Next_Impl_"] = express__$Next_Next_$Impl_$;
express__$Next_Next_$Impl_$.__name__ = ["express","_Next","Next_Impl_"];
express__$Next_Next_$Impl_$.call = function(this1) {
	this1();
};
express__$Next_Next_$Impl_$.error = function(this1,err) {
	this1(err);
};
express__$Next_Next_$Impl_$.route = function(this1) {
	this1("route");
};
var haxe_StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe_CallStack;
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	if(e == null) return [];
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) site = haxe_CallStack.wrapCallSite(site);
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.callStack = function() {
	try {
		throw new Error();
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		var a = haxe_CallStack.getStack(e);
		a.shift();
		return a;
	}
};
haxe_CallStack.exceptionStack = function() {
	return haxe_CallStack.getStack(haxe_CallStack.lastException);
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function"?haxe_StackItem.LocalFunction():meth == "Global code"?null:haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe_StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = ["haxe","Http"];
haxe_Http.prototype = {
	url: null
	,responseData: null
	,async: null
	,postData: null
	,headers: null
	,params: null
	,req: null
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				haxe_CallStack.lastException = e;
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			haxe_CallStack.lastException = e1;
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	high: null
	,low: null
	,__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe_Serializer;
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.run = function(v) {
	var s = new haxe_Serializer();
	s.serialize(v);
	return s.toString();
};
haxe_Serializer.prototype = {
	buf: null
	,cache: null
	,shash: null
	,scount: null
	,useCache: null
	,useEnumIndex: null
	,toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var i1;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						i1 = _g1_val;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(d.getTime());
					break;
				case haxe_ds_StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(__map_reserved[k] != null?v4.getReserved(k):v4.h[k]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.h[k1]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe_Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(js_Boot.__instanceof(v,Class)) {
					var className = Type.getClassName(v);
					this.buf.b += "A";
					this.serializeString(className);
				} else if(js_Boot.__instanceof(v,Enum)) {
					this.buf.b += "B";
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.b += "o";
					this.serializeFields(v);
				}
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,serializeException: function(e) {
		this.buf.b += "x";
		this.serialize(e);
	}
	,__class__: haxe_Serializer
};
var haxe__$Template_TemplateExpr = $hxClasses["haxe._Template.TemplateExpr"] = { __ename__ : ["haxe","_Template","TemplateExpr"], __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] };
haxe__$Template_TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
haxe__$Template_TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe__$Template_TemplateExpr; $x.toString = $estr; return $x; };
var haxe_Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw new js__$Boot_HaxeError("Unexpected '" + Std.string(tokens.first().s) + "'");
};
$hxClasses["haxe.Template"] = haxe_Template;
haxe_Template.__name__ = ["haxe","Template"];
haxe_Template.prototype = {
	expr: null
	,context: null
	,macros: null
	,stack: null
	,buf: null
	,execute: function(context,macros) {
		if(macros == null) this.macros = { }; else this.macros = macros;
		this.context = context;
		this.stack = new List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,resolve: function(v) {
		if(Object.prototype.hasOwnProperty.call(this.context,v)) return Reflect.field(this.context,v);
		var _g_head = this.stack.h;
		var _g_val = null;
		while(_g_head != null) {
			var ctx;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			ctx = _g_val;
			if(Object.prototype.hasOwnProperty.call(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe_Template.globals,v);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe_Template.splitter.match(data)) {
			var p = haxe_Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe_Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			var params = [];
			var part = "";
			while(true) {
				var c = HxOverrides.cca(data,parp);
				parp++;
				if(c == 40) npar++; else if(c == 41) {
					npar--;
					if(npar <= 0) break;
				} else if(c == null) throw new js__$Boot_HaxeError("Unclosed macro parenthesis");
				if(c == 44 && npar == 1) {
					params.push(part);
					part = "";
				} else part += String.fromCharCode(c);
			}
			params.push(part);
			tokens.add({ p : haxe_Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) tokens.add({ p : data, s : true, l : null});
		return tokens;
	}
	,parseBlock: function(tokens) {
		var l = new List();
		while(true) {
			var t = tokens.first();
			if(t == null) break;
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
			l.add(this.parse(tokens));
		}
		if(l.length == 1) return l.first();
		return haxe__$Template_TemplateExpr.OpBlock(l);
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe__$Template_TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0;
			var _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe__$Template_TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw new js__$Boot_HaxeError("Unclosed 'if'");
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw new js__$Boot_HaxeError("Unclosed 'else'");
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe__$Template_TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e1 = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t2 = tokens.pop();
			if(t2 == null || t2.p != "end") throw new js__$Boot_HaxeError("Unclosed 'foreach'");
			return haxe__$Template_TemplateExpr.OpForeach(e1,efor);
		}
		if(haxe_Template.expr_splitter.match(p)) return haxe__$Template_TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe__$Template_TemplateExpr.OpVar(p);
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe_Template.expr_splitter.match(data)) {
			var p = haxe_Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe_Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe_Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw new js__$Boot_HaxeError(l.first().p);
		} catch( s ) {
			haxe_CallStack.lastException = s;
			if (s instanceof js__$Boot_HaxeError) s = s.val;
			if( js_Boot.__instanceof(s,String) ) {
				throw new js__$Boot_HaxeError("Unexpected '" + s + "' in " + expr);
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				haxe_CallStack.lastException = exc;
				if (exc instanceof js__$Boot_HaxeError) exc = exc.val;
				throw new js__$Boot_HaxeError("Error : " + Std.string(exc) + " in " + expr);
			}
		};
	}
	,makeConst: function(v) {
		haxe_Template.expr_trim.match(v);
		v = haxe_Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe_Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe_Template.expr_float.match(v)) {
			var f = parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") return e;
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) throw new js__$Boot_HaxeError(field.p);
		var f = field.p;
		haxe_Template.expr_trim.match(f);
		f = haxe_Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw new js__$Boot_HaxeError("<eof>");
		if(p.s) return this.makeConst(p.p);
		var _g = p.p;
		switch(_g) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw new js__$Boot_HaxeError(p1.p);
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw new js__$Boot_HaxeError(p2.p);
			var _g1 = p1.p;
			switch(_g1) {
			case "+":
				return function() {
					return e1() + e2();
				};
			case "-":
				return function() {
					return e1() - e2();
				};
			case "*":
				return function() {
					return e1() * e2();
				};
			case "/":
				return function() {
					return e1() / e2();
				};
			case ">":
				return function() {
					return e1() > e2();
				};
			case "<":
				return function() {
					return e1() < e2();
				};
			case ">=":
				return function() {
					return e1() >= e2();
				};
			case "<=":
				return function() {
					return e1() <= e2();
				};
			case "==":
				return function() {
					return e1() == e2();
				};
			case "!=":
				return function() {
					return e1() != e2();
				};
			case "&&":
				return function() {
					return e1() && e2();
				};
			case "||":
				return function() {
					return e1() || e2();
				};
			default:
				throw new js__$Boot_HaxeError("Unknown operation " + p1.p);
			}
			break;
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				return v == null || v == false;
			};
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw new js__$Boot_HaxeError(p.p);
	}
	,run: function(e) {
		switch(e[1]) {
		case 0:
			var v = e[2];
			this.buf.add(Std.string(this.resolve(v)));
			break;
		case 1:
			var e1 = e[2];
			this.buf.add(Std.string(e1()));
			break;
		case 2:
			var eelse = e[4];
			var eif = e[3];
			var e2 = e[2];
			var v1 = e2();
			if(v1 == null || v1 == false) {
				if(eelse != null) this.run(eelse);
			} else this.run(eif);
			break;
		case 3:
			var str = e[2];
			if(str == null) this.buf.b += "null"; else this.buf.b += "" + str;
			break;
		case 4:
			var l = e[2];
			var _g_head = l.h;
			var _g_val = null;
			while(_g_head != null) {
				var e3;
				e3 = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				this.run(e3);
			}
			break;
		case 5:
			var loop = e[3];
			var e4 = e[2];
			var v2 = e4();
			try {
				var x = $iterator(v2)();
				if(x.hasNext == null) throw new js__$Boot_HaxeError(null);
				v2 = x;
			} catch( e5 ) {
				haxe_CallStack.lastException = e5;
				if (e5 instanceof js__$Boot_HaxeError) e5 = e5.val;
				try {
					if(v2.hasNext == null) throw new js__$Boot_HaxeError(null);
				} catch( e6 ) {
					haxe_CallStack.lastException = e6;
					if (e6 instanceof js__$Boot_HaxeError) e6 = e6.val;
					throw new js__$Boot_HaxeError("Cannot iter on " + Std.string(v2));
				}
			}
			this.stack.push(this.context);
			var v3 = v2;
			while( v3.hasNext() ) {
				var ctx = v3.next();
				this.context = ctx;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var params = e[3];
			var m = e[2];
			var v4 = Reflect.field(this.macros,m);
			var pl = [];
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var _g_head1 = params.h;
			var _g_val1 = null;
			while(_g_head1 != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val1 = _g_head1[0];
					_g_head1 = _g_head1[1];
					$r = _g_val1;
					return $r;
				}(this));
				switch(p[1]) {
				case 0:
					var v5 = p[2];
					pl.push(this.resolve(v5));
					break;
				default:
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				this.buf.add(Std.string(Reflect.callMethod(this.macros,v4,pl)));
			} catch( e7 ) {
				haxe_CallStack.lastException = e7;
				if (e7 instanceof js__$Boot_HaxeError) e7 = e7.val;
				var plstr;
				try {
					plstr = pl.join(",");
				} catch( e8 ) {
					haxe_CallStack.lastException = e8;
					if (e8 instanceof js__$Boot_HaxeError) e8 = e8.val;
					plstr = "???";
				}
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e7) + ")";
				throw new js__$Boot_HaxeError(msg);
			}
			break;
		}
	}
	,__class__: haxe_Template
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = ["haxe","ds","ArraySort"];
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe_ds_ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe_ds_ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_Option = $hxClasses["haxe.ds.Option"] = { __ename__ : ["haxe","ds","Option"], __constructs__ : ["Some","None"] };
haxe_ds_Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe_ds_Option; $x.toString = $estr; return $x; };
haxe_ds_Option.None = ["None",1];
haxe_ds_Option.None.toString = $estr;
haxe_ds_Option.None.__enum__ = haxe_ds_Option;
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	map: null
	,keys: null
	,index: null
	,count: null
	,hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,rh: null
	,set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var keys = this.arrayKeys();
		var _g1 = 0;
		var _g = keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var k = keys[i];
			if(k == null) s.b += "null"; else s.b += "" + k;
			s.b += " => ";
			s.add(Std.string(__map_reserved[k] != null?this.getReserved(k):this.h[k]));
			if(i < keys.length) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_BytesBuffer = function() {
	this.b = [];
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe_io_BytesBuffer.prototype = {
	b: null
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(new Uint8Array(this.b).buffer);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = ["haxe","io","Eof"];
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = ["haxe","io","Path"];
haxe_io_Path.withoutDirectory = function(path) {
	var s = new haxe_io_Path(path);
	s.dir = null;
	return s.toString();
};
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) return "";
	return s.dir;
};
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) return "";
	return s.ext;
};
haxe_io_Path.withExtension = function(path,ext) {
	var s = new haxe_io_Path(path);
	s.ext = ext;
	return s.toString();
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join("/");
	if(path == null || path == slash) return slash;
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") target.pop(); else if(token != ".") target.push(token);
	}
	var tmp = target.join(slash);
	var regex = new EReg("([^:])/+","g");
	var result = regex.replace(tmp,"$1" + slash);
	var acc = new StringBuf();
	var colon = false;
	var slashes = false;
	var _g11 = 0;
	var _g2 = tmp.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var _g21 = HxOverrides.cca(tmp,i);
		var i1 = _g21;
		if(_g21 != null) switch(_g21) {
		case 58:
			acc.b += ":";
			colon = true;
			break;
		case 47:
			if(colon == false) slashes = true; else {
				colon = false;
				if(slashes) {
					acc.b += "/";
					slashes = false;
				}
				acc.add(String.fromCharCode(i1));
			}
			break;
		default:
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		} else {
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		}
	}
	var result1 = acc.b;
	return result1;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) return path + "\\"; else return path;
	} else if(c1 != path.length - 1) return path + "/"; else return path;
};
haxe_io_Path.removeTrailingSlashes = function(path) {
	try {
		while(true) {
			var _g = HxOverrides.cca(path,path.length - 1);
			if(_g != null) switch(_g) {
			case 47:case 92:
				path = HxOverrides.substr(path,0,-1);
				break;
			default:
				throw "__break__";
			} else throw "__break__";
		}
	} catch( e ) { if( e != "__break__" ) throw e; }
	return path;
};
haxe_io_Path.prototype = {
	dir: null
	,file: null
	,ext: null
	,backslash: null
	,toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe_io_Path
};
var haxe_remoting_AsyncConnection = function() { };
$hxClasses["haxe.remoting.AsyncConnection"] = haxe_remoting_AsyncConnection;
haxe_remoting_AsyncConnection.__name__ = ["haxe","remoting","AsyncConnection"];
var haxe_remoting_Connection = function() { };
$hxClasses["haxe.remoting.Connection"] = haxe_remoting_Connection;
haxe_remoting_Connection.__name__ = ["haxe","remoting","Connection"];
var haxe_remoting_Context = function() {
	this.objects = new haxe_ds_StringMap();
};
$hxClasses["haxe.remoting.Context"] = haxe_remoting_Context;
haxe_remoting_Context.__name__ = ["haxe","remoting","Context"];
haxe_remoting_Context.prototype = {
	objects: null
	,addObject: function(name,obj,recursive) {
		this.objects.set(name,{ obj : obj, rec : recursive});
	}
	,call: function(path,params) {
		if(path.length < 2) throw new js__$Boot_HaxeError("Invalid path '" + path.join(".") + "'");
		var inf = this.objects.get(path[0]);
		if(inf == null) throw new js__$Boot_HaxeError("No such object " + path[0]);
		var o = inf.obj;
		var m = Reflect.field(o,path[1]);
		if(path.length > 2) {
			if(!inf.rec) throw new js__$Boot_HaxeError("Can't access " + path.join("."));
			var _g1 = 2;
			var _g = path.length;
			while(_g1 < _g) {
				var i = _g1++;
				o = m;
				m = Reflect.field(o,path[i]);
			}
		}
		if(!Reflect.isFunction(m)) throw new js__$Boot_HaxeError("No such method " + path.join("."));
		return m.apply(o,params);
	}
	,__class__: haxe_remoting_Context
};
var haxe_remoting_HttpAsyncConnection = function(data,path) {
	this.__data = data;
	this.__path = path;
};
$hxClasses["haxe.remoting.HttpAsyncConnection"] = haxe_remoting_HttpAsyncConnection;
haxe_remoting_HttpAsyncConnection.__name__ = ["haxe","remoting","HttpAsyncConnection"];
haxe_remoting_HttpAsyncConnection.__interfaces__ = [haxe_remoting_AsyncConnection];
haxe_remoting_HttpAsyncConnection.prototype = {
	__data: null
	,__path: null
	,__class__: haxe_remoting_HttpAsyncConnection
};
var haxe_remoting_HttpConnection = function(url,path) {
	this.__url = url;
	this.__path = path;
};
$hxClasses["haxe.remoting.HttpConnection"] = haxe_remoting_HttpConnection;
haxe_remoting_HttpConnection.__name__ = ["haxe","remoting","HttpConnection"];
haxe_remoting_HttpConnection.__interfaces__ = [haxe_remoting_Connection];
haxe_remoting_HttpConnection.prototype = {
	__url: null
	,__path: null
	,__class__: haxe_remoting_HttpConnection
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	val: null
	,__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	byteLength: null
	,a: null
	,slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	buf: null
	,offset: null
	,length: null
	,getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var js_node_Fs = require("fs");
var js_node_Path = require("path");
var js_node_buffer_Buffer = require("buffer").Buffer;
var minject_Injector = function(parent) {
	this.infos = new haxe_ds_StringMap();
	this.mappings = new haxe_ds_StringMap();
	this.parent = parent;
};
$hxClasses["minject.Injector"] = minject_Injector;
minject_Injector.__name__ = ["minject","Injector"];
minject_Injector.getValueType = function(value) {
	if(typeof(value) == "string") return "String";
	if(js_Boot.__instanceof(value,Class)) return Type.getClassName(value);
	if(js_Boot.__instanceof(value,Enum)) return Type.getEnumName(value);
	var name;
	{
		var _g = Type["typeof"](value);
		switch(_g[1]) {
		case 1:
			name = "Int";
			break;
		case 3:
			name = "Bool";
			break;
		case 6:
			var c = _g[2];
			name = Type.getClassName(c);
			break;
		case 7:
			var e = _g[2];
			name = Type.getEnumName(e);
			break;
		default:
			name = null;
		}
	}
	if(name != null) return name;
	throw new js__$Boot_HaxeError("Could not determine type name of " + Std.string(value));
};
minject_Injector.prototype = {
	parent: null
	,mappings: null
	,infos: null
	,mapRuntimeTypeOf: function(value,name) {
		return this.mapType(minject_Injector.getValueType(value),name);
	}
	,mapType: function(type,name,value) {
		var key = this.getMappingKey(type,name);
		if(this.mappings.exists(key)) return this.mappings.get(key);
		var mapping = new minject_InjectorMapping(type,name);
		this.mappings.set(key,mapping);
		return mapping;
	}
	,unmapType: function(type,name) {
		var key = this.getMappingKey(type,name);
		this.mappings.remove(key);
	}
	,hasMappingForType: function(type,name) {
		return this.findMappingForType(type,name) != null;
	}
	,findMappingForType: function(type,name) {
		var mapping;
		var key = this.getMappingKey(type,name);
		mapping = this.mappings.get(key);
		if(mapping != null && mapping.provider != null) return mapping;
		if(this.parent != null) return this.parent.findMappingForType(type,name);
		return null;
	}
	,getValueForType: function(type,name) {
		var mapping = this.findMappingForType(type,name);
		if(mapping != null) return mapping.getValue(this);
		var index = type.indexOf("<");
		if(index > -1) mapping = this.findMappingForType(HxOverrides.substr(type,0,index),name);
		if(mapping != null) return mapping.getValue(this);
		return null;
	}
	,injectInto: function(target) {
		var info = this.getInfo(Type.getClass(target));
		if(info == null) return;
		var _g = 0;
		var _g1 = info.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			field.applyInjection(target,this);
		}
	}
	,_construct: function(type) {
		var info = this.getInfo(type);
		return info.ctor.createInstance(type,this);
	}
	,_instantiate: function(type) {
		var instance = this._construct(type);
		this.injectInto(instance);
		return instance;
	}
	,getInstance: function(type,name) {
		var type1 = Type.getClassName(type);
		var mapping = this.findMappingForType(type1,name);
		if(mapping == null) throw new js__$Boot_HaxeError("Error while getting mapping response: No mapping defined for class \"" + type1 + "\" " + ("name \"" + name + "\""));
		return mapping.getValue(this);
	}
	,createChildInjector: function() {
		return new minject_Injector(this);
	}
	,getInfo: function(forClass) {
		var type = Type.getClassName(forClass);
		if(this.infos.exists(type)) return this.infos.get(type);
		var info = this.createInfo(forClass);
		this.infos.set(type,info);
		return info;
	}
	,createInfo: function(forClass) {
		var info = new minject_InjectorInfo(null,[]);
		this.addClassToInfo(forClass,info,[]);
		haxe_ds_ArraySort.sort(info.fields,function(p1,p2) {
			var post1;
			post1 = (p1 instanceof minject_point_PostInjectionPoint)?p1:null;
			var post2;
			post2 = (p2 instanceof minject_point_PostInjectionPoint)?p2:null;
			if(post1 == null) {
				if(post2 == null) return 0; else switch(post2) {
				default:
					return -1;
				}
			} else switch(post1) {
			default:
				if(post2 == null) return 1; else switch(post2) {
				default:
					return post1.order - post2.order;
				}
			}
		});
		if(info.ctor == null) info.ctor = new minject_point_ConstructorInjectionPoint([]);
		return info;
	}
	,addClassToInfo: function(forClass,info,injected) {
		var meta = haxe_rtti_Meta.getType(forClass);
		var fields = meta.rtti;
		if(fields != null) {
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				var name = field[0];
				if(HxOverrides.indexOf(injected,name,0) > -1) continue;
				injected.push(name);
				if(field.length == 3) info.fields.push(new minject_point_PropertyInjectionPoint(name,field[1],field[2])); else if(name == "new") info.ctor = new minject_point_ConstructorInjectionPoint(field.slice(2)); else {
					var orderStr = field[1];
					if(orderStr == "") info.fields.push(new minject_point_MethodInjectionPoint(name,field.slice(2))); else {
						var order = Std.parseInt(orderStr);
						info.fields.push(new minject_point_PostInjectionPoint(name,field.slice(2),order));
					}
				}
			}
		}
		var superClass = Type.getSuperClass(forClass);
		if(superClass != null) this.addClassToInfo(superClass,info,injected);
	}
	,getMappingKey: function(type,name) {
		if(name == null) name = "";
		return "" + type + "#" + name;
	}
	,__class__: minject_Injector
};
var minject_InjectorInfo = function(ctor,fields) {
	this.ctor = ctor;
	this.fields = fields;
};
$hxClasses["minject.InjectorInfo"] = minject_InjectorInfo;
minject_InjectorInfo.__name__ = ["minject","InjectorInfo"];
minject_InjectorInfo.prototype = {
	ctor: null
	,fields: null
	,__class__: minject_InjectorInfo
};
var minject_InjectorMapping = function(type,name) {
	this.type = type;
	this.name = name;
};
$hxClasses["minject.InjectorMapping"] = minject_InjectorMapping;
minject_InjectorMapping.__name__ = ["minject","InjectorMapping"];
minject_InjectorMapping.prototype = {
	type: null
	,name: null
	,injector: null
	,provider: null
	,getValue: function(injector) {
		if(this.injector != null) injector = this.injector;
		if(this.provider != null) return this.provider.getValue(injector);
		var parent = injector.findMappingForType(this.type,this.name);
		if(parent != null) return parent.getValue(injector);
		return null;
	}
	,toValue: function(value) {
		return this.toProvider(new minject_provider_ValueProvider(value));
	}
	,_toClass: function(type) {
		return this.toProvider(new minject_provider_ClassProvider(type));
	}
	,_toSingleton: function(type) {
		return this.toProvider(new minject_provider_SingletonProvider(type));
	}
	,asSingleton: function() {
		return this._toSingleton(Type.resolveClass(this.type));
	}
	,toMapping: function(mapping) {
		return this.toProvider(new minject_provider_OtherMappingProvider(mapping));
	}
	,toProvider: function(provider) {
		this.provider = provider;
		return this;
	}
	,__class__: minject_InjectorMapping
};
var minject_point_InjectionPoint = function() { };
$hxClasses["minject.point.InjectionPoint"] = minject_point_InjectionPoint;
minject_point_InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject_point_InjectionPoint.prototype = {
	field: null
	,applyInjection: null
	,__class__: minject_point_InjectionPoint
};
var minject_point_MethodInjectionPoint = function(field,args) {
	this.field = field;
	this.args = args;
};
$hxClasses["minject.point.MethodInjectionPoint"] = minject_point_MethodInjectionPoint;
minject_point_MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject_point_MethodInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_MethodInjectionPoint.prototype = {
	field: null
	,args: null
	,applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.field),this.gatherArgs(target,injector));
		return target;
	}
	,gatherArgs: function(target,injector) {
		var values = [];
		var index = 0;
		while(index < this.args.length) {
			var type = this.args[index++];
			var argName = this.args[index++];
			var opt = this.args[index++] == "o";
			var response = injector.getValueForType(type,argName);
			values.push(response);
		}
		return values;
	}
	,__class__: minject_point_MethodInjectionPoint
};
var minject_point_ConstructorInjectionPoint = function(args) {
	minject_point_MethodInjectionPoint.call(this,"new",args);
};
$hxClasses["minject.point.ConstructorInjectionPoint"] = minject_point_ConstructorInjectionPoint;
minject_point_ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject_point_ConstructorInjectionPoint.__super__ = minject_point_MethodInjectionPoint;
minject_point_ConstructorInjectionPoint.prototype = $extend(minject_point_MethodInjectionPoint.prototype,{
	createInstance: function(type,injector) {
		return Type.createInstance(type,this.gatherArgs(type,injector));
	}
	,__class__: minject_point_ConstructorInjectionPoint
});
var minject_point_PostInjectionPoint = function(field,args,order) {
	minject_point_MethodInjectionPoint.call(this,field,args);
	this.order = order;
};
$hxClasses["minject.point.PostInjectionPoint"] = minject_point_PostInjectionPoint;
minject_point_PostInjectionPoint.__name__ = ["minject","point","PostInjectionPoint"];
minject_point_PostInjectionPoint.__super__ = minject_point_MethodInjectionPoint;
minject_point_PostInjectionPoint.prototype = $extend(minject_point_MethodInjectionPoint.prototype,{
	order: null
	,__class__: minject_point_PostInjectionPoint
});
var minject_point_PropertyInjectionPoint = function(field,type,name) {
	this.field = field;
	this.type = type;
	this.name = name;
};
$hxClasses["minject.point.PropertyInjectionPoint"] = minject_point_PropertyInjectionPoint;
minject_point_PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject_point_PropertyInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PropertyInjectionPoint.prototype = {
	field: null
	,type: null
	,name: null
	,applyInjection: function(target,injector) {
		var response = injector.getValueForType(this.type,this.name);
		Reflect.setProperty(target,this.field,response);
		return target;
	}
	,__class__: minject_point_PropertyInjectionPoint
};
var minject_provider_DependencyProvider = function() { };
$hxClasses["minject.provider.DependencyProvider"] = minject_provider_DependencyProvider;
minject_provider_DependencyProvider.__name__ = ["minject","provider","DependencyProvider"];
minject_provider_DependencyProvider.prototype = {
	getValue: null
	,__class__: minject_provider_DependencyProvider
};
var minject_provider_ClassProvider = function(type) {
	this.type = type;
};
$hxClasses["minject.provider.ClassProvider"] = minject_provider_ClassProvider;
minject_provider_ClassProvider.__name__ = ["minject","provider","ClassProvider"];
minject_provider_ClassProvider.__interfaces__ = [minject_provider_DependencyProvider];
minject_provider_ClassProvider.prototype = {
	type: null
	,getValue: function(injector) {
		return injector._instantiate(this.type);
	}
	,__class__: minject_provider_ClassProvider
};
var minject_provider_OtherMappingProvider = function(mapping) {
	this.mapping = mapping;
};
$hxClasses["minject.provider.OtherMappingProvider"] = minject_provider_OtherMappingProvider;
minject_provider_OtherMappingProvider.__name__ = ["minject","provider","OtherMappingProvider"];
minject_provider_OtherMappingProvider.__interfaces__ = [minject_provider_DependencyProvider];
minject_provider_OtherMappingProvider.prototype = {
	mapping: null
	,getValue: function(injector) {
		return this.mapping.getValue(injector);
	}
	,__class__: minject_provider_OtherMappingProvider
};
var minject_provider_SingletonProvider = function(type) {
	this.type = type;
};
$hxClasses["minject.provider.SingletonProvider"] = minject_provider_SingletonProvider;
minject_provider_SingletonProvider.__name__ = ["minject","provider","SingletonProvider"];
minject_provider_SingletonProvider.__interfaces__ = [minject_provider_DependencyProvider];
minject_provider_SingletonProvider.prototype = {
	type: null
	,value: null
	,getValue: function(injector) {
		if(this.value == null) {
			this.value = injector._construct(this.type);
			injector.injectInto(this.value);
		}
		return this.value;
	}
	,__class__: minject_provider_SingletonProvider
};
var minject_provider_ValueProvider = function(value) {
	this.value = value;
};
$hxClasses["minject.provider.ValueProvider"] = minject_provider_ValueProvider;
minject_provider_ValueProvider.__name__ = ["minject","provider","ValueProvider"];
minject_provider_ValueProvider.__interfaces__ = [minject_provider_DependencyProvider];
minject_provider_ValueProvider.prototype = {
	value: null
	,getValue: function(injector) {
		return this.value;
	}
	,__class__: minject_provider_ValueProvider
};
var mw_BodyParser = require("body-parser");
var mw_CookieParser = require("cookie-parser");
var ufront_web_context_HttpRequest = function() { };
$hxClasses["ufront.web.context.HttpRequest"] = ufront_web_context_HttpRequest;
ufront_web_context_HttpRequest.__name__ = ["ufront","web","context","HttpRequest"];
ufront_web_context_HttpRequest.create = function() {
	throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Please use `new nodejs.ufront.web.HttpRequest(req)` instead",null,{ fileName : "HttpRequest.hx", lineNumber : 75, className : "ufront.web.context.HttpRequest", methodName : "create"}));
};
ufront_web_context_HttpRequest.prototype = {
	params: null
	,get_params: function() {
		if(null == this.params) this.params = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.combine([this.get_cookies(),this.get_query(),this.get_post()]);
		return this.params;
	}
	,queryString: null
	,get_queryString: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 111, className : "ufront.web.context.HttpRequest", methodName : "get_queryString"}));
	}
	,postString: null
	,get_postString: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 121, className : "ufront.web.context.HttpRequest", methodName : "get_postString"}));
	}
	,query: null
	,get_query: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 131, className : "ufront.web.context.HttpRequest", methodName : "get_query"}));
	}
	,post: null
	,get_post: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 149, className : "ufront.web.context.HttpRequest", methodName : "get_post"}));
	}
	,files: null
	,get_files: function() {
		if(null == this.files) this.files = new haxe_ds_StringMap();
		return this.files;
	}
	,cookies: null
	,get_cookies: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 168, className : "ufront.web.context.HttpRequest", methodName : "get_cookies"}));
	}
	,hostName: null
	,get_hostName: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 174, className : "ufront.web.context.HttpRequest", methodName : "get_hostName"}));
	}
	,clientIP: null
	,get_clientIP: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 180, className : "ufront.web.context.HttpRequest", methodName : "get_clientIP"}));
	}
	,uri: null
	,get_uri: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 191, className : "ufront.web.context.HttpRequest", methodName : "get_uri"}));
	}
	,clientHeaders: null
	,get_clientHeaders: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 197, className : "ufront.web.context.HttpRequest", methodName : "get_clientHeaders"}));
	}
	,userAgent: null
	,get_userAgent: function() {
		if(this.userAgent == null) this.userAgent = ufront_web_UserAgent.fromString((function($this) {
			var $r;
			var this1 = $this.get_clientHeaders();
			$r = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(this1,"User-Agent".toLowerCase());
			return $r;
		}(this)));
		return this.userAgent;
	}
	,httpMethod: null
	,get_httpMethod: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 219, className : "ufront.web.context.HttpRequest", methodName : "get_httpMethod"}));
	}
	,scriptDirectory: null
	,get_scriptDirectory: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 231, className : "ufront.web.context.HttpRequest", methodName : "get_scriptDirectory"}));
	}
	,authorization: null
	,get_authorization: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 243, className : "ufront.web.context.HttpRequest", methodName : "get_authorization"}));
	}
	,isMultipart: function() {
		return (function($this) {
			var $r;
			var this1 = $this.get_clientHeaders();
			var name = "Content-Type".toLowerCase();
			$r = __map_reserved[name] != null?this1.existsReserved(name):this1.h.hasOwnProperty(name);
			return $r;
		}(this)) && StringTools.startsWith((function($this) {
			var $r;
			var this2 = $this.get_clientHeaders();
			$r = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(this2,"Content-Type".toLowerCase());
			return $r;
		}(this)),"multipart/form-data");
	}
	,parseMultipart: function(onPart,onData,onEndPart) {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.abstractMethod({ fileName : "HttpRequest.hx", lineNumber : 280, className : "ufront.web.context.HttpRequest", methodName : "parseMultipart"}));
	}
	,__class__: ufront_web_context_HttpRequest
	,__properties__: {get_authorization:"get_authorization",get_scriptDirectory:"get_scriptDirectory",get_httpMethod:"get_httpMethod",get_userAgent:"get_userAgent",get_clientHeaders:"get_clientHeaders",get_uri:"get_uri",get_clientIP:"get_clientIP",get_hostName:"get_hostName",get_cookies:"get_cookies",get_files:"get_files",get_post:"get_post",get_query:"get_query",get_postString:"get_postString",get_queryString:"get_queryString",get_params:"get_params"}
};
var nodejs_ufront_web_context_HttpRequest = function(req) {
	this._parsed = false;
	this.req = req;
};
$hxClasses["nodejs.ufront.web.context.HttpRequest"] = nodejs_ufront_web_context_HttpRequest;
nodejs_ufront_web_context_HttpRequest.__name__ = ["nodejs","ufront","web","context","HttpRequest"];
nodejs_ufront_web_context_HttpRequest.getMapFromObject = function(obj,prefix,caseSensitive,m) {
	if(caseSensitive == null) caseSensitive = true;
	if(prefix == null) prefix = "";
	if(m == null) m = new haxe_ds_StringMap();
	if(obj != null) {
		var _g = 0;
		var _g1 = Reflect.fields(obj);
		while(_g < _g1.length) {
			var fieldName = _g1[_g];
			++_g;
			var val = Reflect.field(obj,fieldName);
			var fieldName1;
			if(prefix != "") fieldName1 = "" + prefix + "." + fieldName; else fieldName1 = fieldName;
			var _g2 = Type["typeof"](val);
			switch(_g2[1]) {
			case 4:
				nodejs_ufront_web_context_HttpRequest.getMapFromObject(val,fieldName1 + ".",caseSensitive,m);
				break;
			default:
				var name;
				if(caseSensitive) name = fieldName1; else name = fieldName1.toLowerCase();
				ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.add(m,name,name == "__x"?"" + val:decodeURIComponent(("" + val).split("+").join(" ")));
			}
		}
	}
	return m;
};
nodejs_ufront_web_context_HttpRequest.__super__ = ufront_web_context_HttpRequest;
nodejs_ufront_web_context_HttpRequest.prototype = $extend(ufront_web_context_HttpRequest.prototype,{
	req: null
	,get_queryString: function() {
		if(this.queryString == null) {
			var pos = this.req.originalUrl.indexOf("?") + 1;
			this.queryString = HxOverrides.substr(this.req.originalUrl,pos,null);
			var hashIndex = this.queryString.indexOf("#");
			if(hashIndex > -1) this.queryString = HxOverrides.substr(this.queryString,0,hashIndex + 1);
		}
		return this.queryString;
	}
	,get_postString: function() {
		if(this.postString == null) {
			if(this.get_httpMethod() == "GET") this.postString = ""; else throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("HttpRequest.postString() not implemented on NodeJS",null,{ fileName : "HttpRequest.hx", lineNumber : 54, className : "nodejs.ufront.web.context.HttpRequest", methodName : "get_postString"}));
		}
		return this.postString;
	}
	,_parsed: null
	,parseMultipart: function(onPart,onData,onEndPart) {
		if(!this.isMultipart()) return ufront_core_SurpriseTools.success();
		if(this._parsed) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("HttpRequest.parseMultipart() can only been called once",null,{ fileName : "HttpRequest.hx", lineNumber : 66, className : "nodejs.ufront.web.context.HttpRequest", methodName : "parseMultipart"}));
		this._parsed = true;
		var post = this.get_post();
		throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("HttpRequest.parseMultipart() not implemented on NodeJS",null,{ fileName : "HttpRequest.hx", lineNumber : 71, className : "nodejs.ufront.web.context.HttpRequest", methodName : "parseMultipart"}));
	}
	,get_query: function() {
		if(this.query == null) this.query = nodejs_ufront_web_context_HttpRequest.getMapFromObject(this.req.query);
		return this.query;
	}
	,get_post: function() {
		if(this.post == null) this.post = nodejs_ufront_web_context_HttpRequest.getMapFromObject(this.req.body);
		return this.post;
	}
	,get_cookies: function() {
		if(this.cookies == null) this.cookies = nodejs_ufront_web_context_HttpRequest.getMapFromObject(this.req.cookies);
		return this.cookies;
	}
	,get_hostName: function() {
		if(this.hostName == null) this.hostName = this.req.hostname;
		return this.hostName;
	}
	,get_clientIP: function() {
		if(this.clientIP == null) this.clientIP = this.req.ip;
		return this.clientIP;
	}
	,get_uri: function() {
		if(this.uri == null) this.uri = decodeURIComponent(this.req.path.split("+").join(" "));
		return this.uri;
	}
	,get_clientHeaders: function() {
		if(this.clientHeaders == null) this.clientHeaders = nodejs_ufront_web_context_HttpRequest.getMapFromObject(this.req.headers);
		return this.clientHeaders;
	}
	,get_httpMethod: function() {
		if(this.httpMethod == null) this.httpMethod = this.req.method;
		return this.httpMethod;
	}
	,get_scriptDirectory: function() {
		if(this.scriptDirectory == null) this.scriptDirectory = __dirname + "/";
		return this.scriptDirectory;
	}
	,get_authorization: function() {
		if(this.authorization == null) {
			this.authorization = { user : null, pass : null};
			var reg = new EReg("^Basic ([^=]+)=*$","");
			var h;
			var this1 = this.get_clientHeaders();
			h = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(this1,"Authorization".toLowerCase());
			if(h != null && reg.match(h)) {
				var val = reg.matched(1);
				val = new js_node_buffer_Buffer(val,"base64").toString("utf-8");
				var a = val.split(":");
				if(a.length != 2) throw new js__$Boot_HaxeError(ufront_web_HttpError.badRequest("Unable to decode username and password",{ fileName : "HttpRequest.hx", lineNumber : 138, className : "nodejs.ufront.web.context.HttpRequest", methodName : "get_authorization"}));
				this.authorization = { user : a[0], pass : a[1]};
			}
		}
		return this.authorization;
	}
	,__class__: nodejs_ufront_web_context_HttpRequest
});
var ufront_web_context_HttpResponse = function() {
	this.clear();
	this._flushedStatus = false;
	this._flushedCookies = false;
	this._flushedHeaders = false;
	this._flushedContent = false;
};
$hxClasses["ufront.web.context.HttpResponse"] = ufront_web_context_HttpResponse;
ufront_web_context_HttpResponse.__name__ = ["ufront","web","context","HttpResponse"];
ufront_web_context_HttpResponse.create = function() {
	throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Please use `new nodejs.ufront.web.HttpResponse(res)` instead",null,{ fileName : "HttpResponse.hx", lineNumber : 39, className : "ufront.web.context.HttpResponse", methodName : "create"}));
};
ufront_web_context_HttpResponse.prototype = {
	charset: null
	,status: null
	,_buff: null
	,_bytesBuffer: null
	,_headers: null
	,_cookies: null
	,_flushedStatus: null
	,_flushedCookies: null
	,_flushedHeaders: null
	,_flushedContent: null
	,preventFlush: function() {
		this._flushedStatus = true;
		this._flushedCookies = true;
		this._flushedHeaders = true;
		this._flushedContent = true;
	}
	,preventFlushContent: function() {
		this._flushedContent = true;
	}
	,flush: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.notImplemented({ fileName : "HttpResponse.hx", lineNumber : 141, className : "ufront.web.context.HttpResponse", methodName : "flush"}));
	}
	,clear: function() {
		this.clearCookies();
		this.clearHeaders();
		this.clearContent();
		this.set_contentType(null);
		this.charset = "utf-8";
		this.status = 200;
	}
	,clearCookies: function() {
		this._cookies = new haxe_ds_StringMap();
	}
	,clearContent: function() {
		this._buff = new StringBuf();
		this._bytesBuffer = new haxe_io_BytesBuffer();
	}
	,clearHeaders: function() {
		this._headers = new ufront_core_OrderedStringMap();
	}
	,write: function(s) {
		if(null != s) if(s == null) this._buff.b += "null"; else this._buff.b += "" + s;
	}
	,writeChar: function(c) {
		this._buff.b += String.fromCharCode(c);
	}
	,writeBytes: function(b,pos,len) {
		this._bytesBuffer.addBytes(b,pos,len);
	}
	,setHeader: function(name,value) {
		ufront_web_HttpError.throwIfNull(name,null,{ fileName : "HttpResponse.hx", lineNumber : 219, className : "ufront.web.context.HttpResponse", methodName : "setHeader"});
		ufront_web_HttpError.throwIfNull(value,null,{ fileName : "HttpResponse.hx", lineNumber : 220, className : "ufront.web.context.HttpResponse", methodName : "setHeader"});
		this._headers.set(name,value);
	}
	,setCookie: function(cookie) {
		this._cookies.set(cookie.name,cookie);
	}
	,getBuffer: function() {
		return this._buff.b;
	}
	,getCookies: function() {
		return this._cookies;
	}
	,getHeaders: function() {
		return this._headers;
	}
	,redirect: function(url) {
		this.status = 302;
		this.set_redirectLocation(url);
	}
	,setOk: function() {
		this.status = 200;
	}
	,setUnauthorized: function() {
		this.status = 401;
	}
	,requireAuthentication: function(message) {
		this.setUnauthorized();
		this.setHeader("WWW-Authenticate","Basic realm=\"" + message + "\"");
	}
	,setNotFound: function() {
		this.status = 404;
	}
	,setInternalError: function() {
		this.status = 500;
	}
	,permanentRedirect: function(url) {
		this.status = 301;
		this.set_redirectLocation(url);
	}
	,isRedirect: function() {
		return Math.floor(this.status / 100) == 3;
	}
	,isPermanentRedirect: function() {
		return this.status == 301;
	}
	,hxSerialize: function(s) {
		s.serialize(this._buff.b);
		s.serialize(this._headers);
		s.serialize(this._cookies);
		s.serialize(this._flushedStatus);
		s.serialize(this._flushedCookies);
		s.serialize(this._flushedHeaders);
		s.serialize(this._flushedContent);
	}
	,hxUnserialize: function(u) {
		this._buff = new StringBuf();
		this._buff.add(u.unserialize());
		this._headers = u.unserialize();
		this._cookies = u.unserialize();
		this._flushedStatus = u.unserialize();
		this._flushedCookies = u.unserialize();
		this._flushedHeaders = u.unserialize();
		this._flushedContent = u.unserialize();
	}
	,get_contentType: function() {
		return this._headers.get("Content-type");
	}
	,set_contentType: function(v) {
		if(null == v) this._headers.set("Content-type","text/html"); else this._headers.set("Content-type",v);
		return v;
	}
	,get_redirectLocation: function() {
		return this._headers.get("Location");
	}
	,set_redirectLocation: function(v) {
		if(null == v) this._headers.remove("Location"); else this._headers.set("Location",v);
		return v;
	}
	,__class__: ufront_web_context_HttpResponse
	,__properties__: {set_redirectLocation:"set_redirectLocation",get_redirectLocation:"get_redirectLocation",set_contentType:"set_contentType",get_contentType:"get_contentType"}
};
var nodejs_ufront_web_context_HttpResponse = function(res) {
	ufront_web_context_HttpResponse.call(this);
	this.res = res;
};
$hxClasses["nodejs.ufront.web.context.HttpResponse"] = nodejs_ufront_web_context_HttpResponse;
nodejs_ufront_web_context_HttpResponse.__name__ = ["nodejs","ufront","web","context","HttpResponse"];
nodejs_ufront_web_context_HttpResponse.__super__ = ufront_web_context_HttpResponse;
nodejs_ufront_web_context_HttpResponse.prototype = $extend(ufront_web_context_HttpResponse.prototype,{
	res: null
	,flush: function() {
		if(!this._flushedStatus) {
			this._flushedStatus = true;
			this.res.statusCode = this.status;
		}
		if(!this._flushedCookies) {
			this._flushedCookies = true;
			try {
				var cookieHeader;
				var _g = [];
				var $it0 = this._cookies.iterator();
				while( $it0.hasNext() ) {
					var cookie = $it0.next();
					_g.push("" + cookie.name + "=" + cookie.get_description());
				}
				cookieHeader = _g;
				this.res.setHeader("Set-Cookie",cookieHeader);
			} catch( e ) {
				haxe_CallStack.lastException = e;
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Failed to set cookie on response",e,{ fileName : "HttpResponse.hx", lineNumber : 39, className : "nodejs.ufront.web.context.HttpResponse", methodName : "flush"}));
			}
		}
		if(!this._flushedHeaders) {
			this._flushedHeaders = true;
			var $it1 = this._headers.keys();
			while( $it1.hasNext() ) {
				var key = $it1.next();
				var val = this._headers.get(key);
				if(key == "Content-type" && null != this.charset && (val == "application/json" || StringTools.startsWith(val,"text/"))) val += "; charset=" + this.charset;
				try {
					this.res.setHeader(key,val);
				} catch( e1 ) {
					haxe_CallStack.lastException = e1;
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
					throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Invalid header: \"" + key + ": " + val + "\", or output already sent",e1,{ fileName : "HttpResponse.hx", lineNumber : 55, className : "nodejs.ufront.web.context.HttpResponse", methodName : "flush"}));
				}
			}
		}
		if(!this._flushedContent) {
			this._flushedContent = true;
			if(this._bytesBuffer.b.length > 0) this.res.end((function($this) {
				var $r;
				var b = $this._bytesBuffer.getBytes();
				$r = new js_node_buffer_Buffer(b.b.bufferValue);
				return $r;
			}(this)),"binary"); else this.res.end(this._buff.b);
		}
	}
	,__class__: nodejs_ufront_web_context_HttpResponse
});
var sys_FileSystem = function() { };
$hxClasses["sys.FileSystem"] = sys_FileSystem;
sys_FileSystem.__name__ = ["sys","FileSystem"];
sys_FileSystem.exists = function(path) {
	try {
		js_node_Fs.accessSync(path);
		return true;
	} catch( _ ) {
		haxe_CallStack.lastException = _;
		if (_ instanceof js__$Boot_HaxeError) _ = _.val;
		return false;
	}
};
sys_FileSystem.createDirectory = function(path) {
	try {
		js_node_Fs.mkdirSync(path);
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		if(e.code == "ENOENT") {
			sys_FileSystem.createDirectory(js_node_Path.dirname(path));
			js_node_Fs.mkdirSync(path);
		} else {
			var stat;
			try {
				stat = js_node_Fs.statSync(path);
			} catch( _ ) {
				haxe_CallStack.lastException = _;
				if (_ instanceof js__$Boot_HaxeError) _ = _.val;
				throw e;
			}
			if(!stat.isDirectory()) throw e;
		}
	}
};
var sys_io_File = function() { };
$hxClasses["sys.io.File"] = sys_io_File;
sys_io_File.__name__ = ["sys","io","File"];
sys_io_File.getBytes = function(path) {
	var _this = js_node_Fs.readFileSync(path);
	return haxe_io_Bytes.ofData(_this);
};
sys_io_File.copy = function(srcPath,dstPath) {
	var src = js_node_Fs.openSync(srcPath,"r");
	var stat = js_node_Fs.fstatSync(src);
	var dst = js_node_Fs.openSync(dstPath,"w",stat.mode);
	var bytesRead;
	var pos = 0;
	while((bytesRead = js_node_Fs.readSync(src,sys_io_File.copyBuf,0,65536,pos)) > 0) {
		js_node_Fs.writeSync(dst,sys_io_File.copyBuf,0,bytesRead);
		pos += bytesRead;
	}
	js_node_Fs.closeSync(src);
	js_node_Fs.closeSync(dst);
};
var tink_core__$Any_Any_$Impl_$ = {};
$hxClasses["tink.core._Any.Any_Impl_"] = tink_core__$Any_Any_$Impl_$;
tink_core__$Any_Any_$Impl_$.__name__ = ["tink","core","_Any","Any_Impl_"];
tink_core__$Any_Any_$Impl_$.__promote = function(this1) {
	return this1;
};
var tink_core__$Callback_Callback_$Impl_$ = {};
$hxClasses["tink.core._Callback.Callback_Impl_"] = tink_core__$Callback_Callback_$Impl_$;
tink_core__$Callback_Callback_$Impl_$.__name__ = ["tink","core","_Callback","Callback_Impl_"];
tink_core__$Callback_Callback_$Impl_$._new = function(f) {
	return f;
};
tink_core__$Callback_Callback_$Impl_$.invoke = function(this1,data) {
	this1(data);
};
tink_core__$Callback_Callback_$Impl_$.fromNiladic = function(f) {
	return function(r) {
		f();
	};
};
tink_core__$Callback_Callback_$Impl_$.fromMany = function(callbacks) {
	return function(v) {
		var _g = 0;
		while(_g < callbacks.length) {
			var callback = callbacks[_g];
			++_g;
			callback(v);
		}
	};
};
var tink_core__$Callback_CallbackLink_$Impl_$ = {};
$hxClasses["tink.core._Callback.CallbackLink_Impl_"] = tink_core__$Callback_CallbackLink_$Impl_$;
tink_core__$Callback_CallbackLink_$Impl_$.__name__ = ["tink","core","_Callback","CallbackLink_Impl_"];
tink_core__$Callback_CallbackLink_$Impl_$._new = function(link) {
	return link;
};
tink_core__$Callback_CallbackLink_$Impl_$.dissolve = function(this1) {
	if(this1 != null) this1();
};
tink_core__$Callback_CallbackLink_$Impl_$.toCallback = function(this1) {
	{
		var f = this1;
		return function(r) {
			f();
		};
	}
};
tink_core__$Callback_CallbackLink_$Impl_$.fromFunction = function(f) {
	return f;
};
tink_core__$Callback_CallbackLink_$Impl_$.fromMany = function(callbacks) {
	return function() {
		var _g = 0;
		while(_g < callbacks.length) {
			var cb = callbacks[_g];
			++_g;
			if(cb != null) cb();
		}
	};
};
var tink_core__$Callback_CallbackList_$Impl_$ = {};
$hxClasses["tink.core._Callback.CallbackList_Impl_"] = tink_core__$Callback_CallbackList_$Impl_$;
tink_core__$Callback_CallbackList_$Impl_$.__name__ = ["tink","core","_Callback","CallbackList_Impl_"];
tink_core__$Callback_CallbackList_$Impl_$.__properties__ = {get_length:"get_length"}
tink_core__$Callback_CallbackList_$Impl_$._new = function() {
	return [];
};
tink_core__$Callback_CallbackList_$Impl_$.get_length = function(this1) {
	return this1.length;
};
tink_core__$Callback_CallbackList_$Impl_$.add = function(this1,cb) {
	var cell;
	var ret;
	ret = (function($this) {
		var $r;
		var this2;
		this2 = new Array(1);
		$r = this2;
		return $r;
	}(this));
	ret[0] = cb;
	cell = ret;
	this1.push(cell);
	return function() {
		if(HxOverrides.remove(this1,cell)) cell[0] = null;
		cell = null;
	};
};
tink_core__$Callback_CallbackList_$Impl_$.invoke = function(this1,data) {
	var _g = 0;
	var _g1 = this1.slice();
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		if(cell[0] != null) cell[0](data);
	}
};
tink_core__$Callback_CallbackList_$Impl_$.clear = function(this1) {
	var _g = 0;
	var _g1 = this1.splice(0,this1.length);
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		cell[0] = null;
	}
};
var tink_core_Either = $hxClasses["tink.core.Either"] = { __ename__ : ["tink","core","Either"], __constructs__ : ["Left","Right"] };
tink_core_Either.Left = function(a) { var $x = ["Left",0,a]; $x.__enum__ = tink_core_Either; $x.toString = $estr; return $x; };
tink_core_Either.Right = function(b) { var $x = ["Right",1,b]; $x.__enum__ = tink_core_Either; $x.toString = $estr; return $x; };
var tink_core_TypedError = function(code,message,callStack,pos) {
	if(code == null) code = 500;
	this.code = code;
	this.message = message;
	this.pos = pos;
	if(callStack != null) this.callStack = callStack; else try {
		this.callStack = haxe_CallStack.callStack();
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		this.callStack = [];
	}
};
$hxClasses["tink.core.TypedError"] = tink_core_TypedError;
tink_core_TypedError.__name__ = ["tink","core","TypedError"];
tink_core_TypedError.withData = function(code,message,data,pos) {
	return tink_core_TypedError.typed(code,message,data,pos);
};
tink_core_TypedError.typed = function(code,message,data,pos) {
	var ret = new tink_core_TypedError(code,message,null,pos);
	ret.data = data;
	return ret;
};
tink_core_TypedError.catchExceptions = function(f,report) {
	try {
		return tink_core_Outcome.Success(f());
	} catch( $e0 ) {
		haxe_CallStack.lastException = $e0;
		if ($e0 instanceof js__$Boot_HaxeError) $e0 = $e0.val;
		if( js_Boot.__instanceof($e0,tink_core_TypedError) ) {
			var e = $e0;
			return tink_core_Outcome.Failure(e);
		} else {
		var e1 = $e0;
		return tink_core_Outcome.Failure(report == null?tink_core_TypedError.withData(null,"Unexpected Error",e1,{ fileName : "Error.hx", lineNumber : 99, className : "tink.core.TypedError", methodName : "catchExceptions"}):report(e1));
		}
	}
};
tink_core_TypedError.reporter = function(code,message,pos) {
	return function(e) {
		return tink_core_TypedError.withData(code,message,e,pos);
	};
};
tink_core_TypedError.rethrow = function(any) {
	throw new js__$Boot_HaxeError(any);
	return any;
};
tink_core_TypedError.prototype = {
	message: null
	,code: null
	,data: null
	,pos: null
	,callStack: null
	,printPos: function() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	,toString: function() {
		var ret = "Error: " + this.message;
		if(this.pos != null) ret += " " + this.printPos();
		return ret;
	}
	,throwSelf: function() {
		throw new js__$Boot_HaxeError(this);
		return this;
	}
	,__class__: tink_core_TypedError
};
var tink_core__$Future_Future_$Impl_$ = {};
$hxClasses["tink.core._Future.Future_Impl_"] = tink_core__$Future_Future_$Impl_$;
tink_core__$Future_Future_$Impl_$.__name__ = ["tink","core","_Future","Future_Impl_"];
tink_core__$Future_Future_$Impl_$._new = function(f) {
	return f;
};
tink_core__$Future_Future_$Impl_$.handle = function(this1,callback) {
	return this1(callback);
};
tink_core__$Future_Future_$Impl_$.gather = function(this1) {
	var op = new tink_core_FutureTrigger();
	var self = this1;
	return tink_core__$Future_Future_$Impl_$._new(function(cb) {
		if(self != null) {
			this1($bind(op,op.trigger));
			self = null;
		}
		return op.future(cb);
	});
};
tink_core__$Future_Future_$Impl_$.first = function(this1,other) {
	return tink_core__$Future_Future_$Impl_$.async(function(cb) {
		this1(cb);
		other(cb);
	});
};
tink_core__$Future_Future_$Impl_$.map = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = tink_core__$Future_Future_$Impl_$._new(function(callback) {
		return this1(function(result) {
			var data = f(result);
			callback(data);
		});
	});
	if(gather) return tink_core__$Future_Future_$Impl_$.gather(ret); else return ret;
};
tink_core__$Future_Future_$Impl_$.flatMap = function(this1,next,gather) {
	if(gather == null) gather = true;
	var ret = tink_core__$Future_Future_$Impl_$.flatten(tink_core__$Future_Future_$Impl_$.map(this1,next,gather));
	if(gather) return tink_core__$Future_Future_$Impl_$.gather(ret); else return ret;
};
tink_core__$Future_Future_$Impl_$.merge = function(this1,other,merger,gather) {
	if(gather == null) gather = true;
	return tink_core__$Future_Future_$Impl_$.flatMap(this1,function(t) {
		return tink_core__$Future_Future_$Impl_$.map(other,function(a) {
			return merger(t,a);
		},false);
	},gather);
};
tink_core__$Future_Future_$Impl_$.flatten = function(f) {
	return tink_core__$Future_Future_$Impl_$._new(function(callback) {
		var ret = null;
		ret = f(function(next) {
			ret = next(function(result) {
				callback(result);
			});
		});
		return ret;
	});
};
tink_core__$Future_Future_$Impl_$.fromTrigger = function(trigger) {
	return trigger.future;
};
tink_core__$Future_Future_$Impl_$.ofMany = function(futures,gather) {
	if(gather == null) gather = true;
	var ret = tink_core__$Future_Future_$Impl_$.sync([]);
	var _g = 0;
	while(_g < futures.length) {
		var f = [futures[_g]];
		++_g;
		ret = tink_core__$Future_Future_$Impl_$.flatMap(ret,(function(f) {
			return function(results) {
				return tink_core__$Future_Future_$Impl_$.map(f[0],(function() {
					return function(result) {
						return results.concat([result]);
					};
				})(),false);
			};
		})(f),false);
	}
	if(gather) return tink_core__$Future_Future_$Impl_$.gather(ret); else return ret;
};
tink_core__$Future_Future_$Impl_$.fromMany = function(futures) {
	return tink_core__$Future_Future_$Impl_$.ofMany(futures);
};
tink_core__$Future_Future_$Impl_$.lazy = function(l) {
	return tink_core__$Future_Future_$Impl_$._new(function(cb) {
		var data = l();
		cb(data);
		return null;
	});
};
tink_core__$Future_Future_$Impl_$.sync = function(v) {
	return tink_core__$Future_Future_$Impl_$._new(function(callback) {
		callback(v);
		return null;
	});
};
tink_core__$Future_Future_$Impl_$.async = function(f,lazy) {
	if(lazy == null) lazy = false;
	if(lazy) return tink_core__$Future_Future_$Impl_$.flatten(tink_core__$Future_Future_$Impl_$.lazy(tink_core__$Lazy_Lazy_$Impl_$.ofFunc((function(f1,f2,a1) {
		return function() {
			return f1(f2,a1);
		};
	})(tink_core__$Future_Future_$Impl_$.async,f,false)))); else {
		var op = new tink_core_FutureTrigger();
		f($bind(op,op.trigger));
		return op.future;
	}
};
tink_core__$Future_Future_$Impl_$.or = function(a,b) {
	return tink_core__$Future_Future_$Impl_$.first(a,b);
};
tink_core__$Future_Future_$Impl_$.either = function(a,b) {
	return tink_core__$Future_Future_$Impl_$.first(tink_core__$Future_Future_$Impl_$.map(a,tink_core_Either.Left,false),tink_core__$Future_Future_$Impl_$.map(b,tink_core_Either.Right,false));
};
tink_core__$Future_Future_$Impl_$.and = function(a,b) {
	return tink_core__$Future_Future_$Impl_$.merge(a,b,function(a1,b1) {
		return new tink_core_MPair(a1,b1);
	});
};
tink_core__$Future_Future_$Impl_$._tryFailingFlatMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.flatMap(f,function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return map(d);
		case 1:
			var f1 = o[2];
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(f1));
		}
	});
};
tink_core__$Future_Future_$Impl_$._tryFlatMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.flatMap(f,function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return tink_core__$Future_Future_$Impl_$.map(map(d),tink_core_Outcome.Success);
		case 1:
			var f1 = o[2];
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(f1));
		}
	});
};
tink_core__$Future_Future_$Impl_$._tryFailingMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.map(f,function(o) {
		return tink_core_OutcomeTools.flatMap(o,tink_core__$Outcome_OutcomeMapper_$Impl_$.withSameError(map));
	});
};
tink_core__$Future_Future_$Impl_$._tryMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.map(f,function(o) {
		return tink_core_OutcomeTools.map(o,map);
	});
};
tink_core__$Future_Future_$Impl_$._flatMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.flatMap(f,map);
};
tink_core__$Future_Future_$Impl_$._map = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.map(f,map);
};
tink_core__$Future_Future_$Impl_$.trigger = function() {
	return new tink_core_FutureTrigger();
};
var tink_core_FutureTrigger = function() {
	var _g = this;
	this.list = [];
	this.future = tink_core__$Future_Future_$Impl_$._new(function(callback) {
		if(_g.list == null) {
			callback(_g.result);
			return null;
		} else return tink_core__$Callback_CallbackList_$Impl_$.add(_g.list,callback);
	});
};
$hxClasses["tink.core.FutureTrigger"] = tink_core_FutureTrigger;
tink_core_FutureTrigger.__name__ = ["tink","core","FutureTrigger"];
tink_core_FutureTrigger.prototype = {
	result: null
	,list: null
	,future: null
	,asFuture: function() {
		return this.future;
	}
	,trigger: function(result) {
		if(this.list == null) return false; else {
			var list = this.list;
			this.list = null;
			this.result = result;
			tink_core__$Callback_CallbackList_$Impl_$.invoke(list,result);
			tink_core__$Callback_CallbackList_$Impl_$.clear(list);
			return true;
		}
	}
	,__class__: tink_core_FutureTrigger
};
var tink_core__$Lazy_Lazy_$Impl_$ = {};
$hxClasses["tink.core._Lazy.Lazy_Impl_"] = tink_core__$Lazy_Lazy_$Impl_$;
tink_core__$Lazy_Lazy_$Impl_$.__name__ = ["tink","core","_Lazy","Lazy_Impl_"];
tink_core__$Lazy_Lazy_$Impl_$._new = function(r) {
	return r;
};
tink_core__$Lazy_Lazy_$Impl_$.get = function(this1) {
	return this1();
};
tink_core__$Lazy_Lazy_$Impl_$.ofFunc = function(f) {
	var result = null;
	return function() {
		if(f != null) {
			result = f();
			f = null;
		}
		return result;
	};
};
tink_core__$Lazy_Lazy_$Impl_$.map = function(this1,f) {
	return tink_core__$Lazy_Lazy_$Impl_$.ofFunc(function() {
		return f(this1());
	});
};
tink_core__$Lazy_Lazy_$Impl_$.flatMap = function(this1,f) {
	return tink_core__$Lazy_Lazy_$Impl_$.ofFunc(function() {
		var this2 = f(this1());
		return this2();
	});
};
tink_core__$Lazy_Lazy_$Impl_$.ofConst = function(c) {
	return function() {
		return c;
	};
};
var tink_core_Noise = $hxClasses["tink.core.Noise"] = { __ename__ : ["tink","core","Noise"], __constructs__ : ["Noise"] };
tink_core_Noise.Noise = ["Noise",0];
tink_core_Noise.Noise.toString = $estr;
tink_core_Noise.Noise.__enum__ = tink_core_Noise;
var tink_core_Outcome = $hxClasses["tink.core.Outcome"] = { __ename__ : ["tink","core","Outcome"], __constructs__ : ["Success","Failure"] };
tink_core_Outcome.Success = function(data) { var $x = ["Success",0,data]; $x.__enum__ = tink_core_Outcome; $x.toString = $estr; return $x; };
tink_core_Outcome.Failure = function(failure) { var $x = ["Failure",1,failure]; $x.__enum__ = tink_core_Outcome; $x.toString = $estr; return $x; };
var tink_core_OutcomeTools = function() { };
$hxClasses["tink.core.OutcomeTools"] = tink_core_OutcomeTools;
tink_core_OutcomeTools.__name__ = ["tink","core","OutcomeTools"];
tink_core_OutcomeTools.sure = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		var failure = outcome[2];
		if(js_Boot.__instanceof(failure,tink_core_TypedError)) return failure.throwSelf(); else throw new js__$Boot_HaxeError(failure);
		break;
	}
};
tink_core_OutcomeTools.toOption = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return haxe_ds_Option.Some(data);
	case 1:
		return haxe_ds_Option.None;
	}
};
tink_core_OutcomeTools.toOutcome = function(option,pos) {
	switch(option[1]) {
	case 0:
		var value = option[2];
		return tink_core_Outcome.Success(value);
	case 1:
		return tink_core_Outcome.Failure(new tink_core_TypedError(404,"Some value expected but none found in " + pos.fileName + "@line " + pos.lineNumber,null,{ fileName : "Outcome.hx", lineNumber : 37, className : "tink.core.OutcomeTools", methodName : "toOutcome"}));
	}
};
tink_core_OutcomeTools.orNull = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		return null;
	}
};
tink_core_OutcomeTools.orUse = function(outcome,fallback) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		return fallback();
	}
};
tink_core_OutcomeTools.orTry = function(outcome,fallback) {
	switch(outcome[1]) {
	case 0:
		return outcome;
	case 1:
		return fallback();
	}
};
tink_core_OutcomeTools.equals = function(outcome,to) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data == to;
	case 1:
		return false;
	}
};
tink_core_OutcomeTools.map = function(outcome,transform) {
	switch(outcome[1]) {
	case 0:
		var a = outcome[2];
		return tink_core_Outcome.Success(transform(a));
	case 1:
		var f = outcome[2];
		return tink_core_Outcome.Failure(f);
	}
};
tink_core_OutcomeTools.isSuccess = function(outcome) {
	switch(outcome[1]) {
	case 0:
		return true;
	default:
		return false;
	}
};
tink_core_OutcomeTools.flatMap = function(o,mapper) {
	return tink_core__$Outcome_OutcomeMapper_$Impl_$.apply(mapper,o);
};
tink_core_OutcomeTools.attempt = function(f,report) {
	try {
		return tink_core_Outcome.Success(f());
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return tink_core_Outcome.Failure(report(e));
	}
};
var tink_core__$Outcome_OutcomeMapper_$Impl_$ = {};
$hxClasses["tink.core._Outcome.OutcomeMapper_Impl_"] = tink_core__$Outcome_OutcomeMapper_$Impl_$;
tink_core__$Outcome_OutcomeMapper_$Impl_$.__name__ = ["tink","core","_Outcome","OutcomeMapper_Impl_"];
tink_core__$Outcome_OutcomeMapper_$Impl_$._new = function(f) {
	return { f : f};
};
tink_core__$Outcome_OutcomeMapper_$Impl_$.apply = function(this1,o) {
	return this1.f(o);
};
tink_core__$Outcome_OutcomeMapper_$Impl_$.withSameError = function(f) {
	return tink_core__$Outcome_OutcomeMapper_$Impl_$._new(function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return f(d);
		case 1:
			var f1 = o[2];
			return tink_core_Outcome.Failure(f1);
		}
	});
};
tink_core__$Outcome_OutcomeMapper_$Impl_$.withEitherError = function(f) {
	return tink_core__$Outcome_OutcomeMapper_$Impl_$._new(function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			{
				var _g = f(d);
				switch(_g[1]) {
				case 0:
					var d1 = _g[2];
					return tink_core_Outcome.Success(d1);
				case 1:
					var f1 = _g[2];
					return tink_core_Outcome.Failure(tink_core_Either.Right(f1));
				}
			}
			break;
		case 1:
			var f2 = o[2];
			return tink_core_Outcome.Failure(tink_core_Either.Left(f2));
		}
	});
};
var tink_core__$Pair_Pair_$Impl_$ = {};
$hxClasses["tink.core._Pair.Pair_Impl_"] = tink_core__$Pair_Pair_$Impl_$;
tink_core__$Pair_Pair_$Impl_$.__name__ = ["tink","core","_Pair","Pair_Impl_"];
tink_core__$Pair_Pair_$Impl_$.__properties__ = {get_b:"get_b",get_a:"get_a"}
tink_core__$Pair_Pair_$Impl_$._new = function(a,b) {
	return new tink_core_MPair(a,b);
};
tink_core__$Pair_Pair_$Impl_$.get_a = function(this1) {
	return this1.a;
};
tink_core__$Pair_Pair_$Impl_$.get_b = function(this1) {
	return this1.b;
};
tink_core__$Pair_Pair_$Impl_$.toBool = function(this1) {
	return this1 != null;
};
tink_core__$Pair_Pair_$Impl_$.isNil = function(this1) {
	return this1 == null;
};
tink_core__$Pair_Pair_$Impl_$.nil = function() {
	return null;
};
var tink_core_MPair = function(a,b) {
	this.a = a;
	this.b = b;
};
$hxClasses["tink.core.MPair"] = tink_core_MPair;
tink_core_MPair.__name__ = ["tink","core","MPair"];
tink_core_MPair.prototype = {
	a: null
	,b: null
	,__class__: tink_core_MPair
};
var tink_core__$Ref_Ref_$Impl_$ = {};
$hxClasses["tink.core._Ref.Ref_Impl_"] = tink_core__$Ref_Ref_$Impl_$;
tink_core__$Ref_Ref_$Impl_$.__name__ = ["tink","core","_Ref","Ref_Impl_"];
tink_core__$Ref_Ref_$Impl_$.__properties__ = {set_value:"set_value",get_value:"get_value"}
tink_core__$Ref_Ref_$Impl_$._new = function() {
	return (function($this) {
		var $r;
		var this1;
		this1 = new Array(1);
		$r = this1;
		return $r;
	}(this));
};
tink_core__$Ref_Ref_$Impl_$.get_value = function(this1) {
	return this1[0];
};
tink_core__$Ref_Ref_$Impl_$.set_value = function(this1,param) {
	return this1[0] = param;
};
tink_core__$Ref_Ref_$Impl_$.toString = function(this1) {
	return "@[" + Std.string(this1[0]) + "]";
};
tink_core__$Ref_Ref_$Impl_$.to = function(v) {
	var ret;
	ret = (function($this) {
		var $r;
		var this1;
		this1 = new Array(1);
		$r = this1;
		return $r;
	}(this));
	ret[0] = v;
	return ret;
};
var tink_core__$Signal_Signal_$Impl_$ = {};
$hxClasses["tink.core._Signal.Signal_Impl_"] = tink_core__$Signal_Signal_$Impl_$;
tink_core__$Signal_Signal_$Impl_$.__name__ = ["tink","core","_Signal","Signal_Impl_"];
tink_core__$Signal_Signal_$Impl_$._new = function(f) {
	return f;
};
tink_core__$Signal_Signal_$Impl_$.handle = function(this1,handler) {
	return this1(handler);
};
tink_core__$Signal_Signal_$Impl_$.map = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			var data = f(result);
			cb(data);
		});
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
tink_core__$Signal_Signal_$Impl_$.flatMap = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			var this2 = f(result);
			this2(cb);
		});
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
tink_core__$Signal_Signal_$Impl_$.filter = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			if(f(result)) cb(result);
		});
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
tink_core__$Signal_Signal_$Impl_$.join = function(this1,other,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return tink_core__$Callback_CallbackLink_$Impl_$.fromMany([this1(cb),other(cb)]);
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
tink_core__$Signal_Signal_$Impl_$.next = function(this1) {
	var ret = new tink_core_FutureTrigger();
	var handler = tink_core__$Callback_CallbackLink_$Impl_$.toCallback(this1($bind(ret,ret.trigger)));
	this1(handler);
	return ret.future;
};
tink_core__$Signal_Signal_$Impl_$.noise = function(this1) {
	return tink_core__$Signal_Signal_$Impl_$.map(this1,function(_) {
		return tink_core_Noise.Noise;
	});
};
tink_core__$Signal_Signal_$Impl_$.gather = function(this1) {
	var ret = tink_core__$Signal_Signal_$Impl_$.trigger();
	this1(function(x) {
		tink_core__$Callback_CallbackList_$Impl_$.invoke(ret,x);
	});
	return tink_core__$Signal_SignalTrigger_$Impl_$.asSignal(ret);
};
tink_core__$Signal_Signal_$Impl_$.trigger = function() {
	return [];
};
tink_core__$Signal_Signal_$Impl_$.ofClassical = function(add,remove,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		var f = function(a) {
			cb(a);
		};
		add(f);
		{
			var f2 = (function(f1,a1) {
				return function() {
					f1(a1);
				};
			})(remove,f);
			return f2;
		}
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
var tink_core__$Signal_SignalTrigger_$Impl_$ = {};
$hxClasses["tink.core._Signal.SignalTrigger_Impl_"] = tink_core__$Signal_SignalTrigger_$Impl_$;
tink_core__$Signal_SignalTrigger_$Impl_$.__name__ = ["tink","core","_Signal","SignalTrigger_Impl_"];
tink_core__$Signal_SignalTrigger_$Impl_$._new = function() {
	return [];
};
tink_core__$Signal_SignalTrigger_$Impl_$.trigger = function(this1,event) {
	tink_core__$Callback_CallbackList_$Impl_$.invoke(this1,event);
};
tink_core__$Signal_SignalTrigger_$Impl_$.getLength = function(this1) {
	return this1.length;
};
tink_core__$Signal_SignalTrigger_$Impl_$.clear = function(this1) {
	tink_core__$Callback_CallbackList_$Impl_$.clear(this1);
};
tink_core__$Signal_SignalTrigger_$Impl_$.asSignal = function(this1) {
	var f = (function(_e) {
		return function(cb) {
			return tink_core__$Callback_CallbackList_$Impl_$.add(_e,cb);
		};
	})(this1);
	return f;
};
var ufront_MVC = function() { };
$hxClasses["ufront.MVC"] = ufront_MVC;
ufront_MVC.__name__ = ["ufront","MVC"];
var ufront_api_ApiReturnType = $hxClasses["ufront.api.ApiReturnType"] = { __ename__ : ["ufront","api","ApiReturnType"], __constructs__ : ["ARTFuture","ARTOutcome","ARTVoid"] };
ufront_api_ApiReturnType.ARTFuture = ["ARTFuture",0];
ufront_api_ApiReturnType.ARTFuture.toString = $estr;
ufront_api_ApiReturnType.ARTFuture.__enum__ = ufront_api_ApiReturnType;
ufront_api_ApiReturnType.ARTOutcome = ["ARTOutcome",1];
ufront_api_ApiReturnType.ARTOutcome.toString = $estr;
ufront_api_ApiReturnType.ARTOutcome.__enum__ = ufront_api_ApiReturnType;
ufront_api_ApiReturnType.ARTVoid = ["ARTVoid",2];
ufront_api_ApiReturnType.ARTVoid.toString = $estr;
ufront_api_ApiReturnType.ARTVoid.__enum__ = ufront_api_ApiReturnType;
var ufront_api_RequireAsyncCallbackApi = function() { };
$hxClasses["ufront.api.RequireAsyncCallbackApi"] = ufront_api_RequireAsyncCallbackApi;
ufront_api_RequireAsyncCallbackApi.__name__ = ["ufront","api","RequireAsyncCallbackApi"];
var ufront_api_UFApi = function() {
};
$hxClasses["ufront.api.UFApi"] = ufront_api_UFApi;
ufront_api_UFApi.__name__ = ["ufront","api","UFApi"];
ufront_api_UFApi.prototype = {
	auth: null
	,messages: null
	,ufTrace: function(msg,pos) {
		this.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MTrace});
	}
	,ufLog: function(msg,pos) {
		this.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MLog});
	}
	,ufWarn: function(msg,pos) {
		this.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MWarning});
	}
	,ufError: function(msg,pos) {
		this.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MError});
	}
	,toString: function() {
		return Type.getClassName(js_Boot.getClass(this));
	}
	,__class__: ufront_api_UFApi
};
var ufront_api_UFApiClientContext = function(url,errorHandler) {
	this.cnx = ufront_remoting_HttpAsyncConnection.urlConnect(url,errorHandler);
};
$hxClasses["ufront.api.UFApiClientContext"] = ufront_api_UFApiClientContext;
ufront_api_UFApiClientContext.__name__ = ["ufront","api","UFApiClientContext"];
ufront_api_UFApiClientContext.prototype = {
	cnx: null
	,__class__: ufront_api_UFApiClientContext
};
var ufront_api_UFApiContext = function() {
};
$hxClasses["ufront.api.UFApiContext"] = ufront_api_UFApiContext;
ufront_api_UFApiContext.__name__ = ["ufront","api","UFApiContext"];
ufront_api_UFApiContext.getApisInContext = function(context) {
	var apis = [];
	var meta = haxe_rtti_Meta.getType(context);
	if(meta.apiList != null) {
		var _g = 0;
		var _g1 = meta.apiList;
		while(_g < _g1.length) {
			var apiName = _g1[_g];
			++_g;
			var api = Type.resolveClass(apiName);
			if(api != null) apis.push(api);
		}
	}
	return apis;
};
ufront_api_UFApiContext.prototype = {
	injector: null
	,__class__: ufront_api_UFApiContext
};
var ufront_api_UFAsyncApi = function() {
};
$hxClasses["ufront.api.UFAsyncApi"] = ufront_api_UFAsyncApi;
ufront_api_UFAsyncApi.__name__ = ["ufront","api","UFAsyncApi"];
ufront_api_UFAsyncApi.getAsyncApi = function(syncApi) {
	var meta = haxe_rtti_Meta.getType(syncApi);
	if(meta.asyncApi != null) {
		var asyncApiName = meta.asyncApi[0];
		if(asyncApiName != null) return Type.resolveClass(asyncApiName);
	}
	return null;
};
ufront_api_UFAsyncApi.prototype = {
	className: null
	,api: null
	,_makeApiCall: function(method,args,flags,pos) {
		var _g = this;
		var remotingCallString = "" + this.className + "." + method + "(" + args.join(",") + ")";
		var callApi = function() {
			return Reflect.callMethod(_g.api,Reflect.field(_g.api,method),args);
		};
		var returnError = function(e) {
			var stack = haxe_CallStack.toString(haxe_CallStack.exceptionStack());
			var remotingError = ufront_remoting_RemotingError.RServerSideException(remotingCallString,e,stack);
			return ufront_core_SurpriseTools.asBadSurprise(ufront_web_HttpError.remotingError(remotingError,pos));
		};
		if((flags & 1 << ufront_api_ApiReturnType.ARTVoid[1]) != 0) try {
			callApi();
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(null));
		} catch( e1 ) {
			haxe_CallStack.lastException = e1;
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			return returnError(e1);
		} else if((flags & 1 << ufront_api_ApiReturnType.ARTFuture[1]) != 0 && (flags & 1 << ufront_api_ApiReturnType.ARTOutcome[1]) != 0) try {
			var surprise = callApi();
			return tink_core__$Future_Future_$Impl_$.map(surprise,function(result) {
				switch(result[1]) {
				case 0:
					var data = result[2];
					return tink_core_Outcome.Success(data);
				case 1:
					var err = result[2];
					return tink_core_Outcome.Failure(ufront_web_HttpError.remotingError(ufront_remoting_RemotingError.RApiFailure(remotingCallString,err),pos));
				}
			});
		} catch( e2 ) {
			haxe_CallStack.lastException = e2;
			if (e2 instanceof js__$Boot_HaxeError) e2 = e2.val;
			return returnError(e2);
		} else if((flags & 1 << ufront_api_ApiReturnType.ARTFuture[1]) != 0) try {
			var future = callApi();
			return tink_core__$Future_Future_$Impl_$.map(future,function(data1) {
				return tink_core_Outcome.Success(data1);
			});
		} catch( e3 ) {
			haxe_CallStack.lastException = e3;
			if (e3 instanceof js__$Boot_HaxeError) e3 = e3.val;
			return returnError(e3);
		} else if((flags & 1 << ufront_api_ApiReturnType.ARTOutcome[1]) != 0) try {
			var outcome = callApi();
			switch(outcome[1]) {
			case 0:
				var data2 = outcome[2];
				return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(data2));
			case 1:
				var err1 = outcome[2];
				return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(ufront_web_HttpError.remotingError(ufront_remoting_RemotingError.RApiFailure(remotingCallString,err1),pos)));
			}
		} catch( e4 ) {
			haxe_CallStack.lastException = e4;
			if (e4 instanceof js__$Boot_HaxeError) e4 = e4.val;
			return returnError(e4);
		} else try {
			var result1 = callApi();
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(result1));
		} catch( e5 ) {
			haxe_CallStack.lastException = e5;
			if (e5 instanceof js__$Boot_HaxeError) e5 = e5.val;
			return returnError(e5);
		}
	}
	,__class__: ufront_api_UFAsyncApi
};
var ufront_api_UFCallbackApi = function() {
};
$hxClasses["ufront.api.UFCallbackApi"] = ufront_api_UFCallbackApi;
ufront_api_UFCallbackApi.__name__ = ["ufront","api","UFCallbackApi"];
ufront_api_UFCallbackApi.getCallbackApi = function(syncApi) {
	var meta = haxe_rtti_Meta.getType(syncApi);
	if(meta.callbackApi != null) {
		var asyncCallbackApiName = meta.callbackApi[0];
		if(asyncCallbackApiName != null) return Type.resolveClass(asyncCallbackApiName);
	}
	return null;
};
ufront_api_UFCallbackApi.prototype = {
	className: null
	,api: null
	,_makeApiCall: function(method,args,flags,onResult,onError) {
		var _g = this;
		if(this.className == null) this.className = Type.getClassName(js_Boot.getClass(this));
		var remotingCallString = "" + this.className + "." + method + "(" + args.join(",") + ")";
		var callApi = function() {
			return Reflect.callMethod(_g.api,Reflect.field(_g.api,method),args);
		};
		var processError = function(e) {
			var stack = haxe_CallStack.toString(haxe_CallStack.exceptionStack());
			var data = ufront_remoting_RemotingError.RServerSideException(remotingCallString,e,stack);
			onError(data);
		};
		if(onError == null) onError = function(err) {
		};
		if((flags & 1 << ufront_api_ApiReturnType.ARTVoid[1]) != 0) try {
			callApi();
			onResult(null);
		} catch( e1 ) {
			haxe_CallStack.lastException = e1;
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			processError(e1);
		} else if((flags & 1 << ufront_api_ApiReturnType.ARTFuture[1]) != 0 && (flags & 1 << ufront_api_ApiReturnType.ARTOutcome[1]) != 0) try {
			var surprise = callApi();
			surprise(function(result) {
				switch(result[1]) {
				case 0:
					var data1 = result[2];
					onResult(data1);
					break;
				case 1:
					var err1 = result[2];
					var data2 = ufront_remoting_RemotingError.RApiFailure(remotingCallString,err1);
					onError(data2);
					break;
				}
			});
		} catch( e2 ) {
			haxe_CallStack.lastException = e2;
			if (e2 instanceof js__$Boot_HaxeError) e2 = e2.val;
			processError(e2);
		} else if((flags & 1 << ufront_api_ApiReturnType.ARTFuture[1]) != 0) try {
			var future = callApi();
			future(function(data3) {
				onResult(data3);
			});
		} catch( e3 ) {
			haxe_CallStack.lastException = e3;
			if (e3 instanceof js__$Boot_HaxeError) e3 = e3.val;
			processError(e3);
		} else if((flags & 1 << ufront_api_ApiReturnType.ARTOutcome[1]) != 0) try {
			var outcome = callApi();
			switch(outcome[1]) {
			case 0:
				var data4 = outcome[2];
				onResult(data4);
				break;
			case 1:
				var err2 = outcome[2];
				var data5 = ufront_remoting_RemotingError.RApiFailure(remotingCallString,err2);
				onError(data5);
				break;
			}
		} catch( e4 ) {
			haxe_CallStack.lastException = e4;
			if (e4 instanceof js__$Boot_HaxeError) e4 = e4.val;
			processError(e4);
		} else try {
			var result1 = callApi();
			onResult(result1);
		} catch( e5 ) {
			haxe_CallStack.lastException = e5;
			if (e5 instanceof js__$Boot_HaxeError) e5 = e5.val;
			processError(e5);
		}
	}
	,__class__: ufront_api_UFCallbackApi
};
var ufront_app_HttpApplication = function() {
	this.pathToContentDir = null;
	this.requestMiddleware = [];
	this.requestHandlers = [];
	this.responseMiddleware = [];
	this.logHandlers = [];
	this.errorHandlers = [];
	this.urlFilters = [];
	this.messages = [];
	this.injector = new minject_Injector();
	this.injector.mapType("minject.Injector",null).toValue(this.injector);
};
$hxClasses["ufront.app.HttpApplication"] = ufront_app_HttpApplication;
ufront_app_HttpApplication.__name__ = ["ufront","app","HttpApplication"];
ufront_app_HttpApplication.prototype = {
	injector: null
	,requestMiddleware: null
	,requestHandlers: null
	,responseMiddleware: null
	,logHandlers: null
	,errorHandlers: null
	,urlFilters: null
	,originalTrace: null
	,messages: null
	,modulesReady: null
	,currentModule: null
	,pathToContentDir: null
	,init: function() {
		var _g = this;
		this.originalTrace = haxe_Log.trace;
		haxe_Log.trace = function(msg,pos) {
			_g.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MTrace});
		};
		if(this.modulesReady == null) {
			var futures = [];
			var _g1 = 0;
			var _g11 = this.getModulesThatRequireInit();
			while(_g1 < _g11.length) {
				var $module = _g11[_g1];
				++_g1;
				futures.push($module.init(this));
			}
			this.modulesReady = tink_core__$Future_Future_$Impl_$.map(tink_core__$Future_Future_$Impl_$.ofMany(futures),function(outcomes) {
				var _g2 = 0;
				while(_g2 < outcomes.length) {
					var o = outcomes[_g2];
					++_g2;
					switch(o[1]) {
					case 1:
						var err = o[2];
						return tink_core_Outcome.Failure(err);
					case 0:
						break;
					}
				}
				return tink_core_Outcome.Success(tink_core_Noise.Noise);
			});
		}
		return this.modulesReady;
	}
	,dispose: function() {
		var _g = this;
		var futures = [];
		var _g1 = 0;
		var _g11 = this.getModulesThatRequireInit();
		while(_g1 < _g11.length) {
			var $module = _g11[_g1];
			++_g1;
			futures.push($module.dispose(this));
		}
		return tink_core__$Future_Future_$Impl_$.map(tink_core__$Future_Future_$Impl_$.ofMany(futures),function(outcomes) {
			_g.modulesReady = null;
			var _g12 = 0;
			while(_g12 < outcomes.length) {
				var o = outcomes[_g12];
				++_g12;
				switch(o[1]) {
				case 1:
					return o;
				case 0:
					break;
				}
			}
			haxe_Log.trace = _g.originalTrace;
			return tink_core_Outcome.Success(tink_core_Noise.Noise);
		});
	}
	,getModulesThatRequireInit: function() {
		var moduleSets = [this.requestMiddleware,this.requestHandlers,this.responseMiddleware,this.logHandlers,this.errorHandlers];
		var modules = [];
		var _g = 0;
		while(_g < moduleSets.length) {
			var set = moduleSets[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < set.length) {
				var $module = set[_g1];
				++_g1;
				if(js_Boot.__instanceof($module,ufront_app_UFInitRequired)) modules.push($module);
			}
		}
		return modules;
	}
	,addRequestMiddleware: function(middlewareItem,middleware,first) {
		if(first == null) first = false;
		return this.addModule(this.requestMiddleware,middlewareItem,middleware,first);
	}
	,addRequestHandler: function(handler,handlers,first) {
		if(first == null) first = false;
		return this.addModule(this.requestHandlers,handler,handlers,first);
	}
	,addErrorHandler: function(handler,handlers,first) {
		if(first == null) first = false;
		return this.addModule(this.errorHandlers,handler,handlers,first);
	}
	,addResponseMiddleware: function(middlewareItem,middleware,last) {
		if(last == null) last = false;
		return this.addModule(this.responseMiddleware,middlewareItem,middleware,!last);
	}
	,addMiddleware: function(middlewareItem,middleware,firstInLastOut) {
		if(firstInLastOut == null) firstInLastOut = false;
		this.addModule(this.requestMiddleware,middlewareItem,middleware,firstInLastOut);
		this.addModule(this.responseMiddleware,middlewareItem,middleware,!firstInLastOut);
		return this;
	}
	,addLogHandler: function(logger,loggers,first) {
		if(first == null) first = false;
		return this.addModule(this.logHandlers,logger,loggers,first);
	}
	,addModule: function(modulesArr,newModule,newModules,first) {
		if(newModule != null) {
			this.injector.injectInto(newModule);
			if(first) modulesArr.unshift(newModule); else modulesArr.push(newModule);
		}
		if(newModules != null) {
			var $it0 = $iterator(newModules)();
			while( $it0.hasNext() ) {
				var newModule1 = $it0.next();
				this.injector.injectInto(newModule1);
				if(first) modulesArr.unshift(newModule1); else modulesArr.push(newModule1);
			}
		}
		return this;
	}
	,execute: function(httpContext) {
		var _g = this;
		httpContext.setUrlFilters(this.urlFilters);
		var reqMidModules = this.requestMiddleware.map(function(m) {
			var a = (function(f) {
				return function(a1) {
					return f(a1);
				};
			})($bind(m,m.requestIn));
			var b = { methodName : "requestIn", lineNumber : -1, fileName : "", customParams : [], className : Type.getClassName(Type.getClass(m))};
			return new tink_core_MPair(a,b);
		});
		var reqHandModules = this.requestHandlers.map(function(m1) {
			var a2 = (function(f1) {
				return function(a11) {
					return f1(a11);
				};
			})($bind(m1,m1.handleRequest));
			var b1 = { methodName : "handleRequest", lineNumber : -1, fileName : "", customParams : [], className : Type.getClassName(Type.getClass(m1))};
			return new tink_core_MPair(a2,b1);
		});
		var resMidModules = this.responseMiddleware.map(function(m2) {
			var a3 = (function(f2) {
				return function(a12) {
					return f2(a12);
				};
			})($bind(m2,m2.responseOut));
			var b2 = { methodName : "requestOut", lineNumber : -1, fileName : "", customParams : [], className : Type.getClassName(Type.getClass(m2))};
			return new tink_core_MPair(a3,b2);
		});
		var logHandModules = this.logHandlers.map(function(m3) {
			var a4 = (function(f3,a21) {
				return function(a13) {
					return f3(a13,a21);
				};
			})($bind(m3,m3.log),_g.messages);
			var b3 = { methodName : "log", lineNumber : -1, fileName : "", customParams : ["httpContext","appMessages"], className : Type.getClassName(Type.getClass(m3))};
			return new tink_core_MPair(a4,b3);
		});
		this.logModule(httpContext,"Begin executing request " + httpContext.getRequestUri());
		var allDone = tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.init(),function(n) {
			return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(_g.executeModules(reqMidModules,httpContext,ufront_web_context_RequestCompletion.CRequestMiddlewareComplete),function(n1) {
				return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(_g.executeModules(reqHandModules,httpContext,ufront_web_context_RequestCompletion.CRequestHandlersComplete),function(n2) {
					return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(_g.executeModules(resMidModules,httpContext,ufront_web_context_RequestCompletion.CResponseMiddlewareComplete),function(n3) {
						return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(_g.executeModules(logHandModules,httpContext,ufront_web_context_RequestCompletion.CLogHandlersComplete),function(n4) {
							return tink_core__$Future_Future_$Impl_$._tryMap(_g.clearMessages(),function(n5) {
								return _g.flush(httpContext);
							});
						});
					});
				});
			});
		});
		allDone((function($this) {
			var $r;
			var f4 = function() {
				_g.logModule(httpContext,"End executing request " + httpContext.getRequestUri());
			};
			$r = function(r) {
				f4();
			};
			return $r;
		}(this)));
		return allDone;
	}
	,logModule: function(ctx,msg) {
	}
	,executeModules: function(modules,ctx,flag) {
		var _g = this;
		var done = new tink_core_FutureTrigger();
		var runNext;
		var runNext1 = null;
		runNext1 = function() {
			var m = modules.shift();
			if(flag != null && (ctx.completion & 1 << flag[1]) != 0) done.trigger(tink_core_Outcome.Success(tink_core_Noise.Noise)); else if(m == null) {
				if(flag != null) ctx.completion |= 1 << flag[1];
				done.trigger(tink_core_Outcome.Success(tink_core_Noise.Noise));
			} else {
				var moduleCb = m.a;
				_g.currentModule = m.b;
				var moduleResult;
				try {
					moduleResult = moduleCb(ctx);
				} catch( e ) {
					haxe_CallStack.lastException = e;
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					ctx.messages.push({ msg : "Caught error " + Std.string(e) + " while executing module " + _g.currentModule.className + "." + _g.currentModule.methodName + " in HttpApplication.executeModules()", pos : { fileName : "HttpApplication.hx", lineNumber : 422, className : "ufront.app.HttpApplication", methodName : "executeModules"}, type : ufront_log_MessageType.MLog});
					moduleResult = tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e,null,_g.currentModule)));
				}
				moduleResult(function(result) {
					switch(result[1]) {
					case 0:
						runNext1();
						break;
					case 1:
						var e1 = result[2];
						_g.handleError(e1,ctx,done);
						break;
					}
				});
			}
		};
		runNext = runNext1;
		runNext();
		return done.future;
	}
	,handleError: function(err,ctx,doneTrigger) {
		var _g = this;
		if(!((ctx.completion & 1 << ufront_web_context_RequestCompletion.CErrorHandlersTriggered[1]) != 0)) {
			ctx.completion |= 1 << ufront_web_context_RequestCompletion.CErrorHandlersTriggered[1];
			var errHandlerModules = this.errorHandlers.map(function(m) {
				var a = (function(f,a1) {
					return function(a2) {
						return f(a1,a2);
					};
				})($bind(m,m.handleError),err);
				var b = ufront_web_HttpError.fakePosition(m,"handleError",[err.toString()]);
				return new tink_core_MPair(a,b);
			});
			var resMidModules = this.responseMiddleware.map(function(m1) {
				var a3 = (function(f1) {
					return function(a11) {
						return f1(a11);
					};
				})($bind(m1,m1.responseOut));
				var b1 = { methodName : "requestOut", lineNumber : -1, fileName : "", customParams : [], className : Type.getClassName(Type.getClass(m1))};
				return new tink_core_MPair(a3,b1);
			});
			var logHandModules = this.logHandlers.map(function(m2) {
				var a4 = (function(f2,a21) {
					return function(a12) {
						return f2(a12,a21);
					};
				})($bind(m2,m2.log),_g.messages);
				var b2 = { methodName : "log", lineNumber : -1, fileName : "", customParams : ["httpContext","appMessages"], className : Type.getClassName(Type.getClass(m2))};
				return new tink_core_MPair(a4,b2);
			});
			var allDone = tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.executeModules(errHandlerModules,ctx,ufront_web_context_RequestCompletion.CErrorHandlersComplete),function(n) {
				ctx.completion |= 1 << ufront_web_context_RequestCompletion.CRequestHandlersComplete[1];
				return ufront_core_SurpriseTools.success();
			}),function(n1) {
				return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(_g.executeModules(resMidModules,ctx,ufront_web_context_RequestCompletion.CResponseMiddlewareComplete),function(n2) {
					return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(_g.executeModules(logHandModules,ctx,ufront_web_context_RequestCompletion.CLogHandlersComplete),function(n3) {
						return tink_core__$Future_Future_$Impl_$._tryMap(_g.clearMessages(),function(n4) {
							return _g.flush(ctx);
						});
					});
				});
			});
			allDone((function($this) {
				var $r;
				var f3 = function() {
					doneTrigger.trigger(tink_core_Outcome.Failure(err));
				};
				$r = function(r) {
					f3();
				};
				return $r;
			}(this)));
		} else {
			var msg = "You had an error after your error handler had already run.  Last active module: " + this.currentModule.className + "." + this.currentModule.methodName;
			throw new js__$Boot_HaxeError("" + msg + " \nError: " + Std.string(err) + " \nError Data: " + Std.string(err.data));
		}
	}
	,clearMessages: function() {
		var _g1 = 0;
		var _g = this.messages.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.messages.pop();
		}
		return ufront_core_SurpriseTools.success();
	}
	,flush: function(ctx) {
		if(!((ctx.completion & 1 << ufront_web_context_RequestCompletion.CFlushComplete[1]) != 0)) {
			ctx.response.flush();
			ctx.completion |= 1 << ufront_web_context_RequestCompletion.CFlushComplete[1];
		}
		return tink_core_Noise.Noise;
	}
	,listen: function(port) {
		if(port == null) port = 2987;
		var _g = this;
		var app = express_Express();
		app["use"](require("compression")());
		app["use"](express_Express["static"](".",null));
		var path = haxe_io_Path.normalize(__dirname + "/../uf-content");
		app["use"]("/files",express_Express["static"](path,null));
		app["use"](mw_BodyParser.json());
		app["use"](mw_BodyParser.urlencoded({ extended : true}));
		app["use"](mw_CookieParser());
		var uploadPath = __dirname + "/" + haxe_io_Path.addTrailingSlash(this.pathToContentDir) + haxe_io_Path.addTrailingSlash(ufront_web_upload_TmpFileUploadMiddleware.subDir);
		app.post("/*",require('multer')({ dest : uploadPath}).any());
		var ufAppMiddleware = function(req,res,next) {
			var context;
			if(_g.pathToContentDir != null) context = ufront_web_context_HttpContext.createNodeJsContext(req,res,_g.injector,null,null,_g.urlFilters,_g.pathToContentDir); else context = ufront_web_context_HttpContext.createNodeJsContext(req,res,null,null,null,_g.urlFilters);
			var this1 = _g.execute(context);
			this1(function(result) {
				next(null);
			});
		};
		app["use"](ufAppMiddleware);
		app.listen(port);
	}
	,useModNekoCache: function() {
	}
	,addUrlFilter: function(filter) {
		ufront_web_HttpError.throwIfNull(filter,"filter",{ fileName : "HttpApplication.hx", lineNumber : 594, className : "ufront.app.HttpApplication", methodName : "addUrlFilter"});
		this.urlFilters.push(filter);
	}
	,clearUrlFilters: function() {
		this.urlFilters = [];
	}
	,setContentDirectory: function(relativePath) {
		this.pathToContentDir = relativePath;
	}
	,__class__: ufront_app_HttpApplication
};
var ufront_app_UFErrorHandler = function() { };
$hxClasses["ufront.app.UFErrorHandler"] = ufront_app_UFErrorHandler;
ufront_app_UFErrorHandler.__name__ = ["ufront","app","UFErrorHandler"];
ufront_app_UFErrorHandler.prototype = {
	handleError: null
	,__class__: ufront_app_UFErrorHandler
};
var ufront_app_UFInitRequired = function() { };
$hxClasses["ufront.app.UFInitRequired"] = ufront_app_UFInitRequired;
ufront_app_UFInitRequired.__name__ = ["ufront","app","UFInitRequired"];
ufront_app_UFInitRequired.prototype = {
	init: null
	,dispose: null
	,__class__: ufront_app_UFInitRequired
};
var ufront_app_UFLogHandler = function() { };
$hxClasses["ufront.app.UFLogHandler"] = ufront_app_UFLogHandler;
ufront_app_UFLogHandler.__name__ = ["ufront","app","UFLogHandler"];
ufront_app_UFLogHandler.prototype = {
	log: null
	,__class__: ufront_app_UFLogHandler
};
var ufront_app_UFResponseMiddleware = function() { };
$hxClasses["ufront.app.UFResponseMiddleware"] = ufront_app_UFResponseMiddleware;
ufront_app_UFResponseMiddleware.__name__ = ["ufront","app","UFResponseMiddleware"];
ufront_app_UFResponseMiddleware.prototype = {
	responseOut: null
	,__class__: ufront_app_UFResponseMiddleware
};
var ufront_app_UFRequestMiddleware = function() { };
$hxClasses["ufront.app.UFRequestMiddleware"] = ufront_app_UFRequestMiddleware;
ufront_app_UFRequestMiddleware.__name__ = ["ufront","app","UFRequestMiddleware"];
ufront_app_UFRequestMiddleware.prototype = {
	requestIn: null
	,__class__: ufront_app_UFRequestMiddleware
};
var ufront_app_UFMiddleware = function() { };
$hxClasses["ufront.app.UFMiddleware"] = ufront_app_UFMiddleware;
ufront_app_UFMiddleware.__name__ = ["ufront","app","UFMiddleware"];
ufront_app_UFMiddleware.__interfaces__ = [ufront_app_UFResponseMiddleware,ufront_app_UFRequestMiddleware];
var ufront_app_UFRequestHandler = function() { };
$hxClasses["ufront.app.UFRequestHandler"] = ufront_app_UFRequestHandler;
ufront_app_UFRequestHandler.__name__ = ["ufront","app","UFRequestHandler"];
ufront_app_UFRequestHandler.prototype = {
	handleRequest: null
	,toString: null
	,__class__: ufront_app_UFRequestHandler
};
var ufront_app_UfrontApplication = function(optionsIn) {
	this.appTemplatingEngines = new List();
	this.firstRun = true;
	ufront_app_HttpApplication.call(this);
	this.configuration = ufront_app_DefaultUfrontConfiguration.get();
	var _g = 0;
	var _g1 = Reflect.fields(optionsIn);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		var value = Reflect.field(optionsIn,field);
		this.configuration[field] = value;
	}
	this.mvcHandler = new ufront_web_MVCHandler(this.configuration.indexController);
	this.remotingHandler = new ufront_remoting_RemotingHandler();
	if(this.configuration.remotingApi != null) this.remotingHandler.loadApiContext(this.configuration.remotingApi);
	var $it0 = $iterator(this.configuration.controllers)();
	while( $it0.hasNext() ) {
		var controller = $it0.next();
		this.injector.mapRuntimeTypeOf(controller)._toClass(controller);
	}
	this.addModule(this.requestMiddleware,null,this.configuration.requestMiddleware,false);
	this.addModule(this.requestHandlers,null,[this.remotingHandler,this.mvcHandler],false);
	this.addModule(this.responseMiddleware,null,this.configuration.responseMiddleware,true);
	this.addModule(this.errorHandlers,null,this.configuration.errorHandlers,false);
	if(!this.configuration.disableServerTrace) this.addLogHandler(new ufront_log_ServerConsoleLogger(),null,null);
	if(!this.configuration.disableBrowserTrace) {
		this.addLogHandler(new ufront_log_BrowserConsoleLogger(),null,null);
		this.addLogHandler(new ufront_log_RemotingLogger(),null,null);
	}
	if(null != this.configuration.logFile) this.addLogHandler(new ufront_log_FileLogger(this.configuration.logFile),null,null);
	var path = this.configuration.basePath;
	if(StringTools.endsWith(path,"/")) path = HxOverrides.substr(path,0,path.length - 1);
	if(StringTools.startsWith(path,"/")) path = HxOverrides.substr(path,1,null);
	if(path.length > 0) ufront_app_HttpApplication.prototype.addUrlFilter.call(this,new ufront_web_url_filter_DirectoryUrlFilter(path));
	if(this.configuration.urlRewrite != true) ufront_app_HttpApplication.prototype.addUrlFilter.call(this,new ufront_web_url_filter_PathInfoUrlFilter());
	if(this.configuration.sessionImplementation != null) {
		this.injector.mapType("ufront.web.session.UFHttpSession",null,null)._toClass(this.configuration.sessionImplementation);
		this.injector.mapRuntimeTypeOf(this.configuration.sessionImplementation)._toClass(this.configuration.sessionImplementation);
	}
	if(this.configuration.authImplementation != null) {
		this.injector.mapType("ufront.auth.UFAuthHandler",null,null)._toClass(this.configuration.authImplementation);
		this.injector.mapRuntimeTypeOf(this.configuration.authImplementation)._toClass(this.configuration.authImplementation);
	}
	if(this.configuration.viewEngine != null) {
		this.injector.mapType("String","viewPath",null).toValue(this.configuration.viewPath);
		this.injector.mapType("ufront.view.UFViewEngine",null,null)._toSingleton(this.configuration.viewEngine);
	}
	if(this.configuration.contentDirectory != null) this.setContentDirectory(this.configuration.contentDirectory);
	if(this.configuration.defaultLayout != null) this.injector.mapType("String","defaultLayout",null).toValue(this.configuration.defaultLayout);
	var _g2 = 0;
	var _g11 = this.configuration.templatingEngines;
	while(_g2 < _g11.length) {
		var te = _g11[_g2];
		++_g2;
		this.addTemplatingEngine(te);
	}
};
$hxClasses["ufront.app.UfrontApplication"] = ufront_app_UfrontApplication;
ufront_app_UfrontApplication.__name__ = ["ufront","app","UfrontApplication"];
ufront_app_UfrontApplication.__super__ = ufront_app_HttpApplication;
ufront_app_UfrontApplication.prototype = $extend(ufront_app_HttpApplication.prototype,{
	configuration: null
	,mvcHandler: null
	,remotingHandler: null
	,viewEngine: null
	,execute: function(httpContext) {
		ufront_web_HttpError.throwIfNull(httpContext,"httpContext",{ fileName : "UfrontApplication.hx", lineNumber : 173, className : "ufront.app.UfrontApplication", methodName : "execute"});
		if(this.firstRun) this.initOnFirstExecute(httpContext);
		var $it0 = $iterator(this.configuration.apis)();
		while( $it0.hasNext() ) {
			var api = $it0.next();
			httpContext.injector.mapRuntimeTypeOf(api)._toSingleton(api);
			var asyncApi = ufront_api_UFAsyncApi.getAsyncApi(api);
			if(asyncApi != null) httpContext.injector.mapRuntimeTypeOf(asyncApi)._toSingleton(asyncApi);
		}
		return ufront_app_HttpApplication.prototype.execute.call(this,httpContext);
	}
	,firstRun: null
	,initOnFirstExecute: function(httpContext) {
		this.firstRun = false;
		this.injector.mapType("String","scriptDirectory",null).toValue(httpContext.request.get_scriptDirectory());
		this.injector.mapType("String","contentDirectory",null).toValue(httpContext.get_contentDirectory());
		if(this.configuration.viewEngine != null) try {
			this.viewEngine = this.injector.getValueForType("ufront.view.UFViewEngine",null);
			var _g_head = this.appTemplatingEngines.h;
			var _g_val = null;
			while(_g_head != null) {
				var te;
				te = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				this.viewEngine.engines.push(te);
			}
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			httpContext.ufWarn("Failed to load view engine " + Type.getClassName(this.configuration.viewEngine) + ": " + Std.string(e),{ fileName : "UfrontApplication.hx", lineNumber : 206, className : "ufront.app.UfrontApplication", methodName : "initOnFirstExecute"});
		}
	}
	,loadApiContext: function(apiContext) {
		this.remotingHandler.loadApiContext(apiContext);
		return this;
	}
	,appTemplatingEngines: null
	,addTemplatingEngine: function(engine) {
		this.appTemplatingEngines.add(engine);
		if(this.viewEngine != null) this.viewEngine.engines.push(engine);
		return this;
	}
	,__class__: ufront_app_UfrontApplication
});
var ufront_app_DefaultUfrontClientConfiguration = function() { };
$hxClasses["ufront.app.DefaultUfrontClientConfiguration"] = ufront_app_DefaultUfrontClientConfiguration;
ufront_app_DefaultUfrontClientConfiguration.__name__ = ["ufront","app","DefaultUfrontClientConfiguration"];
ufront_app_DefaultUfrontClientConfiguration.get = function() {
	return { indexController : ufront_app_DefaultUfrontController, urlRewrite : true, basePath : "/", remotingPath : "/", disableBrowserTrace : false, controllers : CompileTimeClassList.get("null,true,ufront.web.Controller"), apis : CompileTimeClassList.get("null,true,ufront.api.UFApi"), clientActions : CompileTimeClassList.get("null,true,ufront.web.client.UFClientAction"), viewEngine : ufront_view_HttpViewEngine, templatingEngines : ufront_view_TemplatingEngines.all, viewPath : "/view/", defaultLayout : null, sessionImplementation : ufront_web_session_VoidSession, requestMiddleware : [], responseMiddleware : [], errorHandlers : [new ufront_web_ErrorPageHandler()], authImplementation : ufront_auth_NobodyAuthHandler};
};
var ufront_app_DefaultUfrontConfiguration = function() { };
$hxClasses["ufront.app.DefaultUfrontConfiguration"] = ufront_app_DefaultUfrontConfiguration;
ufront_app_DefaultUfrontConfiguration.__name__ = ["ufront","app","DefaultUfrontConfiguration"];
ufront_app_DefaultUfrontConfiguration.get = function() {
	var inlineSession = new ufront_web_session_InlineSessionMiddleware();
	var uploadMiddleware = new ufront_web_upload_TmpFileUploadMiddleware();
	return { indexController : ufront_app_DefaultUfrontController, remotingApi : null, urlRewrite : true, basePath : "/", contentDirectory : "../uf-content", logFile : null, disableBrowserTrace : false, disableServerTrace : false, controllers : CompileTimeClassList.get("null,true,ufront.web.Controller"), apis : CompileTimeClassList.get("null,true,ufront.api.UFApi"), viewEngine : ufront_view_FileViewEngine, templatingEngines : ufront_view_TemplatingEngines.all, viewPath : "view/", defaultLayout : null, sessionImplementation : ufront_web_session_FileSession, requestMiddleware : [uploadMiddleware,inlineSession], responseMiddleware : [inlineSession,uploadMiddleware], errorHandlers : [new ufront_web_ErrorPageHandler()], authImplementation : ufront_auth_YesBossAuthHandler};
};
var ufront_app_DefaultUfrontController = function() {
	ufront_web_Controller.call(this);
};
$hxClasses["ufront.app.DefaultUfrontController"] = ufront_app_DefaultUfrontController;
ufront_app_DefaultUfrontController.__name__ = ["ufront","app","DefaultUfrontController"];
ufront_app_DefaultUfrontController.__super__ = ufront_web_Controller;
ufront_app_DefaultUfrontController.prototype = $extend(ufront_web_Controller.prototype,{
	showMessage: function() {
		this.ufTrace("Your Ufront App is almost ready.",{ fileName : "UfrontConfiguration.hx", lineNumber : 279, className : "ufront.app.DefaultUfrontController", methodName : "showMessage"});
		return "<!DOCTYPE html>\n<html>\n<head>\n\t<title>New Ufront App</title>\n\t<link href=\"http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css\" rel=\"stylesheet\" />\n</head>\n<body style=\"padding-top: 30px;\">\n\t<div class=\"container\">\n\t\t<div class=\"jumbotron\">\n\t\t\t<h1>Almost done!</h1>\n\t\t\t<p>Your new Ufront App is almost ready to go. You will need to add some routes and let ufront know about them:</p>\n\t\t\t<pre><code>\n\tapp = new UfrontApplication({\n\t\tindexController: MySiteController,\n\t});\n\tapp.executeRequest();\n\t\t\t</code></pre>\n\t\t\t<p>See the Getting Started tutorial for more information.</p>\n\t\t</div>\n\t</div>\n</body>\n</html>\n";
	}
	,execute: function() {
		var uriParts = this.context.actionContext.get_uriParts();
		var params = this.context.request.get_params();
		var method = this.context.request.get_httpMethod();
		this.context.actionContext.controller = this;
		this.context.actionContext.action = "execute";
		try {
			this.context.actionContext.action = "showMessage";
			this.context.actionContext.args = [];
			this.context.actionContext.get_uriParts().splice(0,0);
			var wrappingRequired;
			var i = haxe_rtti_Meta.getFields(ufront_app_DefaultUfrontController).showMessage.wrapResult[0];
			wrappingRequired = i;
			var result = this.wrapResult(this.showMessage(),wrappingRequired);
			this.setContextActionResultWhenFinished(result);
			return result;
			throw new js__$Boot_HaxeError(ufront_web_HttpError.pageNotFound({ fileName : "UfrontConfiguration.hx", lineNumber : 276, className : "ufront.app.DefaultUfrontController", methodName : "execute"}));
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return ufront_core_SurpriseTools.asSurpriseError(e,"Uncaught error while executing " + Std.string(this.context.actionContext.controller) + "." + this.context.actionContext.action + "()",{ fileName : "UfrontConfiguration.hx", lineNumber : 276, className : "ufront.app.DefaultUfrontController", methodName : "execute"});
		}
	}
	,__class__: ufront_app_DefaultUfrontController
});
var ufront_auth_AuthError = $hxClasses["ufront.auth.AuthError"] = { __ename__ : ["ufront","auth","AuthError"], __constructs__ : ["ANotLoggedIn","ALoginFailed","ANotLoggedInAs","ANoPermission"] };
ufront_auth_AuthError.ANotLoggedIn = ["ANotLoggedIn",0];
ufront_auth_AuthError.ANotLoggedIn.toString = $estr;
ufront_auth_AuthError.ANotLoggedIn.__enum__ = ufront_auth_AuthError;
ufront_auth_AuthError.ALoginFailed = function(msg) { var $x = ["ALoginFailed",1,msg]; $x.__enum__ = ufront_auth_AuthError; $x.toString = $estr; return $x; };
ufront_auth_AuthError.ANotLoggedInAs = function(u) { var $x = ["ANotLoggedInAs",2,u]; $x.__enum__ = ufront_auth_AuthError; $x.toString = $estr; return $x; };
ufront_auth_AuthError.ANoPermission = function(p) { var $x = ["ANoPermission",3,p]; $x.__enum__ = ufront_auth_AuthError; $x.toString = $estr; return $x; };
var ufront_auth_UFAuthHandler = function() { };
$hxClasses["ufront.auth.UFAuthHandler"] = ufront_auth_UFAuthHandler;
ufront_auth_UFAuthHandler.__name__ = ["ufront","auth","UFAuthHandler"];
ufront_auth_UFAuthHandler.prototype = {
	get_currentUser: null
	,isLoggedIn: null
	,requireLogin: null
	,isLoggedInAs: null
	,requireLoginAs: null
	,hasPermission: null
	,hasPermissions: null
	,requirePermission: null
	,requirePermissions: null
	,toString: null
	,__class__: ufront_auth_UFAuthHandler
	,__properties__: {get_currentUser:"get_currentUser"}
};
var ufront_auth_NobodyAuthHandler = function() {
};
$hxClasses["ufront.auth.NobodyAuthHandler"] = ufront_auth_NobodyAuthHandler;
ufront_auth_NobodyAuthHandler.__name__ = ["ufront","auth","NobodyAuthHandler"];
ufront_auth_NobodyAuthHandler.__interfaces__ = [ufront_auth_UFAuthHandler];
ufront_auth_NobodyAuthHandler.prototype = {
	isLoggedIn: function() {
		return false;
	}
	,requireLogin: function() {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.authError(ufront_auth_AuthError.ANotLoggedIn,{ fileName : "NobodyAuthHandler.hx", lineNumber : 20, className : "ufront.auth.NobodyAuthHandler", methodName : "requireLogin"}));
	}
	,isLoggedInAs: function(user) {
		return false;
	}
	,requireLoginAs: function(user) {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.authError(ufront_auth_AuthError.ANotLoggedInAs(user),{ fileName : "NobodyAuthHandler.hx", lineNumber : 24, className : "ufront.auth.NobodyAuthHandler", methodName : "requireLoginAs"}));
	}
	,hasPermission: function(permission) {
		return false;
	}
	,hasPermissions: function(permissions) {
		return false;
	}
	,requirePermission: function(permission) {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.authError(ufront_auth_AuthError.ANoPermission(permission),{ fileName : "NobodyAuthHandler.hx", lineNumber : 30, className : "ufront.auth.NobodyAuthHandler", methodName : "requirePermission"}));
	}
	,requirePermissions: function(permissions) {
		var $it0 = $iterator(permissions)();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			throw new js__$Boot_HaxeError(ufront_web_HttpError.authError(ufront_auth_AuthError.ANoPermission(p),{ fileName : "NobodyAuthHandler.hx", lineNumber : 32, className : "ufront.auth.NobodyAuthHandler", methodName : "requirePermissions"}));
		}
	}
	,toString: function() {
		return "NobodyAuthHandler";
	}
	,get_currentUser: function() {
		return null;
	}
	,__class__: ufront_auth_NobodyAuthHandler
	,__properties__: {get_currentUser:"get_currentUser"}
};
var ufront_auth_UFAuthAdapter = function() { };
$hxClasses["ufront.auth.UFAuthAdapter"] = ufront_auth_UFAuthAdapter;
ufront_auth_UFAuthAdapter.__name__ = ["ufront","auth","UFAuthAdapter"];
ufront_auth_UFAuthAdapter.prototype = {
	authenticate: null
	,__class__: ufront_auth_UFAuthAdapter
};
var ufront_auth_UFAuthAdapterSync = function() { };
$hxClasses["ufront.auth.UFAuthAdapterSync"] = ufront_auth_UFAuthAdapterSync;
ufront_auth_UFAuthAdapterSync.__name__ = ["ufront","auth","UFAuthAdapterSync"];
ufront_auth_UFAuthAdapterSync.prototype = {
	authenticateSync: null
	,__class__: ufront_auth_UFAuthAdapterSync
};
var ufront_auth_UFAuthUser = function() { };
$hxClasses["ufront.auth.UFAuthUser"] = ufront_auth_UFAuthUser;
ufront_auth_UFAuthUser.__name__ = ["ufront","auth","UFAuthUser"];
ufront_auth_UFAuthUser.prototype = {
	get_userID: null
	,can: null
	,userID: null
	,__class__: ufront_auth_UFAuthUser
	,__properties__: {get_userID:"get_userID"}
};
var ufront_auth_YesBossAuthHandler = function() {
};
$hxClasses["ufront.auth.YesBossAuthHandler"] = ufront_auth_YesBossAuthHandler;
ufront_auth_YesBossAuthHandler.__name__ = ["ufront","auth","YesBossAuthHandler"];
ufront_auth_YesBossAuthHandler.__interfaces__ = [ufront_auth_UFAuthHandler];
ufront_auth_YesBossAuthHandler.prototype = {
	isLoggedIn: function() {
		return true;
	}
	,requireLogin: function() {
	}
	,isLoggedInAs: function(user) {
		return true;
	}
	,requireLoginAs: function(user) {
	}
	,hasPermission: function(permission) {
		return true;
	}
	,hasPermissions: function(permissions) {
		return true;
	}
	,requirePermission: function(permission) {
	}
	,requirePermissions: function(permissions) {
	}
	,toString: function() {
		return "YesBossAuthHandler";
	}
	,get_currentUser: function() {
		return new ufront_auth_BossUser();
	}
	,__class__: ufront_auth_YesBossAuthHandler
	,__properties__: {get_currentUser:"get_currentUser"}
};
var ufront_auth_BossUser = function() {
};
$hxClasses["ufront.auth.BossUser"] = ufront_auth_BossUser;
ufront_auth_BossUser.__name__ = ["ufront","auth","BossUser"];
ufront_auth_BossUser.__interfaces__ = [ufront_auth_UFAuthUser];
ufront_auth_BossUser.prototype = {
	userID: null
	,can: function(p,ps) {
		return true;
	}
	,get_userID: function() {
		return "The Boss";
	}
	,__class__: ufront_auth_BossUser
	,__properties__: {get_userID:"get_userID"}
};
var ufront_cache_UFCacheConnectionSync = function() { };
$hxClasses["ufront.cache.UFCacheConnectionSync"] = ufront_cache_UFCacheConnectionSync;
ufront_cache_UFCacheConnectionSync.__name__ = ["ufront","cache","UFCacheConnectionSync"];
ufront_cache_UFCacheConnectionSync.prototype = {
	getNamespaceSync: null
	,__class__: ufront_cache_UFCacheConnectionSync
};
var ufront_cache_UFCacheConnection = function() { };
$hxClasses["ufront.cache.UFCacheConnection"] = ufront_cache_UFCacheConnection;
ufront_cache_UFCacheConnection.__name__ = ["ufront","cache","UFCacheConnection"];
ufront_cache_UFCacheConnection.prototype = {
	getNamespace: null
	,__class__: ufront_cache_UFCacheConnection
};
var ufront_cache_MemoryCacheConnection = function() {
	this.caches = new haxe_ds_StringMap();
};
$hxClasses["ufront.cache.MemoryCacheConnection"] = ufront_cache_MemoryCacheConnection;
ufront_cache_MemoryCacheConnection.__name__ = ["ufront","cache","MemoryCacheConnection"];
ufront_cache_MemoryCacheConnection.__interfaces__ = [ufront_cache_UFCacheConnectionSync,ufront_cache_UFCacheConnection];
ufront_cache_MemoryCacheConnection.prototype = {
	caches: null
	,getNamespaceSync: function($namespace) {
		if(this.caches.exists($namespace)) return this.caches.get($namespace); else {
			var v = new ufront_cache_MemoryCache();
			this.caches.set($namespace,v);
			return v;
		}
	}
	,getNamespace: function($namespace) {
		return this.getNamespaceSync($namespace);
	}
	,__class__: ufront_cache_MemoryCacheConnection
};
var ufront_cache_UFCacheSync = function() { };
$hxClasses["ufront.cache.UFCacheSync"] = ufront_cache_UFCacheSync;
ufront_cache_UFCacheSync.__name__ = ["ufront","cache","UFCacheSync"];
ufront_cache_UFCacheSync.prototype = {
	getSync: null
	,setSync: null
	,getOrSetSync: null
	,removeSync: null
	,clearSync: null
	,__class__: ufront_cache_UFCacheSync
};
var ufront_cache_UFCache = function() { };
$hxClasses["ufront.cache.UFCache"] = ufront_cache_UFCache;
ufront_cache_UFCache.__name__ = ["ufront","cache","UFCache"];
ufront_cache_UFCache.prototype = {
	get: null
	,set: null
	,getOrSet: null
	,remove: null
	,clear: null
	,__class__: ufront_cache_UFCache
};
var ufront_cache_MemoryCache = function() {
	this.map = new haxe_ds_StringMap();
};
$hxClasses["ufront.cache.MemoryCache"] = ufront_cache_MemoryCache;
ufront_cache_MemoryCache.__name__ = ["ufront","cache","MemoryCache"];
ufront_cache_MemoryCache.__interfaces__ = [ufront_cache_UFCacheSync,ufront_cache_UFCache];
ufront_cache_MemoryCache.prototype = {
	map: null
	,getSync: function(id) {
		if(this.map.exists(id)) return tink_core_Outcome.Success(this.map.get(id)); else return tink_core_Outcome.Failure(ufront_cache_CacheError.ENotInCache);
	}
	,setSync: function(id,value) {
		return tink_core_Outcome.Success((function($this) {
			var $r;
			$this.map.set(id,value);
			$r = value;
			return $r;
		}(this)));
	}
	,getOrSetSync: function(id,fn) {
		if(this.map.exists(id)) return tink_core_Outcome.Success(this.map.get(id)); else return tink_core_Outcome.Success((function($this) {
			var $r;
			var v = fn();
			$this.map.set(id,v);
			$r = v;
			return $r;
		}(this)));
	}
	,removeSync: function(id) {
		this.map.remove(id);
		return tink_core_Outcome.Success(tink_core_Noise.Noise);
	}
	,clearSync: function() {
		this.map = new haxe_ds_StringMap();
		return tink_core_Outcome.Success(tink_core_Noise.Noise);
	}
	,get: function(id) {
		return tink_core__$Future_Future_$Impl_$.sync(this.getSync(id));
	}
	,set: function(id,value) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.map(value,function(v) {
			return tink_core_Outcome.Success((function($this) {
				var $r;
				_g.map.set(id,v);
				$r = v;
				return $r;
			}(this)));
		});
	}
	,getOrSet: function(id,fn) {
		var _g = this;
		if(this.map.exists(id)) return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(this.map.get(id))); else return tink_core__$Future_Future_$Impl_$.map(fn(),function(v) {
			return tink_core_Outcome.Success((function($this) {
				var $r;
				_g.map.set(id,v);
				$r = v;
				return $r;
			}(this)));
		});
	}
	,clear: function() {
		return tink_core__$Future_Future_$Impl_$.sync(this.clearSync());
	}
	,remove: function(id) {
		return tink_core__$Future_Future_$Impl_$.sync(this.removeSync(id));
	}
	,__class__: ufront_cache_MemoryCache
};
var ufront_cache_RequestCacheMiddleware = function() {
};
$hxClasses["ufront.cache.RequestCacheMiddleware"] = ufront_cache_RequestCacheMiddleware;
ufront_cache_RequestCacheMiddleware.__name__ = ["ufront","cache","RequestCacheMiddleware"];
ufront_cache_RequestCacheMiddleware.__interfaces__ = [ufront_app_UFMiddleware];
ufront_cache_RequestCacheMiddleware.hasCacheMeta = function(meta) {
	return Object.prototype.hasOwnProperty.call(meta,ufront_cache_RequestCacheMiddleware.metaName);
};
ufront_cache_RequestCacheMiddleware.prototype = {
	cacheConnection: null
	,cache: null
	,requestIn: function(ctx) {
		if(this.cache == null) this.cache = this.cacheConnection.getNamespace("ufront.middleware.RequestCache");
		if(ctx.request.get_httpMethod().toLowerCase() == "get") {
			var uri = ctx.request.get_uri();
			return tink_core__$Future_Future_$Impl_$.map(this.cache.get(uri),function(result) {
				switch(result[1]) {
				case 0:
					var res = result[2];
					var cachedResponse = res;
					ctx.messages.push({ msg : "Loading " + uri + " from cache", pos : { fileName : "RequestCacheMiddleware.hx", lineNumber : 74, className : "ufront.cache.RequestCacheMiddleware", methodName : "requestIn"}, type : ufront_log_MessageType.MTrace});
					ctx.response.clearContent();
					ctx.response.set_contentType(cachedResponse.get_contentType());
					ctx.response.set_redirectLocation(cachedResponse.get_redirectLocation());
					ctx.response.charset = cachedResponse.charset;
					if(cachedResponse.status != null) ctx.response.status = cachedResponse.status; else ctx.response.status = 200;
					var $it0 = cachedResponse.getCookies().iterator();
					while( $it0.hasNext() ) {
						var c = $it0.next();
						ctx.response.setCookie(c);
					}
					var headers = cachedResponse.getHeaders();
					var $it1 = headers.keys();
					while( $it1.hasNext() ) {
						var key = $it1.next();
						ctx.response.setHeader(key,headers.get(key));
					}
					ctx.response.write(cachedResponse.getBuffer());
					ctx.completion |= 1 << ufront_web_context_RequestCompletion.CRequestHandlersComplete[1];
					break;
				default:
				}
				return tink_core_Outcome.Success(tink_core_Noise.Noise);
			});
		} else return ufront_core_SurpriseTools.success();
	}
	,responseOut: function(ctx) {
		if(this.cache == null) this.cache = this.cacheConnection.getNamespace("ufront.middleware.RequestCache");
		if(ctx.request.get_httpMethod().toLowerCase() == "get" && ctx.actionContext != null && ctx.actionContext.controller != null && ctx.actionContext.action != null) {
			if((function($this) {
				var $r;
				var x = ctx.response.get_contentType();
				$r = HxOverrides.indexOf(ufront_cache_RequestCacheMiddleware.contentTypesToCache,x,0);
				return $r;
			}(this)) > -1) {
				var controller = ctx.actionContext.controller;
				var cls;
				if(controller == null) cls = null; else cls = js_Boot.getClass(controller);
				var controllerMeta = haxe_rtti_Meta.getType(cls);
				var fieldMeta = Reflect.field(haxe_rtti_Meta.getFields(cls),ctx.actionContext.action);
				if(ufront_cache_RequestCacheMiddleware.hasCacheMeta(controllerMeta) || ufront_cache_RequestCacheMiddleware.hasCacheMeta(fieldMeta)) {
					var uri = ctx.request.get_uri();
					return tink_core__$Future_Future_$Impl_$._map(this.cache.set(uri,(function($this) {
						var $r;
						var f = tink_core__$Future_Future_$Impl_$.sync(ctx.response);
						$r = f;
						return $r;
					}(this))),function(result) {
						switch(result[1]) {
						case 1:
							var e = result[2];
							ctx.messages.push({ msg : "Failed to save cache for " + uri + ": " + Std.string(e), pos : { fileName : "RequestCacheMiddleware.hx", lineNumber : 121, className : "ufront.cache.RequestCacheMiddleware", methodName : "responseOut"}, type : ufront_log_MessageType.MError});
							break;
						default:
						}
						return tink_core_Outcome.Success(tink_core_Noise.Noise);
					});
				}
			}
		}
		return ufront_core_SurpriseTools.success();
	}
	,invalidate: function() {
		return this.cache.clear();
	}
	,__class__: ufront_cache_RequestCacheMiddleware
};
var ufront_cache_CacheError = $hxClasses["ufront.cache.CacheError"] = { __ename__ : ["ufront","cache","CacheError"], __constructs__ : ["ENotInCache","EUnableToConnect","ECacheNotReadable","ECacheNotWriteable"] };
ufront_cache_CacheError.ENotInCache = ["ENotInCache",0];
ufront_cache_CacheError.ENotInCache.toString = $estr;
ufront_cache_CacheError.ENotInCache.__enum__ = ufront_cache_CacheError;
ufront_cache_CacheError.EUnableToConnect = function(err) { var $x = ["EUnableToConnect",1,err]; $x.__enum__ = ufront_cache_CacheError; $x.toString = $estr; return $x; };
ufront_cache_CacheError.ECacheNotReadable = function(err) { var $x = ["ECacheNotReadable",2,err]; $x.__enum__ = ufront_cache_CacheError; $x.toString = $estr; return $x; };
ufront_cache_CacheError.ECacheNotWriteable = function(err) { var $x = ["ECacheNotWriteable",3,err]; $x.__enum__ = ufront_cache_CacheError; $x.toString = $estr; return $x; };
var ufront_core__$AcceptEither_AcceptEither_$Impl_$ = {};
$hxClasses["ufront.core._AcceptEither.AcceptEither_Impl_"] = ufront_core__$AcceptEither_AcceptEither_$Impl_$;
ufront_core__$AcceptEither_AcceptEither_$Impl_$.__name__ = ["ufront","core","_AcceptEither","AcceptEither_Impl_"];
ufront_core__$AcceptEither_AcceptEither_$Impl_$.__properties__ = {get_type:"get_type",get_value:"get_value"}
ufront_core__$AcceptEither_AcceptEither_$Impl_$._new = function(e) {
	return e;
};
ufront_core__$AcceptEither_AcceptEither_$Impl_$.get_value = function(this1) {
	switch(this1[1]) {
	case 0:
		var v = this1[2];
		return v;
	case 1:
		var v1 = this1[2];
		return v1;
	}
};
ufront_core__$AcceptEither_AcceptEither_$Impl_$.get_type = function(this1) {
	return this1;
};
ufront_core__$AcceptEither_AcceptEither_$Impl_$.fromA = function(v) {
	var e = tink_core_Either.Left(v);
	return e;
};
ufront_core__$AcceptEither_AcceptEither_$Impl_$.fromB = function(v) {
	var e = tink_core_Either.Right(v);
	return e;
};
var ufront_core_FutureTools = function() { };
$hxClasses["ufront.core.FutureTools"] = ufront_core_FutureTools;
ufront_core_FutureTools.__name__ = ["ufront","core","FutureTools"];
ufront_core_FutureTools.asFuture = function(data) {
	return tink_core__$Future_Future_$Impl_$.sync(data);
};
var ufront_core_SurpriseTools = function() { };
$hxClasses["ufront.core.SurpriseTools"] = ufront_core_SurpriseTools;
ufront_core_SurpriseTools.__name__ = ["ufront","core","SurpriseTools"];
ufront_core_SurpriseTools.success = function() {
	if(ufront_core_SurpriseTools.s == null) ufront_core_SurpriseTools.s = tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	return ufront_core_SurpriseTools.s;
};
ufront_core_SurpriseTools.asSurprise = function(outcome) {
	return tink_core__$Future_Future_$Impl_$.sync(outcome);
};
ufront_core_SurpriseTools.asGoodSurprise = function(data) {
	return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(data));
};
ufront_core_SurpriseTools.asBadSurprise = function(err) {
	return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(err));
};
ufront_core_SurpriseTools.asSurpriseError = function(err,msg,p) {
	if(msg == null) msg = "Failure: " + Std.string(err);
	return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(err,msg,p)));
};
ufront_core_SurpriseTools.asSurpriseTypedError = function(err,msg,p) {
	if(msg == null) msg = "Failure: " + Std.string(err);
	return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(err,msg,p)));
};
ufront_core_SurpriseTools.tryCatchSurprise = function(fn,msg,p) {
	try {
		return ufront_core_SurpriseTools.asGoodSurprise(fn());
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return ufront_core_SurpriseTools.asSurpriseError(e,msg,p);
	}
};
ufront_core_SurpriseTools.changeSuccessTo = function(s,newSuccessData) {
	return tink_core__$Future_Future_$Impl_$.map(s,function(outcome) {
		switch(outcome[1]) {
		case 0:
			return tink_core_Outcome.Success(newSuccessData);
		case 1:
			var e = outcome[2];
			return tink_core_Outcome.Failure(e);
		}
	});
};
ufront_core_SurpriseTools.changeSuccessToNoise = function(s) {
	return ufront_core_SurpriseTools.changeSuccessTo(s,tink_core_Noise.Noise);
};
ufront_core_SurpriseTools.changeFailureTo = function(s,newFailureData) {
	return tink_core__$Future_Future_$Impl_$.map(s,function(outcome) {
		switch(outcome[1]) {
		case 0:
			var d = outcome[2];
			return tink_core_Outcome.Success(d);
		case 1:
			return tink_core_Outcome.Failure(newFailureData);
		}
	});
};
ufront_core_SurpriseTools.changeFailureToError = function(s,msg,p) {
	return tink_core__$Future_Future_$Impl_$.map(s,function(outcome) {
		switch(outcome[1]) {
		case 0:
			var d = outcome[2];
			return tink_core_Outcome.Success(d);
		case 1:
			var inner = outcome[2];
			if(msg == null) msg = "Failure: " + Std.string(inner);
			return tink_core_Outcome.Failure(ufront_web_HttpError.wrap(inner,msg,p));
		}
	});
};
ufront_core_SurpriseTools.useFallback = function(s,fallback) {
	return tink_core__$Future_Future_$Impl_$.map(s,function(outcome) {
		switch(outcome[1]) {
		case 1:
			return fallback;
		case 0:
			var data = outcome[2];
			return data;
		}
	});
};
var ufront_core_CallbackTools = function() { };
$hxClasses["ufront.core.CallbackTools"] = ufront_core_CallbackTools;
ufront_core_CallbackTools.__name__ = ["ufront","core","CallbackTools"];
ufront_core_CallbackTools.asVoidSurprise = function(cb,pos) {
	var t = new tink_core_FutureTrigger();
	cb(function(error) {
		if(error != null) {
			var e = tink_core_TypedError.withData(500,"" + Std.string(error),pos,{ fileName : "AsyncTools.hx", lineNumber : 216, className : "ufront.core.CallbackTools", methodName : "asVoidSurprise"});
			t.trigger(tink_core_Outcome.Failure(e));
		} else t.trigger(tink_core_Outcome.Success(tink_core_Noise.Noise));
	});
	return t.future;
};
ufront_core_CallbackTools.asSurprise = function(cb,pos) {
	var t = new tink_core_FutureTrigger();
	cb(function(error,val) {
		if(error != null) {
			var e = tink_core_TypedError.withData(500,"" + Std.string(error),pos,{ fileName : "AsyncTools.hx", lineNumber : 241, className : "ufront.core.CallbackTools", methodName : "asSurprise"});
			t.trigger(tink_core_Outcome.Failure(e));
		} else t.trigger(tink_core_Outcome.Success(val));
	});
	return t.future;
};
ufront_core_CallbackTools.asSurprisePair = function(cb,pos) {
	var t = new tink_core_FutureTrigger();
	cb(function(error,val1,val2) {
		if(error != null) {
			var e = tink_core_TypedError.withData(500,"" + Std.string(error),pos,{ fileName : "AsyncTools.hx", lineNumber : 266, className : "ufront.core.CallbackTools", methodName : "asSurprisePair"});
			t.trigger(tink_core_Outcome.Failure(e));
		} else t.trigger(tink_core_Outcome.Success(new tink_core_MPair(val1,val2)));
	});
	return t.future;
};
var ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$ = {};
$hxClasses["ufront.core._CaseInsensitiveMultiValueMap.CaseInsensitiveMultiValueMap_Impl_"] = ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$;
ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$.__name__ = ["ufront","core","_CaseInsensitiveMultiValueMap","CaseInsensitiveMultiValueMap_Impl_"];
ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$._new = function() {
	return new haxe_ds_StringMap();
};
ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$.exists = function(this1,name) {
	var name1 = name.toLowerCase();
	if(__map_reserved[name1] != null) return this1.existsReserved(name1); else return this1.h.hasOwnProperty(name1);
};
ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$.getAll = function(this1,name) {
	return ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.getAll(this1,name.toLowerCase());
};
ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$.get = function(this1,name) {
	return ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(this1,name.toLowerCase());
};
ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$.set = function(this1,name,value) {
	ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.set(this1,name.toLowerCase(),value);
};
ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$.add = function(this1,name,value) {
	ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.add(this1,name.toLowerCase(),value);
};
ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$.remove = function(this1,key) {
	var key1 = key.toLowerCase();
	return this1.remove(key1);
};
ufront_core__$CaseInsensitiveMultiValueMap_CaseInsensitiveMultiValueMap_$Impl_$.clone = function(this1) {
	return ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.clone(this1);
};
var ufront_core__$ClassRef_ClassRef_$Impl_$ = {};
$hxClasses["ufront.core._ClassRef.ClassRef_Impl_"] = ufront_core__$ClassRef_ClassRef_$Impl_$;
ufront_core__$ClassRef_ClassRef_$Impl_$.__name__ = ["ufront","core","_ClassRef","ClassRef_Impl_"];
ufront_core__$ClassRef_ClassRef_$Impl_$._new = function(className) {
	return className;
};
ufront_core__$ClassRef_ClassRef_$Impl_$.toString = function(this1) {
	return this1;
};
ufront_core__$ClassRef_ClassRef_$Impl_$.toClass = function(this1) {
	return Type.resolveClass(this1);
};
ufront_core__$ClassRef_ClassRef_$Impl_$.fromClass = function(v) {
	var className = Type.getClassName(v);
	return className;
};
ufront_core__$ClassRef_ClassRef_$Impl_$.fromClassName = function(className) {
	return className;
};
var ufront_core__$Futuristic_Futuristic_$Impl_$ = {};
$hxClasses["ufront.core._Futuristic.Futuristic_Impl_"] = ufront_core__$Futuristic_Futuristic_$Impl_$;
ufront_core__$Futuristic_Futuristic_$Impl_$.__name__ = ["ufront","core","_Futuristic","Futuristic_Impl_"];
ufront_core__$Futuristic_Futuristic_$Impl_$._new = function(f) {
	return f;
};
ufront_core__$Futuristic_Futuristic_$Impl_$.fromSync = function(v) {
	var f = tink_core__$Future_Future_$Impl_$.sync(v);
	return f;
};
ufront_core__$Futuristic_Futuristic_$Impl_$.asFuture = function(this1) {
	return this1;
};
var ufront_core_InjectionTools = function() { };
$hxClasses["ufront.core.InjectionTools"] = ufront_core_InjectionTools;
ufront_core_InjectionTools.__name__ = ["ufront","core","InjectionTools"];
ufront_core_InjectionTools.listMappings = function(injector,arr,prefix) {
	if(prefix == null) prefix = "";
	return ["Injector mappings not available unless compiled with -debug."];
};
var ufront_core__$MultiValueMap_MultiValueMap_$Impl_$ = {};
$hxClasses["ufront.core._MultiValueMap.MultiValueMap_Impl_"] = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$;
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.__name__ = ["ufront","core","_MultiValueMap","MultiValueMap_Impl_"];
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$._new = function() {
	return new haxe_ds_StringMap();
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.keys = function(this1) {
	return this1.keys();
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.exists = function(this1,name) {
	if(__map_reserved[name] != null) return this1.existsReserved(name); else return this1.h.hasOwnProperty(name);
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.iterator = function(this1) {
	var _this = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.allValues(this1);
	return HxOverrides.iter(_this);
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.allValues = function(this1) {
	var _g = [];
	var $it0 = new haxe_ds__$StringMap_StringMapIterator(this1,this1.arrayKeys());
	while( $it0.hasNext() ) {
		var arr = $it0.next();
		var _g1 = 0;
		while(_g1 < arr.length) {
			var v = arr[_g1];
			++_g1;
			_g.push(v);
		}
	}
	return _g;
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get = function(this1,name) {
	if(__map_reserved[name] != null?this1.existsReserved(name):this1.h.hasOwnProperty(name)) {
		var arr;
		arr = __map_reserved[name] != null?this1.getReserved(name):this1.h[name];
		return arr[arr.length - 1];
	} else return null;
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.getAll = function(this1,name) {
	if(__map_reserved[name] != null?this1.existsReserved(name):this1.h.hasOwnProperty(name)) return __map_reserved[name] != null?this1.getReserved(name):this1.h[name]; else return [];
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.set = function(this1,name,value) {
	if(value != null) {
		if(StringTools.endsWith(name,"[]")) name = HxOverrides.substr(name,0,name.length - 2); else name = name;
		this1.set(name,[value]);
	}
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.add = function(this1,name,value) {
	if(value != null) {
		if(name != null) {
			if(StringTools.endsWith(name,"[]")) name = HxOverrides.substr(name,0,name.length - 2); else name = name;
		} else name = "";
		if(__map_reserved[name] != null?this1.existsReserved(name):this1.h.hasOwnProperty(name)) (__map_reserved[name] != null?this1.getReserved(name):this1.h[name]).push(value); else this1.set(name,[value]);
	}
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.remove = function(this1,key) {
	return this1.remove(key);
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.clone = function(this1) {
	var newMap = new haxe_ds_StringMap();
	var $it0 = this1.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		var _g = 0;
		var _g1;
		_g1 = __map_reserved[k] != null?this1.getReserved(k):this1.h[k];
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.add(newMap,k,v);
		}
	}
	return newMap;
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.toString = function(this1) {
	var sb = new StringBuf();
	sb.b += "[";
	var $it0 = this1.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		sb.b += Std.string("\n\t" + key + " = [");
		sb.add(ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.getAll(this1,key).join(", "));
		sb.b += "]";
	}
	if(sb.b.length > 1) sb.b += "\n";
	sb.b += "]";
	return sb.b;
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.stripArrayFromName = function(this1,name) {
	if(StringTools.endsWith(name,"[]")) return HxOverrides.substr(name,0,name.length - 2); else return name;
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.toMapOfArrays = function(this1) {
	return this1;
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.fromMapOfArrays = function(map) {
	return map;
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.toStringMap = function(this1) {
	var sm = new haxe_ds_StringMap();
	var $it0 = this1.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		sm.set(key,ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(this1,key));
	}
	return sm;
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.toMap = function(this1) {
	return ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.toStringMap(this1);
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.fromStringMap = function(stringMap) {
	var qm = new haxe_ds_StringMap();
	if(stringMap != null) {
		var $it0 = stringMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.set(qm,key,__map_reserved[key] != null?stringMap.getReserved(key):stringMap.h[key]);
		}
	}
	return qm;
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.fromMap = function(map) {
	return ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.fromStringMap(map);
};
ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.combine = function(maps) {
	var qm = new haxe_ds_StringMap();
	var _g = 0;
	while(_g < maps.length) {
		var map = maps[_g];
		++_g;
		var $it0 = map.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var _g1 = 0;
			var _g2 = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.getAll(map,key);
			while(_g1 < _g2.length) {
				var val = _g2[_g1];
				++_g1;
				ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.add(qm,key,val);
			}
		}
	}
	return qm;
};
var ufront_core_OrderedStringMap = function() {
	this.length = 0;
	this.__keys = [];
	this.__hash = new haxe_ds_StringMap();
};
$hxClasses["ufront.core.OrderedStringMap"] = ufront_core_OrderedStringMap;
ufront_core_OrderedStringMap.__name__ = ["ufront","core","OrderedStringMap"];
ufront_core_OrderedStringMap.prototype = {
	length: null
	,set: function(key,value) {
		if(!this.__hash.exists(key)) {
			this.__keys.push(key);
			this.length++;
		}
		this.__hash.set(key,value);
	}
	,setAt: function(index,key,value) {
		this.remove(key);
		this.__keys.splice(index,0,key);
		this.__hash.set(key,value);
		this.length++;
	}
	,get: function(key) {
		return this.__hash.get(key);
	}
	,getAt: function(index) {
		return this.__hash.get(this.__keys[index]);
	}
	,indexOf: function(key) {
		if(!this.__hash.exists(key)) return -1;
		var _g1 = 0;
		var _g = this.__keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.__keys[i] == key) return i;
		}
		throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("" + key + " exists in hash but not in array",null,{ fileName : "OrderedStringMap.hx", lineNumber : 51, className : "ufront.core.OrderedStringMap", methodName : "indexOf"}));
	}
	,exists: function(key) {
		return this.__hash.exists(key);
	}
	,remove: function(key) {
		var item = this.__hash.get(key);
		if(item == null) return null;
		this.__hash.remove(key);
		HxOverrides.remove(this.__keys,key);
		this.length--;
		return item;
	}
	,removeAt: function(index) {
		var key = this.__keys[index];
		if(key == null) return null;
		var item = this.__hash.get(key);
		this.__hash.remove(key);
		HxOverrides.remove(this.__keys,key);
		this.length--;
		return item;
	}
	,keyAt: function(index) {
		return this.__keys[index];
	}
	,keys: function() {
		return HxOverrides.iter(this.__keys);
	}
	,iterator: function() {
		var _this = this.array();
		return HxOverrides.iter(_this);
	}
	,clear: function() {
		this.__hash = new haxe_ds_StringMap();
		this.__keys = [];
		this.length = 0;
	}
	,array: function() {
		var values = [];
		var _g = 0;
		var _g1 = this.__keys;
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			values.push(this.__hash.get(k));
		}
		return values;
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			if(i == null) s.b += "null"; else s.b += "" + i;
			s.b += " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__keys: null
	,__hash: null
	,__class__: ufront_core_OrderedStringMap
};
var ufront_core_Uuid = function() { };
$hxClasses["ufront.core.Uuid"] = ufront_core_Uuid;
ufront_core_Uuid.__name__ = ["ufront","core","Uuid"];
ufront_core_Uuid.random = function(outOf) {
	return Math.floor(Math.random() * outOf);
};
ufront_core_Uuid.srandom = function() {
	return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
};
ufront_core_Uuid.create = function() {
	var s = [];
	var _g = 0;
	while(_g < 8) {
		var i = _g++;
		s[i] = "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
	}
	s[8] = "-";
	var _g1 = 9;
	while(_g1 < 13) {
		var i1 = _g1++;
		s[i1] = "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
	}
	s[13] = "-";
	s[14] = "4";
	var _g2 = 15;
	while(_g2 < 18) {
		var i2 = _g2++;
		s[i2] = "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
	}
	s[18] = "-";
	s[19] = "" + "89AB".charAt(Math.floor(Math.random() * 4));
	var _g3 = 20;
	while(_g3 < 23) {
		var i3 = _g3++;
		s[i3] = "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
	}
	s[23] = "-";
	var _g4 = 24;
	while(_g4 < 36) {
		var i4 = _g4++;
		s[i4] = "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
	}
	return s.join("");
};
ufront_core_Uuid.isValid = function(s) {
	return new EReg("[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}","").match(s);
};
var ufront_log_BrowserConsoleLogger = function() {
};
$hxClasses["ufront.log.BrowserConsoleLogger"] = ufront_log_BrowserConsoleLogger;
ufront_log_BrowserConsoleLogger.__name__ = ["ufront","log","BrowserConsoleLogger"];
ufront_log_BrowserConsoleLogger.__interfaces__ = [ufront_app_UFLogHandler];
ufront_log_BrowserConsoleLogger.formatMessage = function(m) {
	var type;
	var _g = m.type;
	switch(_g[1]) {
	case 0:
		type = "log";
		break;
	case 1:
		type = "info";
		break;
	case 2:
		type = "warn";
		break;
	case 3:
		type = "error";
		break;
	}
	var extras;
	if(m.pos != null && m.pos.customParams != null) extras = ", " + m.pos.customParams.join(", "); else extras = "";
	var msg = "" + m.pos.className + "." + m.pos.methodName + "(" + m.pos.lineNumber + "): " + Std.string(m.msg) + extras;
	return "console." + type + "(decodeURIComponent(\"" + encodeURIComponent(msg) + "\"))";
};
ufront_log_BrowserConsoleLogger.prototype = {
	log: function(ctx,appMessages) {
		if(ctx.response.get_contentType() == "text/html" && !ctx.response.isRedirect()) {
			var results = [];
			var _g = 0;
			var _g1 = ctx.messages;
			while(_g < _g1.length) {
				var msg = _g1[_g];
				++_g;
				results.push(ufront_log_BrowserConsoleLogger.formatMessage(msg));
			}
			if(results.length > 0) {
				var script = "\n<script type=\"text/javascript\">\n" + results.join("\n") + "\n</script>";
				var newContent = ufront_web_result_CallJavascriptResult.insertScriptsBeforeBodyTag(ctx.response.getBuffer(),[script]);
				ctx.response.clearContent();
				ctx.response.write(newContent);
			}
		}
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_log_BrowserConsoleLogger
};
var ufront_log_FileLogger = function(path) {
	this.path = path;
};
$hxClasses["ufront.log.FileLogger"] = ufront_log_FileLogger;
ufront_log_FileLogger.__name__ = ["ufront","log","FileLogger"];
ufront_log_FileLogger.__interfaces__ = [ufront_app_UFInitRequired,ufront_app_UFLogHandler];
ufront_log_FileLogger.format = function(msg) {
	var msgStr = Std.string(msg.msg);
	var text = ufront_log_FileLogger.REMOVENL.replace(msgStr,"\\n");
	var type = HxOverrides.substr(msg.type[0],1,null);
	var pos = msg.pos;
	return "[" + type + "] " + pos.className + "." + pos.methodName + "(" + pos.lineNumber + "): " + text;
};
ufront_log_FileLogger.prototype = {
	path: null
	,init: function(app) {
		return ufront_core_SurpriseTools.success();
	}
	,dispose: function(app) {
		this.path = null;
		return ufront_core_SurpriseTools.success();
	}
	,log: function(context,appMessages) {
		var logFile = context.get_contentDirectory() + this.path;
		var req = context.request;
		var res = context.response;
		var userDetails = req.get_clientIP();
		try {
			if((null != context.session?context.session.get_id():null) != null) userDetails += " " + (null != context.session?context.session.get_id():null);
			if((context.auth != null && context.auth.get_currentUser() != null?context.auth.get_currentUser().get_userID():null) != null) userDetails += " " + (context.auth != null && context.auth.get_currentUser() != null?context.auth.get_currentUser().get_userID():null);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
		var content = "" + Std.string(new Date()) + " [" + req.get_httpMethod() + "] [" + req.get_uri() + "] from [" + userDetails + "], response: [" + res.status + " " + res.get_contentType() + "]\n";
		var _g = 0;
		var _g1 = context.messages;
		while(_g < _g1.length) {
			var msg = _g1[_g];
			++_g;
			content += "\t" + ufront_log_FileLogger.format(msg) + "\n";
		}
		if(appMessages != null) {
			var _g2 = 0;
			while(_g2 < appMessages.length) {
				var msg1 = appMessages[_g2];
				++_g2;
				content += "\t" + ufront_log_FileLogger.format(msg1) + "\n";
			}
		}
		return ufront_core_CallbackTools.asVoidSurprise((function(f,a1,a2,a3) {
			return function(a4) {
				f(a1,a2,a3,a4);
			};
		})(js_node_Fs.appendFile,logFile,content,null),{ fileName : "FileLogger.hx", lineNumber : 90, className : "ufront.log.FileLogger", methodName : "log"});
	}
	,__class__: ufront_log_FileLogger
};
var ufront_log_MessageType = $hxClasses["ufront.log.MessageType"] = { __ename__ : ["ufront","log","MessageType"], __constructs__ : ["MTrace","MLog","MWarning","MError"] };
ufront_log_MessageType.MTrace = ["MTrace",0];
ufront_log_MessageType.MTrace.toString = $estr;
ufront_log_MessageType.MTrace.__enum__ = ufront_log_MessageType;
ufront_log_MessageType.MLog = ["MLog",1];
ufront_log_MessageType.MLog.toString = $estr;
ufront_log_MessageType.MLog.__enum__ = ufront_log_MessageType;
ufront_log_MessageType.MWarning = ["MWarning",2];
ufront_log_MessageType.MWarning.toString = $estr;
ufront_log_MessageType.MWarning.__enum__ = ufront_log_MessageType;
ufront_log_MessageType.MError = ["MError",3];
ufront_log_MessageType.MError.toString = $estr;
ufront_log_MessageType.MError.__enum__ = ufront_log_MessageType;
var ufront_log_MessageList = function(messages,onMessage) {
	this.messages = messages;
	this.onMessage = onMessage;
};
$hxClasses["ufront.log.MessageList"] = ufront_log_MessageList;
ufront_log_MessageList.__name__ = ["ufront","log","MessageList"];
ufront_log_MessageList.prototype = {
	messages: null
	,onMessage: null
	,push: function(m) {
		if(this.messages != null) this.messages.push(m);
		if(this.onMessage != null) this.onMessage(m);
	}
	,__class__: ufront_log_MessageList
};
var ufront_log_OriginalTraceLogger = function() {
};
$hxClasses["ufront.log.OriginalTraceLogger"] = ufront_log_OriginalTraceLogger;
ufront_log_OriginalTraceLogger.__name__ = ["ufront","log","OriginalTraceLogger"];
ufront_log_OriginalTraceLogger.__interfaces__ = [ufront_app_UFInitRequired,ufront_app_UFLogHandler];
ufront_log_OriginalTraceLogger.prototype = {
	originalTrace: null
	,init: function(app) {
		this.originalTrace = app.originalTrace;
		return ufront_core_SurpriseTools.success();
	}
	,dispose: function(app) {
		return ufront_core_SurpriseTools.success();
	}
	,log: function(ctx,appMessages) {
		var _g = 0;
		var _g1 = ctx.messages;
		while(_g < _g1.length) {
			var msg = _g1[_g];
			++_g;
			this.originalTrace(msg.msg,msg.pos);
		}
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_log_OriginalTraceLogger
};
var ufront_log_RemotingLogger = function() {
};
$hxClasses["ufront.log.RemotingLogger"] = ufront_log_RemotingLogger;
ufront_log_RemotingLogger.__name__ = ["ufront","log","RemotingLogger"];
ufront_log_RemotingLogger.__interfaces__ = [ufront_app_UFLogHandler];
ufront_log_RemotingLogger.formatMessage = function(m) {
	m.msg = "" + Std.string(m.msg);
	if(m.pos.customParams != null) {
		var _g = [];
		var _g1 = 0;
		var _g2 = m.pos.customParams;
		while(_g1 < _g2.length) {
			var p = _g2[_g1];
			++_g1;
			_g.push("" + Std.string(p));
		}
		m.pos.customParams = _g;
	}
	return "hxt" + haxe_Serializer.run(m);
};
ufront_log_RemotingLogger.prototype = {
	log: function(httpContext,appMessages) {
		if((function($this) {
			var $r;
			var this1 = httpContext.request.get_clientHeaders();
			var name = "X-Ufront-Remoting".toLowerCase();
			$r = __map_reserved[name] != null?this1.existsReserved(name):this1.h.hasOwnProperty(name);
			return $r;
		}(this)) && httpContext.response.get_contentType() == "application/x-haxe-remoting") {
			var results = [];
			var _g = 0;
			var _g1 = httpContext.messages;
			while(_g < _g1.length) {
				var msg = _g1[_g];
				++_g;
				results.push(ufront_log_RemotingLogger.formatMessage(msg));
			}
			if(results.length > 0) httpContext.response.write("\n" + results.join("\n"));
		}
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_log_RemotingLogger
};
var ufront_log_ServerConsoleLogger = function() {
};
$hxClasses["ufront.log.ServerConsoleLogger"] = ufront_log_ServerConsoleLogger;
ufront_log_ServerConsoleLogger.__name__ = ["ufront","log","ServerConsoleLogger"];
ufront_log_ServerConsoleLogger.__interfaces__ = [ufront_app_UFLogHandler];
ufront_log_ServerConsoleLogger.formatMsg = function(m) {
	var extras;
	if(m.pos != null && m.pos.customParams != null) extras = ", " + m.pos.customParams.join(", "); else extras = "";
	var type = HxOverrides.substr(m.type[0],1,null);
	return "" + type + ": " + m.pos.className + "." + m.pos.methodName + "(" + m.pos.lineNumber + "): " + Std.string(m.msg) + extras;
};
ufront_log_ServerConsoleLogger.writeLog = function(message,type) {
	var $console = console;
	$console.log(message);
};
ufront_log_ServerConsoleLogger.prototype = {
	log: function(ctx,appMessages) {
		var messages = [];
		var userDetails = ctx.request.get_clientIP();
		try {
			if((null != ctx.session?ctx.session.get_id():null) != null) userDetails += " " + (null != ctx.session?ctx.session.get_id():null);
			if((ctx.auth != null && ctx.auth.get_currentUser() != null?ctx.auth.get_currentUser().get_userID():null) != null) userDetails += " " + (ctx.auth != null && ctx.auth.get_currentUser() != null?ctx.auth.get_currentUser().get_userID():null);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
		var requestLog = "[" + ctx.request.get_httpMethod() + " " + ctx.request.get_uri() + "] from [" + userDetails + "], response: [" + ctx.response.status + " " + ctx.response.get_contentType() + "]";
		messages.push(requestLog);
		var _g = 0;
		var _g1 = ctx.messages;
		while(_g < _g1.length) {
			var msg = _g1[_g];
			++_g;
			messages.push(ufront_log_ServerConsoleLogger.formatMsg(msg));
		}
		if(appMessages != null) {
			var _g2 = 0;
			while(_g2 < appMessages.length) {
				var msg1 = appMessages[_g2];
				++_g2;
				messages.push(ufront_log_ServerConsoleLogger.formatMsg(msg1));
			}
		}
		ufront_log_ServerConsoleLogger.writeLog(messages.join("\n  "));
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_log_ServerConsoleLogger
};
var ufront_remoting_HttpAsyncConnection = function(data,path) {
	haxe_remoting_HttpAsyncConnection.call(this,data,path);
};
$hxClasses["ufront.remoting.HttpAsyncConnection"] = ufront_remoting_HttpAsyncConnection;
ufront_remoting_HttpAsyncConnection.__name__ = ["ufront","remoting","HttpAsyncConnection"];
ufront_remoting_HttpAsyncConnection.urlConnect = function(url,errorHandler) {
	if(errorHandler == null) errorHandler = ufront_remoting_RemotingUtil.defaultErrorHandler;
	return new ufront_remoting_HttpAsyncConnection({ url : url, error : errorHandler},[]);
};
ufront_remoting_HttpAsyncConnection.__super__ = haxe_remoting_HttpAsyncConnection;
ufront_remoting_HttpAsyncConnection.prototype = $extend(haxe_remoting_HttpAsyncConnection.prototype,{
	resolve: function(name) {
		var dataCopy = { url : this.__data.url, error : this.__data.error};
		var c = new ufront_remoting_HttpAsyncConnection(dataCopy,this.__path.slice());
		c.__path.push(name);
		return c;
	}
	,call: function(params,onResult) {
		var _g = this;
		var h = new ufront_remoting_HttpWithUploads(this.__data.url,true);
		h.setHeader("X-Haxe-Remoting","1");
		h.setHeader("X-Ufront-Remoting","1");
		var s = new ufront_remoting_RemotingSerializer(ufront_remoting_RemotingDirection.RDClientToServer);
		s.serialize(this.__path);
		s.serialize(params);
		h.setParam("__x",s.toString());
		var remotingCallString = this.__path.join(".") + "(" + params.join(",") + ")";
		var responseCode;
		var onStatus = function(status) {
			responseCode = status;
		};
		var onData = function(data) {
			ufront_remoting_RemotingUtil.processResponse(data,onResult,_g.__data.error,remotingCallString);
		};
		var onError = function(errorData) {
			if(500 == responseCode) ufront_remoting_RemotingUtil.processResponse(h.responseData(),onResult,_g.__data.error,remotingCallString); else if(404 == responseCode) {
				var errorHandler = _g.__data.error;
				errorHandler(ufront_remoting_RemotingError.RApiNotFound(remotingCallString,h.responseData()));
			} else {
				var errorHandler1 = _g.__data.error;
				errorHandler1(ufront_remoting_RemotingError.RHttpError(remotingCallString,responseCode,h.responseData()));
			}
		};
		h.handle(onStatus,onData,onError);
		var uploadsReady = h.attachUploads(s.uploads);
		uploadsReady(function(outcome) {
			switch(outcome[1]) {
			case 0:
				h.send();
				break;
			case 1:
				var err = outcome[2];
				onStatus(0);
				onError("Failed to read attachments: " + Std.string(err));
				break;
			}
		});
	}
	,__class__: ufront_remoting_HttpAsyncConnection
});
var ufront_remoting_HttpConnection = function(url,path) {
	haxe_remoting_HttpConnection.call(this,url,path);
};
$hxClasses["ufront.remoting.HttpConnection"] = ufront_remoting_HttpConnection;
ufront_remoting_HttpConnection.__name__ = ["ufront","remoting","HttpConnection"];
ufront_remoting_HttpConnection.urlConnect = function(url) {
	return new ufront_remoting_HttpConnection(url,[]);
};
ufront_remoting_HttpConnection.__super__ = haxe_remoting_HttpConnection;
ufront_remoting_HttpConnection.prototype = $extend(haxe_remoting_HttpConnection.prototype,{
	call: function(params) {
		var h = new ufront_remoting_HttpWithUploads(this.__url,false,ufront_remoting_HttpConnection.TIMEOUT);
		var data = null;
		var status = null;
		var s = new ufront_remoting_RemotingSerializer(ufront_remoting_RemotingDirection.RDClientToServer);
		s.serialize(this.__path);
		s.serialize(params);
		var remotingCallString = this.__path.join(".") + "(" + params.join(",") + ")";
		var responseCode;
		var responseText;
		var result;
		var throwError = function(v) {
			throw new js__$Boot_HaxeError(v);
		};
		var setResult = function(v1) {
			result = v1;
		};
		var onStatus = function(s1) {
			responseCode = status;
		};
		var onData = function(str) {
			responseText = str;
			ufront_remoting_RemotingUtil.processResponse(responseText,setResult,throwError,remotingCallString);
		};
		var onError = function(errorData) {
			if(500 == responseCode) ufront_remoting_RemotingUtil.processResponse(h.responseData(),setResult,throwError,remotingCallString); else throwError(ufront_remoting_RemotingError.RHttpError(remotingCallString,responseCode,h.responseData()));
		};
		h.handle(onStatus,onData,onError);
		h.setHeader("X-Haxe-Remoting","1");
		h.setHeader("X-Ufront-Remoting","1");
		h.setParam("__x",s.toString());
		h.attachUploads(s.uploads);
		h.send();
		return result;
	}
	,__class__: ufront_remoting_HttpConnection
});
var ufront_remoting_HttpWithUploads = function(url,async,timeout) {
	this.h = new XMLHttpRequest();
	this.files = [];
	this.params = [];
	this.h.open("POST",url,async);
	this.async = async;
};
$hxClasses["ufront.remoting.HttpWithUploads"] = ufront_remoting_HttpWithUploads;
ufront_remoting_HttpWithUploads.__name__ = ["ufront","remoting","HttpWithUploads"];
ufront_remoting_HttpWithUploads.prototype = {
	h: null
	,files: null
	,params: null
	,async: null
	,setHeader: function(k,v) {
		this.h.setRequestHeader(k,v);
	}
	,setParam: function(k,v) {
		this.params.push({ name : k, val : v});
	}
	,attachUploads: function(uploads) {
		var $it0 = uploads.keys();
		while( $it0.hasNext() ) {
			var postName = $it0.next();
			var _g = 0;
			var _g1 = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.getAll(uploads,postName);
			while(_g < _g1.length) {
				var u = _g1[_g];
				++_g;
				var browserFileUpload;
				browserFileUpload = (u instanceof ufront_web_upload_BrowserFileUpload)?u:null;
				if(browserFileUpload != null) this.files.push({ postName : postName, file : browserFileUpload.file, fileName : u.originalFileName});
			}
		}
		return ufront_core_SurpriseTools.success();
	}
	,send: function() {
		if(this.files.length > 0) {
			var formData = new FormData();
			var _g = 0;
			var _g1 = this.params;
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				formData.append(p.name,p.val);
			}
			var _g2 = 0;
			var _g11 = this.files;
			while(_g2 < _g11.length) {
				var f = _g11[_g2];
				++_g2;
				formData.append(f.postName,f.file,f.fileName);
			}
			this.h.send(formData);
		} else {
			var urlEncodedDataPairs = [];
			var _g3 = 0;
			var _g12 = this.params;
			while(_g3 < _g12.length) {
				var p1 = _g12[_g3];
				++_g3;
				urlEncodedDataPairs.push(encodeURIComponent(p1.name) + "=" + encodeURIComponent(p1.val));
			}
			var urlEncodedData = StringTools.replace(urlEncodedDataPairs.join("&"),"%20","+");
			this.h.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			this.h.send(urlEncodedData);
		}
	}
	,responseData: function() {
		return this.h.responseText;
	}
	,handle: function(onStatus,onData,onError) {
		var _g = this;
		this.h.onload = function(oEvent) {
			onStatus(_g.h.status);
			if(_g.h.status == 200) onData(_g.h.responseText); else onError(_g.h.responseText);
		};
	}
	,__class__: ufront_remoting_HttpWithUploads
};
var ufront_remoting_RemotingError = $hxClasses["ufront.remoting.RemotingError"] = { __ename__ : ["ufront","remoting","RemotingError"], __constructs__ : ["RHttpError","RApiNotFound","RServerSideException","RClientCallbackException","RUnserializeFailed","RNoRemotingResult","RApiFailure","RUnknownException"] };
ufront_remoting_RemotingError.RHttpError = function(remotingCallString,responseCode,responseData) { var $x = ["RHttpError",0,remotingCallString,responseCode,responseData]; $x.__enum__ = ufront_remoting_RemotingError; $x.toString = $estr; return $x; };
ufront_remoting_RemotingError.RApiNotFound = function(remotingCallString,errorMessage) { var $x = ["RApiNotFound",1,remotingCallString,errorMessage]; $x.__enum__ = ufront_remoting_RemotingError; $x.toString = $estr; return $x; };
ufront_remoting_RemotingError.RServerSideException = function(remotingCallString,e,stack) { var $x = ["RServerSideException",2,remotingCallString,e,stack]; $x.__enum__ = ufront_remoting_RemotingError; $x.toString = $estr; return $x; };
ufront_remoting_RemotingError.RClientCallbackException = function(remotingCallString,e) { var $x = ["RClientCallbackException",3,remotingCallString,e]; $x.__enum__ = ufront_remoting_RemotingError; $x.toString = $estr; return $x; };
ufront_remoting_RemotingError.RUnserializeFailed = function(remotingCallString,troubleLine,err) { var $x = ["RUnserializeFailed",4,remotingCallString,troubleLine,err]; $x.__enum__ = ufront_remoting_RemotingError; $x.toString = $estr; return $x; };
ufront_remoting_RemotingError.RNoRemotingResult = function(remotingCallString,responseData) { var $x = ["RNoRemotingResult",5,remotingCallString,responseData]; $x.__enum__ = ufront_remoting_RemotingError; $x.toString = $estr; return $x; };
ufront_remoting_RemotingError.RApiFailure = function(remotingCallString,data) { var $x = ["RApiFailure",6,remotingCallString,data]; $x.__enum__ = ufront_remoting_RemotingError; $x.toString = $estr; return $x; };
ufront_remoting_RemotingError.RUnknownException = function(e) { var $x = ["RUnknownException",7,e]; $x.__enum__ = ufront_remoting_RemotingError; $x.toString = $estr; return $x; };
var ufront_remoting_RemotingHandler = function() {
	this.apiContexts = new List();
	this.apis = new List();
};
$hxClasses["ufront.remoting.RemotingHandler"] = ufront_remoting_RemotingHandler;
ufront_remoting_RemotingHandler.__name__ = ["ufront","remoting","RemotingHandler"];
ufront_remoting_RemotingHandler.__interfaces__ = [ufront_app_UFRequestHandler];
ufront_remoting_RemotingHandler.prototype = {
	apiContexts: null
	,apis: null
	,context: null
	,loadApi: function(api) {
		this.apis.push(api);
	}
	,loadApis: function(newAPIs) {
		var $it0 = $iterator(newAPIs)();
		while( $it0.hasNext() ) {
			var api = $it0.next();
			this.apis.push(api);
		}
	}
	,loadApiContext: function(apiContext) {
		this.apiContexts.push(apiContext);
		this.loadApis(ufront_api_UFApiContext.getApisInContext(apiContext));
	}
	,handleRequest: function(httpContext) {
		var doneTrigger = new tink_core_FutureTrigger();
		if((function($this) {
			var $r;
			var this1 = httpContext.request.get_clientHeaders();
			var name = "X-Haxe-Remoting".toLowerCase();
			$r = __map_reserved[name] != null?this1.existsReserved(name):this1.h.hasOwnProperty(name);
			return $r;
		}(this))) {
			var r = httpContext.response;
			var remotingResponse;
			r.setOk();
			var path = null;
			var args = null;
			try {
				this.initializeContext(httpContext.injector);
				var params = httpContext.request.get_params();
				if(!(__map_reserved.__x != null?params.existsReserved("__x"):params.h.hasOwnProperty("__x"))) throw new js__$Boot_HaxeError("Remoting call did not have parameter `__x` which describes which API call to make.  Aborting");
				var remotingCall = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(params,"__x");
				var u = new ufront_remoting_RemotingUnserializer(remotingCall,httpContext.request.get_files());
				try {
					path = u.unserialize();
					args = u.unserialize();
					var _g1 = 0;
					var _g = args.length;
					while(_g1 < _g) {
						var i = _g1++;
						var baseUpload = Std.instance(args[i],ufront_web_upload_BaseUpload);
						if(baseUpload != null && baseUpload.attachedUpload != null) args[i] = baseUpload.attachedUpload;
					}
				} catch( e ) {
					haxe_CallStack.lastException = e;
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					throw new js__$Boot_HaxeError("Unable to deserialize remoting call: " + Std.string(e) + ". Remoting call string: " + remotingCall);
				}
				var apiCallFinished = this.executeApiCall(path,args,this.context,httpContext.actionContext);
				remotingResponse = tink_core__$Future_Future_$Impl_$.map(apiCallFinished,function(data) {
					var s = new ufront_remoting_RemotingSerializer(ufront_remoting_RemotingDirection.RDServerToClient);
					s.serialize(data);
					return "hxr" + s.toString();
				});
			} catch( e1 ) {
				haxe_CallStack.lastException = e1;
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				var error = e1;
				var apiNotFoundMessages = ["Invalid path","No such object","Can't access","No such method"];
				if(path != null && args != null && typeof(e1) == "string" && Lambda.exists(apiNotFoundMessages,function(msg) {
					return StringTools.startsWith(error,msg);
				})) {
					remotingResponse = tink_core__$Future_Future_$Impl_$.sync("Unable to access " + path.join(".") + " - API Not Found (" + error + "). See " + Std.string(this.context.objects));
					r.setNotFound();
				} else {
					r.setInternalError();
					remotingResponse = tink_core__$Future_Future_$Impl_$.sync(this.remotingError(e1,httpContext));
				}
			}
			remotingResponse(function(response) {
				r.set_contentType("application/x-haxe-remoting");
				r.clearContent();
				r.write(response);
				httpContext.completion |= 1 << ufront_web_context_RequestCompletion.CRequestHandlersComplete[1];
				doneTrigger.trigger(tink_core_Outcome.Success(tink_core_Noise.Noise));
			});
		} else doneTrigger.trigger(tink_core_Outcome.Success(tink_core_Noise.Noise));
		return doneTrigger.future;
	}
	,initializeContext: function(injector) {
		this.context = new haxe_remoting_Context();
		var _g_head = this.apiContexts.h;
		var _g_val = null;
		while(_g_head != null) {
			var apiContextClass;
			apiContextClass = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			var apiContext = injector._instantiate(apiContextClass);
			var _g = 0;
			var _g1 = Reflect.fields(apiContext);
			while(_g < _g1.length) {
				var fieldName = _g1[_g];
				++_g;
				var api = Reflect.field(apiContext,fieldName);
				if(Reflect.isObject(api)) this.context.addObject(fieldName,api,false);
			}
		}
		var _g_head1 = this.apis.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var apiClass;
			apiClass = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			var className = Type.getClassName(apiClass);
			var api1 = injector._instantiate(apiClass);
			this.context.addObject(className,api1,false);
		}
	}
	,executeApiCall: function(path,args,remotingContext,actionContext) {
		if(remotingContext.objects.exists(path[0]) == false) throw new js__$Boot_HaxeError("Invalid path " + path.join("."));
		actionContext.handler = this;
		actionContext.action = path[path.length - 1];
		actionContext.controller = remotingContext.objects.get(path[0]).obj;
		actionContext.args = args;
		var returnType;
		try {
			var fieldsMeta = haxe_rtti_Meta.getFields(Type.getClass(actionContext.controller));
			var actionMeta = Reflect.field(fieldsMeta,actionContext.action);
			returnType = actionMeta.returnType[0];
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			returnType = 0;
		}
		var flags = returnType;
		var result = remotingContext.call(path,args);
		if((flags & 1 << ufront_api_ApiReturnType.ARTFuture[1]) != 0) return result; else if((flags & 1 << ufront_api_ApiReturnType.ARTVoid[1]) != 0) return tink_core__$Future_Future_$Impl_$.sync(null); else return tink_core__$Future_Future_$Impl_$.sync(result);
	}
	,remotingError: function(e,httpContext) {
		httpContext.messages.push({ msg : e, pos : { fileName : "RemotingHandler.hx", lineNumber : 209, className : "ufront.remoting.RemotingHandler", methodName : "remotingError"}, type : ufront_log_MessageType.MError});
		if((function($this) {
			var $r;
			var this1 = httpContext.request.get_clientHeaders();
			var name = "X-Ufront-Remoting".toLowerCase();
			$r = __map_reserved[name] != null?this1.existsReserved(name):this1.h.hasOwnProperty(name);
			return $r;
		}(this))) {
			var s = new ufront_remoting_RemotingSerializer(ufront_remoting_RemotingDirection.RDServerToClient);
			s.serializeException(e);
			var serializedException = "hxe" + s.toString();
			return serializedException;
		} else {
			var s1 = new ufront_remoting_RemotingSerializer(ufront_remoting_RemotingDirection.RDServerToClient);
			s1.serializeException(e);
			return "hxr" + s1.toString();
		}
	}
	,toString: function() {
		return "ufront.remoting.RemotingHandler";
	}
	,__class__: ufront_remoting_RemotingHandler
};
var ufront_remoting_RemotingSerializer = function(dir) {
	haxe_Serializer.call(this);
	this.direction = dir;
	this.uploads = new haxe_ds_StringMap();
};
$hxClasses["ufront.remoting.RemotingSerializer"] = ufront_remoting_RemotingSerializer;
ufront_remoting_RemotingSerializer.__name__ = ["ufront","remoting","RemotingSerializer"];
ufront_remoting_RemotingSerializer.run = function(obj,direction) {
	var s = new ufront_remoting_RemotingSerializer(direction);
	s.serialize(obj);
	return s.toString();
};
ufront_remoting_RemotingSerializer.__super__ = haxe_Serializer;
ufront_remoting_RemotingSerializer.prototype = $extend(haxe_Serializer.prototype,{
	uploads: null
	,direction: null
	,__class__: ufront_remoting_RemotingSerializer
});
var ufront_remoting_RemotingDirection = $hxClasses["ufront.remoting.RemotingDirection"] = { __ename__ : ["ufront","remoting","RemotingDirection"], __constructs__ : ["RDClientToServer","RDServerToClient"] };
ufront_remoting_RemotingDirection.RDClientToServer = ["RDClientToServer",0];
ufront_remoting_RemotingDirection.RDClientToServer.toString = $estr;
ufront_remoting_RemotingDirection.RDClientToServer.__enum__ = ufront_remoting_RemotingDirection;
ufront_remoting_RemotingDirection.RDServerToClient = ["RDServerToClient",1];
ufront_remoting_RemotingDirection.RDServerToClient.toString = $estr;
ufront_remoting_RemotingDirection.RDServerToClient.__enum__ = ufront_remoting_RemotingDirection;
var ufront_remoting_RemotingUnserializer = function(buf,uploads) {
	haxe_Unserializer.call(this,buf);
	if(uploads != null) this.uploads = uploads; else this.uploads = new haxe_ds_StringMap();
};
$hxClasses["ufront.remoting.RemotingUnserializer"] = ufront_remoting_RemotingUnserializer;
ufront_remoting_RemotingUnserializer.__name__ = ["ufront","remoting","RemotingUnserializer"];
ufront_remoting_RemotingUnserializer.__super__ = haxe_Unserializer;
ufront_remoting_RemotingUnserializer.prototype = $extend(haxe_Unserializer.prototype,{
	uploads: null
	,__class__: ufront_remoting_RemotingUnserializer
});
var ufront_remoting_RemotingUtil = function() { };
$hxClasses["ufront.remoting.RemotingUtil"] = ufront_remoting_RemotingUtil;
ufront_remoting_RemotingUtil.__name__ = ["ufront","remoting","RemotingUtil"];
ufront_remoting_RemotingUtil.processResponse = function(response,onResult,errorHandler,remotingCallString) {
	var ret = null;
	var stack = null;
	var hxrFound = false;
	var errors = [];
	var onError = ufront_remoting_RemotingUtil.wrapErrorHandler(errorHandler);
	if(HxOverrides.substr(response,0,2) != "hx") onError(ufront_remoting_RemotingError.RNoRemotingResult(remotingCallString,response)); else {
		var _g = 0;
		var _g1 = response.split("\n");
		while(_g < _g1.length) {
			var line = _g1[_g];
			++_g;
			if(line == "") continue;
			var _g2 = HxOverrides.substr(line,0,3);
			switch(_g2) {
			case "hxr":
				var s = new ufront_remoting_RemotingUnserializer(HxOverrides.substr(line,3,null));
				try {
					ret = s.unserialize();
				} catch( e ) {
					haxe_CallStack.lastException = e;
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					ret = errors.push(ufront_remoting_RemotingError.RUnserializeFailed(remotingCallString,HxOverrides.substr(line,3,null),"" + Std.string(e)));
				}
				hxrFound = true;
				break;
			case "hxt":
				var s1 = new ufront_remoting_RemotingUnserializer(HxOverrides.substr(line,3,null));
				var m;
				try {
					m = s1.unserialize();
				} catch( e1 ) {
					haxe_CallStack.lastException = e1;
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
					m = errors.push(ufront_remoting_RemotingError.RUnserializeFailed(remotingCallString,HxOverrides.substr(line,3,null),"" + Std.string(e1)));
				}
				var extras;
				if(m.pos != null && m.pos.customParams != null) extras = " " + m.pos.customParams.join(" "); else extras = "";
				var msg = "[R]" + m.pos.className + "." + m.pos.methodName + "(" + m.pos.lineNumber + "): " + Std.string(m.msg) + extras;
				var c = window.console;
				var _g3 = m.type;
				switch(_g3[1]) {
				case 0:
					c.log(msg);
					break;
				case 1:
					c.info(msg);
					break;
				case 2:
					c.warn(msg);
					break;
				case 3:
					c.error(msg);
					break;
				}
				break;
			case "hxs":
				var s2 = new ufront_remoting_RemotingUnserializer(HxOverrides.substr(line,3,null));
				try {
					stack = s2.unserialize();
				} catch( e2 ) {
					haxe_CallStack.lastException = e2;
					if (e2 instanceof js__$Boot_HaxeError) e2 = e2.val;
					stack = errors.push(ufront_remoting_RemotingError.RUnserializeFailed(remotingCallString,HxOverrides.substr(line,3,null),"" + Std.string(e2)));
				}
				break;
			case "hxe":
				var s3 = new ufront_remoting_RemotingUnserializer(HxOverrides.substr(line,3,null));
				try {
					ret = s3.unserialize();
				} catch( e3 ) {
					haxe_CallStack.lastException = e3;
					if (e3 instanceof js__$Boot_HaxeError) e3 = e3.val;
					ret = errors.push(ufront_remoting_RemotingError.RServerSideException(remotingCallString,e3,stack));
				}
				break;
			default:
				errors.push(ufront_remoting_RemotingError.RUnserializeFailed(remotingCallString,line,"Invalid line in response"));
			}
		}
	}
	if(errors.length == 0) {
		if(hxrFound) try {
			onResult(ret);
		} catch( e4 ) {
			haxe_CallStack.lastException = e4;
			if (e4 instanceof js__$Boot_HaxeError) e4 = e4.val;
			onError(ufront_remoting_RemotingError.RClientCallbackException(remotingCallString,e4));
		} else onError(ufront_remoting_RemotingError.RNoRemotingResult(remotingCallString,response));
	} else {
		var _g4 = 0;
		while(_g4 < errors.length) {
			var err = errors[_g4];
			++_g4;
			onError(err);
		}
	}
};
ufront_remoting_RemotingUtil.wrapErrorHandler = function(errorHandler) {
	return function(e) {
		if(js_Boot.__instanceof(e,ufront_remoting_RemotingError)) errorHandler(e); else errorHandler(ufront_remoting_RemotingError.RUnknownException(e));
	};
};
ufront_remoting_RemotingUtil.defaultErrorHandler = function(error) {
	switch(error[1]) {
	case 0:
		var responseData = error[4];
		var responseCode = error[3];
		var remotingCallString = error[2];
		haxe_Log.trace("Error during remoting call " + remotingCallString + ": The HTTP Request returned status [" + responseCode + "].",{ fileName : "RemotingUtil.hx", lineNumber : 125, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		haxe_Log.trace("Returned data: " + responseData,{ fileName : "RemotingUtil.hx", lineNumber : 126, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		break;
	case 1:
		var err = error[3];
		var remotingCallString1 = error[2];
		haxe_Log.trace("Error during remoting call " + remotingCallString1 + ": API or Method is not found or not available in the remoting context.",{ fileName : "RemotingUtil.hx", lineNumber : 128, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		haxe_Log.trace("Error message: " + err,{ fileName : "RemotingUtil.hx", lineNumber : 129, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		break;
	case 2:
		var stack = error[4];
		var e = error[3];
		var remotingCallString2 = error[2];
		haxe_Log.trace("Error during remoting call " + remotingCallString2 + ": The server threw an error \"" + Std.string(e) + "\".",{ fileName : "RemotingUtil.hx", lineNumber : 131, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		haxe_Log.trace(stack,{ fileName : "RemotingUtil.hx", lineNumber : 132, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		break;
	case 3:
		var e1 = error[3];
		var remotingCallString3 = error[2];
		haxe_Log.trace("Error during remoting call " + remotingCallString3 + ": The client throw an error \"" + Std.string(e1) + "\" during the remoting callback.",{ fileName : "RemotingUtil.hx", lineNumber : 134, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		haxe_Log.trace("Compiling with \"-debug\" will prevent this error being caught, so you can use your browser's debugger to collect more information.",{ fileName : "RemotingUtil.hx", lineNumber : 135, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		break;
	case 4:
		var err1 = error[4];
		var troubleLine = error[3];
		var remotingCallString4 = error[2];
		haxe_Log.trace("Error during remoting call " + remotingCallString4 + ": Failed to unserialize this line in the response: \"" + err1 + "\"",{ fileName : "RemotingUtil.hx", lineNumber : 137, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		haxe_Log.trace("The line that failed: \"" + err1 + "\"",{ fileName : "RemotingUtil.hx", lineNumber : 138, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		break;
	case 5:
		var responseData1 = error[3];
		var remotingCallString5 = error[2];
		haxe_Log.trace("Error during remoting call " + remotingCallString5 + ": No remoting result in data.",{ fileName : "RemotingUtil.hx", lineNumber : 140, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		haxe_Log.trace("Returned data: " + responseData1,{ fileName : "RemotingUtil.hx", lineNumber : 141, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		break;
	case 6:
		var data = error[3];
		var remotingCallString6 = error[2];
		haxe_Log.trace("The remoting call " + remotingCallString6 + " functioned correctly, but the API returned a failure: " + Std.string(data),{ fileName : "RemotingUtil.hx", lineNumber : 143, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		break;
	case 7:
		var e2 = error[2];
		haxe_Log.trace("Unknown error encountered during remoting call: " + Std.string(e2),{ fileName : "RemotingUtil.hx", lineNumber : 145, className : "ufront.remoting.RemotingUtil", methodName : "defaultErrorHandler"});
		break;
	}
};
var ufront_test_MockHttpRequest = function(uri) {
	if(uri == null) uri = "/";
	this.setQueryString("");
	this.setPostString("");
	this.setQuery((function($this) {
		var $r;
		var map = new haxe_ds_StringMap();
		$r = map;
		return $r;
	}(this)));
	this.setPost((function($this) {
		var $r;
		var map1 = new haxe_ds_StringMap();
		$r = map1;
		return $r;
	}(this)));
	this.setFiles((function($this) {
		var $r;
		var map2 = new haxe_ds_StringMap();
		$r = map2;
		return $r;
	}(this)));
	this.setCookies((function($this) {
		var $r;
		var map3 = new haxe_ds_StringMap();
		$r = map3;
		return $r;
	}(this)));
	this.setHostName("localhost");
	this.setClientIP("127.0.0.1");
	this.setUri(uri);
	this.setClientHeaders(new haxe_ds_StringMap());
	this.setUserAgent(ufront_web_UserAgent.fromString("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:43.0) Gecko/20100101 Firefox/43.0"));
	this.setHttpMethod("GET");
	this.setScriptDirectory("/var/www/");
	this.setAuthorization(null);
	this.setIsMultipart(false);
};
$hxClasses["ufront.test.MockHttpRequest"] = ufront_test_MockHttpRequest;
ufront_test_MockHttpRequest.__name__ = ["ufront","test","MockHttpRequest"];
ufront_test_MockHttpRequest.__super__ = ufront_web_context_HttpRequest;
ufront_test_MockHttpRequest.prototype = $extend(ufront_web_context_HttpRequest.prototype,{
	setParams: function(params) {
		this.params = params;
		return this;
	}
	,get_queryString: function() {
		return this.queryString;
	}
	,setQueryString: function(qs) {
		this.queryString = qs;
		return this;
	}
	,get_postString: function() {
		return this.postString;
	}
	,setPostString: function(ps) {
		this.postString = ps;
		return this;
	}
	,get_query: function() {
		return this.query;
	}
	,setQuery: function(query) {
		this.query = query;
		return this;
	}
	,get_post: function() {
		return this.post;
	}
	,setPost: function(post) {
		this.post = post;
		return this;
	}
	,get_files: function() {
		return this.files;
	}
	,setFiles: function(files) {
		this.files = files;
		return this;
	}
	,get_cookies: function() {
		return this.cookies;
	}
	,setCookies: function(cookies) {
		this.cookies = cookies;
		return this;
	}
	,get_hostName: function() {
		return this.hostName;
	}
	,setHostName: function(hostName) {
		this.hostName = hostName;
		return this;
	}
	,get_clientIP: function() {
		return this.clientIP;
	}
	,setClientIP: function(clientIP) {
		this.clientIP = clientIP;
		return this;
	}
	,get_uri: function() {
		return this.uri;
	}
	,setUri: function(uri) {
		this.uri = uri;
		return this;
	}
	,get_clientHeaders: function() {
		return this.clientHeaders;
	}
	,setClientHeaders: function(clientHeaders) {
		this.clientHeaders = clientHeaders;
		return this;
	}
	,get_userAgent: function() {
		return this.userAgent;
	}
	,setUserAgent: function(userAgent) {
		this.userAgent = userAgent;
		return this;
	}
	,get_httpMethod: function() {
		return this.httpMethod;
	}
	,setHttpMethod: function(httpMethod) {
		this.httpMethod = httpMethod;
		return this;
	}
	,get_scriptDirectory: function() {
		return this.scriptDirectory;
	}
	,setScriptDirectory: function(scriptDirectory) {
		this.scriptDirectory = scriptDirectory;
		return this;
	}
	,get_authorization: function() {
		return this.authorization;
	}
	,setAuthorization: function(authorization) {
		this.authorization = authorization;
		return this;
	}
	,setIsMultipart: function(isMultipart) {
		if(isMultipart) {
			var this1 = this.get_clientHeaders();
			ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.set(this1,"Content-Type".toLowerCase(),"multipart/form-data; charset=UTF-8");
		} else {
			var this2 = this.get_clientHeaders();
			ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.set(this2,"Content-Type".toLowerCase(),"application/x-www-form-urlencoded; charset=UTF-8");
		}
		return this;
	}
	,parseMultipart: function(onPart,onData,onEndPart) {
		throw new js__$Boot_HaxeError(ufront_web_HttpError.wrap("parseMultipart is not supported in MockHttpRequest",null,{ fileName : "MockHttpRequest.hx", lineNumber : 158, className : "ufront.test.MockHttpRequest", methodName : "parseMultipart"}));
	}
	,__class__: ufront_test_MockHttpRequest
});
var ufront_test_TestUtils = function() { };
$hxClasses["ufront.test.TestUtils"] = ufront_test_TestUtils;
ufront_test_TestUtils.__name__ = ["ufront","test","TestUtils"];
var ufront_test_NaturalLanguageTests = function() { };
$hxClasses["ufront.test.NaturalLanguageTests"] = ufront_test_NaturalLanguageTests;
ufront_test_NaturalLanguageTests.__name__ = ["ufront","test","NaturalLanguageTests"];
var ufront_view_UFViewEngine = function(cachingEnabled) {
	if(cachingEnabled == null) cachingEnabled = ufront_view_UFViewEngine.cacheEnabledByDefault;
	if(cachingEnabled) this.cache = new haxe_ds_StringMap();
	this.engines = [];
};
$hxClasses["ufront.view.UFViewEngine"] = ufront_view_UFViewEngine;
ufront_view_UFViewEngine.__name__ = ["ufront","view","UFViewEngine"];
ufront_view_UFViewEngine.prototype = {
	engines: null
	,cache: null
	,getTemplate: function(path,templatingEngine) {
		var _g = this;
		if(this.cache != null && this.cache.exists(path)) {
			var cached = this.cache.get(path);
			if(templatingEngine == null || templatingEngine.type == cached.a) return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(cached.b));
		}
		var tplStrReady = new tink_core_FutureTrigger();
		var ext = haxe_io_Path.extension(path);
		var finalPath = null;
		if(templatingEngine != null && ext != "") {
			finalPath = path;
			var this1 = this.getTemplateString(finalPath);
			this1(function(result) {
				switch(result[1]) {
				case 1:
					var err = result[2];
					tplStrReady.trigger(tink_core_Outcome.Failure(err));
					break;
				case 0:
					switch(result[2][1]) {
					case 0:
						var tpl = result[2][2];
						tplStrReady.trigger(tink_core_Outcome.Success(tpl));
						break;
					case 1:
						tplStrReady.trigger(tink_core_Outcome.Failure(new tink_core_TypedError(null,"Template " + path + " not found",null,{ fileName : "UFViewEngine.hx", lineNumber : 115, className : "ufront.view.UFViewEngine", methodName : "getTemplate"})));
						break;
					}
					break;
				}
			});
		} else if(templatingEngine != null && ext == "") {
			var exts = templatingEngine.extensions.slice();
			var testNextExtension;
			var testNextExtension1 = null;
			testNextExtension1 = function() {
				if(exts.length > 0) {
					var ext1 = exts.shift();
					finalPath = haxe_io_Path.withExtension(path,ext1);
					var this2 = _g.getTemplateString(finalPath);
					this2(function(result1) {
						switch(result1[1]) {
						case 1:
							var err1 = result1[2];
							tplStrReady.trigger(tink_core_Outcome.Failure(err1));
							break;
						case 0:
							switch(result1[2][1]) {
							case 0:
								var tpl1 = result1[2][2];
								tplStrReady.trigger(tink_core_Outcome.Success(tpl1));
								break;
							case 1:
								testNextExtension1();
								break;
							}
							break;
						}
					});
				} else tplStrReady.trigger(tink_core_Outcome.Failure(new tink_core_TypedError(null,"No template found for " + path + " with extensions " + Std.string(templatingEngine.extensions),null,{ fileName : "UFViewEngine.hx", lineNumber : 131, className : "ufront.view.UFViewEngine", methodName : "getTemplate"})));
			};
			testNextExtension = testNextExtension1;
			testNextExtension();
		} else if(templatingEngine == null && ext != "") {
			var tplEngines = this.engines.slice();
			var testNextEngine;
			var testNextEngine1 = null;
			testNextEngine1 = function() {
				if(tplEngines.length > 0) {
					var engine = tplEngines.shift();
					if(Lambda.has(engine.extensions,ext)) {
						finalPath = haxe_io_Path.normalize(path);
						var this3 = _g.getTemplateString(finalPath);
						this3(function(result2) {
							switch(result2[1]) {
							case 1:
								var err2 = result2[2];
								tplStrReady.trigger(tink_core_Outcome.Failure(err2));
								break;
							case 0:
								switch(result2[2][1]) {
								case 0:
									var tpl2 = result2[2][2];
									templatingEngine = engine;
									tplStrReady.trigger(tink_core_Outcome.Success(tpl2));
									break;
								case 1:
									tplStrReady.trigger(tink_core_Outcome.Failure(new tink_core_TypedError(null,"Template " + path + " not found",null,{ fileName : "UFViewEngine.hx", lineNumber : 147, className : "ufront.view.UFViewEngine", methodName : "getTemplate"})));
									break;
								}
								break;
							}
						});
					} else testNextEngine1();
				} else tplStrReady.trigger(tink_core_Outcome.Failure(new tink_core_TypedError(null,"No templating engine found for " + path + " (None support extension " + ext + ")",null,{ fileName : "UFViewEngine.hx", lineNumber : 151, className : "ufront.view.UFViewEngine", methodName : "getTemplate"})));
			};
			testNextEngine = testNextEngine1;
			testNextEngine();
		} else if(templatingEngine == null && ext == "") {
			var tplEngines1 = this.engines.slice();
			var engine1 = null;
			var extensions = [];
			var extensionsUsed = [];
			var ext2 = null;
			var testNextEngineOrExtension;
			var testNextEngineOrExtension1 = null;
			testNextEngineOrExtension1 = function() {
				if(extensions.length == 0 && tplEngines1.length == 0) {
					tplStrReady.trigger(tink_core_Outcome.Failure(new tink_core_TypedError(null,"No template found for " + path + " with extensions " + Std.string(extensionsUsed),null,{ fileName : "UFViewEngine.hx", lineNumber : 165, className : "ufront.view.UFViewEngine", methodName : "getTemplate"})));
					return;
				} else if(extensions.length == 0) {
					engine1 = tplEngines1.shift();
					extensions = engine1.extensions.slice();
					ext2 = extensions.shift();
				} else ext2 = extensions.shift();
				extensionsUsed.push(ext2);
				finalPath = haxe_io_Path.withExtension(path,ext2);
				var this4 = _g.getTemplateString(finalPath);
				this4(function(result3) {
					switch(result3[1]) {
					case 1:
						var err3 = result3[2];
						tplStrReady.trigger(tink_core_Outcome.Failure(err3));
						break;
					case 0:
						switch(result3[2][1]) {
						case 0:
							var tpl3 = result3[2][2];
							templatingEngine = engine1;
							tplStrReady.trigger(tink_core_Outcome.Success(tpl3));
							break;
						case 1:
							testNextEngineOrExtension1();
							break;
						}
						break;
					}
				});
				return;
			};
			testNextEngineOrExtension = testNextEngineOrExtension1;
			testNextEngineOrExtension();
		}
		return tink_core__$Future_Future_$Impl_$._tryFailingMap(tplStrReady.future,function(tplStr) {
			try {
				var tpl4 = templatingEngine.factory(tplStr);
				if(_g.cache != null) {
					var v = new tink_core_MPair(templatingEngine.type,tpl4);
					_g.cache.set(path,v);
					v;
				}
				return tink_core_Outcome.Success(tpl4);
			} catch( e ) {
				haxe_CallStack.lastException = e;
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				return tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Failed to parse template " + finalPath + " using " + templatingEngine.type,e,{ fileName : "UFViewEngine.hx", lineNumber : 205, className : "ufront.view.UFViewEngine", methodName : "getTemplate"}));
			}
		});
	}
	,getTemplateString: function(path) {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(new tink_core_TypedError(null,"Attempting to fetch template " + path + " with UFViewEngine.  This is an abstract class, you must use one of the ViewEngine implementations.",null,{ fileName : "UFViewEngine.hx", lineNumber : 226, className : "ufront.view.UFViewEngine", methodName : "getTemplateString"})));
	}
	,addTemplatingEngine: function(engine) {
		this.engines.push(engine);
	}
	,__class__: ufront_view_UFViewEngine
};
var ufront_view_FileViewEngine = function(cachingEnabled) {
	ufront_view_UFViewEngine.call(this,cachingEnabled);
};
$hxClasses["ufront.view.FileViewEngine"] = ufront_view_FileViewEngine;
ufront_view_FileViewEngine.__name__ = ["ufront","view","FileViewEngine"];
ufront_view_FileViewEngine.__super__ = ufront_view_UFViewEngine;
ufront_view_FileViewEngine.prototype = $extend(ufront_view_UFViewEngine.prototype,{
	scriptDir: null
	,path: null
	,isPathAbsolute: null
	,get_isPathAbsolute: function() {
		return StringTools.startsWith(this.path,"/");
	}
	,viewDirectory: null
	,get_viewDirectory: function() {
		if(this.get_isPathAbsolute()) return haxe_io_Path.addTrailingSlash(this.path); else return haxe_io_Path.addTrailingSlash(this.scriptDir) + haxe_io_Path.addTrailingSlash(this.path);
	}
	,getTemplateString: function(viewRelativePath) {
		var fullPath = this.get_viewDirectory() + viewRelativePath;
		var attemptRead = function(cb) {
			js_node_Fs.readFile(fullPath,{ encoding : "utf-8"},function(err,data) {
				if(err != null && err.code == "ENOENT") cb(null,haxe_ds_Option.None); else if(err != null) cb(err,null); else cb(null,haxe_ds_Option.Some(data));
			});
		};
		return ufront_core_CallbackTools.asSurprise(attemptRead,{ fileName : "FileViewEngine.hx", lineNumber : 73, className : "ufront.view.FileViewEngine", methodName : "getTemplateString"});
	}
	,__class__: ufront_view_FileViewEngine
	,__properties__: {get_viewDirectory:"get_viewDirectory",get_isPathAbsolute:"get_isPathAbsolute"}
});
var ufront_view_HttpViewEngine = function(cachingEnabled) {
	ufront_view_UFViewEngine.call(this,cachingEnabled);
};
$hxClasses["ufront.view.HttpViewEngine"] = ufront_view_HttpViewEngine;
ufront_view_HttpViewEngine.__name__ = ["ufront","view","HttpViewEngine"];
ufront_view_HttpViewEngine.__super__ = ufront_view_UFViewEngine;
ufront_view_HttpViewEngine.prototype = $extend(ufront_view_UFViewEngine.prototype,{
	viewPath: null
	,getTemplateString: function(relativeViewPath) {
		if(StringTools.startsWith(relativeViewPath,"/")) relativeViewPath = HxOverrides.substr(relativeViewPath,1,null);
		var fullPath = haxe_io_Path.addTrailingSlash(this.viewPath) + relativeViewPath;
		try {
			var ft = new tink_core_FutureTrigger();
			var req = new haxe_Http(fullPath);
			var status = -1;
			req.onStatus = function(st) {
				status = st;
			};
			req.onData = function(data) {
				ft.trigger(tink_core_Outcome.Success(haxe_ds_Option.Some(data)));
			};
			req.onError = function(err) {
				if(status == 404) ft.trigger(tink_core_Outcome.Success(haxe_ds_Option.None)); else ft.trigger(tink_core_Outcome.Failure(tink_core_TypedError.withData(status,"Failed to load template " + fullPath,err,{ fileName : "HttpViewEngine.hx", lineNumber : 54, className : "ufront.view.HttpViewEngine", methodName : "getTemplateString"})));
			};
			req.request();
			return ft.future;
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Failed to load template " + fullPath,e,{ fileName : "HttpViewEngine.hx", lineNumber : 59, className : "ufront.view.HttpViewEngine", methodName : "getTemplateString"})));
		}
	}
	,__class__: ufront_view_HttpViewEngine
});
var ufront_view__$TemplateData_TemplateData_$Impl_$ = {};
$hxClasses["ufront.view._TemplateData.TemplateData_Impl_"] = ufront_view__$TemplateData_TemplateData_$Impl_$;
ufront_view__$TemplateData_TemplateData_$Impl_$.__name__ = ["ufront","view","_TemplateData","TemplateData_Impl_"];
ufront_view__$TemplateData_TemplateData_$Impl_$._new = function(obj) {
	return obj != null?obj:{ };
};
ufront_view__$TemplateData_TemplateData_$Impl_$.toObject = function(this1) {
	return this1;
};
ufront_view__$TemplateData_TemplateData_$Impl_$.toMap = function(this1) {
	var ret = new haxe_ds_StringMap();
	var _g = 0;
	var _g1 = Reflect.fields(this1);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		var v = Reflect.field(this1,k);
		ret.set(k,v);
		v;
	}
	return ret;
};
ufront_view__$TemplateData_TemplateData_$Impl_$.toStringMap = function(this1) {
	return ufront_view__$TemplateData_TemplateData_$Impl_$.toMap(this1);
};
ufront_view__$TemplateData_TemplateData_$Impl_$.get = function(this1,key) {
	return Reflect.field(this1,key);
};
ufront_view__$TemplateData_TemplateData_$Impl_$.exists = function(this1,key) {
	return Object.prototype.hasOwnProperty.call(this1,key);
};
ufront_view__$TemplateData_TemplateData_$Impl_$.set = function(this1,key,val) {
	this1[key] = val;
	return this1 != null?this1:{ };
};
ufront_view__$TemplateData_TemplateData_$Impl_$.array_set = function(this1,key,val) {
	this1[key] = val;
	return val;
};
ufront_view__$TemplateData_TemplateData_$Impl_$.setMap = function(this1,map) {
	var $it0 = map.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		ufront_view__$TemplateData_TemplateData_$Impl_$.set(this1,k,__map_reserved[k] != null?map.getReserved(k):map.h[k]);
	}
	return this1 != null?this1:{ };
};
ufront_view__$TemplateData_TemplateData_$Impl_$.setObject = function(this1,d) {
	{
		var _g = Type["typeof"](d);
		switch(_g[1]) {
		case 4:
			var _g1 = 0;
			var _g2 = Reflect.fields(d);
			while(_g1 < _g2.length) {
				var k = _g2[_g1];
				++_g1;
				ufront_view__$TemplateData_TemplateData_$Impl_$.set(this1,k,Reflect.field(d,k));
			}
			break;
		case 6:
			var cls = _g[2];
			var _g11 = 0;
			var _g21 = Type.getInstanceFields(cls);
			while(_g11 < _g21.length) {
				var k1 = _g21[_g11];
				++_g11;
				ufront_view__$TemplateData_TemplateData_$Impl_$.set(this1,k1,Reflect.getProperty(d,k1));
			}
			break;
		default:
		}
	}
	return this1 != null?this1:{ };
};
ufront_view__$TemplateData_TemplateData_$Impl_$.fromMap = function(d) {
	var m;
	var obj = { };
	m = obj != null?obj:{ };
	ufront_view__$TemplateData_TemplateData_$Impl_$.setMap(m,d);
	return m;
};
ufront_view__$TemplateData_TemplateData_$Impl_$.fromStringMap = function(d) {
	return ufront_view__$TemplateData_TemplateData_$Impl_$.fromMap(d);
};
ufront_view__$TemplateData_TemplateData_$Impl_$.fromMany = function(dataSets) {
	var combined;
	var obj = { };
	combined = obj != null?obj:{ };
	var $it0 = $iterator(dataSets)();
	while( $it0.hasNext() ) {
		var d = $it0.next();
		if(d != null) {
			if(js_Boot.__instanceof(d,haxe_ds_StringMap)) {
				var map = d;
				ufront_view__$TemplateData_TemplateData_$Impl_$.setMap(combined,map);
			} else {
				var obj1 = d;
				ufront_view__$TemplateData_TemplateData_$Impl_$.setObject(combined,obj1);
			}
		}
	}
	return combined;
};
ufront_view__$TemplateData_TemplateData_$Impl_$.fromObject = function(d) {
	return ufront_view__$TemplateData_TemplateData_$Impl_$.setObject((function($this) {
		var $r;
		var obj = { };
		$r = obj != null?obj:{ };
		return $r;
	}(this)),d);
};
var ufront_view__$TemplateHelper_TemplateHelper_$Impl_$ = {};
$hxClasses["ufront.view._TemplateHelper.TemplateHelper_Impl_"] = ufront_view__$TemplateHelper_TemplateHelper_$Impl_$;
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.__name__ = ["ufront","view","_TemplateHelper","TemplateHelper_Impl_"];
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$._new = function(numArgs,fn) {
	var this1;
	if(numArgs > 7) throw new js__$Boot_HaxeError("TemplateHelpers can have a maximum of 7 arguments");
	this1 = { numArgs : numArgs, fn : fn};
	return this1;
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.from0 = function(fn) {
	return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$._new(0,fn);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.from1 = function(fn) {
	return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$._new(1,fn);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.from2 = function(fn) {
	return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$._new(2,fn);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.from3 = function(fn) {
	return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$._new(3,fn);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.from4 = function(fn) {
	return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$._new(4,fn);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.from5 = function(fn) {
	return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$._new(5,fn);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.from6 = function(fn) {
	return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$._new(6,fn);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.from7 = function(fn) {
	return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$._new(7,fn);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn = function(this1) {
	var _g = this1.numArgs;
	switch(_g) {
	case 0:
		return (function(_e) {
			return function() {
				return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call0(_e);
			};
		})(this1);
	case 1:
		return (function(_e1) {
			return function(arg1) {
				return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call1(_e1,arg1);
			};
		})(this1);
	case 2:
		return (function(_e2) {
			return function(arg11,arg2) {
				return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call2(_e2,arg11,arg2);
			};
		})(this1);
	case 3:
		return (function(_e3) {
			return function(arg12,arg21,arg3) {
				return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call3(_e3,arg12,arg21,arg3);
			};
		})(this1);
	case 4:
		return (function(_e4) {
			return function(arg13,arg22,arg31,arg4) {
				return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call4(_e4,arg13,arg22,arg31,arg4);
			};
		})(this1);
	case 5:
		return (function(_e5) {
			return function(arg14,arg23,arg32,arg41,arg5) {
				return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call5(_e5,arg14,arg23,arg32,arg41,arg5);
			};
		})(this1);
	case 6:
		return (function(_e6) {
			return function(arg15,arg24,arg33,arg42,arg51,arg6) {
				return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call6(_e6,arg15,arg24,arg33,arg42,arg51,arg6);
			};
		})(this1);
	case 7:
		return (function(_e7) {
			return function(arg16,arg25,arg34,arg43,arg52,arg61,arg7) {
				return ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call7(_e7,arg16,arg25,arg34,arg43,arg52,arg61,arg7);
			};
		})(this1);
	default:
		throw new js__$Boot_HaxeError("TemplateHelpers can have a maximum of 7 arguments");
	}
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call0 = function(this1) {
	return this1.fn.apply({ },[]);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call1 = function(this1,arg1) {
	return this1.fn.apply({ },[arg1]);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call2 = function(this1,arg1,arg2) {
	return this1.fn.apply({ },[arg1,arg2]);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call3 = function(this1,arg1,arg2,arg3) {
	return this1.fn.apply({ },[arg1,arg2,arg3]);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call4 = function(this1,arg1,arg2,arg3,arg4) {
	return this1.fn.apply({ },[arg1,arg2,arg3,arg4]);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call5 = function(this1,arg1,arg2,arg3,arg4,arg5) {
	return this1.fn.apply({ },[arg1,arg2,arg3,arg4,arg5]);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call6 = function(this1,arg1,arg2,arg3,arg4,arg5,arg6) {
	return this1.fn.apply({ },[arg1,arg2,arg3,arg4,arg5,arg6]);
};
ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.call7 = function(this1,arg1,arg2,arg3,arg4,arg5,arg6,arg7) {
	return this1.fn.apply({ },[arg1,arg2,arg3,arg4,arg5,arg6,arg7]);
};
var ufront_view_TemplatingEngines = function() { };
$hxClasses["ufront.view.TemplatingEngines"] = ufront_view_TemplatingEngines;
ufront_view_TemplatingEngines.__name__ = ["ufront","view","TemplatingEngines"];
ufront_view_TemplatingEngines.__properties__ = {get_haxe:"get_haxe"}
ufront_view_TemplatingEngines.get_haxe = function() {
	return { factory : function(tplString) {
		var t = new haxe_Template(tplString);
		return function(data,helpers) {
			var macrosObject = { };
			if(helpers != null) {
				var $it0 = helpers.keys();
				while( $it0.hasNext() ) {
					var helperName = $it0.next();
					var paddedHelper = ufront_view_TemplatingEngines.padHelperFnForHaxeTplMacro(__map_reserved[helperName] != null?helpers.getReserved(helperName):helpers.h[helperName]);
					macrosObject[helperName] = paddedHelper;
				}
			}
			return t.execute(data,macrosObject);
		};
	}, type : "haxe.Template", extensions : ["html","tpl"]};
};
ufront_view_TemplatingEngines.padHelperFnForHaxeTplMacro = function(h) {
	var _g = h.numArgs;
	switch(_g) {
	case 0:
		return function(_) {
			return (ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn(h))();
		};
	case 1:
		return function(_1,a) {
			return (ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn(h))(a);
		};
	case 2:
		return function(_2,a1,b) {
			return (ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn(h))(a1,b);
		};
	case 3:
		return function(_3,a2,b1,c) {
			return (ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn(h))(a2,b1,c);
		};
	case 4:
		return function(_4,a3,b2,c1,d) {
			return (ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn(h))(a3,b2,c1,d);
		};
	case 5:
		return function(_5,a4,b3,c2,d1,e) {
			return (ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn(h))(a4,b3,c2,d1,e);
		};
	case 6:
		return function(_6,a5,b4,c3,d2,e1,f) {
			return (ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn(h))(a5,b4,c3,d2,e1,f);
		};
	case 7:
		return function(_7,a6,b5,c4,d3,e2,f1,g) {
			return (ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn(h))(a6,b5,c4,d3,e2,f1,g);
		};
	default:
		throw new js__$Boot_HaxeError("TemplateHelper supports a maximum of 7 arguments");
	}
};
var ufront_view__$UFTemplate_UFTemplate_$Impl_$ = {};
$hxClasses["ufront.view._UFTemplate.UFTemplate_Impl_"] = ufront_view__$UFTemplate_UFTemplate_$Impl_$;
ufront_view__$UFTemplate_UFTemplate_$Impl_$.__name__ = ["ufront","view","_UFTemplate","UFTemplate_Impl_"];
ufront_view__$UFTemplate_UFTemplate_$Impl_$._new = function(cb) {
	return cb;
};
ufront_view__$UFTemplate_UFTemplate_$Impl_$.fromSimpleCallback = function(cb) {
	return ufront_view__$UFTemplate_UFTemplate_$Impl_$._new(function(data,helpers) {
		var combinedData = { };
		if(helpers != null) {
			var $it0 = helpers.keys();
			while( $it0.hasNext() ) {
				var helperName = $it0.next();
				ufront_view__$TemplateData_TemplateData_$Impl_$.set(combinedData,helperName,ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.getFn(__map_reserved[helperName] != null?helpers.getReserved(helperName):helpers.h[helperName]));
			}
		}
		ufront_view__$TemplateData_TemplateData_$Impl_$.setObject(combinedData,data);
		return cb(combinedData);
	});
};
ufront_view__$UFTemplate_UFTemplate_$Impl_$.execute = function(this1,data,helpers) {
	return this1(data,helpers);
};
var ufront_web_ErrorPageHandler = function() {
	this.showStack = false;
	this.catchErrors = true;
};
$hxClasses["ufront.web.ErrorPageHandler"] = ufront_web_ErrorPageHandler;
ufront_web_ErrorPageHandler.__name__ = ["ufront","web","ErrorPageHandler"];
ufront_web_ErrorPageHandler.__interfaces__ = [ufront_app_UFErrorHandler];
ufront_web_ErrorPageHandler.errorStackItems = function(stack) {
	var arr = [];
	var arr1 = haxe_CallStack.toString(stack).split("\n");
	return arr1;
};
ufront_web_ErrorPageHandler.prototype = {
	catchErrors: null
	,showStack: null
	,handleError: function(httpError,ctx) {
		var inner;
		if(httpError != null && httpError.data != null) inner = " (" + Std.string(httpError.data) + ")"; else inner = "";
		var callStack;
		if(this.showStack) callStack = " " + haxe_CallStack.toString(haxe_CallStack.exceptionStack()); else callStack = "";
		ctx.messages.push({ msg : "Handling error: " + Std.string(httpError) + inner + callStack, pos : { fileName : "ErrorPageHandler.hx", lineNumber : 44, className : "ufront.web.ErrorPageHandler", methodName : "handleError"}, type : ufront_log_MessageType.MError});
		if(!((ctx.completion & 1 << ufront_web_context_RequestCompletion.CRequestHandlersComplete[1]) != 0)) {
			ctx.response.clear();
			ctx.response.status = httpError.code;
			ctx.response.set_contentType("text/html");
			ctx.response.write(this.renderError(httpError,this.showStack));
			ctx.completion |= 1 << ufront_web_context_RequestCompletion.CRequestHandlersComplete[1];
		}
		if(!this.catchErrors) httpError.throwSelf();
		return ufront_core_SurpriseTools.success();
	}
	,renderErrorContent: function(error,showStack) {
		if(showStack == null) showStack = false;
		var inner;
		if(null != error.data) inner = "<p class=\"error-data\">" + Std.string(error.data) + "</p>"; else inner = "";
		var pos;
		if(showStack) pos = "<p class=\"error-pos\">&gt; " + error.printPos() + "</p>"; else pos = "";
		var exceptionStackItems = ufront_web_ErrorPageHandler.errorStackItems(haxe_CallStack.exceptionStack());
		var exceptionStack;
		if(showStack && exceptionStackItems.length > 0) exceptionStack = "<div class=\"error-exception-stack\"><h3>Exception Stack:</h3>\n\t\t\t\t\t<pre><code>" + exceptionStackItems.join("\n") + "</pre></code>\n\t\t\t\t</div>"; else exceptionStack = "";
		var content = "\n\t\t\t<summary class=\"error-summary\"><h1 class=\"error-message\">" + error.message + "</h1></summary>\n\t\t\t<details class=\"error-details\"> " + inner + " " + pos + " " + exceptionStack + "</details>\n\t\t";
		return content;
	}
	,renderErrorPage: function(title,content) {
		return "<!DOCTYPE html>\n<html>\n<head>\n\t<title>" + title + "</title>\n\t<style>\n\t\tbody {\n\t\t\tfont-family: sans-serif;\n\t\t}\n\t\t.container {\n\t\t\tmax-width: 800px;\n\t\t\tmargin: 30px auto;\n\t\t}\n\t\t.jumbotron {\n\t\t\tpadding: 30px;\n\t\t\tborder-radius: 30px;\n\t\t\tbackground-color: rgb(230,230,230);\n\t\t}\n\t\tp[frown] {\n\t\t\ttext-align: center;\n\t\t}\n\t\tp[frown] span { \n\t\t\ttransform: rotate(90deg);\n\t\t\tdisplay: inline-block;\n\t\t\tcolor: #bbb;\n\t\t\tfont-size: 3em;\n\t\t}\n\t</style>\n</head>\n<body>\n\t<div class=\"container\">\n\t\t<div class=\"jumbotron\">\n\t\t\t<p frown><span>:(</span></p>\n\t\t\t" + content + "\n\t\t</div>\n\t</div>\n</body>\n</html>\n";
	}
	,renderError: function(error,showStack) {
		var content = this.renderErrorContent(error,showStack);
		return this.renderErrorPage(error.message,content);
	}
	,__class__: ufront_web_ErrorPageHandler
};
var ufront_web_HttpCookie = function(name,value,expires,domain,path,secure,httpOnly) {
	if(httpOnly == null) httpOnly = false;
	if(secure == null) secure = false;
	this.name = name;
	this.value = value;
	this.expires = expires;
	this.domain = domain;
	this.path = path;
	this.secure = secure;
	this.httpOnly = httpOnly;
};
$hxClasses["ufront.web.HttpCookie"] = ufront_web_HttpCookie;
ufront_web_HttpCookie.__name__ = ["ufront","web","HttpCookie"];
ufront_web_HttpCookie.addPair = function(buf,name,value,allowNullValue) {
	if(allowNullValue == null) allowNullValue = false;
	if(!allowNullValue && null == value) return;
	buf.b += "; ";
	if(name == null) buf.b += "null"; else buf.b += "" + name;
	if(null == value) return;
	buf.b += "=";
	if(value == null) buf.b += "null"; else buf.b += "" + value;
};
ufront_web_HttpCookie.prototype = {
	domain: null
	,expires: null
	,name: null
	,path: null
	,secure: null
	,httpOnly: null
	,value: null
	,expireNow: function() {
		var d = new Date();
		d.setTime(0);
		this.expires = d;
	}
	,toString: function() {
		return "" + this.name + ": " + this.get_description();
	}
	,get_description: function() {
		var buf = new StringBuf();
		buf.b += Std.string(this.value);
		if(this.expires != null) {
			if(ufront_web_HttpCookie.tzOffset == null) ufront_web_HttpCookie.tzOffset = HxOverrides.strDate("1970-01-01 00:00:00").getTime();
			var gmtExpires = DateTools.delta(this.expires,ufront_web_HttpCookie.tzOffset);
			var zeroPad = function(i) {
				var str = "" + i;
				while(str.length < 2) str = "0" + str;
				return str;
			};
			var day = ufront_web_HttpCookie.dayNames[gmtExpires.getDay()];
			var date = zeroPad(gmtExpires.getDate());
			var month = ufront_web_HttpCookie.monthNames[gmtExpires.getMonth()];
			var year = gmtExpires.getFullYear();
			var hour = zeroPad(gmtExpires.getHours());
			var minute = zeroPad(gmtExpires.getMinutes());
			var second = zeroPad(gmtExpires.getSeconds());
			var dateStr = "" + day + ", " + date + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + second + " GMT";
			ufront_web_HttpCookie.addPair(buf,"expires",dateStr);
		}
		ufront_web_HttpCookie.addPair(buf,"domain",this.domain);
		ufront_web_HttpCookie.addPair(buf,"path",this.path);
		if(this.secure) ufront_web_HttpCookie.addPair(buf,"secure",null,true);
		return buf.b;
	}
	,__class__: ufront_web_HttpCookie
	,__properties__: {get_description:"get_description"}
};
var ufront_web_HttpError = function() { };
$hxClasses["ufront.web.HttpError"] = ufront_web_HttpError;
ufront_web_HttpError.__name__ = ["ufront","web","HttpError"];
ufront_web_HttpError.wrap = function(e,msg,pos) {
	if(msg == null) msg = "Internal Server Error";
	if(js_Boot.__instanceof(e,tink_core_TypedError)) return e; else return tink_core_TypedError.withData(500,msg,e,pos);
};
ufront_web_HttpError.badRequest = function(reason,pos) {
	var message = "Bad Request";
	if(reason != null) message += ": " + reason;
	return new tink_core_TypedError(400,message,null,pos);
};
ufront_web_HttpError.internalServerError = function(msg,inner,pos) {
	if(msg == null) msg = "Internal Server Error";
	return tink_core_TypedError.withData(500,msg,inner,pos);
};
ufront_web_HttpError.methodNotAllowed = function(pos) {
	return new tink_core_TypedError(405,"Method Not Allowed",null,pos);
};
ufront_web_HttpError.pageNotFound = function(pos) {
	return new tink_core_TypedError(404,"Page Not Found",null,pos);
};
ufront_web_HttpError.unauthorized = function(message,pos) {
	if(message == null) message = "Unauthorized Access";
	return new tink_core_TypedError(401,message,null,pos);
};
ufront_web_HttpError.unprocessableEntity = function(pos) {
	return new tink_core_TypedError(422,"Unprocessable Entity",null,pos);
};
ufront_web_HttpError.authError = function(error,pos) {
	var msg;
	switch(error[1]) {
	case 0:
		msg = "Not Logged In";
		break;
	case 1:
		var msg1 = error[2];
		msg = "Login Failed: " + msg1;
		break;
	case 2:
		var u = error[2];
		msg = "Not Logged In As " + Std.string(u);
		break;
	case 3:
		var p = error[2];
		msg = "Permission " + Std.string(p) + " denied";
		break;
	}
	return tink_core_TypedError.typed(401,msg,error,pos);
};
ufront_web_HttpError.remotingError = function(error,pos) {
	switch(error[1]) {
	case 0:
		var responseData = error[4];
		var responseCode = error[3];
		var remotingCallString = error[2];
		return tink_core_TypedError.typed(responseCode,"HTTP " + responseCode + " Error during " + remotingCallString,error,pos);
	case 1:
		var errorMessage = error[3];
		var remotingCallString1 = error[2];
		return tink_core_TypedError.typed(404,"Remoting API " + remotingCallString1 + " not found: " + errorMessage,error,pos);
	case 2:
		var stack = error[4];
		var e = error[3];
		var remotingCallString2 = error[2];
		var errorObj = Std.instance(e,tink_core_TypedError);
		if(errorObj != null) return tink_core_TypedError.typed(errorObj.code,errorObj.message,error,pos); else return tink_core_TypedError.typed(500,"Internal Server Error while executing " + remotingCallString2,error,pos);
		break;
	case 3:
		var e1 = error[3];
		var remotingCallString3 = error[2];
		return tink_core_TypedError.typed(500,"Error during callback after " + remotingCallString3 + ": " + Std.string(e1),error,pos);
	case 4:
		var err = error[4];
		var troubleLine = error[3];
		var remotingCallString4 = error[2];
		return tink_core_TypedError.typed(422,"Remoting serialization failed for call " + remotingCallString4 + ": could not process " + troubleLine,error,pos);
	case 5:
		var responseData1 = error[3];
		var remotingCallString5 = error[2];
		return tink_core_TypedError.typed(500,"Error with response for " + remotingCallString5 + ": no remoting response found",error,pos);
	case 6:
		var data = error[3];
		var remotingCallString6 = error[2];
		if(js_Boot.__instanceof(data,tink_core_TypedError)) {
			var e2 = data;
			return tink_core_TypedError.typed(e2.code,e2.message,error,e2.pos);
		} else return tink_core_TypedError.typed(500,"Call to " + remotingCallString6 + " failed: " + Std.string(data),error,pos);
		break;
	case 7:
		var e3 = error[2];
		return tink_core_TypedError.typed(500,"Unknown exception during remoting call",error,pos);
	}
};
ufront_web_HttpError.notImplemented = function(pos) {
	var methodName = pos.className + "." + pos.methodName;
	return new tink_core_TypedError(500,"Internal Server Error: " + methodName + " is not implemented on this platform",null,pos);
};
ufront_web_HttpError.abstractMethod = function(pos) {
	var methodName = pos.className + "." + pos.methodName;
	return new tink_core_TypedError(500,"Internal Server Error: " + methodName + " is an abstract method and should be overridden by a subclass",null,pos);
};
ufront_web_HttpError.throwIfNull = function(val,name,pos) {
	if(name == null) name = "argument";
	if(val == null) throw new js__$Boot_HaxeError(new tink_core_TypedError(500,"" + name + " should not be null",null,pos));
};
ufront_web_HttpError.fakePosition = function(obj,method,args) {
	return { methodName : method, lineNumber : -1, fileName : "", customParams : args, className : Type.getClassName(Type.getClass(obj))};
};
var ufront_web_MVCHandler = function(indexController) {
	this.indexController = indexController;
};
$hxClasses["ufront.web.MVCHandler"] = ufront_web_MVCHandler;
ufront_web_MVCHandler.__name__ = ["ufront","web","MVCHandler"];
ufront_web_MVCHandler.__interfaces__ = [ufront_app_UFRequestHandler];
ufront_web_MVCHandler.prototype = {
	indexController: null
	,handleRequest: function(ctx) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.processRequest(ctx),function(r) {
			return _g.executeResult(ctx);
		});
	}
	,processRequest: function(context) {
		context.actionContext.handler = this;
		var controller = context.injector._instantiate(this.indexController);
		var resultFuture = tink_core__$Future_Future_$Impl_$._tryMap(controller.execute(),function(result) {
			context.actionContext.actionResult = result;
			return tink_core_Noise.Noise;
		});
		return resultFuture;
	}
	,executeResult: function(context) {
		try {
			return context.actionContext.actionResult.executeResult(context.actionContext);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			var p_methodName = "executeResult";
			var p_lineNumber = -1;
			var p_fileName = "";
			var p_customParams = ["actionContext"];
			var p_className = Type.getClassName(Type.getClass(context.actionContext));
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e,null,{ fileName : "MVCHandler.hx", lineNumber : 70, className : "ufront.web.MVCHandler", methodName : "executeResult"})));
		}
	}
	,toString: function() {
		return "ufront.web.MVCHandler";
	}
	,__class__: ufront_web_MVCHandler
};
var ufront_web_UserAgent = function(browser,version,majorVersion,minorVersion,platform) {
	this.browser = browser;
	this.version = version;
	this.majorVersion = majorVersion;
	this.minorVersion = minorVersion;
	this.platform = platform;
};
$hxClasses["ufront.web.UserAgent"] = ufront_web_UserAgent;
ufront_web_UserAgent.__name__ = ["ufront","web","UserAgent"];
ufront_web_UserAgent.fromString = function(s) {
	var ua = new ufront_web_UserAgent("unknown","",0,0,"unknown");
	var info = ufront_web_UserAgent.searchString(ufront_web_UserAgent.dataBrowser,s);
	if(info != null) {
		ua.browser = info.app;
		var version = ufront_web_UserAgent.extractVersion(info.versionString,s);
		if(null != version) {
			ua.version = version.version;
			ua.majorVersion = version.majorVersion;
			ua.minorVersion = version.minorVersion;
		}
	}
	var info1 = ufront_web_UserAgent.searchString(ufront_web_UserAgent.dataOS,s);
	if(info1 != null) ua.platform = info1.app;
	return ua;
};
ufront_web_UserAgent.extractVersion = function(searchString,s) {
	var index = s.indexOf(searchString);
	if(index < 0) return null;
	var re = new EReg("(\\d+)\\.(\\d+)[^ ();]*","");
	if(!re.match(HxOverrides.substr(s,index + searchString.length + 1,null))) return null;
	return { version : re.matched(0), majorVersion : Std.parseInt(re.matched(1)), minorVersion : Std.parseInt(re.matched(2))};
};
ufront_web_UserAgent.searchString = function(data,s) {
	var _g = 0;
	while(_g < data.length) {
		var d = data[_g];
		++_g;
		if(s.indexOf(d.subString) >= 0) return { app : d.identity, versionString : d.versionSearch == null?d.identity:d.versionSearch};
	}
	return null;
};
ufront_web_UserAgent.prototype = {
	browser: null
	,version: null
	,majorVersion: null
	,minorVersion: null
	,platform: null
	,toString: function() {
		return "" + this.browser + " v." + this.majorVersion + "." + this.minorVersion + " (" + this.version + ") on " + this.platform;
	}
	,__class__: ufront_web_UserAgent
};
var ufront_web_client_UFClientAction = function() { };
$hxClasses["ufront.web.client.UFClientAction"] = ufront_web_client_UFClientAction;
ufront_web_client_UFClientAction.__name__ = ["ufront","web","client","UFClientAction"];
var ufront_web_context_ActionContext = function(httpContext) {
	ufront_web_HttpError.throwIfNull(httpContext,"httpContext",{ fileName : "ActionContext.hx", lineNumber : 80, className : "ufront.web.context.ActionContext", methodName : "new"});
	this.httpContext = httpContext;
};
$hxClasses["ufront.web.context.ActionContext"] = ufront_web_context_ActionContext;
ufront_web_context_ActionContext.__name__ = ["ufront","web","context","ActionContext"];
ufront_web_context_ActionContext.prototype = {
	httpContext: null
	,handler: null
	,controller: null
	,action: null
	,args: null
	,actionResult: null
	,uriParts: null
	,get_uriParts: function() {
		if(this.uriParts == null) {
			this.uriParts = this.httpContext.getRequestUri().split("/");
			if(this.uriParts.length > 0 && this.uriParts[0] == "") this.uriParts.shift();
			if(this.uriParts.length > 0 && this.uriParts[this.uriParts.length - 1] == "") this.uriParts.pop();
		}
		return this.uriParts;
	}
	,toString: function() {
		return "ActionContext(" + Std.string(this.controller) + ", " + this.action + ", " + Std.string(this.args) + ")";
	}
	,__class__: ufront_web_context_ActionContext
	,__properties__: {get_uriParts:"get_uriParts"}
};
var ufront_web_context_HttpContext = function(request,response,appInjector,session,auth,urlFilters,relativeContentDir) {
	if(relativeContentDir == null) relativeContentDir = "uf-content";
	ufront_web_HttpError.throwIfNull(response,null,{ fileName : "HttpContext.hx", lineNumber : 214, className : "ufront.web.context.HttpContext", methodName : "new"});
	ufront_web_HttpError.throwIfNull(request,null,{ fileName : "HttpContext.hx", lineNumber : 215, className : "ufront.web.context.HttpContext", methodName : "new"});
	this.request = request;
	this.response = response;
	if(urlFilters != null) this.urlFilters = urlFilters; else this.urlFilters = [];
	this._relativeContentDir = relativeContentDir;
	this.actionContext = new ufront_web_context_ActionContext(this);
	this.messages = [];
	this.completion = 0;
	if(appInjector != null) this.injector = appInjector.createChildInjector(); else this.injector = new minject_Injector();
	this.injector.mapType("ufront.web.context.HttpContext",null,null).toValue(this);
	this.injector.mapType("ufront.web.context.HttpRequest",null,null).toValue(request);
	this.injector.mapType("ufront.web.context.HttpResponse",null,null).toValue(response);
	this.injector.mapType("ufront.web.context.ActionContext",null,null).toValue(this.actionContext);
	this.injector.mapType("ufront.log.MessageList",null,null).toValue(new ufront_log_MessageList(this.messages));
	this.injector.mapType("minject.Injector",null,null).toValue(this.injector);
	if(session != null) this.session = session;
	if(this.session == null) try {
		this.session = this.injector.getValueForType("ufront.web.session.UFHttpSession",null);
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		this.ufLog("Failed to load UFHttpSession: " + Std.string(e) + ". Using VoidSession instead." + haxe_CallStack.toString(haxe_CallStack.exceptionStack()),{ fileName : "HttpContext.hx", lineNumber : 236, className : "ufront.web.context.HttpContext", methodName : "new"});
	}
	if(this.session == null) this.session = new ufront_web_session_VoidSession();
	this.injector.mapType("ufront.web.session.UFHttpSession",null,null).toValue(this.session);
	this.injector.mapRuntimeTypeOf(this.session).toValue(this.session);
	if(auth != null) this.auth = auth;
	if(this.auth == null) try {
		this.auth = this.injector.getValueForType("ufront.auth.UFAuthHandler",null);
	} catch( e1 ) {
		haxe_CallStack.lastException = e1;
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		this.ufLog("Failed to load UFAuthHandler: " + Std.string(e1) + ". Using NobodyAuthHandler instead." + haxe_CallStack.toString(haxe_CallStack.exceptionStack()),{ fileName : "HttpContext.hx", lineNumber : 244, className : "ufront.web.context.HttpContext", methodName : "new"});
	}
	if(this.auth == null) this.auth = new ufront_auth_NobodyAuthHandler();
	this.injector.mapType("ufront.auth.UFAuthHandler",null,null).toValue(this.auth);
	this.injector.mapRuntimeTypeOf(this.auth).toValue(this.auth);
};
$hxClasses["ufront.web.context.HttpContext"] = ufront_web_context_HttpContext;
ufront_web_context_HttpContext.__name__ = ["ufront","web","context","HttpContext"];
ufront_web_context_HttpContext.createNodeJsContext = function(req,res,appInjector,session,auth,urlFilters,relativeContentDir) {
	if(relativeContentDir == null) relativeContentDir = "uf-content";
	var request = new nodejs_ufront_web_context_HttpRequest(req);
	var response = new nodejs_ufront_web_context_HttpResponse(res);
	return new ufront_web_context_HttpContext(request,response,appInjector,session,auth,urlFilters,relativeContentDir);
};
ufront_web_context_HttpContext.prototype = {
	injector: null
	,request: null
	,response: null
	,session: null
	,sessionID: null
	,auth: null
	,currentUser: null
	,currentUserID: null
	,actionContext: null
	,completion: null
	,urlFilters: null
	,messages: null
	,contentDirectory: null
	,_requestUri: null
	,_relativeContentDir: null
	,_contentDir: null
	,getRequestUri: function() {
		if(null == this._requestUri) {
			var url = ufront_web_url_PartialUrl.parse(this.request.get_uri());
			var _g = 0;
			var _g1 = this.urlFilters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.filterIn(url);
			}
			this._requestUri = url.toString();
		}
		return this._requestUri;
	}
	,generateUri: function(uri,isPhysical) {
		if(isPhysical == null) isPhysical = false;
		var uriOut = ufront_web_url_VirtualUrl.parse(uri,isPhysical);
		var i = this.urlFilters.length - 1;
		while(i >= 0) this.urlFilters[i--].filterOut(uriOut);
		return uriOut.toString();
	}
	,setUrlFilters: function(filters) {
		if(filters != null) this.urlFilters = filters; else this.urlFilters = [];
		this._requestUri = null;
	}
	,commitSession: function() {
		if(this.session != null) return this.session.commit(); else return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,ufTrace: function(msg,pos) {
		this.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MTrace});
	}
	,ufLog: function(msg,pos) {
		this.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MLog});
	}
	,ufWarn: function(msg,pos) {
		this.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MWarning});
	}
	,ufError: function(msg,pos) {
		this.messages.push({ msg : msg, pos : pos, type : ufront_log_MessageType.MError});
	}
	,toString: function() {
		return "HttpContext";
	}
	,get_sessionID: function() {
		if(null != this.session) return this.session.get_id(); else return null;
	}
	,get_currentUser: function() {
		if(null != this.auth) return this.auth.get_currentUser(); else return null;
	}
	,get_currentUserID: function() {
		if(this.auth != null && this.auth.get_currentUser() != null) return this.auth.get_currentUser().get_userID(); else return null;
	}
	,get_contentDirectory: function() {
		if(this._contentDir == null) {
			if(this.request.get_scriptDirectory() != null) this._contentDir = haxe_io_Path.addTrailingSlash(this.request.get_scriptDirectory()) + haxe_io_Path.addTrailingSlash(this._relativeContentDir); else this._contentDir = haxe_io_Path.addTrailingSlash(this._relativeContentDir);
		}
		return this._contentDir;
	}
	,__class__: ufront_web_context_HttpContext
	,__properties__: {get_contentDirectory:"get_contentDirectory",get_currentUserID:"get_currentUserID",get_currentUser:"get_currentUser",get_sessionID:"get_sessionID"}
};
var ufront_web_context_RequestCompletion = $hxClasses["ufront.web.context.RequestCompletion"] = { __ename__ : ["ufront","web","context","RequestCompletion"], __constructs__ : ["CRequestMiddlewareComplete","CRequestHandlersComplete","CResponseMiddlewareComplete","CLogHandlersComplete","CFlushComplete","CErrorHandlersTriggered","CErrorHandlersComplete"] };
ufront_web_context_RequestCompletion.CRequestMiddlewareComplete = ["CRequestMiddlewareComplete",0];
ufront_web_context_RequestCompletion.CRequestMiddlewareComplete.toString = $estr;
ufront_web_context_RequestCompletion.CRequestMiddlewareComplete.__enum__ = ufront_web_context_RequestCompletion;
ufront_web_context_RequestCompletion.CRequestHandlersComplete = ["CRequestHandlersComplete",1];
ufront_web_context_RequestCompletion.CRequestHandlersComplete.toString = $estr;
ufront_web_context_RequestCompletion.CRequestHandlersComplete.__enum__ = ufront_web_context_RequestCompletion;
ufront_web_context_RequestCompletion.CResponseMiddlewareComplete = ["CResponseMiddlewareComplete",2];
ufront_web_context_RequestCompletion.CResponseMiddlewareComplete.toString = $estr;
ufront_web_context_RequestCompletion.CResponseMiddlewareComplete.__enum__ = ufront_web_context_RequestCompletion;
ufront_web_context_RequestCompletion.CLogHandlersComplete = ["CLogHandlersComplete",3];
ufront_web_context_RequestCompletion.CLogHandlersComplete.toString = $estr;
ufront_web_context_RequestCompletion.CLogHandlersComplete.__enum__ = ufront_web_context_RequestCompletion;
ufront_web_context_RequestCompletion.CFlushComplete = ["CFlushComplete",4];
ufront_web_context_RequestCompletion.CFlushComplete.toString = $estr;
ufront_web_context_RequestCompletion.CFlushComplete.__enum__ = ufront_web_context_RequestCompletion;
ufront_web_context_RequestCompletion.CErrorHandlersTriggered = ["CErrorHandlersTriggered",5];
ufront_web_context_RequestCompletion.CErrorHandlersTriggered.toString = $estr;
ufront_web_context_RequestCompletion.CErrorHandlersTriggered.__enum__ = ufront_web_context_RequestCompletion;
ufront_web_context_RequestCompletion.CErrorHandlersComplete = ["CErrorHandlersComplete",6];
ufront_web_context_RequestCompletion.CErrorHandlersComplete.toString = $estr;
ufront_web_context_RequestCompletion.CErrorHandlersComplete.__enum__ = ufront_web_context_RequestCompletion;
var ufront_web_result_ActionResult = function() { };
$hxClasses["ufront.web.result.ActionResult"] = ufront_web_result_ActionResult;
ufront_web_result_ActionResult.__name__ = ["ufront","web","result","ActionResult"];
ufront_web_result_ActionResult.transformUri = function(actionContext,uri) {
	if(StringTools.startsWith(uri,"~/")) return actionContext.httpContext.generateUri(HxOverrides.substr(uri,2,null)); else return uri;
};
ufront_web_result_ActionResult.wrap = function(resultValue) {
	if(resultValue == null) return new ufront_web_result_EmptyResult(); else {
		var actionResultValue = Std.instance(resultValue,ufront_web_result_ActionResult);
		if(actionResultValue == null) actionResultValue = new ufront_web_result_ContentResult(Std.string(resultValue));
		return actionResultValue;
	}
};
ufront_web_result_ActionResult.prototype = {
	executeResult: function(actionContext) {
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_result_ActionResult
};
var ufront_web_result_WrappedResult = function() { };
$hxClasses["ufront.web.result.WrappedResult"] = ufront_web_result_WrappedResult;
ufront_web_result_WrappedResult.__name__ = ["ufront","web","result","WrappedResult"];
ufront_web_result_WrappedResult.prototype = {
	originalResult: null
	,__class__: ufront_web_result_WrappedResult
};
var ufront_web_result_CallJavascriptResult = function(originalResult) {
	this.originalResult = originalResult;
	this.scripts = [];
};
$hxClasses["ufront.web.result.CallJavascriptResult"] = ufront_web_result_CallJavascriptResult;
ufront_web_result_CallJavascriptResult.__name__ = ["ufront","web","result","CallJavascriptResult"];
ufront_web_result_CallJavascriptResult.__interfaces__ = [ufront_web_result_WrappedResult];
ufront_web_result_CallJavascriptResult.addInlineJsToResult = function(originalResult,js) {
	return new ufront_web_result_CallJavascriptResult(originalResult).addInlineJs(js);
};
ufront_web_result_CallJavascriptResult.addJsScriptToResult = function(originalResult,path) {
	return new ufront_web_result_CallJavascriptResult(originalResult).addJsScript(path);
};
ufront_web_result_CallJavascriptResult.executeScripts = function(response,scripts) {
	var newContent = ufront_web_result_CallJavascriptResult.insertScriptsBeforeBodyTag(response.getBuffer(),scripts);
	response.clearContent();
	response.write(newContent);
};
ufront_web_result_CallJavascriptResult.insertScriptsBeforeBodyTag = function(content,scripts) {
	var script = scripts.join("");
	var bodyCloseIndex = content.lastIndexOf("</body>");
	if(bodyCloseIndex == -1) content += script; else content = content.substring(0,bodyCloseIndex) + script + HxOverrides.substr(content,bodyCloseIndex,null);
	return content;
};
ufront_web_result_CallJavascriptResult.__super__ = ufront_web_result_ActionResult;
ufront_web_result_CallJavascriptResult.prototype = $extend(ufront_web_result_ActionResult.prototype,{
	originalResult: null
	,scripts: null
	,addInlineJs: function(js) {
		this.scripts.push("<script type=\"text/javascript\">" + js + "</script>");
		return this;
	}
	,addJsScript: function(path) {
		this.scripts.push("<script type=\"text/javascript\" src=\"" + path + "\"></script>");
		return this;
	}
	,executeResult: function(actionContext) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$._tryMap(this.originalResult.executeResult(actionContext),function(n) {
			var response = actionContext.httpContext.response;
			if(response.get_contentType() == "text/html" && _g.scripts.length > 0) ufront_web_result_CallJavascriptResult.executeScripts(response,_g.scripts);
			return tink_core_Noise.Noise;
		});
	}
	,__class__: ufront_web_result_CallJavascriptResult
});
var ufront_web_result_AddClientActionResult = function(originalResult,clientAction,data) {
	ufront_web_result_CallJavascriptResult.call(this,originalResult);
	this.action = clientAction;
	this.actionData = data;
};
$hxClasses["ufront.web.result.AddClientActionResult"] = ufront_web_result_AddClientActionResult;
ufront_web_result_AddClientActionResult.__name__ = ["ufront","web","result","AddClientActionResult"];
ufront_web_result_AddClientActionResult.__interfaces__ = [ufront_web_result_WrappedResult];
ufront_web_result_AddClientActionResult.addClientAction = function(originalResult,clientAction,data) {
	return new ufront_web_result_AddClientActionResult(originalResult,clientAction,data);
};
ufront_web_result_AddClientActionResult.__super__ = ufront_web_result_CallJavascriptResult;
ufront_web_result_AddClientActionResult.prototype = $extend(ufront_web_result_CallJavascriptResult.prototype,{
	action: null
	,actionData: null
	,executeResult: function(actionContext) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$._tryMap(this.originalResult.executeResult(actionContext),function(n) {
			var response = actionContext.httpContext.response;
			if(response.get_contentType() == "text/html") {
				var className = _g.action;
				var serializedData = haxe_Serializer.run(_g.actionData);
				var fnCall = "ufExecuteSerializedAction( \"" + className + "\", \"" + serializedData + "\" )";
				var script = "<script type=\"text/javascript\">" + fnCall + "</script>";
				var newContent = ufront_web_result_CallJavascriptResult.insertScriptsBeforeBodyTag(response.getBuffer(),[script]);
				response.clearContent();
				response.write(newContent);
			}
			return tink_core_Noise.Noise;
		});
	}
	,__class__: ufront_web_result_AddClientActionResult
});
var ufront_web_result_FileResult = function(contentType,fileDownloadName) {
	this.contentType = contentType;
	this.fileDownloadName = fileDownloadName;
	if(null == contentType) this.setContentTypeByFilename();
};
$hxClasses["ufront.web.result.FileResult"] = ufront_web_result_FileResult;
ufront_web_result_FileResult.__name__ = ["ufront","web","result","FileResult"];
ufront_web_result_FileResult.__super__ = ufront_web_result_ActionResult;
ufront_web_result_FileResult.prototype = $extend(ufront_web_result_ActionResult.prototype,{
	contentType: null
	,fileDownloadName: null
	,setContentTypeByFilename: function(filename) {
		if(filename == null) filename = this.fileDownloadName;
		if(null != filename) {
			var ext = haxe_io_Path.extension(filename);
			if(ufront_web_result_FileResult.extMap.exists(ext)) this.contentType = ufront_web_result_FileResult.extMap.get(ext);
		}
	}
	,executeResult: function(actionContext) {
		ufront_web_HttpError.throwIfNull(actionContext,"actionContext",{ fileName : "FileResult.hx", lineNumber : 79, className : "ufront.web.result.FileResult", methodName : "executeResult"});
		if(null != this.contentType) actionContext.httpContext.response.set_contentType(this.contentType);
		if(null != this.fileDownloadName) actionContext.httpContext.response.setHeader("content-disposition","attachment; filename=" + this.fileDownloadName);
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_result_FileResult
});
var ufront_web_result_BytesResult = function(bytes,contentType,fileDownloadName) {
	ufront_web_result_FileResult.call(this,contentType,fileDownloadName);
	this.bytes = bytes;
};
$hxClasses["ufront.web.result.BytesResult"] = ufront_web_result_BytesResult;
ufront_web_result_BytesResult.__name__ = ["ufront","web","result","BytesResult"];
ufront_web_result_BytesResult.__super__ = ufront_web_result_FileResult;
ufront_web_result_BytesResult.prototype = $extend(ufront_web_result_FileResult.prototype,{
	bytes: null
	,executeResult: function(actionContext) {
		ufront_web_result_FileResult.prototype.executeResult.call(this,actionContext);
		actionContext.httpContext.response.writeBytes(this.bytes,0,this.bytes.length);
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_result_BytesResult
});
var ufront_web_result_ContentResult = function(content,contentType) {
	if(content != null) this.content = content; else this.content = "";
	this.contentType = contentType;
};
$hxClasses["ufront.web.result.ContentResult"] = ufront_web_result_ContentResult;
ufront_web_result_ContentResult.__name__ = ["ufront","web","result","ContentResult"];
ufront_web_result_ContentResult.create = function(content) {
	return new ufront_web_result_ContentResult(content,null);
};
ufront_web_result_ContentResult.replaceVirtualLinks = function(actionContext,html) {
	var singleQuotes = new EReg("(')(~/[^'\\s]*)'","gi");
	var doubleQuotes = new EReg("(\")(~/[^\"\\s]*)\"","gi");
	var transformUri = function(r) {
		var quote = r.matched(1);
		var originalUri = r.matched(2);
		var transformedUri = ufront_web_result_ActionResult.transformUri(actionContext,originalUri);
		return quote + transformedUri + quote;
	};
	html = singleQuotes.map(html,transformUri);
	html = doubleQuotes.map(html,transformUri);
	return html;
};
ufront_web_result_ContentResult.__super__ = ufront_web_result_ActionResult;
ufront_web_result_ContentResult.prototype = $extend(ufront_web_result_ActionResult.prototype,{
	content: null
	,contentType: null
	,executeResult: function(actionContext) {
		if(null != this.contentType) actionContext.httpContext.response.set_contentType(this.contentType);
		if(actionContext.httpContext.response.get_contentType() == "text/html") this.content = ufront_web_result_ContentResult.replaceVirtualLinks(actionContext,this.content);
		actionContext.httpContext.response.write(this.content);
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_result_ContentResult
});
var ufront_web_result_DirectFilePathResult = function(filePath) {
	this.filePath = filePath;
};
$hxClasses["ufront.web.result.DirectFilePathResult"] = ufront_web_result_DirectFilePathResult;
ufront_web_result_DirectFilePathResult.__name__ = ["ufront","web","result","DirectFilePathResult"];
ufront_web_result_DirectFilePathResult.__super__ = ufront_web_result_ActionResult;
ufront_web_result_DirectFilePathResult.prototype = $extend(ufront_web_result_ActionResult.prototype,{
	filePath: null
	,executeResult: function(actionContext) {
		ufront_web_HttpError.throwIfNull(actionContext,null,{ fileName : "DirectFilePathResult.hx", lineNumber : 35, className : "ufront.web.result.DirectFilePathResult", methodName : "executeResult"});
		throw new js__$Boot_HaxeError(ufront_web_HttpError.notImplemented({ fileName : "DirectFilePathResult.hx", lineNumber : 52, className : "ufront.web.result.DirectFilePathResult", methodName : "executeResult"}));
	}
	,__class__: ufront_web_result_DirectFilePathResult
});
var ufront_web_result_EmptyResult = function(preventFlush) {
	if(preventFlush == null) preventFlush = false;
	this.preventFlush = preventFlush;
};
$hxClasses["ufront.web.result.EmptyResult"] = ufront_web_result_EmptyResult;
ufront_web_result_EmptyResult.__name__ = ["ufront","web","result","EmptyResult"];
ufront_web_result_EmptyResult.__super__ = ufront_web_result_ActionResult;
ufront_web_result_EmptyResult.prototype = $extend(ufront_web_result_ActionResult.prototype,{
	preventFlush: null
	,executeResult: function(actionContext) {
		if(this.preventFlush) actionContext.httpContext.response.preventFlush();
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_result_EmptyResult
});
var ufront_web_result_FilePathResult = function(fileName,contentType,fileDownloadName) {
	ufront_web_result_FileResult.call(this,contentType,fileDownloadName);
	this.fileName = fileName;
};
$hxClasses["ufront.web.result.FilePathResult"] = ufront_web_result_FilePathResult;
ufront_web_result_FilePathResult.__name__ = ["ufront","web","result","FilePathResult"];
ufront_web_result_FilePathResult.__super__ = ufront_web_result_FileResult;
ufront_web_result_FilePathResult.prototype = $extend(ufront_web_result_FileResult.prototype,{
	fileName: null
	,executeResult: function(actionContext) {
		ufront_web_result_FileResult.prototype.executeResult.call(this,actionContext);
		if(null != this.fileName) {
			if(!sys_FileSystem.exists(this.fileName)) throw new js__$Boot_HaxeError(ufront_web_HttpError.pageNotFound({ fileName : "FilePathResult.hx", lineNumber : 33, className : "ufront.web.result.FilePathResult", methodName : "executeResult"}));
			try {
				var bytes = sys_io_File.getBytes(this.fileName);
				console.log(bytes.toString());
				actionContext.httpContext.response.writeBytes(bytes,0,bytes.length);
				return ufront_core_SurpriseTools.success();
			} catch( e ) {
				haxe_CallStack.lastException = e;
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Failed to read file " + this.fileName + " in FilePathResult: " + Std.string(e),e,{ fileName : "FilePathResult.hx", lineNumber : 41, className : "ufront.web.result.FilePathResult", methodName : "executeResult"}));
			}
		}
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_result_FilePathResult
});
var ufront_web_result_HttpAuthResult = function(message,failureMessage) {
	this.message = message;
	if(failureMessage != null) this.failureMessage = failureMessage; else this.failureMessage = message;
};
$hxClasses["ufront.web.result.HttpAuthResult"] = ufront_web_result_HttpAuthResult;
ufront_web_result_HttpAuthResult.__name__ = ["ufront","web","result","HttpAuthResult"];
ufront_web_result_HttpAuthResult.requireAuth = function(context,username,password,message,failureMessage,successFn) {
	var auth = context.request.get_authorization();
	if(auth != null && auth.user == username && auth.pass == password) return successFn(); else {
		var result = new ufront_web_result_HttpAuthResult(message,failureMessage);
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(result));
	}
};
ufront_web_result_HttpAuthResult.__super__ = ufront_web_result_ActionResult;
ufront_web_result_HttpAuthResult.prototype = $extend(ufront_web_result_ActionResult.prototype,{
	message: null
	,failureMessage: null
	,executeResult: function(actionContext) {
		actionContext.httpContext.response.requireAuthentication(this.message);
		actionContext.httpContext.response.write(this.failureMessage);
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_result_HttpAuthResult
});
var ufront_web_result_JsonResult = function(content) {
	ufront_web_HttpError.throwIfNull(content,"content",{ fileName : "JsonResult.hx", lineNumber : 26, className : "ufront.web.result.JsonResult", methodName : "new"});
	this.content = content;
};
$hxClasses["ufront.web.result.JsonResult"] = ufront_web_result_JsonResult;
ufront_web_result_JsonResult.__name__ = ["ufront","web","result","JsonResult"];
ufront_web_result_JsonResult.create = function(data) {
	return new ufront_web_result_JsonResult(data);
};
ufront_web_result_JsonResult.__super__ = ufront_web_result_ActionResult;
ufront_web_result_JsonResult.prototype = $extend(ufront_web_result_ActionResult.prototype,{
	content: null
	,executeResult: function(actionContext) {
		ufront_web_HttpError.throwIfNull(actionContext,"actionContext",{ fileName : "JsonResult.hx", lineNumber : 31, className : "ufront.web.result.JsonResult", methodName : "executeResult"});
		var serialized = JSON.stringify(this.content);
		actionContext.httpContext.response.write(serialized);
		actionContext.httpContext.response.set_contentType("application/json");
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_result_JsonResult
});
var ufront_web_result_ViewResult = function(data,viewPath,templatingEngine) {
	if(data != null) this.data = data; else this.data = ufront_view__$TemplateData_TemplateData_$Impl_$.setObject((function($this) {
		var $r;
		var obj = { };
		$r = obj != null?obj:{ };
		return $r;
	}(this)),{ });
	this.helpers = new haxe_ds_StringMap();
	this.partials = new haxe_ds_StringMap();
	if(viewPath != null) this.templateSource = ufront_web_result_TemplateSource.TFromEngine(viewPath,templatingEngine); else this.templateSource = ufront_web_result_TemplateSource.TUnknown;
	this.layoutSource = ufront_web_result_TemplateSource.TUnknown;
	this.finalOutputTrigger = new tink_core_FutureTrigger();
	this.finalOutput = this.finalOutputTrigger.future;
};
$hxClasses["ufront.web.result.ViewResult"] = ufront_web_result_ViewResult;
ufront_web_result_ViewResult.__name__ = ["ufront","web","result","ViewResult"];
ufront_web_result_ViewResult.create = function(data) {
	return new ufront_web_result_ViewResult(ufront_view__$TemplateData_TemplateData_$Impl_$.setObject((function($this) {
		var $r;
		var obj = { };
		$r = obj != null?obj:{ };
		return $r;
	}(this)),data));
};
ufront_web_result_ViewResult.getCombinedMap = function(mapSets) {
	var combinedMaps = new haxe_ds_StringMap();
	var _g = 0;
	while(_g < mapSets.length) {
		var set = mapSets[_g];
		++_g;
		var $it0 = set.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var v;
			v = __map_reserved[key] != null?set.getReserved(key):set.h[key];
			if(__map_reserved[key] != null) combinedMaps.setReserved(key,v); else combinedMaps.h[key] = v;
			v;
		}
	}
	return combinedMaps;
};
ufront_web_result_ViewResult.getViewFolder = function(actionContext) {
	var controllerCls = Type.getClass(actionContext.controller);
	var viewFolderMeta = haxe_rtti_Meta.getType(controllerCls).viewFolder;
	var viewFolder;
	if(viewFolderMeta != null && viewFolderMeta.length > 0) {
		viewFolder = "" + Std.string(viewFolderMeta[0]);
		viewFolder = haxe_io_Path.removeTrailingSlashes(viewFolder);
	} else {
		var controllerName = Type.getClassName(Type.getClass(actionContext.controller)).split(".").pop();
		controllerName = controllerName.charAt(0).toLowerCase() + HxOverrides.substr(controllerName,1,null);
		if(StringTools.endsWith(controllerName,"Controller")) controllerName = HxOverrides.substr(controllerName,0,controllerName.length - 10);
		viewFolder = controllerName;
	}
	return viewFolder;
};
ufront_web_result_ViewResult.inferViewPathFromContext = function(actionContext) {
	var viewPath;
	var controllerCls = Type.getClass(actionContext.controller);
	var fieldsMeta = haxe_rtti_Meta.getFields(controllerCls);
	var actionFieldMeta = Reflect.field(fieldsMeta,actionContext.action);
	if(actionFieldMeta != null && actionFieldMeta.template != null && actionFieldMeta.template.length > 0) viewPath = "" + Std.string(actionFieldMeta.template[0]); else {
		var action = actionContext.action;
		var startsWithDo = StringTools.startsWith(action,"do");
		var thirdCharUpperCase = action.length > 2 && action.charAt(2) == action.charAt(2).toUpperCase();
		if(startsWithDo && thirdCharUpperCase) action = HxOverrides.substr(action,2,null);
		viewPath = action.charAt(0).toLowerCase() + HxOverrides.substr(action,1,null);
	}
	return ufront_web_result_TemplateSource.TFromEngine(viewPath,null);
};
ufront_web_result_ViewResult.inferLayoutFromContext = function(actionContext) {
	var layoutPath = null;
	var controllerCls = Type.getClass(actionContext.controller);
	var classMeta = haxe_rtti_Meta.getType(controllerCls);
	var fieldsMeta = haxe_rtti_Meta.getFields(controllerCls);
	var actionFieldMeta = Reflect.field(fieldsMeta,actionContext.action);
	if(actionFieldMeta != null && actionFieldMeta.layout != null && actionFieldMeta.layout.length > 0) layoutPath = "" + Std.string(actionFieldMeta.layout[0]); else if(classMeta.layout != null && classMeta.layout.length > 0) layoutPath = "" + Std.string(classMeta.layout[0]); else try {
		layoutPath = actionContext.httpContext.injector.getValueForType("String","defaultLayout");
		if(layoutPath != null && StringTools.startsWith(layoutPath,"/") == false) layoutPath = "/" + layoutPath;
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
	}
	if(layoutPath != null) return ufront_web_result_TemplateSource.TFromEngine(layoutPath,null); else return ufront_web_result_TemplateSource.TNone;
};
ufront_web_result_ViewResult.addViewFolderToPath = function(layoutSource,viewFolder) {
	switch(layoutSource[1]) {
	case 1:
		var engine = layoutSource[3];
		var path = layoutSource[2];
		if(StringTools.startsWith(path,"/")) path = HxOverrides.substr(path,1,null); else path = "" + viewFolder + "/" + path;
		return ufront_web_result_TemplateSource.TFromEngine(path,engine);
	default:
		return layoutSource;
	}
};
ufront_web_result_ViewResult.loadTemplateFromSource = function(source,engine) {
	switch(source[1]) {
	case 0:
		var templatingEngine = source[3];
		var str = source[2];
		try {
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(templatingEngine.factory(str)));
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			var engine1 = "Templating Engine: \"" + templatingEngine.type + "\"";
			var template = "String template: \"" + str + "\"";
			return tink_core__$Future_Future_$Impl_$.sync(ufront_web_result_ViewResult.error("Failed to parse template.","" + engine1 + "\n" + template,{ fileName : "ViewResult.hx", lineNumber : 630, className : "ufront.web.result.ViewResult", methodName : "loadTemplateFromSource"}));
		}
		break;
	case 1:
		var templatingEngine1 = source[3];
		var path = source[2];
		return engine.getTemplate(path,templatingEngine1);
	case 2:case 3:
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(null));
	}
};
ufront_web_result_ViewResult.loadPartialTemplates = function(partialSources,engine) {
	var allPartialSources = ufront_web_result_ViewResult.getCombinedMap(partialSources);
	var allPartialTemplates = new haxe_ds_StringMap();
	var partialErrors = new haxe_ds_StringMap();
	var allPartialFutures = [];
	var $it0 = allPartialSources.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		var name1 = [name];
		var source = [__map_reserved[name1[0]] != null?allPartialSources.getReserved(name1[0]):allPartialSources.h[name1[0]]];
		var surprise = ufront_web_result_ViewResult.loadTemplateFromSource(source[0],engine);
		surprise((function(source,name1) {
			return function(outcome) {
				switch(outcome[1]) {
				case 0:
					var tpl = outcome[2];
					if(tpl != null) {
						if(__map_reserved[name1[0]] != null) allPartialTemplates.setReserved(name1[0],tpl); else allPartialTemplates.h[name1[0]] = tpl;
						tpl;
					} else {
						var v = ufront_web_HttpError.internalServerError("Partial " + name1[0] + " must be either TFromString or TFromEngine, was " + Std.string(source[0]),null,{ fileName : "ViewResult.hx", lineNumber : 647, className : "ufront.web.result.ViewResult", methodName : "loadPartialTemplates"});
						if(__map_reserved[name1[0]] != null) partialErrors.setReserved(name1[0],v); else partialErrors.h[name1[0]] = v;
						v;
					}
					break;
				case 1:
					var err = outcome[2];
					{
						if(__map_reserved[name1[0]] != null) partialErrors.setReserved(name1[0],err); else partialErrors.h[name1[0]] = err;
						err;
					}
					break;
				}
			};
		})(source,name1));
		allPartialFutures.push(surprise);
	}
	return tink_core__$Future_Future_$Impl_$.map(tink_core__$Future_Future_$Impl_$.ofMany(allPartialFutures),function(_) {
		var numberOfErrors = Lambda.count(partialErrors);
		switch(numberOfErrors) {
		case 0:
			return tink_core_Outcome.Success(allPartialTemplates);
		case 1:
			var err1 = ((function($this) {
				var $r;
				var _g = [];
				var $it1 = new haxe_ds__$StringMap_StringMapIterator(partialErrors,partialErrors.arrayKeys());
				while( $it1.hasNext() ) {
					var e = $it1.next();
					_g.push(e);
				}
				$r = _g;
				return $r;
			}(this)))[0];
			return tink_core_Outcome.Failure(err1);
		default:
			var partialNames;
			var _g1 = [];
			var $it2 = partialErrors.keys();
			while( $it2.hasNext() ) {
				var name2 = $it2.next();
				_g1.push(name2);
			}
			partialNames = _g1;
			return ufront_web_result_ViewResult.error("Partials " + Std.string(partialNames) + " failed to load: " + partialErrors.toString(),partialErrors,{ fileName : "ViewResult.hx", lineNumber : 661, className : "ufront.web.result.ViewResult", methodName : "loadPartialTemplates"});
		}
	});
};
ufront_web_result_ViewResult.addHelpersForPartials = function(partialTemplates,contextData,contextHelpers) {
	var $it0 = partialTemplates.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		var name1 = [name];
		var partial = [__map_reserved[name1[0]] != null?partialTemplates.getReserved(name1[0]):partialTemplates.h[name1[0]]];
		var partialFn = (function(partial,name1) {
			return function(partialData) {
				var combinedPartialData = { };
				ufront_view__$TemplateData_TemplateData_$Impl_$.setObject(combinedPartialData,contextData);
				ufront_view__$TemplateData_TemplateData_$Impl_$.setObject(combinedPartialData,partialData);
				ufront_view__$TemplateData_TemplateData_$Impl_$.set(combinedPartialData,"__current__",partialData);
				return tink_core_OutcomeTools.sure(ufront_web_result_ViewResult.executeTemplate("Partial[" + name1[0] + "]",tink_core_Outcome.Success(partial[0]),combinedPartialData,contextHelpers));
			};
		})(partial,name1);
		var v = ufront_view__$TemplateHelper_TemplateHelper_$Impl_$.from1(partialFn);
		if(__map_reserved[name1[0]] != null) contextHelpers.setReserved(name1[0],v); else contextHelpers.h[name1[0]] = v;
		v;
	}
};
ufront_web_result_ViewResult.executeTemplate = function(section,tplOutcome,combinedData,combinedHelpers) {
	switch(tplOutcome[1]) {
	case 0:
		var tpl = tplOutcome[2];
		try {
			return tink_core_Outcome.Success(tpl(combinedData,combinedHelpers));
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return ufront_web_result_ViewResult.error("Unable to execute " + section + " template: " + Std.string(e),e,{ fileName : "ViewResult.hx", lineNumber : 693, className : "ufront.web.result.ViewResult", methodName : "executeTemplate"});
		}
		break;
	case 1:
		var err = tplOutcome[2];
		return ufront_web_result_ViewResult.error("Unable to load " + section + " template: " + Std.string(err),err,{ fileName : "ViewResult.hx", lineNumber : 696, className : "ufront.web.result.ViewResult", methodName : "executeTemplate"});
	}
};
ufront_web_result_ViewResult.error = function(reason,data,pos) {
	return tink_core_Outcome.Failure(ufront_web_HttpError.internalServerError(reason,data,pos));
};
ufront_web_result_ViewResult.__super__ = ufront_web_result_ActionResult;
ufront_web_result_ViewResult.prototype = $extend(ufront_web_result_ActionResult.prototype,{
	data: null
	,helpers: null
	,partials: null
	,viewFolder: null
	,templateSource: null
	,layoutSource: null
	,finalOutput: null
	,finalOutputTrigger: null
	,withLayout: function(layoutPath,templatingEngine) {
		this.layoutSource = ufront_web_result_TemplateSource.TFromEngine(layoutPath,templatingEngine);
		return this;
	}
	,withoutLayout: function() {
		this.layoutSource = ufront_web_result_TemplateSource.TNone;
		return this;
	}
	,usingTemplateString: function(template,layout,templatingEngine) {
		if(templatingEngine == null) templatingEngine = ufront_view_TemplatingEngines.get_haxe();
		if(template != null) this.templateSource = ufront_web_result_TemplateSource.TFromString(template,templatingEngine);
		if(layout != null) this.layoutSource = ufront_web_result_TemplateSource.TFromString(layout,templatingEngine);
		return this;
	}
	,setVar: function(key,val) {
		ufront_view__$TemplateData_TemplateData_$Impl_$.array_set(this.data,key,val);
		return this;
	}
	,setVars: function(map,obj) {
		if(map != null) ufront_view__$TemplateData_TemplateData_$Impl_$.setMap(this.data,map);
		if(obj != null) ufront_view__$TemplateData_TemplateData_$Impl_$.setObject(this.data,obj);
		return this;
	}
	,addHelper: function(name,helper) {
		{
			this.helpers.set(name,helper);
			helper;
		}
		return this;
	}
	,addHelpers: function(helpers) {
		var $it0 = helpers.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			this.addHelper(name,__map_reserved[name] != null?helpers.getReserved(name):helpers.h[name]);
		}
		return this;
	}
	,addPartial: function(name,partialPath,templatingEngine) {
		var v = ufront_web_result_TemplateSource.TFromEngine(partialPath,templatingEngine);
		this.partials.set(name,v);
		v;
		return this;
	}
	,addPartialString: function(name,partialTemplate,templatingEngine) {
		var v = ufront_web_result_TemplateSource.TFromString(partialTemplate,templatingEngine);
		this.partials.set(name,v);
		v;
		return this;
	}
	,addPartials: function(partials,templatingEngine) {
		var $it0 = partials.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			this.addPartial(name,__map_reserved[name] != null?partials.getReserved(name):partials.h[name],templatingEngine);
		}
		return this;
	}
	,addPartialStrings: function(partials,templatingEngine) {
		var $it0 = partials.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			this.addPartialString(name,__map_reserved[name] != null?partials.getReserved(name):partials.h[name],templatingEngine);
		}
		return this;
	}
	,executeResult: function(actionContext) {
		var _g = this;
		if((function($this) {
			var $r;
			var _g1 = $this.layoutSource;
			$r = (function($this) {
				var $r;
				switch(_g1[1]) {
				case 3:
					$r = true;
					break;
				default:
					$r = false;
				}
				return $r;
			}($this));
			return $r;
		}(this))) this.layoutSource = ufront_web_result_ViewResult.inferLayoutFromContext(actionContext);
		if((function($this) {
			var $r;
			var _g2 = $this.templateSource;
			$r = (function($this) {
				var $r;
				switch(_g2[1]) {
				case 3:
					$r = true;
					break;
				default:
					$r = false;
				}
				return $r;
			}($this));
			return $r;
		}(this))) this.templateSource = ufront_web_result_ViewResult.inferViewPathFromContext(actionContext);
		if(this.viewFolder == null) this.viewFolder = ufront_web_result_ViewResult.getViewFolder(actionContext);
		var viewEngine;
		try {
			viewEngine = actionContext.httpContext.injector.getValueForType("ufront.view.UFViewEngine",null);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return ufront_core_SurpriseTools.asSurpriseError(e,"Failed to find a UFViewEngine in ViewResult.executeResult(), please make sure that one is made available in your application's injector",{ fileName : "ViewResult.hx", lineNumber : 456, className : "ufront.web.result.ViewResult", methodName : "executeResult"});
		}
		var defaultData = { };
		var controller = Std.instance(actionContext.controller,ufront_web_Controller);
		if(controller != null) ufront_view__$TemplateData_TemplateData_$Impl_$.set(defaultData,"baseUri",controller.baseUri);
		return tink_core__$Future_Future_$Impl_$._tryMap(this.renderResult(viewEngine,defaultData),function(finalOut) {
			finalOut = ufront_web_result_ContentResult.replaceVirtualLinks(actionContext,finalOut);
			_g.writeResponse(finalOut,actionContext);
			_g.finalOutputTrigger.trigger(finalOut);
			return tink_core_Noise.Noise;
		});
	}
	,renderResult: function(viewEngine,defaultData) {
		var _g = this;
		if((function($this) {
			var $r;
			var _g1 = $this.layoutSource;
			$r = (function($this) {
				var $r;
				switch(_g1[1]) {
				case 3:
					$r = true;
					break;
				default:
					$r = false;
				}
				return $r;
			}($this));
			return $r;
		}(this))) return ufront_core_SurpriseTools.asSurpriseError(null,"No layout template source was set on the ViewResult",{ fileName : "ViewResult.hx", lineNumber : 491, className : "ufront.web.result.ViewResult", methodName : "renderResult"});
		if((function($this) {
			var $r;
			var _g2 = $this.templateSource;
			$r = (function($this) {
				var $r;
				switch(_g2[1]) {
				case 3:
					$r = true;
					break;
				default:
					$r = false;
				}
				return $r;
			}($this));
			return $r;
		}(this))) return ufront_core_SurpriseTools.asSurpriseError(null,"No view template source was set on the ViewResult",{ fileName : "ViewResult.hx", lineNumber : 493, className : "ufront.web.result.ViewResult", methodName : "renderResult"});
		if(defaultData == null) defaultData = ufront_view__$TemplateData_TemplateData_$Impl_$.setObject((function($this) {
			var $r;
			var obj = { };
			$r = obj != null?obj:{ };
			return $r;
		}(this)),{ });
		if(this.viewFolder != null) {
			this.templateSource = ufront_web_result_ViewResult.addViewFolderToPath(this.templateSource,this.viewFolder);
			this.layoutSource = ufront_web_result_ViewResult.addViewFolderToPath(this.layoutSource,this.viewFolder);
		}
		var templateReady = ufront_web_result_ViewResult.loadTemplateFromSource(this.templateSource,viewEngine);
		var layoutReady = ufront_web_result_ViewResult.loadTemplateFromSource(this.layoutSource,viewEngine);
		var partialsReady = ufront_web_result_ViewResult.loadPartialTemplates([ufront_web_result_ViewResult.globalPartials,this.partials],viewEngine);
		return ((function($this) {
			var $r;
			var combinedFuture = tink_core__$Future_Future_$Impl_$.ofMany([templateReady,layoutReady,partialsReady]);
			var handle = function(cb) {
				combinedFuture(function(values) {
					cb(values[0],values[1],values[2]);
				});
			};
			var map = function(cb1) {
				return tink_core__$Future_Future_$Impl_$.map(combinedFuture,function(values1) {
					return cb1(values1[0],values1[1],values1[2]);
				});
			};
			$r = { handle : handle, map : map};
			return $r;
		}(this))).map(function(viewTemplate,layoutTemplate,partialTemplates) {
			try {
				var combinedData = ufront_view__$TemplateData_TemplateData_$Impl_$.fromMany([defaultData,ufront_web_result_ViewResult.globalValues,_g.data]);
				var combinedHelpers = ufront_web_result_ViewResult.getCombinedMap([ufront_web_result_ViewResult.globalHelpers,_g.helpers]);
				ufront_web_result_ViewResult.addHelpersForPartials(tink_core_OutcomeTools.sure(partialTemplates),combinedData,combinedHelpers);
				var viewOut = tink_core_OutcomeTools.sure(ufront_web_result_ViewResult.executeTemplate("view",viewTemplate,combinedData,combinedHelpers));
				if((function($this) {
					var $r;
					switch(layoutTemplate[1]) {
					case 0:
						$r = layoutTemplate[2] == null?true:(function($this) {
							var $r;
							switch(layoutTemplate[2]) {
							default:
								$r = false;
							}
							return $r;
						}($this));
						break;
					default:
						$r = false;
					}
					return $r;
				}(this))) return tink_core_Outcome.Success(viewOut); else {
					var layoutOut = tink_core_OutcomeTools.sure(ufront_web_result_ViewResult.executeTemplate("layout",layoutTemplate,ufront_view__$TemplateData_TemplateData_$Impl_$.set(combinedData,"viewContent",viewOut),combinedHelpers));
					return tink_core_Outcome.Success(layoutOut);
				}
			} catch( e ) {
				haxe_CallStack.lastException = e;
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,tink_core_TypedError) ) {
					return tink_core_Outcome.Failure(e);
				} else throw(e);
			}
		});
	}
	,writeResponse: function(response,actionContext) {
		actionContext.httpContext.response.set_contentType("text/html");
		actionContext.httpContext.response.write(response);
	}
	,__class__: ufront_web_result_ViewResult
});
var ufront_web_result_PartialViewResult = function(data,viewPath,templatingEngine) {
	ufront_web_result_ViewResult.call(this,data,viewPath,templatingEngine);
};
$hxClasses["ufront.web.result.PartialViewResult"] = ufront_web_result_PartialViewResult;
ufront_web_result_PartialViewResult.__name__ = ["ufront","web","result","PartialViewResult"];
ufront_web_result_PartialViewResult.create = function(data) {
	return new ufront_web_result_PartialViewResult(ufront_view__$TemplateData_TemplateData_$Impl_$.setObject((function($this) {
		var $r;
		var obj = { };
		$r = obj != null?obj:{ };
		return $r;
	}(this)),data));
};
ufront_web_result_PartialViewResult.startLoadingAnimations = function() {
};
ufront_web_result_PartialViewResult.__super__ = ufront_web_result_ViewResult;
ufront_web_result_PartialViewResult.prototype = $extend(ufront_web_result_ViewResult.prototype,{
	__class__: ufront_web_result_PartialViewResult
});
var ufront_web_result_RedirectResult = function(url,permanentRedirect) {
	if(permanentRedirect == null) permanentRedirect = false;
	ufront_web_HttpError.throwIfNull(url,"url",{ fileName : "RedirectResult.hx", lineNumber : 38, className : "ufront.web.result.RedirectResult", methodName : "new"});
	this.url = url;
	this.permanentRedirect = permanentRedirect;
};
$hxClasses["ufront.web.result.RedirectResult"] = ufront_web_result_RedirectResult;
ufront_web_result_RedirectResult.__name__ = ["ufront","web","result","RedirectResult"];
ufront_web_result_RedirectResult.create = function(url) {
	return new ufront_web_result_RedirectResult(url,false);
};
ufront_web_result_RedirectResult.createPermanent = function(url) {
	return new ufront_web_result_RedirectResult(url,true);
};
ufront_web_result_RedirectResult.__super__ = ufront_web_result_ActionResult;
ufront_web_result_RedirectResult.prototype = $extend(ufront_web_result_ActionResult.prototype,{
	url: null
	,permanentRedirect: null
	,executeResult: function(actionContext) {
		ufront_web_HttpError.throwIfNull(actionContext,"actionContext",{ fileName : "RedirectResult.hx", lineNumber : 44, className : "ufront.web.result.RedirectResult", methodName : "executeResult"});
		actionContext.httpContext.response.clearContent();
		actionContext.httpContext.response.clearHeaders();
		var transformedUrl = ufront_web_result_ActionResult.transformUri(actionContext,this.url);
		if(this.permanentRedirect) actionContext.httpContext.response.permanentRedirect(transformedUrl); else actionContext.httpContext.response.redirect(transformedUrl);
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_result_RedirectResult
});
var ufront_web_result_ResultWrapRequired = $hxClasses["ufront.web.result.ResultWrapRequired"] = { __ename__ : ["ufront","web","result","ResultWrapRequired"], __constructs__ : ["WRFuture","WROutcome","WRResultOrError"] };
ufront_web_result_ResultWrapRequired.WRFuture = ["WRFuture",0];
ufront_web_result_ResultWrapRequired.WRFuture.toString = $estr;
ufront_web_result_ResultWrapRequired.WRFuture.__enum__ = ufront_web_result_ResultWrapRequired;
ufront_web_result_ResultWrapRequired.WROutcome = ["WROutcome",1];
ufront_web_result_ResultWrapRequired.WROutcome.toString = $estr;
ufront_web_result_ResultWrapRequired.WROutcome.__enum__ = ufront_web_result_ResultWrapRequired;
ufront_web_result_ResultWrapRequired.WRResultOrError = ["WRResultOrError",2];
ufront_web_result_ResultWrapRequired.WRResultOrError.toString = $estr;
ufront_web_result_ResultWrapRequired.WRResultOrError.__enum__ = ufront_web_result_ResultWrapRequired;
var ufront_web_result_TemplateSource = $hxClasses["ufront.web.result.TemplateSource"] = { __ename__ : ["ufront","web","result","TemplateSource"], __constructs__ : ["TFromString","TFromEngine","TNone","TUnknown"] };
ufront_web_result_TemplateSource.TFromString = function(str,templatingEngine) { var $x = ["TFromString",0,str,templatingEngine]; $x.__enum__ = ufront_web_result_TemplateSource; $x.toString = $estr; return $x; };
ufront_web_result_TemplateSource.TFromEngine = function(path,templatingEngine) { var $x = ["TFromEngine",1,path,templatingEngine]; $x.__enum__ = ufront_web_result_TemplateSource; $x.toString = $estr; return $x; };
ufront_web_result_TemplateSource.TNone = ["TNone",2];
ufront_web_result_TemplateSource.TNone.toString = $estr;
ufront_web_result_TemplateSource.TNone.__enum__ = ufront_web_result_TemplateSource;
ufront_web_result_TemplateSource.TUnknown = ["TUnknown",3];
ufront_web_result_TemplateSource.TUnknown.toString = $estr;
ufront_web_result_TemplateSource.TUnknown.__enum__ = ufront_web_result_TemplateSource;
var ufront_web_session_UFHttpSession = function() { };
$hxClasses["ufront.web.session.UFHttpSession"] = ufront_web_session_UFHttpSession;
ufront_web_session_UFHttpSession.__name__ = ["ufront","web","session","UFHttpSession"];
ufront_web_session_UFHttpSession.prototype = {
	get_id: null
	,id: null
	,init: null
	,clear: null
	,get: null
	,set: null
	,exists: null
	,remove: null
	,isActive: null
	,isReady: null
	,close: null
	,setExpiry: null
	,commit: null
	,triggerCommit: null
	,regenerateID: null
	,__class__: ufront_web_session_UFHttpSession
	,__properties__: {get_id:"get_id"}
};
var ufront_web_session_CacheSession = function() {
	this.started = false;
	this.commitFlag = false;
	this.closeFlag = false;
	this.regenerateFlag = false;
	this.expiryFlag = false;
	this.sessionData = null;
	this.sessionID = null;
	this.oldSessionID = null;
};
$hxClasses["ufront.web.session.CacheSession"] = ufront_web_session_CacheSession;
ufront_web_session_CacheSession.__name__ = ["ufront","web","session","CacheSession"];
ufront_web_session_CacheSession.__interfaces__ = [ufront_web_session_UFHttpSession];
ufront_web_session_CacheSession.isValidID = function(id) {
	return id != null && ufront_core_Uuid.isValid(id);
};
ufront_web_session_CacheSession.prototype = {
	started: null
	,commitFlag: null
	,closeFlag: null
	,regenerateFlag: null
	,expiryFlag: null
	,sessionID: null
	,oldSessionID: null
	,sessionData: null
	,cache: null
	,context: null
	,sessionName: null
	,expiry: null
	,savePath: null
	,injectConfig: function(context,cacheConnection) {
		this.context = context;
		if(context.injector.hasMappingForType("String","sessionName")) this.sessionName = context.injector.getValueForType("String","sessionName"); else this.sessionName = ufront_web_session_CacheSession.defaultSessionName;
		if(context.injector.hasMappingForType("Int","sessionExpiry")) this.expiry = context.injector.getValueForType("Int","sessionExpiry"); else this.expiry = ufront_web_session_CacheSession.defaultExpiry;
		if(context.injector.hasMappingForType("String","sessionSavePath")) this.savePath = context.injector.getValueForType("String","sessionSavePath"); else this.savePath = ufront_web_session_CacheSession.defaultSavePath;
		if(cacheConnection == null) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("No UFCacheConnection was injected into CacheSession",null,{ fileName : "CacheSession.hx", lineNumber : 166, className : "ufront.web.session.CacheSession", methodName : "injectConfig"})); else this.cache = cacheConnection.getNamespace(this.savePath);
	}
	,setExpiry: function(e) {
		this.expiry = e;
	}
	,init: function() {
		var _g = this;
		var startFreshSession = function() {
			_g.regenerateID();
			_g.sessionData = new haxe_ds_StringMap();
			_g.started = true;
			return tink_core_Outcome.Success(tink_core_Noise.Noise);
		};
		if(!this.started) {
			this.get_id();
			if(this.sessionID == null || !ufront_web_session_CacheSession.isValidID(this.sessionID)) return ufront_core_SurpriseTools.asSurprise(startFreshSession()); else return tink_core__$Future_Future_$Impl_$.map(this.cache.get(this.sessionID),function(outcome) {
				switch(outcome[1]) {
				case 0:
					var data = outcome[2];
					_g.sessionData = Std.instance(data,haxe_ds_StringMap);
					if(_g.sessionData != null) {
						_g.started = true;
						return tink_core_Outcome.Success(tink_core_Noise.Noise);
					} else {
						_g.context.ufWarn("Failed to unserialize session " + _g.sessionID + " (Was " + Std.string(Type["typeof"](data)) + ", expected StringMap), starting a fresh session instead.",{ fileName : "CacheSession.hx", lineNumber : 214, className : "ufront.web.session.CacheSession", methodName : "init"});
						return startFreshSession();
					}
					break;
				case 1:
					var error = outcome[2];
					switch(outcome[2][1]) {
					case 0:
						_g.context.messages.push({ msg : "Client requested session " + _g.sessionID + ", but it did not exist in the cache. Starting a fresh session instead.", pos : { fileName : "CacheSession.hx", lineNumber : 218, className : "ufront.web.session.CacheSession", methodName : "init"}, type : ufront_log_MessageType.MWarning});
						return startFreshSession();
					case 2:
						var msg = outcome[2][2];
						_g.context.messages.push({ msg : "Failed to read cache for session " + _g.sessionID + ": " + msg + ". Starting a fresh session instead.", pos : { fileName : "CacheSession.hx", lineNumber : 221, className : "ufront.web.session.CacheSession", methodName : "init"}, type : ufront_log_MessageType.MWarning});
						return startFreshSession();
					default:
						return tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Failed to initialize session",error,{ fileName : "CacheSession.hx", lineNumber : 224, className : "ufront.web.session.CacheSession", methodName : "init"}));
					}
					break;
				}
			});
		} else return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,commit: function() {
		var _g = this;
		var oldSessionID = this.sessionID;
		var sessionIDSurprise;
		if(this.sessionID == null || this.regenerateFlag) sessionIDSurprise = this.findNewSessionID(); else sessionIDSurprise = tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(this.sessionID));
		return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(tink_core__$Future_Future_$Impl_$._tryMap(tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(tink_core__$Future_Future_$Impl_$._tryMap(sessionIDSurprise,function(id) {
			_g.sessionID = id;
			return tink_core_Noise.Noise;
		}),function(_) {
			if(_g.regenerateFlag) {
				_g.commitFlag = true;
				if(oldSessionID != null) return ufront_core_SurpriseTools.changeFailureToError(_g.cache.remove(oldSessionID),null,{ fileName : "CacheSession.hx", lineNumber : 255, className : "ufront.web.session.CacheSession", methodName : "commit"}); else return ufront_core_SurpriseTools.success();
			}
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
		}),function(_1) {
			if(_g.commitFlag && _g.sessionData != null) return ufront_core_SurpriseTools.changeFailureToError(ufront_core_SurpriseTools.changeSuccessToNoise(_g.cache.set(_g.sessionID,(function($this) {
				var $r;
				var f = tink_core__$Future_Future_$Impl_$.sync(_g.sessionData);
				$r = f;
				return $r;
			}(this)))),null,{ fileName : "CacheSession.hx", lineNumber : 262, className : "ufront.web.session.CacheSession", methodName : "commit"});
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
		}),function(_2) {
			if(_g.expiryFlag && !_g.closeFlag) _g.setCookie(_g.sessionID,_g.expiry);
			return tink_core_Noise.Noise;
		}),function(_3) {
			if(_g.closeFlag) {
				_g.setCookie("",-1);
				return ufront_core_SurpriseTools.changeFailureToError(_g.cache.remove(_g.sessionID),null,{ fileName : "CacheSession.hx", lineNumber : 275, className : "ufront.web.session.CacheSession", methodName : "commit"});
			}
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
		});
	}
	,findNewSessionID: function() {
		var _g = this;
		var tryID = ufront_core_Uuid.create();
		return tink_core__$Future_Future_$Impl_$.flatMap(this.cache.get(tryID),function(outcome) {
			switch(outcome[1]) {
			case 0:
				var outcome1 = outcome[2];
				return _g.findNewSessionID();
			case 1:
				var e = outcome[2];
				switch(outcome[2][1]) {
				case 0:
					_g.setCookie(tryID,_g.expiry);
					return tink_core__$Future_Future_$Impl_$.map(_g.cache.set(tryID,(function($this) {
						var $r;
						var v = new haxe_ds_StringMap();
						var f = tink_core__$Future_Future_$Impl_$.sync(v);
						$r = f;
						return $r;
					}(this))),function(outcome2) {
						switch(outcome2[1]) {
						case 0:
							return tink_core_Outcome.Success(tryID);
						case 1:
							var err = outcome2[2];
							return tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Failed to reserve session ID " + tryID,err,{ fileName : "CacheSession.hx", lineNumber : 294, className : "ufront.web.session.CacheSession", methodName : "findNewSessionID"}));
						}
					});
				default:
					return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Failed to find new session ID, cache error",e,{ fileName : "CacheSession.hx", lineNumber : 297, className : "ufront.web.session.CacheSession", methodName : "findNewSessionID"})));
				}
				break;
			}
		});
	}
	,setCookie: function(id,expiryLength) {
		var expireAt;
		if(expiryLength <= 0) expireAt = null; else expireAt = DateTools.delta(new Date(),1000.0 * expiryLength);
		var path = "/";
		var domain = null;
		var secure = false;
		var sessionCookie = new ufront_web_HttpCookie(this.sessionName,id,expireAt,domain,path,secure);
		if(expiryLength < 0) sessionCookie.expireNow();
		this.context.response.setCookie(sessionCookie);
	}
	,get: function(name) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before calling init()",{ fileName : "CacheSession.hx", lineNumber : 320, className : "ufront.web.session.CacheSession", methodName : "get"},{ fileName : "CacheSession.hx", lineNumber : 428, className : "ufront.web.session.CacheSession", methodName : "checkStarted"}));
		if(this.sessionData != null) return this.sessionData.get(name); else return null;
	}
	,set: function(name,value) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before calling init()",{ fileName : "CacheSession.hx", lineNumber : 332, className : "ufront.web.session.CacheSession", methodName : "set"},{ fileName : "CacheSession.hx", lineNumber : 428, className : "ufront.web.session.CacheSession", methodName : "checkStarted"}));
		if(this.sessionData != null) {
			this.sessionData.set(name,value);
			this.commitFlag = true;
		}
	}
	,exists: function(name) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before calling init()",{ fileName : "CacheSession.hx", lineNumber : 345, className : "ufront.web.session.CacheSession", methodName : "exists"},{ fileName : "CacheSession.hx", lineNumber : 428, className : "ufront.web.session.CacheSession", methodName : "checkStarted"}));
		return this.sessionData != null && this.sessionData.exists(name);
	}
	,remove: function(name) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before calling init()",{ fileName : "CacheSession.hx", lineNumber : 355, className : "ufront.web.session.CacheSession", methodName : "remove"},{ fileName : "CacheSession.hx", lineNumber : 428, className : "ufront.web.session.CacheSession", methodName : "checkStarted"}));
		if(this.sessionData != null) {
			this.sessionData.remove(name);
			this.commitFlag = true;
		}
	}
	,clear: function() {
		if(this.sessionData != null && (this.started || this.get_id() != null)) {
			this.sessionData = new haxe_ds_StringMap();
			this.commitFlag = true;
		}
	}
	,triggerCommit: function() {
		this.commitFlag = true;
	}
	,regenerateID: function() {
		this.regenerateFlag = true;
	}
	,isActive: function() {
		return this.started || this.get_id() != null;
	}
	,isReady: function() {
		return this.started;
	}
	,get_id: function() {
		if(this.sessionID == null) this.sessionID = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(this.context.request.get_cookies(),this.sessionName);
		if(this.sessionID == null) this.sessionID = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(this.context.request.get_params(),this.sessionName);
		return this.sessionID;
	}
	,close: function() {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before calling init()",{ fileName : "CacheSession.hx", lineNumber : 411, className : "ufront.web.session.CacheSession", methodName : "close"},{ fileName : "CacheSession.hx", lineNumber : 428, className : "ufront.web.session.CacheSession", methodName : "checkStarted"}));
		this.sessionData = null;
		this.closeFlag = true;
	}
	,toString: function() {
		if(this.sessionData != null) return this.sessionData.toString(); else return "{}";
	}
	,generateSessionID: function() {
		return ufront_core_Uuid.create();
	}
	,checkStarted: function(pos) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before calling init()",pos,{ fileName : "CacheSession.hx", lineNumber : 428, className : "ufront.web.session.CacheSession", methodName : "checkStarted"}));
	}
	,__class__: ufront_web_session_CacheSession
	,__properties__: {get_id:"get_id"}
};
var ufront_web_session_FileSession = function() {
	this.started = false;
	this.commitFlag = false;
	this.closeFlag = false;
	this.regenerateFlag = false;
	this.expiryFlag = false;
	this.sessionData = null;
	this.sessionID = null;
};
$hxClasses["ufront.web.session.FileSession"] = ufront_web_session_FileSession;
ufront_web_session_FileSession.__name__ = ["ufront","web","session","FileSession"];
ufront_web_session_FileSession.__interfaces__ = [ufront_web_session_UFHttpSession];
ufront_web_session_FileSession.testValidId = function(id) {
	return id != null && ufront_core_Uuid.isValid(id);
};
ufront_web_session_FileSession.notImplemented = function(p) {
	return ufront_core_SurpriseTools.asSurpriseError("FileSession is not implemented on this platform",null,p);
};
ufront_web_session_FileSession.prototype = {
	started: null
	,commitFlag: null
	,closeFlag: null
	,regenerateFlag: null
	,expiryFlag: null
	,sessionID: null
	,sessionData: null
	,context: null
	,injectConfig: function(context) {
		if(context.injector.hasMappingForType("String","sessionName")) this.sessionName = context.injector.getValueForType("String","sessionName"); else this.sessionName = ufront_web_session_FileSession.defaultSessionName;
		if(context.injector.hasMappingForType("Int","sessionExpiry")) this.expiry = context.injector.getValueForType("Int","sessionExpiry"); else this.expiry = ufront_web_session_FileSession.defaultExpiry;
		if(context.injector.hasMappingForType("String","sessionSavePath")) this.savePath = context.injector.getValueForType("String","sessionSavePath"); else this.savePath = ufront_web_session_FileSession.defaultSavePath;
		this.savePath = haxe_io_Path.addTrailingSlash(this.savePath);
		if(!StringTools.startsWith(this.savePath,"/")) this.savePath = context.get_contentDirectory() + this.savePath;
	}
	,sessionName: null
	,expiry: null
	,savePath: null
	,setExpiry: function(e) {
		this.expiry = e;
	}
	,init: function() {
		var _g = this;
		if(!this.started) {
			this.get_id();
			this.sessionData = new haxe_ds_StringMap();
			return tink_core__$Future_Future_$Impl_$._tryMap(tink_core__$Future_Future_$Impl_$._tryMap(tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.doCreateSessionDirectory(),$bind(this,this.doReadSessionFile)),$bind(this,this.doUnserializeSessionData)),function(n) {
				_g.started = true;
				return tink_core_Noise.Noise;
			});
		} else return ufront_core_SurpriseTools.success();
	}
	,doCreateSessionDirectory: function() {
		var dir = haxe_io_Path.removeTrailingSlashes(this.savePath);
		var t = new tink_core_FutureTrigger();
		js_node_Fs.mkdir(haxe_io_Path.removeTrailingSlashes(this.savePath),function(err) {
			if(err == null || err.code == "EEXIST") t.trigger(tink_core_Outcome.Success(tink_core_Noise.Noise)); else t.trigger(tink_core_Outcome.Failure(ufront_web_HttpError.internalServerError("Failed to create directory " + dir,err,{ fileName : "FileSession.hx", lineNumber : 215, className : "ufront.web.session.FileSession", methodName : "doCreateSessionDirectory"})));
		});
		return t.future;
	}
	,doReadSessionFile: function(_) {
		if(ufront_web_session_FileSession.testValidId(this.sessionID)) {
			var filename = "" + this.savePath + this.sessionID + ".sess";
			return tink_core__$Future_Future_$Impl_$.map(ufront_core_CallbackTools.asSurprise((function(f,a1,a2) {
				return function(a3) {
					f(a1,a2,a3);
				};
			})(js_node_Fs.readFile,filename,{ encoding : "utf-8"}),{ fileName : "FileSession.hx", lineNumber : 232, className : "ufront.web.session.FileSession", methodName : "doReadSessionFile"}),function(o) {
				switch(o[1]) {
				case 1:
					return tink_core_Outcome.Success(null);
				default:
					return o;
				}
			});
		} else {
			this.context.messages.push({ msg : "Session ID " + this.sessionID + " was invalid, resetting session.", pos : { fileName : "FileSession.hx", lineNumber : 243, className : "ufront.web.session.FileSession", methodName : "doReadSessionFile"}, type : ufront_log_MessageType.MWarning});
			this.sessionID = null;
			return ufront_core_SurpriseTools.asGoodSurprise(null);
		}
	}
	,doUnserializeSessionData: function(content) {
		if(content != null) try {
			this.sessionData = js_Boot.__cast(haxe_Unserializer.run(content) , haxe_ds_StringMap);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.context.messages.push({ msg : "Failed to unserialize session data: " + Std.string(e), pos : { fileName : "FileSession.hx", lineNumber : 256, className : "ufront.web.session.FileSession", methodName : "doUnserializeSessionData"}, type : ufront_log_MessageType.MWarning});
		}
		return tink_core_Noise.Noise;
	}
	,setCookie: function(id,expiryLength) {
		var expireAt;
		if(expiryLength <= 0) expireAt = null; else expireAt = DateTools.delta(new Date(),1000.0 * expiryLength);
		var path = "/";
		var domain = null;
		var secure = false;
		var sessionCookie = new ufront_web_HttpCookie(this.sessionName,id,expireAt,domain,path,secure);
		if(expiryLength < 0) sessionCookie.expireNow();
		this.context.response.setCookie(sessionCookie);
	}
	,commit: function() {
		if(this.sessionID == null && this.sessionData != null) this.regenerateID();
		return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.doRegenerateID(),$bind(this,this.doSaveSessionContent)),$bind(this,this.doSetExpiry)),$bind(this,this.doCloseSession));
	}
	,doRegenerateID: function() {
		var _g = this;
		if(this.regenerateFlag) {
			var oldSessionID = this.sessionID;
			var tryNewID;
			var tryNewID1 = null;
			tryNewID1 = function(cb) {
				_g.sessionID = ufront_core_Uuid.create();
				var file = "" + _g.savePath + _g.sessionID + ".sess";
				js_node_Fs.access(file,function(err) {
					if(err != null) {
						if(oldSessionID != null) js_node_Fs.rename("" + _g.savePath + oldSessionID + ".sess",file,cb); else js_node_Fs.writeFile(file,"",cb);
					} else tryNewID1(cb);
				});
			};
			tryNewID = tryNewID1;
			return ufront_core_CallbackTools.asVoidSurprise(tryNewID,{ fileName : "FileSession.hx", lineNumber : 325, className : "ufront.web.session.FileSession", methodName : "doRegenerateID"});
		} else return ufront_core_SurpriseTools.success();
	}
	,doSaveSessionContent: function(_) {
		if(this.commitFlag && this.sessionData != null) {
			var filePath = "" + this.savePath + this.sessionID + ".sess";
			var content;
			try {
				content = haxe_Serializer.run(this.sessionData);
			} catch( e ) {
				haxe_CallStack.lastException = e;
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				return e.asSurpriseError("Failed to serialize session content");
			}
			return ufront_core_CallbackTools.asVoidSurprise((function(f,a1,a2,a3) {
				return function(a4) {
					f(a1,a2,a3,a4);
				};
			})(js_node_Fs.writeFile,filePath,content,{ }),{ fileName : "FileSession.hx", lineNumber : 349, className : "ufront.web.session.FileSession", methodName : "doSaveSessionContent"});
		} else return ufront_core_SurpriseTools.success();
	}
	,doSetExpiry: function(_) {
		if(this.expiryFlag) this.setCookie(this.sessionID,this.expiry);
		return ufront_core_SurpriseTools.success();
	}
	,doCloseSession: function(_) {
		if(this.closeFlag) {
			this.setCookie("",-1);
			var filename = "" + this.savePath + this.sessionID + ".sess";
			return ufront_core_CallbackTools.asVoidSurprise((function(f,a1) {
				return function(a2) {
					f(a1,a2);
				};
			})(js_node_Fs.unlink,filename),{ fileName : "FileSession.hx", lineNumber : 374, className : "ufront.web.session.FileSession", methodName : "doCloseSession"});
		} else return ufront_core_SurpriseTools.success();
	}
	,get: function(name) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before init() has been run",null,{ fileName : "FileSession.hx", lineNumber : 502, className : "ufront.web.session.FileSession", methodName : "checkStarted"}));
		if(this.sessionData != null) return this.sessionData.get(name); else return null;
	}
	,set: function(name,value) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before init() has been run",null,{ fileName : "FileSession.hx", lineNumber : 502, className : "ufront.web.session.FileSession", methodName : "checkStarted"}));
		if(this.sessionData != null) {
			this.sessionData.set(name,value);
			this.commitFlag = true;
		}
	}
	,exists: function(name) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before init() has been run",null,{ fileName : "FileSession.hx", lineNumber : 502, className : "ufront.web.session.FileSession", methodName : "checkStarted"}));
		return this.sessionData != null && this.sessionData.exists(name);
	}
	,remove: function(name) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before init() has been run",null,{ fileName : "FileSession.hx", lineNumber : 502, className : "ufront.web.session.FileSession", methodName : "checkStarted"}));
		if(this.sessionData != null) {
			this.sessionData.remove(name);
			this.commitFlag = true;
		}
	}
	,clear: function() {
		if(this.sessionData != null && (this.started || this.get_id() != null)) {
			this.sessionData = new haxe_ds_StringMap();
			this.commitFlag = true;
		}
	}
	,triggerCommit: function() {
		this.commitFlag = true;
	}
	,regenerateID: function() {
		this.regenerateFlag = true;
	}
	,isActive: function() {
		return this.started || this.get_id() != null;
	}
	,isReady: function() {
		return this.started;
	}
	,get_id: function() {
		if(this.sessionID == null) this.sessionID = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(this.context.request.get_cookies(),this.sessionName);
		if(this.sessionID == null) this.sessionID = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(this.context.request.get_params(),this.sessionName);
		return this.sessionID;
	}
	,close: function() {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before init() has been run",null,{ fileName : "FileSession.hx", lineNumber : 502, className : "ufront.web.session.FileSession", methodName : "checkStarted"}));
		this.sessionData = null;
		this.closeFlag = true;
	}
	,toString: function() {
		if(this.sessionData != null) return this.sessionData.toString(); else return "{}";
	}
	,getSessionFilePath: function(id) {
		return "" + this.savePath + id + ".sess";
	}
	,generateSessionID: function() {
		return ufront_core_Uuid.create();
	}
	,checkStarted: function(pos) {
		if(!this.started) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Trying to access session data before init() has been run",null,{ fileName : "FileSession.hx", lineNumber : 502, className : "ufront.web.session.FileSession", methodName : "checkStarted"}));
	}
	,__class__: ufront_web_session_FileSession
	,__properties__: {get_id:"get_id"}
};
var ufront_web_session_InlineSessionMiddleware = function() {
};
$hxClasses["ufront.web.session.InlineSessionMiddleware"] = ufront_web_session_InlineSessionMiddleware;
ufront_web_session_InlineSessionMiddleware.__name__ = ["ufront","web","session","InlineSessionMiddleware"];
ufront_web_session_InlineSessionMiddleware.__interfaces__ = [ufront_app_UFMiddleware];
ufront_web_session_InlineSessionMiddleware.prototype = {
	requestIn: function(ctx) {
		if(ufront_web_session_InlineSessionMiddleware.alwaysStart || ctx.session.get_id() != null && ctx.session.get_id() != "") return ctx.session.init(); else return ufront_core_SurpriseTools.success();
	}
	,responseOut: function(ctx) {
		if(ctx.session != null && ctx.session.isReady()) return ctx.session.commit(); else return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_session_InlineSessionMiddleware
};
var ufront_web_session_TestSession = function() {
	this.map = new haxe_ds_StringMap();
	this.id = ufront_core_Uuid.create();
};
$hxClasses["ufront.web.session.TestSession"] = ufront_web_session_TestSession;
ufront_web_session_TestSession.__name__ = ["ufront","web","session","TestSession"];
ufront_web_session_TestSession.__interfaces__ = [ufront_web_session_UFHttpSession];
ufront_web_session_TestSession.prototype = {
	id: null
	,map: null
	,setExpiry: function(e) {
	}
	,init: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,commit: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,triggerCommit: function() {
	}
	,isActive: function() {
		return true;
	}
	,isReady: function() {
		return true;
	}
	,get: function(name) {
		return this.map.get(name);
	}
	,set: function(name,value) {
		var v = value;
		this.map.set(name,v);
		v;
	}
	,exists: function(name) {
		return this.map.exists(name);
	}
	,remove: function(name) {
		this.map.remove(name);
	}
	,clear: function() {
		var $it0 = this.map.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			this.map.remove(key);
		}
	}
	,regenerateID: function() {
	}
	,close: function() {
	}
	,get_id: function() {
		return this.id;
	}
	,__class__: ufront_web_session_TestSession
	,__properties__: {get_id:"get_id"}
};
var ufront_web_session_VoidSession = function() {
};
$hxClasses["ufront.web.session.VoidSession"] = ufront_web_session_VoidSession;
ufront_web_session_VoidSession.__name__ = ["ufront","web","session","VoidSession"];
ufront_web_session_VoidSession.__interfaces__ = [ufront_web_session_UFHttpSession];
ufront_web_session_VoidSession.prototype = {
	id: null
	,setExpiry: function(e) {
	}
	,init: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,commit: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,triggerCommit: function() {
	}
	,isActive: function() {
		return false;
	}
	,isReady: function() {
		return false;
	}
	,get: function(name) {
		return null;
	}
	,set: function(name,value) {
	}
	,exists: function(name) {
		return false;
	}
	,remove: function(name) {
	}
	,clear: function() {
	}
	,regenerateID: function() {
	}
	,close: function() {
	}
	,get_id: function() {
		return null;
	}
	,__class__: ufront_web_session_VoidSession
	,__properties__: {get_id:"get_id"}
};
var ufront_web_upload_BaseUpload = function(postName,originalFileName,size,contentType) {
	this.postName = postName;
	this.originalFileName = haxe_io_Path.withoutDirectory(originalFileName);
	this.size = size;
	this.contentType = contentType;
};
$hxClasses["ufront.web.upload.BaseUpload"] = ufront_web_upload_BaseUpload;
ufront_web_upload_BaseUpload.__name__ = ["ufront","web","upload","BaseUpload"];
ufront_web_upload_BaseUpload.prototype = {
	postName: null
	,originalFileName: null
	,size: null
	,contentType: null
	,attachedUpload: null
	,hxSerialize: function(s) {
		var rs;
		rs = (s instanceof ufront_remoting_RemotingSerializer)?s:null;
		var attachingUpload;
		attachingUpload = rs != null && (function($this) {
			var $r;
			var _g = rs.direction;
			$r = (function($this) {
				var $r;
				switch(_g[1]) {
				case 0:
					$r = true;
					break;
				default:
					$r = false;
				}
				return $r;
			}($this));
			return $r;
		}(this));
		s.serialize(attachingUpload);
		if(attachingUpload) {
			if(js_Boot.__instanceof(this,ufront_web_upload_UFFileUpload) == false) throw new js__$Boot_HaxeError("BaseUpload can only be serialized if the sub-class matches the UFFileUpload interface");
			var uniquePostName = this.postName + "_" + ufront_core_Uuid.create();
			ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.add(rs.uploads,uniquePostName,this);
			s.serialize(uniquePostName);
		}
		s.serialize(this.postName);
		s.serialize(this.originalFileName);
		s.serialize(this.size);
		s.serialize(this.contentType);
	}
	,hxUnserialize: function(s) {
		var uploadAttached = s.unserialize();
		var rs;
		rs = (s instanceof ufront_remoting_RemotingUnserializer)?s:null;
		if(uploadAttached) {
			if(rs == null) throw new js__$Boot_HaxeError("Unable to Unserialize upload. It was serialized with RemotingSerializer, it must be unserialized with RemotingUnserializer");
			var uniquePostName = s.unserialize();
			if((function($this) {
				var $r;
				var this1 = rs.uploads;
				$r = __map_reserved[uniquePostName] != null?this1.existsReserved(uniquePostName):this1.h.hasOwnProperty(uniquePostName);
				return $r;
			}(this))) this.attachedUpload = ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.get(rs.uploads,uniquePostName); else throw new js__$Boot_HaxeError("Unable to find upload attached as " + uniquePostName);
		}
		this.postName = s.unserialize();
		this.originalFileName = s.unserialize();
		this.size = s.unserialize();
		this.contentType = s.unserialize();
	}
	,__class__: ufront_web_upload_BaseUpload
};
var ufront_web_upload_UFFileUpload = function() { };
$hxClasses["ufront.web.upload.UFFileUpload"] = ufront_web_upload_UFFileUpload;
ufront_web_upload_UFFileUpload.__name__ = ["ufront","web","upload","UFFileUpload"];
ufront_web_upload_UFFileUpload.prototype = {
	postName: null
	,originalFileName: null
	,size: null
	,contentType: null
	,getBytes: null
	,getString: null
	,writeToFile: null
	,process: null
	,__class__: ufront_web_upload_UFFileUpload
};
var ufront_web_upload_BrowserFileUpload = function(postName,file) {
	ufront_web_upload_BaseUpload.call(this,postName,file.name,file.size,file.type);
	this.file = file;
};
$hxClasses["ufront.web.upload.BrowserFileUpload"] = ufront_web_upload_BrowserFileUpload;
ufront_web_upload_BrowserFileUpload.__name__ = ["ufront","web","upload","BrowserFileUpload"];
ufront_web_upload_BrowserFileUpload.__interfaces__ = [ufront_web_upload_UFFileUpload];
ufront_web_upload_BrowserFileUpload.__super__ = ufront_web_upload_BaseUpload;
ufront_web_upload_BrowserFileUpload.prototype = $extend(ufront_web_upload_BaseUpload.prototype,{
	file: null
	,getBytes: function() {
		if(this.attachedUpload != null) return this.attachedUpload.getBytes();
		var t = new tink_core_FutureTrigger();
		var fr = new FileReader();
		fr.onload = function() {
			var binaryString = fr.result;
			var bytes = haxe_io_Bytes.ofString(binaryString);
			t.trigger(tink_core_Outcome.Success(bytes));
		};
		fr.onabort = function(e) {
			t.trigger(tink_core_Outcome.Failure(ufront_web_HttpError.internalServerError("Error during BrowserFileUpload.getBytes(), readAsBinaryString() was aborted",null,{ fileName : "BrowserFileUpload.hx", lineNumber : 45, className : "ufront.web.upload.BrowserFileUpload", methodName : "getBytes"})));
		};
		fr.onerror = function(e1) {
			t.trigger(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e1,"Error during BrowserFileUpload.getBytes(), readAsBinaryString() raised an error",{ fileName : "BrowserFileUpload.hx", lineNumber : 46, className : "ufront.web.upload.BrowserFileUpload", methodName : "getBytes"})));
		};
		fr.readAsBinaryString(this.file);
		return t.future;
	}
	,getString: function(encoding) {
		if(encoding == null) encoding = "UTF-8";
		if(this.attachedUpload != null) return this.attachedUpload.getString(encoding);
		var t = new tink_core_FutureTrigger();
		var fr = new FileReader();
		fr.onload = function() {
			var str = fr.result;
			t.trigger(tink_core_Outcome.Success(str));
		};
		fr.onabort = function(e) {
			t.trigger(tink_core_Outcome.Failure(ufront_web_HttpError.internalServerError("Error during BrowserFileUpload.getString(), readAsText() was aborted",null,{ fileName : "BrowserFileUpload.hx", lineNumber : 69, className : "ufront.web.upload.BrowserFileUpload", methodName : "getString"})));
		};
		fr.onerror = function(e1) {
			t.trigger(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e1,"Error during BrowserFileUpload.getString(), readAsText() raised an error",{ fileName : "BrowserFileUpload.hx", lineNumber : 70, className : "ufront.web.upload.BrowserFileUpload", methodName : "getString"})));
		};
		fr.readAsText(this.file,encoding);
		return t.future;
	}
	,writeToFile: function(newFilePath) {
		if(this.attachedUpload != null) return this.attachedUpload.writeToFile(newFilePath);
		throw new js__$Boot_HaxeError(ufront_web_HttpError.notImplemented({ fileName : "BrowserFileUpload.hx", lineNumber : 85, className : "ufront.web.upload.BrowserFileUpload", methodName : "writeToFile"}));
	}
	,process: function(onData,partSize) {
		var _g = this;
		if(this.attachedUpload != null) return this.attachedUpload.process(onData,partSize);
		if(partSize == null) partSize = 16384;
		var ft = new tink_core_FutureTrigger();
		var pos = 0;
		var readNext;
		var readNext1 = null;
		readNext1 = function() {
			var $final = false;
			var surprise;
			var blob = _g.file.slice(pos,pos + partSize);
			var fr = new FileReader();
			fr.onload = function() {
				var binaryString = fr.result;
				var bytes = haxe_io_Bytes.ofString(binaryString);
				if(bytes.length == 0) $final = true;
				try {
					surprise = onData(bytes,pos,bytes.length);
				} catch( e ) {
					haxe_CallStack.lastException = e;
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					surprise = ufront_core_FutureTools.asFuture(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e,"Error during TmpFileUpload.process",{ fileName : "BrowserFileUpload.hx", lineNumber : 125, className : "ufront.web.upload.BrowserFileUpload", methodName : "process"})));
				}
			};
			fr.onabort = function(e1) {
				surprise = ufront_core_FutureTools.asFuture(tink_core_Outcome.Failure(ufront_web_HttpError.internalServerError("Error during BrowserFileUpload.process(), readAsBinaryString() was aborted",null,{ fileName : "BrowserFileUpload.hx", lineNumber : 128, className : "ufront.web.upload.BrowserFileUpload", methodName : "process"})));
			};
			fr.onerror = function(e2) {
				surprise = ufront_core_FutureTools.asFuture(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e2,"Error during BrowserFileUpload.process(), readAsBinaryString() raised an error",{ fileName : "BrowserFileUpload.hx", lineNumber : 129, className : "ufront.web.upload.BrowserFileUpload", methodName : "process"})));
			};
			fr.readAsBinaryString(blob);
			surprise(function(outcome) {
				switch(outcome[1]) {
				case 0:
					if($final == false) {
						pos += partSize;
						readNext1();
					} else ft.trigger(tink_core_Outcome.Success(tink_core_Noise.Noise));
					break;
				case 1:
					var err = outcome[2];
					ft.trigger(tink_core_Outcome.Failure(err));
					break;
				}
			});
		};
		readNext = readNext1;
		readNext();
		return ft.future;
	}
	,__class__: ufront_web_upload_BrowserFileUpload
});
var ufront_web_upload_TmpFileUpload = function(tmpFileName,postName,originalFileName,size,contentType) {
	ufront_web_upload_BaseUpload.call(this,postName,haxe_io_Path.withoutDirectory(originalFileName),size,contentType);
	this.tmpFileName = tmpFileName;
};
$hxClasses["ufront.web.upload.TmpFileUpload"] = ufront_web_upload_TmpFileUpload;
ufront_web_upload_TmpFileUpload.__name__ = ["ufront","web","upload","TmpFileUpload"];
ufront_web_upload_TmpFileUpload.__interfaces__ = [ufront_web_upload_UFFileUpload];
ufront_web_upload_TmpFileUpload.__super__ = ufront_web_upload_BaseUpload;
ufront_web_upload_TmpFileUpload.prototype = $extend(ufront_web_upload_BaseUpload.prototype,{
	tmpFileName: null
	,getBytes: function() {
		if(this.attachedUpload != null) return this.attachedUpload.getBytes();
		try {
			return ufront_core_FutureTools.asFuture(tink_core_Outcome.Success(sys_io_File.getBytes(this.tmpFileName)));
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return ufront_core_FutureTools.asFuture(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e,"Error during TmpFileUpload.getBytes()",{ fileName : "TmpFileUpload.hx", lineNumber : 49, className : "ufront.web.upload.TmpFileUpload", methodName : "getBytes"})));
		}
	}
	,getString: function(encoding) {
		if(encoding == null) encoding = "UTF-8";
		if(this.attachedUpload != null) return this.attachedUpload.getString(encoding);
		try {
			return ufront_core_FutureTools.asFuture(tink_core_Outcome.Success(js_node_Fs.readFileSync(this.tmpFileName,{ encoding : "utf8"})));
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return ufront_core_FutureTools.asFuture(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e,"Error during TmpFileUpload.getString()",{ fileName : "TmpFileUpload.hx", lineNumber : 67, className : "ufront.web.upload.TmpFileUpload", methodName : "getString"})));
		}
	}
	,writeToFile: function(newFilePath) {
		if(this.attachedUpload != null) return this.attachedUpload.writeToFile(newFilePath);
		try {
			var directory = haxe_io_Path.directory(newFilePath);
			if(!sys_FileSystem.exists(directory)) sys_FileSystem.createDirectory(directory);
			sys_io_File.copy(this.tmpFileName,newFilePath);
			return ufront_core_SurpriseTools.success();
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return ufront_core_FutureTools.asFuture(tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e,"Error during TmpFileUpload.writeToFile()",{ fileName : "TmpFileUpload.hx", lineNumber : 87, className : "ufront.web.upload.TmpFileUpload", methodName : "writeToFile"})));
		}
	}
	,process: function(onData,partSize) {
		if(this.attachedUpload != null) return this.attachedUpload.process(onData,partSize);
		throw new js__$Boot_HaxeError(ufront_web_HttpError.notImplemented({ fileName : "TmpFileUpload.hx", lineNumber : 154, className : "ufront.web.upload.TmpFileUpload", methodName : "process"}));
	}
	,deleteTemporaryFile: function() {
		try {
			js_node_Fs.unlinkSync(this.tmpFileName);
			return tink_core_Outcome.Success(tink_core_Noise.Noise);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return tink_core_Outcome.Failure(ufront_web_HttpError.wrap(e,"Error during TmpFileUpload.deleteTmpFile()",{ fileName : "TmpFileUpload.hx", lineNumber : 169, className : "ufront.web.upload.TmpFileUpload", methodName : "deleteTemporaryFile"}));
		}
	}
	,__class__: ufront_web_upload_TmpFileUpload
});
var ufront_web_upload_TmpFileUploadMiddleware = function() {
};
$hxClasses["ufront.web.upload.TmpFileUploadMiddleware"] = ufront_web_upload_TmpFileUploadMiddleware;
ufront_web_upload_TmpFileUploadMiddleware.__name__ = ["ufront","web","upload","TmpFileUploadMiddleware"];
ufront_web_upload_TmpFileUploadMiddleware.__interfaces__ = [ufront_app_UFMiddleware];
ufront_web_upload_TmpFileUploadMiddleware.prototype = {
	requestIn: function(ctx) {
		if(ctx.request.get_httpMethod().toLowerCase() == "post" && ctx.request.isMultipart()) {
			var files = ctx.request.req.files;
			if(files != null) {
				var _g = 0;
				while(_g < files.length) {
					var file = files[_g];
					++_g;
					var tmpFile = new ufront_web_upload_TmpFileUpload(file.path,file.fieldname,file.originalname,file.size);
					ufront_core__$MultiValueMap_MultiValueMap_$Impl_$.add(ctx.request.get_files(),file.fieldname,tmpFile);
				}
			}
			return ufront_core_SurpriseTools.success();
		} else return ufront_core_SurpriseTools.success();
	}
	,responseOut: function(ctx) {
		if(ctx.request.get_httpMethod().toLowerCase() == "post" && ctx.request.isMultipart()) {
			var $it0 = $iterator(ufront_core__$MultiValueMap_MultiValueMap_$Impl_$)(ctx.request.get_files());
			while( $it0.hasNext() ) {
				var f = $it0.next();
				var tmpFile;
				tmpFile = (f instanceof ufront_web_upload_TmpFileUpload)?f:null;
				if(tmpFile != null) {
					var _g = tmpFile.deleteTemporaryFile();
					switch(_g[1]) {
					case 1:
						var e = _g[2];
						ctx.messages.push({ msg : e, pos : { fileName : "TmpFileUploadMiddleware.hx", lineNumber : 125, className : "ufront.web.upload.TmpFileUploadMiddleware", methodName : "responseOut"}, type : ufront_log_MessageType.MError});
						break;
					default:
					}
				}
			}
		}
		return ufront_core_SurpriseTools.success();
	}
	,__class__: ufront_web_upload_TmpFileUploadMiddleware
};
var ufront_web_url_PartialUrl = function() {
	this.segments = [];
	this.query = [];
	this.fragment = null;
};
$hxClasses["ufront.web.url.PartialUrl"] = ufront_web_url_PartialUrl;
ufront_web_url_PartialUrl.__name__ = ["ufront","web","url","PartialUrl"];
ufront_web_url_PartialUrl.parse = function(url) {
	var u = new ufront_web_url_PartialUrl();
	ufront_web_url_PartialUrl.feed(u,url);
	return u;
};
ufront_web_url_PartialUrl.feed = function(u,url) {
	var parts = url.split("#");
	if(parts.length > 1) u.fragment = parts[1];
	parts = parts[0].split("?");
	if(parts.length > 1) {
		var pairs = parts[1].split("&");
		var _g = 0;
		while(_g < pairs.length) {
			var s = pairs[_g];
			++_g;
			var pair = s.split("=");
			u.query.push({ name : pair[0], value : pair[1], encoded : true});
		}
	}
	var segments = parts[0].split("/");
	if(segments[0] == "") segments.shift();
	if(segments.length == 1 && segments[0] == "") segments.pop();
	u.segments = segments;
};
ufront_web_url_PartialUrl.prototype = {
	segments: null
	,query: null
	,fragment: null
	,queryString: function() {
		var params = [];
		var _g = 0;
		var _g1 = this.query;
		while(_g < _g1.length) {
			var param = _g1[_g];
			++_g;
			var value;
			if(param.encoded) value = param.value; else value = encodeURIComponent(param.value);
			params.push(param.name + "=" + value);
		}
		return params.join("&");
	}
	,toString: function() {
		var url = "/" + this.segments.join("/");
		var qs = this.queryString();
		if(qs.length > 0) url += "?" + qs;
		if(null != this.fragment) url += "#" + this.fragment;
		return url;
	}
	,__class__: ufront_web_url_PartialUrl
};
var ufront_web_url_VirtualUrl = function(isPhysical) {
	if(isPhysical == null) isPhysical = false;
	ufront_web_url_PartialUrl.call(this);
	this.isPhysical = isPhysical;
};
$hxClasses["ufront.web.url.VirtualUrl"] = ufront_web_url_VirtualUrl;
ufront_web_url_VirtualUrl.__name__ = ["ufront","web","url","VirtualUrl"];
ufront_web_url_VirtualUrl.parse = function(url,isPhysical) {
	if(isPhysical == null) isPhysical = false;
	var u = new ufront_web_url_VirtualUrl(isPhysical);
	ufront_web_url_VirtualUrl.feed(u,url);
	return u;
};
ufront_web_url_VirtualUrl.feed = function(u,url) {
	ufront_web_url_PartialUrl.feed(u,url);
	if(u.segments[0] == "~") {
		u.segments.shift();
		if(u.segments.length == 1 && u.segments[0] == "") u.segments.pop();
		u.isPhysical = true;
	}
};
ufront_web_url_VirtualUrl.__super__ = ufront_web_url_PartialUrl;
ufront_web_url_VirtualUrl.prototype = $extend(ufront_web_url_PartialUrl.prototype,{
	isPhysical: null
	,__class__: ufront_web_url_VirtualUrl
});
var ufront_web_url_filter_UFUrlFilter = function() { };
$hxClasses["ufront.web.url.filter.UFUrlFilter"] = ufront_web_url_filter_UFUrlFilter;
ufront_web_url_filter_UFUrlFilter.__name__ = ["ufront","web","url","filter","UFUrlFilter"];
ufront_web_url_filter_UFUrlFilter.prototype = {
	filterIn: null
	,filterOut: null
	,__class__: ufront_web_url_filter_UFUrlFilter
};
var ufront_web_url_filter_DirectoryUrlFilter = function(directory) {
	if(StringTools.startsWith(directory,"/")) directory = HxOverrides.substr(directory,1,directory.length);
	if(StringTools.endsWith(directory,"/")) directory = HxOverrides.substr(directory,0,directory.length - 1);
	this.directory = directory;
	if(directory != "") this.segments = directory.split("/"); else this.segments = [];
};
$hxClasses["ufront.web.url.filter.DirectoryUrlFilter"] = ufront_web_url_filter_DirectoryUrlFilter;
ufront_web_url_filter_DirectoryUrlFilter.__name__ = ["ufront","web","url","filter","DirectoryUrlFilter"];
ufront_web_url_filter_DirectoryUrlFilter.__interfaces__ = [ufront_web_url_filter_UFUrlFilter];
ufront_web_url_filter_DirectoryUrlFilter.prototype = {
	directory: null
	,segments: null
	,filterIn: function(url) {
		var pos = 0;
		while(url.segments.length > 0 && url.segments[0] == this.segments[pos++]) url.segments.shift();
	}
	,filterOut: function(url) {
		url.segments = this.segments.concat(url.segments);
	}
	,__class__: ufront_web_url_filter_DirectoryUrlFilter
};
var ufront_web_url_filter_PathInfoUrlFilter = function(frontScript,useCleanRoot) {
	if(useCleanRoot == null) useCleanRoot = true;
	if(frontScript == null) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Target not implemented, always pass a value for frontScript.",null,{ fileName : "PathInfoUrlFilter.hx", lineNumber : 31, className : "ufront.web.url.filter.PathInfoUrlFilter", methodName : "new"}));
	this.frontScript = frontScript;
	this.useCleanRoot = useCleanRoot;
};
$hxClasses["ufront.web.url.filter.PathInfoUrlFilter"] = ufront_web_url_filter_PathInfoUrlFilter;
ufront_web_url_filter_PathInfoUrlFilter.__name__ = ["ufront","web","url","filter","PathInfoUrlFilter"];
ufront_web_url_filter_PathInfoUrlFilter.__interfaces__ = [ufront_web_url_filter_UFUrlFilter];
ufront_web_url_filter_PathInfoUrlFilter.prototype = {
	frontScript: null
	,useCleanRoot: null
	,filterIn: function(url) {
		if(url.segments[0] == this.frontScript) url.segments.shift();
	}
	,filterOut: function(url) {
		if(url.isPhysical || url.segments.length == 0 && this.useCleanRoot) {
		} else url.segments.unshift(this.frontScript);
	}
	,__class__: ufront_web_url_filter_PathInfoUrlFilter
};
var ufront_web_url_filter_QueryStringUrlFilter = function(paramName,frontScript,useCleanRoot) {
	if(useCleanRoot == null) useCleanRoot = true;
	if(paramName == null) paramName = "q";
	if(frontScript == null) throw new js__$Boot_HaxeError(ufront_web_HttpError.internalServerError("Target not implemented, always pass a value for frontScript",null,{ fileName : "QueryStringUrlFilter.hx", lineNumber : 35, className : "ufront.web.url.filter.QueryStringUrlFilter", methodName : "new"}));
	this.frontScript = frontScript;
	this.paramName = paramName;
	this.useCleanRoot = useCleanRoot;
};
$hxClasses["ufront.web.url.filter.QueryStringUrlFilter"] = ufront_web_url_filter_QueryStringUrlFilter;
ufront_web_url_filter_QueryStringUrlFilter.__name__ = ["ufront","web","url","filter","QueryStringUrlFilter"];
ufront_web_url_filter_QueryStringUrlFilter.__interfaces__ = [ufront_web_url_filter_UFUrlFilter];
ufront_web_url_filter_QueryStringUrlFilter.prototype = {
	frontScript: null
	,paramName: null
	,useCleanRoot: null
	,filterIn: function(url) {
		var _g = this;
		if(url.segments[0] == this.frontScript) {
			var param = Lambda.find(url.query,function(p) {
				return p.name == _g.paramName;
			});
			if(param != null) {
				var value;
				if(param.encoded) value = decodeURIComponent(param.value.split("+").join(" ")); else value = param.value;
				url.segments = ufront_web_url_PartialUrl.parse(param.value).segments;
				HxOverrides.remove(url.query,param);
			}
		}
	}
	,filterOut: function(url) {
		if(url.isPhysical || url.segments.length == 0 && this.useCleanRoot) {
		} else {
			var path = "/" + url.segments.join("/");
			url.segments = [this.frontScript];
			url.query.push({ name : this.paramName, value : path, encoded : true});
		}
	}
	,__class__: ufront_web_url_filter_QueryStringUrlFilter
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
CompileTimeClassList.__meta__ = { obj : { classLists : [["null,true,ufront.web.Controller","controller.HomeController,ufront.app.DefaultUfrontController"],["null,true,ufront.api.UFApi",""],["null,true,ufront.web.Controller","controller.HomeController,ufront.app.DefaultUfrontController"],["null,true,ufront.api.UFApi",""],["null,true,ufront.web.client.UFClientAction",""]]}};
ufront_web_Controller.__meta__ = { obj : { rtti : [["injectContext","","ufront.web.context.HttpContext","",""]]}};
controller_HomeController.__meta__ = { fields : { main : { wrapResult : [3]}, json : { wrapResult : [3]}, redirect : { wrapResult : [3]}, file : { wrapResult : [3]}}};
haxe_IMap.__meta__ = { obj : { 'interface' : null}};
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe_Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe_Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe_Template.expr_int = new EReg("^[0-9]+$","");
haxe_Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe_Template.globals = { };
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_remoting_AsyncConnection.__meta__ = { obj : { 'interface' : null}};
haxe_remoting_Connection.__meta__ = { obj : { 'interface' : null}};
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
minject_point_InjectionPoint.__meta__ = { obj : { 'interface' : null}};
minject_provider_DependencyProvider.__meta__ = { obj : { 'interface' : null}};
ufront_web_context_HttpResponse.CONTENT_TYPE = "Content-type";
ufront_web_context_HttpResponse.LOCATION = "Location";
ufront_web_context_HttpResponse.DEFAULT_CONTENT_TYPE = "text/html";
ufront_web_context_HttpResponse.DEFAULT_CHARSET = "utf-8";
ufront_web_context_HttpResponse.DEFAULT_STATUS = 200;
ufront_web_context_HttpResponse.MOVED_PERMANENTLY = 301;
ufront_web_context_HttpResponse.FOUND = 302;
ufront_web_context_HttpResponse.UNAUTHORIZED = 401;
ufront_web_context_HttpResponse.NOT_FOUND = 404;
ufront_web_context_HttpResponse.INTERNAL_SERVER_ERROR = 500;
sys_io_File.copyBuf = new js_node_buffer_Buffer(65536);
ufront_api_RequireAsyncCallbackApi.__meta__ = { obj : { 'interface' : null}};
ufront_api_UFApi.__meta__ = { obj : { rtti : [["auth","ufront.auth.UFAuthHandler",""],["messages","ufront.log.MessageList",""]]}};
ufront_app_UFErrorHandler.__meta__ = { obj : { 'interface' : null}};
ufront_app_UFInitRequired.__meta__ = { obj : { 'interface' : null}};
ufront_app_UFLogHandler.__meta__ = { obj : { 'interface' : null}};
ufront_app_UFResponseMiddleware.__meta__ = { obj : { 'interface' : null}};
ufront_app_UFRequestMiddleware.__meta__ = { obj : { 'interface' : null}};
ufront_app_UFMiddleware.__meta__ = { obj : { 'interface' : null}};
ufront_app_UFRequestHandler.__meta__ = { obj : { 'interface' : null}};
ufront_app_DefaultUfrontController.__meta__ = { fields : { showMessage : { wrapResult : [7]}}};
ufront_auth_UFAuthHandler.__meta__ = { obj : { 'interface' : null}};
ufront_auth_UFAuthAdapter.__meta__ = { obj : { 'interface' : null}};
ufront_auth_UFAuthAdapterSync.__meta__ = { obj : { 'interface' : null}};
ufront_auth_UFAuthUser.__meta__ = { obj : { 'interface' : null}};
ufront_cache_UFCacheConnectionSync.__meta__ = { obj : { 'interface' : null}};
ufront_cache_UFCacheConnection.__meta__ = { obj : { 'interface' : null}};
ufront_cache_UFCacheSync.__meta__ = { obj : { 'interface' : null}};
ufront_cache_UFCache.__meta__ = { obj : { 'interface' : null}};
ufront_cache_RequestCacheMiddleware.__meta__ = { obj : { rtti : [["cacheConnection","ufront.cache.UFCacheConnection",""]]}};
ufront_cache_RequestCacheMiddleware["namespace"] = "ufront.middleware.RequestCache";
ufront_cache_RequestCacheMiddleware.metaName = "cacheRequest";
ufront_cache_RequestCacheMiddleware.contentTypesToCache = ["text/plain","text/html","text/xml","text/css","text/csv","application/json","application/javascript","application/atom+xml","application/rdf+xml","application/rss+xml","application/soap+xml","application/xhtml+xml","application/xml","application/xml-dtd"];
ufront_log_FileLogger.REMOVENL = new EReg("[\n\r]","g");
ufront_remoting_HttpConnection.TIMEOUT = 10.;
ufront_view_UFViewEngine.cacheEnabledByDefault = true;
ufront_view_FileViewEngine.__meta__ = { obj : { rtti : [["scriptDir","String","scriptDirectory"],["path","String","viewPath"]]}};
ufront_view_HttpViewEngine.__meta__ = { obj : { rtti : [["viewPath","String","viewPath"]]}};
ufront_view_TemplatingEngines.all = [ufront_view_TemplatingEngines.get_haxe()];
ufront_web_HttpCookie.dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
ufront_web_HttpCookie.monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
ufront_web_UserAgent.dataBrowser = [{ subString : "Chrome", identity : "Chrome"},{ subString : "OmniWeb", versionSearch : "OmniWeb/", identity : "OmniWeb"},{ subString : "Apple", identity : "Safari", versionSearch : "Version"},{ subString : "Opera", versionSearch : "Version", identity : "Opera"},{ subString : "iCab", identity : "iCab"},{ subString : "KDE", identity : "Konqueror"},{ subString : "Firefox", identity : "Firefox"},{ subString : "Camino", identity : "Camino"},{ subString : "Netscape", identity : "Netscape"},{ subString : "MSIE", identity : "Explorer", versionSearch : "MSIE"},{ subString : "Gecko", identity : "Mozilla", versionSearch : "rv"},{ subString : "Mozilla", identity : "Netscape", versionSearch : "Mozilla"}];
ufront_web_UserAgent.dataOS = [{ subString : "Win", identity : "Windows"},{ subString : "Mac", identity : "Mac"},{ subString : "iPhone", identity : "iPhone/iPod"},{ subString : "Linux", identity : "Linux"}];
ufront_web_result_WrappedResult.__meta__ = { obj : { 'interface' : null}};
ufront_web_result_FileResult.extMap = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved.jpg != null) _g.setReserved("jpg","image/jpeg"); else _g.h["jpg"] = "image/jpeg";
	if(__map_reserved.jpeg != null) _g.setReserved("jpeg","image/jpeg"); else _g.h["jpeg"] = "image/jpeg";
	if(__map_reserved.png != null) _g.setReserved("png","image/png"); else _g.h["png"] = "image/png";
	if(__map_reserved.gif != null) _g.setReserved("gif","image/gif"); else _g.h["gif"] = "image/gif";
	if(__map_reserved.svg != null) _g.setReserved("svg","image/svg+xml"); else _g.h["svg"] = "image/svg+xml";
	if(__map_reserved.tiff != null) _g.setReserved("tiff","image/tiff"); else _g.h["tiff"] = "image/tiff";
	if(__map_reserved.zip != null) _g.setReserved("zip","application/zip"); else _g.h["zip"] = "application/zip";
	if(__map_reserved.atom != null) _g.setReserved("atom","application/atom+xml"); else _g.h["atom"] = "application/atom+xml";
	if(__map_reserved.json != null) _g.setReserved("json","application/json"); else _g.h["json"] = "application/json";
	if(__map_reserved.js != null) _g.setReserved("js","application/javascript"); else _g.h["js"] = "application/javascript";
	if(__map_reserved.ogg != null) _g.setReserved("ogg","application/ogg"); else _g.h["ogg"] = "application/ogg";
	if(__map_reserved.pdf != null) _g.setReserved("pdf","application/pdf"); else _g.h["pdf"] = "application/pdf";
	if(__map_reserved.ps != null) _g.setReserved("ps","application/postscript"); else _g.h["ps"] = "application/postscript";
	if(__map_reserved.rdf != null) _g.setReserved("rdf","application/rdf"); else _g.h["rdf"] = "application/rdf";
	if(__map_reserved.rss != null) _g.setReserved("rss","application/rss"); else _g.h["rss"] = "application/rss";
	if(__map_reserved.woff != null) _g.setReserved("woff","application/woff"); else _g.h["woff"] = "application/woff";
	if(__map_reserved.xml != null) _g.setReserved("xml","application/xml"); else _g.h["xml"] = "application/xml";
	if(__map_reserved.dtd != null) _g.setReserved("dtd","application/xml-dtd"); else _g.h["dtd"] = "application/xml-dtd";
	if(__map_reserved.gz != null) _g.setReserved("gz","application/gzip"); else _g.h["gz"] = "application/gzip";
	$r = _g;
	return $r;
}(this));
ufront_web_result_ViewResult.globalValues = ufront_view__$TemplateData_TemplateData_$Impl_$.setObject((function($this) {
	var $r;
	var obj = { };
	$r = obj != null?obj:{ };
	return $r;
}(this)),{ });
ufront_web_result_ViewResult.globalHelpers = new haxe_ds_StringMap();
ufront_web_result_ViewResult.globalPartials = new haxe_ds_StringMap();
ufront_web_result_PartialViewResult.transitionTimeout = 0;
ufront_web_session_UFHttpSession.__meta__ = { obj : { 'interface' : null}};
ufront_web_session_CacheSession.__meta__ = { obj : { rtti : [["injectConfig","","ufront.web.context.HttpContext","","","ufront.cache.UFCacheConnection","",""]]}};
ufront_web_session_CacheSession.defaultSessionName = "UfrontSessionID";
ufront_web_session_CacheSession.defaultSavePath = "sessions";
ufront_web_session_CacheSession.defaultExpiry = 0;
ufront_web_session_FileSession.__meta__ = { obj : { rtti : [["context","ufront.web.context.HttpContext",""],["injectConfig","","ufront.web.context.HttpContext","",""]]}};
ufront_web_session_FileSession.defaultSessionName = "UfrontSessionID";
ufront_web_session_FileSession.defaultSavePath = "sessions/";
ufront_web_session_FileSession.defaultExpiry = 0;
ufront_web_session_InlineSessionMiddleware.alwaysStart = false;
ufront_web_upload_UFFileUpload.__meta__ = { obj : { 'interface' : null}};
ufront_web_upload_TmpFileUploadMiddleware.subDir = "uf-upload-tmp";
ufront_web_url_filter_UFUrlFilter.__meta__ = { obj : { 'interface' : null}};
Server.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
