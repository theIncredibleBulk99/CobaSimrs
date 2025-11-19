<?php

namespace App\Models;

use CodeIgniter\Model;

class ModelPendaftaran extends Model
{
    protected $table            = 'pendaftaran';
    protected $primaryKey       = 'pendaftaran_id';
    protected $useAutoIncrement = true;

    protected $allowedFields = ['pasien_id', 'tglregristrasi','noregristrasi'];
    protected $useTimestamps = false;

    protected $validationRules      = [
        'pasien_id' => 'required',
        'tglregristrasi'=>'required',
        'noregristrasi'=>'required',
    ];
    protected $skipValidation = false;
}