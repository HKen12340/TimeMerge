<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Resources;
use App\Models\Event;
use Illuminate\Support\Str;
use Log;


class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()//イベント読み込み
    {
        //$e = Event::all();
        
        
        return response();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) //イベント作成
    {
        $EventId = Str::random(20);//ランダム文字20字生成　IDがかぶった際の処理を追加予定
        $Event = new Event();
        $Event->create([
            'event_name' => $request->name,
            'description' => $request->description,
            'URL' => "https::sample/sample?id=".$EventId
        ]);

        return response()->json(["message" => "success create Event!"],201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        // Log::info('引数の中身' .print_r($request, true));
        $Data = Event::find($request->id);
        return response()->json(["event" => $Data],201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)//イベント更新
    {
        $Data = Event::find($request->id);

        $Data->create([
            'event_name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json(["message" => "success update Event!"],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)//イベント削除
    {
        $Event = new Event();
        $Event->where('id',$request->id)->delete();
        return response()->json(["message" => "success delete Event!"],201);
    }
}
