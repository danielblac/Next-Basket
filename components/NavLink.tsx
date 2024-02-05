import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface Props extends LinkProps {
  children: ReactNode;
}
export default function NavLink({ href, children, ...props }: Props) {
  const { asPath } = useRouter();

  const isActive = href === asPath || href === props.as;

  return (
    <Link href={href} {...props} className={`${isActive ? "active-link" : ""}`}>
      {children}
    </Link>
  );
}
