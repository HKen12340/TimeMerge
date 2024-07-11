<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JoinUser extends Model
{
    use HasFactory;
    protected $fillable = ['event_id','name','email'];

    public function JoinFlag(): HasMany {
        return $this->hasMany(JoinFlag::class,'join_id','id');
    }
}
