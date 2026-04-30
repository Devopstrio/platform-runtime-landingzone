export enum WorkloadType {
  STATELESS = "STATELESS",
  STATEFUL = "STATEFUL",
  DAEMON = "DAEMON",
  JOB = "JOB"
}

export enum DeploymentStrategy {
  RECREATE = "RECREATE",
  ROLLING_UPDATE = "ROLLING_UPDATE",
  BLUE_GREEN = "BLUE_GREEN",
  CANARY = "CANARY"
}

export enum RuntimeStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  PENDING = "PENDING",
  FAILING = "FAILING"
}

export interface ClusterInfo {
  id: string;
  name: string;
  provider: string;
  region: string;
  version: string;
  nodes: number;
}

export interface RuntimeNamespace {
  name: string;
  clusterId: string;
  quota: {
    cpu: string;
    memory: string;
    pods: number;
  };
  labels: Record<string, string>;
}

export interface WorkloadMetadata {
  id: string;
  name: string;
  type: WorkloadType;
  namespace: string;
  replicas: number;
  strategy: DeploymentStrategy;
  image: string;
  status: RuntimeStatus;
}

export interface RuntimeKPIs {
  activeClusters: number;
  totalWorkloads: number;
  deploymentSuccessRate: number;
  avgStartupTimeSeconds: number;
  cpuUtilization: number;
}
