export class Verificaremails {
  description = {
    displayName: 'Verificaremails',
    name: 'verificaremails',
    icon: 'file:assets/verificaremails.svg',
    group: ['transform'],
    version: 1,
    description: 'Verify email addresses using Verificaremails API',
    defaults: { name: 'Verificaremails' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'verificaremailsApi', required: true }],
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

  async execute(this: any) {
    const items = this.getInputData();
    const out: any[] = [];
    const credentials = await this.getCredentials('verificaremailsApi');

    for (let i = 0; i < items.length; i++) {
      const email = this.getNodeParameter('email', i) as string;
      const response = await this.helpers.request({
        method: 'GET',
        uri: `https://dashboard.verificaremails.com/myapi/email/validate/single?auth-token=${credentials.apiKey}&term=${encodeURIComponent(email)}`,
        json: true,
        headers: { Accept: 'application/json' },
      });
      out.push({ json: {
        email,
        status: response?.result?.status ?? 'unknown',
        result_type: response?.result_type,
        result_code: response?.result_code,
      }});
    }
    return [out];
  }
}
