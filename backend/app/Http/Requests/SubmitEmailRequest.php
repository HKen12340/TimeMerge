<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class SubmitEmailRequest extends FormRequest
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
            'DecesionDates' => 'required|array|min:1'
        ];
    }

    public function messages(){
        return[
            'DecesionDates.required' => '日付をチェックをしてください'
        ];
    }

    protected function failedValidation(Validator $validator){
        $response['errors'] = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response));
    }
}
