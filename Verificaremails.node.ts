import { verificaremailsApiRequest } from './GenericFunctions';

export class Verificaremails {
  description = {
    displayName: 'VerificarEmails',
    name: 'verificaremails',
    icon: 'file:verificaremails.svg',
    group: ['transform'],
    version: 1,
    description: 'Validate emails or phone numbers using VerificarEmails.com API',
    defaults: { name: 'VerificarEmails' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'verificaremailsApi', required: true }],
    properties: [
      {
        displayName: 'Service',
        name: 'service',
        type: 'options',
        options: [
          { name: 'EmailVerification', value: 'EmailVerification' },
          { name: 'PhoneVerification', value: 'PhoneVerification' },
        ],
        default: 'EmailVerification',
        description: 'Select which verification service to use',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        placeholder: 'user@example.com',
        description: 'Email address to verify',
        displayOptions: {
          show: {
            service: ['EmailVerification'],
          },
        },
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        placeholder: '34677934019',
        description: 'Phone number to verify (international format, no spaces)',
        displayOptions: {
          show: {
            service: ['PhoneVerification'],
          },
        },
      },
    ],
  };

  async execute(this: any) {
    const items = this.getInputData();
    const out = [];

    const credentials = await this.getCredentials('verificaremailsApi');
    const apiKey = credentials.apiKey as string;

    for (let i = 0; i < items.length; i++) {
      const service = this.getNodeParameter('service', i) as 'EmailVerification' | 'PhoneVerification';

      let term = '';
      if (service === 'EmailVerification') {
        term = this.getNodeParameter('email', i) as string;
      } else {
        term = this.getNodeParameter('phone', i) as string;
      }

      const response = await verificaremailsApiRequest.call(this, 'GET', term, apiKey, service);

      const status = (response && response.result && response.result.status)
        ? response.result.status
        : (response && response.status) ? response.status : 'unknown';

      out.push({
        json: {
          service,
          term,
          status,
          apiResponse: response,
        },
      });
    }

    return [out];
  }
}
