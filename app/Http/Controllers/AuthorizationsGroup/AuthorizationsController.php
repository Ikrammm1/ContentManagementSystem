<?php

namespace App\Http\Controllers\AuthorizationsGroup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AuthorizationGroup;

class AuthorizationsController extends Controller
{
    public function index()
    {
        $data = AuthorizationGroup::with('Menus', 'Users')->get();

        return response()->json(['success'=>true, 'datas'=>$data],200);
    }
}
