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
          { name: 'Postal Address validation', value: 'address' },
          { name: 'Name/Surname/Gender validation', value: 'name' },
          { name: 'Name/Surname correction', value: 'name_correction' },
          { name: 'Name/surname autocomplete', value: 'name_autocomplete' }
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
        placeholder: 'Phone Number',
        description: 'Validate phone numbers with HLR lookup (international format, no spaces).',
        displayOptions: { show: { service: ['phone_hlr'] } },
      },
      {
        displayName: 'Phone',
        name: 'phoneMnp',
        type: 'string',
        default: '',
        placeholder: 'Phone Number',
        description: 'Validate phone numbers with MNP checks and worldwide coverage (international format, no spaces, no 0 or + symbol on the number).',
        displayOptions: { show: { service: ['phone_mnp'] } },
      },
      {
        displayName: 'Phone',
        name: 'phoneSyntactic',
        type: 'string',
        default: '',
        placeholder: 'Phone Number',
        description: 'Validate phone numbers with international syntax checks and global coverage (international format, no spaces, no 0 or + symbol on the number).',
        displayOptions: { show: { service: ['phone_syntactic'] } },
      },

      // Name validation (simple)
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

      // Name-based JSON services (correction, autocomplete)
      {
        displayName: 'Name',
        name: 'nameInput',
        type: 'string',
        default: '',
        placeholder: 'Name or Surname',
        description: 'Name or surname to process.',
        displayOptions: { show: { service: ['name_correction', 'name_autocomplete'] } },
        required: true,
      },
      {
        displayName: 'Type',
        name: 'useFirstNames',
        type: 'options',
        options: [
          { name: 'First name', value: 1 },
          { name: 'Surname', value: 0 }
        ],
        default: 1,
        description: 'Select whether the input is a first name (1) or a surname (0).',
        displayOptions: { show: { service: ['name_correction', 'name_autocomplete'] } },
        required: true,
      },
      {
        displayName: 'Gender',
        name: 'gender',
        type: 'options',
        options: [
          { name: '—', value: '' },
          { name: 'Male', value: 'M' },
          { name: 'Female', value: 'F' }
        ],
        default: '',
        description: 'Optional. If provided: M (male) or F (female).',
        displayOptions: { show: { service: ['name_correction', 'name_autocomplete'] } },
      },
      {
        displayName: 'Country',
        name: 'country',
        type: 'options',
        options: [
          { name: '—', value: '' },
          { name: 'Afghanistan', value: 'AF' },
          { name: 'Albania', value: 'AL' },
          { name: 'Algeria', value: 'DZ' },
          { name: 'Andorra', value: 'AD' },
          { name: 'Angola', value: 'AO' },
          { name: 'Argentina', value: 'AR' },
          { name: 'Armenia', value: 'AM' },
          { name: 'Australia', value: 'AU' },
          { name: 'Austria', value: 'AT' },
          { name: 'Azerbaijan', value: 'AZ' },
          { name: 'Bahamas', value: 'BS' },
          { name: 'Bahrain', value: 'BH' },
          { name: 'Bangladesh', value: 'BD' },
          { name: 'Barbados', value: 'BB' },
          { name: 'Belarus', value: 'BY' },
          { name: 'Belgium', value: 'BE' },
          { name: 'Belize', value: 'BZ' },
          { name: 'Benin', value: 'BJ' },
          { name: 'Bhutan', value: 'BT' },
          { name: 'Bolivia', value: 'BO' },
          { name: 'Bosnia and Herzegovina', value: 'BA' },
          { name: 'Botswana', value: 'BW' },
          { name: 'Brazil', value: 'BR' },
          { name: 'Brunei', value: 'BN' },
          { name: 'Bulgaria', value: 'BG' },
          { name: 'Burkina Faso', value: 'BF' },
          { name: 'Burundi', value: 'BI' },
          { name: 'Cambodia', value: 'KH' },
          { name: 'Cameroon', value: 'CM' },
          { name: 'Canada', value: 'CA' },
          { name: 'Cape Verde', value: 'CV' },
          { name: 'Central African Republic', value: 'CF' },
          { name: 'Chad', value: 'TD' },
          { name: 'Chile', value: 'CL' },
          { name: 'China', value: 'CN' },
          { name: 'Colombia', value: 'CO' },
          { name: 'Comoros', value: 'KM' },
          { name: 'Congo (DRC)', value: 'CD' },
          { name: 'Congo (Republic)', value: 'CG' },
          { name: 'Costa Rica', value: 'CR' },
          { name: 'Côte d’Ivoire', value: 'CI' },
          { name: 'Croatia', value: 'HR' },
          { name: 'Cuba', value: 'CU' },
          { name: 'Cyprus', value: 'CY' },
          { name: 'Czechia', value: 'CZ' },
          { name: 'Denmark', value: 'DK' },
          { name: 'Djibouti', value: 'DJ' },
          { name: 'Dominica', value: 'DM' },
          { name: 'Dominican Republic', value: 'DO' },
          { name: 'Ecuador', value: 'EC' },
          { name: 'Egypt', value: 'EG' },
          { name: 'El Salvador', value: 'SV' },
          { name: 'Equatorial Guinea', value: 'GQ' },
          { name: 'Eritrea', value: 'ER' },
          { name: 'Estonia', value: 'EE' },
          { name: 'Eswatini', value: 'SZ' },
          { name: 'Ethiopia', value: 'ET' },
          { name: 'Fiji', value: 'FJ' },
          { name: 'Finland', value: 'FI' },
          { name: 'France', value: 'FR' },
          { name: 'Gabon', value: 'GA' },
          { name: 'Gambia', value: 'GM' },
          { name: 'Georgia', value: 'GE' },
          { name: 'Germany', value: 'DE' },
          { name: 'Ghana', value: 'GH' },
          { name: 'Greece', value: 'GR' },
          { name: 'Guatemala', value: 'GT' },
          { name: 'Guinea', value: 'GN' },
          { name: 'Guinea-Bissau', value: 'GW' },
          { name: 'Guyana', value: 'GY' },
          { name: 'Haiti', value: 'HT' },
          { name: 'Honduras', value: 'HN' },
          { name: 'Hungary', value: 'HU' },
          { name: 'Iceland', value: 'IS' },
          { name: 'India', value: 'IN' },
          { name: 'Indonesia', value: 'ID' },
          { name: 'Iran', value: 'IR' },
          { name: 'Iraq', value: 'IQ' },
          { name: 'Ireland', value: 'IE' },
          { name: 'Israel', value: 'IL' },
          { name: 'Italy', value: 'IT' },
          { name: 'Jamaica', value: 'JM' },
          { name: 'Japan', value: 'JP' },
          { name: 'Jordan', value: 'JO' },
          { name: 'Kazakhstan', value: 'KZ' },
          { name: 'Kenya', value: 'KE' },
          { name: 'Kuwait', value: 'KW' },
          { name: 'Kyrgyzstan', value: 'KG' },
          { name: 'Laos', value: 'LA' },
          { name: 'Latvia', value: 'LV' },
          { name: 'Lebanon', value: 'LB' },
          { name: 'Lesotho', value: 'LS' },
          { name: 'Liberia', value: 'LR' },
          { name: 'Libya', value: 'LY' },
          { name: 'Liechtenstein', value: 'LI' },
          { name: 'Lithuania', value: 'LT' },
          { name: 'Luxembourg', value: 'LU' },
          { name: 'Madagascar', value: 'MG' },
          { name: 'Malawi', value: 'MW' },
          { name: 'Malaysia', value: 'MY' },
          { name: 'Maldives', value: 'MV' },
          { name: 'Mali', value: 'ML' },
          { name: 'Malta', value: 'MT' },
          { name: 'Mauritania', value: 'MR' },
          { name: 'Mauritius', value: 'MU' },
          { name: 'Mexico', value: 'MX' },
          { name: 'Moldova', value: 'MD' },
          { name: 'Monaco', value: 'MC' },
          { name: 'Mongolia', value: 'MN' },
          { name: 'Montenegro', value: 'ME' },
          { name: 'Morocco', value: 'MA' },
          { name: 'Mozambique', value: 'MZ' },
          { name: 'Myanmar', value: 'MM' },
          { name: 'Namibia', value: 'NA' },
          { name: 'Nepal', value: 'NP' },
          { name: 'Netherlands', value: 'NL' },
          { name: 'New Zealand', value: 'NZ' },
          { name: 'Nicaragua', value: 'NI' },
          { name: 'Niger', value: 'NE' },
          { name: 'Nigeria', value: 'NG' },
          { name: 'North Macedonia', value: 'MK' },
          { name: 'Norway', value: 'NO' },
          { name: 'Oman', value: 'OM' },
          { name: 'Pakistan', value: 'PK' },
          { name: 'Panama', value: 'PA' },
          { name: 'Papua New Guinea', value: 'PG' },
          { name: 'Paraguay', value: 'PY' },
          { name: 'Peru', value: 'PE' },
          { name: 'Philippines', value: 'PH' },
          { name: 'Poland', value: 'PL' },
          { name: 'Portugal', value: 'PT' },
          { name: 'Qatar', value: 'QA' },
          { name: 'Romania', value: 'RO' },
          { name: 'Russia', value: 'RU' },
          { name: 'Rwanda', value: 'RW' },
          { name: 'San Marino', value: 'SM' },
          { name: 'São Tomé and Príncipe', value: 'ST' },
          { name: 'Saudi Arabia', value: 'SA' },
          { name: 'Senegal', value: 'SN' },
          { name: 'Serbia', value: 'RS' },
          { name: 'Seychelles', value: 'SC' },
          { name: 'Sierra Leone', value: 'SL' },
          { name: 'Singapore', value: 'SG' },
          { name: 'Slovakia', value: 'SK' },
          { name: 'Slovenia', value: 'SI' },
          { name: 'Somalia', value: 'SO' },
          { name: 'South Africa', value: 'ZA' },
          { name: 'South Korea', value: 'KR' },
          { name: 'Spain', value: 'ES' },
          { name: 'Sri Lanka', value: 'LK' },
          { name: 'Sudan', value: 'SD' },
          { name: 'Sweden', value: 'SE' },
          { name: 'Switzerland', value: 'CH' },
          { name: 'Syria', value: 'SY' },
          { name: 'Taiwan', value: 'TW' },
          { name: 'Tajikistan', value: 'TJ' },
          { name: 'Tanzania', value: 'TZ' },
          { name: 'Thailand', value: 'TH' },
          { name: 'Togo', value: 'TG' },
          { name: 'Trinidad and Tobago', value: 'TT' },
          { name: 'Tunisia', value: 'TN' },
          { name: 'Turkey', value: 'TR' },
          { name: 'Turkmenistan', value: 'TM' },
          { name: 'Uganda', value: 'UG' },
          { name: 'Ukraine', value: 'UA' },
          { name: 'United Arab Emirates', value: 'AE' },
          { name: 'United Kingdom', value: 'GB' },
          { name: 'United States', value: 'US' },
          { name: 'Uruguay', value: 'UY' },
          { name: 'Uzbekistan', value: 'UZ' },
          { name: 'Vatican City', value: 'VA' },
          { name: 'Venezuela', value: 'VE' },
          { name: 'Vietnam', value: 'VN' },
          { name: 'Zambia', value: 'ZM' },
          { name: 'Zimbabwe', value: 'ZW' }
        ],
        default: '',
        description: 'Optional country. The output uses the Alpha-2 code (e.g., ES for Spain).',
        displayOptions: { show: { service: ['name_correction', 'name_autocomplete'] } },
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

      let term: any = '';
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
        case 'name_correction': {
          const nameInput = this.getNodeParameter('nameInput', i) as string;
          const useFirstNames = this.getNodeParameter('useFirstNames', i) as number;
          const gender = (this.getNodeParameter('gender', i) as string) || '';
          const country = (this.getNodeParameter('country', i) as string) || '';
          const payload: any = { name: nameInput, use_first_names: Number(useFirstNames) };
          if (gender) payload.gender = gender;
          if (country) payload.country = country;
          term = payload;
          break;
        }
        case 'name_autocomplete': {
          const nameInput = this.getNodeParameter('nameInput', i) as string;
          const useFirstNames = this.getNodeParameter('useFirstNames', i) as number;
          const gender = (this.getNodeParameter('gender', i) as string) || '';
          const country = (this.getNodeParameter('country', i) as string) || '';
          const payload: any = { name: nameInput, use_first_names: Number(useFirstNames) };
          if (gender) payload.gender = gender;
          if (country) payload.country = country;
          term = payload;
          break;
        }
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
