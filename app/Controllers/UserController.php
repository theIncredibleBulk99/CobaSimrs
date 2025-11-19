<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\ModelUser;

class UserController extends BaseController
{
    public function login()
{
    $session = session();
    $userModel = new ModelUser;

    $username = $this->request->getPost('username');
    $password = $this->request->getPost('password');

    $user = $userModel->where('username', $username)->first();

    if ($user) {
        // Password tidak di-hash, pakai perbandingan biasa
        if ($password === $user['password']) {

            $session->set([
                'user_id'   => $user['user_id'],
                'username'  => $user['username'],
                'logged_in' => true,
                'role'      => $user['role']
            ]);

            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Login berhasil'
            ]);
        } else {
            return $this->response->setStatusCode(401)->setJSON([
                'status' => 'error',
                'message' => 'Password salah'
            ]);
        }
    } else {
        return $this->response->setStatusCode(401)->setJSON([
            'status' => 'error',
            'message' => 'User tidak ditemukan'
        ]);
    }
}

public function logout()
{
    session()->destroy();

    return $this->response->setJSON([
        'status' => 'success',
        'message' => 'Logout berhasil'
    ]);
}
    }
