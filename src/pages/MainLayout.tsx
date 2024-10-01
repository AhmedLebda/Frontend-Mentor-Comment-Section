import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className="bg-gray-200 min-h-screen py-12 ">
            <div className="container max-w-xl md:max-w-4xl mx-auto px-4">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default MainLayout