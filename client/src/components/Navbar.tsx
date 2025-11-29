import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/Button";
import { Menu, X, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import logo from "../assets/zen-space-logo.PNG";
import { toast } from "sonner";

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role?: string;
};

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${
      isActive
        ? "text-gray-900 font-semibold"
        : "text-gray-600 hover:text-gray-900"
    }`;

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("zen_user");
    if (storedUser) {
      try {
        setAuthUser(JSON.parse(storedUser));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSignupChange = (field: string, value: string) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
    if (passwordError) setPasswordError("");
  };

  const handleLoginChange = (field: string, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordError("");

    if (signupForm.password.length < 5) {
      setPasswordError("Parool peab olema vähemalt 5 märki pikk");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setPasswordError("Paroolid ei kattu");
      return;
    }

    try {
      setAuthLoading(true);
      const res = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupForm.name,
          email: signupForm.email,
          password: signupForm.password,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "Registreerimine ebaõnnestus");
      }

      toast.success("Konto edukalt loodud! Logi nüüd sisse.");
      setSignupDialogOpen(false);
      setSignupForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast.error(err.message || "Registreerimine ebaõnnestus");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setAuthLoading(true);
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "Sisselogimine ebaõnnestus");
      }

      const { token, user } = data;

      localStorage.setItem("zen_token", token);
      localStorage.setItem("zen_user", JSON.stringify(user));

      setAuthUser(user);
      setLoginDialogOpen(false);
      setLoginForm({ email: "", password: "" });
      toast.success("Tere tulemast tagasi!");
    } catch (err: any) {
      toast.error(err.message || "Sisselogimine ebaõnnestus");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("zen_token");
    localStorage.removeItem("zen_user");
    setAuthUser(null);
    toast.success("Oled välja logitud");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Zen Space Studio"
                className="h-14 w-auto"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-gray-800 font-semibold">
                  Zen Space
                </span>
                <span className="text-gray-800">Studio</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-12">
            <nav className="flex items-center gap-8">
              <NavLink to="/" className={linkClasses}>
                Avaleht
              </NavLink>
              <NavLink to="/teenused" className={linkClasses}>
                Mis on Zen Space?
              </NavLink>
              <NavLink to="/tunniplaan" className={linkClasses}>
                Tunniplaan
              </NavLink>
              <NavLink to="/contact" className={linkClasses}>
                Kontakt
              </NavLink>
            </nav>

            <Button asChild>
              <NavLink to="/booking" className="text-white">
                Broneeri ruum
              </NavLink>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-10 h-10 rounded-full border-2 border-black bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Sisse logimine"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {authUser ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-600">
                      <div className="font-semibold">
                        Tere, {authUser.name}
                      </div>
                      {authUser.role && (
                        <div className="text-xs uppercase text-gray-400">
                          {authUser.role}
                        </div>
                      )}
                    </div>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logi välja
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => setLoginDialogOpen(true)}
                    >
                      Logi sisse
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSignupDialogOpen(true)}
                    >
                      Loo konto
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <NavLink
                to="/"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Avaleht
              </NavLink>
              <NavLink
                to="/teenused"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Mis on Zen Space?
              </NavLink>
              <NavLink
                to="/tunniplaan"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tunniplaan
              </NavLink>
              <NavLink
                to="/contact"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </NavLink>
              <Button className="w-full" asChild>
                <NavLink
                  to="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white"
                >
                  Broneeri ruum
                </NavLink>
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Logi sisse</DialogTitle>
            <DialogDescription>
              Sisesta oma e-mail ja parool, et sisse logida.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div className="space-y-2">
              <Label htmlFor="login-email">
                E-mail <span className="text-red-500">*</span>
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="nimi@email.ee"
                required
                value={loginForm.email}
                onChange={(e) =>
                  handleLoginChange("email", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">
                Parool <span className="text-red-500">*</span>
              </Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Sisesta parool"
                required
                value={loginForm.password}
                onChange={(e) =>
                  handleLoginChange("password", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={authLoading}
              >
                {authLoading ? "Sisselogimine..." : "Logi sisse"}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setLoginDialogOpen(false);
                  setSignupDialogOpen(true);
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Pole veel kontot? Loo konto
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupDialogOpen} onOpenChange={setSignupDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Loo konto</DialogTitle>
            <DialogDescription>
              Loo uus konto, et broneerida tunde ja ruume.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSignupSubmit}>
            <div className="space-y-2">
              <Label htmlFor="signup-name">
                Nimi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="Sinu nimi"
                required
                value={signupForm.name}
                onChange={(e) =>
                  handleSignupChange("name", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">
                E-mail <span className="text-red-500">*</span>
              </Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="nimi@email.ee"
                required
                value={signupForm.email}
                onChange={(e) =>
                  handleSignupChange("email", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">
                Parool <span className="text-red-500">*</span>
              </Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Loo parool"
                required
                value={signupForm.password}
                onChange={(e) =>
                  handleSignupChange("password", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password-confirm">
                Kinnita parool <span className="text-red-500">*</span>
              </Label>
              <Input
                id="signup-password-confirm"
                type="password"
                placeholder="Sisesta parool uuesti"
                required
                value={signupForm.confirmPassword}
                onChange={(e) =>
                  handleSignupChange(
                    "confirmPassword",
                    e.target.value
                  )
                }
              />
            </div>
            {passwordError && (
              <div className="text-red-500 text-sm mt-2">
                {passwordError}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={authLoading}
              >
                {authLoading ? "Loon kontot..." : "Loo konto"}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setSignupDialogOpen(false);
                  setLoginDialogOpen(true);
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Juba on konto? Logi sisse
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
