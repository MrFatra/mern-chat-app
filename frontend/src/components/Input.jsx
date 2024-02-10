import React from 'react'

const Input = ({value, refy, label, required = true, inputType = 'text', inputClassName = 'input input-bordered w-full', name }) => {
    return (
        <label className="form-control my-4">
            {
                label &&
                <div className="label label-text font-medium text-[.95rem] flex justify-start">
                    {label}{required ? <p className='text-red-500 mr-1'>*</p> : null}:
                </div>
            }
            <input ref={refy} type={inputType} className={inputClassName} name={name} value={value}/>
        </label>
    )
}

export default Input