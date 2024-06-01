document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');

  registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const selectedPlan = document.querySelector('input[name="selectedPlan"]').value;

      if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
      }

      try {
          const response = await fetch('http://localhost:3000/api/users/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                  confirmPassword,
                  subscriptionType: selectedPlan
              })
          });

          if (response.ok) {
              alert("Registration successful!");
              window.location.href = 'login.html';
          } else {
              const errorData = await response.json();
              alert("Error: " + errorData.message);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again later.');
      }
  });
});
