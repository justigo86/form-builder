import React from "react";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();
  console.log(session);

  return (
    <header>
      <nav>
        <div>
          <h1>AI Form Builder</h1>
          {session?.user ? (
            <div>session.user.name</div>
          ) : (
            <Link href="/api/auth/signin">
              <Button>SignIn</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
