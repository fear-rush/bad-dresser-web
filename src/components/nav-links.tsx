import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const allNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Artist", href: "/artist" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact", href: "https://link.baddresser.com/", external: true },
];

export function getNavItems(currentPath: string): NavItem[] {
  return allNavItems.filter((item) => item.href !== currentPath);
}

export function NavLinks({
  items,
  className,
  linkClassName,
  onClick,
}: {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  onClick?: () => void;
}) {
  return (
    <nav className={className}>
      {items.map((item) =>
        item.external ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            onClick={onClick}
          >
            {item.label}
          </a>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className={linkClassName}
            onClick={onClick}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}
