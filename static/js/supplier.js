document.addEventListener('DOMContentLoaded', function() {
    const suppliers = document.querySelectorAll('.suppliers__image');

    suppliers.forEach(supplier => {
        supplier.addEventListener('click', function() {
            const supplierId = this.getAttribute('supplier-id');
            window.location.href = `/suppliers/?id=${supplierId}`;
        });
    });
});

const urlParams = new URLSearchParams(window.location.search);
const supplierId = urlParams.get('id');
console.log("supplierId", supplierId);
const supplierDescription = document.querySelector('.reviews-description__text');
const supplierImage = document.querySelector('.reviews-header__logo');
const reviewsContainer = document.querySelector('.reviews-container');

if (supplierId) {
    fetch(`https://promo.tdanix.ru/api/suppliers/${supplierId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {

            supplierDescription.textContent = data.data.about
        })
        .catch(error => console.error('Ошибка:', error));

    fetch(`https://promo.tdanix.ru/api/comments?supplier_id=${supplierId}   `, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("data2", data.data);
            if (data.data.length > 0) {
                data.data.forEach(review => {
                    const reviewContainer = Object.assign(document.createElement('div'), {className: 'review-container'});
                    const reviewProfileName = Object.assign(document.createElement('div'), {className: 'review-profile-name'});
                    const reviewProfileText = Object.assign(document.createElement('span'), {className: 'review-profile-name__text'});
                    const reviewTextContainer = Object.assign(document.createElement('div'), {className: 'review-text-container'});
                    const reviewText = Object.assign(document.createElement('span'), {className: 'review-text'});
                    const reviewImageContainer = Object.assign(document.createElement('div'), {className: 'review-image-container'});
                    const reviewImage = Object.assign(document.createElement('img'), {className: 'review-image'});

                    reviewProfileText.textContent = review.user_fio;
                    reviewText.textContent = review.comment_text;

                    // Добавляем элементы в контейнер отзыва
                    reviewProfileName.appendChild(reviewProfileText);
                    reviewTextContainer.appendChild(reviewText);
                    reviewContainer.appendChild(reviewProfileName);
                    reviewContainer.appendChild(reviewTextContainer);
                    reviewContainer.appendChild(reviewImageContainer);
                    reviewImageContainer.appendChild(reviewImage)

                    reviewsContainer.appendChild(reviewContainer);
                });
            } else if (data.data.length === 0) {
                const emptyReviews = document.createElement("div")
                emptyReviews.className = "empty-review"
                emptyReviews.textContent = "Отзывов еще нет..."
                document.querySelector(".review-add-container").style.marginTop = "1vw"
                reviewsContainer.appendChild(emptyReviews);
            }
        })
        .catch(error => console.error('Ошибка:', error));
}

async function handleAddReview(event) {
    event.preventDefault();

    const reviewText = document.querySelector('.review-add-textarea').value;


    const response = await fetch('https://promo.tdanix.ru/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': GetCookie('token')
        },
        body: JSON.stringify({
            supplier_id: supplierId,
            comment_text: reviewText,
            attachment_id: null,
        }),
    });
    const result = await response.json();
    if (response.ok) {
        alert("YRAAAA")
        window.location.reload()
    }
}