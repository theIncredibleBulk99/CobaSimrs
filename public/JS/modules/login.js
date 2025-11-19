function login(){
    $("#content").html(`
    <form id="formLogin">
        <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" class="form-control" id="username1">
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" id="password1">
        </div>
        <button type="submit" class="btnLogin btn-primary" id="btnLogin">Login</button>
    </form>
    `);
}

function doLogin(){
    let username = $("#username1").val();;
    let password =$("#password1").val();;
    
    $.ajax({
        url: "/login",
        type: "POST",
        data: { username, password },

        success: function (res) {
            showSuccess(res.message);
            isLoggedIn =true;
            enableNavbarButtons();
            loadPendaftaran(); // login sukses → load dashboard
        },

        error: function (xhr) {
            let res = xhr.responseJSON;  
            showError(res.message); 
            disableNavbarButtons();      
        }
    });
}

function logout(){
    $.ajax({
        url: "/logout",
        type: "POST",
        success: function(res){
            showSuccess(res.message);
            isLoggedIn=false;
            disableNavbarButtons();
            // setelah logout kembali ke login page SPA
            login();
        },
        error: function(){
            showError("Logout gagal");
        }
    });
}