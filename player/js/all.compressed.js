if(typeof window.CustomEvent==="undefined"){
(function(){
function CustomEvent(_1,_2){
_2=_2||{bubbles:false,cancelable:false,detail:undefined};
var _3=document.createEvent("CustomEvent");
_3.initCustomEvent(_1,_2.bubbles,_2.cancelable,_2.detail);
return _3;
}
CustomEvent.prototype=window.Event.prototype;
window.CustomEvent=CustomEvent;
})();
}

Array.prototype.contains=function(_1){
if(Array.prototype.indexOf){
return this.indexOf(_1)!=-1;
}
for(var i in this){
if(this[i]==_1){
return true;
}
}
return false;
};
Array.prototype.setLength=function(_3,_4){
_4=typeof _4!="undefined"?_4:null;
for(var i=0;i<_3;i++){
this[i]=_4;
}
return this;
};
Array.prototype.addDimension=function(_6,_7){
_7=typeof _7!="undefined"?_7:null;
var _8=this.length;
for(var i=0;i<_8;i++){
this[i]=[].setLength(_6,_7);
}
return this;
};
Array.prototype.first=function(){
return this[0];
};
Array.prototype.last=function(){
return this[this.length-1];
};
Array.prototype.copy=function(){
var _a=[];
var _b=this.length;
for(var i=0;i<_b;i++){
if(this[i] instanceof Array){
_a[i]=this[i].copy();
}else{
_a[i]=this[i];
}
}
return _a;
};
if(!Array.prototype.map){
Array.prototype.map=function(_d){
var _e=this.length;
if(typeof _d!="function"){
throw new TypeError();
}
var _f=new Array(_e);
var _10=arguments[1];
for(var i=0;i<_e;i++){
if(i in this){
_f[i]=_d.call(_10,this[i],i,this);
}
}
return _f;
};
}
if(!Array.prototype.filter){
Array.prototype.filter=function(fun){
var len=this.length;
if(typeof fun!="function"){
throw new TypeError();
}
var res=new Array();
var _15=arguments[1];
for(var i=0;i<len;i++){
if(i in this){
var val=this[i];
if(fun.call(_15,val,i,this)){
res.push(val);
}
}
}
return res;
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var len=this.length;
if(typeof fun!="function"){
throw new TypeError();
}
var _1a=arguments[1];
for(var i=0;i<len;i++){
if(i in this){
fun.call(_1a,this[i],i,this);
}
}
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var len=this.length;
if(typeof fun!="function"){
throw new TypeError();
}
var _1e=arguments[1];
for(var i=0;i<len;i++){
if(i in this&&!fun.call(_1e,this[i],i,this)){
return false;
}
}
return true;
};
}
if(!Array.prototype.some){
Array.prototype.some=function(fun){
var len=this.length;
if(typeof fun!="function"){
throw new TypeError();
}
var _22=arguments[1];
for(var i=0;i<len;i++){
if(i in this&&fun.call(_22,this[i],i,this)){
return true;
}
}
return false;
};
}
Array.from=function(it){
var arr=[];
for(var i=0;i<it.length;i++){
arr[i]=it[i];
}
return arr;
};
Function.prototype.bind=function(_27){
var _28=this;
var _29=Array.from(arguments).slice(1);
return function(){
return _28.apply(_27,_29.concat(Array.from(arguments)));
};
};

eidogo=window.eidogo||{};

(function(){
var ua=navigator.userAgent.toLowerCase();
var _2=(ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];
eidogo.browser={ua:ua,ver:_2,ie:/msie/.test(ua)&&!/opera/.test(ua),moz:/mozilla/.test(ua)&&!/(compatible|webkit)/.test(ua),safari3:/webkit/.test(ua)&&parseInt(_2,10)>=420};
eidogo.util={byId:function(id){
return document.getElementById(id);
},makeQueryString:function(_4){
var qs="";
if(_4&&typeof _4=="object"){
var _6=[];
for(var _7 in _4){
if(_4[_7]&&_4[_7].constructor==Array){
for(var i=0;i<_4[_7].length;i++){
_6.push(encodeURIComponent(_7)+"="+encodeURIComponent(_4[_7]));
}
}else{
_6.push(encodeURIComponent(_7)+"="+encodeURIComponent(_4[_7]));
}
}
qs=_6.join("&").replace(/%20/g,"+");
}
return qs;
},ajax:function(_9,_a,_b,_c,_d,_e,_f){
_9=_9.toUpperCase();
var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
var qs=(_b&&typeof _b=="object"?eidogo.util.makeQueryString(_b):null);
if(qs&&_9=="GET"){
_a+=(_a.match(/\?/)?"&":"?")+qs;
qs=null;
}
xhr.open(_9,_a,true);
if(qs){
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
var _12=false;
var _13=/webkit/.test(navigator.userAgent.toLowerCase());
function httpSuccess(r){
try{
return !r.status&&location.protocol=="file:"||(r.status>=200&&r.status<300)||r.status==304||_13&&r.status==undefined;
}
catch(e){
}
return false;
}
function handleReadyState(_15){
if(!_12&&xhr&&(xhr.readyState==4||_15=="timeout")){
_12=true;
if(_16){
clearInterval(_16);
_16=null;
}
var _17=_15=="timeout"&&"timeout"||!httpSuccess(xhr)&&"error"||"success";
if(_17=="success"){
_c.call(_e,xhr);
}else{
_d.call(_e);
}
xhr=null;
}
}
var _16=setInterval(handleReadyState,13);
if(_f){
setTimeout(function(){
if(xhr){
xhr.abort();
if(!_12){
handleReadyState("timeout");
}
}
},_f);
}
xhr.send(qs);
return xhr;
},addEventHelper:function(_18,_19,_1a){
if(_18.addEventListener){
_18.addEventListener(_19,_1a,false);
}else{
if(!eidogo.util.addEventId){
eidogo.util.addEventId=1;
}
if(!_1a.$$guid){
_1a.$$guid=eidogo.util.addEventId++;
}
if(!_18.events){
_18.events={};
}
var _1b=_18.events[_19];
if(!_1b){
_1b=_18.events[_19]={};
if(_18["on"+_19]){
_1b[0]=_18["on"+_19];
}
}
_1b[_1a.$$guid]=_1a;
_18["on"+_19]=eidogo.util.handleEvent;
}
},handleEvent:function(_1c){
var _1d=true;
_1c=_1c||((this.ownerDocument||this.document||this).parentWindow||window).event;
var _1e=this.events[_1c.type];
for(var i in _1e){
this.$$handleEvent=_1e[i];
if(this.$$handleEvent(_1c)===false){
_1d=false;
}
}
return _1d;
},addEvent:function(el,_21,_22,arg,_24){
if(!el){
return;
}
if(_24){
_22=_22.bind(arg);
}else{
if(arg){
var _25=_22;
_22=function(e){
_25(e,arg);
};
}
}
eidogo.util.addEventHelper(el,_21,_22);
},onClick:function(el,_28,_29){
eidogo.util.addEvent(el,"click",_28,_29,true);
},getElClickXY:function(e,el,_2c){
var doc=el.ownerDocument;
if(!e.pageX){
e.pageX=e.clientX+(doc.documentElement.scrollLeft||doc.body.scrollLeft);
e.pageY=e.clientY+(doc.documentElement.scrollTop||doc.body.scrollTop);
}
var _2e=eidogo.util.getElXY(el,_2c);
return [e.pageX-_2e[0],e.pageY-_2e[1]];
},stopEvent:function(e){
if(!e){
return;
}
if(e.stopPropagation){
e.stopPropagation();
}else{
e.cancelBubble=true;
}
if(e.preventDefault){
e.preventDefault();
}else{
e.returnValue=false;
}
},getTarget:function(ev){
var t=ev.target||ev.srcElement;
return (t&&t.nodeName&&t.nodeName.toUpperCase()=="#TEXT")?t.parentNode:t;
},addClass:function(el,cls){
if(!cls){
return;
}
var ca=cls.split(/\s+/);
for(var i=0;i<ca.length;i++){
if(!eidogo.util.hasClass(el,ca[i])){
el.className+=(el.className?" ":"")+ca[i];
}
}
},removeClass:function(el,cls){
var ca=el.className.split(/\s+/);
var nc=[];
for(var i=0;i<ca.length;i++){
if(ca[i]!=cls){
nc.push(ca[i]);
}
}
el.className=nc.join(" ");
},hasClass:function(el,cls){
var ca=el.className.split(/\s+/);
for(var i=0;i<ca.length;i++){
if(ca[i]==cls){
return true;
}
}
return false;
},show:function(el,_40){
_40=_40||"block";
if(typeof el=="string"){
el=eidogo.util.byId(el);
}
if(!el){
return;
}
el.style.display=_40;
},hide:function(el){
if(typeof el=="string"){
el=eidogo.util.byId(el);
}
if(!el){
return;
}
el.style.display="none";
},getElXY:function(el,_43){
var _44=el,elX=0,elY=0,_47=el.parentNode,sx=0,sy=0,doc=el.ownerDocument;
if(el.getBoundingClientRect){
var _4b=el.getBoundingClientRect();
elX=_4b.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);
elY=_4b.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);
}else{
while(_44){
elX+=_44.offsetLeft;
elY+=_44.offsetTop;
_44=_44.offsetParent?_44.offsetParent:null;
}
while(!_43&&_47&&_47.tagName&&!/^body|html$/i.test(_47.tagName)){
sx+=_47.scrollLeft;
sy+=_47.scrollTop;
elX-=_47.scrollLeft;
elY-=_47.scrollTop;
_47=_47.parentNode;
}
}
return [elX,elY,sx,sy];
},getElX:function(el){
return this.getElXY(el)[0];
},getElY:function(el){
return this.getElXY(el)[1];
},addStyleSheet:function(_4e){
if(document.createStyleSheet){
document.createStyleSheet(_4e);
}else{
var _4f=document.createElement("link");
_4f.rel="stylesheet";
_4f.type="text/css";
_4f.href=_4e;
document.getElementsByTagName("head")[0].appendChild(_4f);
}
},getPlayerPath:function(){
var _50=document.getElementsByTagName("script");
var _51;
var _52;
for(var i=0;_52=_50[i];i++){
if(/(all\.compressed\.js|eidogo\.js)/.test(_52.src)){
_51=_52.src.replace(/\/js\/[^\/]+$/,"");
}
}
return _51;
},numProperties:function(obj){
var _55=0;
for(var i in obj){
_55++;
}
return _55;
}};
})();

eidogo=window.eidogo||{};
eidogo.i18n=eidogo.i18n||{"move":"Move","loading":"Loading","passed":"passed","resigned":"resigned","variations":"Variations","no variations":"none","tool":"Tool","view":"Jump to Move","play":"Play","region":"Select Region","add_b":"Black Stone","add_w":"White Stone","edit comment":"Edit Comment","edit game info":"Edit Game Info","done":"Done","triangle":"Triangle","square":"Square","circle":"Circle","x":"X","letter":"Letter","number":"Number","label":"Custom Label","dim":"Dim","clear":"Clear Marker","score":"Score","score est":"Score Estimate","search":"Search","search corner":"Corner Search","search center":"Center Search","region info":"Click and drag to select a region.","two stones":"Please select at least two stones to search for.","two edges":"For corner searches, your selection must touch two adjacent edges of the board.","no search url":"No search URL provided.","close search":"close search","matches found":"matches found.","show games":"Show pro games with this position","save to server":"Save to Server","download sgf":"Download SGF","multi-game sgf":"Multi-game SGF: ","next game":"Next Game","previous game":"Previous Game","end of variation":"End of variation","white":"White","white rank":"White rank","white team":"White team","black":"Black","black rank":"Black rank","black team":"Black team","captures":"captures","time left":"time left","you":"You","game":"Game","handicap":"Handicap","komi":"Komi","result":"Result","date":"Date","info":"Info","place":"Place","event":"Event","round":"Round","overtime":"Overtime","opening":"Openning","ruleset":"Ruleset","annotator":"Annotator","copyright":"Copyright","source":"Source","time limit":"Time limit","transcriber":"Transcriber","created with":"Created with","january":"January","february":"February","march":"March","april":"April","may":"May","june":"June","july":"July","august":"August","september":"September","october":"October","november":"November","december":"December","gw":"Good for White","vgw":"Very good for White","gb":"Good for Black","vgb":"Very good for Black","dm":"Even position","dmj":"Even position (joseki)","uc":"Unclear position","te":"Tesuji","bm":"Bad move","vbm":"Very bad move","do":"Doubtful move","it":"Interesting move","black to play":"Black to play","white to play":"White to play","ho":"Hotspot","confirm delete":"You've removed all properties from this position.\n\nDelete this position and all sub-positions?","position deleted":"Position deleted","dom error":"Error finding DOM container","error retrieving":"There was a problem retrieving the game data.","invalid data":"Received invalid game data","error board":"Error loading board container","unsaved changes":"There are unsaved changes in this game. You must save before you can permalink or download.","bad path":"Don't know how to get to path: ","gnugo thinking":"GNU Go is thinking..."};

eidogo.gameNodeIdCounter=100000;
eidogo.GameNode=function(){
this.init.apply(this,arguments);
};
eidogo.GameNode.prototype={init:function(_1,_2,id){
this._id=(typeof id!="undefined"?id:eidogo.gameNodeIdCounter++);
this._parent=_1||null;
this._children=[];
this._preferredChild=0;
if(_2){
this.loadJson(_2);
}
},pushProperty:function(_4,_5){
if(this[_4]){
if(!(this[_4] instanceof Array)){
this[_4]=[this[_4]];
}
if(!this[_4].contains(_5)){
this[_4].push(_5);
}
}else{
this[_4]=_5;
}
},hasPropertyValue:function(_6,_7){
if(!this[_6]){
return false;
}
var _8=(this[_6] instanceof Array?this[_6]:[this[_6]]);
return _8.contains(_7);
},deletePropertyValue:function(_9,_a){
var _b=(_a instanceof RegExp)?function(v){
return _a.test(v);
}:function(v){
return _a==v;
};
var _e=(_9 instanceof Array?_9:[_9]);
for(var i=0;_9=_e[i];i++){
if(this[_9] instanceof Array){
this[_9]=this[_9].filter(function(v){
return !_b(v);
});
if(!this[_9].length){
delete this[_9];
}
}else{
if(_b(this.prop)){
delete this[_9];
}
}
}
},loadJson:function(_11){
var _12=[_11],_13=[this];
var _14,_15;
var i,len;
while(_12.length){
_14=_12.pop();
_15=_13.pop();
_15.loadJsonNode(_14);
len=(_14._children?_14._children.length:0);
for(i=0;i<len;i++){
_12.push(_14._children[i]);
if(!_15._children[i]){
_15._children[i]=new eidogo.GameNode(_15);
}
_13.push(_15._children[i]);
}
}
},loadJsonNode:function(_18){
for(var _19 in _18){
if(_19=="_id"){
this[_19]=_18[_19].toString();
eidogo.gameNodeIdCounter=Math.max(eidogo.gameNodeIdCounter,parseInt(_18[_19],10));
continue;
}
if(_19.charAt(0)!="_"){
this[_19]=_18[_19];
}
}
},appendChild:function(_1a){
_1a._parent=this;
this._children.push(_1a);
},getProperties:function(){
var _1b={},_1c,_1d,_1e,_1f;
for(_1c in this){
isPrivate=(_1c.charAt(0)=="_");
_1e=(typeof this[_1c]=="string");
_1f=(this[_1c] instanceof Array);
if(!isPrivate&&(_1e||_1f)){
_1b[_1c]=this[_1c];
}
}
return _1b;
},walk:function(fn,_21){
var _22=[this];
var _23;
var i,len;
while(_22.length){
_23=_22.pop();
fn.call(_21||this,_23);
len=(_23._children?_23._children.length:0);
for(i=0;i<len;i++){
_22.push(_23._children[i]);
}
}
},getMove:function(){
if(typeof this.W!="undefined"){
return this.W;
}else{
if(typeof this.B!="undefined"){
return this.B;
}
}
return null;
},emptyPoint:function(_26){
var _27=this.getProperties();
var _28=null;
for(var _29 in _27){
if(_29=="AW"||_29=="AB"||_29=="AE"){
if(!(this[_29] instanceof Array)){
this[_29]=[this[_29]];
}
this[_29]=this[_29].filter(function(val){
if(val==_26){
_28=val;
return false;
}
return true;
});
if(!this[_29].length){
delete this[_29];
}
}else{
if((_29=="B"||_29=="W")&&this[_29]==_26){
_28=this[_29];
delete this[_29];
}
}
}
return _28;
},getPosition:function(){
if(!this._parent){
return null;
}
var _2b=this._parent._children;
for(var i=0;i<_2b.length;i++){
if(_2b[i]._id==this._id){
return i;
}
}
return null;
},toSgf:function(){
var sgf=(this._parent?"(":"");
var _2e=this;
function propsToSgf(_2f){
if(!_2f){
return "";
}
var sgf=";",key,val;
for(key in _2f){
if(_2f[key] instanceof Array){
val=_2f[key].map(function(val){
return val.toString().replace(/\]/g,"\\]");
}).join("][");
}else{
val=_2f[key].toString().replace(/\]/g,"\\]");
}
sgf+=key+"["+val+"]";
}
return sgf;
}
sgf+=propsToSgf(_2e.getProperties());
while(_2e._children.length==1){
_2e=_2e._children[0];
sgf+=propsToSgf(_2e.getProperties());
}
for(var i=0;i<_2e._children.length;i++){
sgf+=_2e._children[i].toSgf();
}
sgf+=(this._parent?")":"");
return sgf;
}};
eidogo.GameCursor=function(){
this.init.apply(this,arguments);
};
eidogo.GameCursor.prototype={init:function(_35){
this.node=_35;
},next:function(_36){
if(!this.hasNext()){
return false;
}
_36=(typeof _36=="undefined"||_36==null?this.node._preferredChild:_36);
this.node._preferredChild=_36;
this.node=this.node._children[_36];
return true;
},previous:function(){
if(!this.hasPrevious()){
return false;
}
this.node=this.node._parent;
return true;
},hasNext:function(){
return this.node&&this.node._children.length;
},hasPrevious:function(){
return this.node&&this.node._parent&&this.node._parent._parent;
},getNextMoves:function(){
if(!this.hasNext()){
return null;
}
var _37={};
var i,_39;
for(i=0;_39=this.node._children[i];i++){
_37[_39.getMove()]=i;
}
return _37;
},getNextColor:function(){
if(!this.hasNext()){
return null;
}
var i,_3b;
for(var i=0;_3b=this.node._children[i];i++){
if(_3b.W||_3b.B){
return _3b.W?"W":"B";
}
}
return null;
},getNextNodeWithVariations:function(){
var _3c=this.node;
while(_3c._children.length==1){
_3c=_3c._children[0];
}
return _3c;
},getPath:function(){
var n=this.node,_3e=[],mn=0;
while(n&&n._parent&&n._parent._children.length==1&&n._parent._parent){
mn++;
n=n._parent;
}
_3e.push(mn);
while(n){
if(n._parent&&(n._parent._children.length>1||!n._parent._parent)){
_3e.push(n.getPosition()||0);
}
n=n._parent;
}
return _3e.reverse();
},getPathMoves:function(){
var _40=[];
var cur=new eidogo.GameCursor(this.node);
_40.push(cur.node.getMove());
while(cur.previous()){
var _42=cur.node.getMove();
if(_42){
_40.push(_42);
}
}
return _40.reverse();
},getMoveNumber:function(){
var num=0,_44=this.node;
while(_44){
if(_44.W||_44.B){
num++;
}
_44=_44._parent;
}
return num;
},getMoveNumberFromCoord:function(_45){
var num=0,_47=this.node;
var _48;
var _49={a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8,j:9,k:10,l:11,m:12,n:13,o:14,p:15,q:16,r:17,s:18};
while(_47){
if(_47.W){
nodeCoord=_47.W;
}else{
if(_47.B){
nodeCoord=_47.B;
}else{
if(_47.FG){
return 0;
}else{
_47=_47._parent;
continue;
}
}
}
if(_45.x==_49[nodeCoord.charAt(0)]&&_45.y==_49[nodeCoord.charAt(1)]){
break;
}
_47=_47._parent;
}
while(_47){
if(_47.W||_47.B){
num++;
}
if(_47.FG){
num+=parseInt((_47.MN||"1"))-1;
break;
}
_47=_47._parent;
}
return num;
},getGameRoot:function(){
if(!this.node){
return null;
}
var cur=new eidogo.GameCursor(this.node);
if(!this.node._parent&&this.node._children.length){
return this.node._children[0];
}
while(cur.previous()){
}
return cur.node;
}};

eidogo.SgfParser=function(){
this.init.apply(this,arguments);
};
eidogo.SgfParser.prototype={init:function(_1,_2){
_2=(typeof _2=="function")?_2:null;
this.sgf=_1;
this.index=0;
this.root={_children:[]};
this.parseTree(this.root);
_2&&_2.call(this);
},parseTree:function(_3){
while(this.index<this.sgf.length){
var c=this.curChar();
this.index++;
switch(c){
case ";":
_3=this.parseNode(_3);
break;
case "(":
this.parseTree(_3);
break;
case ")":
return;
break;
}
}
},parseNode:function(_5){
var _6={_children:[]};
if(_5){
_5._children.push(_6);
}else{
this.root=_6;
}
_6=this.parseProperties(_6);
return _6;
},parseProperties:function(_7){
var _8="";
var _9=[];
var i=0;
while(this.index<this.sgf.length){
var c=this.curChar();
if(c==";"||c=="("||c==")"){
break;
}
if(this.curChar()=="["){
while(this.curChar()=="["){
this.index++;
_9[i]="";
while(this.curChar()!="]"&&this.index<this.sgf.length){
if(this.curChar()=="\\"){
this.index++;
while(this.curChar()=="\r"||this.curChar()=="\n"){
this.index++;
}
}
_9[i]+=this.curChar();
this.index++;
}
i++;
while(this.curChar()=="]"||this.curChar()=="\n"||this.curChar()=="\r"){
this.index++;
}
}
if(_7[_8]){
if(!(_7[_8] instanceof Array)){
_7[_8]=[_7[_8]];
}
_7[_8]=_7[_8].concat(_9);
}else{
_7[_8]=_9.length>1?_9:_9[0];
}
_8="";
_9=[];
i=0;
continue;
}
if(c!=" "&&c!="\n"&&c!="\r"&&c!="\t"){
_8+=c;
}
this.index++;
}
return _7;
},curChar:function(){
return this.sgf.charAt(this.index);
}};

eidogo.Board=function(){
this.init.apply(this,arguments);
};
eidogo.Board.prototype={WHITE:1,BLACK:-1,EMPTY:0,init:function(_1,_2){
this.boardSize=_2||19;
this.stones=this.makeBoardArray(this.EMPTY);
this.markers=this.makeBoardArray(this.EMPTY);
this.captures={};
this.captures.W=0;
this.captures.B=0;
this.cache=[];
this.renderer=_1||new eidogo.BoardRendererHtml();
this.lastRender={stones:this.makeBoardArray(null),markers:this.makeBoardArray(null)};
},reset:function(){
this.init(this.renderer,this.boardSize);
},clear:function(){
this.clearStones();
this.clearMarkers();
this.clearCaptures();
},clearStones:function(){
for(var i=0;i<this.stones.length;i++){
this.stones[i]=this.EMPTY;
}
},clearMarkers:function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i]=this.EMPTY;
}
},clearCaptures:function(){
this.captures.W=0;
this.captures.B=0;
},makeBoardArray:function(_5){
return [].setLength(this.boardSize*this.boardSize,_5);
},commit:function(){
this.cache.push({stones:this.stones.concat(),captures:{W:this.captures.W,B:this.captures.B}});
},rollback:function(){
if(this.cache.last()){
this.stones=this.cache.last().stones.concat();
this.captures.W=this.cache.last().captures.W;
this.captures.B=this.cache.last().captures.B;
}else{
this.clear();
}
},revert:function(_6){
_6=_6||1;
this.rollback();
for(var i=0;i<_6;i++){
this.cache.pop();
}
this.rollback();
},addStone:function(pt,_9){
this.stones[pt.y*this.boardSize+pt.x]=_9;
},getStone:function(pt){
return this.stones[pt.y*this.boardSize+pt.x];
},getRegion:function(t,l,w,h){
var _f=[].setLength(w*h,this.EMPTY);
var _10;
for(var y=t;y<t+h;y++){
for(var x=l;x<l+w;x++){
_10=(y-t)*w+(x-l);
_f[_10]=this.getStone({x:x,y:y});
}
}
return _f;
},addMarker:function(pt,_14){
this.markers[pt.y*this.boardSize+pt.x]=_14;
},getMarker:function(pt){
return this.markers[pt.y*this.boardSize+pt.x];
},render:function(_16){
var _17=this.makeBoardArray(null);
var _18=this.makeBoardArray(null);
var _19,_1a;
var len;
if(!_16&&this.cache.last()){
var _1c=this.cache.last();
len=this.stones.length;
for(var i=0;i<len;i++){
if(_1c.stones[i]!=this.lastRender.stones[i]){
_17[i]=_1c.stones[i];
}
}
_18=this.markers;
}else{
_17=this.stones;
_18=this.markers;
}
var _1e;
for(var x=0;x<this.boardSize;x++){
for(var y=0;y<this.boardSize;y++){
_1e=y*this.boardSize+x;
if(_18[_1e]!=null){
this.renderer.renderMarker({x:x,y:y},_18[_1e]);
this.lastRender.markers[_1e]=_18[_1e];
}
if(_17[_1e]==null){
continue;
}else{
if(_17[_1e]==this.EMPTY){
_19="empty";
}else{
_19=(_17[_1e]==this.WHITE?"white":"black");
}
}
this.renderer.renderStone({x:x,y:y},_19);
this.lastRender.stones[_1e]=_17[_1e];
}
}
}};
eidogo.BoardRendererHtml=function(){
this.init.apply(this,arguments);
};
eidogo.BoardRendererHtml.prototype={init:function(_21,_22,_23,_24){
if(!_21){
throw "No DOM container";
return;
}
this.boardSize=_22||19;
var _25=document.createElement("div");
_25.className="board-gutter"+(this.boardSize==19?" with-coords":"");
_21.appendChild(_25);
var _26=document.createElement("div");
_26.className="board size"+this.boardSize;
_26.style.position=(_24&&eidogo.browser.ie?"static":"relative");
_25.appendChild(_26);
this.domNode=_26;
this.domGutter=_25;
this.domContainer=_21;
this.player=_23;
this.uniq=_21.id+"-";
this.renderCache={stones:[].setLength(this.boardSize,0).addDimension(this.boardSize,0),markers:[].setLength(this.boardSize,0).addDimension(this.boardSize,0)};
this.pointWidth=0;
this.pointHeight=0;
this.margin=0;
var _27=this.renderStone({x:0,y:0},"black");
this.pointWidth=this.pointHeight=_27.offsetWidth;
this.renderStone({x:0,y:0},"white");
this.renderMarker({x:0,y:0},"current");
this.clear();
this.margin=(this.domNode.offsetWidth-(this.boardSize*this.pointWidth))/2;
this.scrollX=0;
this.scrollY=0;
if(_24){
this.crop(_24);
if(eidogo.browser.ie){
var _28=this.domNode.parentNode;
while(_28&&_28.tagName&&!/^body|html$/i.test(_28.tagName)){
this.scrollX+=_28.scrollLeft;
this.scrollY+=_28.scrollTop;
_28=_28.parentNode;
}
}
}
this.dom={};
this.dom.searchRegion=document.createElement("div");
this.dom.searchRegion.id=this.uniq+"search-region";
this.dom.searchRegion.className="search-region";
this.domNode.appendChild(this.dom.searchRegion);
eidogo.util.addEvent(this.domNode,"mousemove",this.handleHover,this,true);
eidogo.util.addEvent(this.domNode,"mousedown",this.handleMouseDown,this,true);
eidogo.util.addEvent(this.domNode,"mouseup",this.handleMouseUp,this,true);
},showRegion:function(_29){
this.dom.searchRegion.style.top=(this.margin+this.pointHeight*_29[0])+"px";
this.dom.searchRegion.style.left=(this.margin+this.pointWidth*_29[1])+"px";
this.dom.searchRegion.style.width=this.pointWidth*_29[2]+"px";
this.dom.searchRegion.style.height=this.pointHeight*_29[3]+"px";
eidogo.util.show(this.dom.searchRegion);
},hideRegion:function(){
eidogo.util.hide(this.dom.searchRegion);
},clear:function(){
this.domNode.innerHTML="";
},renderStone:function(pt,_2b){
var _2c=document.getElementById(this.uniq+"stone-"+pt.x+"-"+pt.y);
if(_2c){
_2c.parentNode.removeChild(_2c);
}
if(_2b!="empty"){
var div=document.createElement("div");
div.id=this.uniq+"stone-"+pt.x+"-"+pt.y;
div.className="point stone "+_2b;
try{
div.style.left=(pt.x*this.pointWidth+this.margin-this.scrollX)+"px";
div.style.top=(pt.y*this.pointHeight+this.margin-this.scrollY)+"px";
if(this.player.prefs.showMoveNumber){
var _2e=this.player.cursor.getMoveNumberFromCoord(pt);
if(_2e!=0){
if(_2b=="black"){
div.style.color="white";
}
if(_2b=="white"){
div.style.color="black";
}
div.style.textAlign="center";
div.style.lineHeight="19px";
div.innerHTML=_2e;
}
}
}
catch(e){
}
this.domNode.appendChild(div);
return div;
}
return null;
},renderMarker:function(pt,_30){
if(this.renderCache.markers[pt.x][pt.y]){
var _31=document.getElementById(this.uniq+"marker-"+pt.x+"-"+pt.y);
if(_31){
_31.parentNode.removeChild(_31);
}
}
if(_30=="empty"||!_30){
this.renderCache.markers[pt.x][pt.y]=0;
return null;
}
this.renderCache.markers[pt.x][pt.y]=1;
if(_30){
var _32="";
switch(_30){
case "triangle":
case "square":
case "circle":
case "ex":
case "territory-white":
case "territory-black":
case "dim":
case "current":
break;
default:
if(_30.indexOf("var:")==0){
_32=_30.substring(4);
_30="variation";
}else{
_32=_30;
_30="label";
}
break;
}
var div=document.createElement("div");
div.id=this.uniq+"marker-"+pt.x+"-"+pt.y;
div.className="point marker "+_30;
try{
div.style.left=(pt.x*this.pointWidth+this.margin-this.scrollX)+"px";
div.style.top=(pt.y*this.pointHeight+this.margin-this.scrollY)+"px";
}
catch(e){
}
div.appendChild(document.createTextNode(_32));
this.domNode.appendChild(div);
return div;
}
return null;
},setCursor:function(_34){
this.domNode.style.cursor=_34;
},handleHover:function(e){
var xy=this.getXY(e);
this.player.handleBoardHover(xy[0],xy[1],xy[2],xy[3],e);
},handleMouseDown:function(e){
var xy=this.getXY(e);
this.player.handleBoardMouseDown(xy[0],xy[1],xy[2],xy[3],e);
},handleMouseUp:function(e){
var xy=this.getXY(e);
this.player.handleBoardMouseUp(xy[0],xy[1]);
},getXY:function(e){
var _3c=eidogo.util.getElClickXY(e,this.domNode);
var m=this.margin;
var pw=this.pointWidth;
var ph=this.pointHeight;
var x=Math.round((_3c[0]-m-(pw/2))/pw);
var y=Math.round((_3c[1]-m-(ph/2))/ph);
return [x,y,_3c[0],_3c[1]];
},crop:function(_42){
eidogo.util.addClass(this.domContainer,"shrunk");
this.domGutter.style.overflow="hidden";
var _43=_42.width*this.pointWidth+(this.margin*2);
var _44=_42.height*this.pointHeight+(this.margin*2);
this.domGutter.style.width=_43+"px";
this.domGutter.style.height=_44+"px";
this.player.dom.player.style.width=_43+"px";
this.domGutter.scrollLeft=_42.left*this.pointWidth;
this.domGutter.scrollTop=_42.top*this.pointHeight;
}};
eidogo.BoardRendererFlash=function(){
this.init.apply(this,arguments);
};
eidogo.BoardRendererFlash.prototype={init:function(_45,_46,_47,_48){
if(!_45){
throw "No DOM container";
return;
}
this.ready=false;
this.swf=null;
this.unrendered=[];
var _49=_45.id+"-board";
var so=new SWFObject(eidogo.playerPath+"/swf/board.swf",_49,"421","421","8","#665544");
so.addParam("allowScriptAccess","sameDomain");
so.write(_45);
var _4b=0;
var _4c=function(){
swf=eidogo.util.byId(_49);
if(!swf||!swf.init){
if(_4b>2000){
throw "Error initializing board";
return;
}
setTimeout(arguments.callee.bind(this),10);
_4b+=10;
return;
}
this.swf=swf;
this.swf.init(_47.uniq,_46);
this.ready=true;
}.bind(this);
_4c();
},showRegion:function(_4d){
},hideRegion:function(){
},clear:function(){
if(!this.swf){
return;
}
this.swf.clear();
},renderStone:function(pt,_4f){
if(!this.swf){
this.unrendered.push(["stone",pt,_4f]);
return;
}
for(var i=0;i<this.unrendered.length;i++){
if(this.unrendered[i][0]=="stone"){
this.swf.renderStone(this.unrendered[i][1],this.unrendered[i][2]);
}
}
this.unrendered=[];
this.swf.renderStone(pt,_4f);
},renderMarker:function(pt,_52){
if(!_52){
return;
}
if(!this.swf){
this.unrendered.push(["marker",pt,_52]);
return;
}
for(var i=0;i<this.unrendered.length;i++){
if(this.unrendered[i][0]=="marker"){
this.swf.renderMarker(this.unrendered[i][1],this.unrendered[i][2]);
}
}
this.unrendered=[];
this.swf.renderMarker(pt,_52);
},setCursor:function(_54){
},crop:function(){
}};
eidogo.BoardRendererAscii=function(_55,_56){
this.init(_55,_56);
};
eidogo.BoardRendererAscii.prototype={pointWidth:2,pointHeight:1,margin:1,blankBoard:"+-------------------------------------+\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"|. . . . . . . . . . . . . . . . . . .|\n"+"+-------------------------------------+",init:function(_57,_58){
this.domNode=_57||null;
this.boardSize=_58||19;
this.content=this.blankBoard;
},clear:function(){
this.content=this.blankBoard;
this.domNode.innerHTML="<pre>"+this.content+"</pre>";
},renderStone:function(pt,_5a){
var _5b=(this.pointWidth*this.boardSize+this.margin*2)*(pt.y*this.pointHeight+1)+(pt.x*this.pointWidth)+2;
this.content=this.content.substring(0,_5b-1)+"."+this.content.substring(_5b);
if(_5a!="empty"){
this.content=this.content.substring(0,_5b-1)+(_5a=="white"?"O":"#")+this.content.substring(_5b);
}
this.domNode.innerHTML="<pre>"+this.content+"</pre>";
},renderMarker:function(pt,_5d){
}};

eidogo.Rules=function(_1){
this.init(_1);
};
eidogo.Rules.prototype={init:function(_2){
this.board=_2;
this.pendingCaptures=[];
},check:function(pt,_4){
if(this.board.getStone(pt)!=this.board.EMPTY){
return false;
}
return true;
},apply:function(pt,_6){
this.doCaptures(pt,_6);
},doCaptures:function(pt,_8){
var _9=0;
_9+=this.doCapture({x:pt.x-1,y:pt.y},_8);
_9+=this.doCapture({x:pt.x+1,y:pt.y},_8);
_9+=this.doCapture({x:pt.x,y:pt.y-1},_8);
_9+=this.doCapture({x:pt.x,y:pt.y+1},_8);
_9-=this.doCapture(pt,-_8);
if(_9<0){
_8=-_8;
_9=-_9;
}
_8=_8==this.board.WHITE?"W":"B";
this.board.captures[_8]+=_9;
},doCapture:function(pt,_b){
this.pendingCaptures=[];
if(this.findCaptures(pt,_b)){
return 0;
}
var _c=this.pendingCaptures.length;
while(this.pendingCaptures.length){
this.board.addStone(this.pendingCaptures.pop(),this.board.EMPTY);
}
return _c;
},findCaptures:function(pt,_e){
if(pt.x<0||pt.y<0||pt.x>=this.board.boardSize||pt.y>=this.board.boardSize){
return 0;
}
if(this.board.getStone(pt)==_e){
return 0;
}
if(this.board.getStone(pt)==this.board.EMPTY){
return 1;
}
for(var i=0;i<this.pendingCaptures.length;i++){
if(this.pendingCaptures[i].x==pt.x&&this.pendingCaptures[i].y==pt.y){
return 0;
}
}
this.pendingCaptures.push(pt);
if(this.findCaptures({x:pt.x-1,y:pt.y},_e)){
return 1;
}
if(this.findCaptures({x:pt.x+1,y:pt.y},_e)){
return 1;
}
if(this.findCaptures({x:pt.x,y:pt.y-1},_e)){
return 1;
}
if(this.findCaptures({x:pt.x,y:pt.y+1},_e)){
return 1;
}
return 0;
}};

(function(){
var t=eidogo.i18n,_2=eidogo.util.byId,_3=eidogo.util.ajax,_4=eidogo.util.addEvent,_5=eidogo.util.onClick,_6=eidogo.util.getElClickXY,_7=eidogo.util.stopEvent,_8=eidogo.util.addClass,_9=eidogo.util.removeClass,_a=eidogo.util.show,_b=eidogo.util.hide,_c=eidogo.browser.moz,_d=eidogo.util.getPlayerPath();
eidogo.players=eidogo.players||{};
eidogo.delegate=function(_e,fn){
var _10=eidogo.players[_e];
_10[fn].apply(_10,Array.from(arguments).slice(2));
};
eidogo.Player=function(){
this.init.apply(this,arguments);
};
eidogo.Player.prototype={init:function(cfg){
cfg=cfg||{};
this.mode=cfg.mode?cfg.mode:"play";
this.dom={};
this.dom.container=(typeof cfg.container=="string"?_2(cfg.container):cfg.container);
if(!this.dom.container){
alert(t["dom error"]);
return;
}
this.uniq=(new Date()).getTime();
eidogo.players[this.uniq]=this;
this.sgfPath=cfg.sgfPath;
this.searchUrl=cfg.searchUrl;
this.showingSearch=false;
this.saveUrl=cfg.saveUrl;
this.downloadUrl=cfg.downloadUrl;
this.scoreEstUrl=cfg.scoreEstUrl;
this.hooks=cfg.hooks||{};
this.permalinkable=!!this.hooks.setPermalink;
this.propertyHandlers={W:this.playMove,B:this.playMove,KO:this.playMove,MN:this.setMoveNumber,FG:this.careCurrentColor,AW:this.addStone,AB:this.addStone,AE:this.addStone,CR:this.addMarker,LB:this.addMarker,TR:this.addMarker,MA:this.addMarker,SQ:this.addMarker,TW:this.addMarker,TB:this.addMarker,DD:this.addMarker,PL:this.setColor,C:this.showComments,N:this.showAnnotation,GB:this.showAnnotation,GW:this.showAnnotation,DM:this.showAnnotation,HO:this.showAnnotation,UC:this.showAnnotation,V:this.showAnnotation,BM:this.showAnnotation,DO:this.showAnnotation,IT:this.showAnnotation,TE:this.showAnnotation,BL:this.showTime,OB:this.showTime,WL:this.showTime,OW:this.showTime};
this.infoLabels={GN:t["game"],PW:t["white"],WR:t["white rank"],WT:t["white team"],PB:t["black"],BR:t["black rank"],BT:t["black team"],HA:t["handicap"],KM:t["komi"],RE:t["result"],DT:t["date"],GC:t["info"],PC:t["place"],EV:t["event"],RO:t["round"],OT:t["overtime"],ON:t["opening"],RU:t["ruleset"],AN:t["annotator"],CP:t["copyright"],SO:t["source"],TM:t["time limit"],US:t["transcriber"],AP:t["created with"]};
this.months=[t["january"],t["february"],t["march"],t["april"],t["may"],t["june"],t["july"],t["august"],t["september"],t["october"],t["november"],t["december"]];
this.theme=cfg.theme;
this.reset(cfg);
this.renderer=cfg.renderer||"html";
this.cropParams=null;
this.shrinkToFit=cfg.shrinkToFit;
if(this.shrinkToFit||cfg.cropWidth||cfg.cropHeight){
this.cropParams={};
this.cropParams.width=cfg.cropWidth;
this.cropParams.height=cfg.cropHeight;
this.cropParams.left=cfg.cropLeft;
this.cropParams.top=cfg.cropTop;
this.cropParams.padding=cfg.cropPadding||1;
}
this.constructDom();
if(cfg.enableShortcuts){
_4(document,_c?"keypress":"keydown",this.handleKeypress,this,true);
}
_4(document,"mouseup",this.handleDocMouseUp,this,true);
if(cfg.sgf||cfg.sgfUrl||(cfg.sgfPath&&cfg.gameName)){
this.loadSgf(cfg);
}
this.hook("initDone");
},hook:function(_12,_13){
if(_12 in this.hooks){
return this.hooks[_12].bind(this)(_13);
}
},reset:function(cfg){
this.gameName="";
this.collectionRoot=new eidogo.GameNode();
this.cursor=new eidogo.GameCursor();
this.progressiveLoad=cfg.progressiveLoad?true:false;
this.progressiveLoads=null;
this.progressiveUrl=null;
this.progressiveMode=cfg.progressiveLoad&&cfg.progressiveMode||"id";
this.opponentUrl=null;
this.opponentColor=null;
this.opponentLevel=null;
this.board=null;
this.rules=null;
this.currentColor=null;
this.moveNumber=null;
this.totalMoves=null;
this.variations=null;
this.timeB="";
this.timeW="";
this.regionTop=null;
this.regionLeft=null;
this.regionWidth=null;
this.regionHeight=null;
this.regionBegun=null;
this.regionClickSelect=null;
this.mouseDown=null;
this.mouseDownX=null;
this.mouseDownY=null;
this.mouseDownClickX=null;
this.mouseDownClickY=null;
this.labelLastLetter=null;
this.labelLastNumber=null;
this.resetLastLabels();
this.unsavedChanges=false;
this.updatedNavTree=false;
this.navTreeTimeout=null;
this.searching=false;
this.editingText=false;
this.goingBack=false;
this.problemMode=cfg.problemMode;
this.problemColor=cfg.problemColor;
this.prefs={};
this.prefs.markCurrent=typeof cfg.markCurrent!="undefined"?!!cfg.markCurrent:true;
this.prefs.markNext=typeof cfg.markNext!="undefined"?cfg.markNext:false;
this.prefs.markVariations=typeof cfg.markVariations!="undefined"?!!cfg.markVariations:true;
this.prefs.showGameInfo=!!cfg.showGameInfo;
this.prefs.showPlayerInfo=!!cfg.showPlayerInfo;
this.prefs.showTools=!!cfg.showTools;
this.prefs.showComments=typeof cfg.showComments!="undefined"?!!cfg.showComments:true;
this.prefs.showOptions=!!cfg.showOptions;
this.prefs.showNavTree=!this.progressiveLoad&&typeof cfg.showNavTree!="undefined"?!!cfg.showNavTree:false;
this.prefs.showMoveNumber=!!cfg.showMoveNumber;
},loadSgf:function(cfg,_16){
cfg=cfg||{};
this.nowLoading();
this.reset(cfg);
this.sgfPath=cfg.sgfPath||this.sgfPath;
this.loadPath=cfg.loadPath&&cfg.loadPath.length>1?cfg.loadPath:[0,0];
this.gameName=cfg.gameName||"";
var _17=false;
if(typeof cfg.sgf=="string"){
var sgf=new eidogo.SgfParser(cfg.sgf);
this.load(sgf.root);
}else{
if(typeof cfg.sgf=="object"){
this.load(cfg.sgf);
}else{
if(cfg.progressiveLoad&&cfg.progressiveUrl){
this.progressiveLoads=0;
this.progressiveUrl=cfg.progressiveUrl;
this.fetchProgressiveData(_16);
_17=true;
}else{
if(typeof cfg.sgfUrl=="string"||this.gameName){
if(!cfg.sgfUrl){
cfg.sgfUrl=this.sgfPath+this.gameName+".sgf";
}
this.remoteLoad(cfg.sgfUrl,null,false,null,_16);
_17=true;
if(cfg.progressiveLoad){
this.progressiveLoads=0;
this.progressiveUrl=cfg.progressiveUrl||cfg.sgfUrl.replace(/\?.+$/,"");
}
}else{
var _19=cfg.boardSize||"19";
var _1a={19:6.5,13:4.5,9:3.5,7:2.5};
var _1b={_children:[{SZ:_19,KM:cfg.komi||_1a[_19]||6.5,_children:[]}]};
if(cfg.opponentUrl){
this.gameName="gnugo";
this.opponentUrl=cfg.opponentUrl;
this.opponentColor=cfg.opponentColor=="B"?cfg.opponentColor:"W";
this.opponentLevel=cfg.opponentLevel||7;
var _1c=_1b._children[0];
_1c.PW=this.opponentColor=="B"?t["you"]:"GNU Go";
_1c.PB=this.opponentColor=="B"?"GNU Go":t["you"];
_1c.HA=parseInt(cfg.handicap,10)||0;
if(_1c.HA){
var _1d={19:[["pd","dp"],["pd","dp","pp"],["pd","dp","pp","dd"],["pd","dp","pp","dd","jj"],["pd","dp","pp","dd","dj","pj"],["pd","dp","pp","dd","dj","pj","jj"],["pd","dp","pp","dd","dj","pj","jd","jp"],["pd","dp","pp","dd","dj","pj","jd","jp","jj"]],13:[["jd","dj"],["jd","dj","jj"],["jd","dj","jj","dd"],["jd","dj","jj","dd","gg"],["jd","dj","jj","dd","dg","jg"],["jd","dj","jj","dd","dg","jg","gg"],["jd","dj","jj","dd","dg","jg","gd","gj"],["jd","dj","jj","dd","dg","jg","gd","gj","gg"]],9:[["cg","gc"],["cg","gc","gg"],["cg","gc","gg","cc"],["cg","gc","gg","cc","ee"],["cg","gc","gg","cc","ce","ge"],["cg","gc","gg","cc","ce","ge","ee"],["cg","gc","gg","cc","ce","ge","ec","eg"],["cg","gc","gg","cc","ce","ge","ec","eg","ee"]]};
_1c.KM=0.5;
if(_1c.HA>1){
_1c.AB=_1d[_19][_1c.HA-2];
}
}
}
this.load(_1b);
}
}
}
}
if(!_17&&typeof _16=="function"){
_16();
}
},load:function(_1e,_1f){
var _20=false;
if(!_1f){
_1f=new eidogo.GameNode();
this.collectionRoot=_1f;
}
_1f.loadJson(_1e);
_1f._cached=true;
this.doneLoading();
this.progressiveLoads--;
if(!_1f._parent){
var _21=this.loadPath.length?parseInt(this.loadPath[0],10):0;
this.initGame(_1f._children[_21||0]);
_20=true;
}
if(this.loadPath.length){
this.goTo(this.loadPath,_20);
if(!this.progressiveLoad){
this.loadPath=[0,0];
}
}else{
this.refresh();
}
if(_20&&this.problemMode){
if(!this.problemColor){
this.currentColor=this.problemColor=(this.cursor.getNextColor()||"B");
}else{
this.currentColor=this.problemColor;
}
}
},remoteLoad:function(url,_23,_24,_25,_26){
_24=_24=="undefined"?true:_24;
_26=(typeof _26=="function")?_26:null;
if(_24){
if(!_23){
this.gameName=url;
}
url=this.sgfPath+url+".sgf";
}
if(_25){
this.loadPath=_25;
}
var _27=function(req){
var _29=req.responseText.replace(/^( |\t|\r|\n)*/,"");
if(_29.charAt(0)=="("){
var me=this;
var sgf=new eidogo.SgfParser(_29,function(){
me.load(this.root,_23);
_26&&_26();
});
}else{
if(_29.charAt(0)=="{"){
_29=eval("("+_29+")");
this.load(_29,_23);
_26&&_26();
}else{
this.croak(t["invalid data"]);
}
}
};
var _2c=function(req){
this.croak(t["error retrieving"]);
};
_3("get",url,null,_27,_2c,this,30000);
},initGame:function(_2e){
_2e=_2e||{};
this.handleDisplayPrefs();
var _2f=_2e.SZ||19;
if(_2f!=7&&_2f!=9&&_2f!=13&&_2f!=19){
_2f=19;
}
if(this.shrinkToFit){
this.calcShrinkToFit(_2e,_2f);
}else{
if(this.problemMode&&!this.cropParams){
this.cropParams={width:_2f,height:_2f,top:0,left:0,padding:1};
}
}
if(!this.board){
this.createBoard(_2f);
this.rules=new eidogo.Rules(this.board);
}
this.unsavedChanges=false;
this.resetCursor(true);
this.totalMoves=0;
var _30=new eidogo.GameCursor(this.cursor.node);
while(_30.next()){
this.totalMoves++;
}
this.totalMoves--;
this.showGameInfo(_2e);
this.enableNavSlider();
this.selectTool(this.mode=="view"?"view":"play");
this.hook("initGame");
},handleDisplayPrefs:function(){
(this.prefs.showGameInfo||this.prefs.showPlayerInfo?_a:_b)(this.dom.info);
(this.prefs.showGameInfo?_a:_b)(this.dom.infoGame);
(this.prefs.showPlayerInfo?_a:_b)(this.dom.infoPlayers);
(this.prefs.showTools?_a:_b)(this.dom.toolsContainer);
if(!this.showingSearch){
(this.prefs.showComments?_a:_b)(this.dom.comments);
}
(this.prefs.showOptions?_a:_b)(this.dom.options);
(this.prefs.showNavTree?_a:_b)(this.dom.navTreeContainer);
},createBoard:function(_31){
_31=_31||19;
if(this.board&&this.board.renderer&&this.board.boardSize==_31){
return;
}
try{
this.dom.boardContainer.innerHTML="";
var _32=(this.renderer=="flash"?eidogo.BoardRendererFlash:eidogo.BoardRendererHtml);
var _33=new _32(this.dom.boardContainer,_31,this,this.cropParams);
this.board=new eidogo.Board(_33,_31);
}
catch(e){
if(e=="No DOM container"){
this.croak(t["error board"]);
return;
}
}
},calcShrinkToFit:function(_34,_35){
var l=null,t=null,r=null,b=null;
var _39={};
var me=this;
_34.walk(function(_3b){
var _3c,i,_3e;
for(_3c in _3b){
if(/^(W|B|AW|AB|LB)$/.test(_3c)){
_3e=_3b[_3c];
if(!(_3e instanceof Array)){
_3e=[_3e];
}
if(_3c!="LB"){
_3e=me.expandCompressedPoints(_3e);
}else{
_3e=[_3e[0].split(/:/)[0]];
}
for(i=0;i<_3e.length;i++){
_39[_3e[i]]="";
}
}
}
});
for(var key in _39){
var pt=this.sgfCoordToPoint(key);
if(l==null||pt.x<l){
l=pt.x;
}
if(r==null||pt.x>r){
r=pt.x;
}
if(t==null||pt.y<t){
t=pt.y;
}
if(b==null||pt.y>b){
b=pt.y;
}
}
this.cropParams.width=r-l+1;
this.cropParams.height=b-t+1;
this.cropParams.left=l;
this.cropParams.top=t;
var pad=this.cropParams.padding;
for(var _42=pad;l-_42<0;_42--){
}
if(_42){
this.cropParams.width+=_42;
this.cropParams.left-=_42;
}
for(var _43=pad;t-_43<0;_43--){
}
if(_43){
this.cropParams.height+=_43;
this.cropParams.top-=_43;
}
for(var _44=pad;r+_44>_35;_44--){
}
if(_44){
this.cropParams.width+=_44;
}
for(var _45=pad;b+_45>_35;_45--){
}
if(_45){
this.cropParams.height+=_45;
}
},fetchOpponentMove:function(){
this.nowLoading(t["gnugo thinking"]);
var _46=function(req){
this.doneLoading();
this.createMove(req.responseText);
};
var _48=function(req){
this.croak(t["error retrieving"]);
};
var _4a=this.cursor.getGameRoot();
var _4b={sgf:_4a.toSgf(),move:this.currentColor,size:_4a.SZ,level:this.opponentLevel};
_3("post",this.opponentUrl,_4b,_46,_48,this,45000);
},fetchScoreEstimate:function(_4c,_4d){
this.nowLoading(t["gnugo thinking"]);
var _4e=function(req){
this.doneLoading();
var _50=req.responseText.split("\n");
var _51,_52=_50[1].split(" ");
for(var i=0;i<_52.length;i++){
_51=_52[i].split(":");
if(_51[1]){
this.addMarker(_51[1],_51[0]);
}
}
this.board.render();
this.prependComment(_50[0]);
if(_4d){
_4d();
}
this.trigger("eidogo-rendered");
};
var _54=function(req){
this.croak(t["error retrieving"]);
if(_4d){
_4d();
}
};
var _56=this.cursor.getGameRoot();
var _57={sgf:_56.toSgf(),move:"est",size:_56.SZ||19,komi:_56.KM||0,mn:this.moveNumber+1};
if(_4c){
_57.method=_4c;
}
_3("post",this.scoreEstUrl,_57,_4e,_54,this,45000);
},playProblemResponse:function(_58){
setTimeout(function(){
this.variation(null,_58);
if(this.hooks.playProblemResponse){
this.hook("playProblemResponse");
}else{
if(!this.cursor.hasNext()){
this.prependComment(t["end of variation"]);
}
}
}.bind(this),200);
},goTo:function(_59,_5a){
_5a=typeof _5a!="undefined"?_5a:true;
if(_5a&&_59.length>1&&_59[1]!=this.cursor.getGameRoot().getPosition()){
this.updatedNavTree=false;
}
if(_5a){
this.resetCursor(true);
}
var _5b=parseInt(_59,10);
if(!(_59 instanceof Array)&&!isNaN(_5b)){
if(_5a){
_5b++;
}
for(var i=0;i<_5b;i++){
this.variation(null,true);
}
this.refresh();
return;
}
if(!(_59 instanceof Array)||!_59.length){
alert(t["bad path"]+" "+_59);
return;
}
var _5d;
var _5e;
if(isNaN(parseInt(_59[0],10))){
if(!this.cursor.node._parent){
this.variation(0,true);
}
while(_59.length){
if(this.progressiveLoads>0){
this.loadPath.push(_5d);
return;
}
_5d=_59.shift();
_5e=this.getVariations();
for(var i=0;i<_5e.length;i++){
if(_5e[i].move==_5d){
this.variation(_5e[i].varNum,true);
break;
}
}
}
this.refresh();
return;
}
var _5f=true;
while(_59.length){
_5d=parseInt(_59.shift(),10);
if(_59.length==0){
if(_5a){
_5d++;
}
for(var i=0;i<_5d;i++){
this.variation(0,true);
}
}else{
if(!_5f){
this.variation(_5d,true);
if(_59.length>1){
while(this.cursor.node._children.length==1){
this.variation(0,true);
}
}
}
}
_5f=false;
}
this.refresh();
},resetCursor:function(_60,_61){
this.board.reset();
this.resetCurrentColor();
if(_61){
this.cursor.node=this.cursor.getGameRoot();
}else{
this.cursor.node=this.collectionRoot;
}
this.refresh(_60);
},resetCurrentColor:function(){
this.currentColor=(this.problemMode?this.problemColor:"B");
var _62=this.cursor.getGameRoot();
if(_62&&_62.HA>1){
this.currentColor="W";
}
},refresh:function(_63){
if(this.progressiveLoads>0){
var me=this;
setTimeout(function(){
me.refresh.call(me);
},10);
return;
}
this.board.revert(1);
this.execNode(_63);
},variation:function(_65,_66){
if(this.cursor.next(_65)){
this.execNode(_66);
this.resetLastLabels();
if(this.progressiveLoads>0){
return false;
}
return true;
}
return false;
},execNode:function(_67,_68){
if(!_68&&this.progressiveLoads>0){
var me=this;
setTimeout(function(){
me.execNode.call(me,_67);
},10);
return;
}
if(!this.cursor.node){
return;
}
if(!_67){
this.dom.comments.innerHTML="";
this.board.clearMarkers();
this.moveNumber=this.cursor.getMoveNumber();
}
if(this.moveNumber<1){
this.resetCurrentColor();
}
var _6a=this.cursor.node.getProperties();
for(var _6b in _6a){
if(this.propertyHandlers[_6b]){
(this.propertyHandlers[_6b]).apply(this,[this.cursor.node[_6b],_6b,_67]);
}
}
if(_67){
this.board.commit();
}else{
if(this.opponentUrl&&this.opponentColor==this.currentColor&&this.moveNumber==this.totalMoves){
this.fetchOpponentMove();
}
this.findVariations();
this.updateControls();
this.board.commit();
this.board.render();
this.trigger("eidogo-rendered");
}
if(!_68&&this.progressiveUrl){
this.fetchProgressiveData();
}
if(this.problemMode&&this.currentColor&&this.currentColor!=this.problemColor&&!this.goingBack){
this.playProblemResponse(_67);
}
this.goingBack=false;
},fetchProgressiveData:function(_6c){
var _6d=this.cursor.node||null;
if(_6d&&_6d._cached){
return;
}
if(this.progressiveMode=="pattern"){
if(_6d&&!_6d._parent._parent){
return;
}
this.fetchProgressiveContinuations(_6c);
}else{
var _6e=(_6d&&_6d._id)||0;
this.nowLoading();
this.progressiveLoads++;
var _6f=function(){
var _70=this.cursor.getMoveNumber();
if(_70>1){
this.cursor.node.C="<a id='cont-search' href='#'>"+t["show games"]+"</a>"+(this.cursor.node.C||"");
}
this.refresh();
if(_6c&&typeof _6c=="function"){
_6c();
}
_4(_2("cont-search"),"click",function(e){
var _72=8;
var _73=this.board.getRegion(0,19-_72,_72,_72);
var _74=this.convertRegionPattern(_73);
this.loadSearch("ne",_72+"x"+_72,this.compressPattern(_74));
_7(e);
}.bind(this));
}.bind(this);
var url=this.progressiveUrl+"?"+eidogo.util.makeQueryString({id:_6e,pid:this.uniq});
this.remoteLoad(url,_6d,false,null,_6f);
}
},fetchProgressiveContinuations:function(_76){
this.nowLoading();
this.progressiveLoads++;
var _77=this.cursor.getMoveNumber();
var _78=(_77>1?11:7);
var _79=19-_78-1;
var _7a=this.board?this.convertRegionPattern(this.board.getRegion(0,_79+1,_78,_78)):".................................................";
var _7b={q:"ne",w:_78,h:_78,p:_7a,a:"continuations",t:(new Date()).getTime()};
var _7c=function(req){
this.croak(t["error retrieving"]);
};
var _7e=function(req){
if(!req.responseText||req.responseText=="NONE"){
this.progressiveLoads--;
this.doneLoading();
this.cursor.node._cached=true;
this.refresh();
return;
}
var _80={LB:[],_children:[]},_81;
_80.C=_77>1?"<a id='cont-search' href='#'>"+t["show games"]+"</a>":"";
var _82,_83=eval("("+req.responseText+")");
if(_83.length){
_83.sort(function(a,b){
return parseInt(b.count,10)-parseInt(a.count,10);
});
var _86=parseInt(_83[0].count,10);
var x,y,_89,_8a;
_80.C+="<div class='continuations'>";
for(var i=0;_82=_83[i];i++){
_8a=parseInt(_82.count/_86*150);
if(_86>20&&parseInt(_82.count,10)<10){
continue;
}
_81={};
x=_79+parseInt(_82.x,10)+1;
y=parseInt(_82.y,10);
_89=this.pointToSgfCoord({x:x,y:y});
_81[this.currentColor||"B"]=_89;
_80.LB.push(_89+":"+_82.label);
if(_8a){
_80.C+="<div class='continuation'>"+"<div class='cont-label'>"+_82.label+"</div>"+"<div class='cont-bar' style='width: "+_8a+"px'></div>"+"<div class='cont-count'>"+_82.count+"</div>"+"</div>";
}
_80._children.push(_81);
}
_80.C+="</div>";
if(!this.cursor.node){
_80={_children:[_80]};
}
}
this.load(_80,this.cursor.node);
_4(_2("cont-search"),"click",function(e){
this.loadSearch("ne",_78+"x"+_78,this.compressPattern(_7a));
_7(e);
}.bind(this));
if(_76&&typeof _76=="function"){
_76();
}
}.bind(this);
_3("get",this.progressiveUrl,_7b,_7e,_7c,this,45000);
},findVariations:function(){
this.variations=this.getVariations();
},getVariations:function(){
var _8d=[],_8e=this.cursor.node._children;
for(var i=0;i<_8e.length;i++){
_8d.push({move:_8e[i].getMove(),varNum:i});
}
return _8d;
},back:function(e,obj,_92){
if(!this.cursor.node.FG&&this.cursor.previous()){
this.board.revert(1);
this.goingBack=true;
this.refresh(_92);
this.resetLastLabels();
}
},forward:function(e,obj,_95){
this.variation(null,_95);
},first:function(){
var _96;
if(this.cursor.node.FG||!this.cursor.hasPrevious()){
return;
}
_96=this.cursor.node;
while(_96&&!_96.FG){
_96=_96._parent;
}
if(_96){
while(!this.cursor.node.FG){
this.back(null,null,true);
}
this.refresh();
}else{
this.resetCursor(false,true);
}
},last:function(){
if(!this.cursor.hasNext()){
return;
}
while(this.variation(null,true)){
}
this.refresh();
},pass:function(){
if(!this.variations){
return;
}
for(var i=0;i<this.variations.length;i++){
if(!this.variations[i].move||this.variations[i].move=="tt"){
this.variation(this.variations[i].varNum);
return;
}
}
if(this.mode==="play"){
this.createMove("tt");
this.trigger("eidogo-update");
}
},del:function(){
if(!this.cursor.hasPrevious()){
return;
}
var _98=window.confirm(t["confirm delete"]);
if(_98){
var id=this.cursor.node._id;
var _9a=0;
this.back();
this.cursor.node._children=this.cursor.node._children.filter(function(_9b,i){
if(_9b._id==id){
_9a=i;
return false;
}else{
return true;
}
});
if(_9a&&this.cursor.node._preferredChild==_9a){
this.cursor.node._preferredChild--;
}
}
this.refresh();
this.updatedNavTree=false;
this.updateNavTree(true);
},num:function(){
if(this.prefs.showMoveNumber){
_9(this.dom.controlNumber,"number-on");
this.prefs.showMoveNumber=false;
}else{
_8(this.dom.controlNumber,"number-on");
this.prefs.showMoveNumber=true;
}
this.board.render(true);
this.trigger("eidogo-rendered");
},auto:function(){
var _9d=this;
if(_9d.autoTimer){
clearInterval(_9d.autoTimer);
_9d.autoTimer=null;
_8(this.dom.controlAuto,"auto-on");
}else{
_9d.autoTimer=setInterval(function(){
if(!_9d.variation()){
clearInterval(_9d.autoTimer);
_9d.autoTimer=null;
}
},1000);
_9(this.dom.controlAuto,"auto-on");
}
},handleBoardMouseDown:function(x,y,cx,cy,e){
if(this.domLoading){
return;
}
if(!this.boundsCheck(x,y,[0,this.board.boardSize-1])){
return;
}
this.mouseDown=true;
this.mouseDownX=x;
this.mouseDownY=y;
this.mouseDownClickX=cx;
this.mouseDownClickY=cy;
if(this.mode=="region"&&x>=0&&y>=0&&!this.regionBegun){
this.regionTop=y;
this.regionLeft=x;
this.regionBegun=true;
}
},handleBoardHover:function(x,y,cx,cy,e){
if(this.domLoading){
return;
}
if(this.mouseDown||this.regionBegun){
if(!this.boundsCheck(x,y,[0,this.board.boardSize-1])){
return;
}
var _a8=(x!=this.mouseDownX||y!=this.mouseDownY);
var _a9=Math.abs(this.mouseDownClickX-cx)>=19||Math.abs(this.mouseDownClickY-cy)>=19;
if(this.searchUrl&&!this.regionBegun&&_a8&&_a9){
this.selectTool("region");
this.regionBegun=true;
this.regionTop=this.mouseDownY;
this.regionLeft=this.mouseDownX;
}
if(this.regionBegun){
this.regionRight=x+(x>=this.regionLeft?1:0);
this.regionBottom=y+(y>=this.regionTop?1:0);
this.showRegion();
}
_7(e);
}
},handleBoardMouseUp:function(x,y,e){
var _ad=false;
if(this.domLoading){
return;
}
this.mouseDown=false;
var _ae=this.pointToSgfCoord({x:x,y:y});
if(this.mode=="view"||this.mode=="play"){
for(var i=0;i<this.variations.length;i++){
var _b0=this.sgfCoordToPoint(this.variations[i].move);
if(_b0.x==x&&_b0.y==y){
this.variation(this.variations[i].varNum);
_7(e);
return;
}
}
}
if(this.mode=="view"){
var _b1=this.cursor.getGameRoot(),_b2=[0,_b1.getPosition()],mn=0,_b4=_b1._children[0];
while(_b4){
if(_b4.getMove()==_ae){
_b2.push(mn);
this.goTo(_b2);
break;
}
mn++;
_b4=_b4._children[0];
}
return;
}
if(this.mode=="play"){
if(!this.rules.check({x:x,y:y},this.currentColor)){
return;
}
if(_ae){
var _b5=this.cursor.getNextMoves();
if(_b5&&_ae in _b5){
this.variation(_b5[_ae]);
}else{
this.createMove(_ae);
_ad=true;
}
}
}else{
if(this.mode=="region"&&x>=-1&&y>=-1&&this.regionBegun){
if(this.regionTop==y&&this.regionLeft==x&&!this.regionClickSelect){
this.regionClickSelect=true;
this.regionRight=x+1;
this.regionBottom=y+1;
this.showRegion();
}else{
this.regionBegun=false;
this.regionClickSelect=false;
this.regionBottom=(y<0?0:(y>=this.board.boardSize)?y:y+(y>this.regionTop?1:0));
this.regionRight=(x<0?0:(x>=this.board.boardSize)?x:x+(x>this.regionLeft?1:0));
this.showRegion();
_a(this.dom.searchButton,"inline");
_7(e);
}
}else{
var _b6;
var _b7=this.board.getStone({x:x,y:y});
if(this.mode=="add_b"||this.mode=="add_w"){
var _b8=this.cursor.node.emptyPoint(this.pointToSgfCoord({x:x,y:y}));
if(_b7!=this.board.BLACK&&this.mode=="add_b"){
_b6="AB";
_ad=true;
}else{
if(_b7!=this.board.WHITE&&this.mode=="add_w"){
_b6="AW";
_ad=true;
}else{
if(this.board.getStone({x:x,y:y})!=this.board.EMPTY&&!_b8){
_b6="AE";
}
}
}
}else{
switch(this.mode){
case "tr":
_b6="TR";
break;
case "sq":
_b6="SQ";
break;
case "cr":
_b6="CR";
break;
case "x":
_b6="MA";
break;
case "dim":
_b6="DD";
break;
case "number":
_b6="LB";
_ae=_ae+":"+this.labelLastNumber;
this.labelLastNumber++;
break;
case "letter":
_b6="LB";
_ae=_ae+":"+this.labelLastLetter;
this.labelLastLetter=String.fromCharCode(this.labelLastLetter.charCodeAt(0)+1);
break;
case "label":
_b6="LB";
_ae=_ae+":"+this.dom.labelInput.value;
break;
case "clear":
this.cursor.node.deletePropertyValue(["TR","SQ","CR","MA","DD","LB"],new RegExp("^"+_ae));
break;
}
if(this.cursor.node.hasPropertyValue(_b6,_ae)){
this.cursor.node.deletePropertyValue(_b6,_ae);
_b6=null;
}
}
if(_b6){
this.cursor.node.pushProperty(_b6,_ae);
}
this.unsavedChanges=true;
var _b8=this.checkForEmptyNode();
this.refresh();
if(_b8){
this.prependComment(t["position deleted"]);
}
}
}
if(_ad){
this.trigger("eidogo-update");
}
},checkForEmptyNode:function(){
if(!eidogo.util.numProperties(this.cursor.node.getProperties())){
var _b9=window.confirm(t["confirm delete"]);
if(_b9){
var id=this.cursor.node._id;
var _bb=0;
this.back();
this.cursor.node._children=this.cursor.node._children.filter(function(_bc,i){
if(_bc._id==id){
_bb=i;
return false;
}else{
return true;
}
});
if(_bb&&this.cursor.node._preferredChild==_bb){
this.cursor.node._preferredChild--;
}
return true;
}
}
return false;
},handleDocMouseUp:function(evt){
if(this.domLoading){
return true;
}
if(this.mode=="region"&&this.regionBegun&&!this.regionClickSelect){
this.mouseDown=false;
this.regionBegun=false;
_a(this.dom.searchButton,"inline");
}
return true;
},boundsCheck:function(x,y,_c1){
if(_c1.length==2){
_c1[3]=_c1[2]=_c1[1];
_c1[1]=_c1[0];
}
return (x>=_c1[0]&&y>=_c1[1]&&x<=_c1[2]&&y<=_c1[3]);
},getRegionBounds:function(){
var l=this.regionLeft;
var w=this.regionRight-this.regionLeft;
if(w<0){
l=this.regionRight;
w=-w+1;
}
var t=this.regionTop;
var h=this.regionBottom-this.regionTop;
if(h<0){
t=this.regionBottom;
h=-h+1;
}
return [t,l,w,h];
},showRegion:function(){
var _c6=this.getRegionBounds();
this.board.renderer.showRegion(_c6);
},hideRegion:function(){
this.board.renderer.hideRegion();
},convertRegionPattern:function(_c7){
return _c7.join("").replace(new RegExp(this.board.EMPTY,"g"),".").replace(new RegExp(this.board.BLACK,"g"),"x").replace(new RegExp(this.board.WHITE,"g"),"o");
},loadSearch:function(q,dim,p,a,o){
var _cd={_children:[{SZ:this.board.boardSize,_children:[]}]};
this.load(_cd);
a=a||"corner";
this.dom.searchAlgo.value=a;
p=this.uncompressPattern(p);
dim=dim.split("x");
var w=dim[0];
var h=dim[1];
var bs=this.board.boardSize;
var l;
var t;
switch(q){
case "nw":
l=0;
t=0;
break;
case "ne":
l=bs-w;
t=0;
break;
case "se":
l=bs-w;
t=bs-h;
break;
case "sw":
l=0;
t=bs-h;
break;
}
var c;
var x;
var y;
for(y=0;y<h;y++){
for(x=0;x<w;x++){
c=p.charAt(y*w+x);
if(c=="o"){
c="AW";
}else{
if(c=="x"){
c="AB";
}else{
c="";
}
}
this.cursor.node.pushProperty(c,this.pointToSgfCoord({x:l+x,y:t+y}));
}
}
this.refresh();
this.regionLeft=l;
this.regionTop=t;
this.regionRight=l+x;
this.regionBottom=t+y;
var b=this.getRegionBounds();
var r=[b[1],b[0],b[1]+b[2],b[0]+b[3]-1];
for(y=0;y<this.board.boardSize;y++){
for(x=0;x<this.board.boardSize;x++){
if(!this.boundsCheck(x,y,r)){
this.board.renderer.renderMarker({x:x,y:y},"dim");
}
}
}
this.searchRegion(o);
},searchRegion:function(_d8){
if(this.searching){
return;
}
this.searching=true;
if(!this.searchUrl){
_a(this.dom.comments);
_b(this.dom.searchContainer);
this.prependComment(t["no search url"]);
return;
}
var _d8=parseInt(_d8,10)||0;
var _d9=this.dom.searchAlgo.value;
var _da=this.getRegionBounds();
var _db=this.board.getRegion(_da[0],_da[1],_da[2],_da[3]);
var _dc=this.convertRegionPattern(_db);
var _dd=/^\.*$/.test(_dc);
var _de=/^\.*o\.*$/.test(_dc);
var _df=/^\.*x\.*$/.test(_dc);
if(_dd||_de||_df){
this.searching=false;
_a(this.dom.comments);
_b(this.dom.searchContainer);
this.prependComment(t["two stones"]);
return;
}
var _e0=[];
if(_da[0]==0){
_e0.push("n");
}
if(_da[1]==0){
_e0.push("w");
}
if(_da[0]+_da[3]==this.board.boardSize){
_e0.push("s");
}
if(_da[1]+_da[2]==this.board.boardSize){
_e0.push("e");
}
if(_d9=="corner"&&!(_e0.length==2&&((_e0.contains("n")&&_e0.contains("e"))||(_e0.contains("n")&&_e0.contains("w"))||(_e0.contains("s")&&_e0.contains("e"))||(_e0.contains("s")&&_e0.contains("w"))))){
this.searching=false;
_a(this.dom.comments);
_b(this.dom.searchContainer);
this.prependComment(t["two edges"]);
return;
}
var _e1=(_e0.contains("n")?"n":"s");
_e1+=(_e0.contains("w")?"w":"e");
this.showComments("");
this.gameName="search";
var _e2=function(req){
this.searching=false;
this.doneLoading();
_b(this.dom.comments);
_a(this.dom.searchContainer);
this.showingSearch=true;
if(req.responseText=="ERROR"){
this.croak(t["error retrieving"]);
return;
}else{
if(req.responseText=="NONE"){
_b(this.dom.searchResultsContainer);
this.dom.searchCount.innerHTML="No";
return;
}
}
var ret=eval("("+req.responseText+")");
var _e5=ret.results,_e6,_e7="",odd,_e9=parseInt(ret.total,10),_ea=parseInt(ret.offset,10)+1,_eb=parseInt(ret.offset,10)+50;
for(var i=0;_e6=_e5[i];i++){
odd=odd?false:true;
_e7+="<a class='search-result"+(odd?" odd":"")+"' href='#'>                    <span class='id'>"+_e6.id+"</span>                    <span class='mv'>"+_e6.mv+"</span>                    <span class='pw'>"+_e6.pw+" "+_e6.wr+"</span>                    <span class='pb'>"+_e6.pb+" "+_e6.br+"</span>                    <span class='re'>"+_e6.re+"</span>                    <span class='dt'>"+_e6.dt+"</span>                    <div class='clear'>&nbsp;</div>                    </a>";
}
if(_e9>_eb){
_e7+="<div class='search-more'><a href='#' id='search-more'>Show more...</a></div>";
}
_a(this.dom.searchResultsContainer);
this.dom.searchResults.innerHTML=_e7+"<br>";
this.dom.searchCount.innerHTML=_e9;
this.dom.searchOffsetStart.innerHTML=_ea;
this.dom.searchOffsetEnd.innerHTML=(_e9<_eb?_e9:_eb);
this.dom.searchContainer.scrollTop=0;
if(_e9>_eb){
setTimeout(function(){
_4(_2("search-more"),"click",function(e){
this.loadSearch(_e1,_da[2]+"x"+_da[3],_dc,"corner",ret.offset+51);
_7(e);
}.bind(this));
}.bind(this),0);
}
};
var _ee=function(req){
this.croak(t["error retrieving"]);
};
var _f0={q:_e1,w:_da[2],h:_da[3],p:_dc,a:_d9,o:_d8,t:(new Date()).getTime()};
this.progressiveLoad=false;
this.progressiveUrl=null;
this.prefs.markNext=false;
this.prefs.showPlayerInfo=true;
this.hook("searchRegion",_f0);
this.nowLoading();
_3("get",this.searchUrl,_f0,_e2,_ee,this,45000);
},loadSearchResult:function(e){
this.nowLoading();
var _f2=e.target||e.srcElement;
if(_f2.nodeName=="SPAN"){
_f2=_f2.parentNode;
}
if(_f2.nodeName=="A"){
var _f3;
var id;
var mv;
for(var i=0;_f3=_f2.childNodes[i];i++){
if(_f3.className=="id"){
id=_f3.innerHTML;
}
if(_f3.className=="mv"){
mv=parseInt(_f3.innerHTML,10);
}
}
}
this.remoteLoad(id,null,true,[0,mv],function(){
this.doneLoading();
this.setPermalink();
this.prefs.showOptions=true;
this.handleDisplayPrefs();
}.bind(this));
_7(e);
},closeSearch:function(){
this.showingSearch=false;
_b(this.dom.searchContainer);
_a(this.dom.comments);
},compressPattern:function(_f7){
var c=null;
var pc="";
var n=1;
var ret="";
for(var i=0;i<_f7.length;i++){
c=_f7.charAt(i);
if(c==pc){
n++;
}else{
ret=ret+pc+(n>1?n:"");
n=1;
pc=c;
}
}
ret=ret+pc+(n>1?n:"");
return ret;
},uncompressPattern:function(_fd){
var c=null;
var s=null;
var n="";
var ret="";
for(var i=0;i<_fd.length;i++){
c=_fd.charAt(i);
if(c=="."||c=="x"||c=="o"){
if(s!=null){
n=parseInt(n,10);
n=isNaN(n)?1:n;
for(var j=0;j<n;j++){
ret+=s;
}
n="";
}
s=c;
}else{
n+=c;
}
}
n=parseInt(n,10);
n=isNaN(n)?1:n;
for(var j=0;j<n;j++){
ret+=s;
}
return ret;
},createMove:function(_104){
var _105={};
_105[this.currentColor]=_104;
var _106=new eidogo.GameNode(null,_105);
_106._cached=true;
this.totalMoves++;
this.cursor.node.appendChild(_106);
this.unsavedChanges=[this.cursor.node._children.last(),this.cursor.node];
this.updatedNavTree=false;
this.variation(this.cursor.node._children.length-1);
},handleKeypress:function(e){
if(this.editingText){
return true;
}
var _108=e.keyCode||e.charCode;
if(!_108||e.ctrlKey||e.altKey||e.metaKey){
return true;
}
var _109=String.fromCharCode(_108).toLowerCase();
var _10a=[];
for(var i=0;i<this.variations.length;i++){
var _10c=this.variations[i].move;
var _10d=this.sgfCoordToPoint(_10c);
var _10e=""+(i+1);
var _10f=this.board.getMarker(_10d);
if(_10d.x!=null&&_10f!=this.board.EMPTY&&typeof _10f=="string"&&!_10a.contains(_10c)){
_10e=_10f.toLowerCase();
}
_10e=_10e.replace(/^var:/,"");
if(_109==_10e.charAt(0)){
this.variation(this.variations[i].varNum);
_7(e);
return;
}
_10a.push(_10c);
}
if(_108==112||_108==27){
this.selectTool("play");
}
var stop=true;
switch(_108){
case 39:
if(e.shiftKey){
var _111=this.totalMoves-this.moveNumber;
var _112=(_111>9?9:_111-1);
for(var i=0;i<_112;i++){
this.forward(null,null,true);
}
}
this.forward();
break;
case 37:
if(e.shiftKey){
var _112=(this.moveNumber>9?9:this.moveNumber-1);
for(var i=0;i<_112;i++){
this.back(null,null,true);
}
}
this.back();
break;
case 40:
this.last();
break;
case 38:
this.first();
break;
case 192:
this.pass();
break;
default:
stop=false;
break;
}
if(stop){
_7(e);
}
},showGameInfo:function(_113){
this.hook("showGameInfo",_113);
if(!_113){
return;
}
this.dom.infoGame.innerHTML="";
this.dom.whiteName.innerHTML="";
this.dom.blackName.innerHTML="";
var dl=document.createElement("dl"),val;
for(var _116 in this.infoLabels){
if(_113[_116] instanceof Array){
_113[_116]=_113[_116][0];
}
if(_113[_116]){
if(_116=="PW"){
this.dom.whiteName.innerHTML=_113[_116]+(_113["WR"]?", "+_113["WR"]:"");
continue;
}else{
if(_116=="PB"){
this.dom.blackName.innerHTML=_113[_116]+(_113["BR"]?", "+_113["BR"]:"");
continue;
}
}
if(_116=="WR"||_116=="BR"){
continue;
}
val=_113[_116];
if(_116=="DT"){
var _117=_113[_116].split(/[\.-]/);
if(_117.length==3){
val=_117[2].replace(/^0+/,"")+" "+this.months[_117[1]-1]+" "+_117[0];
}
}
var dt=document.createElement("dt");
dt.innerHTML=this.infoLabels[_116]+":";
var dd=document.createElement("dd");
dd.innerHTML=val;
dl.appendChild(dt);
dl.appendChild(dd);
}
}
this.dom.infoGame.appendChild(dl);
},selectTool:function(tool){
var _11b;
_b(this.dom.scoreEst);
_b(this.dom.labelInput);
if(tool=="region"){
_11b="crosshair";
}else{
if(tool=="comment"){
this.startEditComment();
}else{
if(tool=="gameinfo"){
this.startEditGameInfo();
}else{
if(tool=="label"){
_a(this.dom.labelInput,"inline");
this.dom.labelInput.focus();
}else{
_11b="default";
this.regionBegun=false;
this.hideRegion();
_b(this.dom.searchButton);
_b(this.dom.searchAlgo);
if(this.searchUrl||this.scoreEstUrl){
_a(this.dom.scoreEst,"inline");
}
}
}
}
}
this.board.renderer.setCursor(_11b);
this.mode=tool;
this.dom.toolsSelect.value=tool;
},startEditComment:function(){
this.closeSearch();
var div=this.dom.commentsEdit;
div.style.position="absolute";
div.style.top=this.dom.comments.offsetTop+"px";
div.style.left=this.dom.comments.offsetLeft+"px";
_a(this.dom.shade);
this.dom.comments.innerHTML="";
_a(div);
_a(this.dom.commentsEditDone);
this.dom.commentsEditTa.value=this.cursor.node.C||"";
this.dom.commentsEditTa.focus();
this.editingText=true;
},finishEditComment:function(){
this.editingText=false;
var oldC=this.cursor.node.C;
var newC=this.dom.commentsEditTa.value;
if(oldC!=newC){
this.unsavedChanges=true;
this.cursor.node.C=newC;
}
if(!this.cursor.node.C){
delete this.cursor.node.C;
}
_b(this.dom.shade);
_b(this.dom.commentsEdit);
_a(this.dom.comments);
this.selectTool("play");
var _11f=this.checkForEmptyNode();
this.refresh();
if(_11f){
this.prependComment(t["position deleted"]);
}
},startEditGameInfo:function(){
this.closeSearch();
var div=this.dom.gameInfoEdit;
div.style.position="absolute";
div.style.top=this.dom.comments.offsetTop+"px";
div.style.left=this.dom.comments.offsetLeft+"px";
_a(this.dom.shade);
this.dom.comments.innerHTML="";
_a(div);
_a(this.dom.gameInfoEditDone);
var root=this.cursor.getGameRoot();
var html=["<table>"];
for(var prop in this.infoLabels){
html.push("<tr><td>"+this.infoLabels[prop]+":"+"</td><td>"+"<input type=\"text\" id=\"game-info-edit-field-"+prop+"\""+" value=\""+(root[prop]||"")+"\">"+"</td></tr>");
}
html.push("</table>");
this.dom.gameInfoEditForm.innerHTML=html.join("");
setTimeout(function(){
_2("game-info-edit-field-GN").focus();
},0);
this.editingText=true;
},finishEditGameInfo:function(){
this.editingText=false;
_b(this.dom.shade);
_b(this.dom.gameInfoEdit);
_a(this.dom.comments);
var root=this.cursor.getGameRoot();
var _125=null;
for(var prop in this.infoLabels){
_125=_2("game-info-edit-field-"+prop).value;
if((root[prop]||"")!=_125){
root[prop]=_125;
this.unsavedChanges=true;
}
}
this.showGameInfo(root);
this.dom.gameInfoEditForm.innerHTML="";
this.selectTool("play");
this.refresh();
},updateControls:function(){
this.dom.moveNumber.innerHTML=(this.moveNumber?(t["move"]+" "+this.moveNumber):(this.permalinkable?"permalink":""));
this.dom.whiteCaptures.innerHTML=t["captures"]+": <span>"+this.board.captures.W+"</span>";
this.dom.blackCaptures.innerHTML=t["captures"]+": <span>"+this.board.captures.B+"</span>";
this.dom.whiteTime.innerHTML=t["time left"]+": <span>"+(this.timeW?this.timeW:"--")+"</span>";
this.dom.blackTime.innerHTML=t["time left"]+": <span>"+(this.timeB?this.timeB:"--")+"</span>";
_9(this.dom.controlPass,"pass-on");
this.dom.variations.innerHTML="";
for(var i=0;i<this.variations.length;i++){
var _128=i+1;
var _129=false;
if(!this.variations[i].move||this.variations[i].move=="tt"){
_8(this.dom.controlPass,"pass-on");
}else{
if(this.prefs.markNext||this.variations.length>1){
var _12a=this.sgfCoordToPoint(this.variations[i].move);
if(this.board.getMarker(_12a)!=this.board.EMPTY){
var _12b=this.board.getMarker(_12a);
if(_12b.indexOf("var:")!==0){
_128=_12b;
}else{
_129=true;
}
}
if(this.prefs.markVariations&&!_129){
this.board.addMarker(_12a,"var:"+_128);
}
}
}
var _12c=document.createElement("div");
_12c.className="variation-nav";
_12c.innerHTML=_128;
_4(_12c,"click",function(e,arg){
arg.me.variation(arg.varNum);
},{me:this,varNum:this.variations[i].varNum});
this.dom.variations.appendChild(_12c);
}
if(this.variations.length<2){
this.dom.variations.innerHTML="<div class='variation-nav none'>"+t["no variations"]+"</div>";
}
if(this.cursor.hasNext()){
_8(this.dom.controlForward,"forward-on");
_8(this.dom.controlLast,"last-on");
if(!this.autoTimer){
_8(this.dom.controlAuto,"auto-on");
}
}else{
_9(this.dom.controlForward,"forward-on");
_9(this.dom.controlLast,"last-on");
_9(this.dom.controlAuto,"auto-on");
}
if(this.cursor.hasPrevious()){
_8(this.dom.controlBack,"back-on");
_8(this.dom.controlFirst,"first-on");
_8(this.dom.controlDelete,"delete-on");
}else{
_9(this.dom.controlBack,"back-on");
_9(this.dom.controlFirst,"first-on");
_9(this.dom.controlDelete,"delete-on");
var info="";
if(!this.prefs.showPlayerInfo){
info+=this.getGameDescription(true);
}
if(!this.prefs.showGameInfo){
info+=this.dom.infoGame.innerHTML;
}
if(info.length&&this.theme!="problem"){
this.prependComment(info,"comment-info");
}
}
if(!this.progressiveLoad){
this.updateNavSlider();
}
if(this.prefs.showNavTree){
this.updateNavTree();
}
var node=this.cursor.node,pos,html,js;
if(node._parent&&!node._parent._parent&&node._parent._children.length>1){
pos=node.getPosition();
html=t["multi-game sgf"];
js="javascript:eidogo.delegate("+this.uniq+", \"goTo\", [";
if(pos){
html+="<a href='"+js+(pos-1)+",0])'>"+t["previous game"]+"</a>";
}
if(node._parent._children[pos+1]){
html+=(pos?" | ":"")+"<a href='"+js+(pos+1)+",0])'>"+t["next game"]+"</a>";
}
this.prependComment(html,"comment-info");
}
},setColor:function(_134){
this.prependComment(_134=="B"?t["black to play"]:t["white to play"]);
this.currentColor=this.problemColor=_134;
},setMoveNumber:function(num){
this.moveNumber=num;
},playMove:function(_136,_137,_138){
_137=_137||this.currentColor;
this.currentColor=(_137=="B"?"W":"B");
_137=_137=="W"?this.board.WHITE:this.board.BLACK;
var pt=this.sgfCoordToPoint(_136);
if((!_136||_136=="tt"||_136=="")&&!_138){
this.prependComment((_137==this.board.WHITE?t["white"]:t["black"])+" "+t["passed"],"comment-pass");
}else{
if(_136=="resign"){
this.prependComment((_137==this.board.WHITE?t["white"]:t["black"])+" "+t["resigned"],"comment-resign");
}else{
if(_136&&_136!="tt"){
this.board.addStone(pt,_137);
this.rules.apply(pt,_137);
if(this.prefs.markCurrent&&!_138){
this.addMarker(_136,"current");
}
}
}
}
},addStone:function(_13a,_13b){
if(!(_13a instanceof Array)){
_13a=[_13a];
}
_13a=this.expandCompressedPoints(_13a);
for(var i=0;i<_13a.length;i++){
this.board.addStone(this.sgfCoordToPoint(_13a[i]),_13b=="AW"?this.board.WHITE:_13b=="AB"?this.board.BLACK:this.board.EMPTY);
}
},addMarker:function(_13d,type){
if(!(_13d instanceof Array)){
_13d=[_13d];
}
_13d=this.expandCompressedPoints(_13d);
var _13f;
for(var i=0;i<_13d.length;i++){
switch(type){
case "TR":
_13f="triangle";
break;
case "SQ":
_13f="square";
break;
case "CR":
_13f="circle";
break;
case "MA":
_13f="ex";
break;
case "TW":
_13f="territory-white";
break;
case "TB":
_13f="territory-black";
break;
case "DD":
_13f="dim";
break;
case "LB":
_13f=(_13d[i].split(":"))[1];
break;
default:
_13f=type;
break;
}
this.board.addMarker(this.sgfCoordToPoint((_13d[i].split(":"))[0]),_13f);
}
},showTime:function(_141,type){
var tp=(type=="BL"||type=="OB"?"timeB":"timeW");
if(type=="BL"||type=="WL"){
var mins=Math.floor(_141/60);
var secs=(_141%60).toFixed(0);
secs=(secs<10?"0":"")+secs;
this[tp]=mins+":"+secs;
}else{
this[tp]+=" ("+_141+")";
}
},showAnnotation:function(_146,type){
var msg;
switch(type){
case "N":
msg=_146;
break;
case "GB":
msg=(_146>1?t["vgb"]:t["gb"]);
break;
case "GW":
msg=(_146>1?t["vgw"]:t["gw"]);
break;
case "DM":
msg=(_146>1?t["dmj"]:t["dm"]);
break;
case "UC":
msg=t["uc"];
break;
case "TE":
msg=t["te"];
break;
case "BM":
msg=(_146>1?t["vbm"]:t["bm"]);
break;
case "DO":
msg=t["do"];
break;
case "IT":
msg=t["it"];
break;
case "HO":
msg=t["ho"];
break;
}
this.prependComment(msg);
},showComments:function(_149,junk,_14b){
if(!_149||_14b){
return;
}
this.dom.comments.innerHTML+=_149.replace(/^(\n|\r|\t|\s)+/,"").replace(/\n/g,"<br />");
},prependComment:function(_14c,cls){
cls=cls||"comment-status";
this.dom.comments.innerHTML="<div class='"+cls+"'>"+_14c+"</div>"+this.dom.comments.innerHTML;
},downloadSgf:function(evt){
_7(evt);
if(this.downloadUrl){
if(this.unsavedChanges){
alert(t["unsaved changes"]);
return;
}
location.href=this.downloadUrl+this.gameName;
}else{
if(_c){
location.href="data:text/plain,"+encodeURIComponent(this.cursor.getGameRoot().toSgf());
}
}
},save:function(evt){
_7(evt);
var _150=function(req){
this.hook("saved",[req.responseText]);
};
var _152=function(req){
this.croak(t["error retrieving"]);
};
var sgf=this.cursor.getGameRoot().toSgf();
_3("POST",this.saveUrl,{sgf:sgf},_150,_152,this,30000);
},constructDom:function(){
this.dom.player=document.createElement("div");
this.dom.player.className="eidogo-player"+(this.theme?" theme-"+this.theme:"");
this.dom.player.id="player-"+this.uniq;
this.dom.container.innerHTML="";
eidogo.util.show(this.dom.container);
this.dom.container.appendChild(this.dom.player);
var _155="            <div class='board-capture'>                <div id='board-container' class='board-container'></div>                <div id='info' class='info'>                    <div id='info-players' class='players'>                        <div id='white' class='player white'>                            <div id='white-name' class='name'></div>                            <div id='white-captures' class='captures'></div>                            <div id='white-time' class='time'></div>                        </div>                        <div id='black' class='player black'>                            <div id='black-name' class='name'></div>                            <div id='black-captures' class='captures'></div>                            <div id='black-time' class='time'></div>                        </div>                    </div>                    <div id='info-game' class='game'></div>                </div>                <div style='clear: both;'></div>            </div>            <div id='controls-container' class='controls-container'>                <ul id='controls' class='controls'>                    <li id='control-first' class='control first'>First</li>                    <li id='control-back' class='control back'>Back</li>                    <li id='control-forward' class='control forward'>Forward</li>                    <li id='control-auto' class='control auto'>AUTO</li>                    <li id='control-last' class='control last'>Last</li>                    <li id='control-pass' class='control pass'>Pass</li>                    <li id='control-delete' class='control delete'>Delete</li>                    <li id='control-number' class='control number'>Number</li>                </ul>                <div id='move-number' class='move-number"+(this.permalinkable?" permalink":"")+"'></div>                <div id='nav-slider' class='nav-slider'>                    <div id='nav-slider-thumb' class='nav-slider-thumb'></div>                </div>                <div id='variations-container' class='variations-container'>                    <div id='variations-label' class='variations-label'>"+t["variations"]+":</div>                    <div id='variations' class='variations'></div>                </div>                <div class='controls-stop'></div>            </div>            <div id='tools-container' class='tools-container'"+(this.prefs.showTools?"":" style='display: none'")+">                <div id='tools-label' class='tools-label'>"+t["tool"]+":</div>                <select id='tools-select' class='tools-select'>                    <option value='play'>&#9658; "+t["play"]+"</option>                    <option value='view'>&#8594; "+t["view"]+"</option>                    <option value='add_b'>&#9679; "+t["add_b"]+"</option>                    <option value='add_w'>&#9675; "+t["add_w"]+"</option>                    "+(this.searchUrl?("<option value='region'>&#9618; "+t["region"]+"</option>"):"")+"                    "+(this.saveUrl&&!this.progressiveLoad?("<option value='comment'>&para; "+t["edit comment"]+"</option>"):"")+"                    "+(this.saveUrl?("<option value='gameinfo'>&#8962; "+t["edit game info"]+"</option>"):"")+"                    <option value='tr'>&#9650; "+t["triangle"]+"</option>                    <option value='sq'>&#9632; "+t["square"]+"</option>                    <option value='cr'>&#9679; "+t["circle"]+"</option>                    <option value='x'>&times; "+t["x"]+"</option>                    <option value='letter'>A "+t["letter"]+"</option>                    <option value='number'>5 "+t["number"]+"</option>                    <option value='label'>&Ccedil; "+t["label"]+"</option>                    <option value='dim'>&#9619; "+t["dim"]+"</option>                    <option value='clear'>&#9617; "+t["clear"]+"</option>                </select>                <input type='button' id='score-est' class='score-est-button' value='"+t["score est"]+"' />                <select id='search-algo' class='search-algo'>                    <option value='corner'>"+t["search corner"]+"</option>                    <option value='center'>"+t["search center"]+"</option>                </select>                <input type='button' id='search-button' class='search-button' value='"+t["search"]+"' />                <input type='text' id='label-input' class='label-input' />            </div>            <div id='comments' class='comments'></div>            <div id='comments-edit' class='comments-edit'>                <textarea id='comments-edit-ta' class='comments-edit-ta'></textarea>                <div id='comments-edit-done' class='comments-edit-done'>"+t["done"]+"</div>            </div>            <div id='game-info-edit' class='game-info-edit'>                <div id='game-info-edit-form' class='game-info-edit-form'></div>                <div id='game-info-edit-done' class='game-info-edit-done'>"+t["done"]+"</div>            </div>            <div id='search-container' class='search-container'>                <div id='search-close' class='search-close'>"+t["close search"]+"</div>                <p class='search-count'><span id='search-count'></span>&nbsp;"+t["matches found"]+"                    Showing <span id='search-offset-start'></span>-<span id='search-offset-end'></span></p>                <div id='search-results-container' class='search-results-container'>                    <div class='search-result'>                        <span class='pw'><b>"+t["white"]+"</b></span>                        <span class='pb'><b>"+t["black"]+"</b></span>                        <span class='re'><b>"+t["result"]+"</b></span>                        <span class='dt'><b>"+t["date"]+"</b></span>                        <div class='clear'></div>                    </div>                    <div id='search-results' class='search-results'></div>                </div>            </div>            <div id='nav-tree-container' class='nav-tree-container'>                <div id='nav-tree' class='nav-tree'></div>            </div>            <div id='options' class='options'>                "+(this.saveUrl?"<a id='option-save' class='option-save' href='#'>"+t["save to server"]+"</a>":"")+"                "+(this.downloadUrl||_c?"<a id='option-download' class='option-download' href='#'>"+t["download sgf"]+"</a>":"")+"                <div class='options-stop'></div>            </div>            <div id='preferences' class='preferences'>                <div><input type='checkbox'> Show variations on board</div>                <div><input type='checkbox'> Mark current move</div>            </div>            <div id='footer' class='footer'></div>            <div id='shade' class='shade'></div>        ";
_155=_155.replace(/ id='([^']+)'/g," id='$1-"+this.uniq+"'");
this.dom.player.innerHTML=_155;
var re=/ id='([^']+)-\d+'/g;
var _157;
var id;
var _159;
while(_157=re.exec(_155)){
id=_157[0].replace(/'/g,"").replace(/ id=/,"");
_159="";
_157[1].split("-").forEach(function(word,i){
word=i?word.charAt(0).toUpperCase()+word.substring(1):word;
_159+=word;
});
this.dom[_159]=_2(id);
}
[["moveNumber","setPermalink"],["controlFirst","first"],["controlBack","back"],["controlForward","forward"],["controlLast","last"],["controlPass","pass"],["controlDelete","del"],["controlNumber","num"],["controlAuto","auto"],["scoreEst","fetchScoreEstimate"],["searchButton","searchRegion"],["searchResults","loadSearchResult"],["searchClose","closeSearch"],["optionDownload","downloadSgf"],["optionSave","save"],["commentsEditDone","finishEditComment"],["gameInfoEditDone","finishEditGameInfo"],["navTree","navTreeClick"]].forEach(function(eh){
if(this.dom[eh[0]]){
_5(this.dom[eh[0]],this[eh[1]],this);
}
}.bind(this));
_4(this.dom.toolsSelect,"change",function(e){
this.selectTool.apply(this,[(e.target||e.srcElement).value]);
},this,true);
},enableNavSlider:function(){
if(this.progressiveLoad){
_b(this.dom.navSliderThumb);
return;
}
this.dom.navSlider.style.cursor="pointer";
var _15e=false;
var _15f=null;
_4(this.dom.navSlider,"mousedown",function(e){
_15e=true;
_7(e);
},this,true);
_4(document,"mousemove",function(e){
if(!_15e){
return;
}
var xy=_6(e,this.dom.navSlider);
clearTimeout(_15f);
_15f=setTimeout(function(){
this.updateNavSlider(xy[0]);
}.bind(this),10);
_7(e);
},this,true);
_4(document,"mouseup",function(e){
if(!_15e){
return true;
}
_15e=false;
var xy=_6(e,this.dom.navSlider);
this.updateNavSlider(xy[0]);
return true;
},this,true);
},updateNavSlider:function(_165){
var _166=this.dom.navSlider.offsetWidth-this.dom.navSliderThumb.offsetHeight;
var _167=this.totalMoves;
var _168=!!_165;
_165=_165||(this.moveNumber/_167*_166);
_165=_165>_166?_166:_165;
_165=_165<0?0:_165;
var _169=parseInt(_165/_166*_167,10);
if(_168){
this.nowLoading();
var _16a=_169-this.cursor.getMoveNumber();
for(var i=0;i<Math.abs(_16a);i++){
if(_16a>0){
this.variation(null,true);
}else{
if(_16a<0){
this.cursor.previous();
}
}
}
if(_16a<0){
this.board.revert(Math.abs(_16a));
}
this.doneLoading();
this.refresh();
}
_165=parseInt(_169/_167*_166,10)||0;
this.dom.navSliderThumb.style.left=_165+"px";
},updateNavTree:function(_16c){
if(!this.prefs.showNavTree){
return;
}
if(this.updatedNavTree){
this.showNavTreeCurrent();
return;
}
if(!_16c){
if(this.navTreeTimeout){
clearTimeout(this.navTreeTimeout);
}
this.navTreeTimeout=setTimeout(function(){
this.updateNavTree(true);
}.bind(this),eidogo.browser.ie?1000:500);
return;
}
this.updatedNavTree=true;
var _16d=[],_16e=this.cursor.getGameRoot();
path=[_16e.getPosition()],cur=new eidogo.GameCursor(),maxx=0;
var _170=function(node,_172,_173){
var y=_173,x=_172;
var n=node,_177=1;
while(n&&n._children.length==1){
_177++;
n=n._children[0];
}
while(_16d[y]&&_16d[y].slice(x,x+_177+1).some(function(el){
return (typeof el!="undefined");
})){
y++;
}
do{
if(!_16d[y]){
_16d[y]=[];
}
cur.node=node;
node._pathStr=path.join("-")+"-"+(x-_172);
_16d[y][x]=node;
if(x>maxx){
maxx=x;
}
x++;
if(node._children.length!=1){
break;
}
node=node._children[0];
}while(node);
for(var i=0;i<node._children.length;i++){
path.push(i);
_170(node._children[i],x,y);
path.pop();
}
};
_170(_16e,0,0);
var html=["<table class='nav-tree'>"],node,td,cur=new eidogo.GameCursor(),x,y,_17f,_180=1,LINE=2;
for(x=0;x<maxx;x++){
_17f=false;
for(y=_16d.length-1;y>0;y--){
if(!_16d[y][x]){
if(typeof _16d[y][x+1]=="object"){
_16d[y][x]=_180;
_17f=true;
}else{
if(_17f){
_16d[y][x]=LINE;
}
}
}else{
_17f=false;
}
}
}
for(y=0;y<_16d.length;y++){
html.push("<tr>");
for(x=0;x<_16d[y].length;x++){
node=_16d[y][x];
if(node==_180){
td="<div class='elbow'></div>";
}else{
if(node==LINE){
td="<div class='line'></div>";
}else{
if(node){
td=["<a href='#' id='navtree-node-",node._pathStr,"' class='",(typeof node.W!="undefined"?"w":(typeof node.B!="undefined"?"b":"x")),"'>",x,"</a>"].join("");
}else{
td="<div class='empty'></div>";
}
}
}
html.push("<td>");
html.push(td);
html.push("</td>");
}
html.push("</tr>");
}
html.push("</table>");
this.dom.navTree.innerHTML=html.join("");
setTimeout(function(){
this.showNavTreeCurrent();
}.bind(this),0);
},showNavTreeCurrent:function(){
var id="navtree-node-"+this.cursor.getPath().join("-"),_183=_2(id);
if(!_183){
return;
}
if(this.prevNavTreeCurrent){
this.prevNavTreeCurrent.className=this.prevNavTreeCurrentClass;
}
this.prevNavTreeCurrent=_183;
this.prevNavTreeCurrentClass=_183.className;
_183.className="current";
var w=_183.offsetWidth,h=_183.offsetHeight,xy=eidogo.util.getElXY(_183),_187=eidogo.util.getElXY(this.dom.navTree),l=xy[0]-_187[0],t=xy[1]-_187[1],ntc=this.dom.navTreeContainer,maxl=ntc.scrollLeft,maxr=maxl+ntc.offsetWidth-100;
maxt=ntc.scrollTop,maxb=maxt+ntc.offsetHeight-30;
if(l<maxl){
ntc.scrollLeft-=(maxl-l);
}
if(l+w>maxr){
ntc.scrollLeft+=((l+w)-maxr);
}
if(t<maxt){
ntc.scrollTop-=(maxt-t);
}
if(t+h>maxb){
ntc.scrollTop+=((t+h)-maxb);
}
},navTreeClick:function(e){
var _18d=e.target||e.srcElement;
if(!_18d||!_18d.id){
return;
}
var path=_18d.id.replace(/^navtree-node-/,"").split("-");
this.goTo(path,true);
_7(e);
},resetLastLabels:function(){
this.labelLastNumber=1;
this.labelLastLetter="A";
},getGameDescription:function(_18f){
var root=this.cursor.getGameRoot();
if(!root){
return;
}
var desc=(_18f?"":root.GN||this.gameName);
if(root.PW&&root.PB){
var wr=root.WR?" "+root.WR:"";
var br=root.BR?" "+root.BR:"";
desc+=(desc.length?" - ":"")+root.PW+wr+" vs "+root.PB+br;
}
return desc;
},sgfCoordToPoint:function(_194){
if(!_194||_194=="tt"){
return {x:null,y:null};
}
var _195={a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8,j:9,k:10,l:11,m:12,n:13,o:14,p:15,q:16,r:17,s:18};
return {x:_195[_194.charAt(0)],y:_195[_194.charAt(1)]};
},pointToSgfCoord:function(pt){
if(!pt||(this.board&&!this.boundsCheck(pt.x,pt.y,[0,this.board.boardSize-1]))){
return null;
}
var pts={0:"a",1:"b",2:"c",3:"d",4:"e",5:"f",6:"g",7:"h",8:"i",9:"j",10:"k",11:"l",12:"m",13:"n",14:"o",15:"p",16:"q",17:"r",18:"s"};
return pts[pt.x]+pts[pt.y];
},expandCompressedPoints:function(_198){
var _199;
var ul,lr;
var x,y;
var _19e=[];
var hits=[];
for(var i=0;i<_198.length;i++){
_199=_198[i].split(/:/);
if(_199.length>1){
ul=this.sgfCoordToPoint(_199[0]);
lr=this.sgfCoordToPoint(_199[1]);
for(x=ul.x;x<=lr.x;x++){
for(y=ul.y;y<=lr.y;y++){
_19e.push(this.pointToSgfCoord({x:x,y:y}));
}
}
hits.push(i);
}
}
_198=_198.concat(_19e);
return _198;
},setPermalink:function(){
if(!this.permalinkable){
return true;
}
if(this.unsavedChanges){
alert(t["unsaved changes"]);
return;
}
this.hook("setPermalink");
},nowLoading:function(msg){
if(this.croaked||this.problemMode){
return;
}
msg=msg||t["loading"]+"...";
if(_2("eidogo-loading-"+this.uniq)){
return;
}
this.domLoading=document.createElement("div");
this.domLoading.id="eidogo-loading-"+this.uniq;
this.domLoading.className="eidogo-loading"+(this.theme?" theme-"+this.theme:"");
this.domLoading.innerHTML=msg;
this.dom.player.appendChild(this.domLoading);
},doneLoading:function(){
if(this.domLoading&&this.domLoading!=null&&this.domLoading.parentNode){
this.domLoading.parentNode.removeChild(this.domLoading);
this.domLoading=null;
}
},croak:function(msg){
this.doneLoading();
if(this.board){
alert(msg);
}else{
if(this.problemMode){
this.prependComment(msg);
}else{
this.dom.player.innerHTML+="<div class='eidogo-error "+(this.theme?" theme-"+this.theme:"")+"'>"+msg.replace(/\n/g,"<br />")+"</div>";
this.croaked=true;
}
}
},careCurrentColor:function(){
if(this.goingBack){
this.currentColor=this.currentColor==="B"?"W":"B";
}
},trigger:function(name){
var e=document.createEvent("CustomEvent");
e.initCustomEvent(name,false,true);
this.dom.player.dispatchEvent(e);
}};
})();

(function(){
var _1=window.eidogoConfig||{};
var _2={theme:"problem",problemMode:true,markVariations:false,markNext:false,shrinkToFit:true};
var _3=eidogo.util.getPlayerPath();
var _4=eidogo.playerPath=(_1.playerPath||_3||"player").replace(/\/$/,"");
if(!_1.skipCss){
eidogo.util.addStyleSheet(_4+"/css/player.css");
if(eidogo.browser.ie&&parseInt(eidogo.browser.ver,10)<=6){
eidogo.util.addStyleSheet(_4+"/css/player-ie6.css");
}
}
eidogo.util.addEvent(window,"load",function(){
eidogo.autoPlayers=[];
var _5=[];
var _6=document.getElementsByTagName("div");
var _7=_6.length;
for(var i=0;i<_7;i++){
if(eidogo.util.hasClass(_6[i],"eidogo-player-auto")||eidogo.util.hasClass(_6[i],"eidogo-player-problem")){
_5.push(_6[i]);
}
}
var el;
for(var i=0;el=_5[i];i++){
var _a={container:el,enableShortcuts:false,theme:"compact"};
if(eidogo.util.hasClass(el,"eidogo-player-problem")){
for(var _b in _2){
_a[_b]=_2[_b];
}
}
for(var _b in _1){
_a[_b]=_1[_b];
}
var _c=el.getAttribute("sgf");
if(_c){
_a.sgfUrl=_c;
}else{
if(el.innerHTML){
_a.sgf=el.innerHTML;
}
}
var _d=el.getAttribute("shrink");
if(_d){
_a.shrinkToFit=(_d=="no"?false:true);
}
el.innerHTML="";
eidogo.util.show(el);
var _e=new eidogo.Player(_a);
eidogo.autoPlayers.push(_e);
}
});
})();

