import React from 'react'

const Sidebar = ({changeSetting,selected}) => {

    const settings = ["Profile","Account"];

    return (
        <nav className="rounded border border-gray-600 w-1/5 text-white overflow-hidden divide-y divide-gray-600">
            {settings.map(setting => (
                <div>
                    <button className={`block w-full text-left p-2 border-l-4 hover:bg-gray-800 ${selected === setting ? "border-neon-purple bg-gray-800" : "border-transparent" }`} onClick={changeSetting}>{setting}</button>
                </div>
            ))}
        </nav>
    )
}

export default Sidebar
