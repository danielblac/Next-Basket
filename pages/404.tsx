import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);

  return (
    <div className="no-page">
      <h1>Ooooooops....</h1>
      <h2>That page cannot be found</h2>
      <p>
        Go back to <Link href="/">Home</Link>
      </p>
      <div className="footer-pad"></div>
    </div>
  );
}
