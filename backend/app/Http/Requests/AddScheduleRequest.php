<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class AddScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

     public function authorize(): bool
     {
         return true;
     }

    public function rules(): array
    {
        return [
            'username' => 'required|string',
            'email' => 'nullable|email',
            'remarks' => 'string|nullable'
        ];
    }

    public function messages(){
        return[
            'username.required' => '名前は必須です',
            'email.email' => 'メールの書式が間違っています'
        ];
    }

    protected function failedValidation(Validator $validator){
        $response['errors'] = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response));
    }
}
