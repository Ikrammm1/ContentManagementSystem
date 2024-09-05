<?php

namespace App\Http\Controllers\MenuManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Menu;

class MenuController extends Controller
{
    public function index()
    {
        $data = Menu::with('parent')->get();

        return response()->json($data, 200);
    }

    public function getMenuAuth(Request $request)
    {
        $userAuth = User::with(['Authorizations.headerMenus', 'Authorizations.Items','Authorizations.Submenu'])->find($request->id);

        // Mengumpulkan semua menu header
        $headerMenus = $userAuth->Authorizations->flatMap(function ($authorization) {
            return $authorization->headerMenus;
        })->unique('id');

        // Mengumpulkan semua menu parent
        $parentMenus = $userAuth->Authorizations->flatMap(function ($authorization) {
            return $authorization->Items;
        })->unique('id');

        $subMenus = $userAuth->Authorizations->flatMap(function ($authorization) {
            return $authorization->Submenu;
        })->unique('id');

        // Strukturkan data menu header dengan items berisi menu parent dan submenu
        $menuData = $headerMenus->map(function ($headerMenu) use ($parentMenus, $subMenus) {
            return [
                'id' => $headerMenu->id,
                "name"=> $headerMenu->name,
                "url"=> $headerMenu->url,
                "short_order"=> $headerMenu->short_order,
                "icon"=> $headerMenu->icon,
                "category"=> $headerMenu->category,
                'items' => $parentMenus->where('parent_id', $headerMenu->id)->map(function ($parentMenu) use ($subMenus) {
                    return [
                        'id' => $parentMenu->id,
                        "name"=> $parentMenu->name,
                        "url"=> $parentMenu->url,
                        "short_order"=> $parentMenu->short_order,
                        "icon"=> $parentMenu->icon,
                        "category"=> $parentMenu->category,
                        "isOpen"=>false,
                        'submenu' => $subMenus->where('parent_id', $parentMenu->id)->map(function ($subMenu) {
                            return $subMenu;
                        })
                    ];
                })->values()
            ];
        });
        return response()->json([
            'status' => 'success',
            'menus' => $menuData
            
        ],200);
    }

   
}
