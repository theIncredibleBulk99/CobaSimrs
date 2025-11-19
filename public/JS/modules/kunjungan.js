function loadKunjungan(){
    if(!isLoggedIn) {
        showError("Harus login dulu");
        return;
      }
    $("#content").html(`
        <h2>Data Kunjungan</h2>
        <button id='tambahKunjungan'>Tambahkan Kunjungan</button>
        <table id="tabelKunjungan" class="display">
            <thead>
                <tr><th>ID Pendaftaran</th><th>Jenis Kunjungan</th><th>Tanggal Kunjungan</th></tr>
            </thead>
        </table>
    `);

    $('#tabelKunjungan').DataTable({
        ajax: { url: '/kunjungan/', dataSrc: '' },
        columns: [
            { data: 'pendaftaranpasienid' },
            { data: 'jeniskunjungan' },
            { data: 'tglkunjungan' },
            {
                data: null,
                render: function(data){
                    return `
                        <button class="btnEditKunjungan" 
                            data-pendaftaranpasienid="${data.pendaftaranpasienid}"
                            data-kunjungan_id="${data.kunjungan_id}"
                            data-jeniskunjungan="${data.jeniskunjungan}"
                            data-tglkunjungan="${data.tglkunjungan}"
                        >Edit</button>
                    `;
                },
                
            },
            {
                data: null,
                render: function(data){
                    return `
                        <button class="btnDeleteKunjungan" 
                            data-kunjungan_id="${data.kunjungan_id}"
                        >Delete</button>
                    `;
                }
            }
        ]
    });
}

function addKunjungan(){
    $("#content").html(`
    <form>
    <div class="mb-3">
    <label for="pendaftarnpasienid" class="form-label">Kunjungan</label>
    <select class="form-select" id="pendaftaranpasienid" name="pendaftaranpasienid">
        <option value="">Loading...</option>
    </select>
</div>
    <div class="mb-3">
      <label for="jeniskunjungan" class="form-label">Jenis Kunjungan</label>
      <input type="text" class="form-control" id="jeniskunjungan">
    </div>
    <div class="mb-3 form-check">
      <input type="date" class="form-date" id="tglkunjungan">
      <label class="form-check-label" for="tglkunjungan">Tanggal kunjungan</label>
    </div>
    <button type="submit" class="btnAddKunjungan btn-primary">Submit</button>
  </form>
  
    `);
    loadKunjunganToSelect();
}
function loadKunjunganToSelect() {
    $.ajax({
        url: "/pendaftaran/",
        type: "GET",
        success: function(res) {
            let select = $("#pendaftaranpasienid");
            select.empty(); // hapus option loading

            if(res.length === 0){
                select.append(`<option value="">Tidak ada pendaftaran</option>`);
                return;
            }

            select.append(`<option value="">-- Pilih Pendaftaran --</option>`);

            res.forEach(p => {
                select.append(`
                    <option value="${p.pendaftaran_id}">${p.pasien_id} - ${p.noregristrasi}- ${p.tglregristrasi}</option>
                `);
            });
        },
        error: function() {
            $("#pendaftaranpasienid").html(`<option>Error load data</option>`);
        }
    });
}

function insertKunjungan(){
    let pendaftaranpasienid = $("#pendaftaranpasienid").val();
    let jeniskunjungan = $("#jeniskunjungan").val();
    let tglkunjungan = $("#tglkunjungan").val();

    $.ajax({
        url: "/kunjungan/add",
        type: "POST",
        data: {
            pendaftaranpasienid:  pendaftaranpasienid,
            jeniskunjungan:jeniskunjungan,
            tglkunjungan: tglkunjungan
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

function updateKunjungan() {
    let id        = $(this).data("kunjungan_id");
    let pendaftaranpasienid = $(this).data("pendaftaranpasienid");
    let jeniskunjungan = $(this).data("jeniskunjungan");
    let tglkunjungan = $(this).data("tglkunjungan");

    // tampilkan form update dengan nilai original
    $("#content").html(`
        <h3>Edit Kunjungan</h3>
        <form>
            <input type="hidden" id="kunjungan_id" value="${id}">

            <div class="mb-3">
                <label>ID Pendaftaran</label>
                <select class="form-select" id="pendaftaranpasienid" value="${pendaftaranpasienid}"></select>
            </div>

            <div class="mb-3">
                <label>Jenis Kunjungan</label>
                <input type="text" id="jeniskunjungan" class="form-control" value="${jeniskunjungan}">
            </div>

            <div class="mb-3">
                <label>Tanggal Kunjungan</label>
                <input type="date" id="tglkunjungan" class="form-control" value="${tglkunjungan}">
            </div>

            <button type="button" class="btnUpdateKunjungan btn-primary">Update</button>
        </form>
    `);

    // Load daftar pasien ke select dan set selected default
    loadKunjunganToSelect();

}

function doUpdateKunjungan(){
    let pendaftaranpasienid    = $("#pendaftaranpasienid").val();
    let kunjungan_id = $("#kunjungan_id").val();
    let jeniskunjungan = $("#jeniskunjungan").val();
    let tglkunjungan   = $("#tglkunjungan").val();

    $.ajax({
        url: "/kunjungan/update/",
        type: "POST",
        data: {
            pendaftaranpasienid:pendaftaranpasienid,
            kunjungan_id: kunjungan_id,
            jeniskunjungan: jeniskunjungan,
            tglkunjungan: tglkunjungan
        },
        success: function(res) {
            if(res.status === "success"){
                showSuccess(res.message);
                loadKunjungan();
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
function deleteKunjungan(button){
    let kunjungan_id = $(button).data("kunjungan_id");

    $.ajax({
        url: "/kunjungan/delete/",
        type: "POST",
        data: {
            kunjungan_id : kunjungan_id
        },
        success: function(res) {
            if(res.status === "success"){
                showSuccess(res.message);
                loadKunjungan();
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