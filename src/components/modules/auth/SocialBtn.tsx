import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { envVars } from '@/config/env';

export default function SocialLoginButtons() {

  const handleGoogleLogin = () => {
    const redirectPath = "/";
    const json = false;

    const query = new URLSearchParams({
      redirect: redirectPath,
      json: json.toString(),
    });

    window.location.href = `${envVars.VITE_BACKEND_URL}/auth/google?${query.toString()}`;
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full flex items-center gap-2 justify-center"
        onClick={handleGoogleLogin}
      >
        Continue with Google
      </Button>


      <Button
        variant="outline"
        className="w-full flex items-center gap-2 justify-center"
        onClick={() => console.log("GitHub login")}
      >
        <FaGithub size={20} />
        Continue with GitHub
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center gap-2 justify-center"
        onClick={() => console.log("Facebook login")}
      >
        <FaFacebook size={20} className="text-blue-600" />
        Continue with Facebook
      </Button>
    </div>
  );
}
