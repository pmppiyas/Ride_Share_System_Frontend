import { Link, useNavigate } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/assets/icons/Logo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Role } from "@/types";
import { getRolebasedLinks } from '@/utils/getRolebaseLinks';
import { useLogoutMutation } from '@/redux/features/auth/auth.api';

interface NavbarProps {
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  auth = {
    login: { title: "Login", url: "/auth/login" },
    signup: { title: "Sign up", url: "/auth/signup" },
  },
}: NavbarProps) => {
  const { me } = useAuth();



  const user = me?.data;
  const role = user?.role || Role.RIDER;

  const navLinks = [
    { title: "Home", url: "/" },
    ...(role === Role.RIDER
      ? [{ title: "Get Ride", url: "/rider/find_driver" }]
      : []),
    { title: "Dashboard", url: getRolebasedLinks(role) },
    { title: "About Us", url: "/about_us" }
  ];

  const navigate = useNavigate();
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();
      toast.success(res.message);
      navigate("/auth/login");
    } catch (err) {
      toast.error("Logout failed.")
      console.log(err);

    }
  };


  return (
    <section className="p-4 flex justify-center ">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden lg:flex justify-between items-center">
          {/* Left: Logo & Links */}
          <div className="flex items-center gap-6">
            <Logo />

          </div>

          {/* Right: Auth Buttons */}
          <div className="flex gap-14">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.url}
                        className="bg-background hover:bg-muted hover:text-accent-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            {user ? (
              <Button onClick={() => handleLogout()} variant="outline">Logout</Button>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link to={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between">
          <Logo />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-4">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className="text-md font-semibold hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}

                <div className="flex flex-col gap-3 mt-4">
                  {user ? (
                    <Button onClick={() => handleLogout()} variant="outline">Logout</Button>
                  ) : (
                    <>
                      <Button asChild variant="outline" size="sm">
                        <Link to={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link to={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
