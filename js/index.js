var nameInput = document.getElementById("siteName");  // input kolo el bd5l feh l name
var linkInput = document.getElementById("siteLink");  // input kolo el bd5l feh l link
var buttonModal = document.getElementById("test");    // input kolo bta3 l zorar

var webSitesList = []; // Array shayl objects el website


if (nameInput.value == "" || linkInput.value == ""){
    buttonModal.setAttribute("data-bs-toggle","modal")
    buttonModal.setAttribute("data-bs-target","#exampleModal")
}
else{
    buttonModal.removeAttribute("data-bs-toggle")
    buttonModal.removeAttribute("data-bs-target")
}

if (localStorage.getItem("websites") != null) // zbon adim
{
    webSitesList = JSON.parse(localStorage.getItem("websites"))
    showData()
}

function addWebsite(){

    if( validateUrl() == true && validateName() == true )
    {
        var webSite = {
            name: nameInput.value , 
            link: linkInput.value
        }
    
        webSitesList.push(webSite)
        localStorage.setItem("websites" , JSON.stringify(webSitesList) )
        showData() 
        buttonModal.removeAttribute("data-bs-toggle")
        buttonModal.removeAttribute("data-bs-target")
    }
    else{
        buttonModal.setAttribute("data-bs-toggle","modal")
        buttonModal.setAttribute("data-bs-target","#exampleModal")
    }
}

function showData(){
    var box = '';

    for( var i = 0 ; i < webSitesList.length ; i++ ){
        box = box + ` <tr>
        <td> ` +(i+1) + ` </td>
        <td> ` + webSitesList[i].name + ` </td>
        <td><a href=" `+ webSitesList[i].link +` " target="_blank"><button type="button" class="btn btn-primary"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
        <td><button onclick="deleteSite(`+i+`)" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>` 
    }
    document.getElementById("tableBody").innerHTML = box ;
}

function clearform(){
    nameInput.value = ""
    linkInput.value = ""

    nameInput.classList.remove("is-invalid")
    nameInput.classList.remove("is-valid")
    linkInput.classList.remove("is-invalid")
    linkInput.classList.remove("is-valid")

    buttonModal.setAttribute("data-bs-toggle","modal")
    buttonModal.setAttribute("data-bs-target","#exampleModal")
}

function deleteSite(index){
    webSitesList.splice(index , 1);
    localStorage.setItem("websites" , JSON.stringify(webSitesList) )
    showData();
}

// -----------------------------REGULAR EXPRESSION-------------------------------------------

function validateName(){
    var regex1 = /[a-zA-Z0-9]{3,}/ ;

    if(regex1.test(nameInput.value) == true){
        return true
    }
    else
    {
        return false ;     
    }
}

function validateUrl(){
    var regex2 = /^(https:\/\/)(w){3}(\.){1}.{2,20}(\.com|\.net)$/ ;

    if(regex2.test(linkInput.value) == true){
        return true
    }
    else
    {
        return false ;     
    }
}


// -----------------------------Validation Icons-------------------------------------------


nameInput.addEventListener( "keyup" , function(){

    if(validateName() == true ){
        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
        buttonModal.removeAttribute("data-bs-toggle")
        buttonModal.removeAttribute("data-bs-target")
    }
    else if(validateName() != true){
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid")
        buttonModal.setAttribute("data-bs-toggle","modal")
        buttonModal.setAttribute("data-bs-target","#exampleModal")
    }
    
})

linkInput.addEventListener( "keyup" , function(){
    
    if(validateUrl() == true ){
       linkInput.classList.add("is-valid")
       linkInput.classList.remove("is-invalid")
       buttonModal.removeAttribute("data-bs-toggle")
       buttonModal.removeAttribute("data-bs-target")
    }
    else if(validateUrl() != true ){
        linkInput.classList.add("is-invalid")
        linkInput.classList.remove("is-valid")
        buttonModal.setAttribute("data-bs-toggle","modal")
        buttonModal.setAttribute("data-bs-target","#exampleModal")
    }
})


// -----------------------------MODAL-------------------------------------------

// buttonModal.setAttribute("data-bs-toggle","modal")
// buttonModal.setAttribute("data-bs-target","#exampleModal")

// buttonModal.removeAttribute("data-bs-toggle")
// buttonModal.removeAttribute("data-bs-target")

// var modalid = document.getElementById("exampleModal")
//     var  modal = new bootstrap.Modal(modalid)
//     modal.show()