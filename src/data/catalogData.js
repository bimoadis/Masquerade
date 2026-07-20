export const CIPHER_CATALOG = [
  // ===== INFORMATION GATHERING =====
  { name: "Nmap", category: "Information Gathering", desc: "Industry-standard network scanner for host discovery, port scanning, and service/version detection across a target network.", url: "https://github.com/nmap/nmap", tier: "P0" },
  { name: "theHarvester", category: "Information Gathering", desc: "OSINT reconnaissance tool that gathers emails, subdomains, hosts, and employee names from public sources and search engines.", url: "https://github.com/laramies/theHarvester", tier: "P0" },
  { name: "Amass", category: "Information Gathering", desc: "In-depth attack surface mapping tool for subdomain enumeration, DNS resolution, and network asset discovery.", url: "https://github.com/owasp-amass/amass", tier: "P0" },
  { name: "Masscan", category: "Information Gathering", desc: "Extremely high-speed port scanner capable of scanning the entire internet address space in minutes.", url: "https://github.com/robertdavidgraham/masscan", tier: "P1" },
  { name: "RustScan", category: "Information Gathering", desc: "Fast modern port scanner written in Rust, designed to pipe results directly into Nmap for deeper analysis.", url: "https://github.com/RustScan/RustScan", tier: "P1" },
  { name: "Holehe", category: "Information Gathering", desc: "Checks if an email address is registered on popular websites by exploiting password-reset and registration endpoints.", url: "https://github.com/megadose/holehe", tier: "P1" },
  { name: "Maigret", category: "Information Gathering", desc: "Collects a person's digital footprint by searching for their username across hundreds of online platforms.", url: "https://github.com/soxoj/maigret", tier: "P1" },
  { name: "httpx", category: "Information Gathering", desc: "Fast and multi-purpose HTTP toolkit that probes live hosts, technologies, and response metadata at scale.", url: "https://github.com/projectdiscovery/httpx", tier: "P0" },
  { name: "SpiderFoot", category: "Information Gathering", desc: "Automated OSINT reconnaissance platform that aggregates data from over 200 sources into a single footprint report.", url: "https://github.com/smicallef/spiderfoot", tier: "P0" },
  { name: "Subfinder", category: "Information Gathering", desc: "Passive subdomain discovery tool that queries multiple public sources to build a target's subdomain map.", url: "https://github.com/projectdiscovery/subfinder", tier: "P0" },
  { name: "TruffleHog", category: "Information Gathering", desc: "Scans git repositories and file systems for accidentally committed secrets, API keys, and credentials.", url: "https://github.com/trufflesecurity/trufflehog", tier: "P0" },
  { name: "Gitleaks", category: "Information Gathering", desc: "Lightweight secret-scanning tool that audits git history for hardcoded passwords, tokens, and private keys.", url: "https://github.com/gitleaks/gitleaks", tier: "P0" },
  { name: "Dracnmap", category: "Information Gathering", desc: "Automation wrapper around Nmap that streamlines common reconnaissance scan sequences.", url: "https://github.com/Screetsec/Dracnmap", tier: "P2" },
  { name: "Xerosploit", category: "Information Gathering", desc: "Penetration testing toolkit for network attacks including scanning, sniffing, and traffic analysis.", url: "https://github.com/LionSec/xerosploit", tier: "P2" },
  { name: "RED HAWK", category: "Information Gathering", desc: "All-in-one reconnaissance tool combining information gathering, vulnerability scanning, and crawling.", url: "https://github.com/Tuhinshubhra/RED_HAWK", tier: "P2" },
  { name: "ReconSpider", category: "Information Gathering", desc: "OSINT framework that consolidates reconnaissance across IPs, emails, domains, and phone numbers.", url: "https://github.com/bhavsec/reconspider", tier: "P2" },
  { name: "Infoga", category: "Information Gathering", desc: "Email OSINT tool that gathers account information linked to a target email address from public sources.", url: "https://github.com/m4ll0k/Infoga", tier: "P2" },
  { name: "ReconDog", category: "Information Gathering", desc: "Reconnaissance suite that acts as a passive information-gathering tool for footprinting targets.", url: "https://github.com/s0md3v/ReconDog", tier: "P2" },
  { name: "Striker", category: "Information Gathering", desc: "Offensive reconnaissance tool that automatically performs a chain of scans against a target domain.", url: "https://github.com/s0md3v/Striker", tier: "P2" },
  { name: "SecretFinder", category: "Information Gathering", desc: "Searches JavaScript files for exposed API keys, tokens, and other sensitive endpoints.", url: "https://github.com/m4ll0k/SecretFinder", tier: "P2" },
  { name: "Shodanfy", category: "Information Gathering", desc: "Command-line client that queries the Shodan search engine for exposed devices and services tied to a target.", url: "https://github.com/m4ll0k/Shodanfy.py", tier: "P2" },
  { name: "rang3r", category: "Information Gathering", desc: "IP range and CIDR-based information gathering tool for network reconnaissance.", url: "https://github.com/floriankunushevci/rang3r", tier: "P2" },
  { name: "Breacher", category: "Information Gathering", desc: "Locates hidden admin login panels on target web applications.", url: "https://github.com/s0md3v/Breacher", tier: "P2" },

  // ===== WORDLIST GENERATOR =====
  { name: "Hashcat", category: "Wordlist & Cracking", desc: "World's fastest password recovery tool, using GPU acceleration to crack hashes from captured credential data.", url: "https://github.com/hashcat/hashcat", tier: "P0" },
  { name: "John the Ripper", category: "Wordlist & Cracking", desc: "Classic offline password cracker supporting dozens of hash types with dictionary and brute-force modes.", url: "https://github.com/openwall/john", tier: "P0" },
  { name: "haiti", category: "Wordlist & Cracking", desc: "Hash type identifier that analyzes a hash string and suggests which algorithm produced it.", url: "https://github.com/noraj/haiti", tier: "P1" },
  { name: "Cupp", category: "Wordlist & Cracking", desc: "Generates targeted wordlists based on personal information about a specific individual for social-engineering audits.", url: "https://github.com/Mebus/cupp", tier: "P2" },
  { name: "Goblin WordGenerator", category: "Wordlist & Cracking", desc: "Custom wordlist generator for building password dictionaries from patterns and rules.", url: "https://github.com/UndeadSec/GoblinWordGenerator", tier: "P2" },

  // ===== WIRELESS ATTACK =====
  { name: "Airgeddon", category: "Wireless Attack", desc: "Multi-use Bash script for wireless network auditing, from handshake capture to WPA/WPA2 security testing.", url: "https://github.com/v1s1t0r1sh3r3/airgeddon", tier: "P0" },
  { name: "Bettercap", category: "Wireless Attack", desc: "Swiss-army-knife framework for WiFi, Bluetooth, and network reconnaissance and man-in-the-middle testing.", url: "https://github.com/bettercap/bettercap", tier: "P0" },
  { name: "hcxdumptool", category: "Wireless Attack", desc: "Captures WiFi handshakes and PMKID data for offline WPA/WPA2 security analysis.", url: "https://github.com/ZerBea/hcxdumptool", tier: "P0" },
  { name: "hcxtools", category: "Wireless Attack", desc: "Companion toolset for converting captured WiFi traffic into crackable hash formats.", url: "https://github.com/ZerBea/hcxtools", tier: "P0" },
  { name: "WiFi-Pumpkin", category: "Wireless Attack", desc: "Rogue access point framework for simulating WiFi security assessments.", url: "https://github.com/P0cL4bs/wifipumpkin3", tier: "P1" },
  { name: "Wifite", category: "Wireless Attack", desc: "Automated wireless auditing tool that attacks multiple WEP/WPA/WPS networks in sequence.", url: "https://github.com/derv82/wifite2", tier: "P1" },
  { name: "Fluxion", category: "Wireless Attack", desc: "Evil-twin attack framework used to audit WiFi network credential security.", url: "https://github.com/FluxionNetwork/fluxion", tier: "P2" },
  { name: "pixiewps", category: "Wireless Attack", desc: "Offline WPS PIN recovery tool exploiting weak randomness in some router implementations.", url: "https://github.com/wiire/pixiewps", tier: "P2" },
  { name: "Wifiphisher", category: "Wireless Attack", desc: "Rogue access point tool for conducting WiFi security awareness and credential-capture assessments.", url: "https://github.com/wifiphisher/wifiphisher", tier: "P2" },

  // ===== SQL INJECTION =====
  { name: "Sqlmap", category: "SQL Injection", desc: "The definitive open-source tool for detecting and testing SQL injection vulnerabilities in web applications.", url: "https://github.com/sqlmapproject/sqlmap", tier: "P0" },
  { name: "NoSqlMap", category: "SQL Injection", desc: "Automated NoSQL injection and database enumeration testing tool for MongoDB and similar databases.", url: "https://github.com/codingo/NoSQLMap", tier: "P1" },
  { name: "DSSS", category: "SQL Injection", desc: "Minimal SQL injection scanner in under 100 lines, useful for quick vulnerability triage.", url: "https://github.com/stamparm/DSSS", tier: "P2" },
  { name: "Leviathan", category: "SQL Injection", desc: "Wide-ranging audit toolkit combining mass scanning with SQL injection and service fingerprinting.", url: "https://github.com/leviathan-framework/leviathan", tier: "P2" },

  // ===== WEB ATTACK =====
  { name: "Nuclei", category: "Web Attack", desc: "Template-based vulnerability scanner that checks web applications against thousands of community-curated CVE and misconfiguration templates.", url: "https://github.com/projectdiscovery/nuclei", tier: "P0" },
  { name: "ffuf", category: "Web Attack", desc: "Fast web fuzzer for directory, parameter, and virtual host discovery on target applications.", url: "https://github.com/ffuf/ffuf", tier: "P0" },
  { name: "Feroxbuster", category: "Web Attack", desc: "Recursive content-discovery tool that brute-forces directories and files across a web application.", url: "https://github.com/epi052/feroxbuster", tier: "P0" },
  { name: "Nikto", category: "Web Attack", desc: "Web server scanner that checks for dangerous files, outdated software, and common misconfigurations.", url: "https://github.com/sullo/nikto", tier: "P0" },
  { name: "Gobuster", category: "Web Attack", desc: "Directory, DNS, and virtual host brute-forcing tool built for speed.", url: "https://github.com/OJ/gobuster", tier: "P0" },
  { name: "OWASP ZAP", category: "Web Attack", desc: "Full-featured web application security scanner maintained by OWASP, covering both automated and manual testing.", url: "https://github.com/zaproxy/zaproxy", tier: "P0" },
  { name: "Dirsearch", category: "Web Attack", desc: "Command-line web path scanner for brute-forcing hidden directories and files.", url: "https://github.com/maurosoria/dirsearch", tier: "P1" },
  { name: "Katana", category: "Web Attack", desc: "Fast crawling framework for discovering endpoints and application attack surface.", url: "https://github.com/projectdiscovery/katana", tier: "P1" },
  { name: "wafw00f", category: "Web Attack", desc: "Fingerprints and identifies which Web Application Firewall (if any) is protecting a target site.", url: "https://github.com/EnableSecurity/wafw00f", tier: "P1" },
  { name: "testssl.sh", category: "Web Attack", desc: "Checks a server's TLS/SSL configuration for known vulnerabilities, cipher weaknesses, and certificate issues.", url: "https://github.com/drwetter/testssl.sh", tier: "P1" },
  { name: "Arjun", category: "Web Attack", desc: "HTTP parameter discovery tool that finds hidden query and form parameters accepted by an endpoint.", url: "https://github.com/s0md3v/Arjun", tier: "P1" },
  { name: "mitmproxy", category: "Web Attack", desc: "Interactive proxy for inspecting, modifying, and replaying HTTP/HTTPS traffic during security testing.", url: "https://github.com/mitmproxy/mitmproxy", tier: "P0" },
  { name: "Sublist3r", category: "Web Attack", desc: "Subdomain enumeration tool that aggregates results from multiple search engines.", url: "https://github.com/aboul3la/Sublist3r", tier: "P1" },
  { name: "Caido", category: "Web Attack", desc: "Modern web security auditing toolkit offering proxy interception and automated scanning workflows.", url: "https://github.com/caido/caido", tier: "P1" },
  { name: "Dirb", category: "Web Attack", desc: "Classic content scanner that brute-forces web directories using wordlists.", url: "https://gitlab.com/kalilinux/packages/dirb", tier: "P2" },
  { name: "Sub-Domain TakeOver", category: "Web Attack", desc: "Detects subdomains vulnerable to takeover due to dangling DNS records pointing to unclaimed services.", url: "https://github.com/edoardottt/takeover", tier: "P1" },
  { name: "CheckURL", category: "Web Attack", desc: "Utility for checking URL status, redirects, and reachability during reconnaissance.", url: "https://github.com/UndeadSec/checkURL", tier: "P2" },

  // ===== PHISHING (referenced descriptively — awareness/training context only) =====
  { name: "Setoolkit", category: "Phishing Awareness", desc: "Widely-referenced social engineering framework used in security-awareness training to demonstrate phishing risk.", url: "https://github.com/trustedsec/social-engineer-toolkit", tier: "P1" },
  { name: "dnstwist", category: "Phishing Awareness", desc: "Detects typosquatting and lookalike domains that could be used to impersonate a brand.", url: "https://github.com/elceef/dnstwist", tier: "P0" },
  { name: "QRLJacking", category: "Phishing Awareness", desc: "Documents QR-code login hijacking attack patterns for awareness and defensive research.", url: "https://github.com/OWASP/QRLJacking", tier: "P2" },
  { name: "Maskphish", category: "Phishing Awareness", desc: "Demonstrates URL-masking techniques used in phishing awareness training.", url: "https://github.com/jaykali/maskphish", tier: "P2" },

  // ===== POST EXPLOITATION =====
  { name: "PEASS-ng (LinPEAS/WinPEAS)", category: "Post Exploitation", desc: "Privilege-escalation enumeration scripts that scan a compromised host for common misconfigurations leading to elevated access.", url: "https://github.com/peass-ng/PEASS-ng", tier: "P0" },
  { name: "Sliver", category: "Post Exploitation", desc: "Open-source command-and-control framework used in adversary-simulation and red-team engagements.", url: "https://github.com/BishopFox/sliver", tier: "P0" },
  { name: "Havoc", category: "Post Exploitation", desc: "Modern, modular command-and-control framework for red-team post-exploitation operations.", url: "https://github.com/HavocFramework/Havoc", tier: "P0" },
  { name: "pwncat-cs", category: "Post Exploitation", desc: "Post-exploitation platform that upgrades basic shells into fully-featured interactive sessions.", url: "https://github.com/calebstewart/pwncat", tier: "P1" },
  { name: "Ligolo-ng", category: "Post Exploitation", desc: "Tunneling tool for pivoting through compromised networks during authorized engagements.", url: "https://github.com/nicocha30/ligolo-ng", tier: "P1" },
  { name: "Chisel", category: "Post Exploitation", desc: "Fast TCP/UDP tunnel over HTTP, commonly used for network pivoting during security assessments.", url: "https://github.com/jpillora/chisel", tier: "P1" },
  { name: "Evil-WinRM", category: "Post Exploitation", desc: "Windows Remote Management shell client used for authorized remote administration testing.", url: "https://github.com/Hackplayers/evil-winrm", tier: "P1" },
  { name: "Mythic", category: "Post Exploitation", desc: "Collaborative, cross-platform red-team command-and-control framework with a plugin architecture.", url: "https://github.com/its-a-feature/Mythic", tier: "P1" },

  // ===== FORENSICS =====
  { name: "Volatility 3", category: "Digital Forensics", desc: "Advanced memory forensics framework for extracting artifacts from RAM captures during incident response.", url: "https://github.com/volatilityfoundation/volatility3", tier: "P0" },
  { name: "Binwalk", category: "Digital Forensics", desc: "Firmware analysis tool for identifying and extracting embedded files and executable code from binary images.", url: "https://github.com/ReFirmLabs/binwalk", tier: "P0" },
  { name: "Wireshark", category: "Digital Forensics", desc: "The standard network protocol analyzer for capturing and inspecting traffic at the packet level.", url: "https://www.wireshark.org/", tier: "P0" },
  { name: "Bulk extractor", category: "Digital Forensics", desc: "Scans disk images and files to extract forensic artifacts like emails, URLs, and credit card numbers.", url: "https://github.com/simsong/bulk_extractor", tier: "P1" },
  { name: "pspy", category: "Digital Forensics", desc: "Monitors Linux process activity without requiring root, useful for spotting suspicious scheduled tasks.", url: "https://github.com/DominicBreuker/pspy", tier: "P1" },

  // ===== EXPLOIT FRAMEWORK =====
  { name: "RouterSploit", category: "Exploit Framework", desc: "Exploitation framework focused specifically on embedded devices and routers.", url: "https://github.com/threat9/routersploit", tier: "P1" },
  { name: "Commix", category: "Exploit Framework", desc: "Automated tool for detecting and exploiting command-injection vulnerabilities in web applications.", url: "https://github.com/commixproject/commix", tier: "P1" },
  { name: "WebSploit", category: "Exploit Framework", desc: "Modular framework combining several web and network exploitation modules under one interface.", url: "https://github.com/The404Hacking/websploit", tier: "P2" },

  // ===== REVERSE ENGINEERING =====
  { name: "Ghidra", category: "Reverse Engineering", desc: "NSA-developed software reverse-engineering suite for disassembling and decompiling binaries.", url: "https://github.com/NationalSecurityAgency/ghidra", tier: "P0" },
  { name: "Radare2", category: "Reverse Engineering", desc: "Command-line reverse-engineering framework for binary analysis, disassembly, and debugging.", url: "https://github.com/radareorg/radare2", tier: "P0" },
  { name: "Androguard", category: "Reverse Engineering", desc: "Python framework for reverse-engineering and analyzing Android application packages.", url: "https://github.com/androguard/androguard", tier: "P1" },
  { name: "JadX", category: "Reverse Engineering", desc: "Decompiler that converts Android DEX bytecode back into readable Java source.", url: "https://github.com/skylot/jadx", tier: "P1" },
  { name: "Apk2Gold", category: "Reverse Engineering", desc: "Utility for converting Android APK files into Java source for analysis.", url: "https://github.com/lxdvs/apk2gold", tier: "P2" },

  // ===== ACTIVE DIRECTORY =====
  { name: "BloodHound", category: "Active Directory", desc: "Graph-based analysis tool that reveals hidden attack paths and privilege-escalation chains inside Active Directory environments.", url: "https://github.com/BloodHoundAD/BloodHound", tier: "P0" },
  { name: "Impacket", category: "Active Directory", desc: "Python library implementing network protocols used across Windows and Active Directory security testing.", url: "https://github.com/fortra/impacket", tier: "P0" },
  { name: "NetExec (nxc)", category: "Active Directory", desc: "Network-service exploitation and enumeration swiss-army-knife for large Windows environments.", url: "https://github.com/Pennyw0rth/NetExec", tier: "P0" },
  { name: "Responder", category: "Active Directory", desc: "LLMNR/NBT-NS/MDNS poisoner used to capture credentials during internal network assessments.", url: "https://github.com/lgandx/Responder", tier: "P0" },
  { name: "Certipy", category: "Active Directory", desc: "Toolkit for enumerating and abusing misconfigurations in Active Directory Certificate Services.", url: "https://github.com/ly4k/Certipy", tier: "P1" },
  { name: "Kerbrute", category: "Active Directory", desc: "Fast tool for enumerating and brute-forcing Kerberos accounts in Active Directory.", url: "https://github.com/ropnop/kerbrute", tier: "P1" },

  // ===== CLOUD SECURITY =====
  { name: "Prowler", category: "Cloud Security", desc: "Cloud security assessment tool that audits AWS, Azure, and GCP environments against compliance benchmarks.", url: "https://github.com/prowler-cloud/prowler", tier: "P0" },
  { name: "ScoutSuite", category: "Cloud Security", desc: "Multi-cloud security auditing tool that generates a visual report of misconfigurations across providers.", url: "https://github.com/nccgroup/ScoutSuite", tier: "P0" },
  { name: "Pacu", category: "Cloud Security", desc: "AWS exploitation framework used to test the security posture of cloud environments.", url: "https://github.com/RhinoSecurityLabs/pacu", tier: "P1" },
  { name: "Trivy", category: "Cloud Security", desc: "Comprehensive vulnerability scanner for container images, filesystems, and infrastructure-as-code.", url: "https://github.com/aquasecurity/trivy", tier: "P0" },

  // ===== MOBILE SECURITY =====
  { name: "MobSF", category: "Mobile Security", desc: "Automated mobile application security testing framework for Android, iOS, and Windows apps.", url: "https://github.com/MobSF/Mobile-Security-Framework-MobSF", tier: "P0" },
  { name: "Frida", category: "Mobile Security", desc: "Dynamic instrumentation toolkit for injecting scripts into running applications during mobile security testing.", url: "https://github.com/frida/frida", tier: "P0" },
  { name: "Objection", category: "Mobile Security", desc: "Runtime mobile exploration toolkit built on Frida for assessing mobile app security without jailbreak.", url: "https://github.com/sensepost/objection", tier: "P1" },

  // ===== DDOS / STRESS TESTING (defensive/research reference only) =====
  { name: "SlowLoris", category: "Network Stress Testing", desc: "Documents a well-known low-bandwidth denial-of-service technique used in defensive capacity-planning research.", url: "https://github.com/gkbrk/slowloris", tier: "P2" },

  // ===== STEGANOGRAPHY =====
  { name: "StegoCracker", category: "Steganography", desc: "Brute-force tool for cracking passwords on steganographically hidden data within images.", url: "https://github.com/W1LDN16H7/StegoCracker", tier: "P2" },
  { name: "Whitespace", category: "Steganography", desc: "Hides and extracts data encoded within whitespace characters of text files.", url: "https://github.com/beardog108/snow10", tier: "P2" },

  // ===== XSS =====
  { name: "DalFox", category: "XSS Testing", desc: "Fast parameter analysis and XSS scanning tool built for automated pipelines.", url: "https://github.com/hahwul/dalfox", tier: "P1" },
  { name: "XSStrike", category: "XSS Testing", desc: "Advanced XSS detection suite with a fuzzing engine and context-aware payload generation for research purposes.", url: "https://github.com/UltimateHackers/XSStrike", tier: "P1" },

  // ===== OSINT / SOCIAL =====
  { name: "Sherlock", category: "OSINT & Social", desc: "Hunts down usernames across hundreds of social networks to map an individual's online presence.", url: "https://github.com/sherlock-project/sherlock", tier: "P0" },
  { name: "SocialScan", category: "OSINT & Social", desc: "Checks email address and username availability across social platforms without triggering notifications.", url: "https://github.com/iojw/socialscan", tier: "P1" },
];

export const CATALOG_CATEGORIES = [...new Set(CIPHER_CATALOG.map(t => t.category))];
