import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../redux/auth/selectors.js";
import { useEffect } from "react";
import { refreshUserThunk } from "../redux/auth/operations.js";
import { jwtDecode } from "jwt-decode";

const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) return;

    // Ваш Base64 рядок

    try {
      // Використовуємо atob для декодування Base64
      const decoded = atob(token);
      console.log("Decoded string:", decoded); // Виводимо результат
    } catch (error) {
      console.error("Error decoding Base64 string:", error.message);
    }

    // Декодуємо токен
    console.log(token);
    let decoded = atob(token);
    console.log(decoded);

    decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Поточний час у секундах
    const timeLeft = decoded.exp - currentTime;

    if (timeLeft > 0) {
      // Встановлюємо таймер для рефрешу за 30 секунд до закінчення
      const timeoutId = setTimeout(() => {
        dispatch(refreshUserThunk());
      }, (timeLeft - 30) * 1000);

      return () => clearTimeout(timeoutId); // Очищуємо таймер при оновленні
    }
  }, [token, dispatch]);
};

export default useTokenRefresh;
