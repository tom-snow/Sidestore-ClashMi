// 修改自： https://github.com/RealSeek/Clash_Rule_DIY/blob/mihomo/docs/mihomo.js
// 修改内容：
// 

const proxyName = "代理模式";

function main(params) {
    if (!params.proxies) return params;
    overwriteBasicOptions(params);
    overwriteSniffer(params);
    overwriteProxyGroups(params);
    overwriteRules(params);
    overwriteDns(params);
    overwriteTunnel(params);
    return params;
}

// 覆写Basic Options
function overwriteBasicOptions(params) {
    const otherOptions = {
        "mixed-port": 7890,
        "allow-lan": true,
        "unified-delay": true,
        "tcp-concurrent": true,
        "geodata-mode": true,
        "fakeind-process-mode": "strict",
        "global-client-fingerprint": "chrome",
        profile: {
            "store-selected": true,
            "store-fake-ip": true,
        },
        ipv6: true,
        mode: "rule",
        "skip-auth-prefixes": ["127.0.0.1/32"],
        "lan-allowed-ips": ["0.0.0.0/0", "::/0"],
    };
    Object.keys(otherOptions).forEach((key) => {
        params[key] = otherOptions[key];
    });
}

function overwriteSniffer(params) {
    const snifferConfig = {
        enable: true,
        "force-dns-mapping": true,
        "parse-pure-ip": true,
        "override-destination": false,

        sniff: {
            HTTP: {
                ports: ["80", "443"],
                "override-destination": false,
            },

            TLS: {
                ports: ["443"],
            },
        },

        // 跳过嗅探结果
        "skip-domain": ["+.push.apple.com"],

        "skip-dst-address": [
            "91.105.192.0/23",
            "91.108.4.0/22",
            "91.108.8.0/21",
            "91.108.16.0/21",
            "91.108.56.0/22",
            "95.161.64.0/20",
            "149.154.160.0/20",
            "185.76.151.0/24",
            "2001:67c:4e8::/48",
            "2001:b28:f23c::/47",
            "2001:b28:f23f::/48",
            "2a0a:f280:203::/48",
        ]
    };

    params["sniffer"] = snifferConfig;
}

// 覆写代理组
function overwriteProxyGroups(params) {
    // 添加自用代理
    params.proxies
        .push
        //  { name: '1 - 香港 - 示例 ', type: *, server: **, port: *, cipher: **, password: **, udp: true }
        ();
    // 自动选择代理组，按地区分组选延迟最低
    const countryRegions = [
        {
            code: "HK",
            name: "🇭🇰 香港",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg",
            regex: /(香港|HK|Hong Kong|🇭🇰)/i,
        },
        {
            code: "TW",
            name: "🇹🇼 台湾",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tw.svg",
            regex: /(台湾|TW|Taiwan|🇹🇼)/i,
        },
        {
            code: "SG",
            name: "🇸🇬 新加坡",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg",
            regex: /(新加坡|狮城|SG|Singapore|🇸🇬)/i,
        },
        {
            code: "AR",
            name: "🇦🇷 阿根廷",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ar.svg",
            regex: /(阿根廷|AR|Argentina|🇦🇷)/i,
        },
        {
            code: "JP",
            name: "🇯🇵 日本",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg",
            regex: /(日本|JP|Japan|🇯🇵)/i,
        },
        {
            code: "US",
            name: "🇺🇸 美国",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg",
            regex: /(美国|US|USA|United States|America|🇺🇸)/i,
        },
        {
            code: "DE",
            name: "🇩🇪 德国",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/de.svg",
            regex: /(德国|DE|Germany|🇩🇪)/i,
        },
        {
            code: "KR",
            name: "🇰🇷 韩国",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/kr.svg",
            regex: /(韩国|KR|Korea|South Korea|🇰🇷)/i,
        },
        {
            code: "UK",
            name: "🇬🇧 英国",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/gb.svg",
            regex: /(英国|UK|United Kingdom|Britain|Great Britain|🇬🇧)/i,
        },
        {
            code: "CA",
            name: "🇨🇦 加拿大",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ca.svg",
            regex: /(加拿大|CA|Canada|🇨🇦)/i,
        },
        {
            code: "AU",
            name: "🇦🇺 澳大利亚",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/au.svg",
            regex: /(澳大利亚|AU|Australia|🇦🇺)/i,
        },
        {
            code: "ES",
            name: "🇪🇸 西班牙",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/es.svg",
            regex: /\b(西班牙|ES|Spain|🇪🇸)\b/i,
        },
        {
            code: "NL",
            name: "🇳🇱 荷兰",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/nl.svg",
            regex: /\b(荷兰|NL|Netherlands|🇳🇱)\b/i,
        },
        {
            code: "TR",
            name: "🇹🇷 土耳其",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tr.svg",
            regex: /(土耳其|TR|Turkey|🇹🇷)/i,
        },
        {
            code: "RU",
            name: "🇷🇺 俄罗斯",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ru.svg",
            regex: /(俄罗斯|RU|Russia|🇷🇺)/i,
        },
        {
            code: "IN",
            name: "🇮🇳 印度",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/in.svg",
            regex: /\b(印度|IN|India|🇮🇳)\b/i,
        },
        {
            code: "BR",
            name: "🇧🇷 巴西",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/br.svg",
            regex: /(巴西|BR|Brazil|🇧🇷)/i,
        },
        {
            code: "IT",
            name: "🇮🇹 意大利",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/it.svg",
            regex: /(意大利|IT|Italy|🇮🇹)/i,
        },
        {
            code: "CH",
            name: "🇨🇭 瑞士",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ch.svg",
            regex: /(瑞士|CH|Switzerland|🇨🇭)/i,
        },
        {
            code: "SE",
            name: "🇸🇪 瑞典",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/se.svg",
            regex: /(瑞典|SE|Sweden|🇸🇪)/i,
        },
        {
            code: "NO",
            name: "🇳🇴 挪威",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/no.svg",
            regex: /(挪威|NO|Norway|🇳🇴)/i,
        },
        {
            name: "其它",
            regex: /(?!.*(?: 剩余 | 到期 | 主页 | 官网 | 游戏 | 关注))(.*)/,
        },
    ];

    // 所有代理
    // 所有地区
    const allRegex =
        /^(?!.*(?:自动|故障|流量|官网|套餐|机场|订阅|年|月|失联|频道|Traffic|Expire)).*$/;
    const allProxies = getProxiesByRegexOne(params, allRegex);
    // const allProxies = params["proxies"].map((e) => e.name);

    const availableCountryCodes = new Set();
    const otherProxies = [];
    for (const proxy of params["proxies"]) {
        let found = false;
        for (const region of countryRegions) {
            if (region.regex.test(proxy.name)) {
                availableCountryCodes.add(region.name);
                found = true;
                break;
            }
        }
        if (!found) {
            otherProxies.push(proxy.name);
        }
    }

    const autoProxyGroupRegexs = countryRegions
        .filter((region) => availableCountryCodes.has(region.name))
        .map((region) => ({
            name: `${region.name} - 自动选择`,
            regex: region.regex,
        }));

    const autoProxyGroups = autoProxyGroupRegexs
        .map((item) => ({
            name: item.name,
            type: "fallback",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: getProxiesByRegex(params, item.regex),
            hidden: true,
        }))
        .filter((item) => item.proxies.length > 0);

    const manualProxyGroupsConfig = countryRegions
        .filter((region) => availableCountryCodes.has(region.name))
        .map((region) => ({
            name: `${region.name} - 手动选择`,
            type: "select",
            proxies: getManualProxiesByRegex(params, region.regex),
            icon: region.icon,
            hidden: false,
        }))
        .filter((item) => item.proxies.length > 0);

    const groups = [
        {
            name: proxyName,
            type: "select",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
            proxies: [
                "延迟优选",
                "故障转移",
                "手动选择",
                "负载均衡 (散列)",
                "负载均衡 (轮询)",
                "DIRECT",
            ],
        },
        {
            name: "延迟优选",
            type: "url-test",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
            "exclude-filter": "自动选择|手动选择",
            proxies: allProxies.length > 0 ? allProxies : ["DIRECT"],
            hidden: true,
        },
        {
            name: "故障转移",
            type: "fallback",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg",
            "exclude-filter": "自动选择|手动选择",
            proxies: allProxies.length > 0 ? allProxies : ["DIRECT"],
            hidden: true,
        },
        {
            name: "手动选择",
            type: "select",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
            proxies: [
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
            ],
        },
        {
            name: "负载均衡 (散列)",
            type: "load-balance",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
            interval: 300,
            "max-failed-times": 3,
            strategy: "consistent-hashing",
            lazy: true,
            "exclude-filter": "自动选择|手动选择",
            proxies: allProxies.length > 0 ? allProxies : ["DIRECT"],
            hidden: true,
        },
        {
            name: "负载均衡 (轮询)",
            type: "load-balance",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
            interval: 300,
            "max-failed-times": 3,
            "exclude-filter": "自动选择|手动选择",
            strategy: "round-robin",
            lazy: true,
            proxies: allProxies.length > 0 ? allProxies : ["DIRECT"],
            hidden: true,
        },
        {
            name: "电报消息",
            type: "select",
            proxies: [
                proxyName,
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
                "DIRECT",
            ],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg",
        },
        {
            name: "AI",
            type: "select",
            proxies: [
                proxyName,
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
                "DIRECT",
            ],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg",
        },
        {
            name: "Bilibili港澳台",
            type: "select",
            proxies: [
                "DIRECT",
                proxyName,
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
            ],
            // "include-all": true,
            icon: "https://www.bilibili.com/favicon.ico",
        },
        {
            name: "流媒体",
            type: "select",
            proxies: [
                proxyName,
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
                "DIRECT",
            ],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
        },
        {
            name: "苹果服务",
            type: "select",
            proxies: [
                proxyName,
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
            ],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg",
        },
        {
            name: "微软服务",
            type: "select",
            proxies: [
                proxyName,
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
                "DIRECT",
            ],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg",
        },
        {
            name: "GoogleFCM",
            type: "select",
            proxies: [
                "DIRECT",
                proxyName,
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
            ],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg",
        },
        {
            name: "Steam地区",
            type: "select",
            proxies: [
                "DIRECT",
                proxyName,
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
            ],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/steam.svg",
        },
        {
            name: "Emby",
            type: "select",
            proxies: [
                "DIRECT",
                proxyName,
                ...countryRegions
                    .filter((region) => availableCountryCodes.has(region.name))
                    .flatMap((region) => [
                        `${region.name} - 自动选择`,
                        `${region.name} - 手动选择`,
                    ]),
            ],
            // "include-all": true,
            icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/2.19.0/emby.svg",
        },
        {
            name: "广告屏蔽",
            type: "select",
            proxies: ["REJECT" ,"DIRECT", proxyName],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg",
        },
        {
            name: "漏网之鱼",
            type: "select",
            proxies: ["DIRECT", proxyName],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
        },
    ];

    autoProxyGroups.length &&
    groups[2].proxies.unshift(...autoProxyGroups.map((item) => item.name));
    groups.push(...autoProxyGroups);
    groups.push(...manualProxyGroupsConfig);
    params["proxy-groups"] = groups;
}

// 修改规则
function overwriteRules(params) {
    const customRules = [
        // 在此添加自定义规则，优先级次于ad。例子：
        // "DOMAIN,baidu.com,DIRECT",
        "AND,((NETWORK,udp),(DST-PORT,443)),REJECT",
        "DOMAIN-SUFFIX,gsa.apple.com," + proxyName,
    ];

    // 广告拦截 / 隐私保护 / Malware 拦截 / Phiishing 拦截
    const adNonipRules = [
        "RULE-SET,Reject_no_ip,广告屏蔽",
        "RULE-SET,Reject_domainset,广告屏蔽",
        "RULE-SET,Reject_no_ip_drop,广告屏蔽",
        "RULE-SET,Reject_no_ip_no_drop,广告屏蔽",
    ];

    const nonipRules = [
        // 个人遇到需要代理的域名(比较特殊)
        "RULE-SET,CustomProxy_no_ip," + proxyName,

        // GoolgeFCM 推送
        "RULE-SET,GoogleFCM_no_ip,GoogleFCM",

        // 网易云音乐
        "RULE-SET,NetEaseMusic_no_ip,DIRECT",

        // Steam 地区
        "RULE-SET,SteamRegion_no_ip,Steam地区",

        // SteamCN
        "RULE-SET,SteamCN_no_ip,DIRECT",
        // Steam
        "RULE-SET,Steam_no_ip," + proxyName,

        /**
         * 包含所有常见静态资源 CDN 域名、对象存储域名
         * 如果你正在使用商业性质的公共代理服务、且你的服务商提供按低倍率结算流量消耗的节点，可使用上述规则组将流量分配给这部分节点
         */
        "RULE-SET,CDN_domainset," + proxyName,
        "RULE-SET,CDN_no_ip," + proxyName,

        // 流媒体域名
        /**
         * 包含
         * 4gtv、AbemaTV、All4、Amazon Prime Video、Apple TV、Apple Music TV、Bahamut、BBC、Bilibili Intl、
         * DAZN、Deezer、Disney+、Discovery+、DMM、encoreTVB、Fox Now、Fox+、HBO GO/Now/Max/Asia、Hulu、HWTV、
         * JOOX、Jwplayer、KKBOX、KKTV、Line TV、Naver TV、myTV Super、Netflix、niconico、Now E、Paramount+、PBS、Peacock、Pandora、PBS、Pornhub、SoundCloud、
         * PBS、Spotify、TaiwanGood、Tiktok Intl、Twitch、ViuTV、ShowTime、iQiYi Global、Himalaya Podcast、Overcast、WeTV
         */
        "RULE-SET,Bilibili,Bilibili港澳台",
        "RULE-SET,Stream_no_ip,流媒体",
        "RULE-SET,Emby_no_ip,Emby",

        // tg 消息
        /**
         * 推荐仅使用 IP CIDR 规则。IP CIDR 规则数据完全来自 Telegram 官方发布的 CIDR 列表，不包含 Telegram 尚未启用的 CDN、数据中心的 IP。
         * ASN 规则仅适合作为补充；搭配非官方 MaxMind GeoLite 数据库（例如 GeoIP2-CN）使用时会影响匹配。
         */
        "RULE-SET,Telegram_no_ip,电报消息",

        // 云上贵州（CN）的苹果 CDN 无特殊需求直连即可
        "RULE-SET,AppleCDN_no_ip,DIRECT",
        // 苹果 CN 域名
        "RULE-SET,AppleCN_no_ip,DIRECT",

        // Microsoft 中国 CDN
        "RULE-SET,MicrosoftCDN_no_ip,DIRECT",

        // 软件更新、操作系统等大文件下载
        /**
         * 这部分域名可能包含 Microsoft 和 Apple 的国内 CDN 节点
         * 如果你设置了前面的Microsoft 和 Apple 的国内 CDN 节点为直连，按照优先级这部分CDN不会被代理，请放心
         */
        "RULE-SET,Download_domainset," + proxyName,
        "RULE-SET,Download_no_ip," + proxyName,

        // 苹果需要代理的域名
        "RULE-SET,Apple_no_ip,苹果服务",

        // 微软需要代理域名
        "RULE-SET,Microsoft_no_ip,微软服务",

        // ai 相关
        /**
         * 包含 OpenAI、Google Gemini、Claude、Perplexity 等
         */
        "RULE-SET,AI_no_ip,AI",

        // 常见海外服务和互联网公司的域名 有部分域名被DNS污染，故使用代理
        "RULE-SET,Global_no_ip," + proxyName,

        // 国内常见互联网公司和服务的域名
        "RULE-SET,Domestic_no_ip,DIRECT",
        "RULE-SET,Direct_no_ip,DIRECT",

        // 内网域名和局域网 IP
        /**
         * 域名列表包含 .local 和局域网 IP 的 in-addr.arpa 域名（即 AS112 域名）
         * 这部分域名一般会被解析到局域网 IP、需要走内网 DNS 解析、需要直连访问
         */
        "RULE-SET,Lan_no_ip,DIRECT",
    ];

    const ipRules = [
        // GooleFCM 推送
        "RULE-SET,GoogleFCM_ip,GoogleFCM",

        // 网易云音乐
        "RULE-SET,NetEaseMusic_ip,DIRECT",

        // SteamCN ip
        "RULE-SET,SteamCN_ip,DIRECT",

        // 广告拦截 / 隐私保护 / Malware 拦截 / Phiishing 拦截（ip）
        "RULE-SET,Reject_ip,REJECT",

        // telegram ip
        "RULE-SET,Telegram_ip,电报消息",

        // 流媒体 ip
        /**
         * 包含
         * 4gtv、AbemaTV、All4、Amazon Prime Video、Apple TV、Apple Music TV、Bahamut、BBC、Bilibili Intl、
         * DAZN、Deezer、Disney+、Discovery+、DMM、encoreTVB、Fox Now、Fox+、HBO GO/Now/Max/Asia、Hulu、HWTV、
         * JOOX、Jwplayer、KKBOX、KKTV、Line TV、Naver TV、myTV Super、Netflix、niconico、Now E、Paramount+、PBS、Peacock、Pandora、PBS、Pornhub、SoundCloud、
         * PBS、Spotify、TaiwanGood、Tiktok Intl、Twitch、ViuTV、ShowTime、iQiYi Global、Himalaya Podcast、Overcast、WeTV
         */
        "RULE-SET,Stream_ip,流媒体",

        // 国内常见互联网公司和服务的 IP
        "RULE-SET,Domestic_ip,DIRECT",
        "RULE-SET,China_ip,DIRECT",

        // 内网域名和局域网 IP
        /**
         * 域名列表包含 .local 和局域网 IP 的 in-addr.arpa 域名（即 AS112 域名）
         * 这部分域名一般会被解析到局域网 IP、需要走内网 DNS 解析、需要直连访问
         */
        "RULE-SET,Lan_ip,DIRECT",
        // 使用 GEOIP 和 GEOSITE 兜底直连规则
        "GEOIP,CN,DIRECT",
        "GEOSITE,cn,DIRECT",
        // 兜底
        "MATCH,漏网之鱼",
    ];

    const allNonipRules = [...adNonipRules, ...customRules, ...nonipRules];

    // 规则
    // 需要非IP类规则写在 IP类规则之前！
    /**
     * 避免 DNS 污染和 DNS 泄漏最有效的办法就是永远不在本地进行 DNS 解析，而 Mihomo 能且只能通过 Fake IP 和域名规则匹配的方式 可以实现非直连域名 一定不在本地本机进行任何 DNS 解析。
     * 在 Mihomo 中，规则自上而下匹配，只有当遇到 IP 类规则（如 IP-CIDR、IP-CIDR6、GEOIP 和 IP-ASN）时才会发起 DNS 解析。
     * 因此，在 Mihomo 中，将会触发 DNS 解析的规则放在域名和 URL 匹配规则后面非常重要。
     */
    const rules = [
        // 非ip类规则
        ...allNonipRules,

        // ip类规则
        ...ipRules,
    ];

    // 插入规则
    params.rules = rules;

    // 远程规则类型
    const ruleAnchor = {
        ip: {
            type: "http",
            interval: 1800,
            behavior: "ipcidr",
            format: "yaml",
        },
        domain: {
            type: "http",
            interval: 1800,
            behavior: "domain",
            format: "yaml",
        },
        classical: {
            type: "http",
            interval: 1800,
            behavior: "classical",
            format: "yaml",
        },
    };

    // 自己仓库的规则
    const ruleProviders = {
        /**
         * 屏蔽部分
         */

        // ##################################################################################################################

        // 广告拦截 / 隐私保护 / Malware 拦截 / Phiishing 拦截
        Reject_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/REJECT/ip/Reject_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/REJECT/ip/Reject_ip.yaml",
        },

        // ##################################################################################################################

        // 广告拦截 / 隐私保护 / Malware 拦截 / Phiishing 拦截
        Reject_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/REJECT/no_ip/Reject_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/REJECT/no_ip/Reject_no_ip.yaml",
        },

        Reject_domainset: {
            ...ruleAnchor.domain,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/REJECT/no_ip/Reject_domainset.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/REJECT/no_ip/Reject_domainset.yaml",
        },

        Reject_no_ip_drop: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/REJECT/no_ip/Reject_no_ip_drop.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/REJECT/no_ip/Reject_no_ip_drop.yaml",
        },

        Reject_no_ip_no_drop: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/REJECT/no_ip/Reject_no_ip_no_drop.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/REJECT/no_ip/Reject_no_ip_no_drop.yaml",
        },

        // ##################################################################################################################

        /**
         * 直连部分
         */

        // ##################################################################################################################

        // 国内常见互联网公司和服务的 IP
        China_ip: {
            ...ruleAnchor.ip,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/ip/China_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/ip/China_ip.yaml",
        },

        // 国内常见互联网公司和服务的 IP
        Domestic_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/ip/Domestic_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/ip/Domestic_ip.yaml",
        },

        // GoogleFCM IP
        GoogleFCM_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/ip/GoogleFCM_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/ip/GoogleFCM_ip.yaml",
        },

        // 内网域名和局域网 IP
        Lan_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/ip/Lan_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/ip/Lan_ip.yaml",
        },

        // 网易云音乐 ip
        NetEaseMusic_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/ip/NetEaseMusic_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/ip/NetEaseMusic_ip.yaml",
        },

        // SteamCN IP
        SteamCN_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/ip/SteamCN_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/ip/SteamCN_ip.yaml",
        },

        // ##################################################################################################################

        // apple CDN 云上贵州
        AppleCDN_no_ip: {
            ...ruleAnchor.domain,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/AppleCDN_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/AppleCDN_no_ip.yaml",
        },

        // 苹果直连域名
        AppleCN_no_ip: {
            ...ruleAnchor.domain,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/AppleCN_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/AppleCN_no_ip.yaml",
        },

        // 国内常见互联网公司和服务的域名
        Direct_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/Direct_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/Direct_no_ip.yaml",
        },

        // 国内常见互联网公司和服务的域名
        Domestic_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/Domestic_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/Domestic_no_ip.yaml",
        },

        // Google Fcm no ip
        GoogleFCM_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/GoogleFCM_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/GoogleFCM_no_ip.yaml",
        },

        // 内网域名和局域网 IP
        Lan_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/Lan_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/Lan_no_ip.yaml",
        },

        // 微软中国 CDN
        MicrosoftCDN_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/MicrosoftCDN_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/MicrosoftCDN_no_ip.yaml",
        },

        // 网易云音乐域名
        NetEaseMusic_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/NetEaseMusic_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/NetEaseMusic_no_ip.yaml",
        },

        // SteamCN 域名
        SteamCN_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/SteamCN_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/SteamCN_no_ip.yaml",
        },

        // Steam 地区域名
        SteamRegion_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/DIRECT/no_ip/SteamRegion_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/DIRECT/no_ip/SteamRegion_no_ip.yaml",
        },

        // ##################################################################################################################

        /**
         * 代理部分
         */

        // ##################################################################################################################

        // Bilibili IP
        Bilibili: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Bilibili_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/ip/Bilibili_no_ip.yaml",
        },

        // 流媒体 IP
        Stream_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/ip/Stream_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/ip/Stream_ip.yaml",
        },

        // telegram ip
        Telegram_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/ip/Telegram_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/ip/Telegram_ip.yaml",
        },

        // ##################################################################################################################

        // ai 相关 包含 OpenAI、Google Gemini、Claude、Perplexity 等
        AI_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/AI_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/AI_no_ip.yaml",
        },

        // apple
        Apple_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Apple_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/Apple_no_ip.yaml",
        },

        // 常需要代理的静态 CDN
        CDN_domainset: {
            ...ruleAnchor.domain,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/CDN_domainset.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/CDN_domainset.yaml",
        },

        // 常需要代理的静态 CDN
        CDN_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/CDN_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/CDN_no_ip.yaml",
        },

        // 存放着个人遇到需要代理的域名
        CustomProxy_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/CustomProxy_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/CustomProxy_no_ip.yaml",
        },

        // 软件更新、操作系统等大文件下载
        Download_domainset: {
            ...ruleAnchor.domain,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Download_domainset.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/Download_domainset.yaml",
        },

        // 软件更新、操作系统等大文件下载
        Download_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Download_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/Download_no_ip.yaml",
        },

        // 常见海外服务和互联网公司的域名 有部分域名被DNS污染，故使用代理
        Global_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Global_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/Global_no_ip.yaml",
        },

        // 微软需要代理的域名
        Microsoft_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Microsoft_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/Microsoft_no_ip.yaml",
        },

        // Steam 需要代理的域名
        Steam_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Steam_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/Steam_no_ip.yaml",
        },

        // 流媒体域名
        Stream_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Stream_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/Stream_no_ip.yaml",
        },

        // 流媒体域名
        Emby_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Emby_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/Emby_no_ip.yaml",
        },

        // telegram 域名
        Telegram_no_ip: {
            ...ruleAnchor.classical,
            url: "https://raw.githubusercontent.com/RealSeek/Clash_Rule_DIY/refs/heads/mihomo/PROXY/no_ip/Telegram_no_ip.yaml",
            path: "./ruleset/RealSeek/Clash_Rule_DIY/PROXY/no_ip/Telegram_no_ip.yaml",
        },

        // ##################################################################################################################
    };

    // 插入远程规则
    params["rule-providers"] = ruleProviders;
}

function getProxiesByRegexOne(params, regex) {
    return params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
}

function getProxiesByRegex(params, regex) {
    const matchedProxies = params.proxies
        .filter((e) => regex.test(e.name))
        .map((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["手动选择"];
}

// 修改DNS
function overwriteDns(params) {
    const dnsOptions = {
        enable: true,
        "listen": "0.0.0.0:1053",
        "enhanced-mode": "fake-ip", // fake-ip 或 redir-host
        "fake-ip-range": "198.18.0.1/16",
        "use-hosts": false,
        "use-system-hosts": false,
        ipv6: true,

        "fake-ip-filter": [
            "geosite:private",
            "geosite:category-ntp",
        ],

        "default-nameserver": [
            "tls://223.5.5.5",
        ],

        nameserver: [
            "https://1.1.1.1/dns-query",
            "https://8.8.8.8/dns-query",
        ],

        "proxy-server-nameserver": [
            "https://223.5.5.5/dns-query",
            "https://223.6.6.6/dns-query",
        ],

        "respect-rules": true,

        "direct-nameserver": [
            "https://223.5.5.5/dns-query",
            "https://223.6.6.6/dns-query",
        ],

        "direct-nameserver-follow-policy": true,

        "nameserver-policy": {
            "geosite:cn": [
                "https://223.5.5.5/dns-query",
                "https://223.6.6.6/dns-query",
            ]
        }
    };

    params["dns"] = dnsOptions;
}

function getManualProxiesByRegex(params, regex) {
    const matchedProxies = params.proxies
        .filter((e) => regex.test(e.name))
        .map((e) => e.name);
    return matchedProxies.length > 0
        ? matchedProxies
        : ["DIRECT", "手动选择", proxyName];
}

// 覆写Tunnel
function overwriteTunnel(params) {
    const tunnelOptions = {
        enable: true,
        stack: "gVisor", // System, gVisor, mixed
        device: "Clash Mi",
        "dns-hijack": ["any:53"],
        "auto-route": true,
        "auto-redirect": false,
        "auto-detect-interface": true,
        "strict-route": false,
        "route-exclude-address": [],
        "loopback-address": [
            "10.7.0.1"
        ],
        mtu: 1500,
    };
    params.tun = { ...tunnelOptions };
}