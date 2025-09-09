import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class VerificaremailsApi implements ICredentialType {
	name = 'verificaremailsApi';
	displayName = 'Verificaremails API';
	documentationUrl = 'https://www.verificaremails.com/docs/';
	properties = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
