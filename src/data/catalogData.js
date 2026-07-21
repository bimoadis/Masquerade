import skillsData from './skills.json';

const CUSTOM_MATCHERS = {
  "Nmap": { keywords: ["host", "network", "port", "server", "ip", "service"], buckets: ["Web", "Public"], extensions: [] },
  "theHarvester": { keywords: ["harvester", "osint", "email", "domain", "status", "ping", "host", "dns", "technology", "tech", "public", "americas", "africa"], buckets: ["Web", "Public", "Technology", "Americas", "Africa", "Middle East", "Asia"], extensions: [".sa", ".my", ".sh"] },
  "Amass": { keywords: ["amass", "subdomain", "dns", "enum", "recon", "mapping", "asset", "technology"], buckets: ["Web", "Public", "Technology"], extensions: [] },
  "Holehe": { keywords: ["holehe", "email", "reset", "password", "register", "endpoint", "logs", "history"], buckets: ["Web", "Public", "Leaks", "Logs"], extensions: [] },
  "httpx": { keywords: ["httpx", "http", "https", "probe", "response", "status", "web", "technology", "tech", "changelog", "api", "docs", "blog"], buckets: ["Web", "Public", "Technology"], extensions: [".html", ".php", ".aspx"] },
  "SpiderFoot": { keywords: ["onion", "tor", "darknet", "lockbit", "ransom", "ransomware", "leak", "breach", "credential", "intelx", "threat", "ioc", "spiderfoot", "technology", "tech", "logs", "history"], buckets: ["Darknet", "Leaks", "Logs", "Technology"], extensions: [".onion", ".sql", ".rar", ".txt"] },
  "Subfinder": { keywords: ["subfinder", "subdomain", "passive", "dns", "recon"], buckets: ["Web"], extensions: [] },
  "TruffleHog": { keywords: ["trufflehog", "password", "secret", "token", "apikey", "api key", "credential", "database", "sql", "logs", "history", "profile"], buckets: ["Leaks", "Restricted", "Logs"], extensions: [".sql", ".env", ".key", ".txt", ".rar"] },
  "Gitleaks": { keywords: ["gitleaks", "git", "repo", "commit", "secret", "token", "private key", "password", "credential", "logs", "history", "chrome", "profile"], buckets: ["Leaks", "Restricted", "Logs"], extensions: [".git", ".rar", ".zip", ".txt"] },
  "Sqlmap": { keywords: ["sqlmap", "sql", "injection", "database", "dump", "db"], buckets: ["Leaks", "Restricted"], extensions: [".sql"] },
  "Hashcat": { keywords: ["hashcat", "hash", "md5", "sha", "password", "decrypt", "crack", "credential"], buckets: ["Darknet", "Leaks"], extensions: [".sql", ".hash", ".txt"] },
  "dnstwist": { keywords: ["dnstwist", "typosquat", "phishing", "impersonation", "domain", "lookalike"], buckets: ["Web", "Public"], extensions: [] }
};

export const CIPHER_CATALOG = skillsData.map(tool => {
  const custom = CUSTOM_MATCHERS[tool.name] || {};
  const keywords = [
    ...(custom.keywords || []),
    ...(tool.matcher?.keywords || []),
    tool.name.toLowerCase(),
    ...(tool.github?.topics || []),
    ...(tool.tags || []).map(t => t.toLowerCase())
  ];

  const buckets = [
    ...(custom.buckets || []),
    ...(tool.matcher?.buckets || []),
    "Web", "Public"
  ];

  const extensions = [
    ...(custom.extensions || []),
    ...(tool.matcher?.extensions || [])
  ];

  return {
    ...tool,
    desc: tool.desc || tool.description || "",
    description: tool.description || tool.desc || "",
    tier: tool.tier || "P1",
    url: tool.url || (tool.github?.topics ? `https://github.com/search?q=${tool.name}` : ""),
    matcher: {
      keywords: [...new Set(keywords)],
      buckets: [...new Set(buckets)],
      extensions: [...new Set(extensions)]
    }
  };
});

export const CATALOG_CATEGORIES = [...new Set(CIPHER_CATALOG.map(t => t.category))];
