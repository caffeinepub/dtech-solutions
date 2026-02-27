import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ServiceRequest {
    id: bigint;
    status: string;
    issueDescription: string;
    name: string;
    email: string;
    timestamp: Time;
    deviceType: string;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllServiceRequests(): Promise<Array<ServiceRequest>>;
    getServiceRequest(id: bigint): Promise<ServiceRequest>;
    submitServiceRequest(name: string, email: string, phone: string, deviceType: string, issueDescription: string): Promise<bigint>;
    updateRequestStatus(id: bigint, status: string): Promise<void>;
}
