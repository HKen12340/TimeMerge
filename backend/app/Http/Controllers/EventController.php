<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use app\Models\Event;
use Illuminate\Support\Str;


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
        $EventId = Str::random(20);
        $Event = new Event();
        $Event->create([
            'event_name' => $request->name,
            'description' => $request->description,
            'URL' => "https::sample/sample?id=".$EventId
        ]);

        return response()->join(["message" => "success create Event!"],201);
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
    public function show($EventId)
    {
        $Event = Event::find($EventId);
        return response(["event" => $Event],201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request,$EventId)
    {
        $event = Event::find($EventId);

        $event->create([
            'event_name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->join(["message" => "success update Event!"],201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)//イベント更新
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)//イベント削除
    {
        //
    }
}
