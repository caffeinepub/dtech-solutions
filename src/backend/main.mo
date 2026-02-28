import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";



actor {
  type ServiceRequest = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    deviceType : Text;
    issueDescription : Text;
    timestamp : Time.Time;
    status : Text;
  };

  stable var nextId = 0;
  let requests = Map.empty<Nat, ServiceRequest>();

  public shared ({ caller }) func submitServiceRequest(
    name : Text,
    email : Text,
    phone : Text,
    deviceType : Text,
    issueDescription : Text,
  ) : async Nat {
    let id = nextId;
    nextId += 1;

    let newRequest : ServiceRequest = {
      id;
      name;
      email;
      phone;
      deviceType;
      issueDescription;
      timestamp = Time.now();
      status = "Pending";
    };

    requests.add(id, newRequest);
    id;
  };

  public shared ({ caller }) func updateRequestStatus(id : Nat, status : Text) : async () {
    let currentRequest = switch (requests.get(id)) {
      case (null) { Runtime.trap("Request not found") };
      case (?request) { request };
    };

    let updatedRequest = { currentRequest with status };
    requests.add(id, updatedRequest);
  };

  public query ({ caller }) func getServiceRequest(id : Nat) : async ServiceRequest {
    switch (requests.get(id)) {
      case (null) { Runtime.trap("Request not found") };
      case (?serviceRequest) { serviceRequest };
    };
  };

  public query ({ caller }) func getAllServiceRequests() : async [ServiceRequest] {
    requests.values().toArray();
  };
};
