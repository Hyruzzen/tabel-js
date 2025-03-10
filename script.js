// Data awal teman-teman
const friendsData = [
    { NIM: '123456789', Nama: 'Adam', Kelas: 'A', Prodi: 'SI', Alamat: 'Bandung' },
    { NIM: '987654321', Nama: 'iqbal', Kelas: 'A', Prodi: 'SI', Alamat: 'Bandung' },
    { NIM: '135792468', Nama: 'reza', Kelas: 'A', Prodi: 'SI', Alamat: 'Cianjur' },
    { NIM: '246813579', Nama: 'fefeb', Kelas: 'A', Prodi: 'SI', Alamat: 'Bandung' },
    { NIM: '111223344', Nama: 'haris', Kelas: 'A', Prodi: 'SI', Alamat: 'Bandung' }
  ];
  
  const tableBody = document.querySelector('#friendsTable tbody');
  const addRowButton = document.getElementById('addRowButton');
  
  // Fungsi untuk menampilkan data di tabel
  function renderTable() {
    tableBody.innerHTML = ''; // Hapus isi tabel sebelumnya
    friendsData.forEach((friend, index) => {
      const row = document.createElement('tr');
      
      // Membuat nomor urut
      const noCell = document.createElement('td');
      noCell.textContent = index + 1;
      row.appendChild(noCell);
  
      // Membuat cell untuk NIM (harus angka dan 9 digit)
      const nimCell = createEditableCell(friend.NIM, 'NIM', isValidNIM);
      row.appendChild(nimCell);
  
      // Membuat cell untuk Nama (A-Z sorting)
      const namaCell = createEditableCell(friend.Nama, 'Nama', isValidNama);
      row.appendChild(namaCell);
  
      // Membuat cell untuk Kelas
      const kelasCell = createEditableCell(friend.Kelas, 'Kelas');
      row.appendChild(kelasCell);
  
      // Membuat cell untuk Prodi
      const prodiCell = createEditableCell(friend.Prodi, 'Prodi');
      row.appendChild(prodiCell);
  
      // Membuat cell untuk Alamat
      const alamatCell = createEditableCell(friend.Alamat, 'Alamat');
      row.appendChild(alamatCell);
  
      // Membuat tombol delete
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
      deleteButton.onclick = () => deleteRow(index);
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);
  
      // Menambahkan row ke tabel
      tableBody.appendChild(row);
    });
  }
  
  // Fungsi untuk membuat cell yang bisa diedit
  function createEditableCell(value, field, validator) {
    const cell = document.createElement('td');
    const span = document.createElement('span');
    span.textContent = value;
    cell.appendChild(span);
  
    // Ketika cell di double-click
    cell.ondblclick = () => {
      const input = document.createElement('input');
      input.value = value;
      input.classList.add('edit-input');
      
      const okButton = document.createElement('button');
      okButton.textContent = 'OK';
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      
      // Mengganti cell dengan input dan tombol OK/Cancel
      cell.innerHTML = '';
      cell.appendChild(input);
      cell.appendChild(okButton);
      cell.appendChild(cancelButton);
  
      // OK Button
      okButton.onclick = () => {
        const newValue = input.value.trim();
        if (validator && !validator(newValue)) {
          alert('Invalid input!');
          return;
        }
        // Simpan perubahan ke data
        const index = Array.from(tableBody.rows).indexOf(cell.closest('tr'));
        friendsData[index][field] = newValue;
        renderTable(); // Refresh tabel
      };
  
      // Cancel Button
      cancelButton.onclick = () => {
        renderTable(); // Kembalikan tabel tanpa perubahan
      };
    };
  
    return cell;
  }
  
  // Fungsi untuk validasi NIM (9 digit angka)
  function isValidNIM(value) {
    return /^\d{9}$/.test(value);
  }
  
  // Fungsi untuk validasi Nama (hanya huruf A-Z dan spasi)
  function isValidNama(value) {
    return /^[A-Za-z\s]+$/.test(value);
  }
  
  // Fungsi untuk menghapus baris
  function deleteRow(index) {
    friendsData.splice(index, 1);
    renderTable(); // Refresh tabel setelah menghapus baris
  }
  
  // Fungsi untuk menambah baris baru
  function addNewRow() {
    const newRow = {
      NIM: '000000000',
      Nama: 'New Friend',
      Kelas: 'A',
      Prodi: 'Teknik',
      Alamat: 'Unknown'
    };
    friendsData.push(newRow);
    renderTable(); // Refresh tabel setelah menambah baris
  }
  
  // Event listener untuk tombol Add Row
  addRowButton.onclick = addNewRow;
  
  // Render tabel pertama kali
  renderTable();
  
