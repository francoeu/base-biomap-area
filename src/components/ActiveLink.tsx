import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({ 
  children, 
  shouldMatchExactHref = false, 
  ...rest 
}: ActiveLinkProps) {
  const path = usePathname();

  let isActive = false;

  if (shouldMatchExactHref && (path === rest.href || path === rest.as)) {
    isActive = true;
  }

  if (!shouldMatchExactHref && 
    (path.startsWith(String(rest.href)) || 
     path.startsWith(String(rest.as)))) {
       isActive = true;
     }

  return (
    <Link {...rest}>
      {cloneElement(children, { 
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}
