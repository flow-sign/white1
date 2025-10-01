// Form validation and submission
document.getElementById('lead-form-element').addEventListener('submit', function (e) {
    e.preventDefault()

    // Clear previous errors
    clearErrors()

    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        consent: document.getElementById('consent').checked
    }

    // Validate form
    const errors = validateForm(formData)

    if (Object.keys(errors).length === 0) {
        // Form is valid - show success message
        showSuccess()
        console.log('Form submitted:', formData)
    } else {
        // Show errors
        displayErrors(errors)
    }
})

function validateForm(data) {
    const errors = {}

    if (!data.firstName) {
        errors.firstName = 'Namn är obligatoriskt'
    }

    if (!data.lastName) {
        errors.lastName = 'Efternamn är obligatoriskt'
    }

    if (!data.email) {
        errors.email = 'E-post är obligatoriskt'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Ange en giltig e-postadress'
    }

    if (!data.phone) {
        errors.phone = 'Telefonnummer är obligatoriskt'
    }

    if (!data.consent) {
        errors.consent = 'Du måste godkänna för att fortsätta'
    }

    return errors
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message')
    const inputElements = document.querySelectorAll('.form-input')

    errorElements.forEach(el => {
        el.classList.add('hidden')
        el.textContent = ''
    })

    inputElements.forEach(el => {
        el.classList.remove('error')
    })
}

function displayErrors(errors) {
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(field + '-error')
        const inputElement = document.getElementById(field)

        if (errorElement) {
            errorElement.textContent = errors[field]
            errorElement.classList.remove('hidden')
        }

        if (inputElement) {
            inputElement.classList.add('error')
        }
    })
}

function showSuccess() {
    document.getElementById('form-container').classList.add('hidden')
    document.getElementById('success-container').classList.remove('hidden')
}

// Smooth scroll to form
function scrollToForm() {
    document.getElementById('lead-form').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

// Clear error when user starts typing
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            this.classList.remove('error')
            const errorElement = document.getElementById(this.name + '-error')
            if (errorElement) {
                errorElement.classList.add('hidden')
            }
        }
    })
})

// Clear consent error when checkbox is checked
document.getElementById('consent').addEventListener('change', function () {
    if (this.checked) {
        const errorElement = document.getElementById('consent-error')
        if (errorElement) {
            errorElement.classList.add('hidden')
        }
    }
})
