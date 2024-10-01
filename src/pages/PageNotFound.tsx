import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="container flex flex-col gap-8 items-center py-52 h-screen">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Oops!, The page you were looking for doesn't exit</h1>
            <p>You may have mistyped the address or the page may have moved</p>

            <Link to="/" className="capitalize py-2 px-4 text-blue-800 border border-blue-800 rounded-md">Back to home</Link>
        </div>
    )
}

export default PageNotFound