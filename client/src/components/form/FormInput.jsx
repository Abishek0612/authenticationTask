import React from "react"

export default function FormInput({ name, placeholder, label, ...rest }) {
    return (
        <div>

            <div className="flex flex-col-reverse">
                <input name={name} className="bg-transparant  rounded border-2   border-light-subtle w-full text-lg
                      outline-none text-black peer transition focus:border-primary p-1" placeholder={placeholder} {...rest} />

                <label className='font-semibold text-light-subtle
                        self-start' htmlFor='email' >{label}</label>

            </div>
        </div>
    )
}