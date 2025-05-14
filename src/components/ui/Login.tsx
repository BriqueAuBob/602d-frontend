import { useRef } from "react";
import fetchApi from "../../utils/fetchApi";

export default function Login({
  setCurrentScreen,
}: {
  setCurrentScreen: (screen: "menu" | "login" | "game" | "register") => void;
}) {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    try {
      const response = await fetchApi("auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.current?.value,
          password: password.current?.value,
        }),
      });

      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        setCurrentScreen("game");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login">
      <button onClick={() => setCurrentScreen("menu")}>Back</button>
      <h1>Welcome to the Game</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input type="text" placeholder="Email" required ref={email} />
        <input type="password" placeholder="Password" required ref={password} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
