const prices = {
    'landing-page': {
        pm: 400,
        design: 200,
        developer: 100,
        qa: 100
    },
    'online-store': {
        pm: 600,
        design: 300,
        developer: 200,
        qa: 150,
    },
    'web-application': {
        pm: 800,
        design:400,
        developer:300,
        qa: 200,
    },
    'mobile-application': {
        pm: 1000,
        design: 500,
        developer: 400,
        qa: 250,
    }
};

function GetFormValues ()  {
   const websiteTypeElement = document.querySelector('#project-type');

   const pmEl = document.querySelector ('#Product-Management');
   const designeEl = document.querySelector ('#designe');
   const developerEl = document.querySelector ('#developer');   
   const qaEl = document.querySelector ('#qa');
    
   return {
        websiteType: websiteTypeElement.value,
        pm: pmEl.checked,
        design: designeEl.checked,
        developer: developerEl.checked,
        qa: qaEl.checked,
   }
     
} 
function calkulateWork (){
    const values = GetFormValues ();

    let totalPrice = 0;

    const workTypes = prices[values.websiteType]

    if (values.pm){
        totalPrice = workTypes.pm;
    }
    if (values.design) {
        totalPrice = totalPrice + workTypes.design;
    } 
    if (values.developer) {
        totalPrice = totalPrice + workTypes.developer;
    }
    if (values.qa) {
        totalPrice = totalPrice + workTypes.qa;
    } 
     
    const totalPriceEl = document.querySelector('#total-price');

    totalPriceEl.textContent = totalPrice;

    console.log(totalPrice)

}

const formEl = document.querySelector('#project-prise-form');
const emailModal = document.querySelector('#modal-email');
const succsessModal = document.querySelector('#succsess-modal');

formEl.addEventListener('change',calkulateWork);

formEl.addEventListener('submit', function(event){
    event.preventDefault();

    emailModal.classList.add('modal-active');
});

const closeButtons = document.querySelectorAll('.modal-close-btm');

closeButtons.forEach( function(closeBtn) {
    closeBtn.addEventListener('click', function (){
        const inputContainer = document.querySelector('#email-input-container');
        inputContainer.classList.remove('email-input-container-error');

        emailModal.classList.remove('modal-active');
        succsessModal.classList.remove('modal-active');
    });
});

const modalEmailContainer = document.querySelector('#modal-email-container');

modalEmailContainer.addEventListener('submit',function(event) {
    event.preventDefault();

    const userEmailInput = document.querySelector('#user-email');

    if (userEmailInput.value) {


        
        const formData = new FormData(formEl)

        formData.append('Email', userEmailInput.value);



        fetch('/', {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        })
            .then(function() {
                emailModal.classList.remove('modal-active');
                succsessModal.classList.add('modal-active'); 
            })
            .catch((error) => alert(error))

        return;



    }

    
    const inputContainer = document.querySelector('#email-input-container');
    inputContainer.classList.remove('email-input-container-error');


 
});
