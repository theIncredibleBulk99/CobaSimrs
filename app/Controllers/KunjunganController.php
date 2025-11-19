<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\ModelKunjungan;

class KunjunganController extends BaseController
{
    protected $kunjunganModel;
    public function __construct()
    {
        $this->kunjunganModel = new ModelKunjungan;
    }

    public function createKunjungan()
    {
        try{
            $rules =[
                'pendaftaranpasienid'=>'required',
                'jeniskunjungan'=>'required',
                'tglkunjungan'=>'required',
            ];
            if (!$this->validate($rules)) {
                return $this->response->setJSON(['status' => 'error', 'message' => 'Data Kurang Lengkap']);
            }
           
            $this->kunjunganModel->save([
                'pendaftaranpasienid'   => $this->request->getPost('pendaftaranpasienid'),
                'jeniskunjungan'   => $this->request->getPost('jeniskunjungan'),
                'tglkunjungan' => $this->request->getPost('tglkunjungan'),
            ]);
    
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Data kunjungan berhasil ditambahkan'
            ]);
        }catch (\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'message' => $err.getMessage()]);
        }
       
    }

    public function updateKunjungan()
    {
        try{
        $id = $this->request->getPost('kunjungan_id');
        $rules =[
            'pendaftaranpasienid'=>'required',
            'jeniskunjungan'=>'required',
            'tglkunjungan'=>'required',
        ];
        if (!$this->validate($rules)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Data Kurang Lengkap']);
        }
       
        $this->kunjunganModel->update($id, [
            'pendaftaranpasienid'   => $this->request->getPost('pendaftaranpasienid'),
            'jeniskunjungan'   => $this->request->getPost('jeniskunjungan'),
            'tglkunjungan' => $this->request->getPost('tglkunjungan'),
        ]);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Data kunjungan berhasil diperbarui'
        ]);
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'message' => $err.getMessage()]);
        }
        
    }

    public function getKunjungan()
    {  
        try{
        $data['kunjungan'] = $this->kunjunganModel->findAll();
        return $this->response->setJSON($data['kunjungan']);
        }catch(\Exception $err){
            return $this->response->setJSON(['status' => 'error', 'message' => $err->getMessage()]);
        }
        
    }

    public function deleteKunjungan()
    {
        $id = $this->request->getPost('kunjungan_id');
        if(!$id){
            return  $this->response->setJSON([
                'status' => 'error',
                'message' => 'Data kunjungan tidak ditemukan'
            ]); 
        }

        $kunjungan = $this->kunjunganModel->find($id);
        if (!$kunjungan) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Data kunjungan tidak ditemukan'
            ]);
        }
        $this->kunjunganModel->delete($id);
        return $this->response->setJSON([
            'status' => 'success',
                'message' => 'Data pendaftaran berhasil dihapus'
        ]);
    }
}
