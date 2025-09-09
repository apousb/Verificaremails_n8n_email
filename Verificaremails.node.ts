import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { verificaremailsApiRequest } from './GenericFunctions';

export class Verificaremails implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Verificaremails',
		name: 'verificaremails',
		icon: 'file:verificaremails.svg',
		group: ['transform'],
		version: 1,
		description: 'Verify email addresses using Verificaremails API',
		defaults: {
			name: 'Verificaremails',
		},
		inputs: [
			{
				name: 'main',
			},
		],
		outputs: [
			{
				name: 'main',
			},
		],
		credentials: [
			{
				name: 'verificaremailsApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				placeholder: 'name@example.com',
				required: true,
				description: 'Email address to validate',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('verificaremailsApi') as { apiKey: string };

		for (let i = 0; i < items.length; i++) {
			const email = this.getNodeParameter('email', i) as string;
			const response = await verificaremailsApiRequest.call(this, 'GET', email, credentials.apiKey);

			returnData.push({
				json: {
					email,
					status: response.result?.status || 'unknown',
					result_type: response.result_type,
					result_code: response.result_code,
				},
			});
		}

		return [returnData];
	}
}
