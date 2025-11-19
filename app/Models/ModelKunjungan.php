<?php

namespace App\Models;

use CodeIgniter\Model;

class ModelKunjungan extends Model
{
    protected $table            = 'kunjungan';
    protected $primaryKey       = 'kunjungan_id';
    protected $useAutoIncrement = true;

    protected $allowedFields = ['jeniskunjungan', 'tglkunjungan', 'pendaftaranpasienid'];
    protected $useTimestamps = false;

    protected $validationRules      = [
        'jeniskunjungan' => 'required',
        'tglkunjungan'=>'required',
        'pendaftaranpasienid'=>'required',
    ];
    protected $skipValidation = false;
}