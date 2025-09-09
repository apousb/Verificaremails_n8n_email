export async function verificaremailsApiRequest(
	method: string,
	term: string,
	apiKey: string,
): Promise<any> {
	const options = {
		headers: {
			'Accept': 'application/json',
		},
		method,
		uri: `https://dashboard.verificaremails.com/myapi/email/validate/single?auth-token=${apiKey}&term=${encodeURIComponent(term)}`,
		json: true,
	};

	try {
		// @ts-ignore
		const response = await this.helpers.request(options);
		return response;
	} catch (error: any) {
		throw new Error(`Verificaremails API request failed: ${error.message}`);
	}
}
