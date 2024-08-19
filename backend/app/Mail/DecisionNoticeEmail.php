<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DecisionNoticeEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $EventDatas;
    public $EventName;
    public $DecesionDates;
    public $MailText;
    public $EventMenbers;
    public $MaliAdressArr;

    /**
     * Create a new message instance.
     */
    public function __construct($EventDatas,$DecesionDates)
    {
        clock($EventDatas);
        clock($DecesionDates);
        $this->EventName = $EventDatas[0]["event_name"];
        $this->DecesionDates = $DecesionDates;
        $this->MailText = $EventDatas[0]["mail_text"];

        //array_column関数で指定カラムのみ取り出す
        $this->EventMenbers = array_column($EventDatas[0]["join_user"],"name");
        $this->MaliAdressArr = array_column($EventDatas[0]["join_user"],"email");
    }

    /**
     * Get the message envelope.
     */
    // public function envelope(): Envelope
    // {
    //     return new Envelope(
    //         subject: 'Decision Notice Email',
    //     );
    // }

    /**
     * Get the message content definition.
     */
    //public function content(): Content
    //{
        // return new Content(
        //     view: 'views.name',
        // );
    //}

    public function build()
    {
// ビューで使う変数                        
				return $this->to($this->MaliAdressArr)             // 宛先
                    ->cc('bbb@example.com')             // CC
                    ->bcc('ccc@example.com')            // BCC
                    ->subject('「'.$this->EventName.'」スケジュール確定のおしらせ')     // 件名
                    ->view('mail.DecisionNoticeEmail')         // 本文（HTMLメール）
                    ->text('mail.DecisionNoticeEmail_text')   // 本文（プレーンテキストメール）                   
                    ->with([
                        "Name" => $this->EventName,
                        "Text" => $this->MailText,
                        "Dates" => $this->DecesionDates,
                        "Members" => $this->EventMenbers
                    ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
