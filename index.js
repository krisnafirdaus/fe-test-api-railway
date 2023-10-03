// Fetch data untuk header
function fetchHeaderData() {
    fetch('https://api-express-railway-production.up.railway.app/header')
        .then(response => response.json())
        .then(data => {
            const headerElement = document.querySelector('header .header-text');
            headerElement.querySelector('h1').textContent = data.title;
            headerElement.querySelector('p').textContent = data.description;
        })
        .catch(error => console.error('Error fetching header data:', error));
}

// Post data dari contact form
function postContactFormData(event) {
    event.preventDefault();

    // Ambil data dari form
    const form = event.target;
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;

    // Buat objek data
    const data = {
        name: name,
        email: email,
        message: message
    };

    // Kirim data sebagai JSON
    fetch('https://api-express-railway-production.up.railway.app/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Terima kasih! Pesan Anda telah terkirim.');
            form.reset();
        } else {
            alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
        }
    })
    .catch(error => console.error('Error sending contact data:', error));
}


// Event listener untuk form submission
document.querySelector('.contact-form form').addEventListener('submit', postContactFormData);

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchHeaderData);
