<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
        protected  $fillable = ['item_name','item_type','item_description','price','quantity','create_at'];
}
