import {FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from '../../hooks/authProvider';

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is_company_login, setIsCompanyLogin] = useState('0');
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation data
    if(email!=='' && password!=='') {
        const isLoggedIn = await auth.loginHandler({
          email: email,
          password: password,
          is_company_login: !!is_company_login,
        });
        if(isLoggedIn) {
          navigate("/");
          return;
        }
        setLoginFailed(true);
        return;
    }
    // error message if validation failed
    alert('please enter email and password.');
  };

  return (

  <div className="h-screen flex items-center bg-[url('./images/login-bg.svg')] px-4 bg-cover">
    <div className="shadow-2xl max-w-lg mx-auto py-6 md:py-12 rounded-2xl w-full max-h-[680px]">
      <img src="images/logo.png" alt="rzyeo" className="mx-auto mb-4 md:my-4" />
      <h2 className="text-center text-xl md:text-4xl font-gilroyBold mt-4 md:mt-12 mb-0 md:mb-8">Welcome back! </h2>
      <div className="p-4 md:p-8 font-inter">
        {loginFailed && <p>Username or Password is incorrect.</p>}
        <form action="#" method="post" onSubmit={handleSubmit}>
          <input type="text"
                 placeholder="Email"
                 required
                 id="email"
                 name="email"
                 autoComplete="email"
                 value={email}
                 onChange={e=>setEmail(e.target.value)}
                 autoFocus className="hover:border-[#3575d5] focus:border-[#3575d5] focus:outline-none focus:ring focus:ring-violet-300 border block w-full rounded-md pl-4 h-12 text-sm mb-4" />
          <input
              placeholder="Password"
              name="password"
              required
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="hover:border-[#3575d5] focus:border-[#3575d5] focus:outline-none focus:ring focus:ring-violet-300 border block w-full rounded-md pl-4 h-12 text-sm mb-4" />
          <div className="flex justify-between font-inter">
            <div>
              <input
                  type="checkbox"
                  id="remember_me"
                  name="remember_me"
              />
              <label htmlFor="remember_me" className="text-sm">Remember me.</label>
            </div>
            <div>
              <a href="#" className="text-sm">Forgot Password?</a>
            </div>
            <div>
              <input
                  type="checkbox"
                  id="is_company_login"
                  name="is_company_login"
                  value={is_company_login}
                  onChange={e=>setIsCompanyLogin(e.target.value)}
              />
              <label htmlFor="is_company_login" className="text-sm">Company Login?</label>
            </div>
          </div>
          <button type="submit" className="rounded-3xl block mx-auto my-6 ryeo-blue-bg w-56 h-11 text-white">Login</button>
        </form>
      </div>
    </div>
  </div>

  );
}
