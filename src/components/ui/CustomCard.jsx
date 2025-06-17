import { Card } from "flowbite-react"
import { Link } from "react-router-dom"

export default function CustomCard({ title, description, icon: Icon, link = "#", color = "text-purple-500" }) {
  return (
    <Link to={link} className="block group">
      <Card className="h-full border-t-4 border-transparent hover:shadow-md transition-all duration-200">
        <div className="flex flex-col h-full p-5">
          <div className={`${color} mb-4`}>
            <Icon className="h-6 w-6" />
          </div>

          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>

          <div className="mt-auto pt-4">
            <div
              className={`${color} text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              Lihat
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M1.16675 7.00008H12.8334M12.8334 7.00008L7.00008 1.16675M12.8334 7.00008L7.00008 12.8334"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
