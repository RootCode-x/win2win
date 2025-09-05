// AuthButtons.js
import Link from 'next/link';

export default function AuthButtons({ session }) {
  return (
    <div>
      {!session ? (
        <>
          <Link href="/login">Log In</Link>
          <Link href="/create-account">Sign Up</Link>
        </>
      ) : (
        <>
          {/* <Link href="/dashboard">Dashboard</Link> */}
          <form action="/logout" method="post">
            <button type="submit">Logout</button>
          </form>
        </>
      )}
    </div>
  );
}
