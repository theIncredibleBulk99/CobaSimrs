function loadCekApi(){
    if(!isLoggedIn) {
        showError("Harus login dulu");
        return;
      }
    $("#content").html(`
        <h2>Data API</h2>
        <table id="tabelApi" class="display">
            <thead>
                <tr><th>Nama</th><th>Alamat</th><th>NO HP</th><th>Aksi</th></tr>
            </thead>
        </table>
    `);

    $('#tabelApi').DataTable({
        ajax: { url: 'https://jsonplaceholder.typicode.com/users', dataSrc: '' },
        columns: [
            { data: 'name' },
            { data: 'address.city' },
            { data: 'phone' },
            { 
                data: null,
                render: function (data) {
                    return `<button class="btnTambah" 
                    data-nama="${data.name}"
                    data-alamat="${data.address.city}"
                    data-norm="${data.phone}"
                    >Tambah</button>`;
                }
            }
        ]
    });
}

//function masukan data pasien ke database
function insert() {
    let nama   = $(this).data("nama");
    let alamat = $(this).data("alamat");
    let norm   = $(this).data("norm");
    $.ajax({
                url: "/pasien/add",
                type: "POST",
                data: {
                    nama: nama,
                    alamat: alamat,
                    norm: norm
                },
                success: function (res) {
                    if (res && res.status === "error") {
                        showError(res.message);
                    }else{
                        showSuccess(res.message);
                    }
                    
                },
                error: function () {
                    showError(res.message)
                }
            });
}

