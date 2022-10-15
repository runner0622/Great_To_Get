import { useEffect, useState } from "react";

// custom hook for localstorage
const useLocalStorage = (key, initialValue) => {

	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});


	const removeValue = () => {
		try {
			localStorage.removeItem(key)
			return true
		} catch (error) {
			console.log(error);
		}
	}


	const setValue = (value=null) => {
		try { 
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			localStorage.setItem(key, JSON.stringify(valueToStore));
			return true;
		} catch (error) {
			console.log(error);
		}
	}
	return [storedValue, setValue, removeValue];
}


export default useLocalStorage