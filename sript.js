
    const vehicle = document.getElementById('vehicle').value;
    const pickupDate = document.getElementById('pickupDate').value;
    // Simple confirmation message
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    // Animate form fields when focused
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#4a00e0';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = '#555';
            
            // Simple validation
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff3860';
                this.style.boxShadow = '0 0 0 2px rgba(255, 56, 96, 0.2)';
            } else {
                this.style.borderColor = '#4a00e0';
                this.style.boxShadow = '0 0 0 2px rgba(74, 0, 224, 0.2)';
            }
        });
    });
    
    // Date validation
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    
    pickupDate.addEventListener('change', function() {
        // Ensure pickup date is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(this.value);
        
        if (selectedDate < today) {
            alert('Please select a future date for pickup.');
            this.value = '';
        }
        
        // Update return date min attribute
        if (this.value) {
            returnDate.min = this.value;
        }
    });
    
    returnDate.addEventListener('change', function() {
        const pickup = new Date(pickupDate.value);
        const returnD = new Date(this.value);
        
        if (returnD < pickup) {
            alert('Return date must be after the pickup date.');
            this.value = '';
        }
    });
    
    // Form submission with enhanced animation
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        
        // Check if all fields are filled
        let isValid = true;
        formFields.forEach(field => {
            if (field.value.trim() === '') {
                field.style.borderColor = '#ff3860';
                field.style.boxShadow = '0 0 0 2px rgba(255, 56, 96, 0.2)';
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const vehicle = document.getElementById('vehicle').value;
        const pickupDate = formatDate(document.getElementById('pickupDate').value);
        const returnDate = formatDate(document.getElementById('returnDate').value);

        // Add loading animation to button
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<span class="loading-spinner"></span> Processing...';
        submitButton.disabled = true;
        
        // Simulate a server request
        setTimeout(() => {
            // Show confirmation message with animation
            confirmationMessage.classList.remove('hidden');
            confirmationMessage.classList.add('show');
            confirmationMessage.innerHTML = `
                <h3>Booking Confirmed! 🎉</h3>
                <p>Thank you, <strong>${name}</strong>!</p>
                <p>You have booked a <strong>${vehicle}</strong></p>
                <p>Pickup date: <strong>${pickupDate}</strong></p>
                <p>Return date: <strong>${returnDate}</strong></p>
                <p>A confirmation email has been sent to <strong>${email}</strong>.</p>
            `;
            
            // Reset the form
            this.reset();
            
            // Reset button
            submitButton.innerHTML = 'Book Now';
            submitButton.disabled = false;
            
            // Scroll to confirmation message
            confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add success animation to the form
            bookingForm.classList.add('success');
            
            // Reset field styles
            formFields.forEach(field => {
                field.style.borderColor = '#ddd';
                field.style.boxShadow = 'none';
            });
        }, 1500);
    });
    
    // Format date for display
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
});

// Add some scroll animations
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const header = document.querySelector('header');
    
    // Parallax effect for header
    if (scrollPosition > 0) {
        header.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Add a small animation when the page loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});