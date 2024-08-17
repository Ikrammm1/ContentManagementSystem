<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function AuthorizationGroup()
    {
        return $this->belongsToMany(
            'App\Models\AuthorizationGroup',
            'cms_user_auth_groups',
            'user_id',
            'group_id',
            'id'
        );
    }
 
    public function UserAuthGroup()
    {
        return $this->hasMany('App\Models\UserAuthGroup', 'user_id', 'id');
    }


    public function Authorizations()
    {
        return $this->belongsToMany(AuthorizationGroup::class, 'cms_user_auth_groups', 'user_id', 'group_id');
    }
}
