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
    public $DecesionDates;
    public $MailText;
    public $EventMenbers;

    /**
     * Create a new message instance.
     */
    public function __construct($EventDatas,$DecesionDates)
    {
        $this->EventDatas = $EventDatas;
        $this->DecesionDates = $DecesionDates;
        $this->MailText = $this->EventDatas[0]["mail_text"];
        $this->EventMenbers = array_column($this->EventDatas[0]["join_user"],"name");
        clock($this->EventDatas);
        clock($this->DecesionDates);
        clock();
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Decision Notice Email',
        );
    }

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
				return $this->to('aaa@example.com')             // 宛先
                    ->cc('bbb@example.com')             // CC
                    ->bcc('ccc@example.com')            // BCC
                    ->subject('会員登録が完了しました')     // 件名
                    ->view('mail.DecisionNoticeEmail')         // 本文（HTMLメール）
                    ->text('mail.DecisionNoticeEmail_text')   // 本文（プレーンテキストメール）                   
                    ->with([
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
