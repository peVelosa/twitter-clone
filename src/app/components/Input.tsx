import { Label, TextInput } from 'flowbite-react';
import { ControllerRenderProps, FieldErrors } from 'react-hook-form';
import { TForm } from './Profile/EditProfile';
import type { FC } from 'react';

type TInput = {
    field: ControllerRenderProps<TForm, any>
    error: FieldErrors<TForm>
}

const Input: FC<TInput> = ({ field, error }) => {
    return (
        <>
            <div>
                <Label htmlFor={field.name} className="block capitalize">{field.name}</Label>
                <TextInput
                    id="email"
                    {...field}
                    required
                />
                {error[field.name as keyof TForm] && <span className='text-red-600'>
                    {error[field.name as keyof TForm]?.message}
                </span>}
            </div>
        </>
    )
}

export default Input