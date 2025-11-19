<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\ModelPendaftaran;

class PendaftaranController extends BaseController
{
    protected $pendaftaranModel;
    public function __construct()
    {
        $this->pendaftaranModel = new ModelPendaftaran;
    }

    public function createPendaftaran()
    {
        try{
        $rules =[
            'pasien_id'=>'required',
            'noregristrasi'=>'required',
            'tglregristrasi'=>'required',
        ];
        if (!$this->validate($rules)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Data Kurang Lengkap']);
        }
       
        $this->pendaftaranModel->save([
            'pasien_id'   => $this->request->getPost('pasien_id'),
            'noregristrasi'   => $this->request->getPost('noregristrasi'),
            'tglregristrasi' => $this->request->getPost('tglregristrasi'),
        ]);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Data pendaftaran berhasil ditambahkan'
        ]);
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'message' => $err->getMessage()]);
        }
      
    }

    public function updatePendaftaran()
    {
        try{
        $id = $this->request->getPost('pendaftaran_id');
        $rules =[
            'pasien_id'=>'required',
            'noregristrasi'=>'required',
            'tglregristrasi'=>'required',
        ];
        if (!$this->validate($rules)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Data Kurang Lengkap']);
        }
       
        $this->pendaftaranModel->update($id, [
            'pasien_id'   => $this->request->getPost('pasien_id'),
            'noregristrasi'   => $this->request->getPost('noregristrasi'),
            'tglregristrasi' => $this->request->getPost('tglregristrasi'),
        ]);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Data pendaftaran berhasil diperbarui'
        ]);
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'message' => $err.getMessage()]);
        }

    }

    public function getPendaftaran()
    {
        try{
        $data['pendaftaran'] = $this->pendaftaranModel->findAll();
        return $this->response->setJSON($data['pendaftaran']);
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'message' => $err.getMessage()]);
        }

    }

    public function deletePendaftaran()
    {
        $id = $this->request->getPost('pendaftaran_id');
        if(!$id){
            return  $this->response->setJSON([
                'status' => 'error',
                'message' => 'Data pendaftaran tidak dikirim'
            ]); 
        }

        $pendaftaran = $this->pendaftaranModel->find($id);
        if (!$pendaftaran) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Data pendaftaran tidak ditemukan'
            ]);
        }
        $this->pendaftaranModel->delete($id);
        return $this->response->setJSON([
            'status' => 'success',
                'message' => 'Data pendaftaran berhasil dihapus'
        ]);
    }
}
