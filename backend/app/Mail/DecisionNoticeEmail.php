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
    
    public $content;

    /**
     * Create a new message instance.
     */
    public function __construct($content)
    {
        $this->content = $content;
        clock($this->content);
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
				return $this->to('aaa@example.com')             // 宛先
                    ->cc('bbb@example.com')             // CC
                    ->bcc('ccc@example.com')            // BCC
                    ->subject('会員登録が完了しました')     // 件名
                    ->view('mail.DecisionNoticeEmail')         // 本文（HTMLメール）
                    ->text('mail.DecisionNoticeEmail_text')   // 本文（プレーンテキストメール）                   
                    ->with([                                    // ビューで使う変数
                        'content', $this->content,
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
