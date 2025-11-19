<?php

namespace App\Models;

use CodeIgniter\Model;

class ModelAssesmen extends Model
{
    protected $table            = 'assesmen';
    protected $primaryKey       = 'assesmen_id';
    protected $useAutoIncrement = true;

    protected $allowedFields = ['kunjunganid', 'keluhan_utama', 'keluhan_tambahan'];
    protected $useTimestamps = false;

    protected $validationRules      = [
        'kunjunganid' => 'required',
        'keluhan_utama'=>'required',
        'keluhan_tambahan'=>'required',
    ];
    protected $skipValidation = false;
}