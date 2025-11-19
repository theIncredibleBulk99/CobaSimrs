// fungsi untuk load tabel pasien
function loadPendaftaran(){
    if(!isLoggedIn) {
        showError("Harus login dulu");
        return;
      }
    $("#content").html(`
        <h2>Data Pendaftaran</h2>
        
        <button id='daftarkan'>Daftarkan Pasien</button>
        <table id="tabelpendaftaran" class="display">
            <thead>
                <tr><th>ID Passien</th><th>No Regrisstrasi</th><th>Tanggal Regrisstrasi</th><th>Aksi</th></tr>
            </thead>
        </table>
    `);

    $('#tabelpendaftaran').DataTable({
        ajax: { url: '/pendaftaran/', dataSrc: '' },
        columns: [
            { data: 'pasien_id' },
            { data: 'noregristrasi' },
            { data: 'tglregristrasi' },
            {
                data: null,
                render: function(data){
                    return `
                        <button class="btnEditPendaftaran" 
                            data-pendaftaran_id="${data.pendaftaran_id}"
                            data-pasien_id="${data.pasien_id}"
                            data-noregristrasi="${data.noregristrasi}"
                            data-tglregristrasi="${data.tglregristrasi}"
                        >Edit</button>
                    `;
                },
                
            },
            {
                data: null,
                render: function(data){
                    return `
                        <button class="btnDeletePendaftaran" 
                            data-pendaftaran_id="${data.pendaftaran_id}"
                        >Delete</button>
                    `;
                }
            }
        ]
    });
}

//fungsi insert
function addPendaftaran(){
    $("#content").html(`
    <form>
    <div class="mb-3">
    <label for="pasien_id" class="form-label">Pasien</label>
    <select class="form-select" id="pasien_id">
        <option value="">Loading...</option>
    </select>
</div>
    <div class="mb-3">
      <label for="noregristrasi" class="form-label">Nomor Regristrasi</label>
      <input type="number" class="form-control" id="noregristrasi">
    </div>
    <div class="mb-3 form-check">
      <input type="date" class="form-date" id="tglregristrasi">
      <label class="form-check-label" for="tglregristrasi">Tanggal regristrasi</label>
    </div>
    <button type="submit" class="btnAddPendaftaran btn-primary">Submit</button>
  </form>
  
    `);
    loadPasienToSelect();
}

function loadPasienToSelect() {
    $.ajax({
        url: "/pasien/",
        type: "GET",
        success: function(res) {
            let select = $("#pasien_id");
            select.empty(); // hapus option loading

            if(res.length === 0){
                select.append(`<option value="">Tidak ada pasien</option>`);
                return;
            }

            select.append(`<option value="">-- Pilih Pasien --</option>`);

            res.forEach(p => {
                select.append(`
                    <option value="${p.pasien_id}">${p.nama} - ${p.norm}</option>
                `);
            });
        },
        error: function() {
            $("#pasien_id").html(`<option>Error load data</option>`);
        }
    });
}

function insertPendaftaran(){
    let pasien_id = $("#pasien_id").val();
    let noregristrasi = $("#noregristrasi").val();
    let tglregristrasi = $("#tglregristrasi").val();

    $.ajax({
        url: "/pendaftaran/add",
        type: "POST",
        data: {
            pasien_id: pasien_id,
            noregristrasi: noregristrasi,
            tglregristrasi: tglregristrasi
        },
        success: function(res){
            if(res.status === "success"){
                showSuccess(res.message);
                loadPendaftaran();
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

function updatePendafraran() {
    let id        = $(this).data("pendaftaran_id");
    let pasien_id = $(this).data("pasien_id");
    let noreg     = $(this).data("noregristrasi");
    let tanggal   = $(this).data("tglregristrasi");

    // tampilkan form update dengan nilai original
    $("#content").html(`
        <h3>Edit Pendaftaran</h3>
        <form>
            <input type="hidden" id="pendaftaran_id" value="${id}">

            <div class="mb-3">
                <label>Pasien</label>
                <select class="form-select" id="pasien_id" value="${pasien_id}"></select>
            </div>

            <div class="mb-3">
                <label>No Registrasi</label>
                <input type="number" id="noregristrasi" class="form-control" value="${noreg}">
            </div>

            <div class="mb-3">
                <label>Tanggal Registrasi</label>
                <input type="date" id="tglregristrasi" class="form-control" value="${tanggal}">
            </div>

            <button type="button" class="btnUpdatePendaftaran btn-primary">Update</button>
        </form>
    `);

    // Load daftar pasien ke select dan set selected default
    loadPasienToSelect();

}

function doUpdatePendaftaran(){
    let pendaftaran_id    = $("#pendaftaran_id").val();
    let pasien_id = $("#pasien_id").val();
    let noreg = $("#noregristrasi").val();
    let tgl   = $("#tglregristrasi").val();

    $.ajax({
        url: "/pendaftaran/update/",
        type: "POST",
        data: {
            pendaftaran_id:pendaftaran_id,
            pasien_id: pasien_id,
            noregristrasi: noreg,
            tglregristrasi: tgl
        },
        success: function(res) {
            if(res.status === "success"){
                showSuccess(res.message);
                loadPendaftaran();
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

function deletePendaftaran(button){
    let pendaftaran_id = $(button).data("pendaftaran_id");

    $.ajax({
        url: "/pendaftaran/delete/",
        type: "POST",
        data: {
            pendaftaran_id : pendaftaran_id
        },
        success: function(res) {
            if(res.status === "success"){
                showSuccess(res.message);
                loadPendaftaran();
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

