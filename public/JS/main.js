let isLoggedIn = false;
function showError(message) {
    Swal.fire({
        icon:'error',
        title:'Error',
        text: message
    });
}
function showSuccess(message) {
    Swal.fire({
        icon:'success',
        title:'Berhasil',
        text: message
    });
}

function disableNavbarButtons() {
    $("#btnPendaftaran, #btnKunjungan, #btnAssesmen, #btnCekAPI, #btnLogout")
        .prop("disabled", true)
        .addClass("disabled"); // styling bootstrap
}

function enableNavbarButtons() {
    $("#btnPendaftaran, #btnKunjungan, #btnAssesmen, #btnCekAPI, #btnLogout")
        .prop("disabled", false)
        .removeClass("disabled");
}

$(document).ready(function(){

    // Import fungsi global alert


   // event klik tombol
$("#btnPendaftaran").click(loadPendaftaran);
$("#btnKunjungan").click(loadKunjungan);
$("#btnAssesmen").click(loadAssesmen);
$("#btnCekAPI").click(loadCekApi);
$("#btnLogout").click(logout);

$(document).on("click", ".btnTambah", insert);
$(document).on("click", ".btnLogin", function(e){
    e.preventDefault();
    doLogin();
});
//Handler pendaftaran
$(document).on("click", "#daftarkan", addPendaftaran);
$(document).on("click", ".btnEditPendaftaran", updatePendafraran);//mergo de'e metune bareng dataTAbles
$(document).on("click", ".btnAddPendaftaran", function(e){
    e.preventDefault(); // supaya form tidak reload
    insertPendaftaran();
});

$(document).on("click", ".btnUpdatePendaftaran", function(e){
    e.preventDefault();
    doUpdatePendaftaran();
});
$(document).on("click", ".btnDeletePendaftaran", function(e){
    e.preventDefault();
    deletePendaftaran(this);  
});

//Handler Kunjungan
$(document).on("click", "#tambahKunjungan", addKunjungan);
$(document).on("click", ".btnEditKunjungan", updateKunjungan);//mergo de'e metune bareng dataTAbles
$(document).on("click", ".btnAddKunjungan", function(e){
    e.preventDefault(); // supaya form tidak reload
    insertKunjungan();
});

$(document).on("click", ".btnUpdateKunjungan", function(e){
    e.preventDefault();
    doUpdateKunjungan();
});
$(document).on("click", ".btnDeleteKunjungan", function(e){
    e.preventDefault();
    deleteKunjungan(this);  
});

//Handler Assesmen
$(document).on("click", "#tambahAssesmen", addAssesmen);
$(document).on("click", ".btnEditAssesmen", updateAssesmen);//mergo de'e metune bareng dataTAbles
$(document).on("click", ".btnAddAssesmen", function(e){
    e.preventDefault(); // supaya form tidak reload
    insertAssesmen();
});

$(document).on("click", ".btnUpdateAssesmen", function(e){
    e.preventDefault();
    doUpdateAssesmen();
});
$(document).on("click", ".btnDeleteAssesmen", function(e){
    e.preventDefault();
    deleteAssesmen(this);  
});
$(document).on("click", ".btnPrintAssesmen", function(e){
    e.preventDefault();
    printAssesmen(this);  
});

login()
});
