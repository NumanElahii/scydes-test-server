const typesDef = {
    //connection events
    USER_EVENT: "user_event",
    CONNECTION_SUCCESFUL: "connection_succesful",

    //info gathring events
    START_SCANNING: "start_scanning",
    SCANNING_DONE: "scanning_done",
    HOST_FOUND: "host_found",
    APR_PING_STARTED: "arp_ping_started",
    APR_PING_FINISHED: 'arp_ping_finished',
    REQ_IP_DATA: 'req_ip_data',
    REQUESTED_IP_DATA_SENT: 'requested_ip_data_sent',




    TEST: "test",
};

const exploitationEvents = {
    //exploiation events
    GET_FILE_DATA: "get_file_data",
    SESSION_FOUND: "session_found",
    OPEN_SHELL: "open_shell",
    SHELL_OPENED: "shell_opened",
    SHELL_COMMAND: "shell_command",
    SHELL_COOMAND_OUTPUT: "shell_command_output",
    CLOSE_SHELL: "close_shell",
}

module.exports = {
    exploitationEvents,
    typesDef
}