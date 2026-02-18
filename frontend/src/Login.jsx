import "./index.css";
import "./App.css";
import { useState } from "react";

function Login() {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const [alert, setalert] = useState({
    show: false,
    message: "vgvvghvhgv",
    // type: "success", // success | error
  });

  const [showPassword, setShowPassword] = useState(false);

  const login_submit = async () => {
    console.log(login);

    try {
      const res = await fetch("http://localhost:3002/restro/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const data = await res.json();

      console.log(data, "this is data of login");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.details.id,
          user: data.details.full_name,
          email: data.details.email,
          role: data.details.role,
        })
      );


      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      setalert({
        show: true,
        message: data.message, // 👈 FROM BACKEND
        // type: res.ok ? "success" : "error",
      });

      setTimeout(() => {
        setalert({ show: false, message: "" });
      }, 3000);

      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      {alert.show ? (
        <div className="fixed top-3 w-[100%] h-8 bg-zinc-200 size-7">
          <div className="flex">
            <span>{alert.message}</span>

            <button
              onClick={() => setalert({ ...alert, show: false })}
              className="font-bold"
            >
              {" "}
              X{" "}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className=" flex flex-col h-auto bg-slate-400 w-[350px] p-6 rounded-xl shadow-lg mx-auto mt-20">
        <label className="my-2 mx-auto align-middle justify-center text-white">
          Email
        </label>

        <input
          value={login.email}
          onChange={(e) => setlogin({ ...Login, email: e.target.value })}
          className="mb-6 px-3 py-2 rounded-md w-full outline-none border border-gray-300"
          type="email"
          placeholder="example@gmail.com"
        ></input>

        <label className="my-2 mx-auto align-middle justify-center text-white">
          password
        </label>

        <div className="">
          <input
            value={login.password}
            onChange={(e) => setlogin({ ...login, password: e.target.value })}
            className="mb-6 px-3 py-2 rounded-md w-full outline-none border border-gray-300"
            type={showPassword ? "text" : "password"}
            // type="password"
          ></input>

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer text-gray-500 hover:text-gray-700 "
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          onClick={() => login_submit()}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        >
          login
        </button>
      </div>
    </div>
  );
}

export default Login;
