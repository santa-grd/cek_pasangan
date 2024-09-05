document.getElementById('female-name-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addEntry('female');
    }
});

document.getElementById('male-name-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addEntry('male');
    }
});
function capitalizeFirstLetter(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
function capitalizeAndAddSymbol(text) {
    return text.charAt(0).toUpperCase() + text.slice(1) + '💕';
}

function addEntry(type) {
    const femaleNameInput = document.getElementById('female-name-input');
    const maleNameInput = document.getElementById('male-name-input');
    let name = type === 'female' ? femaleNameInput.value.trim() : maleNameInput.value.trim();
    const partner = type === 'female' ? maleNameInput.value.trim() : femaleNameInput.value.trim();
    
    if (name === '' && partner === '') return;
	name = capitalizeFirstLetter(name);
	name = capitalizeAndAddSymbol(name);
	
    const selectedImage = type === 'female' 
        ? maleImages[Math.floor(Math.random() * maleImages.length)] 
        : femaleImages[Math.floor(Math.random() * femaleImages.length)];

    const leftTableBody = document.querySelector('#left-partner-table tbody');
    const rightTableBody = document.querySelector('#right-partner-table tbody');

    const leftRows = leftTableBody.querySelectorAll('tr');
    const rightRows = rightTableBody.querySelectorAll('tr');

    if (rightRows.length >= 2) {
        const firstRightRow = rightRows[0];
        rightTableBody.removeChild(firstRightRow);
        if (leftRows.length >= 2) {
            leftTableBody.removeChild(leftRows[0]); 
        }
        leftTableBody.appendChild(firstRightRow);
    }

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>
            <img src="${selectedImage.url}" alt="${partner}">
            <div>${selectedImage.name}</div>
        </td>
    `;
    rightTableBody.appendChild(row);

    femaleNameInput.value = '';
    maleNameInput.value = '';
}
