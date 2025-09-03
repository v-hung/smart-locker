import { ResponseError } from "@/generate-api";
import { notifications } from "@mantine/notifications";

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const wrapPromise = async <T>(callback: () => Promise<T>) => {
	try {
		return await callback();
	} catch (error) {
		const message = await getMessageError(error);

		notifications.show({
			color: "red",
			title: "Error",
			message: message,
		});

		return null;
	}
};

export async function getMessageError(e: any): Promise<string> {
	try {
		if (!(e instanceof ResponseError)) throw e;

		const json = await e.response.json();
		const error = json as Partial<ResponseError>;

		if (error.message) return error.message;

		throw e;
	} catch {
		return "Something went wrong!";
	}
}
