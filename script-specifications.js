function filterProducts(category, event) {
    // Hide all products
    var products = document.querySelectorAll('.grid-item');
    products.forEach(function(product) {
        product.classList.add('hidden');
    });

    // Show selected category products
    var selectedProducts = document.querySelectorAll('.' + category);
    selectedProducts.forEach(function(product) {
        product.classList.remove('hidden');
    });

    // Highlight the selected button
    var buttons = document.querySelectorAll('.sidebar ul li button');
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });

    // Add active class to the clicked button
    event.currentTarget.classList.add('active');
    }
    // Get all dropdown contents
    function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
    }
    // image zoom effect
    const imgContainer = document.querySelector('.product-image');
    const zoomImg = document.querySelector('.zoom-img');
    imgContainer.addEventListener('mousemove', function (e) {
        const { left, top, width, height } = imgContainer.getBoundingClientRect();
        const x = e.pageX - left;
        const y = e.pageY - top;

        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;

        zoomImg.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        });
     // Get the popup element
const popup = document.getElementById("quoteFormPopup");

// Get the "Request a Quote" button that opens the popup
const requestQuoteBtn = document.getElementById("requestQuoteBtn");

// Get the close button
const closeBtn = document.querySelector(".close");


// Show popup when "Request a Quote" button is clicked
requestQuoteBtn.onclick = function(event) {
  event.preventDefault(); // Prevent default anchor behavior
  popup.style.display = "flex";
}

// ##########################################################################

const popupInfo = document.getElementById("myform");
const submitbtn = document.getElementById("msgBtn");

submitbtn.onclick = function(event) {
  event.preventDefault()
  const quoteform = document.getElementById("quoteForm");

//   const formData = new URLSearchParams({
//     "name": quoteform.elements['name'].value,
//     "email": quoteform.elements['email'].value,
//     "phone": quoteform.elements['phone'].value,
//     "city": quoteform.elements['city'].value,
//     "pincode": quoteform.elements['pincode'].value,
//     "service": quoteform.elements['service'].value,
//     "quantity": quoteform.elements['quantity'].value,
//     "message": document.getElementById("message").value
// });

  const formData = new URLSearchParams(new FormData(quoteform));
  console.log(formData)

  fetch('/submit_quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',  // Send as JSON
    },
    body: formData.toString()
  })
  .then(console.log("form data sent!!!"))  // Parse the JSON response
  .catch((error) => {
    console.error('Error:', error);
  });

  popup.style.display = "flex";
  popupInfo.innerHTML = '<p>Thanks for contacting us! We will get in touch with you shortly.</p>'; // Correct usage of innerHTML
}

// ##########################################################################

// Close the popup when the close button is clicked
closeBtn.onclick = function() {
  popup.style.display = "none";
}

// Close the popup when clicking outside of the form
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}

















