<?php

namespace App\Http\Controllers\MenuManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    public function index()
    {
        $data = Menu::with('parent')->get();

        return response()->json($data, 200);
    }
    public function getParent($category)
    {
        // dd($category);
        $condition = ($category == 'Parent') ? 'Header' :
        (($category == 'Submenu') ? 'Parent' : 'Noting');

        // Melakukan query dengan kondisi yang sesuai
        $data = ($condition === 'Noting') 
        ? []
        : Menu::whereCategory($condition)->get(); // Filter berdasarkan kategori
        // dd($data);

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

    public function store(Request $request)
    {
        $request->validate([
            'category'=>'required',
            'name'=>'string',
            'user_id'=>'string'
        ]);
        // dd($request);
        $new = null;
        $existing = Menu::whereName($request->name)->first();
        // dd($existing);
        if(!$existing){
            try{
                DB::transaction(function () use ($request, &$new) {
                        $new = Menu::create([
                            'category' =>$request->category,
                            'parent_id' =>$request->parent_id,
                            'name' =>$request->name,
                            'icon' =>$request->icon,
                            'url' =>$request->url,
                            'short_order' =>$request->short_order,
                            'userId' =>$request->user_id,
                        ]);
                });
                $data = Menu::with('parent')->whereId($new->id)->first();
    
                return response()->json(['success'=>true, 'datas'=>$data], 200);
            }catch (Throwable $e) {
                return response()->json(['success'=>false, 'message'=>$e],400);
            }
        }else{
            return response()->json(['success'=>false, 'message'=>'Menu Name is already exists'],400);

        }
       
    }
    
    public function delete(Request $request)
    {
       try{ // dd($request->id);
        $data = Menu::find($request->id);
        // dd($data);
        $data->delete();
        return response()->json(['status'=> true, 'message'=>'success'],200);

        }catch(Throwable $e){
            return response()->json(['status'=> false, 'message'=>$e],400);
        }
    }

   
}
