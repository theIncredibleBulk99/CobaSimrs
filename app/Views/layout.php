<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="/CSS/style.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.3.5/css/dataTables.dataTables.css" />
    <script src="https://cdn.datatables.net/2.3.5/js/dataTables.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    

    <script src="/JS/modules/pendaftaran.js"></script>
<script src="/JS/modules/kunjungan.js"></script>
<script src="/JS/modules/assesmen.js"></script>
<script src="/JS/modules/pasien.js"></script>
<script src="/JS/modules/login.js"></script>
<script src="/JS/main.js"></script>
    <title>SIMRS</title>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">SIMRS</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <button class="nav-link active" aria-current="page" id="btnPendaftaran">Pendaftaran</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="btnKunjungan" >Kunjungan</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="btnAssesmen">Assesmen</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="btnCekAPI">Cek API</button>
        </li>
        <li class="nav-item">
        <button class="nav-link" id="btnLogout">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div id="content"></div>

</body>


</html>