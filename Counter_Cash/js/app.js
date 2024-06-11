// Data riwayat pembelian barang
let items = [];

// Function untuk menampilkan daftar barang
function displayItems(itemList = items) {
    const itemListElement = document.getElementById('itemList');
    itemListElement.innerHTML = '';

    itemList.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2 border">${item.name}</td>
            <td class="px-4 py-2 border">${item.description}</td>
            <td class="px-4 py-2 border">${item.quantity}</td>
            <td class="px-4 py-2 border">${item.price}</td>
            <td class="px-4 py-2 border">${item.date}</td>
            <td class="px-4 py-2 border">
                <button onclick="editItem(${index})" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteItem(${index})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        itemListElement.appendChild(row);
    });

    // Hitung total harga
    const totalPrice = itemList.reduce((total, item) => total + (item.quantity * item.price), 0);
    document.getElementById('totalPrice').textContent = totalPrice;
}

// Function untuk menambah barang
function addItem() {
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const price = parseInt(document.getElementById('itemPrice').value);
    const date = new Date().toLocaleDateString();

    const item = { name, description, quantity, price, date };
    items.push(item);

    displayItems();
}

// Function untuk mencari barang
function searchItems() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchInput) || 
        item.description.toLowerCase().includes(searchInput)
    );
    displayItems(filteredItems);
}

// Function untuk menghapus barang
function deleteItem(index) {
    items.splice(index, 1);
    displayItems();
}

// Function untuk mengedit barang
function editItem(index) {
    const item = items[index];
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemDescription').value = item.description;
    document.getElementById('editItemQuantity').value = item.quantity;
    document.getElementById('editItemPrice').value = item.price;
    document.getElementById('editIndex').value = index;

    const editModal = document.getElementById('editModal');
    editModal.classList.add('modal-active');
}

// Function untuk menyimpan perubahan setelah edit
function saveEditItem() {
    const index = document.getElementById('editIndex').value;
    items[index].name = document.getElementById('editItemName').value;
    items[index].description = document.getElementById('editItemDescription').value;
    items[index].quantity = parseInt(document.getElementById('editItemQuantity').value);
    items[index].price = parseInt(document.getElementById('editItemPrice').value);

    displayItems();
    closeEditModal();
}

// Function untuk menutup modal edit
function closeEditModal() {
    const editModal = document.getElementById('editModal');
    editModal.classList.remove('modal-active');
}

// Function untuk mengekspor data ke dalam format CSV
function exportData() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + items.map(item => Object.values(item).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'purchase_history.csv');
    document.body.appendChild(link);
    link.click();
}

// Function untuk mengimpor data dari file CSV
function importData() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const csvData = event.target.result;
        const parsedData = csvData.split('\n').map(row => row.split(','));

        items = parsedData.map(data => ({
            name: data[0],
            description: data[1],
            quantity: parseInt(data[2]),
            price: parseInt(data[3]),
            date: data[4]
        }));

        displayItems();
    };

    reader.readAsText(file);
}

// Panggil displayItems() untuk menampilkan data awal
displayItems();
// Function untuk menyimpan data ke dalam local storage
function saveToLocalStorage() {
    localStorage.setItem('purchaseHistory', JSON.stringify(items));
}

// Function untuk memuat data dari local storage
function loadFromLocalStorage() {
    const storedData = localStorage.getItem('purchaseHistory');
    if (storedData) {
        items = JSON.parse(storedData);
        displayItems();
    }
}
// Panggil loadFromLocalStorage() untuk memuat data dari local storage saat halaman dimuat
loadFromLocalStorage();
