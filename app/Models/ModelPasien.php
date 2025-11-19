<?php

namespace App\Models;

use CodeIgniter\Model;

class ModelPasien extends Model
{
    protected $table            = 'pasien';
    protected $primaryKey       = 'pasien_id';
    protected $useAutoIncrement = true;

    protected $allowedFields = ['nama', 'norm','alamat'];
    protected $useTimestamps = false;

    protected $validationRules      = [
        'nama' => 'required',
        'norm'=>'required',
        'alamat' => 'required'
    ];
    protected $skipValidation = false;
}
