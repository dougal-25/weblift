// STALE v1 MIRROR (Apollo-era). The live n8n workflow EcTXui207L8aIhoW is source of truth since v2 (2026-06-11) — see wiki/features/outbound_lead_machine.md
import { workflow, node, trigger, ifElse, languageModel, outputParser, newCredential, expr } from '@n8n/workflow-sdk';

// ── Triggers ────────────────────────────────────────────────
const runManually = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Run Manually', position: [0, 0] },
  output: [{}],
});

const everyMorning = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.3,
  config: {
    name: 'Every Morning 9am',
    parameters: { rule: { interval: [{ field: 'days', daysInterval: 1, triggerAtHour: 9 }] } },
    position: [0, 200],
  },
  output: [{}],
});

// ── Control panel ───────────────────────────────────────────
const settings = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Settings',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'niche', name: 'current_niche', value: 'kitchen fitters', type: 'string' },
          { id: 'loc', name: 'location', value: 'London, United Kingdom', type: 'string' },
          { id: 'max', name: 'max_leads', value: '3', type: 'string' },
        ],
      },
    },
    position: [220, 100],
  },
  output: [{ current_niche: 'kitchen fitters', location: 'London, United Kingdom', max_leads: '3' }],
});

// ── Find businesses (Apollo) ────────────────────────────────
const searchApollo = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Search Apollo',
    parameters: {
      method: 'POST',
      url: 'https://api.apollo.io/api/v1/mixed_companies/search',
      authentication: 'genericCredentialType',
      genericAuthType: 'httpHeaderAuth',
      sendBody: true,
      contentType: 'json',
      specifyBody: 'json',
      jsonBody: expr('{\n  "q_organization_keyword_tags": ["{{ $json.current_niche }}"],\n  "organization_locations": ["{{ $json.location }}"],\n  "per_page": {{ $json.max_leads }}\n}'),
    },
    credentials: { httpHeaderAuth: newCredential('Apollo') },
    position: [440, 100],
  },
  output: [{ organizations: [{ name: 'Acme Kitchens', website_url: 'https://acmekitchens.co.uk', primary_phone: { number: '+44 20 1234 5678' } }] }],
});

const splitCompanies = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1,
  config: {
    name: 'Split Companies',
    parameters: { fieldToSplitOut: 'organizations', include: 'noOtherFields' },
    position: [660, 100],
  },
  output: [{ name: 'Acme Kitchens', website_url: 'https://acmekitchens.co.uk', primary_phone: { number: '+44 20 1234 5678' } }],
});

// ── Normalise to a clean, stable shape ──────────────────────
const normalizeLead = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Normalize Lead',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'co', name: 'company', value: expr('{{ $json.name }}'), type: 'string' },
          { id: 'web', name: 'website_url', value: expr('{{ $json.website_url || "" }}'), type: 'string' },
          { id: 'tel', name: 'phone', value: expr('{{ $json.primary_phone?.sanitized_number || $json.primary_phone?.number || $json.phone || "" }}'), type: 'string' },
        ],
      },
    },
    position: [880, 100],
  },
  output: [{ company: 'Acme Kitchens', website_url: 'https://acmekitchens.co.uk', phone: '+44 20 1234 5678' }],
});

// ── Got a website? ──────────────────────────────────────────
const hasWebsite = ifElse({
  version: 2.3,
  config: {
    name: 'Has Website?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [{ leftValue: expr('{{ $json.website_url }}'), operator: { type: 'string', operation: 'notEmpty' }, rightValue: '' }],
        combinator: 'and',
      },
    },
    position: [1100, 100],
  },
});

// ── Read the site (Firecrawl) ───────────────────────────────
const scrapeWebsite = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Scrape Website',
    parameters: {
      method: 'POST',
      url: 'https://api.firecrawl.dev/v1/scrape',
      authentication: 'genericCredentialType',
      genericAuthType: 'httpHeaderAuth',
      sendBody: true,
      contentType: 'json',
      specifyBody: 'json',
      jsonBody: expr('{\n  "url": "{{ $json.website_url }}",\n  "formats": ["markdown"]\n}'),
    },
    credentials: { httpHeaderAuth: newCredential('Firecrawl') },
    position: [1320, 0],
  },
  output: [{ success: true, data: { markdown: '# Acme Kitchens\nWe fit kitchens.' } }],
});

// ── Claude: is the site bad? ────────────────────────────────
const auditModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatAnthropic',
  version: 1.5,
  config: {
    name: 'Haiku (Audit)',
    parameters: {
      model: { __rl: true, mode: 'list', value: 'claude-haiku-4-5-20251001', cachedResultName: 'Claude Haiku 4.5' },
      options: { maxTokensToSample: 1024 },
    },
    credentials: { anthropicApi: newCredential('Anthropic') },
    position: [1320, 220],
  },
});

const auditParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Audit Format',
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: '{\n  "has_bad_website": true,\n  "biggest_flaw": "one short specific sentence",\n  "looks_dated": true,\n  "mobile_unfriendly": true,\n  "score": 4\n}',
    },
    position: [1480, 220],
  },
});

const auditWebsite = node({
  type: '@n8n/n8n-nodes-langchain.chainLlm',
  version: 1.9,
  config: {
    name: 'Audit Website',
    parameters: {
      promptType: 'define',
      hasOutputParser: true,
      text: expr(
        'You are a blunt, experienced web designer auditing a local UK trade business\'s website for a redesign pitch. Below is the text scraped from their homepage.\n\n' +
        'Business: {{ $(\'Normalize Lead\').item.json.company }}\n' +
        'Trade: {{ $(\'Settings\').item.json.current_niche }}\n\n' +
        '--- WEBSITE CONTENT START ---\n' +
        '{{ ($json.data?.markdown || \'\').slice(0, 6000) }}\n' +
        '--- WEBSITE CONTENT END ---\n\n' +
        'Judge it the way a customer on a phone would. Look for: no clear way to call or get a quote, a confusing or empty homepage, copy that does not say what they do or where, a dated 2010-era look, no signs it works on mobile, no reviews or trust signals.\n\n' +
        'Be strict: only set has_bad_website to false if the site is genuinely good (score 8+). A thin, generic, or hard-to-contact site IS a bad website. biggest_flaw must be one short, specific sentence a non-techie owner would understand. score is 1 (embarrassing) to 10 (already great, no pitch needed).'
      ),
    },
    subnodes: { model: auditModel, outputParser: auditParser },
    position: [1320, 100],
  },
  output: [{ output: { has_bad_website: true, biggest_flaw: 'No phone number anywhere above the fold.', looks_dated: true, mobile_unfriendly: true, score: 3 } }],
});

// ── Flatten the audit back onto the lead ────────────────────
const assembleAudit = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Assemble Audit',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'co', name: 'company', value: expr('{{ $(\'Normalize Lead\').item.json.company }}'), type: 'string' },
          { id: 'tel', name: 'phone', value: expr('{{ $(\'Normalize Lead\').item.json.phone }}'), type: 'string' },
          { id: 'web', name: 'website_url', value: expr('{{ $(\'Normalize Lead\').item.json.website_url }}'), type: 'string' },
          { id: 'bad', name: 'has_bad_website', value: expr('{{ $json.output.has_bad_website }}'), type: 'boolean' },
          { id: 'flaw', name: 'biggest_flaw', value: expr('{{ $json.output.biggest_flaw }}'), type: 'string' },
          { id: 'sc', name: 'score', value: expr('{{ $json.output.score }}'), type: 'number' },
        ],
      },
    },
    position: [1700, 100],
  },
  output: [{ company: 'Acme Kitchens', phone: '+44 20 1234 5678', website_url: 'https://acmekitchens.co.uk', has_bad_website: true, biggest_flaw: 'No phone number anywhere above the fold.', score: 3 }],
});

const isItBad = ifElse({
  version: 2.3,
  config: {
    name: 'Is It Bad?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [{ leftValue: expr('{{ $json.has_bad_website }}'), operator: { type: 'boolean', operation: 'true', singleValue: true }, rightValue: '' }],
        combinator: 'and',
      },
    },
    position: [1920, 100],
  },
});

// ── No website at all = hottest lead ────────────────────────
const markNoWebsite = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Mark No Website',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'bad', name: 'has_bad_website', value: true, type: 'boolean' },
          { id: 'flaw', name: 'biggest_flaw', value: 'No website at all', type: 'string' },
          { id: 'sc', name: 'score', value: 1, type: 'number' },
        ],
      },
    },
    position: [1320, 360],
  },
  output: [{ company: 'No-Site Builders', phone: '+44 20 9999 0000', website_url: '', has_bad_website: true, biggest_flaw: 'No website at all', score: 1 }],
});

// ── Converge: single reference node before the pitch ────────
const prepPitch = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Prep Pitch',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'co', name: 'company', value: expr('{{ $json.company }}'), type: 'string' },
          { id: 'tel', name: 'phone', value: expr('{{ $json.phone }}'), type: 'string' },
          { id: 'web', name: 'website_url', value: expr('{{ $json.website_url }}'), type: 'string' },
          { id: 'flaw', name: 'biggest_flaw', value: expr('{{ $json.biggest_flaw }}'), type: 'string' },
          { id: 'sc', name: 'score', value: expr('{{ $json.score }}'), type: 'number' },
          { id: 'bad', name: 'has_bad_website', value: expr('{{ $json.has_bad_website }}'), type: 'boolean' },
        ],
      },
    },
    position: [2140, 200],
  },
  output: [{ company: 'Acme Kitchens', phone: '+44 20 1234 5678', website_url: 'https://acmekitchens.co.uk', biggest_flaw: 'No phone number anywhere above the fold.', score: 3, has_bad_website: true }],
});

// ── Claude: write the pitch ─────────────────────────────────
const pitchModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatAnthropic',
  version: 1.5,
  config: {
    name: 'Haiku (Pitch)',
    parameters: {
      model: { __rl: true, mode: 'list', value: 'claude-haiku-4-5-20251001', cachedResultName: 'Claude Haiku 4.5' },
      options: { maxTokensToSample: 1024 },
    },
    credentials: { anthropicApi: newCredential('Anthropic') },
    position: [2360, 320],
  },
});

const pitchParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Pitch Format',
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: '{\n  "draft_pitch": "three sentences max",\n  "talking_points": "point one | point two | point three"\n}',
    },
    position: [2520, 320],
  },
});

const writePitch = node({
  type: '@n8n/n8n-nodes-langchain.chainLlm',
  version: 1.9,
  config: {
    name: 'Write Pitch',
    parameters: {
      promptType: 'define',
      hasOutputParser: true,
      text: expr(
        'You write cold-outreach pitches for WebLift, a one-man done-for-you website redesign service for UK local trades. Flat fee from £750. The whole hook is "show, don\'t tell": we offer a free 2-minute video mockup of their improved site.\n\n' +
        'Voice: a helpful neighbour who happens to build websites, NOT an agency, NOT a salesperson. Direct, warm, plain English, zero jargon. Never write "I hope this email finds you well", "I wanted to reach out", "synergy", or any corporate filler.\n\n' +
        'The prospect:\n' +
        '- Business: {{ $json.company }}\n' +
        '- Trade: {{ $(\'Settings\').item.json.current_niche }}\n' +
        '- The specific problem with their current site: {{ $json.biggest_flaw }}\n\n' +
        'draft_pitch: 3 sentences max. Open by naming the specific problem and the customer it is costing them. Offer the free 2-minute mockup. End with a low-pressure ask. No greeting fluff.\n' +
        'talking_points: three short points (one string, separated by " | ") WebLift can say on a cold call about this business\'s website problem.'
      ),
    },
    subnodes: { model: pitchModel, outputParser: pitchParser },
    position: [2360, 200],
  },
  output: [{ output: { draft_pitch: 'People on their phone cannot find your number...', talking_points: 'No click-to-call | Looks dated on mobile | Free 2-min mockup' } }],
});

// ── Save to review queue ────────────────────────────────────
const saveToSheet = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Save to Leads Sheet',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      authentication: 'oAuth2',
      documentId: { __rl: true, mode: 'list', value: '' },
      sheetName: { __rl: true, mode: 'list', value: '' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          company: expr('{{ $(\'Prep Pitch\').item.json.company }}'),
          phone: expr('{{ $(\'Prep Pitch\').item.json.phone }}'),
          website: expr('{{ $(\'Prep Pitch\').item.json.website_url }}'),
          score: expr('{{ $(\'Prep Pitch\').item.json.score }}'),
          biggest_flaw: expr('{{ $(\'Prep Pitch\').item.json.biggest_flaw }}'),
          draft_pitch: expr('{{ $json.output.draft_pitch }}'),
          talking_points: expr('{{ $json.output.talking_points }}'),
          tps_ctps_checked: '',
          status: 'NEW',
        },
        schema: [
          { id: 'company', displayName: 'company', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'phone', displayName: 'phone', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'website', displayName: 'website', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'score', displayName: 'score', required: false, defaultMatch: false, display: true, type: 'number', canBeUsedToMatch: false },
          { id: 'biggest_flaw', displayName: 'biggest_flaw', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'draft_pitch', displayName: 'draft_pitch', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'talking_points', displayName: 'talking_points', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'tps_ctps_checked', displayName: 'tps_ctps_checked', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'status', displayName: 'status', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
        ],
      },
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [2580, 200],
  },
  output: [{ company: 'Acme Kitchens', status: 'NEW' }],
});

// ── Compose ─────────────────────────────────────────────────
export default workflow('weblift-lead-machine', 'WebLift Lead Machine')
  .add(runManually)
  .to(settings)
  .to(searchApollo)
  .to(splitCompanies)
  .to(normalizeLead)
  .to(
    hasWebsite
      .onTrue(scrapeWebsite.to(auditWebsite).to(assembleAudit).to(isItBad.onTrue(prepPitch.to(writePitch).to(saveToSheet))))
      .onFalse(markNoWebsite.to(prepPitch))
  )
  .add(everyMorning)
  .to(settings);
