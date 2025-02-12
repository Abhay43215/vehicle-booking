document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const name = document.getElementById('name').value;
    const vehicle = document.getElementById('vehicle').value;
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate').value;

    // Simple confirmation message
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.classList.remove('hidden');
    confirmationMessage.innerHTML = `Thank you, ${name}! You have booked a ${vehicle} from ${pickupDate} to ${returnDate}.`;
    
    // Clear the form
    this.reset();
});