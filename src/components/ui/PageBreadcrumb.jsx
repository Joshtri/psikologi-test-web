import { Breadcrumb , BreadcrumbItem} from "flowbite-react";

export default function PageBreadcrumb({ items = [] }) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
      {items.map((item, index) => (
        <BreadcrumbItem key={index} href={item.href}>
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
