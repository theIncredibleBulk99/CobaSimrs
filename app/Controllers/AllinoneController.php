<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\ModelAllinone;

class AllinoneController extends BaseController
{
    protected $allinoneModel;
    public function __construct()
    {
        $this->allinoneModel = new ModelAllinone;
    }
    public function getAllinone()
    {
        $id = $this->request->getPost('assesmen_id');
        try{
            $data['allinone'] = $this->allinoneModel->find($id);
            return $this->response->setJSON($data['allinone']);
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'message' => $err->getMessage()]);
        }
    }
}
