import { verificaremailsApiRequest, VerificarService } from './GenericFunctions';

export class Verificaremails {
  description = {
    displayName: 'VerificarEmails',
    name: 'verificaremails',
    icon: 'file:nodes/Verificaremails/verificaremails.svg',
    group: ['transform'],
    version: 1,
    description: 'Validate emails, phones, names and postal addresses using VerificarEmails.com API',
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
          { name: 'Email validation', value: 'email' },
          { name: 'Phone validation - HLR Lookup', value: 'phone_hlr' },
          { name: 'Phone validation - MNP', value: 'phone_mnp' },
          { name: 'Phone validation - Syntactic', value: 'phone_syntactic' },
          { name: 'Name/Surname/Gender validation', value: 'name' },
          { name: 'Postal Address validation', value: 'address' },

        ],
        default: 'email',
        description: 'Select which verification service to use',
      },

      // Email
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        placeholder: 'Email address',
        description: 'Validate an email address',
        displayOptions: { show: { service: ['email'] } },
      },

      // Phone variants (HLR, MNP, Syntactic)
      {
        displayName: 'Phone',
        name: 'phoneHlr',
        type: 'string',
        default: '',
        placeholder: 'Phone Number international format: 34677934019',
        description: 'Validate phone numbers with HLR lookup (international format, no spaces).',
        displayOptions: { show: { service: ['phone_hlr'] } },
      },
      {
        displayName: 'Phone',
        name: 'phoneMnp',
        type: 'string',
        default: '',
        placeholder: 'Phone Number international format: 34677934019',
        description: 'Validate phone numbers with MNP checks and worldwide coverage (international format, no spaces, no 0 or + symbol on the number).',
        displayOptions: { show: { service: ['phone_mnp'] } },
      },
      {
        displayName: 'Phone',
        name: 'phoneSyntactic',
        type: 'string',
        default: '',
        placeholder: 'Phone Number international format: 34677934019',
        description: 'Validate phone numbers with international syntax checks and global coverage (international format, no spaces, no 0 or + symbol on the number).',
        displayOptions: { show: { service: ['phone_syntactic'] } },
      },

      // Name
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        placeholder: 'Name or Surname',
        description: 'Validate names and surnames to obtain country, gender, and popularity insights.',
        displayOptions: { show: { service: ['name'] } },
      },

      // Address
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        placeholder: 'Postal Address',
        description: 'Validate and correct postal addresses to provide a standardized format.',
        displayOptions: { show: { service: ['address'] } },
      },
    ],
  };

  async execute(this: any) {
    const items = this.getInputData();
    const out: any[] = [];

    const credentials = await this.getCredentials('verificaremailsApi');
    const apiKey = credentials.apiKey as string;

    for (let i = 0; i < items.length; i++) {
      const service = this.getNodeParameter('service', i) as VerificarService;

      let term = '';
      switch (service) {
        case 'email':
          term = this.getNodeParameter('email', i) as string;
          break;
        case 'phone_hlr':
          term = this.getNodeParameter('phoneHlr', i) as string;
          break;
        case 'phone_mnp':
          term = this.getNodeParameter('phoneMnp', i) as string;
          break;
        case 'phone_syntactic':
          term = this.getNodeParameter('phoneSyntactic', i) as string;
          break;
        case 'name':
          term = this.getNodeParameter('name', i) as string;
          break;
        case 'address':
          term = this.getNodeParameter('address', i) as string;
          break;
      }

      const response = await verificaremailsApiRequest.call(this, 'GET', term, apiKey, service);

      const status =
        (response && response.result && response.result.status)
          ? response.result.status
          : (response && response.status)
            ? response.status
            : 'unknown';

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
