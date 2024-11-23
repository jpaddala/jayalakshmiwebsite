 // Get the modal
 var modal = document.getElementById("quoteFormPopup");

 // Get the button that opens the modal
 var btn = document.getElementById("openPopup");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal
 btn.onclick = function() {
   modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
   modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }


// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.getElementById('quoteForm');
//   const popup = document.getElementById('quoteFormPopup');
//   const closeBtn = document.querySelector('.close');

//   form.addEventListener('submit', function (e) {
//       e.preventDefault(); // Prevent traditional form submission

//       // Show the popup message
//       const successMessage = document.createElement('p');
//       successMessage.textContent = 'Thanks for contacting us! We will get in touch with you shortly.';
//       popup.querySelector('.popup-content').appendChild(successMessage);
      
//       // Display the popup
//       popup.style.display = 'block';

//       // Optional: Hide the form after submission
//       form.style.display = 'none';

//       // Simulate form submission (you can add your form submission logic here)
//       console.log('Form data:', new FormData(form));

//       // Reset form (optional, depending on how you want it to behave)
//       form.reset();
//   });

//   // Close popup on click of the close button
//   closeBtn.addEventListener('click', function () {
//       popup.style.display = 'none';
//       form.style.display = 'block'; // Show the form again after closing
//   });

//   // Close popup when clicking outside of it
//   window.addEventListener('click', function (event) {
//       if (event.target === popup) {
//           popup.style.display = 'none';
//           form.style.display = 'block'; // Show the form again after closing
//       }
//   });
// });
