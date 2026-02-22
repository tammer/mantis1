// ==============================|| NEWSLETTER API (DUMMY) ||============================== //

const MOCK_NEWSLETTERS = {
  'newsletter-one': {
    id: 'newsletter-one',
    title: "Aashay's Newsletter",
    date: 'Feb 18, 2025',
    short_summary: 'Insights on startups, investing, and building products.',
    long_summary:
      'This newsletter covers the latest trends in venture capital and startup growth. We explore why big companies pay premium prices for small startups, the role of product-market fit, and practical advice for founders. Each edition includes curated reads and analysis from the field.'
  },
  'newsletter-two': {
    id: 'newsletter-two',
    title: 'Newsletter Two',
    date: 'Feb 17, 2025',
    short_summary: 'Weekly digest of tech and business news.',
    long_summary:
      'A weekly roundup of the most important stories in technology and business. We summarize key developments, offer brief commentary, and link to deeper reads for those who want to dive in.'
  },
  'newsletter-three': {
    id: 'newsletter-three',
    title: 'Newsletter Three',
    date: 'Feb 20, 2025',
    short_summary: 'Monthly roundup of industry highlights.',
    long_summary:
      'Once a month we compile the standout articles, data, and trends from the past four weeks. This is your go-to place for catching up on what mattered most in your industry.'
  },
  'newsletter-four': {
    id: 'newsletter-four',
    title: 'Newsletter Four',
    date: 'Feb 19, 2025',
    short_summary: 'Tech insights and analysis.',
    long_summary:
      'Deep dives into technology trends, product development, and engineering practices. We share lessons learned and frameworks that help teams ship better software.'
  },
  'newsletter-five': {
    id: 'newsletter-five',
    title: 'Newsletter Five',
    date: 'Feb 18, 2025',
    short_summary: 'Startup weekly: funding, growth, and ops.',
    long_summary:
      'Focused on early-stage and growth-stage startups: fundraising updates, growth tactics, and operational playbooks from founders and operators.'
  },
  'newsletter-six': {
    id: 'newsletter-six',
    title: 'Newsletter Six',
    date: 'Feb 17, 2025',
    short_summary: 'Design digest for product and UX.',
    long_summary:
      'Curated design resources, UX patterns, and product thinking. For designers and product people who want to stay sharp and inspired.'
  },
  'newsletter-seven': {
    id: 'newsletter-seven',
    title: 'Newsletter Seven',
    date: 'Feb 16, 2025',
    short_summary: 'Product updates and release notes.',
    long_summary:
      'A clear summary of product changes, new features, and improvements. Keeps stakeholders and users in the loop without the noise.'
  },
  'newsletter-eight': {
    id: 'newsletter-eight',
    title: 'Newsletter Eight',
    date: 'Feb 15, 2025',
    short_summary: 'Marketing tips and campaigns.',
    long_summary:
      'Actionable marketing ideas, campaign breakdowns, and channels that work. From demand gen to brand, we share what we see working in the wild.'
  },
  'newsletter-nine': {
    id: 'newsletter-nine',
    title: 'Newsletter Nine',
    date: 'Feb 14, 2025',
    short_summary: 'Engineering blog and dev updates.',
    long_summary:
      'Technical write-ups, architecture decisions, and dev tooling. Written by engineers for engineers who care about craft and scale.'
  },
  'newsletter-ten': {
    id: 'newsletter-ten',
    title: 'Newsletter Ten',
    date: 'Feb 13, 2025',
    short_summary: 'Leadership notes and management.',
    long_summary:
      'Thoughts on leading teams, running meetings, and building culture. Short, practical notes for managers and aspiring leaders.'
  },
  'newsletter-eleven': {
    id: 'newsletter-eleven',
    title: 'Newsletter Eleven',
    date: 'Feb 12, 2025',
    short_summary: 'Finance weekly: markets and economics.',
    long_summary:
      'Weekly take on markets, macro, and key economic releases. Plain-language summaries for busy readers who want to stay informed.'
  },
  'newsletter-twelve': {
    id: 'newsletter-twelve',
    title: 'Newsletter Twelve',
    date: 'Feb 11, 2025',
    short_summary: 'Culture and growth at work.',
    long_summary:
      'How teams grow, how culture evolves, and how to build organizations that last. Stories and frameworks from people who have done it.'
  },
  'newsletter-thirteen': {
    id: 'newsletter-thirteen',
    title: 'Newsletter Thirteen',
    date: 'Feb 10, 2025',
    short_summary: 'Industry trends and outlook.',
    long_summary:
      'High-level view of where your industry is heading. We track signals, talk to experts, and distill the trends that matter for the next 12–24 months.'
  }
};

const FALLBACK_PAYLOAD = {
  id: 'unknown',
  title: 'Newsletter',
  date: '—',
  short_summary: 'No summary available.',
  long_summary: 'This newsletter could not be loaded. Please check the link or try again later.'
};

/**
 * Fetches newsletter details by id (dummy API).
 * @param {string} id - Newsletter id (e.g. 'newsletter-one')
 * @returns {Promise<{ id: string, title: string, date: string, short_summary: string, long_summary: string }>}
 */
export function fetchNewsletterById(id) {
  return new Promise((resolve) => {
    const delay = 150;
    setTimeout(() => {
      const payload = MOCK_NEWSLETTERS[id] || { ...FALLBACK_PAYLOAD, id };
      resolve(payload);
    }, delay);
  });
}

// ==============================|| NEWSLETTER API - SUBSCRIBE BY URL ||============================== //

const NEWSLETTER_API_BASE = import.meta.env.VITE_APP_NEWSLETTER_API_URL ?? 'http://127.0.0.1:5001';

/**
 * Submits a newsletter URL to the backend to add a subscription.
 * @param {string} url - Newsletter URL (will be trimmed)
 * @param {string} [accessToken] - Optional Supabase session access token for Authorization header
 * @returns {Promise<{ success: boolean, message: string, title?: string }>}
 */
export async function subscribeNewsletterByUrl(url, accessToken) {
  const trimmedUrl = url?.trim() ?? '';
  const headers = {
    'Content-Type': 'application/json'
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  try {
    const res = await fetch(`${NEWSLETTER_API_BASE}/newsletters/subscribe-by-url`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ url: trimmedUrl })
    });
    const data = await res.json().catch(() => ({}));
    const message = data.message ?? 'Request failed';
    if (res.ok) {
      return { success: true, message, title: data.title };
    }
    return { success: false, message };
  } catch (err) {
    return { success: false, message: err?.message ?? 'Subscription failed. Please try again.' };
  }
}
