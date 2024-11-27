var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var data = document.getElementById("data");
var siteList = [];
if(localStorage.getItem('sites')){
    siteList = JSON.parse(localStorage.getItem('sites'));
    display();
}


function addSite(){
    if(Validation(siteName) && Validation(siteUrl)){
    sitObj = {
        id:Date.now(),
        sName:siteName.value,
        sUrl:siteUrl.value,
    };
    siteList.push(sitObj);
    localStorage.setItem("sites",JSON.stringify(siteList));
    display();
    clearForm();
}
}

function display(){
    box='';
    for(var i=0 ; i<siteList.length ; i++ ){
        box+= `<tr class="border-top d-table-row pt-5 mt-5">
                <td class="py-3">${i+1}</td>
                <td class="text-capitalize">${siteList[i].sName}</td>
                <td><a href="${siteList[i].sUrl}" target="blank"><button class="btn btn-primary white"><i class="fa-regular fa-eye pe-2"></i>Visite</button></a></td>
                <td><button onclick="deleteIteam(${siteList[i].id})" class="btn btn-danger"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
                </tr>
                `
    }
    data.innerHTML=box;
}

function clearForm(){
    siteName.value = null;
    siteUrl.value = null;
}

function deleteIteam(id){
    siteList = siteList.filter(function(ele){return ele.id !==id});
    localStorage.setItem('sites',JSON.stringify(siteList));
    display();
}


function Validation(input){
    var Regex = {
        siteName:/^[a-z]{2,}$/,
        siteUrl:/^https?:\/\/[^\s"'>]+$/
    };
    if(Regex[input.id].test(input.value)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        input.nextElementSibling.classList.replace('d-block','d-none');
        return true;
    }
    else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.nextElementSibling.classList.replace('d-none','d-block');
        return false;
    }
}