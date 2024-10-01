import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className="bg-gray-200 min-h-screen ">
            <Outlet></Outlet>
        </div>
    )
}

export default MainLayout