let CityList=[];

let baseURL='https://highwaymonitoringwebapi.azurewebsites.net/api/';
baseURL = 'https://localhost:5001/api/';
var map;
var pinInfobox;
        function loadDeferredIframe() {
            let paramsURL = (new URL(document.location)).searchParams;
            let params = paramsURL.get("id");

            if(params){
                debugger;
                
               
                var srclive='';
                    if(params=='40'){  
                        ShowCameraDetails();                  
                        srclive='http://20.102.33.84:5000/'
                    }
                    else if(params=='41'){    
                        ShowCameraDetails();                
                        srclive='http://localhost/index41.html'
                    }    
                    else{
                        document.getElementById("cameradetails").style.display = "hide";
                        srclive='http://localhost/index0.html'
                    }
                document.getElementById("iframeid").src=srclive
           
            }
        }

        function ShowCameraDetails(){            
            let CameraDetails=JSON.parse(getCookie('CameraDetails'));
                document.getElementById("latitude").innerHTML =CameraDetails.latitude;
                document.getElementById("longitude").innerHTML =CameraDetails.longitude;
                document.getElementById("description").innerHTML =CameraDetails.description;
                document.getElementById("title").innerHTML =CameraDetails.title;
                document.getElementById("cameradetails").style.visibility = "visible";
               
        }

function getCookie(name) {
   var cookieName = name + "="
   var docCookie = document.cookie
   var cookieStart
   var end

   if (docCookie.length>0) {
      cookieStart = docCookie.indexOf(cookieName)
      if (cookieStart != -1) {
         cookieStart = cookieStart + cookieName.length
         end = docCookie.indexOf(";",cookieStart)
         if (end == -1) {
            end = docCookie.length
         }
         return unescape(docCookie.substring(cookieStart,end))
      }
   }
   return false
}
       // window.onload = loadDeferredIframe;
      // document.getElementById('cameradetails').style.visibility = "hidden";

    function refreshIframe() {
        let CameraDetails=JSON.parse(getCookie('CameraDetails'));
        document.getElementById("iframeid").src ='http://20.241.224.236:5000/id='+CameraDetails.cameraId;
        document.getElementById("iframeChart").src = '/#/Livevideo/'+CameraDetails.cameraId
        
}

function GetMap() {
        debugger;
    var Obj=CityList.filter(function (el)
    {
      return el.city='Acampo' ;
    }
    );
    
}

async function fetchAsyncGet (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}



async function FilldropdownState (url) {
    let customerslist=await fetchAsyncGet(baseURL+'USCity/GetAllState');
    let statelist=customerslist.usStateList;
    var ddlstate = document.getElementById("ddlstate");
    Filldropdown(ddlstate,statelist)  
   // await GetCity();        
}
    
 function Filldropdown (dropdown,data) {
    for (var i = 0; i < data.length; i++) {
               var option = document.createElement("OPTION");
               //Set Customer Name in Text part.
               option.innerHTML = data[i];
               //Set CustomerId in Value part.
               option.value = data[i];
               //Add the Option element to DropDownList.
               dropdown.options.add(option);
           }
}
    
   
function FilldropdownCity (dropdown,data) {
    debugger;
    for (var i = 0; i < data.length; i++) {
               var option = document.createElement("OPTION");
               //Set Customer Name in Text part.
               option.innerHTML = data[i];
               //Set CustomerId in Value part.
               option.value = data[i];
               //Add the Option element to DropDownList.
               dropdown.options.add(option);
           }
}
async function GetCity() {
    let ddlstate = document.getElementById("ddlstate").value;
    let url=baseURL+'USCity/GetCity';
    var cityList= await getHTML(url,ddlstate);
    let ddlCity = document.getElementById("ddlCity");//.value;
    debugger;
   // FilldropdownCity(ddlCity,cityList);
    
}



function getHTML(url,postObj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        //xhr.open('get', url, true);
        //xhr.responseType = 'document';
        let post = JSON.stringify(postObj)
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                let dropdown = document.getElementById("ddlCity");//.value;
                document.getElementById("ddlCity").innerHTML = null;
                CityList=JSON.parse(xhr.response);
                for (var i = 0; i < CityList.length; i++) {
               var option = document.createElement("OPTION");
               //Set Customer Name in Text part.
               option.innerHTML = CityList[i].city;
               //Set CustomerId in Value part.
               option.value = CityList[i].city;
               //Add the Option element to DropDownList.
               dropdown.options.add(option);
           }

               // return pushpinInfos;

            } else {
                reject(status);
            }
        };
        xhr.send(post);
    });
}



function fetchAsyncPost (url,postObj) {
    let xhr = new XMLHttpRequest()
    let post = JSON.stringify(postObj)
xhr.open('POST', url, true)
xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
xhr.send(post);

xhr.onload = function () {
    if(xhr.status === 201) {
        console.log("Post successfully created!") 
    }
    if(xhr.status === 200) {
        var pushpinInfos=JSON.parse(xhr.response);
        return pushpinInfos;
    }
}
}



function ShowCameraonMap(map){
let postObj = {'PAGE_NUMBER': 1, 'PAGE_SIZE': 10};

let post = JSON.stringify(postObj)
 
const url =baseURL+'Camera/GetAllCameraDetails' ;
var city=fetchAsyncPost(url,post)
let xhr = new XMLHttpRequest()
 
xhr.open('POST', url, true)
xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
xhr.send(post);
 
xhr.onload = function () {
    if(xhr.status === 201) {
        console.log("Post successfully created!") 
    }
    if(xhr.status === 200) {
        var pushpinInfos=JSON.parse(xhr.response);
        var locs = [];
        var pinLayer = new Microsoft.Maps.EntityCollection();
        for (var i = 0 ; i < pushpinInfos.length; i++) {
            locs[i] = new Microsoft.Maps.Location(pushpinInfos[i].latitude, pushpinInfos[i].longitude);
            
            pushpinInfos[i].icon='./redCamera.png'
            if(pushpinInfos[i].iP_Address){
                pushpinInfos[i].icon='./greenCamera.png';
            }
            var pin = new Microsoft.Maps.Pushpin(locs[i], {icon: pushpinInfos[i].icon, width:'20px', height:'20px'});
            pin.Title = pushpinInfos[i].cameraIp;
            pin.Description = pushpinInfos[i].remark;
			//pin.redirectUrl = pushpinInfos[i].redirectUrl;
            pin.cameraId=pushpinInfos[i].cameraId
            pinLayer.push(pin); 
            Microsoft.Maps.Events.addHandler(pin, 'click', displayInfobox);
        }
        map.entities.push(pinLayer);
        var bestview = Microsoft.Maps.LocationRect.fromLocations(locs);
        map.setView({ center: bestview.center, zoom: 6 });
        console.log("Post successfully created!") ;
    }

}}


        
    function GetMap() {
        debugger;
        var pushpinInfos = [];
        pushpinInfos[0] = { 'redirectUrl':'./#/Dashboard/41','lat': 35.59000000, 'lng': -87.92000000, 'title': 'Camera 1', 'description': 'Tennessee', 'icon' :'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/24/Map-Marker-Marker-Outside-Chartreuse-icon.png' };
        pushpinInfos[1] = {'redirectUrl':'/#/Dashboard/40', 'lat': 33.59000000, 'lng': -86.92000000, 'title': 'Camera 2', 'description': 'Birmingham', 'icon' :'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/24/Map-Marker-Marker-Outside-Chartreuse-icon.png' };      
      
		var infoboxLayer = new Microsoft.Maps.EntityCollection();
        var pinLayer = new Microsoft.Maps.EntityCollection();
        var apiKey = 'AuU1ciWa-v2D4MXrLhXxgbVY6676TOmemFJ3LpCO52P5Mnx8_KIdez1M7G2j0ZIN';
        var curPos = new Microsoft.Maps.Location(35.24761672238248,   -87.22187500000001);
        var mapOptions = {
          credentials: 'AuU1ciWa-v2D4MXrLhXxgbVY6676TOmemFJ3LpCO52P5Mnx8_KIdez1M7G2j0ZIN',
          center: curPos,
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: 7,
          disableScrollWheelZoom:true
      };
        var map = new window.Microsoft.Maps.Map('#myMap',mapOptions);
        //var map = new Microsoft.Maps.Map(document.getElementById("myMap"), { credentials: apiKey });
        // Create the info box for the pushpin
        pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false });
        infoboxLayer.push(pinInfobox);
         var locs = [];
        ShowCameraonMap(map);
        map.entities.push(infoboxLayer);
       
    }
    function setCookie(name,value,expires){
        document.cookie = name + "=" + value + ((expires==null) ? "" : ";expires=" + expires.toGMTString())
    }

    function displayInfobox(e) {
            let CameraDetails={};
            CameraDetails['longitude']=e.location.longitude
            CameraDetails['latitude']=e.location.latitude
            CameraDetails['description']=e.target.Description
            CameraDetails['title']=e.target.Title;
            CameraDetails['cameraId']=e.target.cameraId
            let jsonstring=JSON.stringify(CameraDetails);
            var expirydate=new Date();
            expirydate.setTime( expirydate.getTime()+(100*60*60*24*100) )
            debugger;
            setCookie('CameraDetails',jsonstring,expirydate)		  
            ShowCameraDetails();
            //window.open(e.target.redirectUrl,"_self")
            pinInfobox.setOptions({ title: e.target.Title, description: e.target.Description, visible: true, offset: new Microsoft.Maps.Point(0, 25) });
            pinInfobox.setLocation(e.target.getLocation());
    }
    function hideInfobox(e) {
        pinInfobox.setOptions({ visible: false });
    }