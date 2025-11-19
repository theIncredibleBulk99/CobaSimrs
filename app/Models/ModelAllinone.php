<?php

namespace App\Models;

use CodeIgniter\Model;

class ModelAllinone extends Model
{
    protected $table            = 'allinone';
    protected $primaryKey       = 'assesmen_id';
    protected $useAutoIncrement = true;

    protected $allowedFields = [];
    protected $useTimestamps = false;

}
