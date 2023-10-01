export function removeUploadDuplicates(
	originalFilenames: string[],
	current: File[]
): { removed: File[]; approved: File[] } {
	const approved = current.filter(
		(file) => !originalFilenames.includes(file.name)
	);
	const removed = current.filter((file) => !approved.includes(file));
	return { removed, approved };
}
