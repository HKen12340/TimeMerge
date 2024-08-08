<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class CreateEventRequest extends FormRequest
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
            'date' => 'required|array|min:1',
            'date.*' => 'min:1',
            'description' => 'string|nullable'
        ];
    }

    public function messages(){
        return[
            'name.required' => 'イベント名は必須です',
            'date.required' => '日時は必須です',
            'date.*.min' => '日付を入力してください',
        ];
    }

    protected function failedValidation(Validator $validator){
        $response['errors'] = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response));
    }
}
