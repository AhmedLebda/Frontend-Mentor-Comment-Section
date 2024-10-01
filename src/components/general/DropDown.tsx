import { useState } from "react"
import { useCurrentUser } from "../../contexts/CurrentUser";
import { User } from "../../types";

type DropdownProps = {
    options: User[]
    placeholder?: string
}


const DropDown = ({ options, placeholder = "Select an option" }: DropdownProps) => {
    const { currentUser, changeUser } = useCurrentUser();
    const [selectedValue, setSelectedValue] = useState(currentUser.username)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setSelectedValue(value)
        const selectedUser = options.find((user) => user.id === value)
        if (!selectedUser) return
        changeUser(selectedUser)
    }

    return (
        <div>
            <label htmlFor="selectUser" className="block text-sm font-bold text-blue-800 mb-1 pl-1 italic">Change User :</label>
            <div className="relative inline-block min-w-52">
                <select
                    value={selectedValue}
                    id="selectUser"
                    onChange={handleChange}
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.username}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}


export default DropDown