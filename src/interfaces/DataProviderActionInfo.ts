import ActionOptionInfo from "./ActionOptionInfo";

interface DataProviderActionInfo {
    action: string;
    display_name: string;
    short_desc: string;
    desc: string;
    type: string; // Type of action
    input_type?: string; // Request type for API actions
    output_type?: string; // Response or event data type
    options?: ActionOptionInfo[];
}

export default DataProviderActionInfo;