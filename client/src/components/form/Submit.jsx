import React from "react";


export default function Submit({value}) {
    return <button type="submit" className="w-full rounded bg-black  hover:bg-opacity-90 transition  
        font-semibold text-white cursor-pointer h-10 flex items-center justify-center" value={value}>
            {value}
    </button>
}