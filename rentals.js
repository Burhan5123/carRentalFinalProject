var xhr = new XMLHttpRequest();
var r=r || [];

function initfunction()
{
	var current_datetime = new Date();
	var formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " ";
    formatted_date += current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();

	document.getElementById("mydate").innerHTML = formatted_date;

}

function loaddata() {

	document.getElementById("lastName").addEventListener("keyup", function (){ searchLastName(this.value);},false);
	
        xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
         r = JSON.parse(xhr.responseText);
    
        }
      };
      xhr.open("GET", "rentalclients.json", true);
      xhr.send();

}

function searchLastName(lastName) {
	
	var output="<tr class=heading><th></th><th>Last Name</th><th>First Name</th></tr>";
	var searchname;
    
    for(var i=0; i<r.length; i++)
	{
		var obj=r[i];
		searchname=obj.last_name;
		if(searchname.startsWith(lastName))
		{	
				
            output+="<tr><td>";
            output+='<input type="radio" value="'+i+'" name="listitem" onchange=fill(this.value)>';
            output+="</td><td>";
			output+=obj.last_name;
			output+="</td><td>";
			output+=obj.first_name;
			output+="</td></tr>";

		}
				
	}
document.getElementById("searchresults").innerHTML=output;

}


function calculate(){

    var output = "";
    var carType = "";
    var firstName = document.getElementById("firstname").value;
	var lastName = document.getElementById("lastname").value;
	var address = document.getElementById("address").value;
	var state = document.getElementById("state").value;
	var email = document.getElementById("emailId").value;
    var phoneNumber = document.getElementById("phnumber").value;
    var totalCost;
    var carCost=parseFloat(document.querySelector('input[name=carType]:checked').value);
    var rentalTime = parseFloat(document.getElementById("time").value);
    var additionalCost = parseFloat(0);
    var additionalStuff="";

    if(carCost==15){
        carType = "Car Type: Compact";

    }

    else if(carCost==20){
        carType = "Car Type: Mid-Size";

    }

    else if(carCost==35){
        carType = "Car Type: Luxury";

    }

    else if(carCost==40){
        carType = "Car Type: Van/Truck";

    }

    if(document.querySelector('input[name=rack]:checked')){
        additionalCost+=(parseFloat(document.querySelector('input[name=rack]:checked').value) * rentalTime);
        additionalStuff += "Roof Rack or Bicycle Rack extra    $5/day <br>";
        
    }

    if(document.querySelector('input[name=gps]:checked')){
        additionalCost+=parseFloat(document.querySelector('input[name=gps]:checked').value);
        additionalStuff += "GPS extra    $10 <br>";
    }

    if(document.querySelector('input[name=seat]:checked')){
        additionalStuff += "Child Seat free <br>";
    }


    totalCost = (carCost*rentalTime) + additionalCost;

    output+= firstName + " " + lastName + "<br>";
    output+= address + "<br>";
    output+= state + "<br>";
    output+= email + "<br>";
    output+= phoneNumber + "<br><br>";
    output+= carType + "<br>";
    output+= additionalStuff + "<br>";
    output+= "Rental Time: " + rentalTime + " Days" + "<br>";
    output+= "Total Cost: $" + totalCost;
    
    document.getElementById("final").innerHTML=output;

}

function fill(count) {
    document.getElementById("display").style.visibility="visible";

    document.getElementById("lastname").value = r[count].last_name;
    document.getElementById("firstname").value = r[count].first_name;
    document.getElementById("address").value = r[count].address;
    document.getElementById("state").value = r[count].state_prov;
    document.getElementById("emailId").value = r[count].email;
    document.getElementById("phnumber").value = r[count].phone;
	
}