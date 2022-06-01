
function selectElement(element){

    return document.querySelector(element)
}

const toggleMenuBtn = selectElement("#menu-toggle");
function toggleMenu(){
   
    const navEl = selectElement('#nav')
    navEl.classList.toggle('activated')
    toggleMenuBtn.classList.toggle('activated')
}
 toggleMenuBtn.addEventListener('click',toggleMenu)

 const createFormToggleBtn = selectElement('.new-issue-link')
 const createForm = selectElement(".create-issue");
 const reportSection = selectElement('#reports')
 const reportLink = selectElement('.report-link')
 const cancelFormBtn = selectElement(".cancel-form-btn");

 function closeReportSection(){
     reportSection.classList.toggle('activated')
 }
 function openReportSection(){
     reportSection.classList.remove('activated')
     createForm.classList.remove('activated')
 }
 function createFormToggle(){
     closeReportSection();
    createForm.classList.toggle('activated')
    
 }

 createFormToggleBtn.addEventListener('click',createFormToggle)
 reportLink.addEventListener('click',openReportSection)
 cancelFormBtn.addEventListener('click',openReportSection)