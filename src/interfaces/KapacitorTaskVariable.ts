export default interface KapacitorTaskVariable {
    type: string;
    value: string | KapacitorTaskVariable[];
    description: string;
}
