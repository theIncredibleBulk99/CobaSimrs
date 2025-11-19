<?php

namespace App\Models;

use CodeIgniter\Model;

class ModelUser extends Model
{
    protected $table            = 'user';
    protected $primaryKey       = 'user_id';
    protected $useAutoIncrement = true;

    protected $allowedFields = ['username', 'password'];
    protected $useTimestamps = false;

    protected $validationRules      = [
        'username' => 'required',
        'password'=>'required',
        
    ];
    protected $skipValidation = false;
}