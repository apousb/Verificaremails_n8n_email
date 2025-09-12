export type VerificarService =
  | 'email'
  | 'phone_hlr'
  | 'name'
  | 'address'
  | 'phone_mnp'
  | 'phone_syntactic'
  | 'name_correction'
  | 'name_autocomplete';

export async function verificaremailsApiRequest(
  method: string,
  term: string | Record<string, any>,
  apiKey: string,
  service: VerificarService,
): Promise<any> {
  const endpointMap: Record<VerificarService, string> = {
    email: 'email/validate/single',
    phone_hlr: 'phone/validate/single',
    name: 'name/validate/single',
    address: 'address/validate/single',
    phone_mnp: 'phonemnp/validate/single',
    phone_syntactic: 'phonesyntactic/validate/single',
    name_correction: 'fuzzysearch/validate/single',
    name_autocomplete: 'namecomplete/validate/single',
  };

  const endpoint = endpointMap[service];

  const options = {
    headers: { Accept: 'application/json' },
    method,
    uri: `https://dashboard.verificaremails.com/myapi/${endpoint}?auth-token=${apiKey}&term=${encodeURIComponent(typeof term === 'string' ? term : JSON.stringify(term))}`,
    json: true,
  };

  try {
    // @ts-ignore - n8n provides helpers at runtime
    const response = await this.helpers.request(options);
    return response;
  } catch (error: any) {
    throw new Error(`Verificaremails API request failed: ${error?.message || error}`);
  }
}
