<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\ModelAssesmen;

class AssesmenController extends BaseController
{
    protected $assesmenModel;
    public function __construct()
    {
        $this->assesmenModel = new ModelAssesmen;
    }

    public function createAssesmen()
    {
        try{
            $rules =[
                'kunjunganid'=>'required',
                'keluhan_utama'=>'required',
                'keluhan_tambahan'=>'required',
            ];
            if (!$this->validate($rules)) {
                return $this->response->setJSON(['status' => 'error', 'message' => 'Data Kurang Lengkap']);
            }
           
            $this->assesmenModel->save([
                'kunjunganid'   => $this->request->getPost('kunjunganid'),
                'keluhan_utama'   => $this->request->getPost('keluhan_utama'),
                'keluhan_tambahan' => $this->request->getPost('keluhan_tambahan'),
            ]);
    
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Data assesmen berhasil ditambahkan'
            ]);
        }catch(\Exception $err){
             return $this->response->setJSON(['status' => 'error', 'message' => $err->getMessage()]);
        }
       
    }

    public function updateAssesmen()
    {
        try{
            $id = $this->request->getPost('assesmen_id');
            $rules =[
                'kunjunganid'=>'required',
                'keluhan_utama'=>'required',
                'keluhan_tambahan'=>'required',
            ];
            if (!$this->validate($rules)) {
                return $this->response->setJSON(['status' => 'error', 'message' => 'Data Kurang Lengkap']);
            }
           
            $this->assesmenModel->update($id, [
                'kunjunganid'   => $this->request->getPost('kunjunganid'),
                'keluhan_utama'   => $this->request->getPost('keluhan_utama'),
                'keluhan_tambahan' => $this->request->getPost('keluhan_tambahan'),
            ]);
    
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Data assesmen berhasil diperbarui'
            ]); 
        }catch(\Exception $err){
             return $this->response->setJSON(['status' => 'error', 'message' => $err->getMessage()]);
        }
       
    }

    public function getAssesmen()
    {
        try{
            $data['assesmen'] = $this->assesmenModel->findAll();
            return $this->response->setJSON($data['assesmen']);
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'message' => $err->getMessage()]);
        }
        
    }

    public function deleteAssesmen()
    {
        $id = $this->request->getPost('assesmen_id');
        if(!$id){
            return  $this->response->setJSON([
                'status' => 'error',
                'message' => 'Data assesmen tidak ditemukan'
            ]); 
        }

        $assesmen = $this->assesmenModel->find($id);
        if (!$assesmen) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Data assesmen tidak ditemukan'
            ]);
        }

        $this->assesmenModel->delete($id);
        return  $this->response->setJSON([
            'status' => 'success',
            'message' => 'Data assesmen berhasil dihapus'
        ]); 
    }

    // public function getAllinone()
    // {
    //     $id = $this->request->getPost('assesmen_id');
    //     if (!$id) {
    //         return $this->response->setJSON(['status' => 'error', 'message' => 'ID assesmen tidak valid']);
    //     }
    
    //     $db = \Config\Database::connect();
    //     $query = $db->table('allinone')->where('assesmenid', $id)->get()->getRow();
    
    //     if (!$query) {
    //         return $this->response->setJSON(['status' => 'error', 'message' => 'Data tidak ditemukan']);
    //     }
    
    //     return $this->response->setJSON($query);
    // }
    
}
