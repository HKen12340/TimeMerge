<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class UpdateScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:25',
            'MailText' => 'string|nullable',
            'description' => 'string|nullable'
        ];
    }

    public function messages(){
        return[
            'name.required' => 'イベント名は必須です',
        ];
    }

    protected function failedValidation(Validator $validator){
        $response['errors'] = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response));
    }
}
