interface Geo {
  ip: string;
  name: string;
}

interface Device {
  os: string;
  agent: string;
}

interface Income {
  currency: string;
  amount: number;
}

export interface Conversion {
  id: string;
  date: string;
  offer: string;
  geo: Geo;
  device: Device;
  user_agent: string;
  status: number;
  income: Income;
  goal: string;
  sub1: string;
  sub2: string;
  sub3: string;
  sub4: string;
  sub5: string;
  sub6: string;
  sub7: string;
  sub8: string;
}
