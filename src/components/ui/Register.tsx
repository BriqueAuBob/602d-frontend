import { useRef } from "react";
import fetchApi from "../../utils/fetchApi";

export default function Register({
  setCurrentScreen,
}: {
  setCurrentScreen: (screen: "menu" | "login" | "game" | "register") => void;
}) {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleRegister = async () => {
    if (username) {
      try {
        const response = await fetchApi("auth/register", {
          method: "POST",
          body: JSON.stringify({
            name: username.current?.value,
            email: email.current?.value,
            password: password.current?.value,
          }),
        });
        if (response.email) {
          alert("Registration successful!");
        } else {
          alert("Registration failed. " + response.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <div className="register">
      <button onClick={() => setCurrentScreen("menu")}>Back</button>
      <h1>Welcome to the Game</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <input type="text" placeholder="Username" required ref={username} />
        <input type="text" placeholder="Email" required ref={email} />
        <input type="password" placeholder="Password" required ref={password} />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account?</p>
    </div>
  );
}
