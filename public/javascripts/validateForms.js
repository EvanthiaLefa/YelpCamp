(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to

    bsCustomFileInput.init()


    const forms = document.querySelectorAll('.validated-form')
    // Loop over them and prevent submission
    //make an array from this thing of forms
    Array.from(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
    
        form.classList.add('was-validated')
      }, false)
    })
    })()