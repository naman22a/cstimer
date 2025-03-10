import { NextPage } from 'next';
import { BsGithub, BsGoogle } from 'react-icons/bs';

const Auth: NextPage = () => {
    return (
        <div className="flex flex-col items-center pt-40">
            <h1 className="font-semibold text-2xl mb-2 border-b-2 pb-3 border-b-Neon-200">
                Login into your account
            </h1>
            <button
                className="mt-10 px-6 py-2 bg-Neon-200 rounded-sm font-semibold flex items-center gap-3 text-white"
                onClick={() =>
                    (window.location.href = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/google`)
                }
            >
                Sign in with Google <BsGoogle className="h-5 w-5" />
            </button>
            <button
                className="mt-10 px-6 py-2 bg-Neon-200 rounded-sm font-semibold flex items-center gap-3 text-white"
                onClick={() =>
                    (window.location.href = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/github`)
                }
            >
                Sign in with Github <BsGithub className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Auth;
