document.addEventListener('DOMContentLoaded', function () {
    const formPembelian = document.getElementById('formPembelian');
    const totalHarga = document.getElementById('totalHarga');
    const keranjang = document.getElementById('keranjang');
    const hapusKeranjangBtn = document.getElementById('hapusKeranjangBtn');

    let keranjangBarang = [];

    // Event listener for form submission
    formPembelian.addEventListener('submit', function (event) {
        event.preventDefault();

        const namaBarang = document.getElementById('barang').value;
        const hargaBarang = parseInt(document.getElementById('harga').value);
        const jumlahBarang = parseInt(document.getElementById('jumlah').value);

        const hargaTotal = jumlahBarang * hargaBarang;

        keranjangBarang.push({
            nama: namaBarang,
            jumlah: jumlahBarang,
            harga: hargaTotal
        });

        renderKeranjang();
        renderTotalHarga();
    });

    // Event listener for clearing the cart
    hapusKeranjangBtn.addEventListener('click', function () {
        keranjangBarang = [];
        renderKeranjang();
        renderTotalHarga();
    });

    // Function to render the shopping cart
    function renderKeranjang() {
        keranjang.innerHTML = '';
        keranjangBarang.forEach(function (item, index) {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.nama} (${item.jumlah}) - Rp${item.harga}`;

            // Delete button for each item
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Hapus';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-danger', 'ms-2');
            deleteButton.addEventListener('click', function () {
                keranjangBarang.splice(index, 1);
                renderKeranjang();
                renderTotalHarga();
            });

            listItem.appendChild(deleteButton);
            keranjang.appendChild(listItem);
        });
    }

    // Function to render the total price
    function renderTotalHarga() {
        let total = 0;
        keranjangBarang.forEach(function (item) {
            total += item.harga;
        });
        totalHarga.textContent = `Rp${total}`;
    }
});