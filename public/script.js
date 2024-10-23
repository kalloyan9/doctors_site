// Handle form submission
document.getElementById('appointmentForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); // Convert form data to an object

    try {
        const response = await fetch('http://localhost:8080/submit-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Send form data as JSON
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Something went wrong');
        }

        alert('Вашата заявка беше изпратена успешно!'); // Success message in Bulgarian
        event.target.reset(); // Reset the form
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Грешка при изпращане на заявката. Опитайте отново.'); // Error message in Bulgarian
    }
});
