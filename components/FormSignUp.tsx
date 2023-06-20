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
					const formData = new FormData(e.currentTarget);
					const email = formData.get("email");
					const name = formData.get("name");
					const unit = formData.get("unit");
					const wilayah = formData.get("wilayah");
					const password = formData.get("password");

					const response = await fetch("/api/auth/signup", {
						method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
						body: JSON.stringify({
							"email": email,
	            "name": name,
	            "unit": unit,
	            "wilayah": wilayah,
	            "password": password
						})
					});

          
					if (response.ok) return router.push('/auth/login');
					
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
