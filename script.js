async function generateCard() {
    const cardNumber = generateCardNumber();
    const cardHolder = await generateCardHolder();  // Дождемся ответа от API
    const expiryDate = generateExpiryDate();

    document.getElementById('card-number').textContent = cardNumber;
    document.getElementById('card-holder').textContent = cardHolder;
    document.getElementById('expiry-date').textContent = expiryDate;
}

function generateCardNumber() {
    let cardNumber = '**** **** **** ****';
    cardNumber = cardNumber.replace('****', generateRandomNumber(4))
                           .replace('****', generateRandomNumber(4))
                           .replace('****', generateRandomNumber(4))
                           .replace('****', generateRandomNumber(4));
    return cardNumber;
}

async function generateCardHolder() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const firstName = data.results[0].name.first;
        const lastName = data.results[0].name.last;
        return `${firstName} ${lastName}`;
    } catch (error) {
        console.error("Error fetching name from API:", error);
        return "Имя Фамилия";  // Если API недоступен, вернем стандартное имя
    }
}

function generateExpiryDate() {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const year = String(new Date().getFullYear() + Math.floor(Math.random() * 5)).slice(-2);
    return `${month}/${year}`;
}

function generateRandomNumber(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}
