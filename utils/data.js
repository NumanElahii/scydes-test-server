const ips = [
    {
        ip: "192.168.18.41", data: [

            { port: "6667", state: "open", service: "ircd", os: "Linux" },
            { port: "22", state: "open", service: "ssh", os: "Linux" },
            { port: "21", state: "open", service: "ftp", os: "Linux" },
            { port: "23", state: "open", service: "telnet", os: "Linux" },
            { port: "25", state: "open", service: "smtp", os: "Linux" },
            { port: "53", state: "open", service: "domain", os: "Linux" },
            { port: "80", state: "open", service: "http", os: "Linux" },
            { port: "111", state: "open", service: "rpc", os: "Linux" },
            { port: "139", state: "open", service: "netbios", os: "Linux" },
            { port: "512", state: "open", service: "exec", os: "Linux" },
            { port: "513", state: "open", service: "login", os: "Linux" },
            { port: "514", state: "open", service: "shell", os: "Linux" },
            { port: "1099", state: "open", service: "rmi", os: "Linux" },
            { port: "2049", state: "open", service: "nfs", os: "Linux" },
            { port: "2121", state: "open", service: "ccproxy", os: "Linux" },
            { port: "3306", state: "open", service: "mysql", os: "Linux" },
            { port: "5432", state: "open", service: "postgres", os: "Linux" },
            { port: "5900", state: "open", service: "vnc", os: "Linux" },
            { port: "6000", state: "open", service: "X11", os: "Linux" },
        
        ]
    },
    {
        ip: "192.168.18.74", data: [
            { port: "135", state: "open", service: "rpc", os: "windows" },
            { port: "139", state: "open", service: "netbios", os: "windows" },
            { port: "445", state: "open", service: "microsoft", os: "windows" },
            { port: "5357", state: "open", service: "wsdapi", os: "windows" },
            { port: "49152", state: "open", service: "unknown", os: "windows" },
            { port: "49153", state: "open", service: "unknown", os: "windows" },
            { port: "49154", state: "open", service: "unknown", os: "windows" },
            { port: "49155", state: "open", service: "unknown", os: "windows" },
            { port: "49157", state: "open", service: "unknown", os: "windows" },

        ]
    },
    {
        ip: "192.168.18.98", data: [
            { port: "631", state: "open", service: "ipp", os: "linux" },
        ]
    },
    {
        ip: "192.168.18.102", data: [
            { port: "135", state: "open", service: "rpc", os: "window" },
            { port: "139", state: "open", service: "ssn", os: "window" },
            { port: "445", state: "open", service: "microsoft", os: "window" },

        ]
    },
]


module.exports = { data: ips }