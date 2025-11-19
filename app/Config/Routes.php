<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Home::index');
$routes->get('kunjungan/', 'KunjunganController::getKunjungan');
$routes->get('pendaftaran/', 'PendaftaranController::getPendaftaran');
$routes->post('login/', 'UserController::login');
$routes->post('logout/', 'UserController::logout');
$routes->post('allinone', 'AllinoneController::getAllinone');

$routes->group('pendaftaran', ['filter' => 'role:superadmin, admisi'], function($routes) {
    $routes->post('add', 'PendaftaranController::createPendaftaran');
    $routes->post('update', 'PendaftaranController::updatePendaftaran');
    $routes->post('delete', 'PendaftaranController::deletePendaftaran');
});


$routes->group('kunjungan', ['filter' => 'role:superadmin, admisi'], function($routes) {
    $routes->post('add', 'KunjunganController::createKunjungan');
    $routes->post('update', 'KunjunganController::updateKunjungan');
    $routes->post('delete', 'KunjunganController::deleteKunjungan');
});


$routes->group('assesmen',['filter' => 'role:superadmin, perawat'], function($routes) {
    $routes->get('/', 'AssesmenController::getAssesmen');
    $routes->post('add', 'AssesmenController::createAssesmen');
    $routes->post('update', 'AssesmenController::updateAssesmen');
    $routes->post('delete', 'AssesmenController::deleteAssesmen');
    $routes->post('allinone', 'AllinoneController::getAllinone');

});

$routes->group('pasien', function($routes) {
    $routes->get('/', 'PasienController::getPasien');
    $routes->post('add', 'PasienController::createPasien');
    $routes->post('update', 'PasienController::updatePasien');
    $routes->post('delete', 'PasienController::deletePasien');
});