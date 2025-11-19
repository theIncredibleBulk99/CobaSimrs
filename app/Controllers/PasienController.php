<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\ModelPasien;

class PasienController extends BaseController
{
    protected $pasienModel;
    public function __construct(){
        $this->pasienModel = new ModelPasien;
    }
    public function createPasien()
    {
        try{
        $rules =[
            'nama'=>'required',
            'norm'=>'required',
            'alamat'=>'required',
        ];
        if (!$this->validate($rules)) {
            return $this->error->setJSON(['status' => 'error', 'errors' => 'Data Kurang Lengkap']);
        }
       
        $this->pasienModel->save([
            'nama'   => $this->request->getPost('nama'),
            'norm'   => $this->request->getPost('norm'),
            'alamat' => $this->request->getPost('alamat'),
        ]);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Data pasien berhasil ditambahkan'
        ]);   
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'errors' => $err->getMessage()]);
        }
      
    }

    public function updatePasien()
    {
        try{
        $id = $this->request->getPost('pasien_id');
        $rules =[
            'nama'=>'required',
            'norm'=>'required',
            'alamat'=>'required',
        ];
        if (!$this->validate($rules)) {
            return $this->response->setJSON(['status' => 'error', 'errors' => 'Data Kurang Lengkap']);
        }
       
        $this->pasienModel->update($id, [
            'nama'   => $this->request->getPost('nama'),
            'norm'   => $this->request->getPost('norm'),
            'alamat' => $this->request->getPost('alamat'),
        ]);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Data pasien berhasil diperbarui'
        ]);
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'errors' => $err->getMessage()]);
        }
       
    }

    public function getPasien()
    {
        try{
        $data['pasien'] = $this->pasienModel->findAll();
        return $this->response->setJSON($data['pasien']);
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'errors' => $err->getMessage()]);
        }
        
    }

    public function deletePasien()
    {
        $id = $this->request->getPost('pasien_id');
        if(!$id){
            return  $this->response->setJSON([
                'status' => 'error',
                'message' => 'Data pasien tidak ditemukan'
            ]); 
        }

        $pasien = $this->assesmenModel->find($id);
        if (!$pasien) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Data pasien tidak ditemukan'
            ]);
        }
        $this->pasienModel->delete($id);
        return $this->response->setJSON([
            'status' => 'success',
                'message' => 'Data pasien berhasil dihapus'
        ]);
    }
}
