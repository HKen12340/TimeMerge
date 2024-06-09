<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Resources;
use App\Models\Event;
use App\Models\EventDate;
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
        $UrlId = Str::random(20);//ランダム文字20字生成　IDがかぶった際の処理を追加予定
        $Event = new Event();
        //clock($EventId); デバック
        $EventModel = $Event->create([
            'event_name' => $request->name,
            'description' => $request->description,
            'url' => $UrlId,
            'mail_text' => $request->MailText,
        ]);

        $EventDate = new EventDate();

        clock($request->date);
        clock("id:".$EventModel->id);

        foreach($request->date as $date){
            clock($date);
            $EventDate->create([
                'event_id' => $EventModel->id,
                'date' => $date
            ]);
        }

        

        return response()->json(["message" => "success create Event!"]);
        
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
        $Data = Event::with(['EventDate'])->where('url',$request->id)->get()->toArray();
        clock($Data);
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
        $Data = Event::where('id',$request->id)
        ->update([
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
