export function formatName(input: string): string {
	if (!input) {
		return "";
	}

	return input.replace(
		/\w\S*/g,
		(text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
	);
}
