<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
     'event_name',
     'description',
     'mail_text',
     'url'
    ];

    public function eventDate(): HasMany {
        return $this->hasMany(EventDate::class,'event_id','id');
    }


}
