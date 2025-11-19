//function untuk load assesment
function loadAssesmen() {
    if(!isLoggedIn) {
        showError("Harus login dulu");
        return;
      }
    $("#content").html(`
        <h2>Data Assesmen</h2>
        <button id='tambahAssesmen'>Tambahkan Assesmen</button>
        
        <table id="tabelAssesmen" class="display">
            <thead>
                <tr>
                    <th>ID Kunjungan</th>
                    <th>Keluhan Utama</th>
                    <th>Keluhan Tambahan</th>
                </tr>
            </thead>
        </table>
    
    `);

     $('#tabelAssesmen').DataTable({
        ajax: {
            url: '/assesmen/',
            dataSrc: '',
            error: function (xhr) {

// Ambil JSON error dari filter CI4
let res = xhr.responseJSON;

if (res && res.status === "error") {

    showError(res.message);

    
    $("#content").html(`<p style="color:red;">${res.message}</p>`);

}else{}
}
        },
        columns: [
            { data: 'kunjunganid' },
            { data: 'keluhan_utama' },
            { data: 'keluhan_tambahan' },
            {
                data: null,
                render: function(data){
                    return `
                        <button class="btnEditAssesmen btn-primary" 
                            data-kunjunganid="${data.kunjunganid}"
                            data-assesmen_id="${data.assesmen_id}"
                            data-keluhan_utama="${data.keluhan_utama}"
                            data-keluhan_tambahan="${data.keluhan_tambahan}"
                        >Edit</button>
                    `;
                },
                
            },
            {
                data: null,
                render: function(data){
                    return `
                        <button class="btnDeleteAssesmen btn-warning" 
                            data-assesmen_id="${data.assesmen_id}"
                        >Delete</button>
                    `;
                }
            },
            {
                data: null,
                render: function(data){
                    return `
                        <button class="btnPrintAssesmen btn-warning" 
                            data-assesmen_id="${data.assesmen_id}"
                        >Print</button>
                    `;
                }
            },
        ]
    });
}

function printAssesmen(button){
    let assesmen_id = $(button).data("assesmen_id");
    $.ajax({
        url: "/assesmen/allinone",
        type: "POST",
        data: {
        assesmen_id : assesmen_id
        },success(res){
            //buat data yg diambil jadi tabel
            let printContent = `
            <div id="printArea">
            <h2>Detail Assesmen</h2>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr><th>Nama</th><td>${res["Nama"]}</td></tr>
                <tr><th>No RM</th><td>${res["No RM"]}</td></tr>
                <tr><th>Alamat</th><td>${res["Alamat"]}</td></tr>
                <tr><th>No Registrasi</th><td>${res["No Regristrasi"]}</td></tr>
                <tr><th>Tanggal Registrasi</th><td>${res["Tanggal Regristrasi"]}</td></tr>
                <tr><th>Jenis Kunjungan</th><td>${res["Jenis Kunjungan"]}</td></tr>
                <tr><th>Tanggal Kunjungan</th><td>${res["Tanggal Kunjungan"]}</td></tr>
                <tr><th>Keluhan Utama</th><td>${res["Keluhan Utama"]}</td></tr>
                <tr><th>Keluhan Tambahan</th><td>${res["Keluhan Tambahan"]}</td></tr>
            </table>
        </div>
    `;
            $("#content").html(printContent);
            window.print();
            loadAssesmen();
        },error: function(xhr){
            // Jika server mengirim JSON, gunakan responseJSON
            if (xhr.responseJSON && xhr.responseJSON.message) {
                showError(xhr.responseJSON.message);
            }
            // Jika JSON tidak otomatis ter-parse
            else if (xhr.responseText) {
                try {
                    let json = JSON.parse(xhr.responseText);
                    showError(json.message);
                } catch (e) {
                    showError("Terjadi kesalahan.");
                }
            } else {
                showError("Error tidak diketahui.");
            }
        }
    });
}


function addAssesmen(){
    $("#content").html(`
    <form>
    <div class="mb-3">
    <label for="kunjunganid" class="form-label">Kunjungan</label>
    <select class="form-select" id="kunjunganid" name="kunjunganid">
        <option value="">Loading...</option>
    </select>
</div>
    <div class="mb-3">
      <label for="keluhan_utama" class="form-label">Keluhan Utama</label>
      <input type="text" class="form-control" id="keluhan_utama">
    </div>
    <div class="mb-3">
                <label>Keluhan Tambahan</label>
                <input type="text" id="keluhan_tambahan" class="form-control">
            </div>

    <button type="submit" class="btnAddAssesmen btn-primary">Submit</button>
  </form>
  
    `);
    loadAssesmenToSelect();
}

function loadAssesmenToSelect() {
    $.ajax({
        url: "/kunjungan/",
        type: "GET",
        success: function(res) {
            let select = $("#kunjunganid");
            select.empty(); // hapus option loading

            if(res.length === 0){
                select.append(`<option value="">Tidak ada kunjungan</option>`);
                return;
            }

            select.append(`<option value="">-- Pilih kunjungan --</option>`);

            res.forEach(p => {
                select.append(`
                    <option value="${p.kunjungan_id}">${p.pendaftaranpasienid} - ${p.jeniskunjungan}- ${p.tglkunjungan}</option>
                `);
            });
        },
        error: function() {
            $("#kunjunganid").html(`<option>Error load data</option>`);
        }
    });
}

function insertAssesmen(){
    let kunjunganid = $("#kunjunganid").val();
    let keluhan_utama = $("#keluhan_utama").val();
    let keluhan_tambahan = $("#keluhan_tambahan").val();

    $.ajax({
        url: "/assesmen/add",
        type: "POST",
        data: {
            kunjunganid:  kunjunganid,
            keluhan_utama:keluhan_utama,
            keluhan_tambahan: keluhan_tambahan
        },
        success: function(res){
            if(res.status === "success"){
                showSuccess(res.message);
                loadAssesmen();
            } else {
                showError(res.message);
            }
        },
        error: function(xhr){
            // Jika server mengirim JSON, gunakan responseJSON
            if (xhr.responseJSON && xhr.responseJSON.message) {
                showError(xhr.responseJSON.message);
            }
            // Jika JSON tidak otomatis ter-parse
            else if (xhr.responseText) {
                try {
                    let json = JSON.parse(xhr.responseText);
                    showError(json.message);
                } catch (e) {
                    showError("Terjadi kesalahan.");
                }
            } else {
                showError("Error tidak diketahui.");
            }
        }
    });
}

function updateAssesmen() {
    let id        = $(this).data("assesmen_id");
    let kunjunganid = $(this).data("kunjunganid");
    let keluhan_utama = $(this).data("keluhan_utama");
    let keluhan_tambahan = $(this).data("keluhan_tambahan");

    // tampilkan form update dengan nilai original
    $("#content").html(`
        <h3>Edit Assesmen</h3>
        <form>
            <input type="hidden" id="assesmen_id" value="${id}">

            <div class="mb-3">
                <label>ID Kunjungan</label>
                <select class="form-select" id="kunjunganid" value="${kunjunganid}"></select>
            </div>

            <div class="mb-3">
                <label>Keluhan Utama</label>
                <input type="text" id="keluhan_utama" class="form-control" value="${keluhan_utama}">
            </div>

            <div class="mb-3">
                <label>Keluhan Tambahan</label>
                <input type="text" id="keluhan_tambahan" class="form-control" value="${keluhan_tambahan}">
            </div>

            <button type="button" class="btnUpdateAssesmen btn-primary">Update</button>
        </form>
    `);

    // Load daftar pasien ke select dan set selected default
    loadAssesmenToSelect();

}

function doUpdateAssesmen(){
    let kunjunganid    = $("#kunjunganid").val();
    let assesmen_id = $("#assesmen_id").val();
    let keluhan_utama = $("#keluhan_utama").val();
    let keluhan_tambahan   = $("#keluhan_tambahan").val();

    $.ajax({
        url: "/assesmen/update/",
        type: "POST",
        data: {
            kunjunganid:kunjunganid,
            assesmen_id: assesmen_id,
            keluhan_utama: keluhan_utama,
            keluhan_tambahan: keluhan_tambahan
        },
        success: function(res) {
            if(res.status === "success"){
                showSuccess(res.message);
                loadAssesmen();
            } else {
                showError(res.message);
            }
        },
        error: function(xhr){
            // Jika server mengirim JSON, gunakan responseJSON
            if (xhr.responseJSON && xhr.responseJSON.message) {
                showError(xhr.responseJSON.message);
            }
            // Jika JSON tidak otomatis ter-parse
            else if (xhr.responseText) {
                try {
                    let json = JSON.parse(xhr.responseText);
                    showError(json.message);
                } catch (e) {
                    showError("Terjadi kesalahan.");
                }
            } else {
                showError("Error tidak diketahui.");
            }
        }
    });
}

function deleteAssesmen(button){
    let assesmen_id = $(button).data("assesmen_id");

    $.ajax({
        url: "/assesmen/delete/",
        type: "POST",
        data: {
            assesmen_id : assesmen_id
        },
        success: function(res) {
            if(res.status === "success"){
                showSuccess(res.message);
                loadAssesmen();
            } else {
                showError(res.message);
            }
        },
        error: function(xhr){
            // Jika server mengirim JSON, gunakan responseJSON
            if (xhr.responseJSON && xhr.responseJSON.message) {
                showError(xhr.responseJSON.message);
            }
            // Jika JSON tidak otomatis ter-parse
            else if (xhr.responseText) {
                try {
                    let json = JSON.parse(xhr.responseText);
                    showError(json.message);
                } catch (e) {
                    showError("Terjadi kesalahan.");
                }
            } else {
                showError("Error tidak diketahui.");
            }
        }
    });
}