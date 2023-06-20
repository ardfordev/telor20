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

					const response = await fetch("/api/auth/logout", {
						method: "POST",
					});

          
					if (response.ok) return router.push('/');
					
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
