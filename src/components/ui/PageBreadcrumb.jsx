import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { Link } from "react-router-dom";


function PageBreadcrumb({ items = [] }) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbItem>
        <Link
          to="/sys/dashboard"
          className="hover:text-blue-600 text-gray-700 transition-colors"
        >
          Beranda
        </Link>
      </BreadcrumbItem>
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          <Link
            to={item.href}
            className="hover:text-blue-600 text-gray-700 transition-colors"
          >
            {item.label}
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default PageBreadcrumb;