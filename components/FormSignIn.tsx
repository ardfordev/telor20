"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Form = ({
	children,
	action
}: {
	children: React.ReactNode;
	action: string;
}) => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState("");
	return (
		<>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setErrorMessage("");
					const formData:any = new FormData(e.currentTarget);
					const email = formData.get("email");
					const password = formData.get("password");

					const response = await fetch("/api/auth/login", {
						method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
						body: JSON.stringify({
							"email": email,
	            "password": password
						})
					});

          
					if (response.ok) return router.push('/dashboard');
					
					const result = (await response.json());
					setErrorMessage(result.error);
				}}
			>
				{children}
			</form>
			<p className="error">{errorMessage}</p>
		</>
	);
};

export default Form;
