var sideBtn = document.querySelector('.sidebaricon');
var togglenavbar = false;
var navbar = document.querySelector('.botoescabecalho');


sideBtn.addEventListener('click', function () {
    togglenavbar = !togglenavbar;
    if (togglenavbar == false) {
        navbar.style.right = "0";

    }   
    else {
        navbar.style.right = "100vw";

    }
})